import { Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useContext } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

import { openLink } from '../helpers/OpenBrowser';
import { Url } from '../helpers/routesApi';
import ThemeContext from './themes/themeWrapper';

const RatingTrustPilotRow = () => {
    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        bigReviewStarContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(2),
        },
        starImage: {
            height: scale(20),
            width: scale(20),
            marginBottom: scale(5)
        },
        trustPilotText: {
            color: '#FFFFFF',
            fontSize: responsiveFontSize(1.8),
            fontWeight: 600
        },
    });
    
    return (
        <Pressable style={styles.bigReviewStarContainer} onPress={() => openLink(Url.TrustPilotLink)}>
            <Image style={styles.starImage} source={require('../assets/Images/bigReviewStar.png')} />
            <Text style={styles.trustPilotText}>Trustpilot  </Text>
        </Pressable>
    )
}



export default RatingTrustPilotRow