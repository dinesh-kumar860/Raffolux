import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image, RefreshControl } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import * as common from '../helpers/common';
import { openLink } from '../helpers/OpenBrowser';
import { Url } from '../helpers/routesApi';
import Loader from '../helpers/Loader';
import SingleStar from '../helpers/SingleStar';
import { isEmptyArray } from '../utils/utils';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';

import ThemeContext from '../utils/themes/themeWrapper';
import Header from '../utils/Header';

import TotalMonthsData from './WinnersPageComponents/TotalMonthsData';
import WinnersCarousel from './WinnersPageComponents/WinnersCarousel';
import Footer from './Footer';
import { fetchlatestWinnersWithLogin } from '../api/winnersApi';

import winMedalLight from '../assets/Images/winMedal1.png';
import winMedalDark from '../assets/Images/winImage1Dark.png';
import reviewStar from '../assets/Images/reviewStar.png';
import bigReviewStar from '../assets/Images/bigReviewStar.png';
import winnersThreeBarsLight from '../assets/Images/winnersThreeBars1.png';
import winnersThreeBarsDark from '../assets/Images/winnersThreeBars1Dark.png';



const Winners = () => {
    const navigation = useNavigation();
    const { isConnected } = useInternet()
    const theme = useContext(ThemeContext);
    const [totalWinnersNumber, setTotalWinnersNumber] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const scrollToTopRef = useRef();
    const [winnersData, setWinnersData] = useState([]);

    const backArrowPress = () => navigation.goBack();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            fetchLatestWinners();
        }, 3000);
    }, []);

    const fetchLatestWinners = async () => {
        let response = await fetchlatestWinnersWithLogin();
        !isEmptyArray(response) && setWinnersData(response)
    }
    useEffect(() => {
        if (isConnected) {
            fetchLatestWinners()
        }
    }, [isConnected]);

    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: theme.background
        },
        container: {
            flex: 1,
            backgroundColor: theme.theme === 'dark' ? '#141628' : 'rgba(20, 22, 40, 0.05)',
            paddingTop: scale(15),
            gap: scale(15)
        },
        cardTextContainerBorderRadius: {
            borderWidth: scale(4.22456),
            borderColor: '#FFFFFF',
            borderRadius: scale(6),
            marginHorizontal: scale(27),
            elevation: scale(8)
        },
        cardTextContainer: {
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: scale(10),
            padding: scale(15),
            elevation: scale(5),
            borderRadius: scale(2)
        },
        cardText1: {
            color: '#FFBD0A',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.8),
        },
        cardText2: {
            color: '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.9),
        },
        ratingsContainer: {
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#000030',
            flexDirection: 'row',
            gap: scale(25),
            justifyContent: 'center'
        },
        starsMainContainer: {
            gap: scale(6),
            alignItems: 'center',
            marginVertical: scale(15)
        },
        excellentText: {
            color: '#FFFFFF',
            fontSize: responsiveFontSize(2),
            fontWeight: 600
        },
        starsContainer: {
            flexDirection: 'row',
            gap: scale(2)
        },
        starImageBackground: {
            backgroundColor: '#00C08D',
            padding: scale(2.14),
        },
        textUnderLine: {
            textDecorationLine: 'underline'
        },
        bigReviewStarContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(2),
        },
        trustPilotText: {
            color: '#FFFFFF',
            fontSize: responsiveFontSize(2),
            fontWeight: 600
        },
        threeBarsContainer: {
            backgroundColor: theme.background,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: scale(8),
            alignItems: 'center',
            paddingTop: scale(32)
        },
        threeBarsImage: {
            width: scale(18),
            height: scale(24),
            resizeMode: 'contain'
        },
        winnersListText: {
            color: theme.color,
            fontSize: responsiveFontSize(2.5),
            fontFamily: 'Gilroy-ExtraBold',
        },
        containerTabs: {
            gap: scale(30),
            marginTop: scale(35),
        },
        title: {
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000616'
        },
        winnerMedalContainer: {
            flexDirection: 'row',
            gap: scale(8),
            alignItems: 'center',
            justifyContent: 'center'
        },
        medalImage: {
            width: scale(18),
            height: scale(24)
        },
        imageText: {
            fontSize: responsiveFontSize(2.4),
            fontFamily: 'Gilroy-ExtraBold',
            color: theme.color
        }
    });

    return (
        <>{!isEmptyArray(winnersData) ?
            <>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} ref={scrollToTopRef} style={styles.mainContainer} keyboardShouldPersistTaps='handled'>
                    <View>
                        <Header title={'Winners'} theme={theme} backArrowPress={backArrowPress} />
                        <View style={styles.container}>
                            <View style={styles.cardTextContainerBorderRadius}>
                                <LinearGradient colors={['#0C1835', '#28293D']} style={styles.cardTextContainer}>
                                    <Text style={styles.cardText1}>{parseInt(totalWinnersNumber).toLocaleString()} {common.winners.winnersSoFar} </Text>
                                    <Text style={styles.cardText2}>{common.winners.couldYouBeNext}</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.containerTabs}>
                                <View style={styles.winnerMedalContainer}>
                                    <Image source={theme.theme === 'light' ? winMedalLight : winMedalDark} style={styles.medalImage} />
                                    <Text style={styles.imageText}>{common.winners.latestWinners}</Text>
                                </View>
                                <WinnersCarousel winnersData={winnersData} />
                            </View>
                            <View style={styles.ratingsContainer}>
                                <Pressable style={styles.starsMainContainer} onPress={() => openLink(Url.TrustPilotLink)}>
                                    <Text style={styles.excellentText}>{common.common.excellent}</Text>
                                    <View style={styles.starsContainer}>
                                        {
                                            [...Array(4)].map((ele, i) => (
                                                <SingleStar starImageBackground={styles.starImageBackground} key={i} />
                                            ))
                                        }
                                        <LinearGradient colors={['#00C08D', '#00C0A0', '#00C09D', '#D9D9D9', '#D9D9D9']} start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }} locations={[0.0031, 0.5013, 0.5014, 0.5015, 1]} style={styles.starImageBackground}>
                                            <Image source={reviewStar} />
                                        </LinearGradient>
                                    </View>
                                </Pressable>
                                <Pressable style={styles.bigReviewStarContainer} onPress={() => openLink(Url.TrustPilotLink)} >
                                    <Image source={bigReviewStar} />
                                    <Text style={styles.trustPilotText}>{common.InstantNonInstant.Trustpilot}</Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.threeBarsContainer}>
                            <Image style={styles.threeBarsImage} source={theme.theme === 'light' ? winnersThreeBarsLight : winnersThreeBarsDark} />
                            <Text style={styles.winnersListText}>{common.winners.winnerList}</Text>
                        </View>
                        <TotalMonthsData setTotalWinnersNumber={setTotalWinnersNumber} />
                        {/* <Footer /> */}
                    </View>
                </ScrollView>
            </>
            :
            <Loader />
        }
        </>
    )
}


export default Winners