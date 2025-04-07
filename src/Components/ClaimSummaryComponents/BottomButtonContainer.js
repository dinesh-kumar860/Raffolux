import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient';

import prizeClaimBottomCurve from '../../assets/Images/prizeClaimBottomCurve.png'
import prizeClaimBottomCurveDark from '../../assets/Images/prizeClaimBottomCurveDark.png'
import * as Common from '../../helpers/common';


const BottomButtonContainer = (props) => {
    const { theme, completeClaim, title, disableButton, changeOpacity, page, isDataFetching, addressError } = props;

    const styles = StyleSheet.create({
        bottomContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: 'center',
            elevation: scale(4),
        },
        bottomContainerImage: {
            height: 100,
            width: '100%',
            resizeMode: 'contain',
            justifyContent: "center",
        },
        cliamPrizeButtonContainer: {
            height: responsiveHeight(5.7),
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: scale(16),
            borderRadius: scale(4),
            opacity: changeOpacity ? 0.4 : 1
        },
        claimPrizeText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            lineHeight: 24,
            color: '#1C1C27',
        },
        errorMessage: {
            color: 'red',
            textAlign: 'right',
            marginRight: scale(17)
        }
    });

    return (
        <View style={styles.bottomContainer}>
            <ImageBackground style={styles.bottomContainerImage} source={theme.theme === 'dark' ? prizeClaimBottomCurve : prizeClaimBottomCurveDark} >
                <TouchableOpacity onPress={() => completeClaim()} disabled={disableButton}>
                    <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.cliamPrizeButtonContainer}>
                        {
                            isDataFetching ? <ActivityIndicator color={'#000616'} /> : <Text style={styles.claimPrizeText}>{title}</Text>
                        }
                    </LinearGradient>
                </TouchableOpacity>
                {
                    addressError && <Text>Please add or select an address</Text>
                }
            </ImageBackground>
        </View>
    )
}

export default BottomButtonContainer

