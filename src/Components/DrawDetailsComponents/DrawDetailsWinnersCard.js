import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'
import { capitalizeFirstLetter } from '../../helpers/CapitalizeFirstLetter'

const DrawDetailsWinnersCard = (props) => {
    const { theme, firstName, lastName, ticketNo, } = props
    return (
        <View style={styles.singleNameContainer}>
            <Text style={[styles.winnerNameText, { color: theme.color }]}>{capitalizeFirstLetter(firstName)} {capitalizeFirstLetter(lastName)}</Text>
            <View style={[styles.winningTicktContainer]}>
                <Text style={[styles.winningTicktNumber, { color: theme.color }]}>{ticketNo}</Text>
            </View>
        </View>
    )
}

export default memo(DrawDetailsWinnersCard)

const styles = StyleSheet.create({
    singleNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: scale(22),
        paddingRight: scale(16),
        marginTop:scale(26)
    },
    winnerNameText: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2.2),
        opacity: scale(0.8),
        letterSpacing: scale(0.25)
    },
    winningTicktContainer: {
        borderWidth: scale(1),
        borderColor: '#979797',
        borderRadius: scale(3)
    },
    winningTicktNumber: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2),
        opacity: scale(0.8),
        paddingHorizontal: scale(11),
        paddingVertical: scale(1),
        letterSpacing: scale(0.25)
    },
})