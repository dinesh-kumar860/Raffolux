import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native'

import HowItWorksContent from './HowItWorksContent';
import ReferAndEarn from './ReferAndEarn';

import * as common from '../../helpers/common'

import ReferralPageRaffoluxSymbol from '../../assets/Images/ReferralPageRaffoluxSymbol.png';
import myReferralCopyImageDark from '../../assets/Images/myReferralCopyImageDark.png';


const InviteAndEarnTab = (props) => {
    const navigation = useNavigation();
    const { theme, referralData, copyToClipboard, isAccountVerified, verifyAccount } = props;

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: scale(22)
        },
        themeColor: {
            color: theme.color
        },
        header: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            opacity: scale(0.9),
            marginTop: scale(23)
        },
        textContentContainer: {
            backgroundColor: theme.theme === 'dark' ? '#141628' : 'rgba(0,0,0,0.04999)',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(6),
            marginTop: scale(15),
        },
        earnPointsContainerText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.7),
            marginTop: scale(14),
        },
        pointsContainer: {
            flexDirection: 'row',
            borderColor: theme.theme === 'dark' ? '#FFBD0A' : '#000616',
            backgroundColor: theme.theme === 'dark' ? '#141628' : '#000616',
            paddingVertical: scale(2),
            paddingHorizontal: scale(7),
            gap: scale(5),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(5),
            marginTop: scale(8),
            marginBottom: scale(13),
            borderWidth: scale(1)
        },
        iconStyle: {
            height: scale(15),
            width: scale(15),
            resizeMode: 'contain'
        },
        pointsText: {
            color: '#FFF',
            fontFamily: 'Gilroy-Bold',
            fontSize: responsiveFontSize(2)
        },
        linkContainer: {
            backgroundColor: 'rgba(255,189,10,0.15)',
            borderColor: theme.theme === 'dark' ? 'rgba(255,189,10,0.497)' : '#FFBD0A',
            borderWidth: scale(1.7),
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: scale(15),
            borderRadius: scale(6),
            marginTop: scale(12)
        },
        linkText: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.5),
            opacity: scale(0.8)
        },
        copyContainer: {
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'center',
            gap: scale(8)
        },
        copyText: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.7),
            color: '#FFBD0A'
        },
        copyImage: {
            resizeMode: 'contain',
            height: scale(15),
            width: scale(15)
        },
        contentContainer: {
            gap: scale(22),
            paddingVertical: scale(22),
            backgroundColor: theme.theme === 'dark' ? '#141628' : 'rgba(0,0,0,0.04999)',
            borderRadius: scale(6),
            marginTop: scale(11),
        },
        alignItemsContainer: {
            alignItems: 'center'
        },
        earnPointsContainerTextMargin: {
            textAlign: 'center',
            marginTop: scale(25),
            color: theme.theme === 'dark' ? '#FFBD0A' : '#000616'
        }
    })

    return (
        <View style={styles.container}>
            {
                isAccountVerified === false ?
                    <ReferAndEarn theme={theme} verifyAccount={verifyAccount} /> :
                    <>
                        <Text style={styles.header}>{common.Referral.EARNPOINTS}</Text>
                        <View style={styles.textContentContainer}>
                            <Text style={[styles.earnPointsContainerText, styles.themeColor]}>{common.Referral.ForEveryFriendYouReferYouWillReceive}</Text>
                            <View style={styles.pointsContainer}>
                                <Image style={styles.iconStyle} source={ReferralPageRaffoluxSymbol} />
                                <Text style={styles.pointsText}>{referralData?.pointReward}</Text>
                            </View>
                        </View>
                        <View style={styles.linkContainer}>
                            <Text style={styles.linkText}>{common.Referral.ReferralLink}</Text>
                            <View style={styles.copyContainer}>
                                <Text style={styles.copyText}>{referralData?.referralDetails?.referralCode}</Text>
                                <Pressable onPress={() => copyToClipboard(referralData?.referralDetails?.referralCode)}>
                                    <Image style={styles.copyImage} source={myReferralCopyImageDark} />
                                </Pressable>
                            </View>
                        </View></>
            }
            <Text style={styles.header}>{common.Referral.HOWITWORKS}</Text>
            <View style={styles.contentContainer}>
                {
                    common.Referral.HowItWorksData?.map((ele, i) => (
                        <HowItWorksContent key={i} theme={theme} number={ele.number} title={ele.title} />
                    ))
                }
            </View>
            <View style={styles.alignItemsContainer}>
                <Text style={[styles.earnPointsContainerText, styles.earnPointsContainerTextMargin]} onPress={() => navigation.navigate('TermsAndConditions')}>{common.common.termsAndConditions}</Text>
            </View>
        </View>
    )
}

export default InviteAndEarnTab

