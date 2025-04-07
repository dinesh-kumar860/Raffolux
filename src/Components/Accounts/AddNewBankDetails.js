import { View, Text, StyleSheet, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import Toast from 'react-native-simple-toast';

import { Formik } from 'formik';
import * as Common from '../../helpers/common'

import { PayoutBankValidationSchema } from '../../utils/PayoutBankValidationSchema';
import ThemeContext from '../../utils/themes/themeWrapper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { addBankDetailsWithLogin, updateBankDetailsWithLogin } from '../../api/PrizeSummaryApi';
import AccountsTextInputField from '../../helpers/AccountsTextInputField';

const AddNewBankDetails = (props) => {
    const { modalVisible, setModalVisible, bank_name, account_number, sort_code, id, isEdit, fetchBankDetails, setPayoutModalVisible, payoutModalVisible } = props;
    const theme = useContext(ThemeContext);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [isAdd, setIsAdd] = useState(false)

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme])


    const handleSubmit = async (value, { resetForm }) => {
        setDisableButton(true)
        try {
            await PayoutBankValidationSchema.validate(value, { abortEarly: false });
        } catch (validationError) {
            console.error(validationError.errors);
            setDisableButton(false);
            return;
        }
        if (isAdd === true) {
            let dataObj = {
                bank_name: value.fullName,
                account_number: value.accountNumber,
                sort_code: value.sortCode
            }
            let response = await addBankDetailsWithLogin(dataObj);
            if (response) {
                setDisableButton(false)
                fetchBankDetails();
                setPayoutModalVisible(!payoutModalVisible);
                Toast.show(Common.account.SavedSuccessfully, Toast.SHORT);
            }
            else {
                setDisableButton(false)
            }
        }
        else {
            let dataObj = {
                bankId: id,
                bank_name: value.fullName,
                account_number: value.accountNumber,
                sort_code: value.sortCode
            }
            let response = await updateBankDetailsWithLogin(dataObj);
            if (response) {
                setDisableButton(false)
                fetchBankDetails()
                setModalVisible(!modalVisible);
                Toast.show(Common.account.UpdatedSuccessfully, Toast.SHORT);
            }
            else {
                setDisableButton(false)
            }
        }
    }

    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: isEdit ? 'rgba(0, 0, 0, 0.70)' : 'rgba(0, 0, 0, 0.00010)',
        },
        ModalFirstContainer: {
            paddingHorizontal: scale(10),
            paddingBottom: scale(40),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderTopRightRadius: scale(12),
            borderTopLeftRadius: scale(12),
        },
        headerBarIcon: {
            marginLeft: scale(5),
            alignItems: 'center'
        },
        headerContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        topIcons: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        HeaderWithClose: {
            marginTop: scale(15),
        },
        modalHeaderText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: scale(25),
            marginTop: scale(15)
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
            gap: scale(15),
        },
        saveButton: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.25)' : 'rgba(255, 255, 255, 0.25)',
            height: 48,
            borderRadius: scale(6),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(8)
        },
        saveChanges: {
            color: viewBackgroundColor === '#FFFFFF' ? "rgba(0, 0, 0, 0.3)" : 'rgba(0, 0, 0, 0.3)',
            fontSize: responsiveFontSize(2),
            fontFamily: 'Gilroy-ExtraBold',
        }
    })

    return (
        <View style={styles.ModalFirstContainer}>
            <View style={styles.HeaderWithClose}>
                <View style={styles.topIcons}>
                    <Pressable style={styles.headerBarIcon} onPress={() => setModalVisible(!modalVisible)} >
                        <AntDesign name={'left'} size={18} style={styles.leftArrowIcon} />
                    </Pressable>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <Ionicons name={'close'} size={25} style={styles.closeIcon} />
                    </Pressable>
                </View>
            </View>
            <View style={styles.headerContainer}>
                <Text style={styles.modalHeaderText}>
                    {
                        isEdit ? `${Common.account.EditBankDetails}` : `${Common.account.AddNewBankDetails}`
                    }
                </Text>
            </View>
            <View>
                <View>
                    <Formik
                        initialValues={{
                            fullName: bank_name ? bank_name : '',
                            sortCode: sort_code ? sort_code : '',
                            accountNumber: account_number ? account_number : '',
                        }}
                        validationSchema={PayoutBankValidationSchema}
                        onSubmit={handleSubmit}>
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <>
                                <View style={styles.inputFieldContainer}>
                                    {
                                        Common.PayoutBankFields.map((ele, i) => (
                                            <AccountsTextInputField key={i} viewBackgroundColor={viewBackgroundColor} title={ele.name} formikName={ele.formikName} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                        ))
                                    }
                                    {
                                        <TouchableOpacity
                                            onPress={isEdit === true ? () => { handleSubmit(); setIsAdd(false) } : () => { handleSubmit(); setIsAdd(true) }}
                                            style={[styles.saveButton, (values.fullName.length > 0 && values.sortCode.length > 0 && values.accountNumber.length > 0) && { backgroundColor: '#FFBD0A' }]}
                                            disabled={!values.fullName || !values.sortCode || !values.accountNumber || disableButton}
                                        >
                                            {
                                                disableButton === false ?
                                                    <Text style={[styles.saveChanges, { color: (values.fullName.length < 0 && values.sortCode.length < 0 && values.accountNumber.length < 0) && (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 6, 22, 0.3)' : (values.fullName.length < 0 && values.sortCode.length < 0 && values.accountNumber.length < 0) && (viewBackgroundColor !== '#FFFFFF') ? 'rgba(0, 0, 0, 0.3)' : (values.fullName.length > 0 && values.sortCode.length > 0 && values.accountNumber.length > 0) && (viewBackgroundColor === '#FFFFFF') ? 'rgba(0, 0, 0, 1)' : ((values.fullName.length > 0 && values.sortCode.length > 0 && values.accountNumber.length > 0)) ? 'rgba(0, 6, 22, 1)' : 'rgba(0, 6, 22, 0.3)' }]}>{isEdit === true ? `Update details` : `Save details`}</Text>
                                                    :
                                                    <ActivityIndicator color={'#000616'} />
                                            }
                                        </TouchableOpacity>
                                    }
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </View>
        </View>
    )
}

export default AddNewBankDetails