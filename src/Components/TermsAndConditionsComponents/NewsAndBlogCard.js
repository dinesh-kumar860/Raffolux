import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { Url } from '../../helpers/routesApi';
import { fetchNews } from '../../api/newsAndBlogsApi';
import { useNavigation } from '@react-navigation/native';
import { timeFormatter } from '../../utils/TimeFormatter';

import * as common from '../../helpers/common'
import { isEmptyArray } from 'formik';


const NewsAndBlogCard = (props) => {
    const { theme, id, title, img_url, created_on, card_description, slug } = props;
    const navigation = useNavigation()

    const openNews = async () => {
        let result = await fetchNews({ slug: slug })
        if (result) {
            !isEmptyArray(result) && navigation.navigate('News', { data: result })
        }
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.theme === 'dark' ? '#070B1A' : '#FFF',
            elevation: scale(4),
            borderRadius: scale(12)
        },
        imageContainer: {
            height: 245,
            width: '100%',
        },
        image: {
            minHeight: 245,
            width: '100%',
            resizeMode: 'stretch',
            borderTopRightRadius: scale(12),
            borderTopLeftRadius: scale(12)
        },
        textContainer: {
            gap: scale(10),
            marginHorizontal: scale(16),
            marginTop: scale(17),
            marginBottom: scale(24)
        },
        feelGoodContainer: {
            backgroundColor: '#FFBD0A',
            borderRadius: scale(6),
            height: 21,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center'
        },
        feelGoodText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            color: '#000616'
        },
        titleText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.3),
            color: theme.color,

        },
        dateText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            color: theme.color
        }
    })
    return (
        <Pressable style={styles.container} onPress={() => openNews()}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: `${Url.ImageUrl}${img_url}`, }} />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.feelGoodContainer}>
                    <Text style={styles.feelGoodText}>{common.NewsAndBlogs.feelGood}</Text>
                </View>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={[styles.dateText, { color: theme.theme === 'dark' ? '#FFBD0A' : '#000616' }]}>{timeFormatter(created_on, 'NewsAndBlogs')}  {common.NewsAndBlogs.MinRead}</Text>
                <Text style={[styles.dateText, { opacity: scale(0.6), fontSize: responsiveFontSize(1.8) }]}>{card_description}</Text>
            </View>
        </Pressable>
    )
}

export default NewsAndBlogCard

