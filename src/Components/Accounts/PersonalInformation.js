import React, { useContext, useEffect, useState, useCallback, } from 'react'
import { View, Text, ScrollView, RefreshControl, StyleSheet, Pressable, Image, TextInput, Modal, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { Formik } from 'formik';
import * as yup from 'yup';

import * as common from '../../helpers/common';
import * as countries from '../../helpers/CountryList';
import ThemeContext from '../../utils/themes/themeWrapper';
import { isEmptyArray, isEmptyObject } from '../../utils/utils';
import LinearGradientButton from '../../utils/LinearGradientButton';

import circleCloseMark from '../../assets/Images/circleCloseMark.png'

import { generateOtpSmsVerificationForAccountWithLogin, updateAccountWithLogin } from '../../api/accountsApi';
import SmsVerification from '../Authentication/SmsVerification';

import { fetchAccount } from '../../ReduxToolKit/apiSlice';
import PersonalInfoTextFields from '../PersonalInformationComponents/PersonalInfoTextFields';

const PersonalInformation = () => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch()

    const data = route.params.apiFormData;
    const contactNumber = route.params.contactNumber;
    const _countryCode = route.params.countryCode;
    const [refreshing, setRefreshing] = useState(false);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');

    const [country, setCountry] = useState(_countryCode);
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [modalPhoneNumber, setModalPhoneNumber] = useState(`${route.params.countryCode}${route.params.contactNumber}`);

    const [numberError, setNumberError] = useState(false);
    const [numberContainerError, setNumberContainerError] = useState(false);
    const [blur, setBlur] = useState(false);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [disableSaveButton, setDisableSaveButton] = useState(false);
    const [disableVerifyButton, setDisableVerifyButton] = useState(false)
    const [isSmsVerified, setIsSmsVerified] = useState(data.is_sms_verified);
    const [isCountryPressed, setIsCountryPressed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [countryCode, setCountryCode] = useState(_countryCode);

    const countMap = countries.CountryList?.find((ele, i) => _countryCode == ele.dialCode && ele);
    const [countryFlag, setCountryFlag] = useState(countMap?.image);


    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#061341') : setViewBackgroundColor('#FFFFFF');
    }, [theme])


    const validationSchema = yup.object().shape({
        phoneNumber: yup
            .string()
            .required('Phone number is required')
            .matches(/^\d{10,11}$/, 'Phone number must be 10 or 11 digits')
            .trim(),
    });

    const handleNumberError = () => {
        setNumberError(false);
        setNumberContainerError(false);
        // setBlur(true);
    };

    const handleSubmit = async (values,) => {
        setDisableSaveButton(true)
        const formData = { contactNumber: `${countryCode}${values.phoneNumber}` }
        const result = await updateAccountWithLogin(formData);
        if (result) {
            setDisableSaveButton(false)
            !isEmptyObject(result) && setIsFormDirty(false)
            !isEmptyObject(result) && setIsSmsVerified(result.is_sms_verified)
            !isEmptyObject(result) && dispatch(fetchAccount());
            !isEmptyObject(result) && Toast.show('Succesfully updated!', Toast.SHORT);
        }
        else {
            setDisableSaveButton(false)
        }

    };

    const handleVerifyNumber = async () => {
        setDisableVerifyButton(true)
        const res = await generateOtpSmsVerificationForAccountWithLogin();
        if (res) {
            setDisableVerifyButton(false)
            !isEmptyObject(res) && setOtpModalVisible(true);
            !isEmptyObject(res) && Toast.show('Otp sent!', Toast.SHORT);;
            !isEmptyObject(res) && setModalPhoneNumber(res.toMobile)
        } else {
            setDisableVerifyButton(false)
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            setBlur(false);
        }, 1000);
    }, []);

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
            <Pressable style={styles.countryDataContainer} onPress={() => handleIndividualCountry(item.dialCode, item.image)}>
                <Image source={item.image} style={styles.imageStyle} />
                <Text style={styles.countryName}>{item.name}</Text>
                <Text style={styles.countryCode}>{item.dialCode}</Text>
            </Pressable>
        )
    };

    const handleIndividualCountry = (dialCode, image) => {
        setCountryCode(dialCode);
        setIsCountryPressed(!isCountryPressed);
        setCountryFlag(image)
        dialCode == countryCode ? setIsFormDirty(false) : setIsFormDirty(true)
    };

    const styles = StyleSheet.create({
        MainContainer: {
            paddingHorizontal: scale(16),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616',
        },
        PageContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616',
        },
        headerBar: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616',
            height: scale(48),
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
        },
        headerBarIcon: {
            textAlign: 'left',
            flex: 0.1
        },
        headerTextStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 0.9)',
            fontSize: responsiveFontSize(3.5),
            fontFamily: 'Gilroy-ExtraBold',
            marginBottom: scale(24),
        },
        useDetailsStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            marginBottom: scale(8),
        },
        inputFieldContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            paddingTop: scale(30),
            flexDirection: 'column',
            gap: scale(12),
        },
        singleFieldContainer: {
            gap: scale(6),
        },
        input: {
            flex: 1,
            height: scale(44),
            paddingLeft: scale(20.5),
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: scale(6),
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            borderWidth: 1,
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.1)',
            color: viewBackgroundColor === '#FFFFFF' ? '#070B1A' : '#FFFFFF',
        },

        inputError: {
            borderColor: 'red',
            borderWidth: scale(0.5),
        },
        countryInput: {
            color: theme.color,
            height: scale(35)
        },
        error: {
            color: 'red',
            textAlign: 'right',
        },
        phoneError: {
            textAlign: 'right',
            color: 'red',
        },
        fieldNameText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
            opacity: scale(0.8),
            color: viewBackgroundColor === '#FFFFFF' ? '#070B1A' : 'rgba(255, 255, 255, 0.8)',
        },
        dropDownContainer: {
            flex: 1,
            flexDirection: 'row',
            gap: scale(12),
        },
        phoneNumberErrorContainer: {
            flex: 1,
        },
        dropdown: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? "#FFFFFF" : '#070B1A',
            height: scale(44),
            width: scale(80),
            borderRadius: scale(6),
            paddingHorizontal: scale(8),
            borderWidth: scale(1.24),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.1)',
            color: viewBackgroundColor === '#FFFFFF' ? "#000616" : '#FFFFFF',
        },
        imageStyle: {
            width: scale(15),
            height: scale(10),
            resizeMode: 'stretch',
        },
        countryName: {
            color: theme.color,
            flex: 1
        },
        countryCode: {
            color: theme.color,
            marginRight: scale(5)
        },
        placeholderStyle: {
            fontSize: responsiveFontSize(2),
            color: 'rgba(0,0,0,0.4)'
        },
        itemContainerStyle: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? "#FFFFFF" : '#070B1A',
        },
        selectedTextStyle: {
            fontSize: responsiveFontSize(2),
            marginLeft: scale(1),
            color: viewBackgroundColor === '#FFFFFF' ? "#000616" : '#FFFFFF',
        },
        iconStyle: {
            width: scale(20),
            height: scale(20),
            position: 'absolute',
            color: theme.background
        },
        CountryDropdown: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? "#FFFFFF" : '#070B1A',
            height: scale(44),
            width: scale(80),
            borderRadius: scale(6),
            paddingHorizontal: scale(8),
            borderWidth: scale(1.24),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.1)',
            color: viewBackgroundColor === '#FFFFFF' ? "#000616" : '#FFFFFF',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: scale(5)
        },
        countryDialCode: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2)
        },
        countryContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? "#FFFFFF" : '#070B1A',
            borderBottomWidth: scale(1),
            borderLeftWidth: scale(1),
            borderRightWidth: scale(1),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.1)',
            height: scale(250),
            borderRadius: scale(5)
        },
        seaechBarContainer: {
            alignItems: 'center',
            flexDirection: 'row',
            borderColor: 'rgba(151,151,151,0.6)',
            borderWidth: scale(1),
            borderRadius: scale(6),
            gap: 5,
        },
        countryDataMainContainer: {
            flexGrow: 1
        },
        searchStyle: {
            opacity: 0.5,
            marginLeft: scale(15),
        },
        countryDataContainer: {
            flexDirection: 'row',
            marginTop: scale(10),
            gap: scale(10),
            marginLeft: scale(15),
            alignItems: 'center',
        },
        saveChanges: {
            color: viewBackgroundColor === '#FFFFFF' ? "#000000" : '#000616',
            fontSize: responsiveFontSize(2),
            fontFamily: 'Gilroy-ExtraBold',
        },
        formContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            paddingHorizontal: scale(20),
            paddingBottom: scale(36),
            borderRadius: scale(12),
            marginBottom: scale(24)
        },
        verifyStatusContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            paddingVertical: scale(34),
            marginBottom: scale(73),
            borderRadius: scale(12),
        },
        subVerifyStatusContainer: {
            paddingHorizontal: scale(26),
            borderRadius: scale(12),
        },
        verifyStatusTextContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scale(5),
            gap: scale(14)
        },
        circleCloseIcon: {
            height: scale(10),
            width: scale(10),
            resizeMode: 'contain'
        },
        unverifiedContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.2)' : 'rgba(255, 255, 255, 0.2)',
            flexDirection: 'row',
            gap: scale(4),
            justifyContent: 'center',
            alignItems: 'center',
            height: scale(18),
            paddingHorizontal: scale(6),
            borderRadius: scale(2)
        },
        unverified: {
            color: viewBackgroundColor === '#FFFFFF' ? "#000616" : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.2),
        },
        _unverifiedContainer: {
            backgroundColor: '#008000',
            flexDirection: 'row',
            gap: scale(4),
            justifyContent: 'center',
            alignItems: 'center',
            height: scale(18),
            paddingHorizontal: scale(6),
            borderRadius: scale(2)
        },
        _unverified: {
            color: '#FFFFFF',
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.2),
        },
        verifyNumber: {
            color: viewBackgroundColor === '#FFFFFF' ? "#000616" : '#FFFFFF',
            fontSize: responsiveFontSize(2.2),
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            lineHeight: scale(22.05),
            marginBottom: scale(31),
        },
        verifyPhoneNumber: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.6)' : 'rgba(255, 255, 255, 0.6)',
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            textAlign: 'center',
            lineHeight: scale(22.05),
            marginBottom: scale(24),
            marginHorizontal: scale(20),
        },
        imgCardContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: scale(32),
        },
        imgCard: {
            backgroundColor: '#D9D9D9',
            height: scale(161),
            width: scale(123.96),
            borderRadius: scale(5),
            elevation: scale(6,)
        },
        verifyNumberButton: {
            backgroundColor: '#FFBD0A',
            paddingVertical: scale(14),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(6),
        },
        verifyNumberButtonText: {
            color: '#000',
            fontSize: responsiveFontSize(2),
            fontFamily: 'Gilroy-ExtraBold'
        },
        verifyNumberButtonTextColor: {
            color: 'rgba(0,0,0,0.3)'
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: scale(5),
        },
        smsVerificationModal: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: scale(5)
        },
        buttonText: {
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
            alignItems: 'center',
            justifyContent: 'center',
        },
        noDataFound: {
            color: theme.color,
            textAlign: 'center',
            marginTop: scale(15)
        },
        buttonMargin: {
            marginTop: scale(40)
        }
    });

    return (
        <View style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} nestedScrollEnabled={true} >
                <View style={styles.PageContainer}>
                    <View style={styles.headerBar}>
                        <Pressable style={styles.headerBarIcon} onPress={() => navigation.goBack()} >
                            <AntDesign name={'left'} size={20} color={theme.color} />
                        </Pressable>
                    </View>
                </View>
                <Text style={styles.headerTextStyle}>{common.account.PersonalInformation}</Text>
                <View>
                    <Text style={styles.useDetailsStyle}>{common.PersonalInformation.UserDetails}</Text>
                    <View style={styles.formContainer}>
                        <Formik
                            initialValues={{ phoneNumber: contactNumber ? contactNumber : '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                                    <View style={styles.inputFieldContainer}>
                                        <PersonalInfoTextFields theme={theme} title={'First name'} inputName={data.first_name} />
                                        <PersonalInfoTextFields theme={theme} title={'Last name'} inputName={data.last_name} />
                                        <PersonalInfoTextFields theme={theme} title={'Email'} inputName={data.email} />
                                        <View style={styles.singleFieldContainer}>
                                            <Text style={styles.fieldNameText}>{common.common.PhoneNumber}</Text>
                                            <View style={styles.dropDownContainer}>
                                                <Pressable style={[styles.CountryDropdown]} onPress={() => handleCountry()}>
                                                    <Image source={countryFlag} style={styles.imageStyle} />
                                                    <Text style={styles.countryDialCode}>{countryCode}</Text>
                                                </Pressable>
                                                <View style={styles.phoneNumberErrorContainer}>
                                                    <TextInput
                                                        style={[styles.input, touched.phoneNumber && errors.phoneNumber ? styles.inputError : null, numberContainerError ? styles.inputError : null]}
                                                        maxLength={11}
                                                        placeholder=""
                                                        onChangeText={text => { handleChange('phoneNumber')(text); setIsFormDirty(true); }}
                                                        onBlur={() => { handleBlur('phoneNumber'); setBlur(true) }}
                                                        value={values.phoneNumber}
                                                        keyboardType="phone-pad"
                                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                                        onChange={() => handleNumberError()}
                                                    />
                                                    {
                                                        errors.phoneNumber && touched.phoneNumber && (
                                                            <Text style={styles.phoneError}>{errors.phoneNumber}</Text>)
                                                    }
                                                    {
                                                        numberError && <Text style={styles.error}>{common.common.UserNumberAlreadyExists}</Text>
                                                    }
                                                </View>
                                            </View>
                                            {
                                                isCountryPressed ?
                                                    <View style={styles.countryContainer}>
                                                        <View style={styles.seaechBarContainer}>
                                                            <Fontisto name="search" size={20} color={theme.color} style={styles.searchStyle} />
                                                            <TextInput
                                                                style={[styles.input, styles.countryInput]}
                                                                placeholder="Search for a country.."
                                                                placeholderTextColor={theme.color}
                                                                onChangeText={query => setSearchQuery(query)}
                                                                value={searchQuery}
                                                            />
                                                        </View>
                                                        <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.countryDataMainContainer}  >
                                                            {
                                                                !isEmptyArray(filteredData) ?
                                                                    <FlatList
                                                                        data={filteredData}
                                                                        renderItem={renderCountry}
                                                                        keyExtractor={(item, index) => index.toString()}
                                                                    />
                                                                    :
                                                                    <Text style={styles.noDataFound}>{common.InstantNonInstant.NoDataFound}</Text>
                                                            }

                                                        </ScrollView>
                                                    </View>
                                                    : null
                                            }
                                        </View>
                                    </View>
                                    <View style={styles.buttonMargin}>
                                        {
                                            isFormDirty ?
                                                <LinearGradientButton title={'Save Changes'} onPress={handleSubmit} disableButton={disableSaveButton} isDataFetching={disableSaveButton} />
                                                :
                                                <View style={[styles.input, styles.buttonText]}>
                                                    <Text style={[styles.verifyNumberButtonText, styles.verifyNumberButtonTextColor]}>{common.common.SaveChanges}</Text>
                                                </View>
                                        }
                                    </View>
                                </>
                            )}
                        </Formik>
                    </View>
                    <View>
                        {
                            isSmsVerified === true ?
                                <View style={[styles.verifyStatusTextContainer, { marginBottom: scale(100) }]}>
                                    <Text style={[styles.useDetailsStyle]}>{common.PersonalInformation.VerificationStatus}</Text>
                                    <View style={styles._unverifiedContainer}>
                                        <Ionicons name={'checkmark-circle-sharp'} size={15} color={'#FFFFFF'} />
                                        <Text style={styles._unverified}>{common.common.verified}</Text>
                                    </View>
                                </View> :
                                <View style={styles.verifyStatusTextContainer}>
                                    <Text style={[styles.useDetailsStyle]}>{common.PersonalInformation.VerificationStatus}</Text>
                                    <View style={styles.unverifiedContainer}>
                                        <Image style={styles.circleCloseIcon} source={circleCloseMark} />
                                        <Text style={styles.unverified}>{common.common.Unverified}</Text>
                                    </View>
                                </View>
                        }
                        {
                            isSmsVerified === false ?
                                <View style={styles.verifyStatusContainer}>
                                    {/* <View style={{ paddingHorizontal: scale(35) }}>
                                        <Text style={styles.verifyNumber}>{`Verify your number to redeem \n your BONUS!`}</Text>
                                        <View style={styles.imgCardContainer}>
                                            <View style={styles.imgCard}>
                                                <Image source={{ uri: `${Url.TaxFreeImgUrl}` }} style={styles.image} />
                                            </View>
                                        </View>
                                        <Text style={styles.verifyPhoneNumber}>{`Verify your phone number now \n to unlock your FREE BONUS!`}</Text>
                                    </View> */}

                                    <View style={styles.subVerifyStatusContainer}>
                                        <LinearGradientButton title={common.PersonalInformation.VerifyNumber} onPress={handleVerifyNumber} disableButton={disableVerifyButton} isDataFetching={disableVerifyButton} />
                                    </View>
                                </View> : null
                        }
                    </View>
                </View>
            </ScrollView>
            <Modal animationType="slide" transparent={true} visible={otpModalVisible} onRequestClose={() => setOtpModalVisible(!otpModalVisible)} >
                <View style={styles.smsVerificationModal} >
                    <SmsVerification modalPhoneNumber={modalPhoneNumber} otpModalVisible={otpModalVisible} setOtpModalVisible={setOtpModalVisible} setIsSmsVerified={setIsSmsVerified} />
                </View>
            </Modal>
        </View>
    )
}

export default PersonalInformation