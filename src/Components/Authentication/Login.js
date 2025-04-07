import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import { AuthContext } from '../../Context/AuthContext';
import { openLink } from '../../helpers/OpenBrowser';
import * as Common from '../../helpers/common';

import LinearGradientButton from '../../utils/LinearGradientButton';
import ThemeContext from '../../utils/themes/themeWrapper';

import { Formik } from 'formik';
import * as yup from 'yup';

import { signIn, socialSignInFacebook, socialSignInGoogle } from '../../api/loginApi';

import SocialMediaContainer from '../SignInSignUpComponents/SocialMediaContainer';

import googleImage from '../../assets/Images/googleImageLogo.png';
import facebookImage from '../../assets/Images/facebookImageLogo.png';

import messaging from '@react-native-firebase/messaging';



const Login = (props) => {
    const { isUserExists } = props
    const { authLogin, setIsUserExists } = useContext(AuthContext);
    const navigation = useNavigation();
    const theme = useContext(ThemeContext)

    const [disableButton, setDisableButton] = useState(false)
    const [invalidErrorMessage, setInvalidErrorMessage] = useState(false);

    const validation = yup.object().shape({
        email: yup
            .string()
            .email(Common.common.InvalidEmailAddress)
            .required(Common.common.EmailIsRequired)
            // .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, Common.common.InvalidEmailAddress),
            .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, Common.common.InvalidEmailAddress)
            .trim(),
        password: yup
            .string()
            .required(Common.common.PasswordIsRequired)
            .trim()
    });


    const handleSubmit = async (value) => {
        let deviceToken = null;
        if (Platform.OS === 'android') {
            deviceToken = await messaging().getToken();
        } else if (Platform.OS === 'ios') {
            deviceToken = await messaging().getAPNSToken();
        }
        setDisableButton(true)
        let dataObj = { email: value.email.trim(), password: value.password.trim(), device_token: deviceToken, platform: Platform.OS, vendor: Platform.OS == "android" ? "fcm" : "apns" };
        let response = await signIn(dataObj);
        if (response) {
            setDisableButton(false)
            if (response.status === 400) {
                if (response.message === Common.common.InvalidPassword || response.message === Common.common.UserEmailDoesNotExists) {
                    setInvalidErrorMessage(true)
                }
            }
            if (response.status === 200) {
                authLogin(response.data[0].jwt);
                navigation.navigate('Home')
            }
        }
        else {
            setInvalidErrorMessage(true)
            setDisableButton(false)
        }
    };

    const googleSignIn = async () => {
        const response = await socialSignInGoogle()
        if (response.status === 200) {
            openLink(response.data.redirectUrl)
        }
    };

    const facebookSignIn = async () => {
        const response = await socialSignInFacebook()
        if (response.status === 200) {
            openLink(response.data.redirectUrl)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setIsUserExists(false)
            };
        }, [])
    );

    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: theme.background
        },
        loginInputFieldContainer: {
            gap: scale(12),
            justifyContent: 'center',
        },
        signInText: {
            fontSize: responsiveFontSize(3),
            color: theme.color,
            alignSelf: 'center',
            fontFamily: 'Gilroy-ExtraBold',
            marginBottom: scale(12)
        },
        input: {
            height: responsiveHeight(6.2),
            paddingLeft: scale(16),
            borderRadius: scale(4),
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            borderColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255,255,255,0.2)',
            borderWidth: scale(1.24),
            backgroundColor: theme.theme == 'light' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
            color: theme.color,
        },
        forgotPasswordText: {
            color: '#FFBD0A',
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'NunitoSans-Regular',
            textAlign: 'right',
            opacity: scale(0.9),
        },
        loginContainer: {
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(6),
            marginTop: scale(3)
        },
        loginText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            color: '#000616',
        },
        ivalidLoginText: {
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            textAlign: 'center',
            color: 'red'
        },
        viaSocialMediaText: {
            marginTop: scale(18),
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'NunitoSans-Regular',
            textAlign: 'center',
            color: theme.color,
        },
        dontHaveAcntOrangeText: {
            fontSize: responsiveFontSize(2),
            color: '#FFBD0A',
        },
        signUpOrangeText: {
            color: '#ffbd0a',
        },
        inputError: {
            borderColor: 'red',
            borderWidth: scale(0.5),
        },
        error: {
            color: 'red',
            textAlign: 'right',
        },
        socialMediaContainer: {
            gap: scale(12),
            marginTop: scale(22)
        }
    });

    return (
        <ScrollView style={styles.container}>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validation}
                onSubmit={handleSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.loginInputFieldContainer}>
                            <Text style={styles.signInText}>{Common.common.SignIn}</Text>
                            {
                                isUserExists && <Text style={[styles.error, { textAlign: 'center' }]} >You already have an account, please sign in</Text>
                            }
                            {
                                Common.Login.inputFields?.map((ele, i) => (
                                    <View key={i} >
                                        <TextInput
                                            style={[styles.input, touched[ele.formikName] && errors[ele.formikName] ? styles.inputError : null,]}
                                            placeholder={ele.placeHolder}
                                            onChangeText={handleChange(ele.formikName)}
                                            value={values[ele.formikName]}
                                            keyboardType={ele.formikName === 'email' ? "email-address" : null}
                                            secureTextEntry={ele.formikName !== 'email' ? true : false}
                                            placeholderTextColor={theme.theme == "light" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)"}
                                            onChange={() => setInvalidErrorMessage(false)}
                                        />
                                        {errors[ele.formikName] && touched[ele.formikName] && (
                                            <Text style={styles.error}>{errors[ele.formikName]}</Text>
                                        )}
                                    </View>
                                ))
                            }
                            <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate('ForgotPasswordScreen1')}>{Common.common.ForgotPassword}</Text>
                            <LinearGradientButton title={Common.common.SignIn} disableButton={disableButton} onPress={handleSubmit} isDataFetching={disableButton} />
                            {
                                invalidErrorMessage && <Text style={styles.ivalidLoginText}>{Common.Login.SorryThatLoginWasInvalid}</Text>
                            }
                            <Text style={styles.viaSocialMediaText}> {Common.Login.SignInViaSocialAccount}</Text>
                        </View>
                    </>
                )}
            </Formik>
            <View style={styles.socialMediaContainer}>
                <SocialMediaContainer socialMediaButton={googleSignIn} image={googleImage} title={Common.common.SignInWithGoogle} theme={theme} />
                <SocialMediaContainer socialMediaButton={facebookSignIn} image={facebookImage} title={Common.common.SignInWithFacebook} theme={theme} />
            </View>
        </ScrollView>
    );
};



export default Login;
