import { Pressable, StyleSheet, Text,  View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import  Toast  from 'react-native-simple-toast';
import Clipboard from '@react-native-clipboard/clipboard';

import { fetchMyReferralCode } from '../../api/referralsApi';


const ReferralLinkSection = () => {
    const [referralLink, setReferralLink] = useState(null);

    const fetchMyReferral = async () => {
        const result = await fetchMyReferralCode()
        result && setReferralLink(result.referralDetails.referralLink)
    };

    const copyToClipboard = () => {
        Clipboard.setString(referralLink);
        Toast.show('link copied!', Toast.SHORT);
    };

    useEffect(() => {
        fetchMyReferral();
    }, []);

    return (
        <LinearGradient
            colors={['#FFD70D', '#FFAE05']}
            style={styles.container}>
            <View style={{ marginHorizontal: scale(13) }}>
                <Text style={styles.text1}>Want to earn free Raffolux credit?</Text>
            </View>
            <Text style={styles.text2}>Know someone who you think would love Raffolux? Refer a friend today and earn £X Site Credit to spend on site!</Text>
            <Pressable style={styles.buttonContainer} onPress={() => copyToClipboard()}>
                <Text style={styles.buttonText}>Share my referral link</Text>
            </Pressable>
        </LinearGradient>
    )
}

export default ReferralLinkSection

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(27),
        gap: scale(14),
        borderRadius: scale(6)
    },
    text1: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(3.2),
        textAlign: 'center',
        color: '#000616',
        lineHeight: scale(30),
        marginTop: scale(33)
    },
    text2: {
        textAlign: 'center',
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: responsiveFontSize(2.2),
        color: '#000616',
        opacity: scale(0.599),
        lineHeight: scale(22),
        paddingHorizontal: scale(20),
    },
    buttonContainer: {
        height: scale(40),
        borderWidth: 1,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: scale(4),
        marginBottom: scale(36),
        marginTop: scale(15),
        marginHorizontal: scale(10)
    },
    buttonText: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2.2),
        color: '#000616',
    }
})