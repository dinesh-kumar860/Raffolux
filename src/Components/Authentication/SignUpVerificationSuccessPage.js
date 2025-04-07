import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, BackHandler, SafeAreaView } from 'react-native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import LinearGradientButton from '../../utils/LinearGradientButton';
import ThemeContext from '../../utils/themes/themeWrapper';

import { AuthContext } from '../../Context/AuthContext';

import * as Common from '../../helpers/common';

import otpSuccessImage from '../../assets/Images/otpSuccess.png';

const SignUpVerificationSuccessPage = ({ route }) => {
    const { jwtToken, firstName } = route.params;
    const theme = useContext(ThemeContext)
    const navigation = useNavigation();
    const { authLogin,setIsNavVisible } = useContext(AuthContext);

    // const navigateToSignUpBonus = () => navigation.navigate('SignUpBonus', { jwtToken: jwtToken, firstName: firstName });
    const navigateToHome = () => authLogin(jwtToken)


    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                return true
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
		setIsNavVisible(false)
		return () => {
			setIsNavVisible(true)
		}
	}, [])


    const styles = StyleSheet.create({
        mainContainer:{
            flex:1,
            backgroundColor:theme.background
        },
        container: {
            justifyContent: 'center',
            marginTop: scale(70),
            gap: scale(17),
            marginHorizontal: scale(28)
        },
        successImage: {
            height: 50,
            width: 48,
            alignSelf: 'center',
            resizeMode: 'contain'
        },
        sucessText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(4),
            color: theme.color,
            textAlign: 'center',
        },
        verifiedText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            textAlign: 'center',
            opacity: scale(0.8),
            marginBottom: scale(26)
        },
    })

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.successImage} source={otpSuccessImage} />
                    <Text style={styles.sucessText} >{Common.SignUpVerification.Success}</Text>
                    <Text style={styles.verifiedText}>{Common.SignUpVerification.YourAccountHasBeenVerifiedSuccessfully} </Text>
                    <LinearGradientButton title={Common.SignUpVerification.GETSTARTED} onPress={() => navigateToHome()} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpVerificationSuccessPage

