import { StyleSheet, Text, View, ScrollView, Alert, BackHandler, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import ThemeContext from '../utils/themes/themeWrapper';
import *  as Common from '../helpers/common';

import ImageSection from './ClaimConfirmationComponents/ImageSection';
import CardSection from './ClaimConfirmationComponents/CardSection';

import Footer from './Footer';


const PointConfirmation = ({ route, navigation }) => {
    const { transactionId, confirmationOverViewData } = route.params
    const theme = useContext(ThemeContext);

    const accountInfo = useSelector((state) => state.getAccountData.data);


    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert("Sorry.You can't go back,Please click on continue")
                return true
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        scrollViewContainer: {
            backgroundColor: theme.background
        },
        container: {
            flex: 1,
            // marginBottom: scale(150),
            paddingHorizontal: scale(15)
        },
        imageSectionContainer: {
            paddingHorizontal: scale(12)
        },
        horizontalLine: {
            height: scale(1),
            borderColor: theme.color,
            borderWidth: scale(0.5),
            opacity: scale(0.1),
            marginTop: scale(21)
        },
        horizontalLineMargin: {
            marginTop: scale(27)
        },
        needHelpText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.7),
            alignSelf: 'center',
            marginTop: scale(15),
            color: theme.theme === 'light' ? 'rgba(0,0,0,0.5)' : theme.color
        },
        orangeText: {
            color: '#FFBD0A'
        },
        continueButton: {
            height: scale(40),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(17),
            marginBottom: scale(38),
            borderRadius: scale(4)
        },
        buttonText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            color: '#000616'
        }
    })

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} >
                <View style={styles.container}>
                    <View style={styles.imageSectionContainer}>
                        <ImageSection theme={theme} transactionId={transactionId} title={Common.PointClaim.Point} />
                    </View>
                    <View style={[styles.horizontalLine, styles.horizontalLineMargin]}></View>
                    <View>
                        <CardSection theme={theme} title={confirmationOverViewData.item_title} option={confirmationOverViewData.option} delivery={confirmationOverViewData.delivery} image={confirmationOverViewData.item_image} />
                        <View style={styles.horizontalLine}></View>
                    </View>
                    <Text style={styles.needHelpText}>{Common.PointClaim.NeedHelpPleaseReferToOur} <Text style={styles.orangeText} onPress={() => navigation.navigate('FAQ')}>{Common.PointClaim.FAQs}</Text> {Common.PointClaim.or} <Text style={styles.orangeText} onPress={() => navigation.navigate('FAQ')}>{Common.PointClaim.ContactUs}</Text></Text>
                    <TouchableOpacity onPress={() => navigation.navigate(Common.common.PointsStore)}>
                        <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.continueButton}>
                            <Text style={styles.buttonText}>{Common.PointClaim.ExploreMore}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                {/* <Footer /> */}
            </ScrollView>
        </View>

    )
}

export default PointConfirmation

