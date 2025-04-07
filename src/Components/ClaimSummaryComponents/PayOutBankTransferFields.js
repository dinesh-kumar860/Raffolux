import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PayOutBankTransferFields = () => {

    const validationSchema = yup.object().shape({
        fullName: yup
            .string()
            .required('Full name is required')
            .matches(/^(?!.*\s{2})[A-Za-z0-9\s]{1,50}$/, 'Invalid name')
            .min(2, 'Name must be at least 2 characters')
            .trim(),
        sortCode: yup
            .string()
            .required('PostCode is required')
            .matches(/^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\s?\d[A-Za-z]{2}$/, 'Invalid Post Code')
            .trim(),
        accountNumber: yup
            .string()
            .required('Address is required')
            .trim(),

    });
    return (
        <>
            <Formik
                initialValues={{
                    fullName: '',
                    sortCode: '',
                    accountNumber: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <>
                        <View style={styles.singleInputFieldContainer}>
                            <Text style={[styles.addressInputName, { color: theme.color }]}>Postcode</Text>
                            <TextInput style={[styles.addressInputField, {
                                color: theme.color, backgroundColor: theme.theme === 'dark' ? 'rgba(216, 216, 216, 0.40)' : '#FAFAFC', borderColor: touched.fullName && errors.fullName
                                    ? 'red'
                                    : theme.theme === 'dark' ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.10)'
                            }]}
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                            />
                            {
                                errors.fullName && touched.fullName && (
                                    <Text style={styles.error}>
                                        {errors.fullName}
                                    </Text>
                                )
                            }
                        </View>
                        <View style={styles.singleInputFieldContainer}>
                            <Text style={[styles.addressInputName, { color: theme.color }]}>Postcode</Text>
                            <TextInput style={[styles.addressInputField, {
                                color: theme.color, backgroundColor: theme.theme === 'dark' ? 'rgba(216, 216, 216, 0.40)' : '#FAFAFC', borderColor: touched.sortCode && errors.sortCode
                                    ? 'red'
                                    : theme.theme === 'dark' ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.10)'
                            }]}
                                onChangeText={handleChange('sortCode')}
                                onBlur={handleBlur('sortCode')}
                                value={values.sortCode}
                            />
                            {
                                errors.sortCode && touched.sortCode && (
                                    <Text style={styles.error}>
                                        {errors.sortCode}
                                    </Text>
                                )
                            }
                        </View>
                        <View style={styles.singleInputFieldContainer}>
                            <Text style={[styles.addressInputName, { color: theme.color }]}>Postcode</Text>
                            <TextInput style={[styles.addressInputField, {
                                color: theme.color, backgroundColor: theme.theme === 'dark' ? 'rgba(216, 216, 216, 0.40)' : '#FAFAFC', borderColor: touched.accountNumber && errors.accountNumber
                                    ? 'red'
                                    : theme.theme === 'dark' ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.10)'
                            }]}
                                onChangeText={handleChange('accountNumber')}
                                onBlur={handleBlur('accountNumber')}
                                value={values.accountNumber}
                            />
                            {
                                errors.accountNumber && touched.accountNumber && (
                                    <Text style={styles.error}>
                                        {errors.accountNumber}
                                    </Text>
                                )
                            }
                        </View>
                    </>
                )}
            </Formik>
        </>

    )
}

export default PayOutBankTransferFields

const styles = StyleSheet.create({})