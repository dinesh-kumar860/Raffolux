import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientButton = (props) => {
    const { title, onPress, disableButton, isDataFetching } = props
    return (
        <TouchableOpacity disabled={disableButton} onPress={() => onPress()}>
            <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.buttonContainer}>
                {isDataFetching ? <ActivityIndicator color={'#000616'} /> : <Text style={styles.title}>{title}</Text>}
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default LinearGradientButton

const styles = StyleSheet.create({
    buttonContainer: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(6),
        marginTop: scale(3)
    },
    title: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2.2),
        color: '#000616',
    },
})