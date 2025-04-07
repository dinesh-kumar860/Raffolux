import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, ImageBackground, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, ActivityIndicator, FlatList, Pressable, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useRef, useCallback, useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import ThemeContext from '../utils/themes/themeWrapper';
import SelectDropdown from 'react-native-select-dropdown';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';
import Toast from 'react-native-simple-toast';

import { Url } from '../helpers/routesApi';
import * as Common from '../helpers/common';
import Loader from '../helpers/Loader';
import { openLink } from '../helpers/OpenBrowser';
import SingleStar from '../helpers/SingleStar';

import Details from './InstantContainer/Details';
import Description from './InstantContainer/Description';
import Prices from './InstantContainer/Prices';
import AddToCartModal from './InstantContainer/AddToCartModal';
import ThumbNail from './InstantContainer/ThumbNail';
import TicketSelector from './NonInstantModal/TicketSelector';

import { formattedDateTime, isEmptyArray, isEmptyObject, isNullOrEmpty } from '../utils/utils';
import SliderProgressBarTwo from '../utils/SliderProgressBarTwo';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';
import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage';

import RaffleEndedPage from './RaffleEndedPage';
import Footer from './Footer';

import { fetchAllPrizesWithLogin, fetchTopPrizesWithLogin, getRafflePageDataWithLogin } from '../api/instantNonInstantApi';
import { addToCartWithLogin } from '../api/commonApi';

import { _fetchCartCountWithLogin } from '../ReduxToolKit/apiSlice';
import { cartWithoutLoginCount } from '../ReduxToolKit/WithoutLoginCartSlice';

import { AuthContext } from '../Context/AuthContext';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RectangleCurveWhite from '../assets/Images/RectangleCurveWhite.png';
import calenderIconBlack from '../assets/Images/calenderIconBlack.png';
import calenderIconWhite from '../assets/Images/calenderIconWhite.png';
import TotalEntriesBlack from '../assets/Images/TotalEntriesBlack.png';
import TotalEntriesLight from '../assets/Images/TotalEntriesLight.png';
import RectangleCurve from '../assets/Images/RectangleCurve.png';
import personDarkImg from '../assets/Images/personDarkImg.png';
import personLightmg from '../assets/Images/personLightmg.png';
import bigReviewStar from '../assets/Images/bigReviewStar.png';
import minusWhite from '../assets/Images/minusWhite.png';
import reviewStar from '../assets/Images/reviewStar.png';
import plusWhite from '../assets/Images/plusWhite.png';
import minus from '../assets/Images/minus.png';
import plus from '../assets/Images/plus.png';


const InstantContainer = () => {
    const navigation = useNavigation();
    const { isConnected } = useInternet();
    const { userToken } = useContext(AuthContext)
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext);
    const route = useRoute();
    const params = route.params;
    const scrollViewRef = useRef(null);

    const [_raffleId, setRaffleId] = useState(null);

    const [data, setData] = useState({});
    const [descriptionData, setDescriptionData] = useState('');
    const [detailsData, setDetailsData] = useState('');
    const [topPrices, setTopPrices] = useState([]);
    const [TotalTopPricesLength, setTotalTopPricesLength] = useState(0);
    const [ActiveTopPricesLength, setActiveTopPricesLength] = useState(0);
    const [allPrices, setAllPrices] = useState([]);
    const [TotalAllPricesLength, setTotalAllPricesLength] = useState(0);
    const [ActiveAllPricesLength, setActiveAllPricesLength] = useState(0);
    const [entryCost, setEntryCost] = useState(0);
    const [_entryCost, set_EntryCost] = useState(null);

    const [totalEntries, setTotalEntries] = useState();

    const [activate, setActivate] = useState(false);
    const [sortToggle, setSortToggle] = useState(true);

    const [raffleEnded, setRaffleEnded] = useState(false);
    const [raffleSoldOut, setRaffleSoldOut] = useState(false);
    const [ticketSelectorApiCall, setTicketSelectorApiCall] = useState(false);

    const [TicketsCount, setTicketsCount] = useState({ id: 1, value: 1 });
    const [nonInstant, setNonInstant] = useState(false);
    const [price, setPrice] = useState(false);
    const [details, setDetails] = useState(false);
    const [description, setDescription] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [nonInstance, setNonInstance] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [ticketsState, setTicketsState] = useState({});
    const [ticketsToGenerate, setTicketsToGenerate] = useState([]);
    const [ticketSelectorCount, setTicketSelectorCount] = useState(null);
    const [withoutLoginCartData, setWithoutLoginCartData] = useState({})

    const [isDropdownPressed, setIsDropdownPressed] = useState(false);
    const [allTicketsRendered, setAllTicketsRendered] = useState(false);


    useMemo(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme])

    useMemo(() => {
        TicketsCount.value < 1 && setTicketsCount({ id: 1, value: 1 });
        data?.is_launch_price !== true ? set_EntryCost(Number(data?.entry_cost_gbp) * TicketsCount.value) : set_EntryCost(Number(data?.discounted_entry_cost_gbp) * TicketsCount.value);
    }, [TicketsCount, _entryCost])

    useMemo(() => {
        const timer = setTimeout(() => setActivate(false), 1000);
        return () => clearTimeout(timer);
    }, [activate])

    const _getRafflePageDataWithLogin = async (RaffleId) => {
        const result = await getRafflePageDataWithLogin({ raffleCode: String(RaffleId) });
        if (result) {
            setTicketsCount({ id: 1, value: 1 });

            setRaffleEnded(result.is_expired);
            setRaffleSoldOut(result.is_soldout);

            !isEmptyObject(result) && setData(result);
            !isEmptyObject(result) && setWithoutLoginCartData(result);
            !isEmptyObject(result) && setTotalEntries(result.total_entries);
            result.is_launch_price !== true ? setEntryCost(Number(result.entry_cost_gbp)) : setEntryCost(Number(result.discounted_entry_cost_gbp));
            result.is_launch_price !== true ? set_EntryCost(Number(result.entry_cost_gbp)) : set_EntryCost(Number(result.discounted_entry_cost_gbp));
            setDescriptionData(result.Description);
            setDetailsData(result.Specification);
            result.RaffleType === 'Instant' && setPrice(true);
            result.RaffleType !== 'Instant' && setDescription(true);
            result.RaffleType !== 'Instant' && setDetails(false);
            result.RaffleType !== 'Instant' && setNonInstant(true);
            let numArr = [];
            const max = result.raffle_entry_range;
            const min = 0;
            for (let i = min; i < max; i++) {
                numArr.push({ id: i + 1, value: i + 1 });
            }
            setTicketsToGenerate(numArr);
            const ticketSelectorApiData = { raffle_id: result.id }
            setTicketsState(ticketSelectorApiData)
        }
    }

    const _fetchTopPrizesWithLogin = async (data) => {
        const result = await fetchTopPrizesWithLogin(data);
        const totalLength = !isEmptyArray(result) ? result.length : 0;
        const activeTopPrices = !isEmptyArray(result) ? result.filter(ele => ele.status === 1 && ele) : [];
        setTotalTopPricesLength(totalLength);
        setActiveTopPricesLength(activeTopPrices.length);
        !isEmptyArray(result) && setTopPrices(result);
    }

    const _fetchAllPrizesWithLogin = async (data) => {
        const result = await fetchAllPrizesWithLogin(data);
        if (result) {
            const totalLength = !isEmptyArray(result) && result.length;
            const activeAllPrices = !isEmptyArray(result) ? result.filter(ele => ele.status === 1 && ele) : [];
            !isNullOrEmpty(totalLength) && setTotalAllPricesLength(totalLength);
            !isEmptyArray(activeAllPrices) && setActiveAllPricesLength(activeAllPrices.length);
            !isEmptyArray(result) && setAllPrices(result);
        }

    }

    const _addToCartWithLogin = async () => {
        setButtonDisabled(true);
        const _data = { raffle_id: _raffleId, numberOftickets: TicketsCount.value, selectedInstantTickets: [] };
        const addToCart = await addToCartWithLogin(_data);
        if (addToCart) {
            if (addToCart.status === 400) {
                addToCart.message.message === 'Ticket limit reached.' && Toast.show(`Tickets aren't currently available`, Toast.SHORT)
                // Toast.show(`You have attempted to purchase more than \nthe allowed number of entries ${TicketsCount.value} \nper player. Please try again.`,Toast.LONG)
                Snackbar.show({
                    text: `You have attempted to purchase more than \nthe allowed number of entries ${TicketsCount.value} \nper player. Please try again.`,
                    duration: Snackbar.LENGTH_SHORT,
                    numberOfLines: 3,
                    textColor: theme.color,
                    backgroundColor: theme.background,
                    fontFamily: 'NunitoSans-Regular',
                });
                setButtonDisabled(false);
            }
            else if (addToCart.status === 500) {
                Toast.show(Common.InstantNonInstant.NoMoreAvailableTickets, Toast.SHORT)
                setButtonDisabled(false);
            }
            else {
                dispatch(_fetchCartCountWithLogin());
                setSuccessModalVisible(true);
                setButtonDisabled(false);
            }
        }
        else {
            setButtonDisabled(false);
        }
    }

    const addToCartWithoutLogin = async () => {
        let data = { ...withoutLoginCartData, totalEntriesCost: _entryCost, numberOftickets: TicketsCount.value }
        let fetchWithoutLoginCartData = await RaffoluxAsyncStorage.getItem('WithoutLoginCartData')
        let arrayData = fetchWithoutLoginCartData ? fetchWithoutLoginCartData : []
        let isTicketLimitExceeded = false;

        if (!isEmptyArray(arrayData)) {
            let found = false;

            const updateCart = (entry) => {
                entry['totalEntriesCost'] += _entryCost
                entry['numberOftickets'] += TicketsCount.value
                found = true;
            }

            for (let i = 0; i < arrayData.length; i++) {
                if (arrayData[i]['id'] == data['id']) {
                    if (data.is_unlimited_raffle == true) {
                        updateCart(arrayData[i])
                        break;
                    }
                    else if (data.is_unlimited_raffle == false && data.is_unlimited_entries == true) {
                        if (arrayData[i].numberOftickets + TicketsCount.value > arrayData[i].ticketsLeft) {
                            isTicketLimitExceeded = true
                            break
                        } else {
                            updateCart(arrayData[i])
                            break;
                        }
                    } else {
                        if (arrayData[i].numberOftickets + TicketsCount.value > data.ticketsLeft || arrayData[i].numberOftickets + TicketsCount.value > data.total_entries_per_player) {
                            isTicketLimitExceeded = true
                            break
                        } else {
                            updateCart(arrayData[i])
                            break;
                        }
                    }
                }
            }
            if (!found) {
                arrayData.push(data);
            }
        } else {
            arrayData.push(data)
        }

        if (isTicketLimitExceeded == false) {
            setSuccessModalVisible(true);
            await RaffoluxAsyncStorage.setItem('WithoutLoginCartData', arrayData)
            dispatch(cartWithoutLoginCount(arrayData.length))
        } else {
            Toast.show('Ticket Limit Exceeded')
        }
    }


    useEffect(() => {
        if (isConnected) {
            setData({})
            const topPricePayload = { raffle_id: params?.RaffleId, topPrCnt: 100 };
            const allPricePayload = { raffle_id: params?.RaffleId, topPrizes: 100 };
            setPrice(false);
            setDescription(false);
            setDetails(false);
            setNonInstance(false);
            _getRafflePageDataWithLogin(params?.RaffleId);
            _fetchTopPrizesWithLogin(topPricePayload);
            _fetchAllPrizesWithLogin(allPricePayload);
            setRaffleId(params?.raffle_id);
        }
    }, [isConnected, params])

    // useMemo(() => {
    //     const topPricePayload = { raffle_id: params?.RaffleId, topPrCnt: 100 };
    //     const allPricePayload = { raffle_id: params?.RaffleId, topPrizes: 100 };
    //     setPrice(false);
    //     setDescription(false);
    //     setDetails(false);
    //     setNonInstance(false);
    //     _getRafflePageDataWithLogin(params?.RaffleId);
    //     _fetchTopPrizesWithLogin(topPricePayload);
    //     _fetchAllPrizesWithLogin(allPricePayload);
    //     setRaffleId(params?.raffle_id);
    // }, [params?.RaffleId])

    useMemo(() => {
        (ticketSelectorApiCall === true) && setSuccessModalVisible(true)
    }, [ticketSelectorApiCall])

    const handleMinus = () => {
        setActivate(true);
        ticketsToGenerate.length !== 1 ? setTicketsCount({ id: TicketsCount.id - 1, value: TicketsCount.value - 1 }) : null;
    }
    const handlePlus = () => {
        setActivate(true);
        ticketsToGenerate.length !== TicketsCount.value ? setTicketsCount({ id: TicketsCount.id + 1, value: TicketsCount.value + 1 }) : null;
        data.is_launch_price !== true ? set_EntryCost(Number(data.entry_cost_gbp) * TicketsCount.value) : set_EntryCost(Number(data.discounted_entry_cost_gbp) * TicketsCount.value);
    }

    const goToCart = () => {
        navigation.navigate('Cart', { entryCost: _entryCost, CategoryID_id: data?.CategoryID_id });
        setSuccessModalVisible(false);
        setTicketSelectorApiCall(false);
        setButtonDisabled(false);
        setTicketSelectorCount(null);
    }

    const goToWithoutLoginCart = () => {
        navigation.navigate('WithoutLoginCart');
        setSuccessModalVisible(false);
    }

    const detailsTab = () => {
        setPrice(false);
        setDetails(true);
        setDescription(false);
    };
    const descriptionTab = () => {
        setDetails(false);
        setPrice(false);
        setDescription(true);
    };
    const priceTab = () => {
        setPrice(true);
        setDescription(false);
        setDetails(false);
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setButtonDisabled(false);
        });
        return unsubscribe;
    }, [navigation]);

    const onRefresh = useCallback(() => {
        if (isConnected) {
            setRefreshing(true);
            setTimeout(() => {
                _getRafflePageDataWithLogin(params?.RaffleId);
                setRefreshing(false);
            }, 1000);
        }
    }, [params?.RaffleId]);

    const Tab = ({ title, tab, handleOnpress, rightTab }) => {
        return (
            <TouchableOpacity style={[tab ? styles.activeButton : styles.inActiveButton, { borderLeftWidth: rightTab ? scale(1.24) : 0, borderRightWidth: rightTab ? 0 : scale(1.24) }]} onPress={() => handleOnpress()}>
                <Text style={tab ? styles.activeTabText : styles.inActiveTabText}>{title}</Text>
            </TouchableOpacity>
        )
    }

    const handleDropDownTickets = (id, value) => {
        setTicketsCount({ id: id, value: value })
        setIsDropdownPressed(!isDropdownPressed)
    }

    const onEndReached = () => setAllTicketsRendered(true);

    const handleOutsidePress = () => {
        if (isDropdownPressed) setIsDropdownPressed(false);
    };

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        container: {
            paddingBottom: responsiveHeight(25),
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            borderBottomLeftRadius: scale(8),
            borderBottomRightRadius: scale(8),
        },
        _image: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            borderRadius: scale(12),
        },
        SecondaryDataContainer: {
            paddingHorizontal: scale(14),
            paddingVertical: scale(14)
        },
        ProductContainer: {
            borderWidth: scale(1.5),
            borderRadius: scale(12),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.15)' : 'rgba(151, 151, 151, 0.1517)',
            paddingVertical: scale(20),
            backgroundColor: viewBackgroundColor
        },
        _ProductContainer: {
            borderWidth: scale(1.5),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'black' : 'rgba(151, 151, 151, 0.1517)',
            paddingVertical: scale(20),
            backgroundColor: viewBackgroundColor,
        },
        HeaderTitle: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            textAlign: 'center',
            marginHorizontal: scale(19)
        },
        PriceContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        PriceTextStyle: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgb(210,211,213)' : 'rgba(255, 255, 255, 0.15)',
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.5),
            textAlign: 'center',
            marginTop: scale(20),
            marginBottom: (isNullOrEmpty(data?.custom_raffle_id) || data?.is_unlimited_raffle === false) ? scale(20) : scale(0),
            paddingVertical: scale(5),
            paddingHorizontal: scale(15),
            borderRadius: scale(8)
        },
        DetailsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        Details: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: scale(10),
            // width: scale(10),
            marginBottom: scale(10)
        },
        cardText: {
            color: '#000616',
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.3),
            textAlign: 'center',
        },
        winningTicketWas: {
            color: theme.color,
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.8),
            textAlign: 'center',
        },
        winningTicketContainer: {
            borderColor: '#FFBD0A',
            borderWidth: scale(1),
            borderRadius: scale(2),
            alignItems: 'center',
            justifyContent: 'center'
        },
        winningTicketText: {
            color: '#FFBD0A',
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.8),
            paddingVertical: scale(2),
            paddingHorizontal: scale(4),
        },
        cardText1: {
            color: '#000616',
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.3),
            textAlign: 'center',
        },
        seeTermsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: scale(10)
        },
        seeTermsText: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: scale(13),
        },
        postalEntryText: {
            color: '#FFBD0A',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: scale(13),
        },
        ratingsContainer: {
            flexDirection: 'row',
            backgroundColor: '',
            gap: scale(25),
            justifyContent: 'center'
        },
        starsMainContainer: {
            gap: scale(6),
            alignItems: 'center',
            marginVertical: scale(15)
        },
        excellentText: {
            color: '#000616',
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
        basedText: {
            color: '#000616',
            fontSize: responsiveFontSize(1.2),
            fontFamily: 'Gilroy-ExtraBold',
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
            color: '#000616',
            fontSize: responsiveFontSize(2),
            fontWeight: 600
        },
        detailsContainer: {
            padding: scale(16),
            paddingHorizontal: scale(25),
            flex: 1,
        },
        tabText: {
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            fontSize: responsiveFontSize(2),
            color: '#000616'
        },
        tabsContainer: {
            backgroundColor: viewBackgroundColor,
            marginTop: scale(20),
            flexDirection: 'row',
            justifyContent: 'center',
            borderWidth: scale(2),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.15)' : 'rgba(151, 151, 151, 0.1517)',
            borderRadius: scale(6),
            width: '100%',
            height: scale(52),
            position: 'relative',
            zIndex: 1,
        },
        activeButton: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.05)' : '#070B1A',
            borderRadius: scale(6),
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(151, 151, 151, 0.151715)',
            borderWidth: scale(1.24),
            height: scale(48),
            margin: scale(0),
            padding: scale(0),
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
        },
        inActiveButton: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#030818',
            borderRadius: scale(6),
            borderWidth: scale(1.24),
            borderColor: 'transparent',
            height: scale(48),
            margin: scale(0),
            padding: scale(0),
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        activeTabText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            letterSpacing: scale(0.275)
        },
        inActiveTabText: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.4)' : 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            letterSpacing: scale(0.275)
        },
        tabCards: {
            width: '100%',
            paddingBottom: scale(10),
            overflow: 'hidden',
            marginBottom: nonInstance ? scale(8) : scale(0),
        },
        IncrementDecrementButton: {
            borderRadius: scale(6),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.196)',
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
            borderWidth: scale(1.24),
            width: 39,
            height: 40,
            marginHorizontal: scale(15),
            justifyContent: 'center',
            alignItems: 'center',
        },
        ticketsText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
        },
        addToCartText: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            justifyContent: 'center',
            alignItems: 'center',
        },
        TicketCounterContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F2F2F2' : '#FFFFFF',
            paddingTop: scale(14),
        },
        _TicketCounterContainer: {
            width: '100%',
            position: 'absolute',
            // flexDirection: 'column',
            // justifyContent: 'flex-end',
            // alignItems: 'flex-end',
            bottom: 0,
        },
        AddtoCartContainer: {
            backgroundColor: '#FFBD0A',
            marginHorizontal: scale(14),
            paddingHorizontal: scale(20),
            borderRadius: scale(6),
            height: scale(43),
            marginBottom: scale(7),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        AddtoCartContainerLoader: {
            backgroundColor: '#FFBD0A',
            marginHorizontal: scale(14),
            paddingHorizontal: scale(20),
            borderRadius: scale(6),
            height: scale(43),
            marginBottom: scale(7),
            justifyContent: 'center',
            alignItems: 'center'
        },
        TicketModal: {
            backgroundColor: 'rgb(64,64,64)'
        },
        modalView: {
            marginTop: scale(35),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(20),
            alignItems: 'center',
            height: '100%',
        },
        SuccessTicketModal: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0,0,0,0.9000000357627869)' : 'rgba(255,255,255,0.3000000357627869)',
            height: '100%'
        },
        SuccessModalView: {
            marginTop: scale(35),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(10),
            alignItems: 'center',
            paddingBottom: 23.69,
            borderColor: viewBackgroundColor === '#FFFFFF' ? '#00061633' : '#3d414e',
            borderWidth: scale(1),
        },
        imageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: scale(30),
            width: scale(40),
        },
        CalenderImageContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: scale(30),
            width: scale(40),
        },
        DropDownButtonStyle: {
            borderRadius: scale(6),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.196)',
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
            borderWidth: scale(1.24),
            width: scale(170),
            height: scale(43),
            justifyContent: 'center',
            alignItems: 'center',
        },
        TicketsDropdown: {
            height: scale(100)
        },
        endingTicketIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            height: scale(20),
            marginTop: scale(1.25)
        },
        dropdown3RowChildStyle: {
            flex: 1,
            flexDirection: 'row'
        },
        dropDownSingleTicketsContainer: {
            height: 34,
            alignItems: 'center',
            justifyContent: 'center'
        },
        dropDownText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.3),
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            textAlign: 'left',
            paddingHorizontal: scale(10)
        },
        NoImageToShow: {
            fontSize: responsiveFontSize(1.8),
            textAlign: 'center',
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000616',
        },
        dropDownContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 48,
            borderColor: theme.theme === 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.196)',
            backgroundColor: theme.theme === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
            borderWidth: 1.24,
            borderRadius: 6,
            position: 'relative'
        },
        dropDownTicketsContainer: {
            maxHeight: 200,
            alignSelf: 'center',
            borderColor: theme.theme === 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.196)',
            borderWidth: 1,
            borderBottomWidth: 0,
            borderRadius: 6,
        },
        dropdownFlatList: {
            backgroundColor: theme.background,
            width: 150,
            borderRadius: 6,
            paddingVertical: 8
        },
        horizontalLine: {
            height: 1,
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
        }
    });



    return (
        <>
            {
                isEmptyObject(data) ? <Loader /> :
                    <View style={styles.mainContainer} >
                        {
                            data?.is_expired ?
                                <RaffleEndedPage RaffleExpire={data?.RaffleExpire} coverPhoto={data?.MainImageUrl} RaffleId={params?.RaffleId} viewBackgroundColor={viewBackgroundColor} winnersData={data?.get_winners} title={data?.Title} descriptionData={data?.Description} details={data?.Specification} raffleType={data?.RaffleType} />
                                :
                                // <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={-100} style={styles.container}>
                                <>
                                    <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1, backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616' }} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} keyboardShouldPersistTaps='handled' />}>
                                        <View style={styles.container}>
                                            {data?.thumbnails === false ?
                                                <View style={{ height: scale(190) }}>
                                                    {data?.MiniImageUrl.length > 10 ? <Image source={{ uri: `${Url.ImageUrl}${data?.MainImageUrl}` }} style={styles.image} /> :
                                                        <LinearGradient colors={Common.common.noImagegradientColors} style={[styles.image, { justifyContent: 'center' }]}>
                                                            <Text style={styles.NoImageToShow} numberOfLines={2}>{Common.Home.NoImageToShow}</Text>
                                                        </LinearGradient>
                                                    }
                                                </View> :
                                                <View>
                                                    <ThumbNail images={data?.thumbnails} />
                                                </View>
                                            }
                                            {(!isEmptyObject(data) && !isEmptyArray(data?.get_winners) && !isEmptyArray(data?.TicketNo)) &&
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: scale(10), flexDirection: 'row' }}>
                                                    <Text style={styles.winningTicketWas}>{`${Common.InstantNonInstant.TheWinning} ${data?.get_winners?.length > 1 ? Common.InstantNonInstant.ticketsWere : Common.InstantNonInstant.ticketsWas} : `}</Text>
                                                    <View style={styles.winningTicketContainer}>
                                                        <Text style={styles.winningTicketText}> {data?.TicketNo[0]?.TicketNo}</Text>
                                                    </View>
                                                </View>
                                            }
                                            <View style={styles.SecondaryDataContainer}>
                                                <View style={styles.ProductContainer}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={[styles.HeaderTitle, { color: theme.color }]}>{data?.Title}</Text>
                                                    </View>
                                                    <View style={styles.PriceContainer}>
                                                        <Text style={[styles.PriceTextStyle, { color: theme.color }]}>£{data?.is_launch_price ? `${data?.discounted_entry_cost !== undefined ? data?.discounted_entry_cost : '0.00'}` : `${data?.entry_cost_gbp !== undefined ? data?.entry_cost_gbp : '0.00'}`}</Text>
                                                    </View>
                                                    <View style={(isNullOrEmpty(data?.custom_raffle_id) || data?.is_unlimited_raffle === false) ? { marginBottom: scale(24) } : {}}>
                                                        {((data?.percentage_sold !== undefined) && (isNullOrEmpty(data?.custom_raffle_id) || data?.is_unlimited_raffle === false)) && <SliderProgressBarTwo value={data?.percentage_sold} entries_sold={data?.entries_sold} total_entries={data?.total_entries} />}
                                                    </View>
                                                    <View style={styles.DetailsContainer}>
                                                        <View style={styles.Details}>
                                                            <View style={styles.imageContainer} >
                                                                <Image style={{ height: scale(17), width: scale(17), resizeMode: 'contain' }} source={viewBackgroundColor === '#FFFFFF' ? personDarkImg : personLightmg} />
                                                            </View>
                                                            <View>
                                                                <Text style={[styles.cardText, { color: theme.color }]}>{!data?.is_unlimited_entries ? `${data?.total_entries_per_player !== undefined ? data?.total_entries_per_player : ''} ${Common.InstantNonInstant.MAXPerPerson}` : `${data?.is_launch_price ? data?.discounted_entry_cost_gbp !== undefined ? data?.discounted_entry_cost_gbp : '' : data?.entry_cost_gbp !== undefined ? data?.entry_cost_gbp : ''} ${Common.InstantNonInstant.EntryPrice}`}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={styles.Details}>
                                                            <View style={styles.CalenderImageContainer} >
                                                                <Image style={{ height: scale(18), width: scale(16) }} source={viewBackgroundColor === '#FFFFFF' ? calenderIconBlack : calenderIconWhite} />
                                                            </View>
                                                            <View>
                                                                <Text style={[styles.cardText, { color: theme.color }]}>{`${Common.InstantNonInstant.DrawDate}\n${formattedDateTime(data?.RaffleExpire, Common.common.ddLLLhaFormat, Common.common.londonTimezone)}`}</Text>
                                                            </View>
                                                        </View>

                                                        <View style={styles.Details}>
                                                            <View style={[styles.imageContainer]} >
                                                                {isNullOrEmpty(data?.custom_raffle_id) && <Image style={{ height: scale(16), width: scale(18), resizeMode: 'contain' }} source={viewBackgroundColor === '#FFFFFF' ? TotalEntriesBlack : TotalEntriesLight} />}
                                                            </View>

                                                            <View>
                                                                {isNullOrEmpty(data?.custom_raffle_id) && !data?.is_cash_alternative_available && <Text style={[styles.cardText1, { color: theme.color }]}>{`${data?.total_entries !== undefined ? data?.total_entries.toLocaleString() : ''} \n${Common.InstantNonInstant.totalEntries}`}</Text>}
                                                                {isNullOrEmpty(data?.custom_raffle_id) && data?.is_cash_alternative_available && <Text style={[styles.cardText1, { color: theme.color }]}>{`${Common.InstantNonInstant.CASHALTAvailable}`}</Text>}
                                                            </View>
                                                        </View>
                                                    </View>
                                                    <View style={styles.seeTermsContainer}>
                                                        <Text style={[styles.seeTermsText, { color: theme.color }]}>{Common.InstantNonInstant.SeeTermsForFree} </Text><Text style={styles.postalEntryText} onPress={() => navigation.navigate('TermsAndConditions')}>{data?.isActive && (data?.isFlash ? Common.InstantNonInstant.telephoneEntry : Common.InstantNonInstant.postalEntry)}</Text>
                                                    </View>

                                                    {!isNullOrEmpty(data?.instant_win_image) &&
                                                        <View style={[{ maxHeight: responsiveHeight(8), marginHorizontal: scale(10), alignItems: 'center', }]}>
                                                            <Image source={{ uri: `${Url.webPImgUrl}${data?.instant_win_image}` }} style={styles._image} />
                                                        </View>}

                                                    <View style={styles.ratingsContainer}>
                                                        <TouchableOpacity style={styles.starsMainContainer} onPress={() => openLink(Url.TrustPilotLink)}>
                                                            <Text style={[styles.excellentText, { color: theme.color }]}>{Common.InstantNonInstant.Excellent}</Text>
                                                            <TouchableOpacity style={styles.starsContainer} onPress={() => openLink(Url.TrustPilotLink)}>
                                                                {[...Array(4)].map((ele, i) => <SingleStar starImageBackground={styles.starImageBackground} key={i} />)}
                                                                <LinearGradient colors={Common.common.gradientColors} start={Common.common.gradientStartPoint}
                                                                    end={Common.common.gradientEndPoint} locations={Common.common.gradientLocations} style={styles.starImageBackground}>
                                                                    <Image source={reviewStar} />
                                                                </LinearGradient>
                                                            </TouchableOpacity>
                                                            {/* <Text style={[styles.basedText, { color: theme.color }]}>Based on <Text style={styles.textUnderLine}>2,586 reviews</Text></Text> */}
                                                        </TouchableOpacity>
                                                        <View style={styles.bigReviewStarContainer}>
                                                            <Image source={bigReviewStar} />
                                                            <Text style={[styles.trustPilotText, { color: theme.color }]} onPress={() => openLink(Url.TrustPilotLink)}>{Common.InstantNonInstant.Trustpilot}</Text>
                                                        </View>
                                                    </View>
                                                </View>

                                                <View style={styles.tabsContainer}>
                                                    {data?.RaffleType !== 'Instant' ?
                                                        <>
                                                            <Tab title={Common.InstantNonInstant.Description} tab={description} handleOnpress={descriptionTab} />
                                                            <Tab title={Common.InstantNonInstant.Details} tab={details} handleOnpress={detailsTab} rightTab={true} />
                                                        </>
                                                        :
                                                        <>
                                                            <Tab title={Common.InstantNonInstant.Prizes} tab={price} handleOnpress={priceTab} />
                                                            <Tab title={Common.InstantNonInstant.Description} tab={description} handleOnpress={descriptionTab} rightTab={true} />
                                                        </>
                                                    }

                                                </View>
                                                <View style={{ borderBottomColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.2)' : 'rgba(255, 255, 255, 0.2)', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: scale(20) }} />
                                                <View>
                                                    {price && <Prices sortToggle={sortToggle} setSortToggle={setSortToggle} topPrices={topPrices} TotalTopPricesLength={TotalTopPricesLength} ActiveTopPricesLength={ActiveTopPricesLength} allPrices={allPrices} TotalAllPricesLength={TotalAllPricesLength} ActiveAllPricesLength={ActiveAllPricesLength} />}
                                                    {(details && !isNullOrEmpty(detailsData)) && <Details detailsData={detailsData} />}
                                                    {description && <Description descriptionData={descriptionData} />}
                                                </View>

                                            </View>
                                            {/* <Footer /> */}
                                        </View>
                                    </ScrollView>
                                    {(raffleEnded || raffleSoldOut) ?
                                        <View style={styles._TicketCounterContainer}>
                                            <ImageBackground source={viewBackgroundColor === '#FFFFFF' ? RectangleCurve : RectangleCurveWhite} style={styles.tabCards}>
                                                <View style={{ marginHorizontal: scale(10), marginTop: scale(50), height: scale(100), justifyContent: 'center', alignItems: 'center' }}><Text style={[styles.cardText, { color: theme.color, width: scale(180) }, styles._ProductContainer]}>{Common.InstantNonInstant.SorryThisRaffleHasEnded}</Text></View>
                                            </ImageBackground>
                                        </View>
                                        :
                                        <TouchableWithoutFeedback onPress={() => handleOutsidePress()}>
                                            <View style={styles._TicketCounterContainer}>
                                                {
                                                    isDropdownPressed &&
                                                    <View style={styles.dropDownTicketsContainer}>
                                                        <FlatList
                                                            style={styles.dropdownFlatList}
                                                            keyExtractor={(item, index) => `${index}${item.value}`}
                                                            data={ticketsToGenerate}
                                                            renderItem={({ item, index }) =>
                                                                <Pressable style={styles.dropDownSingleTicketsContainer}>
                                                                    <Pressable style={styles.dropdown3RowChildStyle} onPress={() => handleDropDownTickets(item.id, item.value)}>
                                                                        <FontAwesome name={'ticket'} size={18} style={styles.endingTicketIcon} />
                                                                        <Text style={styles.dropDownText}>{item.value}</Text>
                                                                    </Pressable>
                                                                    <View style={styles.horizontalLine}></View>
                                                                </Pressable>
                                                            }
                                                            ListFooterComponent={allTicketsRendered === true ? <></> :
                                                                <ActivityIndicator color={theme.color} style={{ marginBottom: 15 }} />
                                                            }
                                                            onEndReached={onEndReached}
                                                            onEndReachedThreshold={0.1}
                                                        />
                                                    </View>

                                                }
                                                <ImageBackground source={viewBackgroundColor === '#FFFFFF' ? RectangleCurve : RectangleCurveWhite} style={styles.tabCards}>
                                                    <View style={{ marginTop: scale(30) }}>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: scale(18), marginHorizontal: 20 }}>
                                                            <TouchableOpacity style={styles.IncrementDecrementButton} onPress={() => handleMinus()} >
                                                                <Image source={viewBackgroundColor === '#FFFFFF' ? minus : minusWhite} />
                                                            </TouchableOpacity>
                                                            <Pressable style={styles.dropDownContainer} onPress={() => setIsDropdownPressed(!isDropdownPressed)}>
                                                                {activate ? <Text style={styles.ticketsText}>{`   ${TicketsCount.value} ${TicketsCount.value == 1 ? Common.InstantNonInstant.ticket : Common.InstantNonInstant.tickets}`}</Text> : <Text style={styles.ticketsText}>{activate === false ? `   ${TicketsCount.value} ${TicketsCount.value == 1 ? Common.InstantNonInstant.ticket : Common.InstantNonInstant.tickets}` : `   ${Common.InstantNonInstant.zeroTickets}`}</Text>}
                                                            </Pressable>


                                                            {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                        <SelectDropdown
                                                            data={ticketsToGenerate}
                                                            // defaultValueByIndex={1}
                                                            // defaultValue={'Egypt'}
                                                            onSelect={(selectedItem, index) => {
                                                                selectedItem && setTicketsCount(selectedItem)
                                                                data?.is_launch_price !== true ? set_EntryCost(Number(data?.entry_cost_gbp) * selectedItem.value) : set_EntryCost(Number(data?.discounted_entry_cost_gbp) * selectedItem.value)
                                                            }}
                                                            renderCustomizedButtonChild={(selectedItem, index) => {
                                                                selectedItem = { id: 0, value: 0 }
                                                                let copiedSelectedItem = selectedItem;

                                                                copiedSelectedItem.id = TicketsCount.id;
                                                                copiedSelectedItem.value = TicketsCount.value;
                                                                return (
                                                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                                        {activate ? <Text style={styles.ticketsText}>{`   ${TicketsCount.value} ${TicketsCount.value == 1 ? Common.InstantNonInstant.ticket : Common.InstantNonInstant.tickets}`}</Text> : <Text style={styles.ticketsText}>{activate === false ? `   ${TicketsCount.value} ${TicketsCount.value == 1 ? Common.InstantNonInstant.ticket : Common.InstantNonInstant.tickets}` : `   ${Common.InstantNonInstant.zeroTickets}`}</Text>}
                                                                    </View>
                                                                );
                                                            }}
                                                            defaultButtonText={Common.InstantNonInstant.zeroTicket}
                                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                                let copiedSelectedItem = selectedItem;
                                                                copiedSelectedItem.id = TicketsCount.id;
                                                                copiedSelectedItem.value = TicketsCount.value;
                                                                return selectedItem
                                                            }}
                                                            // rowTextForSelection={(item, index) => {
                                                            //     return item;
                                                            // }}
                                                            buttonStyle={styles.DropDownButtonStyle}
                                                            // buttonTextStyle={styles.ticketsText}
                                                            renderDropdownIcon={isOpened => {
                                                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'transparent'} size={18} />;
                                                            }}
                                                            dropdownIconPosition={'right'}
                                                            dropdownStyle={{ backgroundColor: '#EFEFEF', justifyContent: 'flex-start', borderRadius: scale(6), borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.196)', borderWidth: scale(1.42), borderTopWidth: scale(1.42) }}
                                                            rowStyle={{ backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#EFEFEF' : 'rgb(13,18,34)', borderBottomColor: '#C5C5C5' }}
                                                            rowTextStyle={styles.dropDownText}
                                                            // selectedRowStyle={{ backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFF' }}
                                                            // selectedRowTextStyle={{ color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF' }}

                                                            renderCustomizedRowChild={(item, index) => {
                                                                return (
                                                                    <View style={styles.dropdown3RowChildStyle}>
                                                                        <FontAwesome name={'ticket'} size={18} style={styles.endingTicketIcon} />
                                                                        <Text style={styles.dropDownText}>{item.value}</Text>
                                                                    </View>
                                                                );
                                                            }}
                                                        />
                                                    </View> */}

                                                            <TouchableOpacity style={styles.IncrementDecrementButton} onPress={() => handlePlus()} >
                                                                <Image source={viewBackgroundColor === '#FFFFFF' ? plus : plusWhite} />
                                                            </TouchableOpacity>
                                                        </View>

                                                        <TouchableOpacity style={buttonDisabled === false ? styles.AddtoCartContainer : styles.AddtoCartContainerLoader} onPress={userToken ? () => { _addToCartWithLogin(); setButtonDisabled(true) } : () => addToCartWithoutLogin()} disabled={buttonDisabled}>
                                                            <>
                                                                {buttonDisabled === false ?
                                                                    <>
                                                                        <Text style={styles.addToCartText}>{Common.InstantNonInstant.AddToCart}</Text>
                                                                        <Text style={styles.addToCartText}>{!isNullOrEmpty(_entryCost) ? `£${Number(_entryCost)?.toFixed(2)}` : '£0.00'}</Text>
                                                                    </>
                                                                    :
                                                                    <ActivityIndicator color={'#000616'} />
                                                                }
                                                            </>
                                                        </TouchableOpacity>

                                                        {userToken ? ((details || nonInstant) && (isNullOrEmpty(data?.custom_raffle_id) || data?.is_unlimited_raffle === false)) &&
                                                            <TicketSelector ticketsState={ticketsState} setTicketSelectorApiCall={setTicketSelectorApiCall} nonInstant={nonInstant} _raffleId={_raffleId} entryCost={entryCost} viewBackgroundColor={viewBackgroundColor} totalEntries={totalEntries} goToCart={goToCart} setTicketSelectorCount={setTicketSelectorCount} />
                                                            : null
                                                        }
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    }
                                    {/* // </KeyboardAvoidingView> */}
                                </>
                        }
                    </View>
            }
            <Modal animationType="slide" transparent={true} visible={successModalVisible} onRequestClose={() => { setSuccessModalVisible(false); setTicketSelectorApiCall(false); setTicketSelectorCount(null) }} >
                <SafeAreaView style={{ flex: 1 }} >
                    <View style={styles.SuccessTicketModal}>
                        <View style={styles.SuccessModalView}>
                            <ScrollView style={{ flexGrow: 1 }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} >
                                <AddToCartModal theme={theme} goToCart={userToken ? goToCart : goToWithoutLoginCart} setTicketSelectorApiCall={setTicketSelectorApiCall} setSuccessModalVisible={setSuccessModalVisible} successModalVisible={successModalVisible} setButtonDisabled={setButtonDisabled} viewBackgroundColor={viewBackgroundColor} title={data?.Title} entries={ticketSelectorCount !== null ? ticketSelectorCount : TicketsCount.value} CategoryID_id={data?.CategoryID_id} setTicketSelectorCount={setTicketSelectorCount} />
                            </ScrollView>
                        </View>
                    </View>
                </SafeAreaView >
            </Modal>
        </>
    )
}

export default InstantContainer