import { Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useContext } from 'react'
import RenderHtml from 'react-native-render-html';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import ThemeContext from '../utils/themes/themeWrapper';
import { Url } from '../helpers/routesApi';
import { timeFormatter } from '../utils/TimeFormatter';
import * as common from '../helpers/common'


const News = ({ route }) => {
    const { data } = route.params;
    const { width } = useWindowDimensions();
    const theme = useContext(ThemeContext);

    const source = { html: `${data[0]?.content}` };

    const styles = StyleSheet.create({
        mainContainer:{
            flex: 1,
            backgroundColor: theme.background
        },
        container: {
            flex: 1,
            paddingHorizontal: scale(15),
            paddingVertical: scale(30),
            backgroundColor: theme.background
        },
        miniHeader: {
            color: theme.color,
            fontFamily: 'NunitoSans',
            fontSize: responsiveFontSize(1.8),
            opacity: scale(0.5)
        },
        header: {
            fontFamily: 'Gilroy-Bold',
            fontSize: responsiveFontSize(3),
            letterSpacing: scale(0.417),
            color: theme.color,
            opacity: scale(0.9),
            marginTop: scale(30)
        },
        writtenByContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(20),
            marginTop: scale(30)
        },
        writtenCircle: {
            height: 40,
            width: 40,
            backgroundColor: '#D9D9D9',
            borderRadius: scale(50)
        },
        imageContainer: {
            height: 343,
            width: '100%',
            marginVertical: scale(30)
        },
        image: {
            height: '100%',
            width: '100%',
            resizeMode: 'stretch',
            borderRadius: scale(11)
        }
    });

    const renderersProps = {
        body: { color: theme.color }
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.miniHeader}>{common.NewsAndBlogs.NewsBlog}   {data[0]?.title}</Text>
                    <Text style={styles.header}>{data[0]?.title}</Text>
                    <View style={styles.writtenByContainer}>
                        <View style={styles.writtenCircle}></View>
                        <Text style={[styles.miniHeader, { opacity: scale(0.8) }]}>{common.NewsAndBlogs.writtenByRaffolux}  {timeFormatter(data[0]?.created_on, 'NewsAndBlogsNewsPAge')} </Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: `${Url.ImageUrl}${data[0]?.img_url}`, }} />
                    </View>
                    <View style={styles.miniHeader}>
                        <RenderHtml contentWidth={width} source={source} tagsStyles={renderersProps} />
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default News

