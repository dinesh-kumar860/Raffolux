import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const SingleMonthTab = (props) => {
    const { month, monthCode, year, theme, isActive, handleOnpress } = props

    const styles = StyleSheet.create({
        item: {
            padding: scale(10),
            marginHorizontal: scale(7.5),
            borderRadius: scale(6),
            backgroundColor: theme.theme === 'dark' ? isActive ? 'rgba(255,255,255,0.1)' : null : isActive ? 'rgba(0,0,0,0.1)' : null,
        },
        title: {
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'Gilroy-ExtraBold',
            color: theme.theme === 'dark' ? isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)' : isActive ? '#000616' : 'rgba(0,0,0,0.7)'
        },
    })


    return (
        <Pressable style={styles.item} onPress={() => handleOnpress(monthCode, year, month)} disabled={isActive} >
            <Text style={styles.title}>{month.slice(0, 3)}</Text>
        </Pressable>
    )
}

export default memo(SingleMonthTab)

