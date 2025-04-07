import { StyleSheet, Text, View, ScrollView, Image, BackHandler, Alert, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';

import ClaimLinearGradientButton from './ClaimSummaryComponents/ClaimLinearGradientButton';

import ThemeContext from '../utils/themes/themeWrapper';
import { isEmptyArray } from '../utils/utils';
import { timeFormatter } from '../utils/TimeFormatter';

import * as Common from '../helpers/common'
import { Url } from '../helpers/routesApi';

import WithoutLoginPaymentSuccess from '../assets/Images/WithoutLoginPaymentSuccess.png';

import { fetchGuestCartOnPayment } from '../api/guestCheckoutApi';

import { AuthContext } from '../Context/AuthContext';
import ActivityIndicatorLoader from '../helpers/ActivityIndicatorLoader';
import GuestCheckoutCreateAccountModal from './Authentication/GuestCheckoutCreateAccountModal';


const PaymentSucccessWithoutLogin = ({ route, navigation }) => {
    const theme = useContext(ThemeContext);
    const { setIsHomePageCreateAccountLoginModalVisible } = useContext(AuthContext)
    const { cartId, cartUserId, userName, totalAmount, raffleUpdatesOpt } = route.params;
    const [raffleData, setRaffleData] = useState([])
    const [cartItemDetails, setCartItemDetails] = useState([]);
    const [modalVisible, setModalVisible] = useState(false)

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        container: {
            flexGrow: 1,
            backgroundColor: theme.background
        },
        imageContainer: {
            height: responsiveHeight(7.2),
            width: responsiveWidth(15),
            marginTop: responsiveHeight(6),
            backgroundColor: 'rgba(255, 189, 10, 0.15)',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
        },
        image: {
            height: responsiveHeight(4),
            width: responsiveWidth(8.3),
            resizeMode: 'contain',
        },
        purchaseText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            opacity: 0.9,
            marginTop: responsiveHeight(2),
            textAlign: 'center'
        },
        subText: {
            fontFamily: 'NunitoSans-Regular',
            color: theme.color,
            fontSize: responsiveFontSize(2),
            marginTop: responsiveHeight(1),
            textAlign: 'center',
            marginHorizontal: responsiveWidth(12)
        },
        cardContainer: {
            backgroundColor: theme.theme === 'dark' ? '#070B1A' : '#FFF',
            borderWidth: scale(1),
            borderColor: theme.theme == 'dark' ? 'rgba(151, 151, 151, 0.15)' : 'rgba(255, 255, 255, 0.15)',
            borderRadius: 12,
            flexDirection: 'row',
            gap: responsiveWidth(3),
            paddingTop: responsiveHeight(2.5),
            elevation: scale(4),
            shadowColor: '#000616',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4
        },
        totalCardsContainer: {
            marginTop: responsiveHeight(4),
            marginHorizontal: responsiveWidth(3),
            gap: responsiveHeight(2)
        },
        cardImagecontainer: {
            height: responsiveHeight(9.2),
            width: responsiveWidth(21.5),
            marginLeft: 10
        },
        cardImage: {
            height: responsiveHeight(9.2),
            width: responsiveWidth(21.5),
            resizeMode: 'contain'
        },
        contentContainer: {
            flex: 1
        },
        title: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            fontSize: responsiveFontSize(1.8),
            opacity: 0.8
        },
        drawDate: {
            fontFamily: 'NunitoSans-Regular',
            color: theme.color,
            fontSize: responsiveFontSize(1.6),
            opacity: 0.8,
            marginTop: 3
        },
        totalTicketsContainer: {
            marginTop: responsiveHeight(2.2),
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4
        },
        ticketContainer: {
            backgroundColor: theme.theme === 'dark' ? '#D9D9D9' : 'rgba(151, 151, 151, 0.15)',
            borderRadius: 8
        },
        ticketNumber: {
            fontFamily: 'NunitoSans-SemiBold',
            color: '#000616',
            fontSize: responsiveFontSize(1.6),
            paddingVertical: 2,
            paddingHorizontal: 8
        },
        chancesContainer: {
            backgroundColor: '#FFBD0A',
            height: responsiveHeight(3.7),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 38,
            marginTop: responsiveHeight(4),
            marginBottom: responsiveHeight(3),
            left: responsiveWidth(-10)
        },
        chancesText: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            paddingHorizontal: 20,
        },
        confirmationText: {
            fontFamily: 'NunitoSans-Regular',
            color: theme.color,
            fontSize: responsiveFontSize(2),
            opacity: 0.8,
            textAlign: 'center',
            marginHorizontal: responsiveWidth(11),
            marginTop: responsiveHeight(3.5)
        },
        buttonContainer: {
            marginHorizontal: responsiveWidth(4.5),
            marginTop: responsiveHeight(4),
            marginBottom: responsiveHeight(8)
        },
        loaderContainer: {
            minHeight: responsiveHeight(15),
            alignItems: 'center',
            justifyContent: 'center'
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

    const fetchGuestCart = async () => {
        let dataObj = { cart_id: Number(cartId), user_id: cartUserId }
        const response = await fetchGuestCartOnPayment(dataObj)
        if (response) {
            setRaffleData(response.raffleList)
            setCartItemDetails(response.cartItemDetails)
        }
    }

    useEffect(() => {
        fetchGuestCart()
    }, []);

    useEffect(() => {
        const update = () => {
            const timeout = setTimeout(() => {
                fetchGuestCart()
            }, 2000);

            return () => clearTimeout(timeout);
        };
        update();
    }, []);

    const handleNavigation = () => {
        setIsHomePageCreateAccountLoginModalVisible(true)
        navigation.navigate('Home', { fromNavBar: true })
    };

    useEffect(() => {
        const checkAndShowModal = () => {
            const openModalAfterDelay = setTimeout(() => {
                setModalVisible(true);
            }, 2000);

            return () => clearTimeout(openModalAfterDelay);
        };
        checkAndShowModal();
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert(Common.paymentSuccess.SorryYouCantGoBack)
                return true
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );


    return (
        <>
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image source={WithoutLoginPaymentSuccess} style={styles.image} />
                        </View>
                        <Text style={styles.purchaseText}>{Common.WithoutPaymentSuccessful.PurchaseSuccessful}</Text>
                        <Text style={styles.subText}>{Common.WithoutPaymentSuccessful.Congratulations} {userName}, {Common.WithoutPaymentSuccessful.youNowOwnTheFollowingTickets} </Text>
                        <View style={styles.totalCardsContainer}>
                            {
                                !isEmptyArray(raffleData) ? raffleData.map((ele, i) => (
                                    <View style={styles.cardContainer} key={i}>
                                        <View style={styles.cardImagecontainer}>
                                            <Image source={{ uri: `${Url.ImageUrl}${ele.MiniImageUrl}`, }} style={styles.cardImage} />
                                        </View>
                                        <View style={styles.contentContainer}>
                                            <Text style={styles.title}>{ele.Title}</Text>
                                            <Text style={styles.drawDate}>Draw {timeFormatter(ele.drawing_in, 'PaymentSuccessWithoutLogin')}</Text>
                                            <View style={styles.totalTicketsContainer}>
                                                {
                                                    cartItemDetails?.map((ticket, index) => {
                                                        if (ele.id === ticket.raffle_id) {
                                                            return <View style={styles.ticketContainer} key={index}>
                                                                <Text style={styles.ticketNumber}>{ticket.ticket_no}</Text>
                                                            </View>
                                                        }
                                                    })
                                                }
                                            </View>
                                            <View style={styles.chancesContainer}>
                                                <Text style={styles.chancesText}>{Common.WithoutPaymentSuccessful.Thats} {cartItemDetails.filter(ticket => ele.id === ticket.raffle_id).length} {cartItemDetails.filter(ticket => ele.id === ticket.raffle_id).length > 1 ? Common.WithoutPaymentSuccessful.chancesToWin : `chance to win`}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))
                                    :
                                    <View style={styles.loaderContainer}><ActivityIndicatorLoader theme={theme} /></View>
                            }
                        </View>
                        <Text style={styles.confirmationText}>{Common.WithoutPaymentSuccessful.YouWillShortlyReceiveAnEmailConfirmingYourTickets}</Text>
                        <View style={styles.buttonContainer}>
                            <ClaimLinearGradientButton title={Common.WithoutPaymentSuccessful.Continue} handleOnPress={() => handleNavigation()} />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(false) }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.modalBackgroundOpacity} >
                    <View style={styles.modalContainer} >
                        <GuestCheckoutCreateAccountModal theme={theme} setModalVisible={setModalVisible} modalVisible={modalVisible} raffleUpdatesOpt={raffleUpdatesOpt} />
                    </View>
                </ScrollView>
            </Modal>
        </>


    )
}

export default PaymentSucccessWithoutLogin

