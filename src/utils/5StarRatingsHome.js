import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';


const StarRatingsHome = ({ viewBackgroundColor }) => {

    const styles = StyleSheet.create({
        starsMainContainer: {
            gap: scale(6),
            alignItems: 'center',
            marginTop: scale(15),
            marginBottom: scale(40)
        },
        excellentText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#F2F2F2',
            fontSize: responsiveFontSize(2.2),
            fontWeight: 600
        },
        starsContainer: {
            flexDirection: 'row',
            gap: scale(2)
        },
        starImageBackground: {
            backgroundColor: '#00C08D',
            padding: scale(3),
        },
        basedText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#F2F2F2',
            fontSize: responsiveFontSize(1.45),
            fontFamily: 'Gilroy-ExtraBold',
        },
        textUnderLine: {
            textDecorationLine: 'underline'
        },
    })

    return (
        <View style={styles.starsMainContainer}>
            <Text style={styles.excellentText}>Excellent</Text>
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
            {/* <Text style={styles.basedText}>Based on <Text style={styles.textUnderLine}>2,586 reviews</Text></Text> */}
        </View>
    )
}

export default StarRatingsHome