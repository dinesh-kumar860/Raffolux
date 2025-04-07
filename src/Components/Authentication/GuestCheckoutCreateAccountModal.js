import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView, Modal, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-simple-toast';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import GuestCheckoutSignInRaffoluxSumbolDark from '../../assets/Images/GuestCheckoutSignInRaffoluxSumbolDark.png'
import GuestCheckoutSignInRaffoluxSumbolLight from '../../assets/Images/GuestCheckoutSignInRaffoluxSumbolLight.png'
import GuestCheckoutTicketSymbolDark from '../../assets/Images/GuestCheckoutTicketSymbolDark.png'
import GuestCheckoutTicketSymbolLight from '../../assets/Images/GuestCheckoutTicketSymbolLight.png'

import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { API_URL } from '@env';

import * as Common from '../../helpers/common'
import * as countries from '../../helpers/CountryList';

import { isEmptyArray } from '../../utils/utils';
import { RaffoluxAsyncStorage } from '../../utils/RaffoluxAsyncStorage';

import { AuthContext } from '../../Context/AuthContext';

import SmsVerification from './SmsVerification';
import ClaimLinearGradientButton from '../ClaimSummaryComponents/ClaimLinearGradientButton';



const validationSchema = yup.object().shape({
    phoneNumber: yup
        .string()
        .required('Phone number is required')
        .matches(/^\d{10,11}$/, 'Phone number must be 10 or 11 digits')
        .trim(),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'Password must be less than 30 characters')
        .required('Password is required')
        .trim()
});


const GuestCheckoutCreateAccountModal = (props) => {
    const { theme, setModalVisible, modalVisible, raffleUpdatesOpt } = props;
    const { setIsHomePageCreateAccountLoginModalVisible, authLogin } = useContext(AuthContext)

    const [isCountryPressed, setIsCountryPressed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [numberError, setNumberError] = useState(false);
    const [toggleCheckBox1, setToggleCheckBox1] = useState(raffleUpdatesOpt ? raffleUpdatesOpt : false);
    const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
    const [countryCode, setCountryCode] = useState('+44');
    const countMap = countries.CountryList?.find((ele, i) => '+44' == ele.dialCode && ele);
    const [countryFlag, setCountryFlag] = useState(countMap?.image);
    const [disableButton, setDisableButton] = useState(false)
    const [createAccountModalVisible, setCreateAccountModalVisible] = useState(false)
    const [modalPhoneNumber, setModalPhoneNumber] = useState(null)
    const [jwtToken, setJwtToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const InfoContainer = ({ image, title }) => {
        return (
            <View style={styles.infoContainer}>
                {image}
                <Text style={styles.infoText}>{title}</Text>
            </View>
        )
    }

    const InputTextField = ({ title, placeHolder, touched, errors, values, handleChange, handleBlur, handleOnchange }) => {
        return (
            <TextInput
                style={[styles.input, touched[title] && errors[title] ? styles.inputError : null,]}
                placeholder={placeHolder}
                onChangeText={handleChange(title)}
                onBlur={handleBlur(title)}
                value={values[title]}
                secureTextEntry={title === "password" ? true : false}
                maxLength={title === "phoneNumber" ? 11 : null}
                keyboardType={title === "phoneNumber" ? 'phone-pad' : null}
                placeholderTextColor={theme.theme == "light" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)"}
                onChange={title === "phoneNumber" ? () => handleNumberError() : null}
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
            </View>
        )
    };


    const CheckBoxFieldContainer = ({ toggle, toggleCheckBox, data }) => {
        return (
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    style={[styles.checkBox, { transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }]}
                    tintColors={{ true: '#FFBD0A', false: theme.theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0, 6, 22, 0.20)' }}
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

    const handleNumberError = () => {
        setNumberError(false)
    }

    const filteredData = countries.CountryList?.filter(card => {
        const nameMatch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
        const dialcodeMatch = card.dialCode?.includes(searchQuery);
        return nameMatch || dialcodeMatch;
    });

    const handleCountry = () => {
        setIsCountryPressed(!isCountryPressed);
        setSearchQuery('')
    };

    const handleIndividualCountry = (dialCode, image) => {
        setCountryCode(dialCode);
        setIsCountryPressed(!isCountryPressed);
        setCountryFlag(image)
    };

    const handleSubmit = async (values) => {
        let userDta = await RaffoluxAsyncStorage.getItem('cartIdDetails')
        setDisableButton(true)
        let dataObj = {
            email: userDta.userEmail.trim(),
            password: values.password.trim(),
            contact_number: countryCode + values.phoneNumber,
            raffle_updates_opt: toggleCheckBox1,
            sms_updates_opt: toggleCheckBox2,
            point_balance: Number(userDta.totalAmount) >= 1 ? String(Math.floor(Number(userDta.totalAmount))) : '0'
        }
        axios.post(`${API_URL}guestAccountCreation`, dataObj)
            .then((res) => {
                setDisableButton(false)
                if (res.data.status == 200) {
                    setErrorMessage("")
                    if (res.data.data[0].smsVerification == "true") {
                        axios.post(`${API_URL}generateOtpSmsVerificationWithLogin`, {}, { "headers": { 'Authorization': res.data.data[0].jwt } })
                            .then(resp => {
                                if (resp.status == 200) {
                                    setJwtToken(res.data.data[0].jwt)
                                    setModalPhoneNumber(countryCode + values.phoneNumber)
                                    setCreateAccountModalVisible(true)
                                    Toast.show('Otp sent!', Toast.SHORT);
                                }
                            }).catch(err => {
                                console.log({ err });
                            })
                    } else {
                        setModalVisible(false);
                        authLogin(res.data.data[0].jwt);
                    }
                } else {
                    if (res.data.message == "User Number Already Exists") {
                        setNumberError(true)
                    } else {
                        setErrorMessage(res.data.message)
                    }
                }
            })
            .catch((err) => {
                setDisableButton(false)
                console.log({ err })
            })
    }

    const handleModal = () => {
        setModalVisible(false)
    }

    const handleOtpModal = () => {
        setCreateAccountModalVisible(!createAccountModalVisible);
        authLogin(jwtToken);
    }

    const renderCountry = ({ item }) => {
        return (
            <Pressable style={styles.countryDataContainer} onPress={() => { handleIndividualCountry(item.dialCode, item.image); }}>
                <Image source={item.image} style={styles.imageStyle} />
                <Text style={{ color: theme.color, flex: 1 }}>{item.name}</Text>
                <Text style={{ color: theme.color, marginRight: scale(5) }}>{item.dialCode}</Text>
            </Pressable>
        )
    };


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
        totalInfoContainer: {
            marginTop: responsiveHeight(4),
            alignSelf: 'center',
            gap: 20,
        },
        infoContainer: {
            flexDirection: 'row',
            gap: responsiveWidth(6),
            alignItems: 'center',
        },
        infoText: {
            color: theme.theme == 'dark' ? '#FFAE05' : theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
        },
        infoImage: {
            height: 16,
            width: 16
        },
        formContainer: {
            marginTop: responsiveHeight(4)
        },
        inputFieldsContainer: {
            gap: scale(10)
        },
        singleFieldContainer: {
            gap: scale(4)
        },
        fieldNameText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            opacity: scale(0.8),
            color: theme.color
        },
        input: {
            height: responsiveHeight(6.2),
            paddingLeft: scale(25),
            backgroundColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.10)' : 'rgba(255, 255, 255, 0.3)',
            borderRadius: scale(4),
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            borderWidth: scale(1.24),
            borderColor: theme.theme == 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
            color: theme.color,
        },
        inputError: {
            borderColor: 'red',
            borderWidth: scale(1),
        },
        dropDownContainer: {
            flexDirection: 'row',
            gap: scale(12),
            position: 'relative',
        },
        dropdown: {
            flex: 1,
            backgroundColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.10)' : 'rgba(255, 255, 255, 0.3)',
            height: responsiveHeight(6.2),
            width: responsiveWidth(30),
            borderRadius: scale(6),
            paddingHorizontal: scale(8),
            borderWidth: scale(1.24),
            borderColor: theme.theme == 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
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
        CountryDropdown: {
            height: responsiveHeight(6.2),
            width: responsiveWidth(30),
            borderRadius: scale(6),
            paddingHorizontal: scale(8),
            borderWidth: scale(1.24),
            backgroundColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.10)' : 'rgba(255, 255, 255, 0.3)',
            borderColor: theme.theme == 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
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
            borderColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.3)',
            height: responsiveHeight(30),
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
        },
        checkBoxDataContanier: {
            gap: scale(15),
            marginTop: scale(20),
        },
        checkBoxContainer: {
            flexDirection: 'row',
            gap: scale(18),
            alignItems: 'center'
        },
        checkBoxText: {
            flex: 1,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.4),
            color: theme.color
        },
        buttonContainer: {
            marginBottom: responsiveHeight(3)
        },
        error: {
            color: 'red',
            textAlign: 'right',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.7)
        },
        smsVerificationModal: {
            backgroundColor: 'rgba(0,0,0,1)',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: scale(5)
        },
        skipStep: {
            color: '#FFF',
            marginTop: responsiveHeight(8),
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2)
        },
        bottomError: {
            top: 5,
            color: 'red',
            textAlign: 'center',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.7)
        }
    });


    return (
        <View style={styles.container}>
            <Ionicons name={'close'} size={25} style={styles.closeIcon} color={theme.color} onPress={() => handleModal()} />
            <Text style={styles.headerText}>Create an account</Text>
            <View style={styles.totalInfoContainer}>
                <InfoContainer image={<Image source={theme.theme == 'dark' ? GuestCheckoutSignInRaffoluxSumbolDark : GuestCheckoutSignInRaffoluxSumbolLight} style={styles.infoImage} />} title={'Earn points on every purchase'} />
                <InfoContainer image={<Image source={theme.theme == 'dark' ? GuestCheckoutTicketSymbolDark : GuestCheckoutTicketSymbolLight} style={styles.infoImage} />} title={'Choose your ticket numbers'} />
                <InfoContainer image={<FontAwesome5 name="user-plus" size={15} color={theme.theme == 'dark' ? '#FFAE05' : theme.color} />} title={'Earn rewards via referrals'} />
            </View>
            <Formik
                validationSchema={validationSchema}
                initialValues={{ phoneNumber: '', password: '' }}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.inputFieldsContainer}>
                            <InputTextFieldContainer header={'Enter a password'} title={'password'} placeHolder={'enter a secure password'} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} handleOnchange={null} />
                            <View style={styles.singleFieldContainer}>
                                <Text style={styles.fieldNameText}>Phone Number</Text>
                                <View style={styles.dropDownContainer}>
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
                                                    style={[styles.input, { color: theme.color, height: scale(35), flex: 1 }]}
                                                    placeholder="Search for a country.."
                                                    placeholderTextColor={theme.color}
                                                    onChangeText={query => setSearchQuery(query)}
                                                    value={searchQuery}
                                                />
                                            </View>
                                            <ScrollView nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}  >
                                                {
                                                    !isEmptyArray(filteredData) ?
                                                        // filteredData?.map((item, i) => (
                                                        //     <Pressable key={i} style={styles.countryDataContainer} onPress={() => { handleIndividualCountry(item.dialCode, item.image); }}>
                                                        //         <Image source={item.image} style={styles.imageStyle} />
                                                        //         <Text style={{ color: theme.color, flex: 1 }}>{item.name}</Text>
                                                        //         <Text style={{ color: theme.color, marginRight: scale(5) }}>{item.dialCode}</Text>
                                                        //     </Pressable>
                                                        // ))
                                                        <FlatList
                                                            data={filteredData}
                                                            renderItem={renderCountry}
                                                            keyExtractor={(item, index) => index.toString()}
                                                            contentContainerStyle={styles.imagesContainer}
                                                        // numColumns={2}
                                                        />
                                                        :
                                                        <Text style={{ color: theme.color, textAlign: 'center', marginTop: scale(15) }}>{Common.common.NoDataFound}</Text>
                                                }
                                            </ScrollView>
                                        </View>
                                        : null
                                }
                            </View>
                        </View>
                        <View style={styles.checkBoxDataContanier}>
                            <CheckBoxFieldContainer toggle={toggleCheckBox1} toggleCheckBox={setToggleCheckBox1} data={Common.SignUp.PromotionUpdates} />
                            <CheckBoxFieldContainer toggle={toggleCheckBox2} toggleCheckBox={setToggleCheckBox2} data={'I would like to receive offers and discounts via SMS'} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <ClaimLinearGradientButton title={'Create account'} handleOnPress={handleSubmit} disabled={disableButton} />
                            {errorMessage ?
                                <Text style={styles.bottomError}>{errorMessage}</Text>
                                : null
                            }
                        </View>

                    </View>
                )}
            </Formik>

            <Modal animationType="slide" transparent={true} visible={createAccountModalVisible} onRequestClose={() => handleOtpModal()} >
                <View style={styles.smsVerificationModal} >
                    <SmsVerification modalPhoneNumber={modalPhoneNumber} otpModalVisible={createAccountModalVisible} setOtpModalVisible={setCreateAccountModalVisible} guestAccountCreation={true} jwtToken={jwtToken && jwtToken} />
                    <Text style={styles.skipStep} onPress={() => handleOtpModal()}>Skip Step</Text>
                </View>
            </Modal>
        </View>
    )
}

export default GuestCheckoutCreateAccountModal

