import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import * as common from '../../helpers/common';
import ThemeContext from '../../utils/themes/themeWrapper';

const NoDataLiveCard = () => {
    const  theme  = useContext(ThemeContext);

    const styles = StyleSheet.create({
        tabCards: {
            // width: scale(150),
            height: scale(210),
            borderRadius: scale(6),
            overflow: 'hidden',
            marginBottom: scale(15),
            justifyContent: 'center',
            alignItems: 'center',
        },
        noData: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            color: theme.color,
        }
    });
    
    return (
        <View style={styles.tabCards}>
            <Text style={styles.noData}>No raffles currently available!</Text>
        </View>
    )
}

export default NoDataLiveCard;

