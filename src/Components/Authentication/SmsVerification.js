import { StyleSheet, Text, View, Pressable, TextInput, Image, ActivityIndicator } from 'react-native';
import React, { useRef, useState, useEffect, useContext } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { API_URL } from '@env'

import { fetchAccount, getCreditBalance, getStoreBalance } from '../../ReduxToolKit/apiSlice';
import { generateOtpSmsVerificationWithLogin, verifySmsOtpForAccountWithLogin } from '../../api/accountsApi';

import * as Common from '../../helpers/common';

import ThemeContext from '../../utils/themes/themeWrapper';

import otpErrorCrossSymbol from '../../assets/Images/otpErrorCrossSymbol.png';
import otpSuccess from '../../assets/Images/otpSuccess.png';

import { AuthContext } from '../../Context/AuthContext';


const SmsVerification = (props) => {
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext);
    const { authLogin, setIsHomePageCreateAccountLoginModalVisible } = useContext(AuthContext)
    const { otpModalVisible, setOtpModalVisible, modalPhoneNumber, setIsSmsVerified, guestAccountCreation, jwtToken } = props;

    const otpInputRefs = useRef([]);
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [focusedInputs, setFocusedInputs] = useState([false, false, false, false, false, false]);
    const [otpError, setOtpError] = useState(false);
    const [issuccessVisible, setIsSuccessVisible] = useState(false);
    const [isCrossMarkVisible, setIsCrossMarkVisible] = useState(true);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [disableVerifyButton, setDisableVerifyButton] = useState(false)


    const handleOtpInputChange = (index, value) => {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        if (value.length === 1 && index < otpInputRefs.current.length - 1) {
            otpInputRefs.current[index + 1].focus();
        }
        if (value.length === 0 && index > 0) {
            otpInputRefs.current[index - 1].focus();
        }

        const newFocusedInputs = [...focusedInputs];
        newFocusedInputs[index] = value !== '';
        setFocusedInputs(newFocusedInputs);
    };


    useEffect(() => {
        setIsButtonVisible(!otpValues.includes(''));
        otpValues.includes('') && setOtpError(false);
    }, [otpValues]);

    const _handleVerify = async () => {
        setDisableVerifyButton(true)
        const otp = Number(otpValues.join(''));
        let response = await verifySmsOtpForAccountWithLogin({ otp: otp })
        if (response) {
            setDisableVerifyButton(false)
            if (response.status === 200) {
                setIsSuccessVisible(true);
                setIsCrossMarkVisible(false);
                dispatch(fetchAccount());
                dispatch(getStoreBalance());
                dispatch(getCreditBalance());
                setIsSmsVerified(true)
            }
            else {
                setIsButtonVisible(!isButtonVisible);
            }
        }
        else {
            setOtpError(true);
            setDisableVerifyButton(false);
        }
    }

    const createAccount = async () => {
        setDisableVerifyButton(true)
        const otp = Number(otpValues.join(''));
        axios.post(`${API_URL}verifySmsOtpWithLogin`, { otp: otp }, { "headers": { 'Content-Type': 'application/json', 'Authorization': jwtToken } })
            .then(response => {
                setDisableVerifyButton(false)
                if (response.status === 200) {
                    setIsSuccessVisible(true);
                    setIsCrossMarkVisible(false);
                }
                else {
                    setIsButtonVisible(!isButtonVisible);
                }
            })
            .catch(err => {
                console.log({ err });
                setOtpError(true);
                setDisableVerifyButton(false);
            })
    }


    const resendOtp = async () => {
        setIsButtonVisible(false);
        setOtpValues(['', '', '', '', '', '']);
        setFocusedInputs([false, false, false, false, false, false]);
        otpInputRefs.current[0].focus();
        let response = await generateOtpSmsVerificationWithLogin();
        if (response) {
            Toast.show('Otp sent!', Toast.SHORT);
        }
    };

    const withoutLoginResendOtp = () => {
        setIsButtonVisible(false);
        setOtpValues(['', '', '', '', '', '']);
        otpInputRefs.current[0].focus();
        setFocusedInputs([false, false, false, false, false, false])
        axios.post(`${API_URL}generateOtpSmsVerificationWithLogin`, {}, { "headers": { 'Authorization': jwtToken } })
            .then(resp => {
                Toast.show('Otp sent!', Toast.SHORT);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const closeModal = () => setOtpModalVisible(!otpModalVisible);

    const verifySuccess = () => {
        setIsHomePageCreateAccountLoginModalVisible(false)
        authLogin(jwtToken)
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.theme === 'light' ? '#FFFFFF' : '#141628',
            borderRadius: scale(6)
        },
        crossSymbol: {
            alignSelf: 'flex-end',
            marginTop: scale(16),
            marginRight: scale(17)
        },
        container1: {
            gap: scale(8),
            marginTop: scale(25),
        },
        getStartedText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            color: theme.color,
            textAlign: 'center'
        },
        enterSixText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            textAlign: 'center',
            marginHorizontal: scale(30)
        },
        yellowText: {
            color: '#FFBD0A'
        },
        textInputContainer: {
            flexDirection: 'row',
            gap: scale(10),
            marginTop: scale(17),
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: scale(10)
        },
        textInput: {
            borderWidth: scale(1),
            borderColor: theme.theme === 'light' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
            borderRadius: scale(5.01695),
            paddingVertical: scale(12),
            paddingHorizontal: scale(9),
            textAlign: 'center',
            color: theme.color
        },
        focusedTextInput: {
            borderColor: '#FFBD0A'
        },
        errorContainer: {
            flexDirection: 'row',
            gap: scale(8),
            justifyContent: "center",
            alignItems: 'center'
        },
        errorCrossSymbol: {
            height: scale(12),
            width: scale(12)
        },
        errorText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.6),
            textAlign: 'center',
            color: '#FD5558'
        },
        verifyButton: {
            backgroundColor: theme.theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
            padding: scale(10),
            borderRadius: scale(1.95313),
            marginHorizontal: scale(30),
            marginTop: scale(60),
            borderRadius: scale(3)
        },
        yellowVerifyButton: {
            padding: scale(13),
            borderRadius: scale(1.95313),
            marginHorizontal: scale(30),
            marginTop: scale(60),
            borderRadius: scale(3)
        },
        verifyText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            textAlign: 'center',
            opacity: scale(0.25)
        },
        successVerifyText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            color: '#000616',
            textAlign: 'center',
        },
        haveNotReceivedText: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            textAlign: 'center',
            marginTop: scale(6),
            marginBottom: scale(70)
        },
        container2: {
            marginTop: scale(54),
            gap: scale(7.93)
        },
        successImage: {
            height: scale(60),
            width: scale(60),
            alignSelf: 'center'
        },
        sucessText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            color: theme.color,
            textAlign: 'center',
            marginTop: scale(16)
        },
        verifiedText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            textAlign: 'center',
        },
        continueVerifyButton: {
            padding: scale(13),
            borderRadius: scale(1.95313),
            marginHorizontal: scale(30),
            borderRadius: scale(3),
            marginTop: scale(16),
            marginBottom: scale(120)
        }
    })

    return (
        <View style={styles.container}>
            {
                isCrossMarkVisible &&
                <Pressable onPress={() => guestAccountCreation ? verifySuccess() : setOtpModalVisible(!otpModalVisible)} style={styles.crossSymbol}>
                    <Feather name={'x'} size={25} color={theme.color} />
                </Pressable>
            }
            {
                !issuccessVisible && <View style={styles.container1}>
                    <Text style={styles.getStartedText}>{Common.SmsVerification.LetsGetStarted}</Text>
                    <Text style={styles.enterSixText}>{Common.SmsVerification.PleaseEnterTheDigitCode} <Text style={styles.yellowText}>{modalPhoneNumber}</Text></Text>
                    <View style={styles.textInputContainer}>
                        {
                            [...Array(3)].map((_, index) => (
                                <TextInput value={otpValues[index]} style={[styles.textInput, focusedInputs[index] && styles.focusedTextInput]} key={index} maxLength={1} keyboardType='numeric' onChangeText={(value) => handleOtpInputChange(index, value)}
                                    ref={(ref) => (otpInputRefs.current[index] = ref)}
                                />))
                        }
                        <View></View>
                        {
                            [...Array(3)].map((_, index) => (
                                <TextInput value={otpValues[index + 3]} style={[styles.textInput, focusedInputs[index + 3] && styles.focusedTextInput]} key={index + 3} maxLength={1} keyboardType='numeric' onChangeText={(value) => handleOtpInputChange(index + 3, value)}
                                    ref={(ref) => (otpInputRefs.current[index + 3] = ref)}
                                />))
                        }
                    </View>
                    {
                        otpError &&
                        <View style={styles.errorContainer}>
                            <Image style={styles.errorCrossSymbol} source={otpErrorCrossSymbol} />
                            <Text style={styles.errorText}>{Common.SmsVerification.IncorrectCodePleaseTryAgain}</Text>
                        </View>
                    }
                    {
                        !isButtonVisible ?
                            <View style={styles.verifyButton}>
                                <Text style={styles.verifyText}>{Common.common.Verify}</Text>
                            </View>
                            :
                            <Pressable onPress={() => guestAccountCreation ? createAccount() : _handleVerify()} disable={disableVerifyButton}>
                                <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.yellowVerifyButton}>
                                    {disableVerifyButton ? <ActivityIndicator color={'#000616'} /> : <Text style={styles.successVerifyText}>{Common.common.Verify}</Text>}
                                </LinearGradient>
                            </Pressable>
                    }
                    <Text style={[styles.haveNotReceivedText]}>{Common.SmsVerification.HaventReceivedACode}<Text style={styles.yellowText} onPress={() => guestAccountCreation ? withoutLoginResendOtp() : resendOtp()}>{Common.SmsVerification.ResendCode}</Text></Text>
                </View>
            }

            {
                issuccessVisible && <View style={styles.container2}>
                    <Image style={styles.successImage} source={otpSuccess} />
                    <Text style={styles.sucessText}>{Common.common.success}</Text>
                    <Text style={styles.verifiedText}>{Common.SmsVerification.YourAccountHasBeenVerifiedSuccessfully}</Text>
                    <Pressable onPress={() => guestAccountCreation ? verifySuccess() : closeModal()}>
                        <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.continueVerifyButton} >
                            <Text style={styles.successVerifyText} >{Common.common.Continue}</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            }
        </View>
    )
}

export default SmsVerification;

