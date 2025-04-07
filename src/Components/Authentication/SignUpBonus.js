import React, { useContext, } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, BackHandler, SafeAreaView, DevSettings } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import LinearGradientButton from '../../utils/LinearGradientButton';
import { AuthContext } from '../../Context/AuthContext';
import { capitalizeFirstLetter } from '../../helpers/CapitalizeFirstLetter';

const SignUpBonus = ({ route }) => {
    const { jwtToken, firstName } = route.params;
    const { authLogin } = useContext(AuthContext);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                return true
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    const navigateToHome = () => {
        authLogin(jwtToken)
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.header}>BONUS ACTIVATED!</Text>
                    <Text style={[styles.subText, { opacity: scale(0.8) }]}>Nice work {capitalizeFirstLetter(firstName)}! Your exclusive sign up bonus has been activated and you can now start playing Raffolux!</Text>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={require('../../assets/Images/signUpBonusImage.webp')} />
                    </View>
                    <Text style={styles.welcomeText}>Code: WELCOME50</Text>
                    <Text style={styles.subText}>Enjoy 50% off your next purchase</Text>
                    <Text style={styles.orangeText}>(Discount will be automatically applied at checkout)</Text>
                    <View style={styles.buttonContainer}>
                        <LinearGradientButton title={'Start Playing'} onPress={navigateToHome} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpBonus

const styles = StyleSheet.create({
    header: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(3),
        color: '#000616',
        textAlign: 'center',
        opacity: scale(0.9),
        marginTop: scale(41)
    },
    subText: {
        textAlign: 'center',
        fontFamily: 'NunitoSans-Regular',
        fontSize: responsiveFontSize(2.2),
        lineHeight: scale(22),
        color: '#000616',
        marginTop: scale(19),
        marginHorizontal: scale(29)
    },
    imageContainer: {
        height: 242,
        width: 204,
        alignSelf: 'center',
        borderRadius: scale(12),
        marginTop: scale(29)
    },
    image: {
        height: 242,
        width: 204,
        borderRadius: scale(12),
    },
    welcomeText: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: responsiveFontSize(2.5),
        color: '#000616',
        textAlign: 'center',
        lineHeight: scale(22),
        marginTop: scale(9),
        marginTop: scale(40)
    },
    orangeText: {
        color: '#FFBD0A',
        textAlign: 'center',
        fontSize: responsiveFontSize(1.5),
        marginTop: scale(8)
    },
    buttonContainer: {
        width: 256,
        alignSelf: 'center',
        marginTop: scale(70)
    }
})