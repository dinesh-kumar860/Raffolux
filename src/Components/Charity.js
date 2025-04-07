import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, RefreshControl, Pressable, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { scale } from 'react-native-size-matters';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { fetchTotalRaisedCharitiesCount, charitySupportWithLogin, fetchAllCharities } from '../api/charityApi';
import CharityCard from './CharityComponents.js/CharityCard';
import Footer from './Footer';

import { Url } from '../helpers/routesApi';
import Loader from '../helpers/Loader';
import { openLink } from '../helpers/OpenBrowser';
import * as common from '../helpers/common'


import ThemeContext from '../utils/themes/themeWrapper';
import { isEmptyArray } from '../utils/utils';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';

import { AuthContext } from '../Context/AuthContext';

const Charity = () => {
    const navigation = useNavigation();
    const theme = useContext(ThemeContext);
    const { isConnected } = useInternet();
    const { userToken } = useContext(AuthContext)
    const scrollToTop = useRef();

    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [supportCharityCardData, setSupportCharityCardData] = useState([]);
    const [showandHideCharityCard, setshowandHideCharityCard] = useState(false);
    const [charityCard, setCharityCard] = useState([]);
    const [totalCharityAmount, setTotalCharityAmount] = useState([]);

    const getCharityAmount = async () => {
        let response = await fetchTotalRaisedCharitiesCount();
        if (response) {
            !isEmptyArray(response) && setTotalCharityAmount(response);
        }
    };

    const getCharityCardData = async () => {
        let response = await fetchAllCharities();
        if (response) {
            if (!isEmptyArray(response)) {
                if (!isEmptyArray(supportCharityCardData)) {
                    let filteredData = response?.filter((ele, i) => ele.id !== supportCharityCardData[0]?.id)
                    !isEmptyArray(filteredData) && setCharityCard(filteredData)
                }
                else {
                    setCharityCard(response)
                }
            }
        }

    };

    const isCharitySupported = async () => {
        let response = await charitySupportWithLogin();
        if (response) {
            !isEmptyArray(response) && setSupportCharityCardData(response)
            response?.length !== 0 ? setshowandHideCharityCard(true) : setshowandHideCharityCard(false)
        }
    };


    useEffect(() => {
        if (isConnected) {
            getCharityAmount();
            userToken && isCharitySupported();
        }
    }, [isConnected]);

    useEffect(() => {
        if (isConnected) {
            getCharityCardData();
        }
    }, [supportCharityCardData])

    const onRefresh = useCallback(() => {
        if (isConnected) {
            setRefreshing(true);
            setTimeout(() => {
                userToken && isCharitySupported();
                getCharityAmount();
                getCharityCardData();
                setRefreshing(false);
            }, 1000);
        }
    }, []);

    const filteredData = charityCard?.filter(card => card?.CharityName?.toLowerCase().includes(searchQuery?.toLowerCase()),);

    const backArrowPress = () => navigation.goBack()

    const scrollToTopRef = () => scrollToTop.current.scrollTo({ y: 0, animated: true });

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setSearchQuery('');
            };
        }, [])
    );

    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: theme.background
        },
        container: {
            flex: 1,
            marginBottom: scale(15)
        },
        headerSupportContainer: {
            paddingHorizontal: scale(15),
            backgroundColor: theme.theme === 'dark' ? '#141628' : 'rgba(0,0,0,0.04)'
        },
        headerBar: {
            height: responsiveHeight(8),
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
        },
        headerBarIcon: {
            color: '#000616',
            opacity: scale(0.8),
            flex: 0.1
        },
        headerBarText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            flex: 0.8,
            textAlign: 'center',
            color: theme.color
        },
        myCharityContainer: {
            paddingTop: scale(25),
            flexDirection: 'column',
            gap: scale(12),
        },
        myCharityContainerRow1: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            gap: scale(10),
            paddingBottom: scale(5),
        },
        myCharityContainerRow1Text: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            color: theme.color
        },
        myCharityContainerRow2: {
            marginHorizontal: scale(10),
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(6),
            marginBottom: !userToken ? responsiveHeight(5) : null
        },
        myCharityContainerRow2Text: {
            fontFamily: 'Gilroy-ExtraBold',
            marginTop: Platform.OS === 'ios' ? 10 : null,
            fontSize: responsiveFontSize(6),
            color: '#000616',
            letterSpacing: 2.4
        },
        myCharityContainerRow3: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: scale(15),
        },
        myCharityContainerRow1TextOpacity:{
            opacity: 0.5,
        },
        charityShowAndHideContainer: {
            gap: scale(6)
        },
        myCharityContainerRow4: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: scale(15),
            opacity: scale(0.2),
        },
        myCharityContainerRow5: {
            alignItems: 'center',
            flexWrap: 'wrap',
            paddingTop: scale(12),
        },
        myCharityContainerRow5Text: {
            fontFamily: 'Gilroy-ExtraBold',
            marginHorizontal: scale(30),
            textAlign: 'center',
            fontSize: responsiveFontSize(2.6),
            opacity: scale(0.8),
            color: theme.color
        },
        myCharityContainerRow6: {
            alignItems: 'center',
            flexWrap: 'wrap',
            paddingBottom: scale(38),
        },
        myCharityContainerRow6Text: {
            marginHorizontal: scale(20),
            textAlign: 'center',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            opacity: scale(0.8),
            color: theme.color
        },
        afterSupportCharityContainer: {
            paddingHorizontal: scale(15),
            backgroundColor: theme.theme === 'dark' ? null : '#FFFFFF'
        },
        supportingCardContainer: {
            marginTop: scale(25),
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: supportCharityCardData[0]?.CharityColor,
            gap: scale(25),
            borderRadius: scale(6),
            marginHorizontal: scale(5),
            marginBottom: scale(30)
        },
        supportingCardContainerImage: {
            paddingTop: scale(30),
        },
        charityOrgImage: {
            resizeMode: 'contain',
            width: scale(96),
            height: scale(96),
            borderRadius: scale(50)
        },
        supportingCardText1: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.4),
            textAlign: 'center',
            width: responsiveWidth(55),
            color: '#FFFFFF',
        },
        supportingCardText2Container: {
            marginHorizontal: scale(10),
            flexDirection: 'column',
            gap: scale(10),
        },
        supportingCardText2: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            color: '#FFFFFF',
        },
        supportCharityButtonContainer: {
            marginBottom: scale(35),
            marginHorizontal: scale(20),
            marginTop: scale(15),
        },
        supportingCardText3Container: {
            padding: scale(9),
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: scale(6),
            borderWidth: responsiveWidth(0.5),
            borderColor: ' rgba(255,255,255,0.4)',
            textAlign: 'center',
        },
        supportingCardText3: {
            fontFamily: 'NunitoSans-Regular',
            textAlign: 'center',
            fontSize: responsiveFontSize(2.2),
            color: '#FFFFFF',
        },
        charityPartnerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            opacity: 0.5,
            marginTop: scale(30),
            color: theme.color
        },
        seaechBarContainer: {
            height: 48,
            marginTop: scale(20),
            alignItems: 'center',
            flexDirection: 'row',
            borderColor: 'rgba(151,151,151,0.6)',
            borderWidth: 0.66,
            borderRadius: scale(6),
            gap: 5,
        },
        searchStyle: {
            opacity: 0.5,
            marginLeft: scale(15),
        },
        input: {
            fontFamily: 'NunitoSans-SemiBold',
            flex: 1,
            fontSize: responsiveFontSize(2),
            marginLeft: scale(10),
            opacity: scale(0.6),
            color: theme.color
        },
        charityCards: {
            marginTop: scale(20),
            flexDirection: 'column',
            gap: scale(15),
        },
        noDataFound: {
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            fontSize: responsiveFontSize(3),
            color: theme.color
        },
        footerContainer: {
            marginTop: responsiveHeight(10)
        }
    });

    return (
        <>{isEmptyArray(charityCard) ? <Loader /> :
            <>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} ref={scrollToTop} style={styles.mainContainer} keyboardShouldPersistTaps={common.common.handled} >
                    <View style={styles.container}>
                        <View style={styles.headerSupportContainer}>
                            <View style={styles.headerBar}>
                                <Pressable style={styles.headerBarIcon} onPress={() => backArrowPress()} >
                                    <Feather name={common.common.chevronLeft} size={25} color={theme.color} />
                                </Pressable>
                                <Text style={styles.headerBarText}>{common.charity.charity}</Text>
                            </View>
                            <View style={styles.myCharityContainer}>
                                <View style={styles.myCharityContainerRow1}>
                                    <FontAwesome5 name={common.common.ribbon} size={18} color={theme.color} />
                                    <Text style={styles.myCharityContainerRow1Text}>{common.charity.totalRaised}</Text>
                                </View>
                                <LinearGradient colors={common.common.linearGradientColors} style={styles.myCharityContainerRow2}>
                                    <Text style={styles.myCharityContainerRow2Text}>£{parseInt((totalCharityAmount[0]?.sum)).toLocaleString()}</Text>
                                </LinearGradient>
                                {
                                    userToken &&
                                    <>
                                        <View style={styles.myCharityContainerRow3}>
                                            <Text style={[styles.myCharityContainerRow1Text,styles.myCharityContainerRow1TextOpacity]}>{common.charity.myCharity}</Text>
                                        </View>
                                        {
                                            showandHideCharityCard === false && (
                                                <View style={styles.charityShowAndHideContainer}>
                                                    <View style={styles.myCharityContainerRow4}>
                                                        <FontAwesome5 name={common.common.ribbon} size={40} color={theme.color} />
                                                    </View>
                                                    <View style={styles.myCharityContainerRow5}>
                                                        <Text style={styles.myCharityContainerRow5Text} adjustsFontSizeToFit minimumFontScale={0.5} numberOfLines={2}>
                                                            {common.charity.youDontSupport}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.myCharityContainerRow6}>
                                                        <Text style={styles.myCharityContainerRow6Text} adjustsFontSizeToFit minimumFontScale={0.5} numberOfLines={3}>
                                                            {common.charity.chooseOne}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                    </>
                                }
                            </View>
                            {
                                showandHideCharityCard === true && (
                                    <View style={styles.supportingCardContainer}>
                                        <Pressable style={styles.supportingCardContainerImage} onPress={() => openLink(supportCharityCardData[0]?.CharityUrl)} >
                                            <Image style={styles.charityOrgImage} source={{ uri: `${Url.ImageUrl}${supportCharityCardData[0]?.CharityImgUrl}` }} />
                                        </Pressable>
                                        <Text style={styles.supportingCardText1}>{common.charity.youAreSupporting} {supportCharityCardData[0]?.CharityName}</Text>
                                        <View style={styles.supportingCardText2Container}>
                                            <Text style={styles.supportingCardText2}>{common.charity.thankYouForSupport}</Text>
                                            <Text style={styles.supportingCardText2} adjustsFontSizeToFit minimumFontScale={0.5} numberOfLines={3}>
                                                {common.charity.soFar} £{parseInt((supportCharityCardData[0]?.DonationAmountDisplayed)).toLocaleString()} {common.charity.towards} {supportCharityCardData[0].CharityName} - {common.charity.thatsIncredible}
                                            </Text>
                                            <View style={styles.supportCharityButtonContainer}>
                                                <TouchableOpacity style={styles.supportingCardText3Container} onPress={() => openLink(supportCharityCardData[0].CharityUrl)}>
                                                    <Text style={styles.supportingCardText3}>{common.charity.viewSite}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                        <View style={styles.afterSupportCharityContainer}>
                            <Text style={styles.charityPartnerText}>{common.charity.ourCharityPartners}</Text>
                            <View style={styles.seaechBarContainer}>
                                <Fontisto name={common.common.search} size={20} color={theme.color} style={styles.searchStyle} />
                                <TextInput
                                    style={styles.input}
                                    placeholder={common.charity.SearchForACharity}
                                    placeholderTextColor={theme.color}
                                    onChangeText={query => setSearchQuery(query)}
                                    value={searchQuery}
                                />
                            </View>

                            <View style={styles.charityCards}>
                                {
                                    !isEmptyArray(filteredData) ?
                                        filteredData?.map((ele, i) => (<CharityCard isCharitySupported={isCharitySupported} onRefresh={onRefresh} scrollToTopRef={scrollToTopRef} key={i} {...ele} userToken={userToken} />))
                                        :
                                        <Text style={styles.noDataFound}>{common.common.NoDataFound}</Text>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.footerContainer}>
                        {/* <Footer /> */}
                    </View>
                </ScrollView>
            </>}
        </>

    );
};



export default Charity;
