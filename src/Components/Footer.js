import { View, Text, StyleSheet, Image, Pressable, Linking } from 'react-native'
import React, { memo, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

import { AuthContext } from '../Context/AuthContext';

import RatingTrustPilot from '../utils/RatingTrustPilot';
import StarRatings from '../utils/5StarRatings';

import * as Common from '../helpers/common';
import { openLink } from '../helpers/OpenBrowser';
import { Url } from '../helpers/routesApi';

import Image3 from '../assets/Images/18+Image3.png'
import GambleAware5 from '../assets/Images/GambleAware5.png'
import raffoluxIcon from '../assets/Images/raffoluxIcon.png'
import phoneSolid from '../assets/Images/phoneSolid.png'
import envelopeSolid from '../assets/Images/envelopeSolid.png'

const Footer = () => {
    const navigation = useNavigation();
    const { userToken } = useContext(AuthContext)

    const handleCategoryNavigate = (category) => navigation.navigate('Category', { category: category });

    const handleWebsiteNavigation = (component) => {
        component == "MyRaffles" || component == "Accounts" ? userToken ? navigation.navigate(component) : navigation.navigate('Authentication') : navigation.navigate(component)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container1}>
                <View style={styles.gambleContainer}>
                    <Image style={{ width: responsiveWidth(15), height: responsiveHeight(15) }} source={Image3} resizeMode='contain' />
                    <Image style={styles.gambleContainerleAware} source={GambleAware5} />
                    {/* <Text style={styles.gambleText}>{Common.FooterConstants.PLEASEPLAYRESPONSIBLY}</Text> */}
                </View>
                <Pressable style={styles.trustPilotContainer} onPress={() => openLink(Url.TrustPilotLink)}>
                    <RatingTrustPilot />
                </Pressable>
                <Pressable style={styles.starRatingsContainer} onPress={() => openLink(Url.TrustPilotLink)}>
                    <StarRatings />
                </Pressable>
                {/* <Image style={styles.gambleContainerleAware} source={GambleAware5} /> */}
                <View style={styles.horizontalLine}></View>
            </View>
            <View style={styles.container2}>
                <Text style={styles.paymentText}>{Common.FooterConstants.PaymentsWeAccept}</Text>
                <View style={styles.paymentContainer}>
                    {Common.Footer.paymentSection.map((ele, i) => (
                        <Image key={i} style={styles.paymentLogo} source={ele} />
                    ))}
                </View>
                <Text style={styles.followUsText}>{Common.FooterConstants.FollowUs}</Text>
                <View style={styles.socailMediaContainer}>
                    {Common.Footer.socialMediaApps.map((ele, i) => (
                        <Pressable onPress={() => Linking.openURL(ele.link)} key={i}>
                            <Image style={styles.socialMediaIcon} source={ele.image} />
                        </Pressable>
                    ))}
                </View>
                <Pressable onPress={() => navigation.navigate('Home')}>
                    <Image style={styles.raffoluxIcon} source={raffoluxIcon} />
                </Pressable>
            </View>
            <View style={styles.websiteCategoriesContainer}>
                <View style={styles.websiteContainer}>
                    <Text style={styles.boldText}>{Common.FooterConstants.Website}</Text>
                    {Common.Footer.website.map((ele, i) => (
                        <Text style={styles.listText} onPress={() => handleWebsiteNavigation(ele.component)} key={i} >{ele.title}</Text>
                    ))}
                </View>
                <View style={styles.websiteContainer}>
                    <Text style={styles.boldText}>{Common.FooterConstants.Categories}</Text>
                    {Common.Footer.Categories.map((ele, i) => <Text style={styles.listText} key={ele.id} onPress={() => handleCategoryNavigate(ele.lable)}>{ele.lable}</Text>)}
                </View>
            </View>
            <View style={styles.contactContainer}>
                <Text style={styles.contactText}>{Common.FooterConstants.Contact}</Text>
                <Text style={styles.addressText}>{Common.FooterConstants.AviationHouse}</Text>
                <Text style={styles.addressText}>{Common.FooterConstants.London}</Text>
                <Pressable style={styles.phoneContainer} onPress={() => Linking.openURL(Common.FooterConstants.tel)}>
                    <Image style={styles.phoneImage} source={phoneSolid} />
                    <Text style={styles.addressText} >{Common.FooterConstants.number}</Text>
                </Pressable>
                <Pressable style={styles.mailContainer} onPress={() => { Linking.openURL(Common.FooterConstants.mailto) }}>
                    <Image style={styles.mailImage} source={envelopeSolid} />
                    <Text style={styles.addressText} >{Common.FooterConstants.mailId}</Text>
                </Pressable>
                <View style={styles.horizontalLine}></View>
                <Text style={styles.copyRightText}>
                    {Common.FooterConstants.copyRight}
                </Text>
            </View>
            <View style={styles.privacyPolicyContainer}>
                {Common.Footer.privacyPolicy.map((ele, i) => (
                    <Text style={styles.privacyPolicyText} onPress={() => navigation.navigate(ele.component)} key={i} >{ele.title}</Text>
                ))}
            </View>
        </View>

    )
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#00040E',
        paddingVertical: scale(35),
    },
    container1: {
        alignItems: 'center',
        gap: scale(24)
    },
    gambleContainer: {
        flexDirection: 'row',
        paddingHorizontal: scale(60),
        gap: scale(11),
        justifyContent: 'center',
        alignItems: 'center'
    },
    gambleText: {
        color: '#FFFFFF',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2.4)
    },
    trustPilotContainer: {
        marginTop: scale(16)
    },
    gamcareImage: {
        width: scale(138),
        height: scale(45),
        resizeMode: 'contain'
    },
    gambleContainerleAware: {
        width: 250,
        height: 56,
        resizeMode: 'contain'
    },
    horizontalLine: {
        height: responsiveHeight(0.1),
        width: '92%',
        backgroundColor: '#FFFFFF',
        opacity: scale(0.5),
        marginTop: scale(3),
    },
    container2: {
        alignItems: 'center',
        marginTop: scale(39.5),
        gap: scale(21)
    },
    paymentText: {
        color: '#FFFFFF',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2)
    },
    paymentContainer: {
        flexDirection: 'row',
        gap: scale(8)
    },
    paymentLogo: {
        width: scale(41),
        height: scale(28),
        resizeMode: 'contain'
    },
    followUsText: {
        color: '#FFFFFF',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2),
        marginTop: scale(35)
    },
    socailMediaContainer: {
        flexDirection: 'row',
        gap: scale(24)
    },
    socialMediaIcon: {
        width: scale(30),
        height: scale(30),
        resizeMode: 'contain'
    },
    raffoluxIcon: {
        marginTop: scale(49),
        width: scale(180),
        height: scale(32)
    },
    websiteCategoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: scale(65)
    },
    websiteContainer: {
        gap: scale(15),
        alignItems: 'center'
    },
    boldText: {
        color: '#FFFFFF',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2),
        marginBottom: scale(14)
    },
    listText: {
        color: '#FFFFFF',
        fontFamily: 'Gilroy-Medium',
        fontSize: responsiveFontSize(2),
        opacity: scale(0.5),
        letterSpacing: -0.2
    },
    contactContainer: {
        alignItems: 'center',
        marginTop: scale(53),
        gap: scale(7)
    },
    contactText: {
        color: '#FFFFFF',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2),
        textAlign: 'center'
    },
    addressText: {
        color: '#FFFFFF',
        fontFamily: 'Gilroy-Medium',
        fontSize: responsiveFontSize(2),
        opacity: scale(0.5),
        alignSelf: 'center'
    },
    phoneContainer: {
        flexDirection: "row",
        gap: scale(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(17),
    },
    mailContainer: {
        flexDirection: "row",
        gap: scale(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(6),
        marginBottom: scale(37)
    },
    phoneImage: {
        width: scale(14),
        height: scale(14)
    },
    mailImage: {
        width: scale(18),
        height: scale(12)
    },
    copyRightText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: responsiveFontSize(1.8),
        fontWeight: 400,
        marginHorizontal: scale(40),
        marginTop: scale(25)
    },
    privacyPolicyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    privacyPolicyText: {
        color: '#FFFFFF',
        fontSize: responsiveFontSize(1.9),
        fontFamily: 'Gilroy-SemiBold',
        marginTop: scale(16),
        opacity: scale(0.8)
    }
})
export default memo(Footer)