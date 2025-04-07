import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

import ThemeContext from '../utils/themes/themeWrapper';
import LinearGradientButton from '../utils/LinearGradientButton'
import * as common from '../helpers/common'
import { _fetchCartCountWithLogin } from '../ReduxToolKit/apiSlice';
import { useDispatch } from 'react-redux';

const PaymentFailure = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.background,
      flex: 1
    },
    container: {
      marginHorizontal: scale(17),
      marginTop: scale(30),
      elevation: scale(4),
      backgroundColor: theme.background,
      borderRadius: scale(11),
      paddingHorizontal: scale(18)
    },
    headerText: {
      color: theme.color,
      fontSize: responsiveFontSize(3),
      fontFamily: 'Gilroy-ExtraBold',
      alignSelf: 'center',
      marginVertical: scale(20),
    },
    description: {
      color: theme.color,
      fontSize: responsiveFontSize(2.2),
      fontFamily: 'NunitoSans-Regular',
      textAlign: 'center'
    },
    ViewMyTicketsContainer: {
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scale(6),
      borderWidth: scale(0.8),
      borderColor: theme.color,
      marginTop: scale(20)
    },
    buttonText: {
      color: theme.color,
      fontFamily: 'Gilroy-ExtraBold',
      fontSize: responsiveFontSize(2.2),
    },
    continueButtonContainer: {
      marginTop: scale(7),
      marginBottom: scale(45)
    }
  });

  useEffect(() => {
    dispatch(_fetchCartCountWithLogin());
  }, [])

  const onPress = () => navigation.navigate('Home', { fromNavBar: true })


  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Payment failed</Text>
        {/* <Text style={styles.description}>Your payment is currently being processed and you will receive a payment confirmation email if the payment is successful.Please contact <Text style={{ color: '#FFBD0A' }} onPress={() => Linking.openURL('mailto:support@raffolux.com')}>support@raffolux.com</Text> if you believe this was in error.</Text> */}
        <Text style={styles.description}>Oh no! Your payment didn't go through. No money was taken from your account. Please try again or contact <Text style={{color:'#FFBD0A'}} onPress={()=>Linking.openURL('mailto:support@raffolux.com')}>support@raffolux.com</Text> if you believe this was in error.</Text>
        <Pressable style={styles.ViewMyTicketsContainer} onPress={() => navigation.navigate('MyRaffles')}>
          <Text style={styles.buttonText}>{common.PaymentSucess.viewMyTickets}</Text>
        </Pressable>
        <View style={styles.continueButtonContainer}>
          <LinearGradientButton title={'CONTINUE'} onPress={onPress} />
        </View>
      </View>
    </View>
  )
}

export default PaymentFailure

