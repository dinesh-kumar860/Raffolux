import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../../utils/themes/themeWrapper';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import myRafflesEndedWinningTicketImageDark from '../../assets/Images/myRafflesEndedWinningTicketImageDark.png';
import ClaimJackpotYouWonImage from '../../assets/Images/ClaimJackpotYouWonImage.png';
import { Url } from '../../helpers/routesApi';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const PrizeJackPotCard = (props) => {
    const { imageUrl, title, winningTicket, isSelected } = props

    const theme = useContext(ThemeContext)

    const styles = StyleSheet.create({
        pleaseChooseText: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            opacity: 0.8,
        },
        prizeCardContainer: {
            backgroundColor: theme.theme === 'dark' ? '#141628' : '#FFF',
            borderRadius: 12,
            paddingTop: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(5.8),
            paddingBottom: responsiveHeight(3),
            elevation: 4
        },
        youWonText: {
            fontFamily: 'Gilroy-Heavy',
            color: '#FFBD0A',
            fontSize: responsiveFontSize(2)
        },
        jackpotWinnerText: {
            fontSize: responsiveFontSize(3.5),
        },
        cardTitle: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            fontSize: responsiveFontSize(2),
        },
        winningTicketContainer: {
            flexDirection: 'row',
            gap: responsiveWidth(3),
            alignItems: 'center',
            marginTop: responsiveHeight(1.5)
        },
        winningTicketText: {
            fontFamily: 'Gilroy-ExtraBold',
            color: '#FFBD0A',
            fontSize: responsiveFontSize(1.8)
        },
        winningTicketImage: {
            width: responsiveWidth(10),
            height: responsiveHeight(1.8),
            alignItems: 'center',
            justifyContent: 'center'
        },
        ticketNumber: {
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000616',
            fontSize: responsiveFontSize(1.1)
        },
        horizontalLine: {
            height: 0.5,
            backgroundColor: theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.20)',
            marginTop: responsiveHeight(3)
        },
        jackpotWinImage: {
            height: responsiveHeight(4.8),
            width: responsiveWidth(68),
            resizeMode: 'contain',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
        },
        jackpotImage: {
            height: responsiveHeight(20),
            width: '100%',
            resizeMode: 'cover',
            marginTop: responsiveHeight(2),
            marginBottom: responsiveHeight(1),
            borderRadius: 12
        },
        cardTitleAlignment: {
            alignSelf: 'center',
        },
        jackpotContentContainer: {
            gap: responsiveHeight(2),
            marginTop: responsiveHeight(2),
            marginBottom: responsiveHeight(3)
        },
        jackpotTextOpacity: {
            opacity: 0.5
        },
        prizeOptionContainer: {
            height: responsiveHeight(5.8),
            borderWidth: 1.5,
            borderColor: isSelected ? '#FFBD0A' : theme.theme == 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
            borderRadius: 3,
            alignItems: 'center',
            justifyContent: 'center'
        },
        jackpotClaimPrizeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12
        },
        orangeText: {
            color: isSelected ? '#FFBD0A' : null,
        }
    });

    return (
        <View style={styles.prizeCardContainer}>
            <ImageBackground style={styles.jackpotWinImage} source={ClaimJackpotYouWonImage}>
                <Text style={[styles.youWonText, styles.jackpotWinnerText]}>JACKPOT WINNER</Text>
            </ImageBackground>
            <Image source={{ uri: `${Url.ImageUrl}${imageUrl}` }} style={styles.jackpotImage} />
            <Text style={[styles.cardTitle, styles.cardTitleAlignment]}>Win {title}</Text>
            <View style={[styles.winningTicketContainer, styles.cardTitleAlignment]}>
                <Text style={styles.winningTicketText}>WINNING TICKET:</Text>
                <ImageBackground source={myRafflesEndedWinningTicketImageDark} style={styles.winningTicketImage}>
                    <Text style={styles.ticketNumber}>{winningTicket}</Text>
                </ImageBackground>
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={styles.jackpotContentContainer}>
                <Text style={[styles.pleaseChooseText, styles.jackpotTextOpacity]} >As this jackpot is over the value of £7,000 we will be in contact with you shortly to organise the delivery of your prize.</Text>
                <Text style={[styles.pleaseChooseText, styles.jackpotTextOpacity]}>Please continue to claim your prize and we will be in touch within 24 hours!</Text>
            </View>
            <View style={styles.prizeOptionContainer}>
                <View style={styles.jackpotClaimPrizeContainer}>
                    <FontAwesome5 name={'medal'} size={16} color={isSelected ? '#FFBD0A' : theme.theme == 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'} />
                    <Text style={[styles.cardTitle, styles.orangeText]} >Claim Jackpot Prize</Text>
                </View>
            </View>
        </View>
    )
}

export default PrizeJackPotCard

const styles = StyleSheet.create({})