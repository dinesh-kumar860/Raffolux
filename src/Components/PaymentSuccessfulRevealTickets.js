import { Alert, BackHandler, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ClaimLinearGradientButton from './ClaimSummaryComponents/ClaimLinearGradientButton';

import { fetchFromCartOnPaymentWithLogin } from '../api/PaymentSuccessApi';
import { fetchMyPrizeClaimsWithLogin } from '../api/prizeClaimApi';

import ThemeContext from '../utils/themes/themeWrapper'
import { timeFormatter } from '../utils/TimeFormatter'
import { isEmptyObject } from '../utils/utils'
import LinearGradientButton from '../utils/LinearGradientButton';

import ActivityIndicatorLoader from '../helpers/ActivityIndicatorLoader';
import { Url } from '../helpers/routesApi';
import * as common from '../helpers/common'

import { cartCountApiCallActive } from '../ReduxToolKit/cartSlice';
import { _fetchCartCountWithLogin, getActiveRafflesCount, getClaimPrizeCount, getCreditBalance, getStoreBalance } from '../ReduxToolKit/apiSlice';

import paymentSuccess from '../assets/Images/WithoutLoginPaymentSuccess.png';
import { AuthContext } from '../Context/AuthContext';
import { scale } from 'react-native-size-matters';



const PaymentSuccessfulRevealTickets = ({ route }) => {
    const theme = useContext(ThemeContext);
    const { userToken } = useContext(AuthContext)
    const navigation = useNavigation();
    const { cartId } = route.params
    const [totalData, setTotalData] = useState({});
    const [revealTicketsDataFetching, setRevealTicketsDataFetching] = useState(false);
    const [openedRaffles, setOpenedRaffles] = useState([])
    const dispatch = useDispatch();

    const userName = useSelector((state) => state.getAccountData.data[0]?.first_name);

    const fetchFromCartOnPayment = async () => {
        const result = await fetchFromCartOnPaymentWithLogin({ cart_id: Number(cartId) });
        if (result) {
            !isEmptyObject(result) && setTotalData(result)
        }
    };


    useEffect(() => {
        fetchFromCartOnPayment()
        const cartCountApiToggle = { active: true };
        dispatch(cartCountApiCallActive(cartCountApiToggle));
        dispatch(_fetchCartCountWithLogin());
        dispatch(getStoreBalance());
        dispatch(getCreditBalance());
        dispatch(getClaimPrizeCount());
        dispatch(getActiveRafflesCount({ "page": 1 }));
    }, []);

    useEffect(() => {
        const update = () => {
            const timeout = setTimeout(() => {
                const cartCountApiToggle = { active: true };
                dispatch(cartCountApiCallActive(cartCountApiToggle));
                dispatch(_fetchCartCountWithLogin());
                dispatch(getStoreBalance());
                dispatch(getCreditBalance());
                dispatch(getClaimPrizeCount());
                dispatch(getActiveRafflesCount({ "page": 1 }));
                fetchFromCartOnPayment();
            }, 1000);

            return () => clearTimeout(timeout);
        };
        update();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert(common.paymentSuccess.SorryYouCantGoBack)
                return true
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    const handleRevealTickets = async (updatedCartItemDetails, raffleImage, title, drawTime, raffleId, raffleCode) => {
        setRevealTicketsDataFetching(true);
        let response = await fetchMyPrizeClaimsWithLogin();

        if (response) {
            let winningTicketsArray;
            let highestWinningObject;

            if (response.message === "No Prize To Claim") {
                winningTicketsArray = [];
                highestWinningObject = {}
            } else {
                winningTicketsArray = response.winningTickets.map((ele) => {
                    let matchedTicket;
                    updatedCartItemDetails.forEach((ele2) => {
                        if (ele.raffle_id === ele2.raffle_id && ele.TicketNo === ele2.ticket_no) {
                            matchedTicket = ele;
                        }
                    });
                    return matchedTicket;
                }).filter(ticket => ticket !== undefined);

                const prizeItems = winningTicketsArray.filter(ele =>
                    common.prizeClaim.specialCategories.includes(ele.category[0].CategoryDisplayName.toLowerCase())
                );

                const cashItems = winningTicketsArray.filter(ele =>
                    ele.category[0].CategoryDisplayName === common.prizeClaim.Cash
                );

                const creditItems = winningTicketsArray.filter(ele =>
                    ele.category[0].CategoryDisplayName === common.prizeClaim.RaffoluxTickets
                );

                const getHighestCashItem = (items) => {
                    return items.reduce((maxItem, currentItem) => {
                        console.log(Number(currentItem.price.cash))
                        return (Number(currentItem.price.cash) > (Number(maxItem?.price.cash) || 0)) ? currentItem : maxItem;
                    }, null);
                };

                if (prizeItems.length > 0) {
                    highestWinningObject = getHighestCashItem(prizeItems);
                } else if (cashItems.length > 0) {
                    highestWinningObject = getHighestCashItem(cashItems);
                } else if (creditItems.length > 0) {
                    highestWinningObject = getHighestCashItem(creditItems);
                }
            };

            setOpenedRaffles(prevOpenedRaffles => {
                const newOpenedRaffles = !prevOpenedRaffles.includes(raffleId) ? [...prevOpenedRaffles, raffleId] : prevOpenedRaffles;
                let filteredInstantRaffles = totalData?.raffleList?.filter(obj => obj.RaffleType === 'Instant');

                navigation.navigate("InstantAnimation", {
                    winningTicketDetails: winningTicketsArray,
                    cartItems: updatedCartItemDetails,
                    raffleImage: raffleImage,
                    title: title,
                    drawTime: drawTime,
                    raffleId: raffleId,
                    jwtToken: userToken,
                    cartId: cartId,
                    raffleCode: raffleCode,
                    isAllRafflesOpen: filteredInstantRaffles.length === newOpenedRaffles.length,
                    highestWinningObject: highestWinningObject
                });

                setRevealTicketsDataFetching(false);
                return newOpenedRaffles;
            });

        } else {
            setRevealTicketsDataFetching(false);
        }
    };


    const RaffleCard = React.memo(({ image, title, cartItemDetails, drawTime, raffleType, raffleId, raffleCode }) => {

        let updatedCartItemDetails = cartItemDetails.filter((ele, i) => ele.raffle_id == raffleId);

        return (
            <View style={styles.raffleCardContainer}>
                <Image source={{ uri: `${Url.ImageUrl}${image}` }} style={styles.raffleImage} />
                <Text style={styles.gilroyExtraBoldText(2)}>{title}</Text>
                <View style={styles.raffleEntriesMainContainer}>
                    <View style={styles.raffleEntriesContainer}>
                        <FontAwesome name={'ticket'} size={responsiveWidth(4)} color={theme.color} />
                        <Text style={styles.gilroyExtraBoldText(1.5)}>{updatedCartItemDetails.length} {updatedCartItemDetails.length > 1 ? 'entries' : 'entry'}</Text>
                    </View>
                    <View style={styles.raffleEntriesContainer}>
                        <MaterialCommunityIcons name={'calendar-blank'} size={responsiveWidth(4)} color={theme.color} />
                        <Text style={styles.gilroyExtraBoldText(1.5)}>Jackpot Draw: {timeFormatter(drawTime, 'paymentSuccess')}</Text>
                    </View>
                </View>
                <View style={styles.horizontalLine}></View>
                <View style={styles.prizeMainContainer} >
                    {
                        updatedCartItemDetails?.map((ele, i) =>
                            raffleType == 'Instant' ?
                                <Image source={require('../assets/Images/prizeImageWithBackgroundDark.png')} style={styles.prizeImage} key={i} />
                                :
                                <View style={styles.nonInstantTicketContainer} key={i}>
                                    <Text style={styles.nonInstantTicket}>{ele.ticket_no}</Text>
                                </View>
                        )
                    }
                </View>
                <View style={styles.buttonContainer}>
                    {
                        raffleType == 'Instant' && <ClaimLinearGradientButton disabled={revealTicketsDataFetching} title={`REVEAL TICKET${updatedCartItemDetails.length > 1 ? 'S' : ''}`} handleOnPress={() => handleRevealTickets(updatedCartItemDetails, image, title, timeFormatter(drawTime, 'paymentSuccess'), raffleId, raffleCode)} />
                    }
                </View>
            </View>
        )
    });

    const handleContinue = () => {
        navigation.navigate("Home", { fromNavBar: true })
    };


    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        scrollViewContainer: {
            flexGrow: 1
        },
        container: {
            flex: 1,
            paddingHorizontal: responsiveWidth(3),
            paddingBottom: responsiveHeight(25)
        },
        headerContainer: {
            flexDirection: 'row',
            gap: responsiveWidth(3),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(4),
        },
        paymentSuccessImage: {
            height: responsiveHeight(3),
            width: responsiveWidth(6),
            resizeMode: 'contain'
        },
        purchaseSuccessfulText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3)
        },
        thankYouText: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            opacity: 0.8,
            textAlign: 'center',
            marginTop: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(3)
        },
        revealWhetherContainer: {
            height: responsiveHeight(7),
            backgroundColor: theme.theme == 'dark' ? '#070B1A' : null,
            borderWidth: 1,
            borderColor: theme.theme == 'dark' ? 'rgba(255, 255, 255, 0.20)' : null,
            borderRadius: 12,
            justifyContent: 'center',
            marginTop: responsiveHeight(3)
        },
        revealWhetherText: {
            color: theme.theme == "dark" ? '#FFBD0A' : "#000616",
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            marginHorizontal: responsiveWidth(9),
            lineHeight: scale(18)
        },
        activityIndicatorLoaderContainer: {
            height: responsiveHeight(30),
            alignItems: 'center',
            justifyContent: "center"
        },
        raffleCardsContainer: {
            marginTop: responsiveHeight(2),
            gap: responsiveHeight(2)
        },
        raffleCardContainer: {
            backgroundColor: theme.theme == 'dark' ? '#070B1A' : null,
            borderWidth: 1,
            borderColor: theme.theme == 'dark' ? 'rgba(255, 255, 255, 0.20)' : null,
            borderRadius: 12,
            paddingHorizontal: 20
        },
        raffleImage: {
            height: responsiveHeight(31),
            width: '100%',
            resizeMode: 'contain',
            borderRadius: 6,
            marginBottom: responsiveHeight(1.8),
            marginTop: responsiveHeight(2.2)
        },
        gilroyExtraBoldText(textSize) {
            return {
                color: theme.color,
                fontFamily: 'Gilroy-ExtraBold',
                fontSize: responsiveFontSize(textSize),
            }
        },
        raffleEntriesMainContainer: {
            flexDirection: 'row',
            marginTop: responsiveHeight(1),
            justifyContent: 'space-between'
        },
        raffleEntriesContainer: {
            height: responsiveHeight(4.3),
            backgroundColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingRight: responsiveWidth(3),
            paddingLeft: responsiveWidth(2),
            borderRadius: 6
        },
        horizontalLine: {
            height: 1,
            backgroundColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
            marginTop: responsiveHeight(2.3)
        },
        prizeMainContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: responsiveHeight(1.5),
            gap: 8,
            justifyContent: 'center'
        },
        nonInstantTicketContainer: {
            height: responsiveHeight(2.6),
            width: responsiveWidth(11),
            backgroundColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.4)',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
        },
        nonInstantTicket: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5)
        },
        prizeImage: {
            height: responsiveHeight(2.6),
            width: responsiveWidth(11),
        },
        buttonContainer: {
            marginBottom: responsiveHeight(3.7)
        },
        continueButtonContainer: {
            marginTop: responsiveHeight(2.5)
        }
    })



    return (
        <View style={styles.mainContainer} >
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Image source={paymentSuccess} style={styles.paymentSuccessImage} />
                        <Text style={styles.purchaseSuccessfulText}>Purchase Successful</Text>
                    </View>
                    <Text style={styles.thankYouText}>Thank you {userName}, your purchase was successful! Your tickets are below and you will receive an email confirmation shortly.</Text>
                    {
                        !isEmptyObject(totalData) && totalData?.raffleList?.some(obj => obj.RaffleType === 'Instant') &&
                        <View style={styles.revealWhetherContainer}>
                            <Text style={styles.revealWhetherText} >Reveal whether your Instant Win tickets are winners!</Text>
                        </View>
                    }
                    {
                        isEmptyObject(totalData) ? <View style={styles.activityIndicatorLoaderContainer}><ActivityIndicatorLoader theme={theme} /></View> :
                            <>
                                <View style={styles.raffleCardsContainer}>
                                    {
                                        totalData?.raffleList?.map((ele, i) => (
                                            <RaffleCard key={i} image={ele.MainImageUrl} title={ele.Title} cartItemDetails={totalData.cartItemDetails} raffleId={ele.id} raffleCode={ele.RaffleCode} drawTime={ele.drawing_in} raffleType={ele.RaffleType} />
                                        ))
                                    }
                                </View>
                                <Text style={styles.thankYouText}>You will shortly receive an email confirming your tickets!</Text>
                                <View style={styles.continueButtonContainer}>
                                    <LinearGradientButton title={'Continue'} onPress={handleContinue} />
                                </View>
                            </>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default PaymentSuccessfulRevealTickets
