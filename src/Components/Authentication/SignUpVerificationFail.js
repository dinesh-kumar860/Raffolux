import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import LinearGradientButton from '../../utils/LinearGradientButton';
import ThemeContext from '../../utils/themes/themeWrapper';

import * as Common from '../../helpers/common';

import { AuthContext } from '../../Context/AuthContext';


const SignUpVerificationFail = ({ route }) => {
    const { jwtToken } = route.params;
    const { authLogin, setIsNavVisible } = useContext(AuthContext);
    const theme = useContext(ThemeContext)
    const navigation = useNavigation();

    const navigateToVerification = () => navigation.goBack()

    const verifyLater = () => authLogin(jwtToken);

    useEffect(() => {
		setIsNavVisible(false)
		return () => {
			setIsNavVisible(true)
		}
	}, [])


    const styles = StyleSheet.create({
        mainContainer: {
            flexGrow: 1,
            backgroundColor: theme.background
        },
        container: {
            marginTop: responsiveHeight(4)
        },
        header: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(4),
            color: theme.color,
            marginHorizontal: scale(13),
        },
        headerTextFontSize: {
            fontSize: responsiveFontSize(2.2)
        },
        subText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            textAlign: 'center',
            marginHorizontal: scale(18),
            marginTop: scale(20)
        },
        verifyNowContainer: {
            marginTop: responsiveHeight(7.5),
            gap: scale(16),
            marginLeft: scale(22),
            marginRight: scale(26)
        },
        verifyLaterContainer: {
            height: responsiveHeight(7.2),
            backgroundColor: theme.theme == 'light' ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.10)',
            borderColor: theme.theme == 'light' ? 'rgba(0,0,0,0.20)' : 'rgba(255,255,255,0.20)',
            borderWidth: scale(1.403),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(3.394)
        }
    });


    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>{Common.SignUpVerification.AreYouSureYouDontWantYourFreeBonus}</Text>
                <Text style={styles.subText}>{Common.SignUpVerification.YouCanAlwaysVerifyAndClaimYourFreeBonus}</Text>
                <View style={styles.verifyNowContainer}>
                    <LinearGradientButton title={Common.SignUpVerification.VerifyNow} onPress={() => navigateToVerification()} />
                    <TouchableOpacity style={styles.verifyLaterContainer} onPress={() => verifyLater()}>
                        <Text style={[styles.header, styles.headerTextFontSize]}>{Common.SignUpVerification.VerifyLater}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignUpVerificationFail

