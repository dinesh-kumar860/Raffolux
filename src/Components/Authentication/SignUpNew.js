import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { API_URL } from '@env'

import LinearGradientButton from '../../utils/LinearGradientButton';
import { RaffoluxAsyncStorage } from '../../utils/RaffoluxAsyncStorage';
import ThemeContext from '../../utils/themes/themeWrapper';

import SocialMediaContainer from '../SignInSignUpComponents/SocialMediaContainer';

import { openLink } from '../../helpers/OpenBrowser';
import * as Common from '../../helpers/common';

import googleImage from '../../assets/Images/googleImageLogo.png';
import facebookImage from '../../assets/Images/facebookImageLogo.png'


const SignUpNew = (props) => {
	const { signInTab } = props
	const navigation = useNavigation();
	const theme = useContext(ThemeContext)
	const [isDataFetching, setIsDataFetching] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email('Invalid email address')
			.required('Email is required')
			.matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Invalid email address')
			.trim()
	})

	const googleSignUp = () => {
		axios.post(`${API_URL}socialSignUp/google/mobile`,)
			.then(res => {
				if (res.data.status === 200) {
					openLink(res.data.data.redirectUrl)
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	const facebookSignUp = () => {
		axios.post(`${API_URL}socialSignUp/facebook/mobile`,)
			.then(res => {
				if (res.data.status === 200) {
					openLink(res.data.data.redirectUrl)
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	const handleEmailError = () => setErrorMessage('');

	const handleSubmit = async (values) => {
		setIsDataFetching(true);
		try {
			let signUpData = { email: values.email.trim() };
			await fetch(`${API_URL}checkEmail`, {
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
				body: JSON.stringify(signUpData),
			})
				.then((response) => response.json())
				.then(async (data) => {
					setIsDataFetching(false)
					let referralId = await RaffoluxAsyncStorage.getItem('referralId')
					if (data.message === 'New email') {
						navigation.navigate('SignUpScreen2', { signInTab: signInTab, email: values.email, referralId: referralId })
					}
					if (data.message === 'User Email Already Exists') {
						setErrorMessage(data.message)
					}
					if (data === 'Invalid Request') {
						setErrorMessage('Invalid Email Id')
					}
				})
		} catch (error) {
			setIsDataFetching(false)
		}
	};

	const styles = StyleSheet.create({
		headerText: {
			fontSize: responsiveFontSize(3),
			fontFamily: 'Gilroy-ExtraBold',
			textAlign: 'center',
			color: theme.color,
			opacity: scale(0.8999)
		},
		input: {
			flex: 1,
			height: responsiveHeight(6.2),
			paddingLeft: scale(16),
			backgroundColor: theme.theme == 'light' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
			borderRadius: scale(4),
			fontSize: responsiveFontSize(2),
			fontFamily: 'NunitoSans-Regular',
			borderWidth: scale(1.1),
			borderColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255,255,255,0.2)',
			color: theme.color
		},
		placeHolderTextColor: {
			opacity: scale(0.2),
		},
		formContainer: {
			gap: scale(15),
			marginTop: scale(22)
		},
		horizontalLineContainer: {
			flex: 1,
			flexDirection: "row",
			alignItems: 'center',
			marginVertical: scale(21)
		},
		horizontalLine: {
			flex: 1,
			height: scale(1),
			backgroundColor: theme.color,
			opacity: scale(0.5),
		},
		orText: {
			fontSize: responsiveFontSize(1.8),
			fontFamily: 'NunitoSans-Regular',
			textAlign: 'center',
			color: theme.color,
			marginHorizontal: scale(20),
			paddingBottom: scale(3)
		},
		socialMediaContainer: {
			gap: scale(12),
		},
		alreadyHaveAnAccountText: {
			fontSize: responsiveFontSize(2),
			fontFamily: 'NunitoSans-Regular',
			textAlign: 'center',
			color: theme.color,
			marginTop: responsiveHeight(13)
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
		}
	})


	return (
		<ScrollView keyboardShouldPersistTaps='handled'>
			<Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
				{({ handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
					<View style={styles.container}>
						<Text style={styles.headerText}>{Common.SignUp.CreateYourRaffoluxAccountAndJoinTheAction}</Text>
						<View style={styles.formContainer}>
							<View>
								<TextInput
									style={[styles.input, touched.email && errors.email ? styles.inputError : null, errorMessage ? styles.inputError : null]}
									placeholder="your email"
									onChangeText={handleChange('email')}
									value={values.email}
									keyboardType="email-address"
									placeholderTextColor={theme.theme =="light" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)"}
									onChange={handleEmailError}
								/>
								{
									errors.email && touched.email && (<Text style={styles.error}>{errors.email}</Text>)}
								{
									errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>
								}
							</View>
							<LinearGradientButton title={Common.SignUp.GetStarted} onPress={handleSubmit} isDataFetching={isDataFetching} disableButton={isDataFetching} />
						</View>
						<View style={styles.horizontalLineContainer}>
							<View style={styles.horizontalLine}></View>
							<Text style={styles.orText}>{Common.SignUp.or}</Text>
							<View style={styles.horizontalLine}></View>
						</View>
						<View style={styles.socialMediaContainer}>
							<SocialMediaContainer socialMediaButton={googleSignUp} image={googleImage} title={Common.SignUp.SignUpWithGoogle} theme={theme} />
							<SocialMediaContainer socialMediaButton={facebookSignUp} image={facebookImage} title={Common.SignUp.SignUpWithFacebook} theme={theme} />
						</View>
						<Text style={styles.alreadyHaveAnAccountText}>{Common.SignUp.AlreadyHaveAnAccount}  <Text style={styles.orangeText} onPress={() => signInTab()}>{Common.common.SignIn}</Text></Text>
					</View>
				)}
			</Formik>
		</ScrollView>
	)
}

export default SignUpNew

