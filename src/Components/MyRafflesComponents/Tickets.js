import { ImageBackground, StyleSheet, Text } from 'react-native'
import React from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import ticketImageDark from '../../assets/Images/myRafflesTicketImageYellow.png'
import { scale } from 'react-native-size-matters';


const Tickets = (props) => {
    const { ticketNo } = props;

    return (
        <ImageBackground source={ticketImageDark} style={styles.ticketImageContainer} resizeMode='contain' >
            <Text style={styles.ticketNumber}>{ticketNo}</Text>
        </ImageBackground>
    )
}

export default Tickets

const styles = StyleSheet.create({
    ticketImageContainer: {
        width: scale(36),
        height: scale(14),
        alignItems: 'center',
        justifyContent: 'center',
    },
    ticketNumber: {
        color: '#FFBD0A',
        fontSize: responsiveFontSize(1.1),
        fontFamily: 'Gilroy-ExtraBold',
    }
})