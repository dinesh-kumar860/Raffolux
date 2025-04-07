import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

const ClaimLinearGradientButton = (props) => {
    const { handleOnPress, title, disabled } = props
    return (
        <TouchableOpacity onPress={handleOnPress} disabled={disabled}>
            <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.saveAddressButton}>
                {disabled ? <ActivityIndicator color={'#000616'} /> : <Text style={styles.buttonText}>{title}</Text>}
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default ClaimLinearGradientButton

const styles = StyleSheet.create({
    saveAddressButton: {
        height: responsiveHeight(6.2),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(6),
        marginTop: scale(22)
    },
    buttonText: {
        color: '#1C1C27',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2.2),
        lineHeight: scale(15)
    },
})