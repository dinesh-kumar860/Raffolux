import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Pressable, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React, { memo, useContext, useEffect, useState } from 'react'
import ThemeContext from '../utils/themes/themeWrapper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ClaimLinearGradientButton from './ClaimSummaryComponents/ClaimLinearGradientButton';
import { Url } from '../helpers/routesApi';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Context/AuthContext';
import { API_URL } from '@env'
import axios from 'axios';
import { fetchFromCartOnPaymentWithLogin } from '../api/PaymentSuccessApi';
import { fetchGuestCartOnPayment } from '../api/guestCheckoutApi';
import ActivityIndicatorLoader from '../helpers/ActivityIndicatorLoader';
import { isEmptyArray } from '../utils/utils';
import WinnerBadge from '../assets/Images/WinnerBadge.png';


const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.5)

const InstantPrizeWin = (props) => {
    const theme = useContext(ThemeContext);
    const { userToken } = useContext(AuthContext)

    const { raffleImage, title, drawTime, isPrizesWon, jwtToken, cartId, cartUserId, raffleId, raffleCode, isAllRafflesOpen } = props;
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState([]);
    const [winningTicketDetails, setWinningTicketDetails] = useState([]);

    const fetchFromCartOnPayment = async () => {
        let result = userToken ? await fetchFromCartOnPaymentWithLogin({ cart_id: Number(cartId) }) : await fetchGuestCartOnPayment({ cart_id: Number(cartId), user_id: cartUserId });
        if (result) {
            let updatedCartItems = result.cartItemDetails.filter((ele, i) => ele.raffle_id == raffleId);
            setCartItems(updatedCartItems);
            fetchWinningDetails(updatedCartItems);
        }
    };


    const fetchWinningDetails = async (updatedCartItemDetails) => {
        axios.post(`${API_URL}fetchMyPrizeClaimsWithLogin`, {}, { "headers": { 'Authorization': jwtToken } })
            .then((resp) => {
                if (resp) {
                    const response = resp.data;
                    let winningTickets;
                    if (response.message == "No Prize To Claim") {
                        winningTickets = []
                    } else {
                        winningTickets = response.winningTickets.map((ele, i) => {
                            let matchedTicket = undefined;
                            updatedCartItemDetails.forEach((ele2, j) => {
                                if (ele.raffle_id === ele2.raffle_id && ele.TicketNo == ele2.ticket_no) {
                                    matchedTicket = ele;
                                }
                            });
                            return matchedTicket;
                        }).filter(ticket => ticket !== undefined);
                    }
                    setWinningTicketDetails(winningTickets)
                }
            })
            .catch(err => {
                console.log({ err })
            })
    };

    useEffect(() => {
        fetchFromCartOnPayment()
    }, [])


    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: theme.background,
            borderRadius: 12
        },
        scrollViewContainer: {
            flexGrow: 1
        },
        container: {
            flex: 1,
            paddingBottom: responsiveHeight(15),
        },
        instantWinPrizeContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(3)
        },
        nonInstantChancesNumberMargin: {
            marginTop: responsiveHeight(3)
        },
        chancesToWinTextAlign: {
            textAlign: 'center',
            marginHorizontal: 16,
            color: theme.color
        },
        gilroyExtraBoldText(fontSize, textOpacity) {
            return {
                color: theme.color,
                fontFamily: 'Gilroy-ExtraBold',
                fontSize: responsiveFontSize(fontSize),
                opacity: textOpacity ? textOpacity : 1
            }
        },
        YouveWonText: {
            marginTop: responsiveHeight(2)
        },
        instantWinCardContainer(type) {
            return {
                backgroundColor: theme.theme == "dark" ? "#141729" : "#FFFFFF",
                height: scale(215),
                width: ITEM_WIDTH,
                borderRadius: 12,
                marginTop: type == 'nonInstant' ? responsiveHeight(4) : responsiveHeight(5),
                alignItems: 'center',
                elevation: scale(4),
                shadowColor: '#000616',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4
            }
        },
        instantWinCardContainerElevation: {
            // shadowColor: "#FFBD0A",
            // shadowOffset: {
            //     width: 0,
            //     height: 12,
            // },
            // shadowOpacity: 0.58,
            // shadowRadius: 16.00,
            // elevation: scale(50),
        },
        instantWinImage: {
            height: responsiveHeight(11.5),
            width: responsiveWidth(43),
            resizeMode: 'cover',
            marginTop: responsiveHeight(4.5)
        },
        ticketNumberContainer: {
            height: responsiveHeight(2.8),
            backgroundColor: '#FFBD0A',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: responsiveWidth(4),
            borderRadius: 12,
            marginTop: responsiveHeight(1.3)
        },
        ticketNumber(textSize, ltrSpc) {
            return {
                color: '#000616',
                fontFamily: 'Gilroy-ExtraBold',
                fontSize: responsiveFontSize(textSize),
                letterSpacing: ltrSpc
            }
        },
        ticketTextAlign: {
            color: theme.color,
            textAlign: 'center',
            marginTop: responsiveHeight(1.5),
            marginHorizontal: 32,
        },
        winnerBadge: {
            resizeMode: "contain",
            position: 'absolute',
            width: responsiveWidth(32),
            height: responsiveHeight(4.5),
            top: 18,
            alignSelf: 'center',
        },
        instantWinClaimText: {
            color: theme.color,
            fontFamily: "NunitoSans-Regular",
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            marginHorizontal: responsiveWidth(13),
            marginTop: responsiveHeight(6)
        },
        nonInstantCardContainer: {
            backgroundColor: theme.theme == 'dark' ? '#141729' : theme.color,
            height: responsiveHeight(30.1),
            width: responsiveWidth(49.1),
            borderRadius: 12,
            marginTop: responsiveHeight(5),
            alignItems: 'center',
        },
        jackpotDrawDateContainer: {
            height: responsiveHeight(5),
            flexDirection: 'row',
            backgroundColor: theme.theme == 'dark' ? '#070B1A' : null,
            borderColor: theme.theme == 'dark' ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.20)',
            borderWidth: 1,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 13,
            marginTop: responsiveHeight(4),
            marginHorizontal: responsiveWidth(7)
        },
        jackpotPrizeImageContainer: {
            marginTop: responsiveHeight(2),
            marginHorizontal: responsiveWidth(6)
        },
        jackpotPrizeImage: {
            height: responsiveHeight(22.6),
            width: '100%',
            borderRadius: 6
        },
        orangeText: {
            color: '#FFBD0A',
        },
        youStillGotTextAlign: {
            marginTop: responsiveHeight(4),
            textAlign: 'center',
            marginHorizontal: responsiveWidth(10)
        },
        ticketNumbersMainContainer: {
            marginTop: responsiveHeight(1.6),
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(11),
            flexWrap: 'wrap',
            marginHorizontal: responsiveWidth(6),
            justifyContent:'center'
        },
        ticketImage: {
            height: scale(36),
            width: scale(85),
            resizeMode: 'contain',
            alignItems: 'center',
            justifyContent: 'center',
        },
        prizeImage: {
            height: scale(11),
            width: scale(11),
            resizeMode: 'contain'
        },
        buttonsContainer: {
            marginTop: responsiveHeight(5),
            gap: responsiveHeight(1),
            marginHorizontal: responsiveWidth(6.5),
        },
        playAgainButtonContainer: {
            height: responsiveHeight(6.2),
            backgroundColor: theme.theme == 'dark' ? '#141628' : null,
            borderColor: theme.theme == 'dark' ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.20)',
            borderWidth: 1,
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 11
        },
        activityIndicatorLoaderContainer: {
            height: responsiveHeight(20),
            justifyContent: 'center',
            alignItems: 'center',
        },

    });

    const WinningTicketCard = React.memo(({ item }) => {
        return (
            <View style={{marginBottom:scale(5)}} >
                <View style={[styles.instantWinCardContainer('instant'), styles.instantWinCardContainerElevation, { marginHorizontal: scale(8) }]}>
                    <FastImage source={{ uri: `${Url.ImageUrl}${item.img_url}` }} style={styles.instantWinImage} />
                    <View style={styles.ticketNumberContainer}>
                        <Text style={styles.ticketNumber(1.8, 1)}>{item.TicketNo}</Text>
                    </View>
                    <Text style={[styles.gilroyExtraBoldText(2), styles.ticketTextAlign]}>{item.name}</Text>
                </View>
                <Image source={WinnerBadge} style={styles.winnerBadge} />
            </View>
        )
    });

    const handleEnterRaffleAgain = () => {
        navigation.navigate('InstantContainer', { RaffleId: raffleCode, raffle_id: raffleId })
    }

    const handleContinue = () => {
        if (isAllRafflesOpen) {
            navigation.navigate('Home', { fromNavBar: true })
        } else {
            navigation.goBack()
        }
    }

    const baseOptions = {
        vertical: false,
        width: SLIDER_WIDTH * 0.9,
        height: SLIDER_WIDTH * 0.7,
    }

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} >
                <View style={styles.container}>
                    {
                        isPrizesWon ?
                            isEmptyArray(winningTicketDetails) ? <View style={styles.activityIndicatorLoaderContainer}><ActivityIndicatorLoader theme={theme} /></View> :
                                // <View style={styles.instantWinPrizeContainer}>
                                //     <Text style={styles.gilroyExtraBoldText(3)}>Congratulations</Text>
                                //     <Text style={[styles.gilroyExtraBoldText(2, 0.9), styles.YouveWonText]}>You’ve won {winningTicketDetails?.length} Instant Win Prize{winningTicketDetails?.length > 1 ? 's' : ''}</Text>

                                //     <Carousel
                                //         pagingEnabled
                                //         {...baseOptions}
                                //         loop
                                //         mode="parallax"
                                //         modeConfig={{
                                //             parallaxAdjacentItemScale: 0.8,
                                //             parallaxScrollingScale: 1,
                                //             parallaxScrollingOffset: 120,
                                //         }}
                                //         data={winningTicketDetails}

                                //         scrollAnimationDuration={500}
                                //         onSnapToItem={(index) => console.log('current index:', index)}
                                //         renderItem={({ item }) => (
                                //             <WinningTicketCard item={item} />
                                //         )}
                                //     />

                                //     <Text style={styles.instantWinClaimText}>Your Instant Win prize is now ready to be claimed in your My Tickets area </Text>
                                // </View>
                                <View style={styles.instantWinPrizeContainer}>
                                    <Text style={styles.gilroyExtraBoldText(3)}>Congratulations!</Text>
                                    <Text style={[styles.gilroyExtraBoldText(2, 0.9), styles.YouveWonText]}>You’ve won {winningTicketDetails?.length} Instant Win Prize{winningTicketDetails?.length > 1 ? 's' : ''}</Text>
                                    <FlatList
                                        style={{ marginLeft: scale(15) }}
                                        keyExtractor={(item, index) => `${index}${item.TicketNo}`}
                                        data={winningTicketDetails}
                                        renderItem={({ item, index }) =>
                                            <WinningTicketCard item={item} index={index} />
                                        }
                                        horizontal
                                        onEndReachedThreshold={0.1}
                                    />
                                    <Text style={styles.instantWinClaimText}>Your Instant Win prize{winningTicketDetails?.length > 1 ? "s" : ""} is now ready to be claimed in your My Tickets area </Text>
                                </View>

                            :
                            isEmptyArray(cartItems) ? <View style={styles.activityIndicatorLoaderContainer}><ActivityIndicatorLoader theme={theme} /></View>
                                :
                                <View style={styles.instantWinPrizeContainer}>
                                    <Text style={styles.gilroyExtraBoldText(3)}>No Instant Wins this time</Text>
                                    <Text style={[styles.gilroyExtraBoldText(2.2, 0.9), styles.YouveWonText]}>But you still have...</Text>
                                    <View style={styles.instantWinCardContainer('nonInstant')}>
                                        <Text style={[styles.ticketNumber(12.8, 4), styles.orangeText, styles.nonInstantChancesNumberMargin]}>{cartItems?.length}</Text>
                                        <Text style={[styles.gilroyExtraBoldText(2.2), styles.chancesToWinTextAlign]} >Chance{cartItems?.length > 1 ? 's' : ''} to Win the Jackpot Draw!</Text>
                                    </View>
                                </View>
                    }
                    <View style={styles.jackpotDrawDateContainer}>
                        <MaterialCommunityIcons name={'calendar-blank'} size={17} color={theme.color} />
                        <Text style={styles.gilroyExtraBoldText(2)}>Jackpot Draw: {drawTime}</Text>
                    </View>
                    <View style={styles.jackpotPrizeImageContainer}>
                        <Image source={{ uri: `${Url.ImageUrl}${raffleImage}` }} style={styles.jackpotPrizeImage} />
                    </View>
                    {
                        isEmptyArray(cartItems) ?
                            <View style={styles.activityIndicatorLoaderContainer}><ActivityIndicatorLoader theme={theme} /></View> :
                            <>
                                <Text style={[styles.gilroyExtraBoldText(2.1, 0.9), styles.youStillGotTextAlign]}>And you’ve still got <Text style={styles.orangeText}>{cartItems?.length} Chance{cartItems?.length > 1 ? 's' : ''}</Text> to win the {title}!</Text>
                                <View style={styles.ticketNumbersMainContainer} >
                                    {
                                        cartItems?.map((ele, i) => (
                                            <ImageBackground source={require('../assets/Images/myRafflesEndedWinningTicketImageDark.png')} style={[styles.ticketImage, { flexDirection: 'row', gap: 3 }]} key={i}>
                                                {!isEmptyArray(winningTicketDetails) && winningTicketDetails?.some(obj => obj.TicketNo == ele.ticket_no) && <Image source={require('../assets/Images/prizeClaimPrizeImage.png')} style={styles.prizeImage} />}
                                                <Text style={styles.ticketNumber(1.9, 0.833)}>{ele.ticket_no}</Text>
                                            </ImageBackground>
                                        ))
                                    }
                                </View>
                            </>
                    }
                    <View style={styles.buttonsContainer}>
                        <ClaimLinearGradientButton title={'CONTINUE'} handleOnPress={() => handleContinue()} />
                        <TouchableOpacity style={styles.playAgainButtonContainer} onPress={() => handleEnterRaffleAgain()}>
                            <Ionicons name={'reload'} size={17} color={theme.color} />
                            <Text style={styles.gilroyExtraBoldText(2.2, 0.8)}>PLAY RAFFLE AGAIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default memo(InstantPrizeWin)

