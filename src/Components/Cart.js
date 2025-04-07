import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { View, Text, ScrollView, RefreshControl, StyleSheet, Pressable, Image, TextInput, ImageBackground, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, Linking, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import CheckBox from '@react-native-community/checkbox';
import Collapsible from 'react-native-collapsible';
import { Svg, Path, G } from 'react-native-svg';
import InAppBrowser from 'react-native-inappbrowser-reborn';

import { API_URL, VUE_FRONTEND_URL } from '@env'
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';

import * as Common from '../helpers/common';
import Loader from '../helpers/Loader';
import { openLink } from '../helpers/OpenBrowser';
import { Url } from '../helpers/routesApi';

import ThemeContext from '../utils/themes/themeWrapper';
import CartTimer from '../utils/CartTimer';
import StarRatingsRow from '../utils/5StarRatingsRow';
import RatingTrustPilotRow from '../utils/RatingTrustPilotRow';
import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';

import Cards from './CartComponents/Cards';
import Footer from './Footer';

import { _fetchCartCountWithLogin } from '../ReduxToolKit/apiSlice';

import { fetchFromCartWithLogin } from '../api/commonApi';
import { fetchMyCreditWithLogin } from '../api/myCreditApi';
import { cartPaymentWithLogin } from '../api/cartApi';
import { fetchAllRafflesWithLogin } from '../api/homeApi';

import { isEmptyArray, isEmptyObject, isNullOrEmpty } from '../utils/utils';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import { PlayWithConfidence } from '../assets/svgPaths/svgPaths';
import AlarmClock from '../assets/Images/AlarmClock.png';
import coinLightMode from '../assets/Images/coinLightMode.png';
import coinDarkMode from '../assets/Images/coinDarkMode.png';
import ExlametionMark from '../assets/Images/ExlametionMark.png';
import CheckOutButtonBackgroundLight from '../assets/Images/CheckOutButtonBackgroundLight.png';
import CheckOutButtonBackgroundDark from '../assets/Images/CheckOutButtonBackgroundDark.png';
import DNACheckout from './DNACheckout';
import { AuthContext } from '../Context/AuthContext';

const Cart = () => {
    const theme = useContext(ThemeContext);
    const { userToken } = useContext(AuthContext)
    const { isConnected } = useInternet();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const params = route.params;
    const formikRef = React.useRef(null);

    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [updatedData, setUpdatedData] = useState([]);
    const [raffleData, setRaffleData] = useState([]);

    const [expiresIn, setExpiresIn] = useState(null);
    const [creditBalance, setCreditBalance] = useState('');
    const [promoErrorMessage, setPromoErrorMessage] = useState(null);

    const [vocherObject, setVocherObject] = useState({});
    const [initialValues, setInitialValues] = useState({ promoCode: '' });
    const [reset, setReset] = useState(false);

    const [TotalPrice, SetTotalPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [_totalPrice, _setTotalPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [value, setValue] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [isPromoDataFetching, setIsPromoDataFetching] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showState, setShowState] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [toggleCheckBox1, setToggleCheckBox1] = useState(false);
    const [isPromoCodeApplied, setIspromoCodeApplied] = useState(false);
    const [checkOutDisable, setCheckOutDisable] = useState(false);
    const [isCustomRaffle, setIsCustomRaffle] = useState(false);
    const [TextChange, setTextChange] = useState(false);
    const [blur, setBlur] = useState(false);
    const [loader, setLoader] = useState(false);

    const backArrowPress = () => navigation.goBack();
    const handlePress = () => setShowState(!showState);
    const handleCollapsePress = () => setIsCollapsed(!isCollapsed);

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme])

    const cartCount = useSelector((state) => state.getAccountData.cartCount);

    const updatedTimer = (time) => !isEmptyArray(updatedData) ? setExpiresIn(time) : null;

    const cartApiCall = async () => {
        let _cartApiCall = await fetchFromCartWithLogin();
        if (_cartApiCall) {
            if (isEmptyArray(_cartApiCall.cartList)) {
                console.log('empty cart')
            }
            else {
                isEmptyObject(_cartApiCall) && setEmpty(true);
                updatedTimer(_cartApiCall?.expiresIn);
                !isEmptyObject(_cartApiCall) && setCartId(_cartApiCall.cartItemDetails[0]?.cart);
                const _updatedData = _cartApiCall && _cartApiCall?.raffleList?.map((ele) => {
                    return {
                        ...ele,
                        expireTime: _cartApiCall.expiresIn,
                        cartItems: _cartApiCall.cartItemDetails.filter(_ele => ele.id == _ele.raffle_id && _ele),
                        pricePerEntryLength: _cartApiCall.cartItemDetails.filter(_ele => ele.id == _ele.raffle_id && _ele)?.length,
                        cart_id: _cartApiCall.cartItemDetails.find(_ele => ele.id == _ele.raffle_id && _ele.cart),
                        raffle_id: _cartApiCall.cartItemDetails.find(_ele => ele.id == _ele.raffle_id && _ele.raffle_id),
                        cartItem_id: _cartApiCall.cartItemDetails.find(_ele => ele.id == _ele.raffle_id && _ele.cartitem),
                        ticket_number: _cartApiCall.cartItemDetails.find(_ele => ele.id == _ele.raffle_id && _ele.ticket_no),
                    }
                })
                const customRaffle = !isEmptyArray(_updatedData) && _updatedData.filter((ele) => ele.custom_raffle_id !== null && { custom_raffle_id: ele.custom_raffle_id, is_unlimited_raffle: ele.is_unlimited_raffle });
                !isEmptyArray(_updatedData) && FetchAllRaffles(_updatedData);
                !isEmptyArray(customRaffle) && setIsCustomRaffle(true);
                !isEmptyArray(_updatedData) ? setUpdatedData([..._updatedData]) : setUpdatedData([]);
                !isEmptyArray(_updatedData) && _setTotalPrice(_updatedData?.map((ele) => ele.entry_cost_gbp * ele.pricePerEntryLength).reduce((partialSum, a) => partialSum + a, 0));
                !isEmptyArray(_updatedData) && SetTotalPrice(_updatedData?.map((ele) => ele.entry_cost_gbp * ele.pricePerEntryLength).reduce((partialSum, a) => partialSum + a, 0));
                isEmptyArray(updatedData) && setExpiresIn(_cartApiCall?.expiresIn);

                if (!isEmptyObject(_cartApiCall)) {
                    if (_cartApiCall.voucher !== null && isEmptyArray(customRaffle)) {
                        setValue(_cartApiCall.voucher?.token)
                        const voucherData = { voucherToken: _cartApiCall.voucher?.token, voucherId: _cartApiCall.voucher?.name }
                        setVocherObject(voucherData);
                        const _vocherData = { voucherId: voucherData?.voucherToken, onload: true };
                        await _fetchDiscountedPriceWithLogin(_vocherData);
                    }
                }
                dispatch(_fetchCartCountWithLogin());
            }
        }
    }

    const _fetchDiscountedPriceWithLogin = async (data) => {
        setPromoErrorMessage('');
        setIsPromoDataFetching(true)
        setValue(null);
        setIspromoCodeApplied(false)
        const _token = await RaffoluxAsyncStorage.getItem(Common.Home.Token);
        axios.post(`${API_URL}fetchDiscountedPriceWithLogin`, data, { "headers": { 'Authorization': _token } })
            .then((res) => {
                setIsPromoDataFetching(false);
                setValue(data.voucherId);
                const result = res.data;
                setTotalPrice(parseFloat(result.totalPrice));
                setDiscountPrice(parseFloat(result.discountPrice));
                _setTotalPrice(result.totalPrice - result.discountPrice);
                setDiscountedPrice(parseFloat(result.discountedPrice));
                setIspromoCodeApplied(true)
                isEmptyArray(result.cartList) && setTotalPrice(0);
                isEmptyArray(result.cartList) && setDiscountPrice(0);
                isEmptyArray(result.cartList) && _setTotalPrice(0);
                isEmptyArray(result.cartList) && setDiscountedPrice(0);
                setPromoErrorMessage('');
            })
            .catch((err) => {
                setIsPromoDataFetching(false)
                setIspromoCodeApplied(false)
                if (err.response.status === 400) {
                    _setTotalPrice(TotalPrice)
                    // setPromoErrorMessage(err.response.data.error);
                    err.response.data.error === Common.cart.NoSuchVoucherExists && setPromoErrorMessage(Common.cart.InvalidVoucher);
                    err.response.data.error === Common.cart.VoucherNotApplicable && setPromoErrorMessage(Common.cart.VoucherNotApplicable);
                    err.response.data.error === Common.cart.VoucherLimitExceeded && setPromoErrorMessage(Common.cart.SorryThisCodeHasExpired);
                    err.response.data.error === Common.cart.NoItemInCart && setPromoErrorMessage(Common.cart.sinceTheCartIsEmptyYouCantApplyThePromoCode);
                    err.response.data.error === Common.cart.NoItemInCart && setEmpty(true);
                }
            })
    }

    const _fetchMyCreditWithLogin = async () => {
        let result = await fetchMyCreditWithLogin();
        result && setCreditBalance(result.credit_wallet[0].balance);
    }

    // const linking = { prefixes: ['raffoluxmobile://'], config: { screens: { Main: { path: 'open?', parse: { authToken: (authToken) => authToken, }, }, }, }, };

    const handleDeepLink = async (event) => {
        InAppBrowser.close()
        if (event?.url?.includes('paymentFailureWithLogin')) {
            navigation.navigate('PaymentFailure')
        }
        else if (event?.url?.includes('paymentSuccessWithLoginCartId')) {
            let cartId = event.url.split('paymentSuccessWithLoginCartId=')
            // navigation.navigate('PaymentSuccess', { cartId: cartId[1] })
            navigation.navigate('PaymentSuccessfulRevealTickets', { cartId: cartId[1] })
            
        }

        else if (event.url.includes('modalCloseWithLogin')) {
            dispatch(_fetchCartCountWithLogin());
        }
        else if (event.url.includes('paymentPendingWithLogin')) {
            navigation.navigate('PaymentPendingWithLogin')
        }
    }

    useEffect(() => {
        Linking.addEventListener('url', handleDeepLink);
        return () => {
            // Linking.removeEventListener('url', handleDeepLink);
        };
    }, []);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // FetchAllRaffles();
            onRefresh();
            setPromoErrorMessage('');
        });
        return unsubscribe;
    }, [navigation]);

    useMemo(() => {
        isEmptyArray(updatedData) && _setTotalPrice(0);
        isEmptyArray(updatedData) && SetTotalPrice(0);
        isEmptyArray(updatedData) && setDiscountedPrice(0);
        isEmptyArray(updatedData) && setDiscountPrice(0);
        isEmptyArray(updatedData) && setVocherObject({});
        isEmptyArray(updatedData) && setIspromoCodeApplied(false);
        isEmptyArray(updatedData) && setToggleCheckBox1(false);
        setEmpty(true);
    }, [updatedData]);

    useMemo(() => {
        cartCount === 0 && setUpdatedData([]);
    }, [cartCount]);

    const FetchAllRaffles = async (cartData) => {
        let response = await fetchAllRafflesWithLogin();
        if (cartData) {
            const ids = cartData?.map((ele) => ele.RaffleCode);
            const differentCategories = response?.filter((ele) => !ids.includes(ele.RaffleCode));
            setRaffleData(differentCategories.map(ele => ele).slice(0, 4));
        }
        else {
            setRaffleData(response?.map(ele => ele).slice(0, 4));
        }
    }

    useEffect(() => {
        if (isConnected) {
            setTotalPrice(0);
            setDiscountPrice(0);
            setDiscountedPrice(0)
            onRefresh();
            // FetchAllRaffles();
            setTimeout(() => {
                setLoader(false);
            }, 3000)
            setLoader(true);
        }
    }, [isConnected, cartCount])



    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setTotalPrice(0);
                setDiscountPrice(0);
                setDiscountedPrice(0);
                _setTotalPrice(0);
                resetForm();
            };
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setCheckOutDisable(false);
        setIsCustomRaffle(false);
        // setToggleCheckBox1(false);
        cartApiCall();
        _setTotalPrice(0);
        _fetchMyCreditWithLogin();
        setExpiresIn(null);
        dispatch(_fetchCartCountWithLogin());
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);


    const resetForm = () => {
        if (formikRef.current) {
            formikRef.current.resetForm();
        }
    };

    const validationSchema = yup.object().shape({
        promoCode: yup.string().required(Common.cart.PleaseFillInThepromoCodeField).trim(),
    });

    const handleOnChange = () => {
        setValue(null);
        setPromoErrorMessage('');
    };


    const dnaPaymentsCheckout = async () => {
        let paymentType = '';
        if (updatedData.length !== 0) {
            if (toggleCheckBox1 === false) {
                if (_totalPrice === 0) {
                    paymentType = 'credit'
                }
                else {
                    paymentType = 'wallet'
                }
            }
            else {
                if (toggleCheckBox1 === true) {
                    if (creditBalance >= _totalPrice && isCustomRaffle === false) {
                        paymentType = 'credit'
                    }
                    else {
                        paymentType = 'split'
                    }
                }
            }
        }

        if (paymentType === 'wallet' || paymentType === 'split') {
            openBrowser(`${VUE_FRONTEND_URL}mblDnaPaymentsWithLogin?cartId=${cartId}&&paymentType=${paymentType}&&authToken=${userToken}&&theme=${theme.theme == "light" ? false : true}`);
            
        }
        else if (paymentType === 'credit') {
            setCheckOutDisable(true);
            let response = !isEmptyArray(updatedData) && await cartPaymentWithLogin({ cart_id: cartId, paymentType: 'credit' });
            setCheckOutDisable(false);
            if (response) {
                !isEmptyObject(response) && navigation.navigate('PaymentSuccessfulRevealTickets', { cartId: Number(cartId) });
                // !isEmptyObject(response) && navigation.navigate('PaymentSuccess', { cartId: Number(cartId) });
            } 
        }
    };


    const openBrowser = async (url) => {
        try {
            await InAppBrowser.isAvailable();
            await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: 'gray',
                preferredControlTintColor: 'white',
                
                // Android Properties
                showTitle: true,
                toolbarColor: '#6200EE',
                secondaryToolbarColor: 'black',
                // enableUrlBarHiding: true,
                // enableDefaultShare: true,
                forceCloseOnRedirection: true,
                incognito: true,

            }).then((result) => {
                if (result.type == "cancel") {
                    dispatch(_fetchCartCountWithLogin());
                }
                return result
            })
        } catch (error) {
            // Alert.alert(error.message)
            console.log(error)
        }
    }


    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.background,
        },
        PageContainer: {
            backgroundColor: theme.theme == "light" ? '#FAFCFC' : '#000616',
            paddingBottom: responsiveHeight(10)
        },
        headerBar: {
            backgroundColor: theme.theme == "light" ? '#FAFCFC' : '#141628',
            height: responsiveHeight(6.4),
            flexDirection: 'row',
            alignItems: 'center',
        },
        headerBarIcon: {
            paddingLeft: scale(15),
            flex: 0.1
        },
        headerBarText: {
            fontFamily: 'Gilroy-Black',
            fontSize: responsiveFontSize(2.2),
            color: theme.color,
            opacity: scale(0.8),
            textAlign: 'center',
            flex: 0.8,
        },
        _timerCount: {
            backgroundColor: '#ffbd0a',
            paddingVertical: scale(10),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        raffleEndingTime: {
            fontFamily: 'NunitoSans-SemiBold',
            color: '#1C1C27',
            fontSize: scale(13.2)
        },
        ClockIcon: {
            height: scale(15),
            width: scale(15),
            resizeMode: 'contain'
        },
        ratingsBanner: {
            backgroundColor: '#000030',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: scale(2),
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
        closeIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#898a93',
            bottom: scale(5),
        },
        infoContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FAFCFC' : '#141628',
            paddingBottom: scale(5),
            paddingRight: scale(16),
            paddingLeft: scale(10),
            paddingTop: scale(15),
            marginHorizontal: scale(12),
            marginTop: scale(10),
            marginBottom: scale(10),
            borderRadius: scale(8),
            elevation: scale(4),
        },
        CartImage: {
            height: scale(72),
            width: scale(60.84),
            marginBottom: scale(5)
        },
        textContainer: {
            flex: 1,
            marginLeft: scale(8),
            gap: scale(10)
        },
        CartTitle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: scale(14),
        },
        CartSubTitle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFBD0A',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: scale(14)
        },
        _CartSubTitle: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(28, 28, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: scale(14),
            textAlign: 'right'
        },
        subTextContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        OuterHorizontalLine: {
            height: scale(1),
            backgroundColor: '#979797',
            marginHorizontal: responsiveWidth(3.5),
            marginTop: scale(10),
            marginBottom: scale(20)
        },
        _OuterHorizontalLine: {
            borderWidth: scale(0.25),
            borderColor: '#979797',
            marginHorizontal: scale(0),
            marginTop: scale(10),
        },
        totalPrice: {
            marginHorizontal: scale(10)
        },
        pressableStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: scale(16)
        },
        pressableText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#494952' : 'rgba(255, 255, 255, 0.8)',
            fontSize: responsiveFontSize(1.5)
        },
        numberCard: {
            backgroundColor: '#FFBD0A',
            borderRadius: scale(15),
            paddingHorizontal: scale(7),
            paddingVertical: scale(5),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(5),
            marginRight: scale(10),
        },
        selectedNumber: {
            color: '#000616',
            fontFamily: 'NunitoSans-Bold',
            fontSize: scale(13),
            marginRight: scale(10),
        },
        crossMarkStyle: {
            height: scale(8),
            width: scale(8),
            marginLeft: scale(5),
            marginRight: scale(4)
        },
        ExlametionMarkImgStyle: {
            height: scale(12),
            width: scale(11.8),
        },
        playWithConfidanceContainer: {
            marginBottom: scale(40),
            justifyContent: 'center',
            alignItems: 'center',
        },
        PlayWithConfidanceText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#2A3138' : '#FFFFFF',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2.2),
            marginBottom: scale(14),
        },
        listStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(42, 49, 56, 0.800000011920929)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            marginTop: scale(13)
        },
        _listStyle: {
            fontFamily: 'NunitoSans-Black',
        },
        promoCodeContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#141628',
            borderRadius: scale(12),
            paddingTop: scale(21),
            paddingHorizontal: scale(12),
        },
        promoCodePadding: {
            paddingBottom: scale(50)
        },
        promoCodeText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            justifyContent: 'center',
            alignItems: 'center',
        },
        promoCodeTextMargin: {
            marginLeft: scale(5)
        },
        PromoPressableContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: scale(12)
        },
        AngleDownIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            marginRight: scale(15),
        },
        error: {
            color: 'red',
            textAlign: 'left',
        },
        _error: {
            color: 'red',
            textAlign: 'left',
            fontSize: responsiveFontSize(1.39)
        },
        ApplyButton: {
            backgroundColor: '#FFBD0A',
            borderRadius: scale(6),
            minWidth: responsiveWidth(25),
            height: responsiveHeight(5.3),
            justifyContent: 'center',
            alignItems: 'center',
        },
        ApplyText: {
            color: '#1C1C27',
            fontSize: responsiveFontSize(2),
            fontFamily: 'Gilroy-ExtraBold'
        },
        FieldContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        input: {
            flex: 1,
            width: scale(224),
            height: scale(37),
            paddingLeft: scale(10),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(255, 255, 255, 0.05)' : '#141628',
            borderRadius: scale(6),
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            borderWidth: scale(1.24),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.195995)' : '#979797',
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 1)'
        },
        inputError: {
            borderColor: 'red',
            borderWidth: scale(0.5),
        },
        credetBalanceContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: scale(23),
            marginBottom: scale(5),
        },
        coinBalanceAvailable: {
            backgroundColor: '#EEEAFE',
            borderRadius: scale(2),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: scale(4),
            paddingHorizontal: scale(8)
        },
        coinStyle: {
            height: scale(12),
            width: scale(16),
            marginRight: scale(8)
        },
        creditBalance: {
            color: '#5536F9',
            fontSize: responsiveFontSize(1.5),
            fontFamily: 'NunitoSans-SemiBold'
        },
        checkBoxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: scale(20),
        },
        checkBox: {
            marginLeft: scale(5),
        },
        checkBoxText: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(28, 28, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
        },
        checkBoxTextPadding: {
            padding: scale(15)
        },
        subTotalTextContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        subTotalTextContainerMargin: {
            marginBottom: scale(10),
            marginTop: scale(20)
        },
        promoCodeSubTotalTextContainer: {
            marginBottom: isPromoCodeApplied ? scale(0) : scale(20)
        },
        subTotalText: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(28, 28, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
        },
        purchaseContainer: {
            flexDirection: 'row',
            backgroundColor: '#000616',
            height: scale(22),
            borderRadius: scale(6),
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: scale(11),
            marginTop: scale(12)
        },
        purchase: {
            color: '#FFFFFF',
            fontSize: responsiveFontSize(1.5),
            fontFamily: 'NunitoSans-SemiBold'
        },
        _purchase: {
            color: '#FFBD0A',
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'Gilroy-Bold'
        },
        TotalPriceContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: scale(10),
            paddingBottom: scale(30)
        },
        totalTextStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Bold'
        },
        bottomContainer: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0
        },
        CheckOutBackgroundStyle: {
            height: responsiveHeight(15),
        },
        AddtoCartContainer: {
            backgroundColor: '#FFBD0A',
            height: scale(44),
            paddingHorizontal: scale(18),
            borderRadius: scale(6),
            marginBottom: scale(7),
            marginTop: scale(7),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: scale(11)
        },
        AddtoCartContainerLoader: {
            backgroundColor: '#FFBD0A',
            height: scale(44),
            paddingHorizontal: scale(18),
            borderRadius: scale(6),
            marginBottom: scale(7),
            marginTop: scale(7),
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: scale(11)
        },
        addToCartText: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            justifyContent: 'center',
            alignItems: 'center',
        },
        appliedSuccessfull: {
            color: 'rgb(76,175,80)',
            fontFamily: 'NunitoSans-SemiBold',
            marginLeft: scale(1)
        },
        _appliedSuccessfull: {
            color: 'rgb(76,175,80)',
            fontFamily: 'NunitoSans-SemiBold',
            marginLeft: scale(1),
        },
        discountCodeStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(28, 28, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: scale(12),
            letterSpacing: scale(0),
            marginTop: scale(8),
        },
        discountAppliedContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: scale(10),
            marginBottom: scale(14)
        },
        creditErrorContainer: {
            paddingHorizontal: scale(10),
            paddingBottom: scale(10)
        },
        related: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(13, 18, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
        },
        LiveComponents: {
            marginBottom: scale(51),
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: scale(11)
        },
        __container: {
            marginLeft: scale(40),
            marginBottom: scale(8),
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
        },
        title: {
            flex: 1,
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(42, 49, 56, 0.800000011920929)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            lineHeight: scale(22),
        },
        TicketModal: {
            backgroundColor: 'rgba(0, 0, 0, 0.70)',
            flex: 1,
        },
        modalView: {
            flex: 1,
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'green' : '#000616',
            borderRadius: scale(11),

        },
        dnaModalStyles: {
            // flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: 'red',
            marginHorizontal: responsiveWidth(4),
            marginTop: responsiveHeight(4)
        }
    });

    return (
        <>
            {loader ? <Loader /> :
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={-80}>
                        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                            <View style={styles.PageContainer}>
                                <View style={styles.headerBar}>
                                    <Pressable style={styles.headerBarIcon} onPress={() => backArrowPress()} >
                                        <Octicons name={'arrow-left'} size={22} color={theme.color} />
                                    </Pressable>
                                    <Text style={styles.headerBarText}>{Common.cart.Cart}</Text>
                                </View>
                                {
                                    !isNullOrEmpty(expiresIn) &&
                                    <View style={styles._timerCount}>
                                        <Image style={styles.ClockIcon} source={AlarmClock} />
                                        <CartTimer expiresIn={expiresIn} onRefresh={onRefresh} />
                                    </View>
                                }
                                <View style={styles.ratingsBanner}>
                                    <View style={styles.trustPilotContainer}>
                                        <RatingTrustPilotRow />
                                    </View>
                                    <View style={styles.starRatingsContainer}>
                                        <StarRatingsRow />
                                        <Text style={styles.excellentText}>  {Common.cart.RatedExcellent}</Text>
                                    </View>
                                </View>
                                {
                                    !isEmptyArray(updatedData) ?
                                        updatedData?.map((ele, i) => <Cards key={i} {...ele} params={params} setIsCustomRaffle={setIsCustomRaffle} handlePress={handlePress} showState={showState} cartApiCall={cartApiCall} onRefresh={onRefresh} empty={empty} setEmpty={setEmpty} />)
                                        :
                                        <Text style={[styles.checkBoxText, styles.checkBoxTextPadding]}>{Common.cart.yourCartIsEmpty}</Text>
                                }
                                <View style={styles.OuterHorizontalLine}></View>

                                <View style={styles.playWithConfidanceContainer}>
                                    <Text style={styles.PlayWithConfidanceText}>{Common.cart.PlayWithConfidence}</Text>
                                    {Common.cartArr?.map((ele, i) => {
                                        return <View key={i} style={styles.__container}>
                                            {viewBackgroundColor === '#FFFFFF' ?
                                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path fill-rule="evenodd" clip-rule="evenodd" d={PlayWithConfidence} fill="black" />
                                                </Svg>
                                                :
                                                <Svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <Path fill-rule="evenodd" clip-rule="evenodd" d={PlayWithConfidence} fill="#FFBD0A" />
                                                </Svg>
                                            }

                                            <Text>   </Text>

                                            <Text style={styles.title}>{ele}</Text>
                                        </View>
                                    })}
                                    <Text style={styles.listStyle}>{Common.cart.stillUser} <Text style={styles._listStyle}>{Common.cart.phoneNumber}</Text> {Common.cart.and} {`${'\n'}${Common.cart._stillUser}`}</Text>
                                </View>

                                <View style={[styles.promoCodeContainer.backgroundColor, styles.promoCodePadding]}>
                                    <View style={styles.promoCodeContainer}>
                                        <Pressable style={styles.PromoPressableContainer} onPress={() => handleCollapsePress()}>
                                            <Text style={styles.promoCodeText}>{Common.cart.PromoCode}</Text>
                                            <Ionicons name={isCollapsed ? Common.common.chevronUp : Common.common.chevronDown} size={20} style={styles.AngleDownIcon} />
                                        </Pressable>
                                        <Collapsible collapsed={isCollapsed}>
                                            {!isEmptyObject(vocherObject) &&
                                                <Formik
                                                    // innerRef={formikRef}
                                                    validateOnMount={true}
                                                    initialValues={reset !== true ? { promoCode: !isEmptyObject(vocherObject) ? vocherObject.voucherToken : '', PromoCode: vocherObject.voucherId } : initialValues}
                                                    validationSchema={validationSchema}
                                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                                        setSubmitting(true);
                                                        isCustomRaffle && setTextChange(true);
                                                        setTimeout(() => {
                                                            const formData = values.promoCode !== '' ? { voucherId: blur === true ? values.promoCode.trim() : values.promoCode.trim(), onload: false } : { voucherId: blur === true ? '' : '', onload: false }
                                                            isCustomRaffle === false && values.promoCode !== '' && values.promoCode != value && _fetchDiscountedPriceWithLogin(formData)
                                                            setSubmitting(false);
                                                        }, 500);
                                                    }}>
                                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                                        <View>
                                                            <View>
                                                                <View style={styles.FieldContainer}>
                                                                    <View>
                                                                        <TextInput
                                                                            style={[styles.input, touched.promoCode && errors.promoCode ? styles.inputError : null]}
                                                                            placeholder={Common.cart.enterPromoCode}
                                                                            onChangeText={handleChange('promoCode')}
                                                                            onChange={() => { handleOnChange() }}
                                                                            onBlur={() => { handleBlur('promoCode'); setBlur(true) }}
                                                                            value={values.promoCode}
                                                                            placeholderTextColor={viewBackgroundColor === '#FFFFFF' ? 'rgba(0,0,0,0.4)' : 'rgba(255, 255, 255, 0.4)'}
                                                                        />
                                                                    </View>
                                                                    <View>
                                                                        <TouchableOpacity style={styles.ApplyButton} onPress={() => handleSubmit()} >
                                                                            {
                                                                                isPromoDataFetching ? <ActivityIndicator color={'#000616'} style={styles.ApplyText} /> : <Text style={styles.ApplyText}>{Common.cart.APPLY}</Text>
                                                                            }
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                                {(isCustomRaffle && TextChange && values.promoCode) && <Text style={styles.error}>{Common.cart.YouCantApplyPromocodeSinceYouHaveAddedCustomRaffleToTheCart}</Text>}
                                                                {(!errors.promoCode && isNullOrEmpty(promoErrorMessage) && !isEmptyArray(updatedData) && !isNullOrEmpty(value)) && <Text style={styles._appliedSuccessfull}>{`${Common.cart.PromoCode} ${value} ${Common.cart.appliedSuccessfully}`}</Text>}
                                                                {!errors.promoCode && !isNullOrEmpty(promoErrorMessage) && <Text style={styles.error}>{promoErrorMessage}</Text>}
                                                                {errors.promoCode && touched.promoCode && (
                                                                    <Text style={styles.error}>{errors.promoCode}</Text>
                                                                )}
                                                            </View>
                                                        </View>
                                                    )}
                                                </Formik>
                                            }
                                            {isEmptyObject(vocherObject) &&
                                                <Formik
                                                    innerRef={formikRef} // Assign the formikRef to the Formik component
                                                    validateOnMount={true}
                                                    initialValues={{ promoCode: '' }}
                                                    validationSchema={validationSchema}
                                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                                        setSubmitting(true);
                                                        isCustomRaffle && setTextChange(true);
                                                        setTimeout(() => {
                                                            const formData = values.promoCode !== '' ? { voucherId: values?.promoCode?.trim(), onload: false } : { voucherId: '', onload: false }
                                                            isCustomRaffle === false && values?.promoCode !== '' && values.promoCode != value && _fetchDiscountedPriceWithLogin(formData)
                                                            setSubmitting(false);
                                                        }, 500);
                                                    }}>
                                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                                        <View>
                                                            <View>
                                                                <View style={styles.FieldContainer}>
                                                                    <View>
                                                                        <TextInput
                                                                            style={[styles.input, touched.promoCode && errors.promoCode ? styles.inputError : null]}
                                                                            placeholder={Common.cart.enterPromoCode}
                                                                            onChangeText={handleChange(Common.cart.promoCode)}
                                                                            onChange={() => { handleOnChange() }}
                                                                            onBlur={() => { handleBlur(Common.cart.promoCode) }}
                                                                            value={values.promoCode}
                                                                            placeholderTextColor={viewBackgroundColor === '#FFFFFF' ? 'rgba(0,0,0,0.4)' : 'rgba(255, 255, 255, 0.4)'}
                                                                        />
                                                                    </View>
                                                                    <View>
                                                                        <TouchableOpacity style={styles.ApplyButton} onPress={() => handleSubmit()}  >
                                                                            {
                                                                                isPromoDataFetching ? <ActivityIndicator color={'#000616'} style={styles.ApplyText} /> : <Text style={styles.ApplyText}>{Common.cart.APPLY}</Text>
                                                                            }
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                                {(isCustomRaffle && TextChange && values.promoCode) && <Text style={styles.error}>{Common.cart.YouCantApplyPromocodeSinceYouHaveAddedCustomRaffleToTheCart}</Text>}
                                                                {(!errors.promoCode && totalPrice !== 0 && !isNullOrEmpty(value)) && <Text style={styles.appliedSuccessfull}>{`${Common.cart.PromoCode} ${value} ${Common.cart.appliedSuccessfully}`}</Text>}
                                                                {errors.promoCode && touched.promoCode && (
                                                                    <Text style={styles.error}>{errors.promoCode}</Text>
                                                                )}
                                                                {!errors.promoCode && !isNullOrEmpty(promoErrorMessage) && <Text style={styles.error}>{promoErrorMessage}</Text>}
                                                            </View>
                                                        </View>
                                                    )}
                                                </Formik>
                                            }
                                        </Collapsible>

                                        <View>
                                            {Number(creditBalance) > 0 &&
                                                <>
                                                    <View style={styles.credetBalanceContainer}>
                                                        <Text style={[styles.promoCodeText, styles.promoCodeTextMargin]}>{Common.cart.UseCreditBalance}</Text>
                                                        <View style={styles.coinBalanceAvailable}>
                                                            <Image source={viewBackgroundColor === '#FFFFFF' ? coinLightMode : coinDarkMode} style={styles.coinStyle} />
                                                            <Text style={styles.creditBalance}>{`£${creditBalance}`} {Common.cart.available}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={styles.checkBoxContainer}>
                                                        <CheckBox
                                                            style={[styles.checkBox, { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }]}
                                                            tintColors={{ true: '#FFBD0A', false: viewBackgroundColor === '#FFFFFF' ? '#474750' : '#d0d0d4' }}
                                                            onCheckColor={viewBackgroundColor}
                                                            // disabled={false}
                                                            value={toggleCheckBox1}
                                                            onValueChange={newValue => setToggleCheckBox1(newValue)}
                                                            boxType='square'
                                                            onFillColor='#FFBD0A'
                                                            onTintColor='#FFBD0A'
                                                        />
                                                        <Text style={styles.checkBoxText}>{Common.cart.UseMyCreditBalanceForThisPurchase}</Text>
                                                    </View>
                                                </>
                                            }
                                        </View>

                                        <View style={styles._OuterHorizontalLine}></View>

                                        <View style={styles.totalPrice}>
                                            <View style={[styles.subTotalTextContainer, styles.subTotalTextContainerMargin]}>
                                                <Text style={styles.subTotalText}>{Common.cart.Subtotal}</Text>
                                                <Text style={styles.subTotalText}>{`£${TotalPrice ? TotalPrice?.toFixed(2) : '0.00'}`}</Text>
                                            </View>
                                            {
                                                (toggleCheckBox1 && isCustomRaffle === false) &&
                                                <View style={[styles.subTotalTextContainer, styles.promoCodeSubTotalTextContainer]}>
                                                    <Text style={styles.subTotalText}>{Common.cart.CreditBalanceApplied}</Text>
                                                    <Text style={styles.discountCodeStyle}>{_totalPrice > creditBalance ? `- £${Number(creditBalance)?.toFixed(2)}` : `- £${_totalPrice === undefined ? `0.00` : _totalPrice.toFixed(2)}`}</Text>
                                                </View>
                                            }
                                        </View>
                                        {
                                            isPromoCodeApplied &&
                                            <View style={styles.discountAppliedContainer}>
                                                <Text style={styles.subTotalText}>{Common.cart.DiscountCodeApplied}</Text>
                                                <Text style={styles.discountCodeStyle}>
                                                    {`- £${(discountPrice !== undefined || discountPrice !== 0) ? discountPrice.toFixed(2) : '0.00'}`}
                                                </Text>
                                            </View>
                                        }
                                        {
                                            (toggleCheckBox1 && isCustomRaffle) &&
                                            <View style={styles.creditErrorContainer}>
                                                <Text style={styles._error}>{Common.InstantNonInstant.YouCantApplyCreditSinceYouHaveAddedCustomRaffleToTheCart}</Text>
                                            </View>
                                        }
                                        <View style={styles.TotalPriceContainer}>
                                            <Text style={styles.totalTextStyle}>{Common.cart.TOTAL}</Text>
                                            <Text style={styles.totalTextStyle}>{
                                                (toggleCheckBox1 === false || isCustomRaffle === true) ? (discountPrice === 0) ? `£${_totalPrice !== undefined ? _totalPrice?.toFixed(2) : '0.00'}` : `£${_totalPrice !== undefined ? _totalPrice?.toFixed(2) : '0.00'}`
                                                    :
                                                    (_totalPrice == undefined && creditBalance == undefined) ? '£0.00' : (discountPrice === 0 ? (_totalPrice > creditBalance) ? `£${(_totalPrice - Number(creditBalance)).toFixed(2)}` : `£0.00` : (_totalPrice < creditBalance) ? '£0.00' : `£${(_totalPrice - creditBalance).toFixed(2)}`)
                                            }</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <Footer /> */}
                            </View>
                        </ScrollView>

                        <View style={styles.bottomContainer}>
                            <ImageBackground source={viewBackgroundColor === '#FFFFFF' ? CheckOutButtonBackgroundLight : CheckOutButtonBackgroundDark} style={styles.CheckOutBackgroundStyle} >
                                <View style={styles.purchaseContainer}>
                                    <Text style={styles.purchase}>{Common.cart.YouWillEarn}  </Text>
                                    <Image source={ExlametionMark} style={styles.ExlametionMarkImgStyle} />
                                    {(toggleCheckBox1 === false || isCustomRaffle === true) ?
                                        ((discountPrice !== 0) ? <Text style={styles._purchase}>{` ${parseInt(_totalPrice)} `}</Text> : <Text style={styles._purchase}>{` ${parseInt(_totalPrice && _totalPrice)} `}</Text>)
                                        :
                                        (_totalPrice > creditBalance) ? <Text style={styles._purchase}>{` ${parseInt(_totalPrice - creditBalance)} `}</Text> : <Text style={styles._purchase}>{` ${parseInt(_totalPrice - _totalPrice)} `}</Text>
                                    }
                                    <Text style={styles.purchase}> {Common.cart.forThisPurchase} </Text>
                                </View>
                                <TouchableOpacity style={checkOutDisable === false ? styles.AddtoCartContainer : styles.AddtoCartContainerLoader} onPress={() => dnaPaymentsCheckout()} disabled={checkOutDisable}>
                                    <>
                                        {
                                            checkOutDisable === false ?
                                                <>
                                                    <Text style={styles.addToCartText}>{Common.cart.CHECKOUT}</Text>
                                                    <Text style={styles.addToCartText}>
                                                        {
                                                            (toggleCheckBox1 === false || isCustomRaffle === true) ? (discountPrice === 0) ? `£${_totalPrice !== undefined ? _totalPrice?.toFixed(2) : '0.00'}` : `£${_totalPrice !== undefined ? _totalPrice?.toFixed(2) : '0.00'}`
                                                                :
                                                                (_totalPrice == undefined && creditBalance == undefined) ? '£0.00' : (discountPrice === 0 ? (_totalPrice > creditBalance) ? `£${(_totalPrice - Number(creditBalance)).toFixed(2)}` : `£0.00` : (_totalPrice < creditBalance) ? '£0.00' : `£${(_totalPrice - creditBalance).toFixed(2)}`)
                                                        }
                                                    </Text>
                                                </>
                                                :
                                                <ActivityIndicator color={'#000616'} />
                                        }
                                    </>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            }
        </>
    )
}


export default Cart