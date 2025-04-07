import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import LinearGradient from 'react-native-linear-gradient'

import * as common from '../../helpers/common';


const ReferAndEarn = (props) => {
    const { theme, verifyAccount } = props

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'rgba(0,0,0,0.05)',
            paddingVertical: scale(30),
            borderRadius: scale(6),
            marginTop: scale(22)
        },
        title: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            lineHeight: scale(22),
            textAlign: 'center',
            color: theme.color
        },
        description: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            marginHorizontal: scale(22),
            color: theme.color,
            opacity: scale(0.9),
            marginTop: scale(8)
        },
        buttonContainer: {
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(6),
            marginHorizontal: scale(47),
            marginTop: scale(15)
        },
        buttonText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            color: '#000616'
        }
    })
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{common.Referral.ReferAndEarn}</Text>
            <Text style={styles.description}>{common.Referral.VerifyYourAccountToAccess}</Text>
            <TouchableOpacity disabled={false} onPress={() => verifyAccount()} >
                <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{common.Referral.VerifyMyAccount}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default ReferAndEarn

