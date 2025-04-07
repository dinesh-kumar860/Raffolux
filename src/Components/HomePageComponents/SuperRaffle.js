import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';

import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

import * as Common from '../../helpers/common';
import { Url } from '../../helpers/routesApi';

import SetTimerUpperPart from '../../utils/SetTimerUpperPart';
import SetTimerDownPart from '../../utils/SetTimerDownPart';
import LiveCompetitionWeekDayTimer from '../../utils/LiveCompetitionWeekDayTimer';
import { timeFormatter } from '../../utils/TimeFormatter';


const SuperRaffle = (props) => {
    const { id, RetailPrice, Raffle_id, super_raffleimg_url, PromoImageUrl, MainImageUrl, RaffleCode, custom_raffle_id, is_unlimited_raffle, XLImageUrl, entry_cost_gbp, RaffleExpire, time_left_days, total_entries_sold, total_entries, percentage_sold, is_timer_enabled, Title } = props;
    const navigation = useNavigation();

    const handleNavigate = () => navigation.navigate('InstantContainer', { RaffleId: RaffleCode, raffle_id: Raffle_id });

    const styles = StyleSheet.create({
        backgroundImage: {
            height: responsiveHeight(63),
            width: '100%',
            justifyContent: 'space-between'
        },
        contentGap: {
            flex: 1,
        },
        contentContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: scale(48),
        },
        timerContainer: {
            alignItems: 'center',
        },
        title: {
            fontFamily: 'Gilroy-Heavy',
            fontSize: responsiveFontSize(3.2),
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: scale(30),
            marginTop: scale(15)
        },
        buttonContainer: {
            height: responsiveHeight(5.2),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(6),
            marginBottom: scale(17),
            marginTop: scale(8)
        },
        buttonTitle: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            color: '#000616',
        },
        timer: {
            backgroundColor: '#000616',
            padding: scale(4),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(6)
        },


    })

    return (
        <View style={styles.container}>
            <FastImage source={{ uri: `${Url.ImageUrl}${super_raffleimg_url}` }} style={styles.backgroundImage} >
                <View style={styles.contentGap}></View>
                <LinearGradient colors={Common.Home.superRaffleGradientColors} style={styles.contentContainer} >
                    <View style={styles.timerContainer}>
                        {timeFormatter(RaffleExpire, 'LiveCompetition') <= 1 && <SetTimerUpperPart EndTime={RaffleExpire} is_timer_enabled={is_timer_enabled} time_left_days={parseInt(time_left_days)} bold={false} light={true} />}
                        {timeFormatter(RaffleExpire, 'LiveCompetition') > 1 && timeFormatter(RaffleExpire, 'LiveCompetition') <= 7 && <LiveCompetitionWeekDayTimer time_left_days={parseInt(time_left_days)} EndTime={RaffleExpire} />}
                        {timeFormatter(RaffleExpire, 'LiveCompetition') > 7 ? parseInt(RetailPrice) >= 10000 ? <LiveCompetitionWeekDayTimer time_left_days={parseInt(time_left_days)} EndTime={RaffleExpire} isJackpot={true} /> : <View style={styles.timer}><SetTimerDownPart EndTime={RaffleExpire} is_timer_enabled={is_timer_enabled} time_left_days={parseInt(time_left_days)} bold={true} light={false} /></View> : null}
                        <Text style={styles.title}>{Title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleNavigate()} >
                        <LinearGradient colors={Common.common.linearGradientColors} style={styles.buttonContainer}>
                            <Text style={styles.buttonTitle}>{Common.Home.ENTERNOW}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </LinearGradient>
            </FastImage>
        </View>
    )
}

export default memo(SuperRaffle)

