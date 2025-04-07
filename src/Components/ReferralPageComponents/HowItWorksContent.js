import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";

const HowItWorksContent = (props) => {
    const { number, title, theme } = props;

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            marginHorizontal: scale(18),
            gap: scale(15),
        },
        numberCircle: {
            borderColor: theme.color,
            borderWidth: scale(1),
            borderRadius: scale(50),
            height: scale(22),
            width: scale(22),
            alignItems: 'center',
            justifyContent: 'center'
        },
        number: {
            color: theme.color,
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
        },
        text: {
            color: theme.color,
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            flex: 1
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.numberCircle}>
                <Text style={styles.number}>{number}</Text>
            </View>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default HowItWorksContent

