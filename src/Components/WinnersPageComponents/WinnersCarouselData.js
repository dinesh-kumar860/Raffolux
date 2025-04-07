import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import * as common from '../../helpers/common';
import { Url } from '../../helpers/routesApi';
import SplitName from '../../helpers/SplitName';

import drawNote from '../../assets/Images/drawmageLightTheme.png'
import drawImageDarkTheme from '../../assets/Images/drawImageDarkTheme1.png'

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6)

const WinnersCarouselData = ({ item, theme }) => {
    const navigation = useNavigation();

    return (
        <View style={[styles.cardImageContainer, { backgroundColor: theme.theme === 'dark' ? '#141628' : '#FFFFFF', borderColor: theme.theme === 'dark' ? 'rgba(151, 151, 151, 0.399639)' : 'rgba(0, 6, 22, 0.246203)' }]} >
            <Image source={{ uri: `${Url.ImageUrl}${item.MiniImageUrl}`, }} style={styles.humanImageStyle} alt='image' />
            <Text style={[styles.nameText, { color: theme.color }]} numberOfLines={1}>{SplitName(item.Name)}</Text>
            <Text style={[styles.raffleText, { color: theme.color }]} numberOfLines={1}>{item.Title}</Text>
            <TouchableOpacity style={[styles.drawDetailsContainer, { backgroundColor: theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF' }]} onPress={() => { item.type === 'Instant' ? navigation.navigate('InstantContainer', { RaffleId: item.RaffleCode, }) : navigation.navigate('DrawDetails', { drawCode: item.DrawCode, RaffleId: item.RaffleCode, }) }}>
                <Image style={styles.drawNoteImageStyle} source={theme.theme === 'dark' ? drawImageDarkTheme : drawNote} />
                <Text style={[styles.drawDetailsText, { color: theme.color }]} >
                    {
                        item.type === 'Instant' ? `${common.winners.rafffleDetails}` : `${common.winners.drawDetails}`
                    }
                </Text>
            </TouchableOpacity>
        </View>
    )
};

export default memo(WinnersCarouselData)

const styles = StyleSheet.create({
    cardImageContainer: {
        gap: scale(5),
        justifyContent: 'center',
        borderWidth: scale(1),
        borderColor: 'rgba(0, 6, 22, 0.246203)',
        borderRadius: scale(12),
        paddingVertical: scale(21),
        paddingHorizontal: scale(32),
        width: ITEM_WIDTH,
        backgroundColor: '#FFFFFF'
    },
    humanImageStyle: {
        borderRadius: 100,
        // width: responsiveWidth(40),
        // height: responsiveHeight(20),
        width: 140,
        height: 140,
        alignSelf: 'center',
        resizeMode: 'cover'
    },
    nameText: {
        fontSize: responsiveFontSize(2),
        fontFamily: 'Gilroy-ExtraBold',
        marginTop: scale(3),
        textAlign: 'center',
    },
    raffleText: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: 'Gilroy-ExtraBold',
        textAlign: 'center'
    },
    drawDetailsContainer: {
        flexDirection: 'row',
        marginTop: scale(8),
        borderWidth: scale(1),
        paddingVertical: scale(10),
        paddingHorizontal: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
        gap: scale(5),
        borderRadius: scale(6),
    },
    drawNoteImageStyle: {
        width: scale(9),
        height: scale(12),
        resizeMode: 'contain'
    },
    drawDetailsText: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: 'Gilroy-ExtraBold',
    },
    paginationContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    winnersDataText: {
        textAlign: 'center',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2),
        marginBottom: scale(20)
    }
})