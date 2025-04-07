import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import { isNullOrEmpty } from '../../utils/utils';
import SetTimerUpperPart from '../../utils/SetTimerUpperPart';
import SliderProgressBar from '../../utils/SliderProgressBar';
import ThemeContext from '../../utils/themes/themeWrapper';
import LiveCompetitionWeekDayTimer from '../../utils/LiveCompetitionWeekDayTimer';
import { timeFormatter } from '../../utils/TimeFormatter';

import * as common from '../../helpers/common';
import * as routes from '../../helpers/routes';
import { Url } from '../../helpers/routesApi';

import RaffoluxExaclamtorySymbolBlack from '../../assets/Images/RaffoluxExaclamtorySymbolBlack.png';
import FastImage from 'react-native-fast-image';

const LiveCompetitionNew = (props) => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();

    const { RaffleCode, Raffle_id, MiniImageUrl, RaffleExpire, custom_raffle_id, is_unlimited_raffle, Title, entry_cost_gbp, is_timer_enabled, percentage_sold, total_entries_sold, total_entries, time_left_days, is_launch_price, setSuccessModalVisible, cash_alternative, CategoryName, RetailPrice, raffleId } = props;
    const isCustomRaffle = (isNullOrEmpty(custom_raffle_id) || is_unlimited_raffle === false);

    const handleNavigate = () => {
        setSuccessModalVisible && setSuccessModalVisible(false);
        navigation.navigate(routes.routes.InstantContainer, { RaffleId: String(RaffleCode), raffle_id: raffleId });
    }

    const styles = StyleSheet.create({
        container: {
            width: responsiveWidth(46),
            borderRadius: scale(12),
            marginBottom: scale(10),
            backgroundColor: theme.theme === 'dark' ? '#141729' : theme.background
        },
        image: {
            width: responsiveWidth(46),
            height: 172,
            borderTopLeftRadius: scale(6),
            borderTopRightRadius: scale(6),
            position: 'relative',
        },
        _image: {
            width: responsiveWidth(46),
            height: 172,
            borderTopLeftRadius: scale(6),
            borderTopRightRadius: scale(6),
            position: 'relative',
            resizeMode: 'contain',
            justifyContent: 'center',
            alignItems: 'center'
        },
        timer: {
            position: 'absolute',
            alignSelf: 'center',
            top: scale(-15),
            alignItems: 'center',
            justifyContent: 'center'
        },
        timerText: {
            color: '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5)
        },
        contentContainer: {
            alignItems: 'center',
            // justifyContent: 'center',
        },
        title: {
            fontSize: responsiveFontSize(1.8),
            textAlign: 'center',
            fontFamily: 'Gilroy-ExtraBold',
            color: theme.color,
            marginTop: scale(8),
            lineHeight: scale(15),
            marginHorizontal: scale(10),
            height: scale(30)
        },
        noImageTitle: {
            fontSize: responsiveFontSize(1.8),
            textAlign: 'center',
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000616',
            marginTop: scale(8),
            lineHeight: scale(15),
            marginHorizontal: scale(10),
            height: scale(30)
        },
        description: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.2),
            color: theme.color,
            marginTop: scale(6),
            opacity: scale(0.5)
        },
        buttonContainer: {
            height: 24,
            width: 56,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(4),
            marginTop: scale(6)
        },
        price: {
            fontSize: responsiveFontSize(1.7),
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000616',
        },
        ProgressBarContainer: {
            marginHorizontal: scale(11),
            marginTop: scale(9),
            height: scale(30)
        },
        percentage: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.2),
            color: theme.color,
            opacity: scale(0.5),
            marginBottom: scale(1),
            position: 'absolute'
        },
        progressBar: {
            position: 'relative'
        },
        EnterNowContainer: {
            height: 44,
            flexDirection: 'row',
            gap: scale(5),
            alignItems: 'center',
            justifyContent: 'center',
            // marginTop: scale(12),
            borderBottomLeftRadius: scale(6),
            borderBottomRightRadius: scale(6),
        },
        EnterText: {
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000616',
        },
        Exclamatory: {
            height: 15.059,
            width: 7.447
        }
    })

    return (
        <TouchableOpacity style={styles.container} onPress={() => handleNavigate()}>
            <View>
                {
                    MiniImageUrl.length > 10 ? <FastImage source={{ uri: `${Url.ImageUrl}${MiniImageUrl}` }} style={styles.image} alt='raffle image' /> :
                        <LinearGradient colors={common.common.noImagegradientColors} style={styles._image}>
                            <Text style={styles.noImageTitle} numberOfLines={2}>{common.Home.NoImageToShow}</Text>
                        </LinearGradient>
                }
                <View style={styles.timer}>
                    {timeFormatter(RaffleExpire, 'LiveCompetition') <= 1 && <SetTimerUpperPart EndTime={RaffleExpire} is_timer_enabled={is_timer_enabled} time_left_days={parseInt(time_left_days)} bold={true} light={false} />}
                    {timeFormatter(RaffleExpire, 'LiveCompetition') > 1 && timeFormatter(RaffleExpire, 'LiveCompetition') <= 7 && <LiveCompetitionWeekDayTimer time_left_days={parseInt(time_left_days)} EndTime={RaffleExpire} />}
                    {parseInt(RetailPrice) >= 10000 && timeFormatter(RaffleExpire, 'LiveCompetition') > 7 && <LiveCompetitionWeekDayTimer time_left_days={parseInt(time_left_days)} EndTime={RaffleExpire} isJackpot={true} />}
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={2}>{Title}</Text>
                <Text style={styles.description}>
                    {
                        common.prizeClaim.specialCategories.includes(CategoryName) && isCustomRaffle ?
                            cash_alternative > 0 ? `${common.Home.CashAlternative}£${(Math.floor(cash_alternative)).toLocaleString()}` : `${common.Home.CashAlternative}£${(Math.floor(RetailPrice * 0.7)).toLocaleString()}`
                            : null
                    }
                </Text>
                <LinearGradient colors={common.common.noImagegradientColors} style={styles.buttonContainer}>
                    <Text style={styles.price}>£{entry_cost_gbp}</Text>
                </LinearGradient>
            </View>
            <View style={styles.ProgressBarContainer}>
                <View style={styles.progressBar}>
                    <Text style={styles.percentage}>{isCustomRaffle ? `${percentage_sold}${common.Home.SOLD}` : null}</Text>
                    <SliderProgressBar percentage_sold={percentage_sold} isCustomRaffle={isCustomRaffle} />
                </View>
            </View>
            <TouchableOpacity onPress={() => handleNavigate()}>
                <LinearGradient colors={common.common.noImagegradientColors} style={styles.EnterNowContainer} >
                    <Text style={styles.EnterText}>{common.Home.EnterNow}</Text>
                    <Image source={RaffoluxExaclamtorySymbolBlack} style={styles.Exclamatory} />
                </LinearGradient>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default memo(LiveCompetitionNew)

