import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { openLink } from '../helpers/OpenBrowser';
import { Url } from '../helpers/routesApi';


const StarRatingsRow = () => {
    return (
        <Pressable style={styles.starsMainContainer} onPress={()=>openLink(Url.TrustPilotLink)}>
            
            <View style={styles.starsContainer}>
                <View style={styles.starImageBackground}>
                    <Image source={require('../assets/Images/reviewStar.png')} />
                </View>
                <View style={styles.starImageBackground}>
                    <Image source={require('../assets/Images/reviewStar.png')} />
                </View>
                <View style={styles.starImageBackground}>
                    <Image source={require('../assets/Images/reviewStar.png')} />
                </View>
                <View style={styles.starImageBackground}>
                    <Image source={require('../assets/Images/reviewStar.png')} />
                </View>
                <LinearGradient colors={['#00C08D', '#00C0A0', '#00C09D', '#D9D9D9', '#D9D9D9']} start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }} locations={[0.0031, 0.5013, 0.5014, 0.5015, 1]} style={styles.starImageBackground}>
                    <Image source={require('../assets/Images/reviewStar.png')} />
                </LinearGradient>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    starsMainContainer: {
        gap: scale(6),
        alignItems: 'center',
        marginVertical: scale(15),
    },
    excellentText: {
        color: '#FFFFFF',
        fontSize: responsiveFontSize(2.2),
        fontWeight: 600
    },
    starsContainer: {
        flexDirection: 'row',
        gap: scale(2),
        paddingVertical: scale(0),
    },
    starImageBackground: {
        backgroundColor: '#00C08D',
        padding: scale(0.5),
    },
    basedText: {
        color: '#FFFFFF',
        fontSize: responsiveFontSize(1.8),
        fontFamily: 'Gilroy-ExtraBold',
    },
    textUnderLine: {
        textDecorationLine: 'underline'
    },
})

export default StarRatingsRow