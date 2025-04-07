import { View, Text,Image ,StyleSheet} from 'react-native'
import React from 'react';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const RatingTrustPilot = () => {
    return (
        <View style={styles.bigReviewStarContainer}>
            <Image style={styles.starImage} source={require('../assets/Images/bigReviewStar.png')} />
            <Text style={styles.trustPilotText}>Trustpilot</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bigReviewStarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(2),
    },
    starImage:{
        
    },
    trustPilotText: {
        color: '#FFFFFF',
        fontSize: responsiveFontSize(2),
        fontWeight: 600
        // fontFamily: 'Gilroy-ExtraBold',
    },
})

export default RatingTrustPilot