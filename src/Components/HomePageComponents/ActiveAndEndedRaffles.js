import React, { memo } from 'react'
import { StyleSheet, Text, View } from "react-native";
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

import * as Common from '../../helpers/common'

const ActiveAndEndedRaffles = (props) => {
    const { rafflesCount, theme, type } = props;

    const styles = StyleSheet.create({
        activeRafflesContainer: {
            borderRadius: 13.44,
            height: scale(22),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: scale(2),
            paddingHorizontal: scale(10),
            shadowColor: '#FFFFFF',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            borderColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
            borderWidth: scale(0.84)
        },
        ActiveRafflesText: {
            color: theme.color,
            fontSize: responsiveFontSize(1.7),
            fontFamily: 'NunitoSans-Regular',
        },
        dotStyle: {
            borderRadius: scale(10),
            height: scale(5),
            width: scale(5),
            position: 'relative',
            top: scale(1),
            elevation: scale(2),
            backgroundColor: type === "active" ? '#FFBD0A' : '#FD5558'
        },
    })

    return (
        <View style={styles.activeRafflesContainer} >
            <View style={styles.dotStyle}></View>
            <Text style={styles.ActiveRafflesText}>  {`${rafflesCount} ${type === 'active' ? Common.Home.activeRaffles : Common.Home.endingSoon}`}</Text>
        </View>
    )
}

export default memo(ActiveAndEndedRaffles)

