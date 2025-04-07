import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

import { timeFormatter } from '../../utils/TimeFormatter'

import myCreditCreditSpentLight from '../../assets/Images/myCreditCreditSpentLight.png'
import myCreditCreditSpentDark from '../../assets/Images/myCreditCreditSpentDark.png'
import myCreditWonCreditCreditIcon from '../../assets/Images/myCreditWonCreditCreditIcon.png'

const MyCreditCard = (props) => {
    const { theme, time, value } = props;

    const styles = StyleSheet.create({
        singleCardContainer: {
            flexDirection: 'row',
            gap: scale(8),
        },
        imageContainer: {
            height: scale(37),
            width: scale(37),
            borderRadius: scale(50),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: value > 0 ? '#FFBD0A' : null
        },
        cardImage: {
            resizeMode: 'contain',
            height: scale(37),
            width: scale(37),
            borderRadius: scale(50)
        },
        creditIcon: {
            width: 18,
            height: 13,
            resizeMode: 'cover'
        },
        cardTextContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        subCardTextContainer: {
            gap: scale(2)
        },
        cardTextTitle: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.6),
            lineHeight: scale(19.1),
            color: theme.color
        },
        cardTitleOpacity: {
            opacity: scale(0.900),
        },
        cardDate: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            lineHeight: scale(16.37),
            opacity: scale(0.5),
            color: theme.color
        },
        cardAmountAlignment: {
            alignSelf: 'center',
        },
        CardAmount: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.6),
            lineHeight: scale(19.1),
            color: theme.color
        },
        orangeText: {
            color: '#FFBD0A'
        }
    })

    return (
        <>
            {
                Number(value) !== 0 &&
                <View style={styles.singleCardContainer} >
                    <View style={styles.imageContainer}>
                        {
                            value < 0 ?
                                <Image style={styles.cardImage} source={theme.theme === 'dark' ? myCreditCreditSpentDark : myCreditCreditSpentLight} />
                                :
                                <Image style={styles.creditIcon} source={myCreditWonCreditCreditIcon} />
                        }
                    </View>
                    <View style={styles.cardTextContainer}>
                        <View style={styles.subCardTextContainer}>
                            <Text style={[styles.cardTextTitle, styles.cardTitleOpacity]}>{value > 0 ? `Won Credit` : `Credit spent`}</Text>
                            <Text style={styles.cardDate}>{timeFormatter(time, 'MyCredit')}</Text>
                        </View>
                        <Text style={[styles.cardTextTitle, styles.cardAmountAlignment]}>{value > 0 && <Text style={styles.orangeText}>+£{value}</Text> || value < 0 && <Text >-£{value.split('-')[1]}</Text>}</Text>
                    </View>
                </View>
            }

        </>
    )
}

export default memo(MyCreditCard)

