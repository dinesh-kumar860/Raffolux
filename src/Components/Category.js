import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect, useCallback, useContext, useLayoutEffect, useRef } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

import { scrollToTop } from '../utils/scrollToTop';
import { isEmptyArray } from '../utils/utils';
import ThemeContext from '../utils/themes/themeWrapper';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';

import * as Common from '../helpers/common';
import ActivityIndicatorLoader from '../helpers/ActivityIndicatorLoader';

import Footer from './Footer';

import LiveCompetitionNew from './HomePageComponents/LiveCompetitionNew';

import { fetchCategoryWithLogin } from '../api/commonApi';

const Category = () => {
    const { isConnected } = useInternet()
    const navigation = useNavigation();
    const theme = useContext(ThemeContext);
    const route = useRoute();
    const params = route.params;
    const category = params.category;
    const scrollViewRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [isDataFetching, setIsDataFetching] = useState(false)

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme])

    const fetchCategory = async () => {
        setIsDataFetching(true)
        let dataObj = { categoryName: params.category === 'Tech' ? 'electronic' : params.category === 'Cars' ? 'car' : params.category === 'Holidays' ? 'holiday' : params.category.toLowerCase() }
        const response = await fetchCategoryWithLogin(dataObj)
        if (response) {
            setCategories(response.category_raffles);
            setIsDataFetching(false)
        }
        else {
            setIsDataFetching(false)
        }
    }

    useLayoutEffect(() => {
        setCategories([]);
        onRefresh();
    }, [])

    useEffect(() => {
        if (isConnected === true) {
            fetchCategory();
            scrollToTop(scrollViewRef);
        }
    }, [category, isConnected])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchCategory();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, [category]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            scrollToTop(scrollViewRef);
        });
        return unsubscribe;
    }, [navigation]);

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background,
        },
        container: {
            paddingHorizontal: scale(10),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F2F2F2' : '#000616'
        },
        TechRaffles: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.8),
            paddingTop: scale(20),
        },
        TitleContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        LiveComponents: {
            marginVertical: scale(25),
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: scale(5)
        },
        listTextContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: scale(40)
        },
        listText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#070B1A' : '#FFFFFF',
            fontFamily: 'Gilroy-SemiBold',
            fontSize: responsiveFontSize(2),
            opacity: scale(0.5)
        },
        loaderContainer: {
            flex: 1,
            height: 150,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    return (
        <View style={styles.mainContainer}>
            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <View style={styles.container}>
                    <View style={styles.TitleContainer}>
                        <Text style={styles.TechRaffles}>{`${category} ${Common.Category.Raffles}`}</Text>
                    </View>
                    <View style={styles.LiveComponents}>
                        {isDataFetching === false ?
                            !isEmptyArray(categories) ?
                                categories?.map((ele, i) =>
                                    <LiveCompetitionNew key={i} {...ele} raffleId={ele.id} />
                                )
                                :
                                <View style={styles.listTextContainer}>
                                    <Text style={styles.listText}>{`${Common.Category.NoRafflesFoundIn} ${category} ${Common.Category.category}`} </Text>
                                </View>
                            :
                            <View style={styles.loaderContainer}>
                                <ActivityIndicatorLoader theme={theme} />
                            </View>
                        }
                    </View>
                </View>
                <Footer onRefresh={onRefresh} refreshing={refreshing} />
            </ScrollView>
        </View>
    )
}

export default Category