import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { timeFormatter } from './TimeFormatter';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import ThemeContext from './themes/themeWrapper';

const LiveCompetitionWeekDayTimer = (props) => {
    const { time_left_days, EndTime, isJackpot } = props;
    const theme = useContext(ThemeContext)

    const styles = StyleSheet.create({
        container: {
            borderRadius: scale(14),
            backgroundColor: theme.theme === 'dark' ? '#FFF' : '#000616',
            marginTop: scale(5),
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: responsiveFontSize(1.5),
            color: theme.theme === 'light' ? '#FFF' : '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            paddingVertical: scale(2),
            paddingHorizontal: scale(12)
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {isJackpot ? `JACKPOT DRAW` : `Draw ${timeFormatter(EndTime, 'LiveCompetitionsWeekdays')}`}
            </Text>
        </View>
    )
}

export default LiveCompetitionWeekDayTimer

