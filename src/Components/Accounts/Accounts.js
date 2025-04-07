import { View, Image, Text, StyleSheet, Pressable, } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import * as common from '../../helpers/common';
import * as countries from '../../helpers/CountryList';

import profileImage from '../../assets/Images/profileImg.png'
import ExlametionMark from '../../assets/Images/ExlametionMark.png'

import { isEmptyObject } from '../../utils/utils';
import ThemeContext from '../../utils/themes/themeWrapper';
import { responsiveFontSize } from 'react-native-responsive-dimensions';


const Accounts = ({ route }) => {
    const storeBalance = useSelector((state) => state.getAccountData.storeBalance);
    const creditBalnce = useSelector((state) => state.getAccountData.creditBlance);
    const accountInfo = useSelector((state) => state.getAccountData.data);
    const navigation = useNavigation();
    const theme = useContext(ThemeContext);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme])

    useEffect(() => {
        viewBackgroundColor === '#FFFFFF' ? setData(common.accountsList) : setData(common.accountsListDark)
    }, [viewBackgroundColor]);


    const handlePress = (route) => {
        const phoneNumber = accountInfo[0]?.contactNumber_E164;

        let countryCode;
        for (const country of countries.CountryList) {
            if (phoneNumber.startsWith(country.dialCode)) {
                countryCode = country.dialCode
            }
        }
        let contactNumber = phoneNumber.split(countryCode)

        if (route === 'PersonalInformation') {
            navigation.navigate(route, { apiFormData: accountInfo[0], countryCode: countryCode, contactNumber: contactNumber[1] });
        }
        else if (route === 'MarketingPreferences') {
            navigation.navigate(route, { apiFormData: accountInfo[0] });
        }
        else {
            navigation.navigate(route);
        }
    };


    const styles = StyleSheet.create({
        profilePageContainer: {
            flex: 1,
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616',
        },
        cardContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            marginTop: scale(13),
            marginHorizontal: scale(16),
            paddingHorizontal: scale(24),
            paddingTop: scale(25),
            paddingBottom: scale(47),
            borderRadius: scale(12)
        },
        profileIcon: {
            height: scale(64),
            width: scale(64),
            resizeMode: 'contain'
        },
        profileInfo: {
            flexDirection: 'row',
            gap: scale(16)
        },
        profileNameStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
        },
        creditStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.2),
            opacity:0.9
        },
        rpTextStyle: {
            backgroundColor: '#000616',
            color: '#FFFFFF',
            fontSize: responsiveFontSize(1),
            fontFamily: 'Gilroy-Bold',
        },
        raffoluxImageTextContainer: {
            backgroundColor: "#000616",
            paddingHorizontal: scale(4),
            flexDirection: 'row',
            borderRadius: scale(4),
            gap: scale(3.5),
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            paddingVertical: scale(2),
            paddingLeft: scale(3),
        },
        raffoluxSymbol: {
            resizeMode: "contain",
            height: scale(9.44),
            width: scale(9.29),
            paddingLeft: scale(4),
            justifyContent: 'center',
            alignItems: 'center'
        },
        line: {
            height: scale(12),
            borderColor: viewBackgroundColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
            borderWidth: scale(0.25),
            marginHorizontal: scale(12)
        },
        infoContainer: {
            flexDirection: 'row',
            marginTop: scale(8),
            alignItems: 'center',
            marginBottom: scale(58),
        },
        pointsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        creditsValueContainer: {
            justifyContent: 'center'
        },
        accountsPressableStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scale(8),
            borderRadius: scale(6),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.25)' : 'rgba(255, 255, 255, 0.1)',
            borderWidth: scale(0.25),
            paddingVertical: scale(13),
            paddingLeft: scale(23),
            paddingRight: scale(15.5),
        },
        accountIcon: {
            height: scale(14),
            width: scale(12)
        },
        _accountIcon: {
            height: scale(16),
            width: scale(16)
        },
        accountIconOne: {
            height: scale(13.5),
            width: scale(13.5)
        },
        accountArrow: {
            resizeMode: "contain",
            height: scale(12),
            width: scale(7.5),
        },
        accountsListText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
        },
        textContainer: {
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: scale(16.75),
        }
    });

    return (
        <View style={styles.profilePageContainer}>
            <View style={styles.cardContainer}>
                <View style={styles.profileInfo}>
                    <Image style={styles.profileIcon} source={profileImage} />
                    <View>
                        {
                            !isEmptyObject(accountInfo[0]) ?
                                <Text style={styles.profileNameStyle}>{`${accountInfo[0]?.first_name} ${accountInfo[0]?.last_name}`}</Text> :
                                <Text style={styles.profileNameStyle}>{`Loading...`}</Text>
                        }
                        <View style={styles.infoContainer}>
                            <View style={styles.pointsContainer}>
                                <View style={styles.raffoluxImageTextContainer}>
                                    <Image style={styles.raffoluxSymbol} source={ExlametionMark} />
                                    <Text style={styles.rpTextStyle}>{Math.abs(Number(storeBalance))} {common.common.RP}</Text>
                                </View>
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.creditsValueContainer}>
                                <Text style={styles.creditStyle}>{common.common.poundSymbol}{creditBalnce} {common.common.credit}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    {data?.map((ele, i) => {
                        return (
                            <View key={i}>
                                <Pressable style={styles.accountsPressableStyle} onPress={() => handlePress(ele.route)}>
                                    <Image style={ele.text === 'Marketing preferences' ? styles._accountIcon : ele.text === 'Change password' ? styles.accountIconOne : styles.accountIcon} source={ele.icon} />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.accountsListText}>{ele.text}</Text>
                                        <Image style={styles.accountArrow} source={ele.arrowIcon} />
                                    </View>
                                </Pressable>
                            </View>
                        )
                    })}
                </View>
            </View>
        </View>
    )
}

export default Accounts