import { StyleSheet, Text, View, ScrollView, Pressable, ImageBackground, TouchableOpacity, BackHandler, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import { fetchFromCartOnPaymentWithLogin } from '../api/PaymentSuccessApi';
import { _fetchCartCountWithLogin, getActiveRafflesCount, getClaimPrizeCount, getCreditBalance, getStoreBalance } from '../ReduxToolKit/apiSlice';
import { cartCountApiCallActive } from '../ReduxToolKit/cartSlice';
import { isEmptyArray, isEmptyObject } from '../utils/utils';

import TicketsDetails from './PaymentSuccessComponents/TicketsDetails';
import ThemeContext from '../utils/themes/themeWrapper';
import * as common from '../helpers/common'
import ActivityIndicatorLoader from '../helpers/ActivityIndicatorLoader';

import prizeClaimBottomCurve from '../assets/Images/prizeClaimBottomCurve.png'
import prizeClaimBottomCurveDark from '../assets/Images/prizeClaimBottomCurveDark.png'

const PaymentSuccess = ({ route }) => {
    const { cartId } = route.params;
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [totalData, setTotalData] = useState({});
    const gradientColors = ['#FFD70D', '#FFAE05'];
    const name = useSelector((state) => state.getAccountData.data[0]?.first_name);

    const fetchFromCartOnPayment = async () => {
        const result = await fetchFromCartOnPaymentWithLogin({ cart_id: Number(cartId) });
        if (result) {
            !isEmptyObject(result) && setTotalData(result)
        }
    };

    useEffect(() => {
        const cartCountApiToggle = { active: true };
        dispatch(cartCountApiCallActive(cartCountApiToggle));
        dispatch(_fetchCartCountWithLogin());
        fetchFromCartOnPayment();
        dispatch(getStoreBalance());
        dispatch(getCreditBalance());
        dispatch(getClaimPrizeCount());
        dispatch(getActiveRafflesCount({ "page": 1 }));
    }, [cartId]);

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
            }, 2000);

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

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        container: {
            flex: 1,
            paddingHorizontal: scale(15)
        },
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(10),
            justifyContent: 'center',
            marginTop: scale(30)
        },
        headerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            color: theme.color
        },
        description: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            textAlign: 'center',
            marginHorizontal: scale(25),
            marginTop: scale(20)
        },
        bottomContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: 'center',
            elevation: scale(4),
        },
        bottomContainerImage: {
            height: 152,
            width: '100%',
            resizeMode: 'contain',
        },
        buttonContainer: {
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(6),
            marginTop: scale(15),
            marginHorizontal: scale(20)
        },
        viewMyTicektsContainer: {
            borderWidth: scale(1),
            borderColor: 'rgba(255,255,255,0.15)'
        },
        title: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            color: '#000616'
        },
        horizontalLine: {
            height: scale(1),
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)',
            marginVertical: scale(20)
        },
    })

    return (
        <View style={styles.mainContainer}>
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <AntDesign name={'checkcircle'} color={theme.theme === 'dark' ? '#FFBD0A' : '#000616'} size={25} />
                        <Text style={styles.headerText}>{common.common.purchaseSuccessful}</Text>
                    </View>
                    <Text style={styles.description}>{common.common.thankYou} {name}, {common.PaymentSucess.purchaseWasSuccessful}</Text>
                    <Text style={styles.description}>{common.common.goodLuck}</Text>
                    <View style={{ marginBottom: scale(250) }}>
                        <View style={styles.horizontalLine}></View>
                        {
                            !isEmptyObject(totalData) ?
                                totalData?.raffleList?.map((ele, i) => (
                                    <TicketsDetails key={i} image={ele.MiniImageUrl} title={ele.Title} raffleId={ele.id} raffleCode={ele.RaffleCode} totalData={totalData} cartItemDetails={totalData.cartItemDetails} theme={theme} />
                                ))
                                :
                                <ActivityIndicatorLoader theme={theme} />
                        }
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <ImageBackground style={styles.bottomContainerImage} source={theme.theme === 'dark' ? prizeClaimBottomCurve : prizeClaimBottomCurveDark} >
                    <TouchableOpacity disabled={false} onPress={() => navigation.navigate('Home', { fromNavBar: true })} >
                        <LinearGradient colors={gradientColors} style={styles.buttonContainer}>
                            <Text style={styles.title}>{common.common.continue}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Pressable style={[styles.buttonContainer, styles.viewMyTicektsContainer]} onPress={() => navigation.navigate('MyRaffles')} >
                        <Text style={[styles.title, { color: '#FFF' }]}>{common.PaymentSucess.viewMyTickets}</Text>
                    </Pressable>
                </ImageBackground>
            </View>
        </View>
    )
}

export default PaymentSuccess

