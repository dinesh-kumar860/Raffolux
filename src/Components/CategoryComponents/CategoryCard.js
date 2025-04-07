import { View, Text, StyleSheet, ImageBackground, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { RaffoluxAsyncStorage } from '../../utils/RaffoluxAsyncStorage';
import ThemeContext from '../../utils/themes/themeWrapper';
import SetTimerUpperPart from '../../utils/SetTimerUpperPart';

import SetTimer from "../../utils/SetTimer";

import ProgressBar from "../../utils/ProgressBar";
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export const CategoryCard = (props) => {
    const { MiniImageUrl, RaffleExpire, Title, entry_cost_gbp, is_timer_enabled, percentage_sold, total_entries_sold, total_entries, time_left_days, is_launch_price } = props;


    const styles = StyleSheet.create({
        tabCards: {
            // width: scale(169.13),
            width: scale(153),
            height: scale(200),
            borderRadius: scale(6),
            overflow: 'hidden',
            justifyContent: 'space-between',
        },

        cardSubDetails: {
            backgroundColor: 'rgba(0, 6, 22, 0.50)',
            justifyContent: 'flex-end',
        },
        _timerCount: {
            backgroundColor: '#ffbd0a',
            width: '100%',
            height: scale(25),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cardDetailsText: {
            color: '#fff',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
        },
        cardDetailsText2: {
            color: '#fff',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            paddingBottom: scale(3)
        },
        endingTime: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        remainingRaffleText: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 0,
        },
        totalRaffleText: {
            color: '#FFFFFF',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.25),
        },
        endingTicketIcon: {
            color: '#FFFFFF',
            height: scale(11),
            marginTop: scale(1.25),
            fontSize: responsiveFontSize(1.25),
        },
        ClockIcon: {
            color: '#1c1c27',
            height: responsiveHeight(1.4),
            marginBottom: scale(2.25),
        },
    })

    return (
        <ImageBackground source={{ uri: `https://raffolux-static.s3.eu-west-2.amazonaws.com/static/website/${MiniImageUrl}` }} style={styles.tabCards}>
            <View>
                <View>
                    {time_left_days <= 1 ?
                        <SetTimer EndTime={RaffleExpire} is_timer_enabled={is_timer_enabled} time_left_days={time_left_days} bold={true} light={false} />
                        :
                        <View style={styles.timerLessThanOneDay}></View>
                    }
                </View>
            </View>
            <View style={styles.cardSubDetails}>
                {is_launch_price &&
                    <View style={styles._timerCount}>
                        <FontAwesome name={'clock-o'} style={styles.ClockIcon} />
                        <Text style={styles.raffleEndingTime}>  LAUNCH PRICE</Text>
                    </View>
                }
                <View style={{ paddingHorizontal: scale(8), paddingBottom: scale(8), paddingTop: scale(3), gap: scale(3.7) }}>
                    <View style={{ paddingBottom: scale(2) }}>
                        <Text style={styles.cardDetailsText} >{Title}</Text>
                        <Text style={styles.cardDetailsText2} >£ {entry_cost_gbp}</Text>
                    </View>
                    <View>
                        <ProgressBar value={percentage_sold} />
                    </View>
                    <View style={styles.endingTime}>
                        <View>
                            <SetTimerUpperPart EndTime={RaffleExpire} is_timer_enabled={is_timer_enabled} time_left_days={parseInt(time_left_days)} bold={true} light={false} />
                        </View>
                        <View style={styles.remainingRaffleText}>
                            <FontAwesome name={'ticket'} style={styles.endingTicketIcon} />
                            <Text style={styles.totalRaffleText}> {`${total_entries_sold}/${total_entries}`} </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}