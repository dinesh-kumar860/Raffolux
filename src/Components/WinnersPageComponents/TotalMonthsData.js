import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { fetchWinnersDatewiseDataWithLogin, fetchWinnersMonthWithLogin } from '../../api/winnersApi';

import SearchBarComponent from './SearchBarComponent';
import CurrentMonthData from './CurrentMonthData';
import SingleMonthTab from './SingleMonthTab';

import ThemeContext from '../../utils/themes/themeWrapper';
import ActivityIndicatorLoader from '../../helpers/ActivityIndicatorLoader';
import { isEmptyArray, isEmptyObject } from '../../utils/utils';
import { useInternet } from '../../utils/InternetConnection/InternetContextWrapper';


const TotalMonthsData = (props) => {
    const { setTotalWinnersNumber } = props;
    const { isConnected } = useInternet()
    const theme = useContext(ThemeContext);
    const [monthsData, setMonthsData] = useState({});
    const [selectedId, setSelectedId] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [currentMonthData, setCurrentMonthData] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    const fetchMonthTabs = async () => {
        let response = await fetchWinnersMonthWithLogin();
        !isEmptyObject(response) && setTotalWinnersNumber(response.totalWinners)
        !isEmptyObject(response) && setMonthsData(response)
        !isEmptyObject(response) && onPressMonth(response.monthsSet[0].monthCode, response.monthsSet[0].year, response.monthsSet[0].month)
        !isEmptyObject(response) && setSelectedId(response.monthsSet[0].monthCode)
        !isEmptyObject(response) && setSelectedYear(response.monthsSet[0].year)
        !isEmptyObject(response) && setSelectedMonth(response.monthsSet[0].month)
    };

    const onPressMonth = async (id, year, month) => {
        setDataLoading(true)
        setSelectedId(id)
        setSelectedYear(year)
        setSelectedMonth(month)
        let response = await fetchWinnersDatewiseDataWithLogin({ monthCode: id, year: year });
        if (response) {
            setDataLoading(false)
            setCurrentMonthData(response)
        } else {
            setDataLoading(false)
        }
    };

    const memoizedCallbackForMonth = useCallback((id, year, month) => onPressMonth(id, year, month), [selectedMonth])

    useEffect(() => {
        if (isConnected) {
            fetchMonthTabs()
        }
    }, [isConnected]);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.background,
            paddingTop: scale(15)
        },
        monthsFlatist: {
            marginLeft: scale(15)
        },
        searchCardContainer: {
            paddingHorizontal: scale(12),
            gap: scale(15),
        },
        item: {
            padding: scale(10),
            marginHorizontal: scale(7.5),
            borderRadius: scale(6)
        },
        title: {
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000616'
        },
        monthYearText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2.2),
            color: theme.color
        },
        datesWiseContainer: {
            gap: scale(20),
            marginBottom: scale(50)
        },
        noDataFound: {
            color: theme.color,
            textAlign: 'center',
            fontSize: responsiveFontSize(2),
            marginTop: scale(20)
        }
    })

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    style={styles.monthsFlatist}
                    data={monthsData?.monthsSet}
                    renderItem={({ item }) => (
                        <SingleMonthTab month={item.month} monthCode={item.monthCode} year={item.year} theme={theme} isActive={selectedId === item.monthCode} setSelectedMonth={setSelectedMonth} setSelectedId={setSelectedId} setSelectedYear={setSelectedYear} handleOnpress={memoizedCallbackForMonth} />
                    )}
                    keyExtractor={item => item.monthCode}
                    horizontal={true}
                />
            </View>
            <View style={styles.searchCardContainer}>
                <SearchBarComponent />
                <Text style={styles.monthYearText}>{selectedMonth?.toUpperCase()} {selectedYear}</Text>
                <View style={styles.datesWiseContainer}>
                    {
                        dataLoading === false ?
                            currentMonthData?.length > 0 ?
                                currentMonthData?.map((ele, i) => (
                                    <CurrentMonthData key={i} {...ele} theme={theme} selectedMonth={selectedMonth} selectedYear={selectedYear} />
                                ))
                                :
                                <Text style={styles.noDataFound}>No Data Found</Text>
                            :
                            <ActivityIndicatorLoader theme={theme} />
                    }
                </View>
            </View >
        </>
    )
}

export default TotalMonthsData

