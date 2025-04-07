import React, { useContext, useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, RefreshControl, StyleSheet, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

import { Formik } from 'formik';
import * as yup from 'yup';

import * as Common from '../../helpers/common';
import AccountsTextInputField from '../../helpers/AccountsTextInputField';

import ThemeContext from '../../utils/themes/themeWrapper';

import { changePasswordWithLogin } from '../../api/accountsApi';

import { AuthContext } from '../../Context/AuthContext';

const ChangePassword = () => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [initialValues, setInitialValues] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme])

    const validationSchema = yup.object().shape({
        currentPassword: yup
            .string()
            .required('Password is required')
            .trim(),
        newPassword: yup
            .string()
            .test('password-match', 'New password cannot match current password', function (value) {
                const { currentPassword } = this.parent;
                return value !== currentPassword;
            })
            .min(6, 'Password must be at least 6 characters')
            .max(30, 'Password must be less than 30 characters')
            .required('Password is required')
            .trim(),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword')], 'Passwords must match')
            .required('Confirm password is required')
            .trim(),
    });


    const handleSubmit = async (values, { resetForm }) => {
        setDisableButton(true)
        const formData = {
            currentPassword: values.currentPassword.trim(),
            newPassword: values.newPassword.trim(),
            confirmNewPassword: values.confirmPassword.trim()
        }
        const result = await changePasswordWithLogin(formData);
        if (result) {
            setDisableButton(false);
            resetForm();
            logout();
            navigation.popToTop()
            navigation.push('Authentication')
        }
        else {
            setDisableButton(false)
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);


    const styles = StyleSheet.create({
        MainContainer: {
            flex: 1,
            paddingHorizontal: scale(16),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616',
        },
        headerBar: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616',
            height: scale(48),
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
        },
        headerBarIcon: {
            textAlign: 'left',
            flex: 0.1
        },
        headerTextStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 0.9)',
            fontSize: responsiveFontSize(3.5),
            fontFamily: 'Gilroy-ExtraBold',
            marginBottom: scale(24),
        },
        useDetailsStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            marginBottom: scale(24),
        },
        inputFieldContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            paddingTop: scale(30),
            flexDirection: 'column',
            gap: scale(12),
        },
        formContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            paddingHorizontal: scale(20),
            paddingBottom: scale(36),
            borderRadius: scale(12),
            marginBottom: scale(24)
        },
        saveButton: {
            backgroundColor: (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 6, 22, 0.25)' : 'rgba(255, 255, 255, 0.25)',
            borderRadius: scale(6),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(32),
            height: 48
        },
        saveChanges: {
            color: viewBackgroundColor === '#FFFFFF' ? "#000000" : '#000616',
            fontSize: scale(16),
            fontFamily: 'Gilroy-ExtraBold',
        },
    })

    return (
        <KeyboardAvoidingView style={styles.MainContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <View style={styles.headerBar}>
                    <Pressable style={styles.headerBarIcon} onPress={() => navigation.goBack()} >
                        <AntDesign name={'left'} size={20} color={theme.color} />
                    </Pressable>
                </View>
                <Text style={styles.headerTextStyle}>{Common.account.ChangePassword}</Text>
                <View>
                    <Text style={styles.useDetailsStyle}>{Common.account.ChangeYourPassword}</Text>
                    <View style={styles.formContainer}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
                                <>
                                    <View style={styles.inputFieldContainer}>
                                        {
                                            Common.AccountsChangePassword.inputFields.map((ele, i) => (
                                                <AccountsTextInputField key={i} viewBackgroundColor={viewBackgroundColor} title={ele.name} formikName={ele.formikName} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                            ))
                                        }
                                    </View>
                                    <Pressable onPress={() => { handleSubmit(); }}
                                        style={[styles.saveButton, (values.currentPassword.length > 0 && values.newPassword.length > 0 && values.confirmPassword.length > 0) && { backgroundColor: '#FFBD0A' }]}
                                        disabled={!values.currentPassword || !values.newPassword || !values.confirmPassword || disableButton}
                                    >
                                        {
                                            disableButton ? <ActivityIndicator color={'#000616'} /> :
                                                <Text style={[styles.saveChanges, { color: (values.currentPassword.length < 0 && values.newPassword.length < 0 && values.confirmPassword.length < 0) && (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 6, 22, 0.3)' : (values.currentPassword.length < 0 && values.newPassword.length < 0 && values.confirmPassword.length < 0) && (viewBackgroundColor !== '#FFFFFF') ? 'rgba(0, 0, 0, 0.3)' : (values.currentPassword.length > 0 && values.newPassword.length > 0 && values.confirmPassword.length > 0) && (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 0, 0, 1)' : ((values.currentPassword.length > 0 && values.newPassword.length > 0 && values.confirmPassword.length > 0) && (viewBackgroundColor !== '#FFFFFF')) ? 'rgba(0, 6, 22, 1)' : 'rgba(0, 6, 22, 0.3)' }]}>Change Password</Text>
                                        }

                                    </Pressable>
                                </>
                            )}
                        </Formik>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ChangePassword