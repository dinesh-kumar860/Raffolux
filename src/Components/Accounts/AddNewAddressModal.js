import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

import { Formik } from 'formik';

import { isEmptyObject } from '../../utils/utils'
import ThemeContext from '../../utils/themes/themeWrapper';
import { AddressValidationSchema } from '../../utils/AddressValidationSchema';

import { addAddressWithLogin } from '../../api/pointsStoreApi';

import AccountsTextInputField from '../../helpers/AccountsTextInputField';
import * as Common from '../../helpers/common'

const AddNewAddressModal = (props) => {
    const theme = useContext(ThemeContext);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const { setModalVisible, modalVisible, _displayAddressWithLogin } = props;
    const [disableButton, setDisableButton] = useState(false);
    const [disableSaveButton, setDisableSaveButton] = useState(false)

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#000616') : setViewBackgroundColor('#FFFFFF');
    }, [theme])


    const handleSubmit = async (values, { resetForm }) => {
        setDisableSaveButton(true);
        try {
            await AddressValidationSchema.validate(values, { abortEarly: false });
        } catch (validationError) {
            console.error(validationError.errors);
            setDisableSaveButton(false);
            return;
        }
        const formData = {
            full_name: values.fullName,
            phone_number: values.phoneNumber,
            address1: values.addressLine1,
            address2: values.addressLine2.trim().length === 0 ? ' ' : values.addressLine2,
            city: values.city,
            post_code: values.postCode,
        }
        const response = await addAddressWithLogin(formData);
        if (response) {
            if (response === 200) {
                _displayAddressWithLogin();
                setDisableSaveButton(false)
                setModalVisible(!modalVisible);
                Toast.show('Saved Successfully', Toast.SHORT)
            }
        }
        else {
            setDisableSaveButton(false)
        }
    };


    const styles = StyleSheet.create({
        ModalFirstContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            paddingHorizontal: scale(16),
            borderRadius: scale(11)
        },
        HeaderWithClose: {
            marginTop: scale(15),
        },
        closeIconContainer: {
            alignSelf: 'flex-end'
        },
        headerContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        modalHeaderText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            marginBottom: scale(25)
        },
        closeIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            marginRight: scale(1),
            bottom: scale(5),
        },
        error: {
            color: 'red',
            textAlign: 'right',
        },
        inputFieldContainer: {
            gap: scale(15),
        },
        saveButton: {
            backgroundColor: (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 6, 22, 0.25)' : 'rgba(255, 255, 255, 0.25)',
            paddingVertical: scale(14),
            borderRadius: scale(6),
            alignItems: 'center',
            marginTop: scale(32)
        },
        saveChanges: {
            color: viewBackgroundColor === '#FFFFFF' ? "#000000" : '#000616',
            fontSize: responsiveFontSize(2),
            fontFamily: 'Gilroy-ExtraBold',
        },
    })

    return (
        // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        //     <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.ModalFirstContainer}>
                    <View style={styles.HeaderWithClose}>
                        <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.closeIconContainer}>
                            <Ionicons name={'close'} size={25} style={styles.closeIcon} />
                        </Pressable>
                        <View style={styles.headerContainer}>
                            <Text style={styles.modalHeaderText}>{Common.account.AddNewAddress}</Text>
                        </View>
                    </View>

                    <View>
                        <View>
                            <Formik
                                initialValues={{ fullName: '', phoneNumber: '', postCode: '', addressLine1: '', addressLine2: '', city: '' }}
                                validationSchema={AddressValidationSchema}
                                onSubmit={handleSubmit}>
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <>
                                        <View style={styles.inputFieldContainer}>
                                            {
                                                Common.AddressInputFields.map((ele, i) => (
                                                    <AccountsTextInputField key={i} viewBackgroundColor={viewBackgroundColor} title={ele.name} formikName={ele.formikName} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                                ))
                                            }
                                            {setDisableButton(!isEmptyObject(errors) ? true : false)}
                                            <Pressable
                                                onPress={handleSubmit}
                                                disabled={disableSaveButton}
                                                style={[styles.saveButton, (values.fullName.length > 0 && values.phoneNumber.length > 0 && values.postCode.length > 0 && values.addressLine1.length > 0 && values.city.length > 0) && { backgroundColor: '#FFBD0A' }]}
                                            >
                                                {
                                                    disableSaveButton ? <ActivityIndicator color={'#000616'} /> :
                                                        <Text style={[styles.saveChanges, { color: (values.fullName.length < 0 && values.phoneNumber.length < 0 && values.postCode.length < 0 && values.addressLine1.length < 0 && values.city.length < 0) && (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 6, 22, 0.3)' : (values.fullName.length < 0 && values.phoneNumber.length < 0 && values.postCode.length < 0 && values.addressLine1.length < 0 && values.city.length < 0) && (viewBackgroundColor !== '#FFFFFF') ? 'rgba(0, 0, 0, 0.3)' : (values.fullName.length > 0 && values.phoneNumber.length > 0 && values.postCode.length > 0 && values.addressLine1.length > 0 && values.city.length > 0) && (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 0, 0, 1)' : ((values.fullName.length > 0 && values.phoneNumber.length > 0 && values.postCode.length > 0 && values.addressLine1.length > 0 && values.city.length > 0)) ? 'rgba(0, 6, 22, 1)' : 'rgba(0, 6, 22, 0.3)' }]}>Save address</Text>
                                                }
                                            </Pressable>

                                        </View>
                                    </>
                                )}
                            </Formik>
                        </View>
                    </View>
                </View>
        //     </ScrollView>
        // </KeyboardAvoidingView>
    )
}

export default AddNewAddressModal