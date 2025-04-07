import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image, ScrollView, BackHandler, SafeAreaView } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Toast from 'react-native-simple-toast';

import SignUpHeader from '../SignInSignUpComponents/SignUpHeader';

import axios from 'axios';
import { API_URL } from '@env'

import { RaffoluxAsyncStorage } from '../../utils/RaffoluxAsyncStorage';
import LinearGradientButton from '../../utils/LinearGradientButton';
import ThemeContext from '../../utils/themes/themeWrapper';

import * as Common from '../../helpers/common';
import * as countries from '../../helpers/CountryList';
import { Url } from '../../helpers/routesApi';

import otpErrorCrossSymbol from '../../assets/Images/otpErrorCrossSymbol.png'
import { AuthContext } from '../../Context/AuthContext';

const SignUpVerificationScreen = ({ route }) => {
	const { countryCode, phoneNumber, jwtToken, firstName } = route.params;
	const navigation = useNavigation();
	const theme = useContext(ThemeContext)
	const { setIsNavVisible } = useContext(AuthContext)
	const [country, setCountry] = useState(countryCode && countryCode);

	const otpInputRefs = useRef([]);
	const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
	const [focusedInputs, setFocusedInputs] = useState([false, false, false, false, false, false]);
	const [otpError, setOtpError] = useState(false);
	const [isButtonVisible, setIsButtonVisible] = useState(false);
	const [isDataFetching, setIsDataFetching] = useState(false)

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
		const removeReferralId = async () => await RaffoluxAsyncStorage.removeItem('referralId')
		removeReferralId()
	}, [])

	useEffect(() => {
		setIsNavVisible(false)
		return () => {
			setIsNavVisible(true)
		}
	}, [])

	useEffect(() => {
		setIsButtonVisible(!otpValues.includes(''));
		otpValues.includes('') && setOtpError(false);
	}, [otpValues]);


	const handleVerify = () => {
		setIsDataFetching(true)
		const otp = otpValues.join('');
		axios.post(`${API_URL}verifySmsOtpWithLogin`, { otp: Number(otp) }, { "headers": { 'Authorization': jwtToken } })
			.then(res => {
				if (res.status === 200) {
					setIsDataFetching(false)
					navigation.navigate('SignUpVerificationSuccessPage', { jwtToken: jwtToken, firstName: firstName })
				}
				else {
					setIsDataFetching(false)
					setIsButtonVisible(!isButtonVisible);
				}
			})
			.catch(err => {
				setOtpError(true);
				setIsDataFetching(false)
			})
	};

	const resendOtp = () => {
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

	const skipThisStep = () => {
		setIsButtonVisible(false);
		setOtpValues(['', '', '', '', '', '']);
		setFocusedInputs([false, false, false, false, false, false]);
		navigation.navigate('SignUpVerificationFail', { jwtToken: jwtToken })
	};

	useFocusEffect(
		React.useCallback(() => {
			const onBackPress = () => {
				return true
			};
			const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
			return () => subscription.remove();
		}, [])
	);

	const styles = StyleSheet.create({
		mainContainer: {
			flex: 1,
			backgroundColor: theme.background
		},
		themeColor: {
			color: theme.color
		},
		container: {
			marginHorizontal: scale(18),
			marginTop: scale(25)
		},
		singleFieldContainer: {
			gap: scale(5),
			marginTop: scale(28),
			marginBottom: scale(35)
		},
		dropDownContainer: {
			flexDirection: 'row',
			gap: scale(12),
		},
		dropdown: {
			flex: 1,
			backgroundColor: theme.theme == 'light' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
			height: responsiveHeight(6.2),
			width: 108,
			borderRadius: scale(4),
			paddingHorizontal: scale(8),
			borderWidth: scale(1.24),
			borderColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255,255,255,0.2)',
			color: theme.color
		},
		selectedTextStyle: {
			fontSize: responsiveFontSize(2),
			marginLeft: scale(1),
			color: theme.color,
		},
		iconStyle: {
			width: scale(15),
			height: scale(15),
			resizeMode: 'cover'
		},
		imageStyle: {
			width: scale(15),
			height: scale(15),
			resizeMode: 'stretch',
		},
		placeholderStyle: {
			fontSize: responsiveFontSize(2),
			color: theme.theme == 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)'
		},
		fieldNameText: {
			fontFamily: 'NunitoSans-Regular',
			fontSize: responsiveFontSize(1.8),
			opacity: scale(0.8),
			color: theme.color,
		},
		countryPhoneContainer: {
			flex: 1
		},
		input: {
			height: responsiveHeight(6.2),
			paddingLeft: scale(25),
			backgroundColor: theme.theme == 'light' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
			borderRadius: scale(4),
			fontSize: responsiveFontSize(2),
			fontFamily: 'NunitoSans-Regular',
			borderWidth: scale(1.24),
			borderColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255,255,255,0.2)',
			color: theme.color,
			justifyContent: "center"
		},
		horizontalLine: {
			height: scale(1),
			backgroundColor: theme.theme == 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'
		},
		otpVerificationContainer: {
			marginTop: scale(29),
			gap: scale(22)
		},
		enterSixText: {
			fontFamily: 'NunitoSans-Regular',
			fontSize: responsiveFontSize(1.9),
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
			justifyContent: 'center',
			alignItems: 'center',
			marginHorizontal: scale(10)
		},
		textInput: {
			borderWidth: scale(1),
			borderColor: theme.theme === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
			flex: 1,
			borderRadius: scale(5.01695),
			height: responsiveHeight(7.2),
			width: responsiveWidth(10),
			textAlign: 'center',
			color: theme.color
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
			borderRadius: scale(3),
			height: responsiveHeight(7.2),
			alignItems: 'center',
			justifyContent: 'center'
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
			fontSize: responsiveFontSize(2.2),
			color: theme.color,
			opacity: scale(0.25)
		},
		youDidntText: {
			fontFamily: 'NunitoSans-Regular',
			fontSize: responsiveFontSize(1.4),
			color: theme.color,
			textAlign: 'center',
		},
		skipText: {
			fontFamily: 'NunitoSans-Regular',
			fontSize: responsiveFontSize(2),
			color: theme.color,
			textAlign: 'center',
			marginTop: responsiveHeight(9.5)
		},
		focusedTextInput: {
			borderColor: '#FFBD0A'
		}
	})

	return (
		<SafeAreaView style={styles.mainContainer}>
			<ScrollView>
				<View style={styles.container}>
					<SignUpHeader title={Common.SignUpVerification.VerifyYourAccountToClaimYourFREEBONUS} theme={theme} />
					<View style={styles.singleFieldContainer}>
						<Text style={styles.fieldNameText}>{Common.common.PhoneNumber}</Text>
						<View style={styles.dropDownContainer}>
							<View>
								<SelectCountry
									style={styles.dropdown}
									selectedTextStyle={styles.selectedTextStyle}
									placeholderStyle={styles.placeholderStyle}
									imageStyle={styles.imageStyle}
									iconStyle={styles.iconStyle}
									maxHeight={200}
									value={country}
									data={countries.CountryList}
									valueField="dialCode"
									labelField="dialCode"
									imageField='image'
									placeholder="Country"
									searchPlaceholder="Search..."
									disable={true}
									onChange={e => {
										setCountry(e.dialCode);
									}}
								/>
							</View>
							<View style={styles.countryPhoneContainer}>
								<View style={styles.input}>
									<Text style={styles.themeColor}>{phoneNumber}</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.horizontalLine}></View>
					<View style={styles.otpVerificationContainer}>
						<Text style={styles.enterSixText}>{Common.SignUpVerification.PleaseEnterThe6digit} <Text style={styles.yellowText}>{country} {phoneNumber}</Text></Text>
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
							otpError && <View style={styles.errorContainer}>
								<Image style={styles.errorCrossSymbol} source={otpErrorCrossSymbol} />
								<Text style={styles.errorText}>{Common.SignUpVerification.IncorrectCodePleaseTryAgain}</Text>
							</View>
						}
						<Text style={[styles.enterSixText]}>{Common.SignUpVerification.DidntReceiveACode}<Text style={styles.yellowText} onPress={() => resendOtp()}> {Common.SignUpVerification.ResendCode}</Text></Text>
						{
							!isButtonVisible && <Pressable style={styles.verifyButton} >
								<Text style={styles.verifyText}>{Common.SignUpVerification.Verify}</Text>
							</Pressable>
						}
						{
							isButtonVisible && <LinearGradientButton title={Common.SignUpVerification.Verify} onPress={handleVerify} isDataFetching={isDataFetching} />
						}
						<Text style={styles.youDidntText}>{Common.SignUpVerification.IfYouDidntReceiveACodePlease}</Text>
					</View>
					<Text style={styles.skipText} onPress={() => skipThisStep()}>{Common.SignUpVerification.SkipThisStep}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignUpVerificationScreen

