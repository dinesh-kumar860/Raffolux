import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';

import Ionicons from 'react-native-vector-icons/Ionicons';

import ThemeContext from '../../utils/themes/themeWrapper'
import AccountsTextInputField from '../../helpers/AccountsTextInputField';

import ClaimLinearGradientButton from './ClaimLinearGradientButton';

import { Formik } from 'formik';

import { addBankDetailsWithLogin, addPaypalDetailsWithLogin, updateBankDetailsWithLogin, updatePaypalDetailsWithLogin } from '../../api/PrizeSummaryApi';
import { addAddressWithLogin, updateAddressDetailsWithLogin } from '../../api/pointsStoreApi';



const ClaimAddDetailsModal = (props) => {
    const theme = useContext(ThemeContext)
    const { id, modalVisible, setModalVisible, initialValues, validationSchema, inputFields, buttonText, type, fetchDetails } = props;

    const [buttonDisable, setButtonDisable] = useState(false)

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.theme == 'dark' ? '#141628' : '#FFF',
            borderRadius: 12
        },
        closeIconContainer: {
            alignSelf: 'flex-end',
            top: 14,
            right: 16,
        },
        formikContainer: {
            marginTop: responsiveHeight(2.2),
            marginHorizontal: responsiveWidth(8)
        },
        formContainer: {
            gap: responsiveHeight(2)
        },
        buttonContainer: {
            marginBottom: responsiveHeight(4.5)
        }
    })


    const handleSubmit = async (value) => {
        let dataObj;
        let updateFunction;
        let successMessage;

        setButtonDisable(true);

        switch (type) {
            case 'paypal':
                dataObj = { mail_id: value.email.trim() };
                updateFunction = addPaypalDetailsWithLogin;
                successMessage = 'Added Successfully';
                break;
            case 'paypalEdit':
                dataObj = { mail_id: value.email.trim(), payPalId: id };
                updateFunction = updatePaypalDetailsWithLogin;
                successMessage = 'Updated Successfully';
                break;
            case 'bank':
                dataObj = { bank_name: value.fullName, account_number: value.accountNumber, sort_code: value.sortCode };
                updateFunction = addBankDetailsWithLogin;
                successMessage = 'Added Successfully';
                break;
            case 'bankEdit':
                dataObj = { bank_name: value.fullName, account_number: value.accountNumber, sort_code: value.sortCode, bankId: id };
                updateFunction = updateBankDetailsWithLogin;
                successMessage = 'Updated Successfully';
                break;
            case 'address':
                dataObj = { full_name: value.fullName, phone_number: value.phoneNumber, post_code: value.postCode, address1: value.addressLine1, address2: value.addressLine2.trim().length === 0 ? ' ' : value.addressLine2, city: value.city };
                updateFunction = addAddressWithLogin;
                successMessage = 'Added Successfully';
                break;
            case 'addressEdit':
                dataObj = { userFullName: value.fullName, userPhoneNumber: value.phoneNumber, postCode: value.postCode, address1: value.addressLine1, address2: value.addressLine2.trim().length === 0 ? ' ' : value.addressLine2, town: value.city, addressId: id };
                updateFunction = updateAddressDetailsWithLogin;
                successMessage = 'Updated Successfully';
                break;

            default:
                setButtonDisable(false);
                return;
        }

        try {
            await validationSchema.validate(value, { abortEarly: false });
            const response = await updateFunction(dataObj);

            if (response) {
                fetchDetails();
                setModalVisible(!modalVisible);
                Toast.show(successMessage, Toast.SHORT);
            } else {
                setModalVisible(!modalVisible);
            }
        } catch (validationError) {
            console.error(validationError.errors);
        } finally {
            setButtonDisable(false);
        }
    };


    return (
        <View style={styles.container}>
            <Pressable onPress={() => setModalVisible(!modalVisible)} style={styles.closeIconContainer} >
                <Ionicons name={'close'} size={22} color={theme.theme == 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'} />
            </Pressable>
            <View style={styles.formikContainer}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <View style={styles.formContainer}>
                                {
                                    inputFields.map((ele, i) => (
                                        <AccountsTextInputField key={i} viewBackgroundColor={theme.theme == 'light' ? '#FFFFFF' : '#000616'} title={ele.name} formikName={ele.formikName} placeHolder={ele.placeHolder} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                    ))
                                }
                            </View>
                            <View style={styles.buttonContainer}>
                                <ClaimLinearGradientButton handleOnPress={handleSubmit} title={buttonText} disabled={buttonDisable} />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </View>
    )
}

export default ClaimAddDetailsModal
