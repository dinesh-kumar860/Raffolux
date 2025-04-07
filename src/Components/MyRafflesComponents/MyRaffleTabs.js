import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

const MyRaffleTabs = (props) => {
    const { theme, title, onPress, isActive, page } = props;

    const styles = StyleSheet.create({
        singleTabConatiner: {
            flex: page === 'MyRaffles' ? 1 : null,
            alignItems: 'center',
            justifyContent: 'center'
        },
        tabText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            lineHeight: scale(16),
            paddingBottom: scale(7),
            color: isActive ? theme.theme === 'dark' ? page === 'MyRaffles' || page === 'Referral' ? '#FFBD0A' : theme.color : '#1C1C27' : theme.color,
            opacity: isActive ? null : scale(0.5)
        },
        underline: {
            height: isActive ? scale(3) : null,
            backgroundColor: page === 'MyRaffles' || page === 'Referral'  ? theme.theme === 'dark' ? '#FFBD0A' : '#1C1C27' : theme.color,
            width: page === 'Referral' ? scale(85) :  scale(65),
            borderTopRightRadius: scale(2.5),
            borderTopLeftRadius: scale(2.5)
        }
    })
    return (
        <Pressable style={styles.singleTabConatiner} onPress={() => onPress()} >
            <Text style={styles.tabText}>{title}</Text>
            <View style={styles.underline}></View>
        </Pressable>
    )
}

export default MyRaffleTabs

