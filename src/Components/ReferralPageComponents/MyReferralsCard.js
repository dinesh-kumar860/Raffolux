import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { DateMonthYearFormatter } from '../../utils/DateMonthYearFormatter';
import { capitalizeFirstLetter } from '../../helpers/CapitalizeFirstLetter';


const MyReferralsCard = (props) => {
    const { theme, fullName, status, time, statusBorder, statusText } = props;
    
    let shortName = fullName.split(' ');
    let short = `${capitalizeFirstLetter(shortName[0][0])}${capitalizeFirstLetter(shortName[shortName.length - 1][0])}`;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.theme === 'dark' ? 'rgba(40, 41, 61, 0.30000001192092896)' : 'rgba(40, 41, 61, 0.0499)',
            flexDirection: 'row',
            paddingVertical: scale(10),
            paddingLeft: scale(11),
            paddingRight: scale(15)
        },
        themeColor: {
            color: theme.color
        },
        nameImageContainer: {
            height: 32,
            width: 32,
            backgroundColor: '#FFBD0A',
            borderRadius: scale(50),
            alignItems: "center",
            justifyContent: 'center',
        },
        nameImageText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.7),
            color: '#000616',
        },
        textContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            marginLeft: scale(11),
            alignItems: 'center'
        },
        timeText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            color: '#000616',
        },
        timeTextOpacity: {
            opacity: scale(0.5)
        },
        pendingCompleteContainer: {
            width: 76,
            height: 24,
            borderWidth: scale(1),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(2),
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.nameImageContainer}>
                <Text style={styles.nameImageText}>{short}</Text>
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Text style={[styles.nameImageText, styles.themeColor]}>{fullName}</Text>
                    <Text style={[styles.timeText, styles.timeTextOpacity, styles.themeColor]}>Invite sent {DateMonthYearFormatter(time)}</Text>
                </View>
                <View style={[styles.pendingCompleteContainer, statusBorder]}>
                    <Text style={[styles.timeText, statusText]}>{status}</Text>
                </View>
            </View>
        </View>
    )
}

export default MyReferralsCard

