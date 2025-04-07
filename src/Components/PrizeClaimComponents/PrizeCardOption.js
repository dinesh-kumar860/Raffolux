import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { memo } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import * as Common from '../../helpers/common'

import prizeClaimCashIconYellow from '../../assets/Images/prizeClaimCashIconYellow.png';
import prizeClaimCashIconDark from '../../assets/Images/prizeClaimCashIconDark.png';
import prizeClaimCashIconLight from '../../assets/Images/prizeClaimCashIconLight.png';
import prizeClaimCreditIconYellow from '../../assets/Images/prizeClaimCreditIconYellow.png';
import prizeClaimCreditIconDark from '../../assets/Images/prizeClaimCreditIconDark.png';
import prizeClaimCreditIconLight from '../../assets/Images/prizeClaimCreditIconLight.png';
import prizeClaimSplitIconYellow from '../../assets/Images/prizeClaimSplitIconYellow.png';
import prizeClaimSplitIconDark from '../../assets/Images/prizeClaimSplitIconDark.png';
import prizeClaimSplitIconLight from '../../assets/Images/prizeClaimSplitIconLight.png';


const PrizeCardOption = (props) => {
    const { theme, ticketNo, selectedOptions, choosePrize, prizeOption } = props;

    

    const styles = StyleSheet.create({
        optionsContainer: {
            marginTop: scale(9),
            borderWidth: 2,
            width: responsiveWidth(23.5),
            height: responsiveHeight(7.8),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(3),
            borderColor: selectedOptions[ticketNo] === prizeOption ? '#FFBD0A' : theme.theme === 'dark' ? 'rgba(255,255,255,0.19)' : 'rgba(0,0,0,0.19)',
            backgroundColor: selectedOptions[ticketNo] === prizeOption ? 'rgba(255, 189, 10, 0.15)' : theme.theme === 'dark' ? '#141628' : '#FFFFFF'
        },
        optionText: {
            marginTop: scale(1),
            textAlign: "center",
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(2),
            color: selectedOptions[ticketNo] === prizeOption ? '#FFBD0A' : theme.theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
        },
        prizeImage: {
            color: selectedOptions[ticketNo] === prizeOption ? '#FFBD0A' : theme.theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'
        },
        iconStyle(icon) {
            return {
                width: scale(22),
                height: icon == Common.prizeClaim.Cash && scale(22) || icon == Common.prizeClaim.Credit && scale(17) || icon == Common.prizeClaim.Split && scale(20),
                resizeMode: 'contain'
            }
        }
    });

    return (
        <Pressable style={styles.optionsContainer} onPress={() => choosePrize(prizeOption, ticketNo)}>
            {prizeOption === Common.prizeClaim.Prize && <FontAwesome5 name={'gift'} style={styles.prizeImage} size={24} />}
            {prizeOption === Common.prizeClaim.Cash && <Image style={styles.iconStyle(Common.prizeClaim.Cash)} source={selectedOptions[ticketNo] === Common.prizeClaim.Cash ? prizeClaimCashIconYellow : theme.theme === 'dark' ? prizeClaimCashIconDark : prizeClaimCashIconLight} />}
            {prizeOption === Common.prizeClaim.Credit && (<Image style={styles.iconStyle(Common.prizeClaim.Credit)} source={selectedOptions[ticketNo] === Common.prizeClaim.Credit ? prizeClaimCreditIconYellow : theme.theme === 'dark' ? prizeClaimCreditIconDark : prizeClaimCreditIconLight} />)}
            {prizeOption === Common.prizeClaim.Split && (<Image style={styles.iconStyle(Common.prizeClaim.Split)} source={selectedOptions[ticketNo] === Common.prizeClaim.Split ? prizeClaimSplitIconYellow : theme.theme === 'dark' ? prizeClaimSplitIconDark : prizeClaimSplitIconLight} />)}
            <Text style={styles.optionText}>{prizeOption}</Text>
        </Pressable>
    )
}

export default memo(PrizeCardOption)

