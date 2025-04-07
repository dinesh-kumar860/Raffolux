import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Modal, ImageBackground, Linking } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import LinearGradient from 'react-native-linear-gradient'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-simple-toast';

import * as Common from '../helpers/common'
import { Url } from '../helpers/routesApi'

import { cartWithoutLoginCount } from '../ReduxToolKit/WithoutLoginCartSlice'

import ThemeContext from '../utils/themes/themeWrapper'
import RatingTrustPilotRow from '../utils/RatingTrustPilotRow'
import StarRatingsRow from '../utils/5StarRatingsRow'
import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import prizeClaimBottomCurve from '../assets/Images/prizeClaimBottomCurve.png';
import prizeClaimBottomCurveDark from '../assets/Images/prizeClaimBottomCurveDark.png';
import bottomDarkCurve from '../assets/Images/RectangleCurve.png';
import bottomLightCurve from '../assets/Images/RectangleCurveWhite.png';

import GuestCheckOutSignInModal from './CartComponents/GuestCheckOutSignInModal'



const WithoutLoginCart = () => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const [cartData, setCartData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);


    const CartCard = ({ id, image, title, totalEntriesCost, numberOftickets, entryCost }) => {
        return (
            <View style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: `${Url.ImageUrl}${image}` }} style={styles.image} />
                </View>
                <View style={styles.contentMainContainer}>
                    <View style={styles.contentContainer}>
                        <View>
                            <Text style={styles.title} >{title}</Text>
                            <Text style={styles.cost}>{Common.common.poundSymbol}{entryCost} {Common.WithoutLoginCart.perEntry}</Text>
                        </View>
                        <View style={styles.plusMinusMainContainer}>
                            <TouchableOpacity style={styles.plusMinusContainer} onPress={() => handleCartCard(id, entryCost, Common.WithoutLoginCart.decrement)}>
                                <Feather name={Common.WithoutLoginCart.minus} color={theme.color} />
                            </TouchableOpacity>
                            <Text style={styles.count}>{numberOftickets}</Text>
                            <TouchableOpacity style={styles.plusMinusContainer} onPress={() => handleCartCard(id, entryCost, Common.WithoutLoginCart.increment)}>
                                <Feather name={Common.WithoutLoginCart.plus} color={theme.color} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.totalContainer}>
                        <Ionicons name={Common.WithoutLoginCart.close} size={20} style={styles.closeIcon} color={theme.color} onPress={() => handleCartCard(id, entryCost, Common.WithoutLoginCart.delete)} />
                        <Text style={styles.totalAmount}>{Common.common.poundSymbol}{Number(totalEntriesCost)?.toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        )
    }


    const handleCartCard = async (id, entryCost, type) => {
        let updatedCartData = [...cartData];
        let index = updatedCartData.findIndex((ele) => ele.id === id);

        if (index !== -1) {
            if (type == Common.WithoutLoginCart.increment) {
                if (updatedCartData[index].is_unlimited_raffle == true) {
                    updatedCartData[index].numberOftickets = updatedCartData[index].numberOftickets + 1
                    updatedCartData[index].totalEntriesCost = updatedCartData[index].numberOftickets * entryCost;
                } else if (updatedCartData[index].is_unlimited_raffle == false && updatedCartData[index].is_unlimited_entries == true) {
                    if (updatedCartData[index].numberOftickets >= updatedCartData[index].ticketsLeft) {
                        Toast.show(Common.common.TicketLimitExceeded, Toast.SHORT)
                    } else {
                        updatedCartData[index].numberOftickets = updatedCartData[index].numberOftickets + 1
                        updatedCartData[index].totalEntriesCost = updatedCartData[index].numberOftickets * entryCost;
                    }
                } else {
                    if (updatedCartData[index].numberOftickets >= updatedCartData[index].total_entries_per_player || updatedCartData[index].numberOftickets >= updatedCartData[index].ticketsLeft) {
                        Toast.show(Common.common.TicketLimitExceeded, Toast.SHORT)
                    } else {
                        updatedCartData[index].numberOftickets = updatedCartData[index].numberOftickets + 1
                        updatedCartData[index].totalEntriesCost = updatedCartData[index].numberOftickets * entryCost;
                    }
                }

            } else if (type == Common.WithoutLoginCart.decrement) {
                updatedCartData[index].numberOftickets = updatedCartData[index].numberOftickets > 1 ? updatedCartData[index].numberOftickets - 1 : updatedCartData[index].numberOftickets;
                updatedCartData[index].totalEntriesCost = updatedCartData[index].numberOftickets * entryCost;
            } else {
                updatedCartData.splice(index, 1);
            }
            setCartData(updatedCartData);

            await RaffoluxAsyncStorage.setItem(Common.common.WithoutLoginCartData, updatedCartData);
            type == 'delete' && dispatch(cartWithoutLoginCount(updatedCartData.length))
        }
    }


    useEffect(() => {
        const fecthCartData = async () => {
            const getData = await RaffoluxAsyncStorage.getItem(Common.common.WithoutLoginCartData)
            getData ? setCartData(getData) : setCartData([])
        }
        fecthCartData()
    }, []);

    const handleDeepLink = async (event) => {
        InAppBrowser.close()
        setModalVisible(false)
        if (event?.url?.includes("response=paymentSuccessWithoutLoginCartId=")) {
            let cartId = event?.url?.split('response=paymentSuccessWithoutLoginCartId=')
            const cartData = await RaffoluxAsyncStorage.getItem(Common.common.cartIdDetails);
            if (cartData) {
                if (cartId[1] == cartData.cartId) {
                    await RaffoluxAsyncStorage.removeItem(Common.common.WithoutLoginCartData)
                    dispatch(cartWithoutLoginCount(0))
                    // navigation.navigate(Common.common.PaymentSuccessWithoutLogin, { cartId: cartId[1], cartUserId: cartData.userId, userName: cartData.name, totalAmount: cartData.totalAmount, raffleUpdatesOpt: cartData.raffleUpdatesOpt })
                    navigation.navigate("PaymentSuccessfulRevealTicketsWithoutLogin", { cartId: cartId[1], cartUserId: cartData.userId, userName: cartData.name, totalAmount: cartData.totalAmount, raffleUpdatesOpt: cartData.raffleUpdatesOpt })
                }
            }
        } else if (event?.url?.includes('modalCloseWithoutLogin')) {
            setModalVisible(false)
            console.log('modalCloseWithoutLogin')
        } else if (event?.url?.includes('response=paymentFailurewithoutLogin')) {
            navigation.navigate("PaymentFailureWithoutLogin")
        } else if (event?.url?.includes("paymentPendingwithoutLogin")) {
            navigation.navigate("PaymentPendingWithoutLogin")
        }
    }

    useEffect(() => {
        Linking.addEventListener(Common.common.url, handleDeepLink);
        return () => {
            // Linking.removeEventListener('url', handleDeepLink);
        };
    }, []);


    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        container: {
            flexGrow: 1,
            backgroundColor: theme.background
        },
        headerContainer: {
            height: responsiveHeight(6.1),
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: responsiveHeight(3)
        },
        headerTextContainer: {
            flex: 1,
            alignItems: 'center'
        },
        headerText: {
            fontFamily: 'Gilroy-ExtraBold',
            color: theme.color,
            fontSize: responsiveFontSize(2.1),
        },
        emptyCartContainer: {
            backgroundColor: theme.theme == 'dark' ? '#070B1A' : '#FFF',
            height: responsiveHeight(32),
            marginTop: responsiveHeight(10),
            borderWidth: scale(1),
            borderColor: 'rgba(151, 151, 151, 0.15)',
            marginHorizontal: responsiveHeight(1.2),
            borderRadius: 12,
            alignItems: 'center',
            elevation: scale(4),
            shadowColor: '#000616',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4
        },
        subText1: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2.2),
            color: theme.color,
            marginTop: responsiveHeight(6),
            textAlign: 'center'
        },
        subText2: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            fontSize: responsiveFontSize(2),
            marginTop: responsiveHeight(2),
            textAlign: 'center',
            marginHorizontal: responsiveWidth(8)
        },
        buttonContainer: {
            height: responsiveHeight(6.1),
            alignItems: 'center',
            justifyContent: 'center',
            width: responsiveWidth(59),
            borderRadius: 4,
            marginTop: responsiveHeight(3)
        },
        buttonText: {
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000000',
            fontSize: responsiveFontSize(2.1)
        },
        cartMainContainer: {
            marginTop: responsiveHeight(2),
            paddingHorizontal: responsiveHeight(1.8)
        },
        ratingsBanner: {
            backgroundColor: '#000030',
            flexDirection: 'row',
            justifyContent: 'center',
            height: responsiveHeight(5),
            alignSelf: 'center',
            paddingHorizontal: scale(15),
            borderRadius: 45,
        },
        trustPilotContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        starRatingsContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        excellentText: {
            color: '#FFFFFF',
            fontSize: responsiveFontSize(1.5),
            fontWeight: 600
        },
        cartContainer: {
            marginTop: responsiveHeight(2)
        },
        raffleCountText: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            fontSize: responsiveFontSize(2),
            marginBottom: responsiveHeight(1.5)
        },
        cartCardsContainer: {
            gap: responsiveHeight(2)
        },
        cardContainer: {
            backgroundColor: theme.theme == 'dark' ? '#070B1A' : '#FFF',
            borderWidth: scale(1),
            borderColor: 'rgba(151, 151, 151, 0.15)',
            borderRadius: 12,
            flexDirection: 'row',
            gap: scale(11),
            paddingVertical: scale(15),
            paddingHorizontal: scale(11),
            elevation: scale(4),
            shadowColor: '#000616',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4
        },
        imageContainer: {
            height: responsiveHeight(12),
            width: responsiveWidth(21),
        },
        image: {
            height: responsiveHeight(9.4),
            width: responsiveWidth(18.8),
            resizeMode: 'cover',
            borderRadius: 4
        },
        title: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            fontSize: responsiveFontSize(1.8)
        },
        cost: {
            fontFamily: 'NunitoSans-Regular',
            color: theme.color,
            fontSize: responsiveFontSize(1.5),
            opacity: 0.8,
            marginTop: scale(5)
        },
        plusMinusMainContainer: {
            flexDirection: 'row',
            gap: scale(14),
            marginTop: responsiveHeight(3),
            alignItems: 'center'
        },
        plusMinusContainer: {
            height: 24,
            width: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            borderWidth: 1.24,
            borderColor: theme.theme == 'dark' ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.20)',
            backgroundColor: theme.theme == 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        },
        count: {
            fontFamily: 'NunitoSans-Bold',
            color: theme.color,
            fontSize: responsiveFontSize(2),
            opacity: 0.8
        },
        contentMainContainer: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between'
        },
        contentContainer: {
            flex: 1,
            justifyContent: 'space-between'
        },
        totalContainer: {
            justifyContent: 'space-between'
        },
        closeIcon: {
            alignSelf: 'flex-end',
            top: -4
        },
        totalAmount: {
            fontFamily: 'NunitoSans-Bold',
            color: theme.color,
            fontSize: responsiveFontSize(2),
            left: -8,
        },
        orderSummaryContainer: {
            marginTop: responsiveHeight(4),
            paddingHorizontal: scale(18),
            marginBottom: responsiveHeight(30)
        },
        orderSummary: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            fontSize: responsiveFontSize(2),
            opacity: 0.9
        },
        amountSummaryContainer: {
            marginTop: scale(12),
            gap: scale(15)
        },
        amountSummary: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        totalSubTotalText: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            fontSize: responsiveFontSize(1.8),
            opacity: 0.7
        },
        totalSubTotalTextOpacity: {
            opacity: 0.9
        },
        bottomContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: 'center',
            elevation: scale(4),
            bottom: responsiveHeight(-13),
        },
        bottomContainerImage: {
            height: responsiveHeight(26),
            width: '100%',
            resizeMode: 'contain',
            elevation: scale(4),
        },
        cliamPrizeButtonContainer: {
            height: responsiveHeight(6.2),
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'space-between',
            marginHorizontal: scale(16),
            paddingHorizontal: scale(19),
            borderRadius: scale(4),
            marginTop: responsiveHeight(5)
        },
        claimPrizeText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            lineHeight: 24,
            color: '#1C1C27',
        },
        modalBackgroundOpacity: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            paddingHorizontal: scale(12)
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
        }
    })


    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Ionicons name={Common.WithoutLoginCart.arrowBack} color={theme.color} size={20} onPress={() => navigation.goBack()} />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>{Common.cart.Cart}</Text>
                    </View>
                </View>
                {
                    cartData.length !== 0 &&
                    <View style={styles.ratingsBanner}>
                        <View style={styles.trustPilotContainer}>
                            <RatingTrustPilotRow />
                        </View>
                        <View style={styles.starRatingsContainer}>
                            <StarRatingsRow />
                            <Text style={styles.excellentText}>  {Common.cart.RatedExcellent}</Text>
                        </View>
                    </View>
                }

                {
                    cartData.length == 0 ?
                        <View style={styles.emptyCartContainer}>
                            <Text style={styles.subText1}>{Common.WithoutLoginCart.YourCartIsEmpty}</Text>
                            <Text style={styles.subText2}>{Common.WithoutLoginCart.HaveALookAtWhatOn}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate(Common.common.Home)} >
                                <LinearGradient colors={Common.common.linearGradientColors} style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>{Common.WithoutLoginCart.ToTheRaffles}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        :
                        <>
                            <View style={styles.cartMainContainer}>
                                <View style={styles.cartContainer}>
                                    <Text style={styles.raffleCountText}>{cartData.length} {Common.WithoutLoginCart.raffle}{cartData.length > 1 ? `s` : ``}</Text>
                                    <View style={styles.cartCardsContainer}>
                                        {
                                            cartData?.map((ele, i) => (
                                                <CartCard key={i} id={ele.id} image={ele.MiniImageUrl} title={ele.Title} totalEntriesCost={ele.totalEntriesCost} numberOftickets={ele.numberOftickets} entryCost={ele.entry_cost_gbp} />
                                            ))
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={styles.orderSummaryContainer}>
                                <Text style={styles.orderSummary}>{Common.WithoutLoginCart.OrderSummary}</Text>
                                <View style={styles.amountSummaryContainer}>
                                    <View style={styles.amountSummary}>
                                        <Text style={styles.totalSubTotalText}>{Common.WithoutLoginCart.Subtotal}</Text>
                                        <Text style={styles.totalSubTotalText}>{Common.common.poundSymbol}{Number(cartData.reduce((accumulator, currentValue) => accumulator + currentValue.totalEntriesCost, 0)).toFixed(2)}</Text>
                                    </View>
                                    <View style={styles.amountSummary}>
                                        <Text style={[styles.totalSubTotalText, styles.totalSubTotalTextOpacity]}>{Common.WithoutLoginCart.TOTAL}</Text>
                                        <Text style={[styles.totalSubTotalText, styles.totalSubTotalTextOpacity]}>{Common.common.poundSymbol}{Number(cartData.reduce((accumulator, currentValue) => accumulator + currentValue.totalEntriesCost, 0)).toFixed(2)}</Text>
                                    </View>
                                </View>
                            </View>
                        </>
                }
                <Modal animationType={Common.common.slide} transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.modalBackgroundOpacity}>
                        <View style={styles.modalContainer}>
                            <GuestCheckOutSignInModal theme={theme} modalVisible={modalVisible} setModalVisible={setModalVisible} totalAmount={Number(cartData.reduce((accumulator, currentValue) => accumulator + currentValue.totalEntriesCost, 0)).toFixed(2)} cartData={cartData} />
                        </View>
                    </ScrollView>
                </Modal>
            </ScrollView>
            {
                cartData.length !== 0 &&
                <View style={styles.bottomContainer}>
                    <ImageBackground style={styles.bottomContainerImage} source={theme.theme === Common.common.dark ? bottomLightCurve : bottomDarkCurve} >
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} disabled={cartData.length == 0}>
                            <LinearGradient colors={Common.common.linearGradientColors} style={styles.cliamPrizeButtonContainer}>
                                <Text style={styles.claimPrizeText}>{Common.WithoutLoginCart.Checkout}</Text>
                                <Text style={styles.claimPrizeText}>{Common.common.poundSymbol}{Number(cartData.reduce((accumulator, currentValue) => accumulator + currentValue.totalEntriesCost, 0)).toFixed(2)}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            }
        </View>
    )
}

export default WithoutLoginCart
