import { StyleSheet, Text, View, Pressable, Image, ScrollView, Modal, RefreshControl } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import Loader from '../helpers/Loader';
import { Url } from '../helpers/routesApi';
import * as common from '../helpers/common';

import { timeFormatter } from '../utils/TimeFormatter';
import { isEmptyObject } from '../utils/utils';
import Header from '../utils/Header';
import ThemeContext from '../utils/themes/themeWrapper';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';

import { fetchPointsClaimRenderWithLogin, fetchPointsStoreWithLogin } from '../api/pointsStoreApi';

import StoreModal from './StorePointsComponents/StoreModal';
import MyRaffleTabs from './MyRafflesComponents/MyRaffleTabs';
import Footer from './Footer';

import StorePageRaffoluxSymbol from '../assets/Images/StorePageRaffoluxSymbol.png';
import ReferralPageRaffoluxSymbol from '../assets/Images/ReferralPageRaffoluxSymbol.png';
import pointsStoreEarnedTicket from '../assets/Images/pointsStoreEarnedTicket.png'


const PointsStore = ({ navigation }) => {
    const { isConnected } = useInternet()
    const storeBalance = useSelector((state) => state.getAccountData.storeBalance);
    const userName = useSelector((state) => state.getAccountData.data[0]?.first_name);

    const theme = useContext(ThemeContext);
    const [isActiveTab, setIsActiveTab] = useState(1);
    const [refreshing, setRefreshing] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [storeData, setStoreData] = useState({});
    const [earnedPointData, setEarnedPointData] = useState([])
    const [earnedDisplayedData, setEarnedDisplayedData] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [difference, setDifference] = useState(false)


    const latestOffersModel = async (ele) => {
        setModalVisible(true);
        setModalData(ele);
        let response = await fetchPointsClaimRenderWithLogin({ "item_id": ele.id })
        if (response) {
            response?.difference === true ? setDifference(true) : setDifference(false);
        }
    };

    const backArrowPress = () => navigation.goBack();

    const fetchPointsStoreDetails = async () => {
        let response = await fetchPointsStoreWithLogin();
        if (response) {
            !isEmptyObject(response) && setStoreData(response);
            !isEmptyObject(response) && setEarnedPointData(response.point_transaction)
            !isEmptyObject(response) && setEarnedDisplayedData(response.point_transaction.reverse().slice(0, 10))
        }
    };

    useEffect(() => {
        if (isConnected) {
            setTimeout(() => {
                setLoader(true);
            }, 2000);
            fetchPointsStoreDetails();
        }
    }, [storeBalance, isConnected]);

    const onRefresh = useCallback(() => {
        if (isConnected) {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        fetchPointsStoreDetails();
        setIsActiveTab(1)
    }
    }, []);


    const loadMore = () => {
        const remainingData = earnedPointData?.slice(earnedDisplayedData?.length);
        const nextChunk = remainingData?.slice(0, 10);
        setEarnedDisplayedData(prevData => [...prevData, ...nextChunk]);
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.background
        },
        TabsContainer: {
            flexDirection: 'row',
            marginTop: scale(16),
            marginLeft: scale(17),
            gap: scale(30)
        },
        singleTabConatiner: {
            justifyContent: "center",
            alignItems: 'center',
            width: scale(65)
        },
        tabText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            lineHeight: scale(16),
            color: '#1C1C27',
        },
        horizontalLine: {
            height: scale(1),
            borderWidth: scale(0.5),
            opacity: scale(0.1),
            borderColor: theme.color
        },
        raffoluxPointsContainer: {
            backgroundColor: 'rgba(20, 22, 40, 0.05)',
            paddingVertical: scale(14),
            marginTop: scale(22),
            marginHorizontal: scale(17),
            borderRadius: scale(6),
            borderWidth: 1,
            borderColor: theme.theme === 'dark' ? '#FFBD0A' : 'rgba(20, 22, 40, 0.05)',
            alignItems: "center",
            justifyContent: 'center',
            flexDirection: "row",
            gap: scale(7),
        },
        raffoluxPointsText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            color: theme.color,
            textAlign: 'center',
        },
        raffoluxImageTextContainer: {
            backgroundColor: "#000616",
            padding: scale(4),
            flexDirection: 'row',
            borderRadius: scale(4),
            gap: scale(3.5),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.theme === 'dark' ? '#FFBD0A' : 'rgba(20, 22, 40, 0.05)'
        },
        raffoluxSymbol: {
            resizeMode: "contain",
            width: scale(12),
            height: scale(12),
            paddingLeft: scale(4)
        },
        raffoluxPointNumber: {
            color: '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            paddingRight: scale(4)
        },
        offersText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            color: theme.color,
            opacity: scale(0.5),
            marginTop: scale(24),
            marginLeft: scale(17),
        },
        latestOffersContainer: {
            marginTop: scale(7),
            marginHorizontal: scale(17),
            gap: scale(16),
            flexDirection: "row",
        },
        singleCardContainer: {
            width: scale(240),
            height: scale(100),
            backgroundColor: "#25F3AA",
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderRadius: scale(6)
        },
        offerContainer: {
            backgroundColor: "#000616",
            width: scale(64),
            alignItems: "center",
            borderTopRightRadius: scale(1.62),
            borderBottomRightRadius: scale(1.62),
            marginTop: scale(8)
        },
        raffoluxOfferNumber: {
            color: '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1),
            marginLeft: scale(15),
            marginRight: scale(7),
            paddingVertical: scale(2)
        },
        cardImage: {
            width: scale(80),
            height: scale(100)
        },
        cardTitleContainer: {
            marginLeft: scale(16),
            gap: scale(5),
            marginTop: scale(8)
        },
        cardTitle: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            color: '#000616',
        },
        raffoluxImageRpContainerFlex: {
            flexDirection: 'row'
        },
        raffoluxImageRpContainer: {
            backgroundColor: "#000616",
            padding: scale(3),
            paddingHorizontal: scale(4),
            flexDirection: 'row',
            borderRadius: scale(10),
            gap: scale(3.5),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: scale(20)
        },
        allPrizesMainContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: scale(15),
            justifyContent: 'space-evenly',
            marginHorizontal: scale(6)
        },
        allPrizesContainer: {
            backgroundColor: '#00CAC1',
            flexDirection: 'row',
            borderRadius: scale(6),
            marginBottom: scale(6),
        },
        allPrizesCardImage: {
            width: scale(60),
            height: scale(56),
            marginVertical: scale(24)
        },
        allPrizesCardTextContainer: {
            marginTop: scale(16),
            marginLeft: scale(12),
            gap: scale(6)
        },
        cardTitleMargin: {
            width: scale(87),
            height: scale(35)
        },
        modelContainer: {
            marginTop: scale(50),
            flex: 1,
            paddingTop: scale(16),
            paddingHorizontal: scale(16),
            backgroundColor: theme.theme === 'dark' ? 'rgba(0,0,0,0.9000000357627869)' : 'rgba(255,255,255,0.9000000357627869)'
        },
        singleCardMainContainer: {
            gap: scale(8),
            marginTop: scale(15),
            marginHorizontal: scale(17),
            marginBottom: scale(24)
        },
        singleCardContainer1: {
            flexDirection: 'row',
            gap: scale(8),
            backgroundColor: theme.theme === 'dark' ? 'rgba(40, 41, 61, 0.5)' : 'rgba(0,0,0,0.05)',
            paddingVertical: scale(12),
            paddingRight: scale(24),
            paddingLeft: scale(12),
            borderRadius: scale(4)
        },
        imageContainer: {
            height: scale(37),
            width: scale(37),
            borderRadius: scale(50),
            alignItems: 'center',
            justifyContent: 'center'
        },
        cardImageContainer1: {
            height: scale(32),
            width: scale(32),
            alignItems: 'center',
            justifyContent: "center",
            borderRadius: scale(50)
        },
        cardImage1: {
            resizeMode: 'contain',
            height: scale(18),
            width: scale(18),
            borderRadius: scale(50)
        },
        cardTextContainer1: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        cardTextTitle: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.7),
            lineHeight: scale(19.1),
            color: theme.color
        },
        cardDate: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            lineHeight: scale(16.37),
            color: theme.color,
            opacity: scale(0.5)
        },
        CardAmount: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.7),
            lineHeight: scale(19.1),
            color: theme.theme === 'dark' ? '#FFBD0A' : '#000616',
            alignSelf: 'center'
        },
        earnedhorizontalLine: {
            height: scale(1),
            borderWidth: scale(0.7),
            opacity: scale(0.1),
            marginTop: scale(8),
            marginHorizontal: scale(16),
            borderColor: theme.color
        },
        loadMoreText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            color: theme.theme === 'dark' ? '#FFBD0A' : '#000616',
            textAlign: 'center',
            lineHeight: scale(21.8),
            marginBottom: scale(24)
        },
        footerContainer: {
            marginTop: scale(70)
        }
    })

    return (
        <>{!loader ? <Loader /> :
            <>
                <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <Header title={'Points Store'} theme={theme} backArrowPress={backArrowPress} />
                    <View style={styles.TabsContainer}>
                        {
                            common.pointsStore.tabsData.map((ele, i) =>
                                <MyRaffleTabs key={i} theme={theme} title={ele} onPress={() => setIsActiveTab(i + 1)} isActive={isActiveTab === i + 1} page={'PointsStore'} />
                            )
                        }
                    </View>
                    <View style={styles.horizontalLine}>
                    </View>
                    <View style={styles.raffoluxPointsContainer}>
                        <Text style={styles.raffoluxPointsText}>{common.pointsStore.YouHave}</Text>
                        <View style={styles.raffoluxImageTextContainer}>
                            <Image style={styles.raffoluxSymbol} source={theme.theme === 'light' ? StorePageRaffoluxSymbol : ReferralPageRaffoluxSymbol} />
                            <Text style={[styles.raffoluxPointNumber]}>{Math.abs(Number(storeBalance))}</Text>
                        </View>
                        <Text style={styles.raffoluxPointsText}>{common.pointsStore.RaffoluxPoints}</Text>
                    </View>
                    {
                        isActiveTab === 1 &&
                        <>
                            <Text style={styles.offersText}>{common.pointsStore.LATESTOFFERS}</Text>
                            <ScrollView horizontal={true}>
                                <View style={styles.latestOffersContainer}  >
                                    {
                                        storeData.Discounted_storeItem?.map((ele, i) => (
                                            <Pressable style={[styles.singleCardContainer, { backgroundColor: ele.color }]} onPress={() => latestOffersModel(ele)} key={i}>
                                                <View >
                                                    <View style={styles.offerContainer}><Text style={styles.raffoluxOfferNumber}>{Math.round(ele.descounted_point_prize / ele.point_prize * 100)}{common.pointsStore.OFF}</Text></View>
                                                    <View style={styles.cardTitleContainer}>
                                                        <Text style={styles.cardTitle}>{ele.item_name}</Text>
                                                        <View style={styles.raffoluxImageRpContainerFlex}>
                                                            <View style={styles.raffoluxImageRpContainer}>
                                                                <Image style={styles.raffoluxSymbol} source={StorePageRaffoluxSymbol} />
                                                                <Text style={styles.raffoluxPointNumber}>{(Number(ele.point_prize) - Number(ele.descounted_point_prize)).toLocaleString()} {common.common.RP}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Image style={styles.cardImage} source={{ uri: `${Url.ImageUrl}${ele.image}`, }} />
                                                </View>
                                            </Pressable>
                                        ))
                                    }
                                    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(false); }}>
                                        <View style={styles.modelContainer}>
                                            <StoreModal modalVisible={modalVisible} setModalVisible={setModalVisible} modalData={modalData} storeBalance={storeBalance} userName={userName} difference={difference} />
                                        </View>
                                    </Modal>
                                </View>
                            </ScrollView>

                            <Text style={styles.offersText}>{common.pointsStore.ALLPRIZES}</Text>
                            <View style={styles.allPrizesMainContainer}>
                                {
                                    storeData.Without_Discounted_storeItem?.map((ele, i) => (
                                        <Pressable style={[styles.allPrizesContainer, { backgroundColor: ele.color }]} onPress={() => latestOffersModel(ele)} key={i}>
                                            <View style={styles.allPrizesCardTextContainer}>
                                                <Text style={[styles.cardTitle, styles.cardTitleMargin]}>{ele.item_name}</Text>
                                                <View style={styles.raffoluxImageRpContainer}>
                                                    <Image style={styles.raffoluxSymbol} source={StorePageRaffoluxSymbol} />
                                                    <Text style={styles.raffoluxPointNumber}>{Number(ele.point_prize).toLocaleString()} RP</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Image style={styles.allPrizesCardImage} source={{ uri: `${Url.ImageUrl}${ele.image}`, }} />
                                            </View>
                                        </Pressable>
                                    ))
                                }
                            </View>
                        </>
                    }

                    {
                        isActiveTab === 2 &&
                        <>
                            <View style={styles.earnedhorizontalLine}></View>
                            <View style={styles.singleCardMainContainer}>
                                {
                                    earnedDisplayedData?.length > 0 && earnedDisplayedData?.map((ele, i) => (
                                        (ele.value >= 0 && ele.value < 1) ? null :
                                            <View style={styles.singleCardContainer1} key={i} >
                                                <View style={styles.imageContainer}>
                                                    <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.cardImageContainer1}>
                                                        <Image style={styles.cardImage1} source={pointsStoreEarnedTicket} />
                                                    </LinearGradient>
                                                </View>
                                                <View style={styles.cardTextContainer1}>
                                                    <View >
                                                        <Text style={styles.cardTextTitle}>{ele.message}</Text>
                                                        <Text style={styles.cardDate}>
                                                            {timeFormatter(ele.created_at, 'PointsStore')}
                                                        </Text>
                                                    </View>
                                                    <Text style={styles.CardAmount}>{(ele.value) < 0 ? `-${ele.value * -1}` : `+${Math.abs(ele.value)}`}RP</Text>
                                                </View>
                                            </View>
                                    ))
                                }
                            </View>
                            {earnedDisplayedData?.length < storeData.point_transaction?.length && (
                                <Text style={styles.loadMoreText} onPress={() => loadMore()}>{common.common.loadMore}</Text>
                            )}
                        </>
                    }
                    <View style={styles.footerContainer}>
                        {/* <Footer /> */}
                    </View>
                </ScrollView>
            </>
        }
        </>
    )
}

export default PointsStore

