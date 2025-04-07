import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useContext, useState, useCallback } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';

import ThemeContext from '../utils/themes/themeWrapper';
import Header from '../utils/Header';
import { isEmptyObject } from '../utils/utils';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';

import Loader from '../helpers/Loader';
import * as common from '../helpers/common';
import ActivityIndicatorLoader from '../helpers/ActivityIndicatorLoader';

import Footer from './Footer';
import MyCreditMainCard from './MyCreditComponents/MyCreditMainCard';

import { fetchMyCreditWithLogin, fetchOlderCreditWithLogin } from '../api/myCreditApi';


const MyCredit = ({ route, navigation }) => {
    const theme = useContext(ThemeContext);
    const { isConnected } = useInternet()
    const [loader, setLoader] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [olderData, setOlderData] = useState([]);
    const [olderDataCount, setOlderDataCount] = useState(null)
    const [oldDataPageCount, setOldDataPageCount] = useState(1);
    const [olderDataLoading, setOlderDataLoading] = useState(false)
    const [creditData, setCreditData] = useState({});
    const creditBalance = useSelector((state) => state.getAccountData.creditBlance)

    const backArrowPress = () => navigation.goBack();

    const fetchCreditData = async () => {
        let response = await fetchMyCreditWithLogin();
        !isEmptyObject(response) && setCreditData(response);
    };

    const fetchMyCreditOldData = async (pageNumber) => {
        setOlderDataLoading(true)
        setOldDataPageCount(pageNumber)
        const result = await fetchOlderCreditWithLogin({ pageNumber: pageNumber })
        !isEmptyObject(result) && setOlderDataCount(result.count)
        if (result) {
            setOlderDataLoading(false)
            if (pageNumber === 1) {
                setOlderData(result.olderCreditData);
            } else {
                setOlderData(prevData => [...prevData, ...result.olderCreditData]);
            }
        }
    }

    useEffect(() => {
        if (isConnected) {
            setTimeout(() => {
                setLoader(true);
            }, 2000);
            fetchMyCreditOldData(1);
            fetchCreditData();
        }
    }, [creditBalance, isConnected])


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setLoader(true);
            fetchMyCreditOldData(1);
            fetchCreditData()
            setRefreshing(false);
        }, 3000);
    }, []);


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();
    let month = months[d.getMonth()];

    const styles = StyleSheet.create({
        mainCont: {
            flex: 1,
            backgroundColor: theme.background
        },
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        container: {
            backgroundColor: theme.background
        },
        creditBalanceContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: scale(30)
        },
        creditBalanceText: {
            fontFamily: 'Gilroy-ExtraBold',
            opacity: scale(0.5),
            fontSize: responsiveFontSize(1.5),
            lineHeight: scale(14.7),
            color: theme.color
        },
        creditBalanceNumber: {
            fontFamily: 'Gilroy-ExtraBold',
            opacity: scale(0.9),
            fontSize: responsiveFontSize(5),
            lineHeight: scale(43),
            color: theme.theme === 'dark' ? '#FFBD0A' : '#000616',
            letterSpacing: scale(1.18)
        },
        creditBalanceFloatNumber: {
            fontSize: responsiveFontSize(3.5)
        },
        horizontalLine: {
            height: scale(1),
            borderWidth: scale(0.5),
            opacity: scale(0.1),
            marginHorizontal: scale(15),
            borderColor: theme.color
        },
        recentActivity: {
            paddingLeft: scale(15),
            paddingBottom: scale(15),
            paddingTop: scale(22)
        },
        cardContainer: {
            backgroundColor: theme.theme === 'dark' ? '#141628' : '#FFFFFF',
            marginHorizontal: scale(15),
            paddingHorizontal: scale(15),
            paddingVertical: scale(15),
            borderRadius: scale(12),
            elevation: scale(4),
            gap: scale(32)
        },
        noDataContainer: {
            alignSelf: 'center',
            marginVertical: scale(30),
            marginHorizontal: scale(17)
        },
        noDataText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            lineHeight: scale(19.1),
            textAlign: 'center',
            color: theme.color
        },
        footerContainer: {
            marginTop: scale(30),
        },
        loadMoreText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            color: theme.theme === 'dark' ? '#FFBD0A' : theme.color,
            textAlign: 'center',
            lineHeight: scale(21.8),
            marginBottom: scale(24)
        },

    })

    return (
        <>{!loader ? <Loader /> :
            <View style={styles.mainCont}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                    <View style={styles.mainContainer}>
                        <Header title={'My Credit'} theme={theme} backArrowPress={backArrowPress} />
                        <View style={styles.container}>
                            <View style={styles.creditBalanceContainer}>
                                <Text style={styles.creditBalanceText}>{common.myCredit.creditBalance}</Text>
                                <Text style={styles.creditBalanceNumber}>£{!isEmptyObject(creditData) && creditData?.credit_wallet[0]?.balance?.split('.')[0]}<Text style={[styles.creditBalanceNumber, styles.creditBalanceFloatNumber]}>.{ !isEmptyObject(creditData) && creditData?.credit_wallet[0]?.balance.split('.')[1]}</Text></Text>
                            </View>
                            <View style={styles.horizontalLine}>
                            </View>
                            {
                                creditData.today_transactions?.length > 0 || creditData.this_week_transaction?.length > 0 || creditData.this_month_transactions?.length > 0 || olderData?.length > 0 ?
                                    <View>
                                        <Text style={[styles.creditBalanceText, styles.recentActivity]}>{common.myCredit.recentActivity}</Text>
                                        <View style={styles.cardContainer}>
                                            {
                                                creditData.today_transactions?.length > 0 &&
                                                <MyCreditMainCard theme={theme} data={creditData.today_transactions} title={common.myCredit.today} />
                                            }
                                            {
                                                creditData.this_week_transaction?.length > 0 &&
                                                <MyCreditMainCard theme={theme} data={creditData.this_week_transaction} title={common.myCredit.thisWeek} />
                                            }
                                            {
                                                creditData.this_month_transactions?.length > 0 &&
                                                <MyCreditMainCard theme={theme} data={creditData.this_month_transactions} title={month.toUpperCase()} />
                                            }
                                            {
                                                olderData?.length > 0 &&
                                                <>
                                                    <MyCreditMainCard theme={theme} data={olderData} title={'OLDER'} />
                                                    {
                                                        olderDataLoading === false ?
                                                            olderDataCount > olderData?.length && <Text style={styles.loadMoreText} onPress={() => { fetchMyCreditOldData(oldDataPageCount + 1); }}>+ load more</Text>
                                                            :
                                                            <ActivityIndicatorLoader theme={theme} />
                                                    }
                                                </>
                                            }

                                        </View>
                                    </View>
                                    :
                                    <View style={styles.noDataContainer}>
                                        <Text style={styles.noDataText}>{common.myCredit.youcanEarn}</Text>
                                    </View>
                            }
                        </View>
                        <View style={styles.footerContainer}>
                            {/* <Footer /> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        }
        </>
    )
}

export default MyCredit;

