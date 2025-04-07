import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

const TicketsRange = (props) => {
    const { start, viewBackgroundColor, itemStart, itemEnd, item, handleOnpress } = props;

    const styles = StyleSheet.create({
        rangeButton: {
            borderRadius: scale(6),
            justifyContent: 'center',
            alignItems: 'center',
            padding: scale(10),
            marginRight: scale(10),
            backgroundColor: start && viewBackgroundColor === '#FFFFFF' ? "rgb(229,230,232)" : start && viewBackgroundColor !== '#FFFFFF' ? 'rgba(255, 255, 255, 0.1)' : viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
        },
        rangeButtonText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.9),
            textAlign: 'center',
            color: start && viewBackgroundColor === '#FFFFFF' ? "#000616" : start && viewBackgroundColor !== '#FFFFFF' ? '#FFFFFF' : viewBackgroundColor === '#FFFFFF' ? '#333845' : '#cccdd0',
        },
    })

    return (
        <TouchableOpacity style={styles.rangeButton} onPress={() => handleOnpress(item)} disabled={start}>
            <Text style={styles.rangeButtonText}>{`${itemStart}-${itemEnd}`}</Text>
        </TouchableOpacity>
    )
}

export default memo(TicketsRange)

