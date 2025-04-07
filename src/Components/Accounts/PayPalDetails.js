import { View, Text, StyleSheet, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import Toast from 'react-native-simple-toast';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Formik } from 'formik';
import * as yup from 'yup';

import ThemeContext from '../../utils/themes/themeWrapper';

import { addPaypalDetailsWithLogin, updatePaypalDetailsWithLogin } from '../../api/PrizeSummaryApi';

import AccountsTextInputField from '../../helpers/AccountsTextInputField';
import * as Common from '../../helpers/common'

const PayPalDetails = (props) => {
    const theme = useContext(ThemeContext);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const { visibleModal, setModalVisible, fetchPaypalDetails, setPayoutModalVisible, payoutModalVisible, id, mail_id, isEdit } = props;
    const [isAdd, setIsAdd] = useState(false)
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme])

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Invalid email address')
            .required('Email is required')
            .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Invalid email address')
            .trim(),
    });


    const handleSubmit = async (value, { resetForm }) => {
        setDisableButton(true)
        if (isAdd === true) {
            let dataObj = { mail_id: value.email.trim() }
            let response = await addPaypalDetailsWithLogin(dataObj);
            if (response) {
                fetchPaypalDetails();
                setPayoutModalVisible(false);
                setDisableButton(false);
                Toast.show(Common.account.SavedSuccessfully, Toast.SHORT);
            }
            else {
                setDisableButton(false);
            }
        }
        else {
            let dataObj = { payPalId: id, mail_id: value.email.trim() }
            let response = await updatePaypalDetailsWithLogin(dataObj);
            if (response) {
                fetchPaypalDetails();
                setModalVisible(false);
                setDisableButton(false);
                Toast.show(Common.account.UpdatedSuccessfully, Toast.SHORT);
            }
            else {
                setDisableButton(false);
            }

        }
    }

    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: isEdit ? 'rgba(0, 0, 0, 0.70)' : null,
            flex: 1
        },
        ModalFirstContainer: {
            paddingHorizontal: scale(10),
            paddingBottom: scale(40),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            borderTopRightRadius: scale(12),
            borderTopLeftRadius: scale(12),
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        },
        headerBarIcon: {
            marginLeft: scale(5),
            alignItems: 'center'
        },
        topIcons: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        HeaderWithClose: {
            marginTop: scale(15),
        },
        headerContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalHeaderText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            marginBottom: scale(25),
            marginTop: scale(20)
        },
        closeIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            marginRight: scale(1),
            bottom: scale(5),
        },
        leftArrowIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
        },
        inputFieldContainer: {
            gap: scale(16),
            paddingHorizontal: scale(8),
        },
        saveButton: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.25)' : 'rgba(255, 255, 255, 0.25)',
            paddingVertical: scale(14),
            borderRadius: scale(6),
            alignItems: 'center',
            marginTop: scale(8)
        },
        saveChanges: {
            color: viewBackgroundColor === '#FFFFFF' ? "rgba(0, 0, 0, 0.3)" : 'rgba(0, 0, 0, 0.3)',
            fontSize: responsiveFontSize(2),
            fontFamily: 'Gilroy-ExtraBold',
        },
    })

    return (
        <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.ModalFirstContainer}>
                <View style={styles.HeaderWithClose}>
                    <View style={styles.topIcons}>
                        <Pressable style={styles.headerBarIcon} onPress={() => setModalVisible(!visibleModal)} >
                            <AntDesign name={'left'} size={18} style={styles.leftArrowIcon} />
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(!visibleModal)}>
                            <Ionicons name={'close'} size={25} style={styles.closeIcon} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.modalHeaderText}>
                        {isEdit ? `${Common.account.EditPaypalDetails}` : `${Common.account.AddPaypalDetails}`}
                    </Text>
                </View>

                <View>
                    <View>
                        <Formik
                            initialValues={{ email: mail_id ? mail_id : '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                                    <View style={styles.inputFieldContainer}>
                                        <AccountsTextInputField viewBackgroundColor={viewBackgroundColor} title={'Paypal email address'} formikName={'email'} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                        {
                                            <Pressable
                                                onPress={isEdit === true ? () => { handleSubmit(); setIsAdd(false) } : () => { handleSubmit(); setIsAdd(true) }}
                                                style={[styles.saveButton, (values.email.length > 0) && { backgroundColor: '#FFBD0A' }]}
                                                disabled={!values.email || disableButton}
                                            >
                                                {
                                                    disableButton === false ?
                                                        <Text style={[styles.saveChanges, { color: (values.email.length < 0) && (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 6, 22, 0.3)' : (values.email.length < 0) && (viewBackgroundColor !== '#FFFFFF') ? 'rgba(0, 0, 0, 0.3)' : (values.email.length > 0) && (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 0, 0, 1)' : ((values.email.length > 0)) ? 'rgba(0, 6, 22, 1)' : 'rgba(0, 6, 22, 0.3)' }]}>{isEdit === true ? `${Common.account.UpdateDetails}` : `${Common.account.SaveDetails}`}</Text>
                                                        :
                                                        <ActivityIndicator color={'#000616'} />
                                                }
                                            </Pressable>
                                        }
                                    </View>
                                </>
                            )}
                        </Formik>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>

    )
}

export default PayPalDetails