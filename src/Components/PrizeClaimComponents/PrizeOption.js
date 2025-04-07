import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useContext } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import ThemeContext from '../../utils/themes/themeWrapper';

import * as Common from '../../helpers/common'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import prizeClaimCashIconYellow from '../../assets/Images/prizeClaimCashIconYellow.png';
import prizeClaimCashIconDark from '../../assets/Images/prizeClaimCashIconDark.png';
import prizeClaimCashIconLight from '../../assets/Images/prizeClaimCashIconLight.png';
import prizeClaimCreditIconYellow from '../../assets/Images/prizeClaimCreditIconYellow.png';
import prizeClaimCreditIconDark from '../../assets/Images/prizeClaimCreditIconDark.png';
import prizeClaimCreditIconLight from '../../assets/Images/prizeClaimCreditIconLight.png';
import prizeClaimSplitIconYellow from '../../assets/Images/prizeClaimSplitIconYellow.png';
import prizeClaimSplitIconDark from '../../assets/Images/prizeClaimSplitIconDark.png';
import prizeClaimSplitIconLight from '../../assets/Images/prizeClaimSplitIconLight.png';

const PrizeOption = (props) => {
    const { ticketNo, position,  choosePrize, prizeOption, price_credit, price_cash, isSelected } = props;
    const theme = useContext(ThemeContext);


    const handlePress = useCallback(() => {
        choosePrize(prizeOption, `${ticketNo}${position}`)
    }, [prizeOption, choosePrize, isSelected])

    const InstantPrize = () => {
        return (
            <View style={styles.instantPrizeContainer}>
                <FontAwesome name={'bolt'} size={8} color={'rgba(37, 243, 170, 0.9)'} />
                <Text style={styles.instantText}>INSTANT</Text>
            </View>
        )
    };

    const styles = StyleSheet.create({
        cardTitle: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            fontSize: responsiveFontSize(2),
            top:-1
        },
        optionContainer: {
            justifyContent: 'space-between',
            paddingLeft: responsiveWidth(5),
            paddingRight: responsiveWidth(4),
            alignItems: 'center'
        },
        optionSplitContainer: {
            justifyContent: 'center',
        },
        optionColors: {
            height: responsiveHeight(5.7),
            backgroundColor: isSelected ? 'rgba(255, 189, 10, 0.05)' : null,
            borderColor: isSelected ? 'rgba(255, 189, 10, 0.40)' : theme.theme == 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
            borderWidth: 1.5,
            flexDirection: 'row',
            borderRadius: 3
        },
        iconContainer: {
            flexDirection: 'row',
            gap: responsiveWidth(3),
            alignItems: 'center',
        },
        optionIcon: {
            height: 16,
            width: 16,
            resizeMode: 'contain'
        },
        optionTitleOpacity: {
            opacity: isSelected ? 1 : 0.5
        },
        instantPrizeContainer: {
            flexDirection: 'row',
            backgroundColor: 'rgba(37, 243, 170, 0.2)',
            alignItems: 'center',
            gap: 2,
            borderRadius: 13,
            paddingHorizontal: 6,
            paddingVertical: 2,
        },
        instantText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1),
            color: 'rgba(37, 243, 170, 0.9)'
        },
        optionAmountFontSIze: {
            fontSize: responsiveFontSize(1.8)
        },
        deliveryText: {
            fontFamily: 'NunitoSans-Italic',
            color: theme.color,
            fontSize: responsiveFontSize(1, 5),
        }
    });


    return (
        <TouchableOpacity style={[styles.optionColors, prizeOption !== Common.prizeClaim.Split && prizeOption !== 'Claim Jackpot Prize' ? styles.optionContainer : styles.optionSplitContainer]} onPress={() => handlePress()} disabled={isSelected}>
            <View style={styles.iconContainer}>
                {prizeOption === Common.prizeClaim.Prize && <FontAwesome5 name={'gift'} size={15} color={isSelected ? '#FFBD0A' : theme.theme == 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} />}
                {prizeOption === Common.prizeClaim.Cash && <Image style={styles.optionIcon} source={isSelected ? prizeClaimCashIconYellow : theme.theme === 'dark' ? prizeClaimCashIconDark : prizeClaimCashIconLight} />}
                {prizeOption === Common.prizeClaim.Credit && (<Image style={styles.optionIcon} source={isSelected ? prizeClaimCreditIconYellow : theme.theme === 'dark' ? prizeClaimCreditIconDark : prizeClaimCreditIconLight} />)}
                {prizeOption === Common.prizeClaim.Split && (<Image style={styles.optionIcon} source={isSelected ? prizeClaimSplitIconYellow : theme.theme === 'dark' ? prizeClaimSplitIconDark : prizeClaimSplitIconLight} />)}
                <Text style={[styles.cardTitle, styles.optionTitleOpacity]}>{prizeOption == Common.prizeClaim.Split ? 'Split prize' : prizeOption}</Text>
                {prizeOption === Common.prizeClaim.Credit ? <InstantPrize /> : (prizeOption === Common.prizeClaim.Cash && price_cash < 2000) ? <InstantPrize /> : null}
            </View>
            {
                prizeOption !== Common.prizeClaim.Prize ?
                    prizeOption !== Common.prizeClaim.Split && prizeOption !== 'Claim Jackpot Prize' && <Text style={[styles.cardTitle, styles.optionTitleOpacity, styles.optionAmountFontSIze]}>£{prizeOption === Common.prizeClaim.Credit ? Number(price_credit).toFixed(2) : Number(price_cash).toFixed(2)}</Text>
                    :
                    <Text style={[styles.deliveryText, styles.optionTitleOpacity]}>delivery in 1-2 days</Text>
            }
        </TouchableOpacity>
    )
};

export default memo(PrizeOption)

