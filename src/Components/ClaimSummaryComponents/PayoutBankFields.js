import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { scale, } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';

import { Formik } from 'formik';

import * as Common from '../../helpers/common'

import { addBankDetailsWithLogin, updateBankDetailsWithLogin } from '../../api/PrizeSummaryApi';

import { scrollToElement } from '../../utils/ScrollToElement';
import { PayoutBankValidationSchema } from '../../utils/PayoutBankValidationSchema';

import ClaimTextInputFields from './ClaimTextInputFields';
import ClaimLinearGradientButton from './ClaimLinearGradientButton';


const PayoutBankFields = (props) => {
    const { theme, mainRef, childRef, fetchBankDetails, setIsBankCheckBoxChecked, setIsPaypalCheckBoxChecked, bankInitialValues, isBankUpdate, bankEditId } = props;
    const [isBankAdd, setIsBankAdd] = useState(false);
    const [disableButton, setDisableButton] = useState(false)


    const handleSubmit = async (values) => {
        try {
            await PayoutBankValidationSchema.validate(values, { abortEarly: false });
        } catch (validationError) {
            console.error(validationError.errors);
            return;
        }

        const dataObj = { bank_name: values.fullName, account_number: values.accountNumber, sort_code: values.sortCode };

        const updateBankDetails = async (dataObj) => {
            setDisableButton(true)
            const response = isBankAdd ? await addBankDetailsWithLogin(dataObj) : await updateBankDetailsWithLogin({ ...dataObj, bankId: bankEditId });

            if (response) {
                setDisableButton(false)
                fetchBankDetails();
                setIsBankCheckBoxChecked(false);
                setIsPaypalCheckBoxChecked(false);
                scrollToElement(mainRef, childRef);
                isBankAdd ? Toast.show('Added Successfully', Toast.SHORT) : Toast.show('Updated Successfully', Toast.SHORT)
            } else {
                setDisableButton(false)
            }
        };

        await updateBankDetails(dataObj);
    };


    return (
        <>
            <Formik initialValues={bankInitialValues} validationSchema={PayoutBankValidationSchema} onSubmit={handleSubmit} >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.inputFieldMainContainer}>
                            {
                                Common.PayoutBankFields.map((ele, i) => (
                                    <ClaimTextInputFields key={i} theme={theme} title={ele.name} formikName={ele.formikName} touched={isBankUpdate ? {} : touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                ))
                            }
                        </View>
                        {
                            <ClaimLinearGradientButton handleOnPress={!isBankUpdate ? () => { handleSubmit(); setIsBankAdd(true) } : () => handleSubmit()} title={!isBankUpdate ? `${Common.prizeClaim.SavePayoutMethod}` : `${Common.prizeClaim.UpdatePayoutMethod}`} disabled={disableButton} />
                        }
                    </>
                )}
            </Formik>
        </>
    )
}

export default PayoutBankFields

const styles = StyleSheet.create({
    inputFieldMainContainer: {
        gap: scale(8)
    }
})