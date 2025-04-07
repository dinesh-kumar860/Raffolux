import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useRef, } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import Confetti from 'react-native-confetti';
import { useNavigation } from '@react-navigation/native'

import * as Common from '../../helpers/common'

const YouAreWinnerButton = () => {
    const confettiRef = useRef(null);
    const navigation = useNavigation();

    const handleConfettiPress = () => {
        if (confettiRef.current) {
            confettiRef.current.startConfetti();
            // setTimeout(() => confettiRef.current.stopConfetti(), 100000); // Stop confetti after 3 seconds
        }
    };

    useEffect(() => {
        handleConfettiPress()
    }, []);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleConfettiPress()
        });
        return unsubscribe;
    }, [navigation]);


    const handlePrizeClaims = () => navigation.navigate('PrizeClaimNew', { focus: true })

    return (
        <TouchableOpacity style={{ marginTop: scale(8) }} onPress={() => handlePrizeClaims()} >
            <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.youAreWinnerTextContainer}  >
                <Text style={styles.youAreWinnerText}>{Common.DrawerContent.YOUREAWINNER}</Text>
                <View style={styles.confettiContainer}>
                    <Confetti ref={confettiRef} confettiCount={100000} untilStopped={true} duration={3000} />
                </View>
            </LinearGradient>
        </TouchableOpacity>

    )
}

export default YouAreWinnerButton

const styles = StyleSheet.create({
    youAreWinnerTextContainer: {
        height: responsiveHeight(7),
        borderRadius: scale(4),
        alignItems: 'center',
        justifyContent: "center",
        marginRight: scale(5)
    },
    youAreWinnerText: {
        fontFamily: 'Gilroy-Heavy',
        color: '#000616',
        fontSize: responsiveFontSize(3)
    },
    confettiContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden'
    },
})