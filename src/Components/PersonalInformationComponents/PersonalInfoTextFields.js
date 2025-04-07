import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const PersonalInfoTextFields = (props) => {
    const { theme, title, inputName } = props

    const styles = StyleSheet.create({
        singleFieldContainer: {
            gap: scale(6),
        },
        input: {
            flex: 1,
            height: scale(44),
            paddingLeft: scale(20.5),
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: scale(6),
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            borderWidth: 1,
            borderColor: theme.theme === 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255, 255, 255, 0.1)',
            color: theme.theme === 'light' ? '#070B1A' : '#FFFFFF',
        },
        inputContainer: {
            justifyContent: 'center',
        },
        inputContainerText: {
            fontSize: responsiveFontSize(2),
            fontFamily: 'NunitoSans-Regular',
            color: theme.color
        },
        fieldNameText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
            opacity: scale(0.8),
            color: theme.theme === 'light' ? '#070B1A' : 'rgba(255, 255, 255, 0.8)',
        },
    })
    return (
        <View style={styles.singleFieldContainer}>
            <Text style={styles.fieldNameText}>{title}</Text>
            <View style={[styles.input, styles.inputContainer]}>
                <Text style={styles.inputContainerText}>{inputName}</Text>
            </View>
        </View>
    )
}

export default PersonalInfoTextFields

