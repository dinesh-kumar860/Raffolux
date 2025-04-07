import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { scale } from 'react-native-size-matters';
import { responsiveWidth, responsiveFontSize, responsiveScreenWidth, responsiveHeight } from "react-native-responsive-dimensions";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

import logo from '../assets/Images/logo.png'
import cartIcon from '../assets/Images/NavBArCartSymbol.png';
import ReferralPageRaffoluxSymbol from '../assets/Images/ReferralPageRaffoluxSymbol.png';
import OpenMenu from '../assets/Images/OpenMenu.png';

import DrawerContent from "./DrawerContent";

import { isNullOrEmpty } from "../utils/utils";
import { useInternet } from "../utils/InternetConnection/InternetContextWrapper";
import { RaffoluxAsyncStorage } from "../utils/RaffoluxAsyncStorage";

import { _fetchCartCountWithLogin, fetchAccount, fetchMyPrizeCashClaims, getActiveRafflesCount, getClaimPrizeCount, getCreditBalance, getStoreBalance } from "../ReduxToolKit/apiSlice";
import { cartWithoutLoginCount } from "../ReduxToolKit/WithoutLoginCartSlice";

import StackRoutes from "../helpers/StackRoutes";

import { AuthContext } from "../Context/AuthContext";

import { addToCartWithLogin } from "../api/commonApi";




const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator = () => (
    <Stack.Navigator initialRouteName="Home"  >
        {
            StackRoutes?.map((ele, i) =>
            (
                <Stack.Screen key={i} name={ele.name} component={ele.component} options={{
                    title: "", headerBackVisible: false, headerShown: false, presentation: 'transparentModal',
                    gestureEnabled: ele.name === "PointConfirmation" && false || ele.name === "PrizeConfirmationNew" && false || ele.name === "PaymentSuccess" && false || ele.name === "PaymentSuccessWithoutLogin" && false ||ele.name === "PaymentSuccessfulRevealTickets" && false || ele.name === "PaymentSuccessfulRevealTicketsWithoutLogin" && false || ele.name === "PrizeClaimTrueLayerError" && false || ele.name === "SignUpVerificationScreen" && false || ele.name === "SignUpVerificationSuccessPage" && false || ele.name === "SignUpBonus" && false
                }} />
            ))
        }
    </Stack.Navigator>
);


const DrawerNavigation = ({ userToken }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { isConnected } = useInternet();
    const { isNavVisible } = useContext(AuthContext);

    const storeBalance = useSelector((state) => state.getAccountData.storeBalance);
    const cartCount = useSelector((state) => state.getAccountData.cartCount);
    const withoutLoginCart = useSelector((state) => state.withoutLoginCartCount);


    const handleNavigation = (route) => navigation.navigate(route);

    const navigateToHome = () => {
        navigation.navigate('Home', { fromNavBar: true });

        if (userToken) {
            dispatch(getClaimPrizeCount())
            dispatch(getStoreBalance())
            dispatch(getActiveRafflesCount({ "page": 1 }));
            dispatch(_fetchCartCountWithLogin());
            dispatch(fetchMyPrizeCashClaims());
        }
    };


    useEffect(() => {
        Linking.addEventListener('url', (event) => {
            if (event?.url?.includes("rafflePage")) {
                let page = event?.url.split("rafflePage&&")[1]
                let raffle = page.split("&&");
                let raffleCode = raffle[0]?.split("raffleCode=")[1]
                let raffleId = raffle[1]?.split("raffleId=")[1]
                navigation.navigate('InstantContainer', { RaffleId: raffleCode, raffle_id: raffleId })
            }
        });

         Linking.getInitialURL().then((event) => {
            if (event?.includes("rafflePage")) {
                let page = event.split("rafflePage&&")[1]
                let raffle = page.split("&&");
                let raffleCode = raffle[0]?.split("raffleCode=")[1]
                let raffleId = raffle[1]?.split("raffleId=")[1];
                navigation.navigate('InstantContainer', { RaffleId: raffleCode, raffle_id: raffleId })
            }
        });

        return () => {
			// Linking.removeEventListener('url', quitstatenotification);
		};
    }, []);
    


    const cartNumberCount = async () => {
        const withoutLoginCartData = await RaffoluxAsyncStorage.getItem('WithoutLoginCartData');

        if (withoutLoginCartData) {

            for (let i = 0; i < withoutLoginCartData.length; i++) {
                const ele = withoutLoginCartData[i];
                const data = { raffle_id: ele.id, numberOftickets: ele.numberOftickets, selectedInstantTickets: [] };

                const response = await addToCartWithLogin(data);
            }
            dispatch(_fetchCartCountWithLogin());
            await RaffoluxAsyncStorage.removeItem('WithoutLoginCartData');
        } else {
            dispatch(_fetchCartCountWithLogin());
        }
    };


    useEffect(() => {
        if (isConnected) {
            if (userToken) {
                cartNumberCount()
                dispatch(getCreditBalance());
                dispatch(getActiveRafflesCount({ "page": 1 }));
                dispatch(getClaimPrizeCount())
                dispatch(getStoreBalance())
                dispatch(fetchAccount());
                dispatch(fetchMyPrizeCashClaims());
            } else {
                const fetchCartWithoutLoginData = async () => {
                    const withoutLoginCartData = await RaffoluxAsyncStorage.getItem('WithoutLoginCartData')
                    withoutLoginCartData ? dispatch(cartWithoutLoginCount(withoutLoginCartData.length)) : dispatch(cartWithoutLoginCount(0))
                }
                fetchCartWithoutLoginData()
            }
        }
    }, [isConnected, userToken]);

    const styles = StyleSheet.create({
        headerLeftButton: {
            marginLeft: scale(14),
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: 'center',
            borderRadius: scale(5),
            width: responsiveWidth(15),
            height: scale(24)
        },
        OpenMenu: {
            resizeMode: "contain",
            width: 24,
            height: 24,
            marginLeft: userToken != null ? scale(20) : null,
            marginRight: userToken != null ? null : scale(20)
        },
        logoBox: {
            height: 16.09,
            width: 85.991,
            resizeMode: 'contain'
        },
        logoStyle: {
            height: 16.09,
            width: 85.991,
        },
        raffoluxImageTextContainer: {
            backgroundColor: "#000616",
            paddingHorizontal: scale(4),
            flexDirection: 'row',
            borderRadius: scale(4),
            gap: scale(3.5),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#FFBD0A',
            right: scale(12),
            height: 16
        },
        raffoluxSymbol: {
            width: 9.6,
            height: 9.6,
            resizeMode: 'contain'
        },
        raffoluxPointNumber: {
            color: '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.2),
            paddingRight: scale(4)
        },
        cartSymbol: {
            height: responsiveHeight(3.8),
            width: responsiveWidth(8),
        },
        cartSymbolContainer: {
            top: scale(5),
            right: scale(2),
            height: scale(40),
            width: scale(40),
        },
        cartCountContainer: {
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: scale(10),
            left: scale(20),
            top: scale(-5),
            justifyContent: 'center',
            alignItems: 'center'
        },
        cartCount: {
            fontSize: responsiveFontSize(1.1),
            color: 'white',
            paddingHorizontal: cartCount > 9 ? scale(4) : scale(5),
            paddingVertical: cartCount > 9 ? scale(4) : scale(1)
        },
        rightContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        signUpButtonContainer: {
            height: responsiveHeight(4),
            width: responsiveWidth(19.2),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4.8,
            marginLeft: responsiveScreenWidth(3),
        },
        signUpText: {
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000616',
            fontSize: responsiveFontSize(1.5)
        }
    })


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} storeBalance={storeBalance} userToken={userToken} />}
                initialRouteName="DashBoard" backBehavior="history" screenOptions={({ navigation }) => ({
                    headerStyle: { backgroundColor: '#070B1A', height: responsiveHeight(7.5) },
                    headerTintColor: '#28293D',
                    headerTitleAlign: 'center',
                    drawerPosition: userToken ? 'left' : 'right',
                    drawerType: 'slide',
                    drawerStyle: { width: '100%' },
                    drawerActiveBackgroundColor: '#FFAE05',
                    drawerLabelStyle: { color: "#fff", },
                    drawerInactiveBackgroundColor: '#070B1A',
                    swipeEnabled: false,

                    headerShown: isNavVisible,

                    headerLeft: () => {
                        return userToken != null ? (
                            <TouchableOpacity onPress={() => navigation.openDrawer()} >
                                <Image style={styles.OpenMenu} source={OpenMenu} />
                            </TouchableOpacity>
                        ) :
                            <TouchableOpacity onPress={() => handleNavigation('Authentication')}>
                                <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.signUpButtonContainer}>
                                    <Text style={styles.signUpText}>SIGN IN</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                    },
                    headerTitle: () => (
                        <TouchableOpacity style={styles.logoBox} onPress={() => navigateToHome()}>
                            <Image source={logo} style={styles.logoStyle} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => {
                        return userToken != null ? (
                            <View style={styles.rightContainer}>
                                <TouchableOpacity style={styles.raffoluxImageTextContainer} onPress={() => handleNavigation('PointsStore')} >
                                    <Image style={styles.raffoluxSymbol} source={ReferralPageRaffoluxSymbol} />
                                    <Text style={styles.raffoluxPointNumber}>{Math.abs(Number(storeBalance))}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cartSymbolContainer} onPress={() => handleNavigation('Cart')}>
                                    <Image style={styles.cartSymbol} source={cartIcon} />
                                    {!isNullOrEmpty(cartCount) && (
                                        <View style={styles.cartCountContainer}>
                                            <Text style={styles.cartCount}>{cartCount}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ) :
                            (
                                <View style={styles.rightContainer}>
                                    <TouchableOpacity style={styles.cartSymbolContainer} onPress={() => handleNavigation('WithoutLoginCart')}>
                                        <Image style={styles.cartSymbol} source={cartIcon} />
                                        {withoutLoginCart > 0 && (
                                            <View style={styles.cartCountContainer}>
                                                <Text style={styles.cartCount}>{withoutLoginCart}</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.openDrawer()} >
                                        <Image style={styles.OpenMenu} source={OpenMenu} />
                                    </TouchableOpacity>
                                </View>
                            )

                    },
                })}
            >
                <>
                    <Drawer.Screen name="StackNavigator" component={StackNavigator} />
                </>
            </Drawer.Navigator>
        </SafeAreaView>
    )
}
export default DrawerNavigation

