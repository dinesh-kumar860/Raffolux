import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const TicketNumber = (props) => {
    const { ticket, handleTicketSelect, selected, status, viewBackgroundColor } = props;
    
    const handlePress = useCallback(() => {
        if (status !== 3 && status !== 2) {
            handleTicketSelect(ticket);
        }
    }, [handleTicketSelect, ticket, status]);

    const styles = StyleSheet.create({
        ticketContainer: {
            height: responsiveHeight(6.12),
            width: responsiveWidth(12.3),
            borderColor: 'rgba(151, 151, 151, 0.60)',
            borderWidth: 0.66,
            borderRadius: 7.92,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? status === 3 ? 'rgba(0, 6, 22, 0.21)' : status === 2 ? 'green' : selected ? '#FFBD0A' : null : status === 3 ? 'rgba(255, 255, 255, 0.40)' : status === 2 ? 'green' : selected ? '#FFBD0A' : null
        },
        ticketNumber: {
            fontFamily: 'Gilroy-ExtraBold',
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : selected ? '#000616' : '#FFFFFF',
            fontSize: responsiveFontSize(1.9),
            opacity: status === 3 ? 0.2 : selected ? null : 0.6
        },
        ticketOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    })

    return (
        <TouchableOpacity style={styles.ticketContainer} onPress={() => handlePress()}  >
            <View style={styles.ticketOverlay}></View>
            <Text style={styles.ticketNumber}>{ticket}</Text>
        </TouchableOpacity>
    )
}

export default memo(TicketNumber)

