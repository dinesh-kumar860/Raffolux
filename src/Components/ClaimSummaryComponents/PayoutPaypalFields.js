import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
import Toast from 'react-native-simple-toast';

import { Formik } from 'formik';
import * as yup from 'yup';

import { addPaypalDetailsWithLogin, updatePaypalDetailsWithLogin } from '../../api/PrizeSummaryApi';

import { scrollToElement } from '../../utils/ScrollToElement';

import * as Common from '../../helpers/common'

import ClaimTextInputFields from './ClaimTextInputFields';
import ClaimLinearGradientButton from './ClaimLinearGradientButton';


const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required')
        .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Invalid email address')
        .trim(),

});

const PayoutPaypalFields = (props) => {
    const { theme, mainRef, childRef, fetchPaypalDetails, setIsBankCheckBoxChecked, setIsPaypalCheckBoxChecked, paypalInitialValues, isPaypalUpdate, paypalEditId } = props;
    const [isPaypalAdd, setIsPaypalAdd] = useState(false);
    const [disableButton, setDisableButton] = useState(false)

    const handleSubmit = async (values) => {
        const dataObj = { mail_id: values.email.trim() }

        const updatePaypalDetails = async () => {
            setDisableButton(true)
            const response = isPaypalAdd ? await addPaypalDetailsWithLogin(dataObj) : await updatePaypalDetailsWithLogin({ ...dataObj, payPalId: paypalEditId });

            if (response) {
                setDisableButton(false);
                fetchPaypalDetails();
                setIsBankCheckBoxChecked(false);
                setIsPaypalCheckBoxChecked(false)
                scrollToElement(mainRef, childRef);
                isPaypalAdd ? Toast.show('Added Successfully', Toast.SHORT) : Toast.show('Updated Successfully', Toast.SHORT)
            } else {
                setDisableButton(false);
            }
        }
        await updatePaypalDetails(dataObj);
    };

    return (
        <>
            <Formik initialValues={paypalInitialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.inputFieldMainContainer}>
                            <ClaimTextInputFields theme={theme} title={Common.prizeClaim.PayPalEmailAddress} formikName={Common.prizeClaim.email} touched={isPaypalUpdate ? {} : touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                        </View>
                        {
                            <ClaimLinearGradientButton handleOnPress={!isPaypalUpdate ? () => { handleSubmit(); setIsPaypalAdd(true) } : () => handleSubmit()} title={!isPaypalUpdate ? `${Common.prizeClaim.SavePayoutMethod}` : `${Common.prizeClaim.UpdatePayoutMethod}`} disabled={disableButton} />
                        }
                    </>
                )}
            </Formik>
        </>
    )
}

export default PayoutPaypalFields

const styles = StyleSheet.create({
    inputFieldMainContainer: {
        gap: scale(8)
    }
})