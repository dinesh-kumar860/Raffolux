import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";

import NewsAndBlogCard from './TermsAndConditionsComponents/NewsAndBlogCard';
import { fetchNewsAndBlogs } from '../api/newsAndBlogsApi';

import * as common from '../helpers/common'
import ThemeContext from '../utils/themes/themeWrapper';
import { isEmptyArray } from '../utils/utils';
import Loader from '../helpers/Loader';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';

const NewsAndBlog = () => {
    const theme = useContext(ThemeContext);
    const { isConnected } = useInternet()
    const [newsAndBlogsData, setNewsAndBlogData] = useState([])

    const fetchNewsAndBlog = async () => {
        let result = await fetchNewsAndBlogs();
        if (result) {
            !isEmptyArray(result) && setNewsAndBlogData(result)
        }
    };

    useEffect(() => {
        if (isConnected === true) {
            fetchNewsAndBlog();
        }
    }, [isConnected])

    const styles = StyleSheet.create({
        mainContainer:{
            flex:1,
            backgroundColor:theme.background
        },
        container: {
            paddingHorizontal: scale(15),
            paddingBottom: scale(150)
        },
        headerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            textAlign: 'center',
            color: '#000616',
            marginVertical: scale(22)
        },
        cardsContainer: {
            gap: scale(15)
        }
    });

    return (
        <View style={styles.mainContainer}>
            {
                !isEmptyArray(newsAndBlogsData) ?
                    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: theme.background }}>
                        <View style={styles.container}>
                            <Text style={styles.headerText}>{common.NewsAndBlogs.NewsAndBlog}</Text>
                            <View style={styles.cardsContainer}>
                                {
                                    newsAndBlogsData?.map((ele, i) => (<NewsAndBlogCard theme={theme} key={i} {...ele} />))
                                }
                            </View>
                        </View>
                    </ScrollView>
                    :
                    <Loader />
            }
        </View>

    )
}

export default NewsAndBlog

