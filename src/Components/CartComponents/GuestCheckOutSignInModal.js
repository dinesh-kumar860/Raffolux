import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import React, { useContext, useState } from 'react';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Formik } from 'formik';
import * as yup from 'yup';
import { API_URL, VUE_FRONTEND_URL } from '@env'

import * as Common from '../../helpers/common';
import { openLink } from '../../helpers/OpenBrowser';

import { RaffoluxAsyncStorage } from '../../utils/RaffoluxAsyncStorage';
import { AuthContext } from '../../Context/AuthContext';
import InAppBrowser from 'react-native-inappbrowser-reborn';



const validationSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required')
        .matches(/^(?!.*\s{2})[A-Za-z0-9\s]+$/, 'Invalid name')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .trim(),
    lastName: yup
        .string()
        .required('Last name is required')
        .matches(/^(?!.*\s{2})[A-Za-z0-9\s]+$/, 'Invalid last name')
        .min(1, 'Last name must be at least 1 character')
        .max(50, 'Last name must be less than 50 characters')
        .trim(),
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|int|mil|biz|info|coop|aero|museum|[a-zA-Z]{2,3})$/, 'Invalid email address')
        .trim()
    // .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Invalid email address')
});

const GuestCheckOutSignInModal = (props) => {
    const { theme, modalVisible, setModalVisible, totalAmount, cartData } = props;
    const navigation = useNavigation();
    const { setIsUserExists } = useContext(AuthContext);

    const [toggleCheckBox, setToggleCheckBox] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorEmailMessage, setEmailErrorMessage] = useState(null);


    const TextInputFields = ({ title, placeHolder, formikName, values, handleChange, errors, touched }) => {
        return (
            <View style={styles.formContainer}>
                <Text style={styles.titleText}>{title}</Text>
                <TextInput
                    style={[styles.input, (touched[formikName] && errors[formikName]) || (formikName == 'email' && errorEmailMessage) ? styles.inputError : null]}
                    placeholder={placeHolder}
                    onChangeText={handleChange(formikName)}
                    value={values[formikName]}
                    placeholderTextColor={theme.theme == Common.common.light ? `rgba(0,0,0,0.4)` : `rgba(255,255,255,0.4)`}
                    onChange={() => formikName == 'email' && setEmailErrorMessage(null)}
                />
                {errors[formikName] && touched[formikName] && (<Text style={styles.error}>{errors[formikName]}</Text>)}
                {formikName == 'email' && errorEmailMessage && (<Text style={styles.error}>{errorEmailMessage}</Text>)}
            </View>
        )

    };

    const handleNavigation = (route) => {
        setModalVisible(!modalVisible)
        navigation.navigate(route)
    };

    const handleSubmit = async (values) => {
        let ticketsPayload = cartData?.map((ele, i) => {
            return {
                raffleId: Number(ele.id),
                numberOftickets: Number(ele.numberOftickets)
            }
        });

        let dataObj = { firstName: values.firstName.trim(), lastName: values.lastName.trim(), email: values.email.trim().toLowerCase(), tickets: ticketsPayload, raffle_updates_opt: toggleCheckBox };

        setButtonDisable(true)
        setErrorMessage(null)
        setEmailErrorMessage(null)
        try {
            await fetch(`${API_URL}guestCheckout`, {
                method: 'POST',
                headers: { "Content-type": "application/json; charset=UTF-8", },
                body: JSON.stringify(dataObj)
            }).then((res) => res.json())
                .then(async (response) => {
                    setButtonDisable(false)
                    if (response == "User Already Exists") {
                        setModalVisible(!modalVisible)
                        setIsUserExists(true);
                        navigation.navigate('Authentication');
                    } else if (response == "All tickets are sold" || response == "Ticket limit exceeded") {
                        setErrorMessage(response)
                    }
                    else if (response.message) {
                        setErrorMessage(response.message)
                    } else if (response.data) {
                        if (Platform.OS !== 'ios') {
                            setModalVisible(!modalVisible);
                        }
                        await RaffoluxAsyncStorage.setItem(Common.common.cartIdDetails, { cartId: response.data.cartId, userId: response.data.userId, name: values.firstName, totalAmount: totalAmount, userEmail: values.email, raffleUpdatesOpt: toggleCheckBox })
                        openDnaBrowserLink(`${VUE_FRONTEND_URL}mblDnaPaymentsWithoutLogin?cartId=${response.data.cartId}&&userId=${response.data.userId}&&access_token=${response.data.wallet.paymentData.access_token}&&invoiceId=${response.data.wallet.invoiceId}&&theme=${theme.theme == "light" ? false : true}`)
                    }
                })
        } catch (error) {
            setButtonDisable(false)
            console.log({ error })
        }
    };

  const openDnaBrowserLink = async (url) => {
        try {
            await InAppBrowser.isAvailable();
            await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: 'gray',
                preferredControlTintColor: 'white',
                // Android Properties
                showTitle: true,
                toolbarColor: '#6200EE',
                secondaryToolbarColor: 'black',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: true,
                incognito:true,
                
            }).then((result) => {
                if(result.type == "cancel"){
                    setModalVisible(false)
                }
                // Alert.alert(JSON.stringify(result))
                return result
            })
        } catch (error) {
            // Alert.alert(error.message)
            console.log(error)
        }
        
    }


    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.background,
            paddingHorizontal: scale(15),
            borderRadius: 12
        },
        closeIcon: {
            alignSelf: 'flex-end',
            marginTop: responsiveHeight(2.5),
        },
        headerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            textAlign: 'center',
            color: theme.color,
            marginTop: responsiveHeight(1)
        },
        headerSubText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            opacity: 0.9,
            textAlign: 'center',
            marginTop: responsiveHeight(1.5),
            color: theme.color
        },
        formMainContainer: {
            gap: scale(12),
            marginTop: scale(22)
        },
        input: {
            height: responsiveHeight(6.2),
            paddingLeft: scale(16),
            backgroundColor: theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.10)' : 'rgba(0,0,0,0.10)',
            borderRadius: scale(4),
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            borderWidth: scale(1.1),
            borderColor: theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            color: theme.color
        },
        placeHolderTextColor: {
            opacity: scale(0.2),
        },
        formContainer: {
            gap: scale(4),
        },
        titleText: {
            fontSize: responsiveFontSize(1.5),
            fontFamily: 'NunitoSans-Regular',
            color: theme.color
        },
        orangeText: {
            color: '#FFBD0A'
        },
        inputError: {
            borderColor: 'red',
            borderWidth: scale(0.5),
        },
        error: {
            color: 'red',
            textAlign: 'right',
        },
        checkBoxContainer: {
            flexDirection: 'row',
            gap: scale(10),
            marginTop: responsiveHeight(1)
        },
        checkBoxText: {
            flex: 1,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.5),
            color: theme.color,
            opacity: 0.8
        },
        buttonContainer: {
            height: responsiveHeight(6.2),
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: buttonDisable ? 'center' : 'space-between',
            paddingHorizontal: scale(19),
            borderRadius: scale(4),
            marginTop: responsiveHeight(1.5)
        },
        buttonText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            color: '#1C1C27',
        },
        termsText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.2),
            lineHeight: 18,
            color: theme.color,
            marginBottom: responsiveHeight(5)
        },
        errorMessage: {
            textAlign: 'center',
            color: 'red'
        }
    })

    return (
        <View style={styles.container}>
            <Ionicons name={Common.common.close} size={25} style={styles.closeIcon} color={theme.color} onPress={() => setModalVisible(!modalVisible)} />
            <Text style={styles.headerText}>{Common.GuestCheckout.GuestCheckout}</Text>
            <Text style={styles.headerSubText}>{Common.GuestCheckout.HaveAnAccount} <Text style={styles.orangeText} onPress={() => handleNavigation(Common.common.Authentication)}>{Common.common.SignIn}</Text></Text>
            <Formik initialValues={{ firstName: '', lastName: '', email: '' }} validationSchema={validationSchema} onSubmit={handleSubmit} >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
                    <View style={styles.formMainContainer}>
                        <TextInputFields title={Common.common.FirstName} placeHolder={Common.common.enterYourName} formikName={Common.common.firstName} values={values} handleChange={handleChange} errors={errors} touched={touched} />
                        <TextInputFields title={Common.common.LastName} placeHolder={Common.common.enterYourLastName} formikName={Common.common.lastName} values={values} handleChange={handleChange} errors={errors} touched={touched} />
                        <TextInputFields title={Common.common.EmailAddress} placeHolder={Common.common.enterYourEmailAddress} formikName={Common.common.email} values={values} handleChange={handleChange} errors={errors} touched={touched} />
                        <View style={styles.checkBoxContainer}>
                            <CheckBox
                                style={[styles.checkBox, { transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }]}
                                tintColors={{ true: '#FFBD0A', false: theme.theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0, 6, 22, 0.20)' }}
                                onCheckColor={theme.color}
                                disabled={false}
                                value={toggleCheckBox}
                                onValueChange={newValue => setToggleCheckBox(newValue)}
                                boxType='square'
                                onFillColor='#FFBD0A'
                                onTintColor='#FFBD0A'
                            />
                            <Text style={styles.checkBoxText}>{Common.GuestCheckout.IWouldLikeToReceiveExciting}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleSubmit()} disabled={buttonDisable} >
                            <LinearGradient colors={Common.common.linearGradientColors} style={styles.buttonContainer}>
                                {
                                    buttonDisable ? <ActivityIndicator color={'#000616'} /> :
                                        <>
                                            <Text style={styles.buttonText}>{Common.GuestCheckout.ContinueToPayment}</Text>
                                            <Text style={styles.buttonText}>{Common.common.poundSymbol}{totalAmount}</Text>
                                        </>
                                }
                            </LinearGradient>
                        </TouchableOpacity>
                        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                        <Text style={styles.termsText}>{Common.GuestCheckout.ByContinuingToPaymentYouAgree} <Text style={styles.orangeText} onPress={() => handleNavigation(Common.common.TermsAndConditions)} >{Common.GuestCheckout.TermsandConditions}</Text> {Common.GuestCheckout.and} <Text style={styles.orangeText} onPress={() => handleNavigation(Common.common.PrivacyAndPolicy)}>{Common.GuestCheckout.PrivacyPolicy}</Text>.</Text>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default GuestCheckOutSignInModal
