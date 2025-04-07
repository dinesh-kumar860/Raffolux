import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import ForgotPasswordHeader from '../SignInSignUpComponents/ForgotPasswordHeader';

import LinearGradientButton from '../../utils/LinearGradientButton';
import { Url } from '../../helpers/routesApi';
import { API_URL } from '@env'
import ThemeContext from '../../utils/themes/themeWrapper';

const ForgotPasswordScreen1 = () => {
	const navigation = useNavigation();
	const theme = useContext(ThemeContext)
	const [errorMessage, setErrorMessage] = useState(false);
	const [disableButton, setDisableButton] = useState(false)

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email('Invalid email address')
			.required('Email is required')
			.matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Invalid email address')
			.trim()
	});

	const handleSubmit = (values) => {
		setDisableButton(true)
		let dataObj = { email: values.email.trim() }
		axios.post(`${API_URL}forgotPassword/mobile`, dataObj)
			.then((res) => {
				console.log({res})
				Toast.show('OTP Sent!', Toast.SHORT);
				setDisableButton(false)
				navigation.navigate('ForgotPasswordScreen2', { jwt: res.data.jwt,email:values.email.trim()})
			})
			.catch((err) => {
				setDisableButton(false)
				if (err.response.data === 'User Email Does Not Exists' || err.response.data === 'Invalid Request') {
					setErrorMessage(true)
				}
				else {
					Toast.show(err.response.data, Toast.SHORT);
				}
			})
	};

	const styles = StyleSheet.create({
		mainContainer: {
			flexGrow: 1,
			backgroundColor: theme.background
		},
		container: {
			flex: 1,
			backgroundColor: 'theme.background'
		},
		headerContainer: {
			marginTop: scale(30),
		},
		subText: {
			color: theme.color,
			fontSize: responsiveFontSize(2.2),
			fontFamily: 'Gilroy-ExtraBold',
			textAlign: 'center',
			opacity: 0.9,
			marginLeft: scale(38),
			marginRight: scale(32),
			marginTop: scale(15)
		},
		formContainer: {
			marginLeft: scale(29),
			marginRight: scale(20),
			gap: scale(32),
			marginTop: scale(26),
		},
		input: {
			height: 48,
			paddingLeft: responsiveWidth(3.5),
			backgroundColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(255, 255, 255, 0.05)',
			borderRadius: 4,
			fontSize: responsiveFontSize(2),
			fontFamily: 'NunitoSans-Regular',
			borderWidth: 1.1,
			borderColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0, 6, 22, 0.195995)',
			color: theme.color
		},
		error: {
			color: 'red',
			textAlign: 'right',
		},
		inputError: {
			borderColor: 'red',
			borderWidth: scale(0.5),
		}

	})

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.mainContainer}>
				<View style={styles.container}>
					<Formik
						initialValues={{ email: '' }}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
							<>
								<View style={styles.headerContainer}>
									<ForgotPasswordHeader title={'Forgot password'} />
								</View>
								<Text style={styles.subText}>Enter the email address associated with your Raffolux account</Text>
								<View style={styles.formContainer} >
									<View>
										<TextInput style={[styles.input, touched.email && errors.email ? styles.inputError : null, errorMessage ? styles.inputError : null]}
											placeholder="enter your email address"
											onChangeText={handleChange('email')}
											value={values.email}
											keyboardType="email-address"
											placeholderTextColor={theme.theme == 'light' ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"}
											onChange={() => setErrorMessage(false)}
										/>
										{
											errors.email && touched.email && (<Text style={styles.error}>{errors.email}</Text>)}
										{
											errorMessage && <Text style={styles.error}>User Email Does Not Exists</Text>
										}
									</View>
									<LinearGradientButton title={'Reset password'} onPress={handleSubmit} disableButton={disableButton} isDataFetching={disableButton} />
								</View>
							</>
						)}
					</Formik>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default ForgotPasswordScreen1

