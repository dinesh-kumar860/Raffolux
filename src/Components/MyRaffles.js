import { StyleSheet, Text, View, ScrollView, Image, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import Footer from './Footer';

import Loader from '../helpers/Loader';
import { capitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';
import * as common from '../helpers/common';

import Header from '../utils/Header';
import { isEmptyObject } from '../utils/utils';
import { scrollToElement } from '../utils/ScrollToElement';
import ActivityIndicatorLoader from '../helpers/ActivityIndicatorLoader';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';
import ThemeContext from '../utils/themes/themeWrapper';

import { fetchMyPendingRafflesWithLogin, fetchMyRafflesWithLogin } from '../api/myRafflesApi';

import RaffleCard from './MyRafflesComponents/RaffleCard';
import MyRaffleTabs from './MyRafflesComponents/MyRaffleTabs';
import MyRafflePagination from './MyRafflesComponents/MyRafflePagination';

import MyRafflesPrizeImage from '../assets/Images/MyRafflesPrizeImage.png'
import myTicketsPrizeImage from '../assets/Images/myTicketsPrizeImage.png'


const MyRaffles = ({ route, navigation }) => {
    const theme = useContext(ThemeContext);
    const { isConnected } = useInternet();

    const [isActiveTab, setIsActiveTab] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [raffleData, setRaffleData] = useState({});
    const [activeRafflesData, setActiveRafflesData] = useState([]);
    const [endedRafflesData, setEndedRafflesData] = useState([])
    const [pendingRaffles, setPendingRaffles] = useState([]);
    const [activePageNumber, setActivePageNumber] = useState(1);
    const [endedPageNumber, setEndedPageNumber] = useState(1);
    const [endedRaffleDataLoading, setEndedRaffleDataLoading] = useState(false);
    const [activeRaffleDataLoading, setActiveRaffleDataLoading] = useState(false);

    const scrollToTop = useRef(null);
    const tabsContainerRef = useRef(null)

    const activeRafflesCount = useSelector((state) => state.getAccountData.activeRafflesCount);
    const claimPrizesCount = useSelector((state) => state.getAccountData.claimPrizesCount);


    const fetchActiveRafflesWithLogin = async (number) => {
        setActivePageNumber(number)
        setActiveRaffleDataLoading(true)
        scrollToElement(scrollToTop, tabsContainerRef)
        let response = await fetchMyRafflesWithLogin({ "page": number });
        if (response) {
            !isEmptyObject(response) && setRaffleData(response);
            !isEmptyObject(response) && setActiveRafflesData(response.raffles_entered_active);
            !isEmptyObject(response) && setActiveRaffleDataLoading(false)
        }
        else {
            setActiveRaffleDataLoading(false)
        }
    }

    const fetchEndedRafflesWithLogin = async (number) => {
        setEndedPageNumber(number)
        setEndedRaffleDataLoading(true)
        scrollToElement(scrollToTop, tabsContainerRef)
        let response = await fetchMyRafflesWithLogin({ "page": number });
        if (response) {
            !isEmptyObject(response) && setEndedRafflesData(response.raffles_inactive);
            !isEmptyObject(response) && setEndedRaffleDataLoading(false)
        }
        else {
            setEndedRaffleDataLoading(false)
        }
    }

    const fetchPendingRaffles = async () => {
        let response = await fetchMyPendingRafflesWithLogin({ "page": 1 });
        !isEmptyObject(response) && setPendingRaffles(response.rafflesPending)
    };

    const handlePrizeClaims = () => navigation.navigate('PrizeClaimNew')

    const backArrowPress = () => navigation.goBack()

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            if (isConnected) {
                setIsActiveTab(1)
                fetchActiveRafflesWithLogin(1);
                fetchEndedRafflesWithLogin(1)
                fetchPendingRaffles();
            }
        }, 1000);
    }, []);

    useEffect(() => {
        if (isConnected) {
            fetchActiveRafflesWithLogin(1);
            fetchEndedRafflesWithLogin(1)
            fetchPendingRaffles();
        }
    }, [activeRafflesCount, claimPrizesCount, isConnected]);

    const Tab = (props) => {
        const { title, handleOnPress, isSelected } = props
        return (
            <TouchableOpacity style={styles.singleTabContainer(isSelected)} onPress={() => handleOnPress()} disabled={isSelected} >
                <Text style={styles.tabTitle(isSelected)} >{title}</Text>
            </TouchableOpacity>
        )
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        mainConatiner: {
            backgroundColor: theme.background,
            flex: 1,
            paddingHorizontal: 17,
        },
        themeColor: {
            color: theme.color
        },
        pendingClaimsText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            color: theme.color,
            opacity: scale(0.5),
            lineHeight: scale(15),
            marginBottom: scale(7),
            marginTop: scale(16)
        },
        claimMyPrizesCard: {
            backgroundColor: theme.theme === 'dark' ? '#141628' : '#FFFFFF',
            paddingHorizontal: scale(16),
            paddingVertical: scale(18),
            borderRadius: scale(6),
            elevation: scale(4),
            alignItems: 'center',
            justifyContent: 'center'
        },
        claimMyPrizesCardText1: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            lineHeight: scale(20),
            textAlign: 'center'
        },
        bigPrizeImage: {
            height: responsiveHeight(15.6),
            width: responsiveWidth(28),
            resizeMode: 'contain',
            marginTop: responsiveHeight(2)
        },
        claimMyPrizesCardText2: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            lineHeight: scale(19),
            color: theme.color,
            opacity: scale(0.8)
        },
        orangeText: {
            color: '#FFBD0A'
        },
        claimMyPrizeButtonContainer: {
            flexDirection: "row",
            height: responsiveHeight(5.2),
            width: responsiveWidth(32),
            gap: 6,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            marginTop: responsiveHeight(2.5)
        },
        prizeImage: {
            width: 15,
            height: 15,
            resizeMode: 'contain'
        },
        claimMyPrizeText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            color: '#000616'
        },
        myRafflesText: {
            marginTop: scale(24),
            marginBottom: scale(16),
        },
        TabsContainer: {
            flexDirection: 'row',
            gap: responsiveWidth(10),
        },
        singleTabContainer(isActive) {
            return {
                height: responsiveHeight(4.2),
                width: responsiveWidth(21),
                backgroundColor: isActive ? theme.theme == 'dark' ?  'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.1)': null,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6
            }
        },
        tabTitle(isActive) {
            return {
                color: theme.color,
                fontFamily: 'Gilroy-ExtraBold',
                fontSize: responsiveFontSize(1.5),
                opacity: isActive ? 1 : 0.6
            }
        },
        horizontalLine: {
            height: scale(1),
            borderWidth: scale(0.5),
            opacity: scale(0.1),
            borderColor: theme.color
        },
        activityIndicatorContainer: {
            height: scale(100),
            alignItems: 'center',
            justifyContent: 'center'
        },
        noRaffleTextContainer: {
            alignSelf: 'center',
            marginTop: scale(20),
        },
        clickHere: {
            color: '#FFBD0A',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            marginTop: scale(15)
        },
        footerContainer: {
            marginTop: scale(150)
        },
        paginationContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(20)
        }
    });


    return (
        <>{
            isEmptyObject(raffleData) ? <Loader /> :
                <View style={styles.container}>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} ref={scrollToTop}>
                        <View ref={tabsContainerRef}>
                            <Header title={'My Tickets'} theme={theme} backArrowPress={backArrowPress} />
                        </View>
                        <View style={styles.mainConatiner} >
                            {
                                raffleData?.user_won_raffle_claimprocess[0]?.count > 0 && <View style={styles.container}>
                                    <Text style={styles.pendingClaimsText}>{common.myRaffles.PENDINGCLAIMS}</Text>
                                    <View style={styles.claimMyPrizesCard}>
                                        <Text style={styles.claimMyPrizesCardText1}>{capitalizeFirstLetter(raffleData?.user.first_name)}, {common.myRaffles.youHave} {raffleData?.user_won_raffle_claimprocess?.[0].count} {raffleData?.user_won_raffle_claimprocess?.[0].count > 1 ? `${common.common.prizes}` : `${common.common.prize}`} {common.myRaffles.toClaim}!</Text>
                                        <Image source={myTicketsPrizeImage} style={styles.bigPrizeImage} />
                                        <TouchableOpacity onPress={() => handlePrizeClaims()}>
                                            <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.claimMyPrizeButtonContainer}>
                                                <Image style={styles.prizeImage} source={MyRafflesPrizeImage} />
                                                <Text style={styles.claimMyPrizeText}>Claim</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                            <Text style={[styles.pendingClaimsText, styles.myRafflesText]}>{common.myRaffles.MYRAFFLES}</Text>
                            <View style={styles.TabsContainer} >
                                {
                                    common.myRaffles.tabsData?.map((ele, i) => (
                                        <Tab key={i} title={ele} handleOnPress={() => setIsActiveTab(i + 1)} isSelected={isActiveTab === i + 1} />

                                    ))
                                }
                            </View>
                            {
                                isActiveTab === 1 && activeRafflesData?.length > 0 ? activeRaffleDataLoading === false ? activeRafflesData?.map((ele, i) => (
                                    <RaffleCard theme={theme} key={i} image={ele.MiniImageUrl} title={ele.Title} time={ele.RaffleExpire} ticketCount={raffleData?.ticketCount} raffleCode={ele.RaffleCode} id={ele.id} type={'active'} />
                                ))
                                    :
                                    <View style={styles.activityIndicatorContainer}>
                                        <ActivityIndicatorLoader theme={theme} />
                                    </View>
                                    : null
                            }
                            {
                                isActiveTab === 1 && activeRafflesData?.length < 1 && <View style={styles.noRaffleTextContainer}><Text style={styles.themeColor}>{common.myRaffles.YouAreNotCurrentlyEnteredIntoAnyRaffles}</Text><Text style={styles.clickHere} onPress={() => navigation.navigate('Home')}>{common.myRaffles.clickHereToSee}</Text></View>
                            }

                            {
                                isActiveTab === 1 && pendingRaffles?.length > 0 && pendingRaffles?.map((ele, i) => (
                                    <RaffleCard theme={theme} key={i} image={ele.MiniImageUrl} title={ele.Title} time={ele.RaffleExpire} ticketCount={raffleData?.ticketCount} raffleCode={ele.RaffleCode} id={ele.id} type={'pending'} />
                                ))
                            }
                            {
                                isActiveTab === 2 && endedRafflesData?.length > 0 ? endedRaffleDataLoading === false ? endedRafflesData?.map((ele, i) => (
                                    <RaffleCard theme={theme} key={i} image={ele.MiniImageUrl} title={ele.Title} time={ele.RaffleExpire} ticketCount={raffleData?.ticketCount} raffleCode={ele.RaffleCode} id={ele.id} type={'ended'} winnersTicketNumber={ele.winnersTicketNumber} />
                                ))
                                    :
                                    <View style={styles.activityIndicatorContainer}>
                                        <ActivityIndicatorLoader theme={theme} />
                                    </View>
                                    : null
                            }
                            {
                                isActiveTab === 2 && endedRafflesData?.length < 1 && <View style={styles.noRaffleTextContainer}><Text style={styles.themeColor}>{common.myRaffles.YouHaventEnteredAnyRafflesYet}</Text><Text style={styles.clickHere} onPress={() => navigation.navigate('Home')}>{common.myRaffles.clickHereToSee}</Text></View>
                            }
                            {
                                isActiveTab === 1 && raffleData?.activePagination > 1 &&
                                <View style={styles.paginationContainer}>
                                    <MyRafflePagination theme={theme} data={raffleData?.activePagination} pageNumber={activePageNumber} handleOnPress={fetchActiveRafflesWithLogin} />
                                </View>
                            }
                            {
                                isActiveTab === 2 && raffleData?.endedPagination > 1 &&
                                <View style={styles.paginationContainer}>
                                    <MyRafflePagination theme={theme} data={raffleData?.endedPagination} pageNumber={endedPageNumber} handleOnPress={fetchEndedRafflesWithLogin} />
                                </View>
                            }
                        </View>
                        <View style={styles.footerContainer}>
                            {/* <Footer /> */}
                        </View>
                    </ScrollView>
                </View>
        }
        </>
    )
}

export default MyRaffles


