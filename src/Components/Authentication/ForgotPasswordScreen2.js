import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';

import axios from 'axios';
import { API_URL } from '@env'
import { Formik } from 'formik';
import * as yup from 'yup';

import LinearGradientButton from '../../utils/LinearGradientButton';
import ThemeContext from '../../utils/themes/themeWrapper';

const ForgotPasswordScreen2 = ({ route, navigation }) => {
    const { jwt, email } = route.params;
    const theme = useContext(ThemeContext)
    const [disableButton, setDisableButton] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [jwtToken, setJwtToken] = useState(jwt);
    const [disableResendBtn, setDisableResendBtn] = useState(false);


    const validationSchema = yup.object().shape({
        otp: yup
            .string()
            .min(6, 'Otp must be at least 6 characters')
            .max(6, 'Otp must be at least 6 characters')
            .required('Otp is required')
            .trim()
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        //     'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character',
        // ),
        ,
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(30, 'Password must be less than 30 characters')
            .required('Password is required')
            .trim()
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        //     'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character',
        // ),
        ,
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required')
            .trim(),
    });

    const handleSubmit = (values) => {
        setDisableButton(true)
        axios.post(`${API_URL}changePassword/mobile`, values, { "headers": { 'Authorization': jwtToken } })
            .then((resp) => {
                setDisableButton(false)
                navigation.navigate('Authentication')
            })
            .catch(err => {
                setDisableButton(false)
                setErrorMessage(err.response.data)
                // Toast.show(err.response.data, Toast.SHORT);
            })
    };


    const resendOtp = (resetForm) => {
        resetForm()
        setDisableResendBtn(true);
        axios.post(`${API_URL}forgotPassword/mobile`, { email: email })
            .then((resp) => {
                Toast.show("OTP Sent!", Toast.SHORT);
                setDisableResendBtn(false);
                setJwtToken(resp.data.jwt)
            })
            .catch(err => {
                setDisableResendBtn(false);
                Toast.show(err.response.data, Toast.SHORT);
            })
    }

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        headerText: {
            color: theme.color,
            fontSize: responsiveFontSize(3),
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            opacity: scale(0.9),
            marginTop: scale(70)
        },
        loginInputFieldContainer: {
            marginTop: scale(30),
            marginHorizontal: scale(25),
            gap: scale(10)
        },
        fieldContainer: {
            gap: scale(5)
        },
        inputTitle: {
            color: theme.color,
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'NunitoSans-Regular',
            marginLeft: scale(15),
            opacity: 0.8
        },
        input: {
            height: 48,
            paddingLeft: scale(16),
            borderRadius: scale(6),
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            borderColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0, 6, 22, 0.195995)',
            borderWidth: 1.24,
            backgroundColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(255, 255, 255, 0.05)',
            color: theme.color,
        },
        resendContainer: {
            alignItems: 'center',
        },
        otpResndText: {
            color: theme.color,
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular'
        },
        otpResndTextLink: {
            color: disableResendBtn ? 'rgba(255, 189, 10, 0.5)' : '#FFBD0A'
        },
        buttonContainer: {
            marginTop: scale(27),
            marginBottom: scale(50)
        },
        error: {
            color: 'red',
            textAlign: 'right',
        },
        inputError: {
            borderColor: 'red',
            borderWidth: scale(0.5),
        },
        errorMessage: {
            color: 'red',
            fontSize: responsiveFontSize(1.5),
            fontFamily: 'NunitoSans-Regular',
            textAlign: 'center',
            marginTop: scale(5)
        }

    })


    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View>
                    <Formik
                        initialValues={{ otp: '', password: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched,resetForm }) => (
                            <>
                                <Text style={styles.headerText}>Reset password</Text>
                                <View style={styles.loginInputFieldContainer}>
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.inputTitle}>Otp</Text>
                                        <TextInput style={[styles.input, touched.otp && errors.otp ? styles.inputError : null]}
                                            placeholder=""
                                            onChangeText={handleChange('otp')}
                                            value={values.otp}
                                            keyboardType="number-pad"
                                            placeholderTextColor={theme.theme == "light" ? "rgba(0,0,0,0.4)" : 'rgba(255,255,255,0.4)'}
                                            maxLength={6}
                                            onChange={() => setErrorMessage('')}
                                        />
                                        {errors.otp && touched.otp && (
                                            <Text style={styles.error}>{errors.otp}</Text>
                                        )}
                                    </View>
                                    <View style={styles.fieldContainer}>
                                        <Text style={styles.inputTitle}>New Password</Text>
                                        <TextInput
                                            style={[styles.input, touched.password && errors.password ? styles.inputError : null]}
                                            placeholder="choose a password"
                                            onChangeText={handleChange('password')}
                                            value={values.password}
                                            placeholderTextColor={theme.theme == "light" ? "rgba(0,0,0,0.4)" : 'rgba(255,255,255,0.4)'}
                                            onChange={() => setErrorMessage('')}
                                        />
                                        {errors.password && touched.password && (
                                            <Text style={styles.error}>{errors.password}</Text>
                                        )}
                                    </View>

                                    <View style={[styles.fieldContainer, { marginTop: scale(3) }]}>
                                        <Text style={styles.inputTitle}>Confirm new password</Text>
                                        <TextInput
                                            style={[styles.input, touched.confirmPassword && errors.confirmPassword ? styles.inputError : null]}
                                            placeholder="confirm password"
                                            onChangeText={handleChange('confirmPassword')}
                                            onBlur={handleBlur('confirmPassword')}
                                            value={values.confirmPassword}
                                            secureTextEntry={true}
                                            placeholderTextColor={theme.theme == "light" ? "rgba(0,0,0,0.4)" : 'rgba(255,255,255,0.4)'}
                                            onChange={() => setErrorMessage('')}
                                        />
                                        {errors.confirmPassword && touched.confirmPassword && (
                                            <Text style={styles.error}>{errors.confirmPassword}</Text>
                                        )}
                                    </View>
                                    <View style={styles.resendContainer}>
                                        <Text style={styles.otpResndText}>A OTP has been sent to your email. Not receieved it yet? <Text style={styles.otpResndTextLink} onPress={() => resendOtp(resetForm)} disabled={disableResendBtn}>Resend</Text></Text>

                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <LinearGradientButton title={'Reset password'} onPress={handleSubmit} disableButton={disableButton} />
                                        {
                                            errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>
                                        }
                                    </View>

                                </View>

                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen2

