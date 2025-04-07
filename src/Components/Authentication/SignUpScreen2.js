import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Image, FlatList, SafeAreaView, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { SelectCountry } from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { API_URL } from '@env'

import * as countries from '../../helpers/CountryList';
import { Url } from '../../helpers/routesApi';
import * as Common from '../../helpers/common'

import { isEmptyArray } from '../../utils/utils';
import LinearGradientButton from '../../utils/LinearGradientButton';
import ThemeContext from '../../utils/themes/themeWrapper';

import SignUpHeader from '../SignInSignUpComponents/SignUpHeader';
import { AuthContext } from '../../Context/AuthContext';

import messaging from '@react-native-firebase/messaging';


const SignUpScreen2 = ({ route }) => {
    const { signInTab, email, referralId } = route.params
    const navigation = useNavigation();
    const { authLogin } = useContext(AuthContext);
    const theme = useContext(ThemeContext)

    const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
    const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [referralError, setReferralError] = useState(false);
    const [isDataFetching, setIsDataFetching] = useState(false);

    const [isCountryPressed, setIsCountryPressed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [countryCode, setCountryCode] = useState('+44');
    const [isReferralCodePressed, setIsReferralCodePressed] = useState(false)
    const countMap = countries.CountryList?.find((ele, i) => '+44' == ele.dialCode && ele);
    const [countryFlag, setCountryFlag] = useState(countMap?.image);


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
        phoneNumber: yup
            .string()
            .required('Phone number is required')
            .matches(/^\d{10,11}$/, 'Phone number must be 10 or 11 digits'),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(30, 'Password must be less than 30 characters')
            .required('Password is required')
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        //     'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character',
        // ),
        ,
        referralId: yup
            .string()
    });

    const handleSubmit = async (values) => {
        let deviceToken = null;
        if (Platform.OS === 'android') {
            deviceToken = await messaging().getToken();
        } else if (Platform.OS === 'ios') {
            deviceToken = await messaging().getAPNSToken();
        }

        setIsDataFetching(true)
        let dataObj = {
            first_name: values.firstName.trim(),
            last_name: values.lastName.trim(),
            email: email.trim(),
            contact_number: countryCode + values.phoneNumber,
            password: values.password.trim(),
            confirmation_password: values.password.trim(),
            raffle_updates_opt: toggleCheckBox1,
            sms_updates_opt: toggleCheckBox2,
            device_token : deviceToken,
            platform : Platform.OS,
            vendor : Platform.OS == "android" ? "fcm" : "apns"
        };

        values.referralId.trim().length > 0 ? dataObj['referralId'] = values.referralId : null
        axios.post(`${API_URL}signUp`, dataObj)
            .then((res) => {
                setIsDataFetching(false)
                if (res.data.message === Common.common.UserNumberAlreadyExists) {
                    setNumberError(true)
                }
                if (res.data.status === 400) {
                    if (res.data.message.message === "No refferral ID found") {
                        setReferralError(true)
                    }
                }
                if (res.data.status === 200) {
                    if (res.data.data[0].smsVerification == "true") {
                        axios.post(`${API_URL}generateOtpSmsVerificationWithLogin`, {}, { "headers": { 'Authorization': res.data.data[0].jwt } })
                            .then(resp => {
                                if (resp.status === 200) {
                                    Toast.show('Otp sent!', Toast.SHORT);
                                    navigation.navigate('SignUpVerificationScreen', { countryCode: countryCode, phoneNumber: values.phoneNumber, jwtToken: res.data.data[0].jwt, firstName: values.firstName });
                                }
                            })
                            .catch(err => {
                                console.log({ err });
                            })
                    } if (res.data.data[0].smsVerification == "false") {
                        authLogin(res.data.data[0].jwt)
                    }
                }
            })
            .catch(err => {
                console.log(err);
                setIsDataFetching(false)
            })
    };

    const handleNumberError = () => setNumberError(false)

    const navigateToLogin = () => {
        navigation.navigate('Authentication');
        signInTab();
    };

    const handleCountry = () => {
        setIsCountryPressed(!isCountryPressed);
        setSearchQuery('')
    };

    const filteredData = countries.CountryList?.filter(card => {
        const nameMatch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
        const dialcodeMatch = card.dialCode?.includes(searchQuery);
        return nameMatch || dialcodeMatch;
    });

    const renderCountry = ({ item }) => {
        return (
            <Pressable style={styles.countryDataContainer} onPress={() => { handleIndividualCountry(item.dialCode, item.image); }}>
                <Image source={item.image} style={styles.imageStyle} />
                <Text style={{ color: '#000616', flex: 1 }}>{item.name}</Text>
                <Text style={{ color: '#000616', marginRight: scale(5) }}>{item.dialCode}</Text>
            </Pressable>
        )
    };

    const handleIndividualCountry = (dialCode, image) => {
        setCountryCode(dialCode);
        setIsCountryPressed(!isCountryPressed);
        setCountryFlag(image)
    };

    const InputTextField = ({ title, placeHolder, touched, errors, values, handleChange, handleBlur, handleOnchange }) => {
        return (
            <TextInput
                style={[styles.input, touched[title] && errors[title] ? styles.inputError : null, title === "phoneNumber" && numberError ? styles.inputError : null,]}
                maxLength={title === "phoneNumber" ? 11 : null}
                placeholder={placeHolder}
                onChangeText={handleChange(title)}
                onBlur={handleBlur(title)}
                value={values[title]}
                secureTextEntry={title === "password" ? true : false}
                keyboardType={title === "phoneNumber" ? "phone-pad" : null}
                placeholderTextColor={theme.theme == "light" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)"}
                onChange={title === "phoneNumber" ? () => handleOnchange() : title === 'referralId' ? () => setReferralError(false) : null}
            />
        )
    };

    const InputTextFieldContainer = ({ header, title, placeHolder, touched, errors, values, handleChange, handleBlur, handleOnchange }) => {
        return (
            <View style={styles.singleFieldContainer}>
                <Text style={styles.fieldNameText}>{header}</Text>
                <InputTextField title={title} placeHolder={placeHolder} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} handleOnchange={handleOnchange} />
                {
                    errors[title] && touched[title] && (<Text style={styles.error}>{errors[title]}</Text>)
                }
                {title === 'password' && <Text style={styles.phonrNumberInfromation}>{Common.SignUp.PasswordMustBeAtLeast6CharactersLong}</Text>}
            </View>
        )
    };

    const CheckBoxFieldContainer = ({ toggle, toggleCheckBox, data }) => {
        return (
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    style={[styles.checkBox, { transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }]}
                    tintColors={{ true: '#FFBD0A', false: theme.theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#1C1C27' }}
                    onCheckColor={'#6F763F'}
                    // disabled={false}
                    value={toggle}
                    onValueChange={newValue => toggleCheckBox(newValue)}
                    boxType='square'
                    onFillColor='#FFBD0A'
                    onTintColor='#FFBD0A'
                />
                <Text style={styles.checkBoxText}>{data}</Text>
            </View>
        )
    };

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        container: {
            marginHorizontal: scale(18),
            marginTop: scale(25)
        },
        headerContainer: {
            flexDirection: 'row',
        },
        headerTextContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: "center",
        },
        headerText: {
            color: '#000616',
            fontSize: responsiveFontSize(3),
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            opacity: scale(0.9),
            marginHorizontal: scale(30)
        },
        inputFieldsContainer: {
            gap: scale(15),
            marginTop: scale(30),
            marginBottom: scale(37)
        },
        singleFieldContainer: {
            gap: scale(4)
        },
        fieldNameText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
            opacity: scale(0.8),
            color: theme.color,
        },
        input: {
            height: responsiveHeight(6.2),
            paddingLeft: scale(25),
            backgroundColor: theme.theme == 'light' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
            borderRadius: scale(6),
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            borderWidth: scale(1.24),
            borderColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255,255,255,0.2)',
            color: theme.color,
            flex: 1,
        },
        dropDownContainer: {
            flexDirection: 'row',
            gap: scale(12),
        },
        dropdown: {
            flex: 1,
            backgroundColor: theme.theme == 'light' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
            height: responsiveHeight(6.2),
            width: responsiveWidth(30),
            borderRadius: scale(6),
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
        },
        imageStyle: {
            width: scale(15),
            height: scale(15),
            resizeMode: 'stretch',
        },
        placeholderStyle: {
            fontSize: responsiveFontSize(2),
            color: 'rgba(0,0,0,0.4)'
        },
        phonrNumberInfromation: {
            fontSize: responsiveFontSize(1.4),
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            opacity: scale(0.5),
            marginTop: scale(4)
        },
        referralCodeContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        alreadyHaveAnAccountText: {
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            color: theme.color,
            marginTop: scale(25)
        },
        orangeText: {
            color: '#FFBD0A'
        },
        checkBoxDataContanier: {
            flexDirection: 'column',
            gap: scale(15),
            marginTop: scale(20),
        },
        checkBoxContainer: {
            flexDirection: 'row',
            gap: scale(10),
        },
        checkBoxText: {
            flex: 1,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.7),
            color: theme.color
        },
        createAccountContainer: {
            marginTop: scale(20),
            padding: scale(18),
            textAlign: 'center',
            borderRadius: scale(5),
        },
        inputError: {
            borderColor: 'red',
            borderWidth: scale(0.5),
        },
        error: {
            color: 'red',
            textAlign: 'right',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.7)
        },
        CountryDropdown: {
            height: responsiveHeight(6.2),
            width: responsiveWidth(30),
            borderRadius: scale(6),
            paddingHorizontal: scale(8),
            borderWidth: scale(1.24),
            backgroundColor: theme.theme == 'light' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.3)',
            borderColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255,255,255,0.2)',
            color: theme.color,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: scale(5),
        },
        countryDataContainer: {
            flexDirection: 'row',
            marginTop: scale(10),
            gap: scale(10),
            marginLeft: scale(15),
            alignItems: 'center',
        },
        countryContainer: {
            borderBottomWidth: scale(1),
            borderLeftWidth: scale(1),
            borderRightWidth: scale(1),
            borderColor: 'rgba(0, 6, 22, 0.195995)',
            height: scale(250),
            borderRadius: scale(5),
        },
        seaechBarContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            borderColor: 'rgba(151,151,151,0.6)',
            borderWidth: scale(1),
            borderRadius: scale(6),
            gap: 5,
        },
        searchStyle: {
            opacity: 0.5,
            marginLeft: scale(15),
        },
        countryDialCode: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            flex: 1
        }
    })


    return (
        <SafeAreaView style={styles.mainContainer} >
            <ScrollView>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        password: '',
                        referralId: referralId ? referralId : '',
                    }}
                    onSubmit={handleSubmit}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, }) => (
                        <View style={styles.container}>
                            <SignUpHeader title={Common.SignUp.WeJustNeedAFewMoreDetails} theme={theme} />
                            <View style={styles.inputFieldsContainer}>
                                <InputTextFieldContainer header={'First name'} title={'firstName'} placeHolder={'enter your first name'} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} handleOnchange={null} />
                                <InputTextFieldContainer header={'Last name'} title={'lastName'} placeHolder={'enter your Last name'} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} handleOnchange={null} />
                                <View style={styles.singleFieldContainer}>
                                    <Text style={styles.fieldNameText}>Phone Number</Text>
                                    <View style={styles.dropDownContainer}>
                                        {/* <View>
                                        <SelectCountry
                                            style={[styles.dropdown]}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            placeholderStyle={styles.placeholderStyle}
                                            imageStyle={styles.imageStyle}
                                            iconStyle={styles.iconStyle}
                                            maxHeight={200}
                                            // search
                                            value={country}
                                            data={countries.CountryList}
                                            valueField="dialCode"
                                            labelField="dialCode"
                                            imageField='image'
                                            placeholder="Country"
                                            searchPlaceholder="Search..."
                                            onChange={e => { setCountry(e.dialCode); }}
                                        />
                                    </View> */}
                                        <Pressable style={[styles.CountryDropdown]} onPress={() => handleCountry()}>
                                            <Image source={countryFlag} style={styles.imageStyle} />
                                            <Text style={styles.countryDialCode} numberOfLines={1} >{countryCode}</Text>
                                            <FontAwesome name={isCountryPressed ? "caret-up" : "caret-down"} size={20} color={theme.color} />
                                        </Pressable>
                                        <View style={[styles.phoneNumberErrorContainer, { flex: 1 }]}>
                                            <InputTextField title={'phoneNumber'} placeHolder={''} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} handleOnchange={handleNumberError} />
                                        </View>
                                    </View>
                                    {errors.phoneNumber && touched.phoneNumber && (<Text style={styles.error}>{errors.phoneNumber}</Text>)}
                                    {numberError && <Text style={styles.error}>{Common.common.UserNumberAlreadyExists}</Text>}
                                    {
                                        isCountryPressed ?
                                            <View style={styles.countryContainer}>
                                                <View style={styles.seaechBarContainer}>
                                                    <Fontisto name="search" size={20} color={theme.color} style={styles.searchStyle} />
                                                    <TextInput
                                                        style={[styles.input, { color: theme.color, height: scale(35) }]}
                                                        placeholder="Search for a country.."
                                                        placeholderTextColor={theme.color}
                                                        onChangeText={query => setSearchQuery(query)}
                                                        value={searchQuery}
                                                    />
                                                </View>
                                                <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}  >
                                                    {
                                                        !isEmptyArray(filteredData) ?
                                                            filteredData?.map((item, i) => (
                                                                <Pressable key={i} style={styles.countryDataContainer} onPress={() => { handleIndividualCountry(item.dialCode, item.image); }}>
                                                                    <Image source={item.image} style={styles.imageStyle} />
                                                                    <Text style={{ color: theme.color, flex: 1 }}>{item.name}</Text>
                                                                    <Text style={{ color: theme.color, marginRight: scale(5) }}>{item.dialCode}</Text>
                                                                </Pressable>
                                                            ))
                                                            // <FlatList
                                                            //     data={filteredData}
                                                            //     renderItem={renderCountry}
                                                            //     keyExtractor={(item, index) => index.toString()}
                                                            //     contentContainerStyle={styles.imagesContainer}
                                                            // // numColumns={2}
                                                            // />
                                                            :
                                                            <Text style={{ color: theme.color, textAlign: 'center', marginTop: scale(15) }}>{Common.common.NoDataFound}</Text>
                                                    }
                                                </ScrollView>
                                            </View>
                                            : null
                                    }
                                    <Text style={styles.phonrNumberInfromation}>{Common.SignUp.WeUseThisNumberToVerify}</Text>
                                </View>
                                <InputTextFieldContainer header={'Choose a password'} title={'password'} placeHolder={'choose a password'} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} handleOnchange={null} />

                                <View style={styles.singleFieldContainer}>
                                    <Pressable style={styles.referralCodeContainer} onPress={() => setIsReferralCodePressed(!isReferralCodePressed)}>
                                        <Text style={styles.fieldNameText}>{Common.SignUp.ReferralCode}</Text>
                                        <FontAwesome name={isReferralCodePressed ? "caret-up" : "caret-down"} size={20} color={theme.color} />
                                    </Pressable>
                                    {
                                        isReferralCodePressed &&
                                        <>
                                            <InputTextField title={'referralId'} placeHolder={'enter your referral code(If Referred)'} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} handleOnchange={null} />
                                            {referralError && <Text style={styles.error}>{Common.SignUp.InvalidReferralCode}</Text>}
                                        </>
                                    }
                                </View>
                                <View style={styles.checkBoxDataContanier}>
                                    <CheckBoxFieldContainer toggle={toggleCheckBox1} toggleCheckBox={setToggleCheckBox1} data={Common.SignUp.PromotionUpdates} />
                                    <CheckBoxFieldContainer toggle={toggleCheckBox2} toggleCheckBox={setToggleCheckBox2} data={Common.SignUp.SmsUpdates} />
                                </View>
                            </View>
                            <LinearGradientButton title={'Continue'} onPress={handleSubmit} isDataFetching={isDataFetching} disableButton={isDataFetching} />
                            <Text style={[styles.alreadyHaveAnAccountText, { textAlign: 'center' }]}>{Common.SignUp.AlreadyHaveAnAccount}  <Text style={styles.orangeText} onPress={() => navigateToLogin()}>{Common.common.SignIn}</Text></Text>
                            <Text style={[styles.alreadyHaveAnAccountText, { marginBottom: scale(50) }]}>{Common.SignUp.ByCreatingAnAccountYouAgree} <Text style={styles.orangeText} onPress={() => navigation.navigate('TermsAndConditions')}>{Common.SignUp.TermsAndConditions}</Text> {Common.common.and}  <Text style={styles.orangeText} onPress={() => navigation.navigate('PrivacyAndPolicy')}>{Common.SignUp.PrivacyPolicy}</Text></Text>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpScreen2;

