import React, { useState, useEffect, useCallback, useContext, useMemo, useRef, memo } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, Pressable, Image, Modal, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { _fetchStatistics, fetchAllRafflesWithLogin, fetchFeaturedRafflesWithLogin, fetchPrizesWon, fetchRaffleWinners, fetchRaffleWinnersThisWeek, fetchRaisedCharity, fetchSoldOutRafflesWithLogin, fetchSuperFeaturedRaffleWithLogin } from '../api/homeApi';

import Card from './HomePageComponents/Card';
import ButtonsCarousel from './HomePageComponents/ButtonsCarousel';
import CarouselContainer from './HomePageComponents/CarouselContainer';
import NoDataLiveCard from './HomePageComponents/NoDataLiveCard';
import SuperRaffle from './HomePageComponents/SuperRaffle';
import LiveCompetitionNew from './HomePageComponents/LiveCompetitionNew';
import ActiveAndEndedRaffles from './HomePageComponents/ActiveAndEndedRaffles';

import { Url } from '../helpers/routesApi';
import { openLink } from '../helpers/OpenBrowser';
import * as Common from '../helpers/common';
import Loader from '../helpers/Loader';

import { isEmptyArray, isEmptyObject } from '../utils/utils';
import ThemeContext from '../utils/themes/themeWrapper';
import StarRatingsHome from '../utils/5StarRatingsHome';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';

import Footer from './Footer';

import { _fetchCartCountWithLogin } from '../ReduxToolKit/apiSlice';
import { AuthContext } from '../Context/AuthContext';

import Feather from 'react-native-vector-icons/Feather';
import FinishClaimPrizeImage from '../assets/Images/FinishClaimPrizeImage.png'
import Carousel from './HomePageComponents/Carousel';


const Home = () => {
    const theme = useContext(ThemeContext);
    const { userToken } = useContext(AuthContext)
    const { isConnected } = useInternet();

    const navigation = useNavigation()
    const route = useRoute();
    const fromNavBar = route.params;

    const dispatch = useDispatch();
    const scrollViewRef = useRef(null);

    const pendingPrizeClaimData = useSelector((state) => state.getAccountData.prizeClaimCashData);

    const [CategoryID, setCategoryID] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [carouselData, setCarouselData] = useState([]);
    const [allRafflesData, setAllRafflesData] = useState([]);
    const [filterAllRafflesData, setFilterAllRafflesData] = useState([]);
    const [activeRaffles, setActiveRaffles] = useState([]);
    const [endingSoon, setEndingSoon] = useState([]);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [superRaffleData, setSuperRaffleData] = useState([])
    const [pricesWon, setPricesWon] = useState('');
    const [raffleWinnersResponse, setRaffleWinnersResponse] = useState('');
    const [raffleWinnersThisWeekResponse, setRaffleWinnersThisWeekResponse] = useState('');
    const [raisedCharityResponse, setRaisedCharityResponse] = useState('');
    const [isFetchingRaffleData, setIsFetchingRaffleData] = useState(false);
    const [filteredTabArray, setFilteredTabArray] = useState([])

    useMemo(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme]);

    const FeaturedRaffles = async () => {
        const response = await fetchFeaturedRafflesWithLogin();
        response && setCarouselData(response);
    };

    const fetchSuperFeaturedRaffle = async () => {
        const response = await fetchSuperFeaturedRaffleWithLogin();
        response && setSuperRaffleData(response)
    }

    const FetchAllRaffles = async () => {
        setIsFetchingRaffleData(true)
        let response = await fetchAllRafflesWithLogin();
        if (response) {
            setIsFetchingRaffleData(false)
            const active = response.filter((ele) => {
                const time = Date.parse(ele.RaffleExpire) - Date.now();
                return Math.floor(time / (1000 * 60 * 60 * 24)) >= 1 && ele;
            });

            const endingsoon = response.filter((ele) => {
                const time = Date.parse(ele.RaffleExpire) - Date.now();
                return (Math.floor(time / (1000 * 60 * 60 * 24)) < 1) && ele;
            });

            let categories = response.map((ele) => {
                return ele.CategoryID_id
            })
            let noDuplicateTabsArray = [...new Set(categories)];
           
            setFilteredTabArray(noDuplicateTabsArray);
            setAllRafflesData(response);
            setFilterAllRafflesData(response);

            setActiveRaffles(active.length);
            setEndingSoon(endingsoon.length);
        } else {
            setIsFetchingRaffleData(false)
        }
    };

    const FetchStatistics = async () => {
        const fetchPrizesWonResponse = await fetchPrizesWon();
        !isEmptyObject(fetchPrizesWonResponse) && setPricesWon(fetchPrizesWonResponse?.PrizesWon);

        const fetchRaffleWinnersResponse = await fetchRaffleWinners();
        !isEmptyObject(fetchRaffleWinnersResponse) && setRaffleWinnersResponse(fetchRaffleWinnersResponse?.RaffleWinners)

        const fetchRaffleWinnersThisWeekResponse = await fetchRaffleWinnersThisWeek();
        !isEmptyObject(fetchRaffleWinnersThisWeekResponse) && setRaffleWinnersThisWeekResponse(fetchRaffleWinnersThisWeekResponse?.RaffleWinnersThisWeek);

        const fetchRaisedCharityResponse = await fetchRaisedCharity();
        !isEmptyObject(fetchRaisedCharityResponse) && setRaisedCharityResponse(fetchRaisedCharityResponse?.RaisedCharity);
    };


    useMemo(() => {
        switch (CategoryID) {
            case 0:
                !isEmptyArray(allRafflesData) && setFilterAllRafflesData(allRafflesData.map(ele => ele));
                break;

            case 35: case 6: case 9: case 36: case 100:
                !isEmptyArray(allRafflesData) && setFilterAllRafflesData(allRafflesData.filter(ele => ele.CategoryID_id === CategoryID && ele));
                break;

            case 1000:
                !isEmptyArray(allRafflesData) && setFilterAllRafflesData(allRafflesData.filter(ele => ele.CategoryID_id !== 0 && ele.CategoryID_id !== 35 && ele.CategoryID_id !== 6 && ele.CategoryID_id !== 9 && ele.CategoryID_id !== 36 && ele.CategoryID_id !== 100 && ele));
                break;

            default:
                FetchAllRaffles();
                break;
        }
    }, [CategoryID]);

    useEffect(() => {
        if (isConnected) {
            FeaturedRaffles();
            fetchSuperFeaturedRaffle();
            FetchAllRaffles();
            FetchStatistics();
            if (userToken) dispatch(_fetchCartCountWithLogin());
        }
    }, [isConnected, userToken]);

    useEffect(() => {
        if (fromNavBar) {
            FeaturedRaffles();
            fetchSuperFeaturedRaffle();
            FetchAllRaffles();
            FetchStatistics();
            if (userToken) dispatch(_fetchCartCountWithLogin());
        }
    }, [fromNavBar]);

    const onRefresh = useCallback(() => {
        if (isConnected) {
            setRefreshing(true);
            setTimeout(() => {
                FeaturedRaffles();
                fetchSuperFeaturedRaffle();
                FetchAllRaffles();
                FetchStatistics();
                setRefreshing(false);
                if (userToken) dispatch(_fetchCartCountWithLogin());
            }, 1000);
        }
    }, []);


    const handlePendingPrizeClaims = () => {
        const newArr = pendingPrizeClaimData.map((ele, i) => {
            return { ...ele, option: 'Cash' }
        })
        const totalPayout = pendingPrizeClaimData.reduce((accumulator, currentValue) => {
            const payoutAmountNumeric = parseFloat(currentValue.payoutAmount);
            return accumulator + payoutAmountNumeric;
        }, 0);
        navigation.navigate('PrizeClaimSummaryNew', { winnerRaffleDetails: newArr, specialCategories: Common.prizeClaim.specialCategories, totalCash: Number(totalPayout), pendingPrizes: true });
    };



    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F2F2F2' : '#000616',
        },
        finishClaimPrizeContainer: {
            height: responsiveHeight(5.8),
            flexDirection: 'row',
            alignItems: 'center',
            gap: 11,
            paddingHorizontal: responsiveWidth(5)
        },
        finishClaimPrizeImage: {
            height: 24,
            width: 24,
            resizeMode: 'contain'
        },
        finishClaimPrizeTextContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        finishClaimPrizeText: {
            color: '#000',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
        },
        finishClaimPrizeTextColor: {
            color: '#FFFFFF',
            top: -2
        },
        finishClaimPrizeButton: {
            height: 24,
            width: 75,
            backgroundColor: '#000616',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            borderRadius: 42,
        },
        infoContainer: {
            marginTop: scale(14),
            marginBottom: scale(32),
            justifyContent: 'space-between',
            paddingHorizontal: responsiveWidth(3)
        },
        _container: {
            flex: 1,
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F2F2F2' : '#000616',
        },
        containerPaddingLeft: {
            paddingLeft: scale(10)
        },
        containerPaddingRight: {
            paddingRight: scale(10)
        },
        giftIcon: {
            color: '#FFAE05',
            marginRight: scale(1),
            paddingTop: scale(2),
        },
        linearGradient: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: scale(46),
        },
        buttonText: {
            fontSize: scale(15),
            fontFamily: 'Gilroy-Black',
            textAlign: 'center',
            margin: scale(10),
            color: '#000616',
            backgroundColor: 'transparent',
            height: scale(20)
        },
        offerCard: {
            backgroundColor: '#000616',
            borderRadius: scale(5),
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: scale(6),
            paddingHorizontal: scale(10),
            height: scale(28),
        },
        offerCardText: {
            color: '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: scale(11),
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: scale(5),
            paddingTop: scale(2),
        },
        LiveComponentsContainer: {
            paddingHorizontal: scale(10),
        },
        LiveComponentsText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            textAlign: 'center',
            paddingTop: scale(24),
            paddingBottom: scale(16),
        },
        FEATURED_JACKPOTS: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            lineHeight: scale(17),
            paddingHorizontal: scale(10),
            textAlign: 'center'
        },
        carouselMainContainer: {
            alignItems: 'center'
        },
        liveComititionsInfoContainer: {
            flexDirection: 'row',
            paddingBottom: scale(20),
            justifyContent: 'center',
            gap: scale(7)
        },
        LiveComponents: {
            marginVertical: scale(25),
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(7)
        },
        trustPilotMainContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            paddingTop: scale(7),
            paddingBottom: scale(28),
            marginHorizontal: scale(10),
            marginBottom: scale(10),
            borderWidth: scale(1.5),
            borderRadius: scale(6),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'transparent' : 'rgb(33,39,52)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        trustPilotContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(16),
        },
        bigReviewStarContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(2),
        },
        starImage: {
            height: scale(20),
            width: scale(20),
            marginBottom: scale(5)
        },
        trustPilotText: {
            color: theme.color,
            fontSize: responsiveFontSize(1.8),
            fontWeight: 600
        },
        supportedPayment: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#F2F2F2',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: scale(11),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: scale(15),
        },
        paymentContainer: {
            flexDirection: 'row',
            gap: scale(8),
        },
        paymentLogo: {
            width: scale(35.25),
            height: scale(24),
            resizeMode: 'contain'
        },
        modalBackgroundOpacity: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            paddingHorizontal: scale(12)
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
        }
    });

    return (
        <>{
            isFetchingRaffleData ? <Loader /> :
                <View style={styles.mainContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false} ref={scrollViewRef} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {
                            !isEmptyArray(pendingPrizeClaimData) && userToken &&
                            <LinearGradient colors={Common.common.linearGradientColors} style={styles.finishClaimPrizeContainer} >
                                <Image source={FinishClaimPrizeImage} style={styles.finishClaimPrizeImage} />
                                <View style={styles.finishClaimPrizeTextContainer}>
                                    <Text style={styles.finishClaimPrizeText}>Finish claiming your prize</Text>
                                    <TouchableOpacity style={styles.finishClaimPrizeButton} onPress={() => handlePendingPrizeClaims()}>
                                        <Text style={[styles.finishClaimPrizeText, styles.finishClaimPrizeTextColor]} >claim</Text>
                                        <Feather name={'chevron-right'} size={11} color={'#FFFFFF'} />
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        }
                        {
                            superRaffleData?.map((ele, i) => (<SuperRaffle key={i} {...ele} />))
                        }
                        <View style={styles._container} >
                            <View style={styles.infoContainer}>
                                <Card pricesWon={pricesWon} raffleWinnersResponse={raffleWinnersResponse} raffleWinnersThisWeekResponse={raffleWinnersThisWeekResponse} raisedCharityResponse={raisedCharityResponse} viewBackgroundColor={viewBackgroundColor} />
                            </View>
                            {
                                !isEmptyArray(carouselData) &&
                                <>
                                    <Text style={styles.FEATURED_JACKPOTS}  >{Common.Home.FEATURED_JACKPOTS}</Text>
                                    <View style={styles.carouselMainContainer}>
                                        {
                                            carouselData?.map((ele, i) => <Carousel key={i}{...ele} />)
                                        }
                                    </View>
                                </>
                            }
                            <View style={styles.trustPilotMainContainer}>
                                <View style={styles.trustPilotContainer}>
                                    <Pressable onPress={() => openLink(Url.TrustPilotLink)}>
                                        <StarRatingsHome viewBackgroundColor={viewBackgroundColor} />
                                    </Pressable>
                                    <Pressable style={styles.bigReviewStarContainer} onPress={() => openLink(Url.TrustPilotLink)}>
                                        <Image style={styles.starImage} source={require('../assets/Images/bigReviewStar.png')} />
                                        <Text style={styles.trustPilotText}>Trustpilot</Text>
                                    </Pressable>
                                </View>
                                <Text style={styles.supportedPayment} >{Common.Home.SupportedPaymentOptions}</Text>
                                <View style={styles.paymentContainer}>
                                    {
                                        Common.Footer.paymentSection?.map((ele, i) => (
                                            <Image key={i} style={styles.paymentLogo} source={ele} />
                                        ))
                                    }
                                </View>
                            </View>
                            <View style={styles.containerPaddingLeft}>
                                {
                                    !isEmptyArray(allRafflesData) &&
                                    <View style={styles.containerPaddingRight}>
                                        <Text style={styles.LiveComponentsText} >{Common.Home.LIVE_RAFFLES}</Text>
                                        <View style={styles.liveComititionsInfoContainer}>
                                            <ActiveAndEndedRaffles rafflesCount={activeRaffles} theme={theme} type={'active'} />
                                            <ActiveAndEndedRaffles rafflesCount={endingSoon} theme={theme} type={'ended'} />
                                        </View>
                                    </View>
                                }
                                {
                                    !isEmptyArray(allRafflesData) &&
                                    <ButtonsCarousel setCategoryID={setCategoryID} CategoryID={CategoryID} theme={theme} tabsFilteredArray={filteredTabArray} />
                                }
                            </View>
                            {
                                !isEmptyArray(allRafflesData) &&
                                <View style={styles.LiveComponents}>
                                    {!isEmptyArray(filterAllRafflesData) ? (
                                        filterAllRafflesData?.map((ele, i) => (
                                            <LiveCompetitionNew key={i} {...ele} theme={theme} raffleId={ele.Raffle_id} />
                                        ))
                                    ) : (
                                        <NoDataLiveCard />
                                    )}
                                </View>
                            }
                        </View>
                    </ScrollView>
                </View>
        }
        </>
    );
};

export default Home;
