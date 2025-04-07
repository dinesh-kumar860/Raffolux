import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import { scale } from 'react-native-size-matters';
import {  responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import * as Common from '../../helpers/common' 

import PrizeClaimMainPrizeImage from '../../assets/Images/PrizeClaimMainPrizeImage.png'

const ImageSection = (props) => {
    const { theme, transactionId, title } = props;

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            gap: scale(8)
        },
        image: {
            resizeMode: 'contain',
            width:responsiveWidth(45),
            height: responsiveHeight(20.5),
        },
        claimCompleteText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3.2),
            lineHeight: scale(31)
        },
        emaiConfirmationText: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            opacity: scale(0.69)
        },
        claimIdContainer: {
            height: responsiveHeight(4.8),
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
            borderRadius: scale(17),
            width: responsiveWidth(68),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(10)
        },
        claimIdText: {
            color: theme.color,
            fontFamily: 'Gilroy-Bold',
            fontSize: responsiveFontSize(2.2),
        }
    });

    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={PrizeClaimMainPrizeImage} />
            </View>
            <Text style={styles.claimCompleteText}>{title} {Common.PointClaim.ClaimComplete}</Text>
            <Text style={styles.emaiConfirmationText}>{Common.PointClaim.YouWillShortlyReceiveAnEmail} {title === `${Common.PointClaim.Prize}` ? `${Common.PointClaim.prize}` : `${Common.PointClaim.point}`} {Common.PointClaim.claim}</Text>
            <View style={styles.claimIdContainer}>
                <Text style={styles.claimIdText}>{Common.PointClaim.YourClaimID} {transactionId}</Text>
            </View>
        </View>
    )
}

export default ImageSection

