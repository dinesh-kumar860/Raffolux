import { StyleSheet, Text, View, Pressable, ScrollView, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Clipboard from '@react-native-clipboard/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';

import ThemeContext from '../utils/themes/themeWrapper';
import Header from '../utils/Header';
import * as common from '../helpers/common'

import InviteAndEarnTab from './ReferralPageComponents/InviteAndEarnTab';
import MyReferralTab from './ReferralPageComponents/MyReferralTab';
import MyRaffleTabs from './MyRafflesComponents/MyRaffleTabs';

import Footer from './Footer';
import { fetchMyReferralCode } from '../api/referralsApi';
import SocialMediaModal from './ReferralPageComponents/SocialMediaModal';

import referralPageImage from '../assets/Images/referralPageImage.png'
import * as countries from '../helpers/CountryList';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';


const Referral = ({ route }) => {
    const theme = useContext(ThemeContext);
    const { isConnected } = useInternet()
    const navigation = useNavigation();
    const [inviteAndEarn, setInviteAndEarn] = useState(true);
    const [myRefferral, setMyReferral] = useState(false);
    const [referralData, setReferralData] = useState();
    const [modalVisible, setModalVisible] = useState(false)

    const accountInfo = useSelector((state) => state.getAccountData.data);
    const storeBalance = useSelector((state) => state.getAccountData.storeBalance);

    const backArrowPress = () => navigation.goBack()

    const copyToClipboard = (link) => {
        Clipboard.setString(link);
        Toast.show('link copied!', Toast.SHORT);
    };

    const inviteAndEarnTab = () => {
        setInviteAndEarn(true);
        setMyReferral(false)
    };
    const myReferralsTab = () => {
        setMyReferral(true);
        setInviteAndEarn(false);
    }

    const fetchMyReferral = async () => {
        let response = await fetchMyReferralCode();
        response && setReferralData(response)
    };

    useEffect(() => {
        if (isConnected === true) {
            fetchMyReferral()
        }
    }, [isConnected, accountInfo[0]?.is_sms_verified])


    const verifyAccount = () => {
        const phoneNumber = accountInfo[0].contactNumber_E164;
        let countryCode;
        for (const country of countries.CountryList) {
            if (phoneNumber.startsWith(country.dialCode)) {
                countryCode = country.dialCode
            }
        }
        let contactNumber = phoneNumber.split(countryCode)
        navigation.navigate('PersonalInformation', { apiFormData: accountInfo[0], countryCode: countryCode, contactNumber: contactNumber[1] });
    };

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        container: {
            flex: 1,
            backgroundColor: theme.background
        },
        imageContainer: {
            height: 180,
            width: '100%'
        },
        image: {
            resizeMode: 'contain',
            height: 180,
            width: '100%'
        },
        imageTextContainer: {
            marginLeft: scale(22),
            marginVertical: scale(26),
        },
        imageText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3.2),
            lineHeight: 26,
            color: '#000616',
        },
        buttonContainer: {
            backgroundColor: '#000616',
            alignItems: 'center',
            justifyContent: 'center',
            height: 32,
            width: 124,
            borderRadius: scale(6),
            marginTop: scale(11)
        },
        buttonText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.9),
            lineHeight: 26,
            color: '#FFF',
        },
        imageTextLink: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.6),
            color: '#000616',
            textDecorationLine: 'underline',
            marginTop: scale(8)
        },
        TabsContainer: {
            flexDirection: 'row',
            marginTop: scale(26),
            marginLeft: scale(17),
            justifyContent: 'space-around'
        },
        horizontalLine: {
            borderWidth: scale(0.5),
            opacity: scale(0.1),
            height: scale(1),
            borderColor: theme.color
        },
        inviteButtonMainContainer: {
            marginTop: scale(50),
            marginHorizontal: scale(22),
        },
        inviteButtonContainer: {
            height: 48,
            alignItems: 'center',
            justifyContent: "center",
            borderRadius: scale(6),
        },
        inviteButtonText: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2)
        },
        modelContainer: {
            flex: 1,
        },
        footerContainer: {
            marginTop: scale(50),
        }
    })

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <Header theme={theme} backArrowPress={backArrowPress} title={'Refer a friend'} />
                <View style={styles.imageContainer}>
                    <ImageBackground source={referralPageImage} style={styles.image}>
                        <View style={styles.imageTextContainer}>
                            <Text style={styles.imageText}>{accountInfo[0]?.is_sms_verified === false ? common.Referral.VerifyYourAccount : common.Referral.InviteFriendsAnd}</Text>
                            <Text style={styles.imageText}>{accountInfo[0]?.is_sms_verified === false ? common.Referral.toStartReferring : common.Referral.earnRewards}</Text>
                            <TouchableOpacity style={styles.buttonContainer} onPress={accountInfo[0]?.is_sms_verified === false ? () => verifyAccount() : () => copyToClipboard(referralData.referralDetails?.referralLink)}>
                                <Text style={styles.buttonText}>{accountInfo[0]?.is_sms_verified === false ? common.Referral.Verify : common.Referral.shareMyLink}</Text>
                            </TouchableOpacity>
                            {
                                accountInfo[0]?.is_sms_verified == true && <Text style={styles.imageTextLink}>{common.Referral.ref}{referralData?.referralDetails?.referralCode}</Text>
                            }
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.TabsContainer}>
                    <MyRaffleTabs theme={theme} title={common.Referral.ReferAndEarn} onPress={inviteAndEarnTab} page={'Referral'} isActive={inviteAndEarn} />
                    <MyRaffleTabs theme={theme} title={common.Referral.MyReferrals} onPress={myReferralsTab} page={'Referral'} isActive={myRefferral} />
                </View>
                <View style={styles.horizontalLine}>
                </View>
                {
                    inviteAndEarn && <InviteAndEarnTab theme={theme} referralData={referralData} copyToClipboard={copyToClipboard} isAccountVerified={accountInfo[0]?.is_sms_verified} verifyAccount={verifyAccount} />
                }
                {
                    myRefferral && <MyReferralTab theme={theme} referralData={referralData} totalPoints={storeBalance} isAccountVerified={accountInfo[0]?.is_sms_verified} verifyAccount={verifyAccount} />
                }
            </View>
            {
                accountInfo[0]?.is_sms_verified === true &&
                <>
                    <TouchableOpacity onPress={() => { copyToClipboard(referralData.referralDetails?.referralLink); setModalVisible(!modalVisible) }} style={styles.inviteButtonMainContainer} >
                        <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.inviteButtonContainer}>
                            <Text style={styles.inviteButtonText}>
                                {common.Referral.InviteFriend}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible); }}>
                        <View style={[styles.modelContainer]}>
                            <SocialMediaModal theme={theme} setModalVisible={setModalVisible} modalVisible={modalVisible} />
                        </View>
                    </Modal>
                </>
            }
            <View style={styles.footerContainer}>
                {/* <Footer /> */}
            </View>

        </ScrollView>
    )
}

export default Referral

