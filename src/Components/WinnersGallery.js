import { StyleSheet, Text, View, ScrollView, Pressable, ImageBackground, RefreshControl, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { responsiveFontSize, } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { fetchWinnersGalleryWithLogin } from '../api/winnersGalleryApi';

import ThemeContext from '../utils/themes/themeWrapper';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';
import { isEmptyArray } from '../utils/utils';

import { Url } from '../helpers/routesApi';
import * as common from '../helpers/common'
import Loader from '../helpers/Loader';
import ActivityIndicatorLoader from '../helpers/ActivityIndicatorLoader';

import Footer from './Footer';


const WinnersGallery = () => {
    const navigation = useNavigation();
    const { isConnected } = useInternet();
    const theme = useContext(ThemeContext);
    const [winners, setWinners] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [allItemsRendered, setAllItemsRendered] = useState(false);

    const onEndReached = () => setAllItemsRendered(true);

    const getWinnersImages = async () => {
        let response = await fetchWinnersGalleryWithLogin();
        if (response) {
            !isEmptyArray(response) && setWinners(response)
        }
    }

    useEffect(() => {
        if (isConnected) {
            getWinnersImages()
        }
    }, [isConnected]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getWinnersImages();
        setTimeout(() => {
            setRefreshing(false);
        }, 3000);
    }, []);

    const formattedDate = (timestamp) => {
        const inputDate = new Date(timestamp);
        const day = String(inputDate.getUTCDate()).padStart(2, '0');
        const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
        const year = inputDate.getUTCFullYear();
        const outputDateString = `${day} / ${month} / ${year}`;
        return outputDateString
    }

    const splitText = (text) => {
        let text1 = text.split(" - ")
        return text1[1]
    }

    const imageDetails = (index) => setSelectedImage(index)

    const renderImage = ({ item }) => {
        return (
            <Pressable style={[styles.singleImageContainer, { backgroundColor: theme.theme === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)' }]} onPress={() => imageDetails(item.id)} >
                <ImageBackground style={styles.imageStyle} source={{ uri: `${Url.ImageUrl}${item.ImgUrl}`, }} imageStyle={{ borderRadius: scale(12) }} >
                    {
                        item.id == selectedImage &&
                        <View style={styles.imageCardContainer} >
                            <View>
                                <Text style={styles.nameText}>{item.first_name} {item.last_name[0]}</Text>
                                <Text style={styles.timeText}>{formattedDate(item.created_at)}</Text>
                                <Text style={styles.description} numberOfLines={3}>{common.common.Won} {item.DrawName.includes(' - ') ? splitText(item.DrawName) : item.DrawName} {common.WinnersGallery.withLuckyTicketNumber} {item.TicketNo}</Text>
                            </View>
                            <View style={{ marginBottom: scale(10) }}>
                                <Pressable style={[styles.buttonContainer, { marginTop: scale(8) }]} onPress={() => navigation.navigate('DrawDetails', { drawCode: item.DrawCode })}>
                                    <Text style={styles.buttonText}>{common.WinnersGallery.drawDetails}</Text>
                                </Pressable>
                                <Pressable style={[styles.buttonContainer, { marginTop: scale(5) }]} onPress={() => navigation.navigate('Winners')}>
                                    <Text style={styles.buttonText}>{common.WinnersGallery.winnersList}</Text>
                                </Pressable>
                            </View>
                        </View>
                    }
                </ImageBackground>
            </Pressable>
        )
    }

    return (
        <>
            {!isEmptyArray(winners) ?
                    <FlatList
                        data={winners}
                        renderItem={renderImage}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.container}
                        numColumns={2}
                        style={{ backgroundColor: theme.background }}
                        ListHeaderComponent={
                            <Text style={[styles.winnersGalleryText, { color: theme.color }]}>
                                {common.WinnersGallery.winnersGallery}
                            </Text>
                        }
                        ListFooterComponent={allItemsRendered === true ?
                            <>
                                <View>
                                    <Text style={[styles.text, { color: theme.color }]}>
                                        {common.WinnersGallery.YouReachedEnd}
                                    </Text>
                                    <Pressable onPress={() => navigation.navigate('Home')}>
                                        <LinearGradient colors={['#FFD70D', '#FFAE05']} style={[styles.LiveRafflesButton]}>
                                            <Text style={styles.LiveRafflesText}>{common.WinnersGallery.liveRaffles}</Text>
                                        </LinearGradient>
                                    </Pressable>
                                </View>
                                {/* <Footer /> */}
                            </>
                            :
                            <View style={{ height: 150 }}>
                                <ActivityIndicatorLoader theme={theme} />
                            </View>
                        }
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.1}
                    />
                :
                <Loader />
            }
        </>


    )
};

export default WinnersGallery;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    winnersGalleryText: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(3),
        textAlign: 'center',
        marginTop: scale(24),
        marginBottom: scale(32),
        opacity: scale(0.9),
        lineHeight: scale(29)
    },
    singleImageContainer: {
        marginBottom: scale(15),
        marginLeft: scale(15),
        borderRadius: scale(12)
    },
    imageStyle: {
        height: scale(164),
        width: scale(154),
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: responsiveFontSize(2),
        letterSpacing: scale(0.5),
        lineHeight: scale(24),
        textAlign: 'center',
        marginHorizontal: scale(25),
        opacity: scale(0.8),
        marginTop: scale(33)
    },
    LiveRafflesButton: {
        alignSelf: 'center',
        width: scale(180),
        height: scale(48),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(6),
        marginTop: scale(24),
        marginBottom: scale(48)
    },
    LiveRafflesText: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2.1),
        color: '#000616'
    },
    imageCardContainer: {
        backgroundColor: "rgba(0,0,0,0.8)",
        borderRadius: scale(6),
        height: scale(144),
        width: scale(134),
        justifyContent: 'space-between'
    },
    buttonContainer: {
        height: 30,
        width: 100,
        marginHorizontal: scale(15),
        borderColor: 'rgba(255,255,255,0.6)',
        borderWidth: scale(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(4),
        alignSelf: 'center'
    },
    nameText: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: 'Gilroy-ExtraBold',
        textAlign: 'center',
        color: '#FFFFFF',
        marginTop: scale(5),

    },
    timeText: {
        color: '#FFBD0A',
        fontSize: responsiveFontSize(1.2),
        fontFamily: 'NunitoSans-Regular',
        textAlign: 'center',
    },
    description: {
        fontSize: responsiveFontSize(1.2),
        fontFamily: 'NunitoSans-SemiBold',
        textAlign: 'center',
        color: '#FFFFFF',
        paddingHorizontal: scale(5)
    },
    buttonText: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: 'NunitoSans-SemiBold',
        textAlign: 'center',
        color: '#FFFFFF'
    }
})