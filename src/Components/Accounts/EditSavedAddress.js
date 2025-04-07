import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Formik } from 'formik';

import { AddressValidationSchema } from '../../utils/AddressValidationSchema';
import ThemeContext from '../../utils/themes/themeWrapper';

import { updateAddressDetailsWithLogin } from '../../api/pointsStoreApi';

import AccountsTextInputField from '../../helpers/AccountsTextInputField';
import * as Common from '../../helpers/common';


const EditSavedAddressModal = (props) => {
    const { setEditModalVisible, editModalVisible, _displayAddressWithLogin, id, full_name, phone_no, post_code, address_line_1, address_line_2, city } = props;
    const theme = useContext(ThemeContext);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#00616') : setViewBackgroundColor('#FFFFFF');
    }, [theme])


    const handleSubmit = async (values, { resetForm }) => {
        setDisableButton(true)
        try {
            await AddressValidationSchema.validate(values, { abortEarly: false });
        } catch (validationError) {
            console.error(validationError.errors);
            setDisableButton(false);
            return;
        }
        const formData = {
            userFullName: values.fullName,
            userPhoneNumber: Number(values.phoneNumber),
            postCode: values.postCode,
            address1: values.addressLine1,
            address2: values.addressLine2,
            town: values.city,
            addressId: id
        }
        let result = await updateAddressDetailsWithLogin(formData);
        if (result) {
            setDisableButton(false)
            _displayAddressWithLogin();
            setEditModalVisible(!editModalVisible);
            Toast.show('Updated Successfully', Toast.SHORT)
        }
        else {
            setDisableButton(false)
        }
    }


    const styles = StyleSheet.create({
        ModalFirstContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            paddingHorizontal: scale(15),
            borderRadius: scale(11)
        },
        HeaderWithClose: {
            marginTop: scale(15),
            justifyContent: 'center',
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
        closeIconContainer: {
            alignSelf: 'flex-end',
            justifyContent: 'center',
            alignItems: 'center'
        },
        closeIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            marginRight: scale(1),
            bottom: scale(5),
        },
        inputFieldContainer: {
            gap: scale(15),
        },
        saveButton: {
            backgroundColor: (viewBackgroundColor === '#FFFFFF' && disableButton === true) ? 'rgba(255, 255, 255, 0.25)' : (viewBackgroundColor !== '#FFFFFF' && disableButton !== true) ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 6, 22, 0.25)',
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
                        <Pressable onPress={() => setEditModalVisible(!editModalVisible)} style={styles.closeIconContainer}>
                            <Ionicons name={'close'} size={25} style={styles.closeIcon} />
                        </Pressable>
                        <View style={styles.headerContainer}>
                            <Text style={styles.modalHeaderText}>{Common.account.EditSavedAddress}</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Formik
                                initialValues={{
                                    fullName: full_name ? full_name : '',
                                    phoneNumber: phone_no ? phone_no : '',
                                    postCode: post_code ? post_code : '',
                                    addressLine1: address_line_1 ? address_line_1 : '',
                                    addressLine2: address_line_2 ? address_line_2 : '',
                                    city: city ? city : ''
                                }}
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
                                            <Pressable onPress={handleSubmit}
                                                disabled={!values.fullName || !values.phoneNumber || !values.postCode || !values.addressLine1 || !values.city || disableButton}
                                                style={[styles.saveButton, (values.fullName.length > 0 && values.phoneNumber.length > 0 && values.postCode.length > 0 && values.addressLine1.length > 0 && values.city.length > 0) && { backgroundColor: '#FFBD0A' }]}
                                            >
                                                {
                                                    disableButton ? <ActivityIndicator color={'#000616'} />
                                                        :
                                                        <Text style={[styles.saveChanges, { color: (values.fullName.length < 0 && values.phoneNumber.length < 0 && values.postCode.length < 0 && values.addressLine1.length < 0 && values.city.length < 0) && (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 6, 22, 0.3)' : (values.fullName.length < 0 && values.phoneNumber.length < 0 && values.postCode.length < 0 && values.addressLine1.length < 0 && values.city.length < 0) && (viewBackgroundColor !== '#FFFFFF') ? 'rgba(0, 0, 0, 0.3)' : (values.fullName.length > 0 && values.phoneNumber.length > 0 && values.postCode.length > 0 && values.addressLine1.length > 0 && values.city.length > 0) && (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 0, 0, 1)' : ((values.fullName.length > 0 && values.phoneNumber.length > 0 && values.postCode.length > 0 && values.addressLine1.length > 0 && values.city.length > 0)) ? 'rgba(0, 6, 22, 1)' : 'rgba(0, 6, 22, 0.3)' }]}>Save changes</Text>
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

export default EditSavedAddressModal