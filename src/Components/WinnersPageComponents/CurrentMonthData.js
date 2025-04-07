import React, { useEffect, useState, memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import drawNote from '../../assets/Images/drawmageLightTheme.png'
import drawImageDarkTheme from '../../assets/Images/drawImageDarkTheme1.png';

import { Url } from '../../helpers/routesApi';
import SplitName from '../../helpers/SplitName';
import * as  common from '../../helpers/common';
import { getDaySuffix } from '../../utils/GetDaySuffix';

const CurrentMonthData = (props) => {
    const navigation = useNavigation();
    const { data, date, theme, selectedMonth, selectedYear } = props

    const getFormattedDate = (day, month, year) => {
        const months = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 };
        const monthNum = months[month];
        const dateObj = new Date(year, monthNum - 1, day);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateObj);
        const dayNumber = dateObj.getDate();
        const daySuffix = getDaySuffix(dayNumber);
        const formattedDate = `${dayName} ${dayNumber}${daySuffix} ${month}`;
        return formattedDate;
    }

    const styles = StyleSheet.create({
        container: {
            gap: scale(15),
            justifyContent: 'center',
        },
        dateText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
            opacity: scale(0.8),
            color: theme.color
        },
        totalCardsContainer: {
            gap: scale(24)
        },
        cardContainer: {
            flexDirection: 'row',
            gap: scale(15),
            justifyContent: 'center',
            alignItems: 'center'
        },
        imageContainer: {
            flex: 0.2,
            borderRadius: scale(50)
        },
        cardImage: {
            width: responsiveWidth(16),
            height: responsiveHeight(8),
            borderRadius: scale(50),
            flex: 0.2,
            resizeMode: 'cover'
        },
        textContainer: {
            gap: scale(4),
            flex: 0.6
        },
        text1: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.7),
            opacity: scale(0.9),
            color: theme.color
        },
        text2: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.5),
            opacity: scale(0.5),
            color: theme.color
        },
        drawContainer: {
            height: 40,
            flex: 0.2,
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.2)' : null,
            flexDirection: 'row',
            gap: scale(6.5),
            borderWidth: scale(1),
            borderColor: 'rgba(0, 6, 22, 0.246039)',
            borderRadius: scale(6),
            alignItems: 'center',
            justifyContent: 'center'
        },
        drawNoteImageStyle: {
            width: scale(9),
            height: scale(12),
            resizeMode: 'contain'
        },
        drawText: {
            fontSize: responsiveFontSize(1.6),
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            opacity: scale(0.8),
            marginTop: Platform.OS === "ios" ? 3 : null
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{getFormattedDate(date, selectedMonth, selectedYear)}</Text>
            <View style={styles.totalCardsContainer}>
                {
                    data?.map((element, j) => (
                        <View style={styles.cardContainer} key={j}>
                            <View style={styles.imageContainer}>
                                <Image style={styles.cardImage} source={{ uri: `${Url.ImageUrl}${element.MiniImageUrl}`, }} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text1}>{element.Title}</Text>
                                <Text style={styles.text2}>{common.common.congratulations} {SplitName(element.Name)} {common.winners.withWinning} {element.TicketNo}</Text>
                            </View>
                            <TouchableOpacity style={styles.drawContainer} onPress={() => navigation.navigate('DrawDetails', { drawCode: element.DrawCode, RaffleId: element.RaffleCode })}>
                                <Image style={styles.drawNoteImageStyle} source={ theme.theme === 'dark' ? drawImageDarkTheme : drawNote} />
                                <Text style={styles.drawText}>{common.common.draw}</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export default memo(CurrentMonthData)

