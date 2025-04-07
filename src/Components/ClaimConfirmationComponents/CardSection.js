import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { Url } from '../../helpers/routesApi';

const CardSection = (props) => {
    const { theme, title, image, delivery, option, prizeClaimConfirmation, claimOption, payoutAmountCash, payoutAmountCredit } = props;

    const styles = StyleSheet.create({
        cardMainContainer: {
            gap: scale(15),
            marginHorizontal: scale(12)
        },
        container: {
            flexDirection: 'row',
            marginTop: scale(16),
            gap: scale(10)
        },
        cardImageContainer: {
            height: responsiveHeight(11),
            width: responsiveWidth(21.5),
        },
        cardImage: {
            resizeMode: 'contain',
            height: responsiveHeight(11),
            width: responsiveWidth(21.5),
            borderRadius: scale(6)
        },
        textContainer: {
            gap: scale(2),
            flex: 1
        },
        text1: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2.2),
            color: theme.color,
        },
        text2: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            color: theme.theme === 'dark' ? '#FFBD0A' : theme.color,
            marginTop: scale(6)
        },
        text3: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            opacity: 0.699,
            color: theme.color,
        },
        cardAmount: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2.2),
            color: theme.theme === 'dark' ? '#FFBD0A' : theme.color,
            marginTop: scale(15)
        },
        horizontalLine: {
            height: scale(1),
            borderWidth: scale(0.5),
            opacity: scale(0.1),
            borderColor: theme.color,
            marginTop: scale(16)
        }
    });

    return (
        <View style={styles.cardMainContainer} >
            <View style={styles.container}>
                <View style={styles.cardImageContainer}>
                    <Image style={styles.cardImage} source={{ uri: `${Url.ImageUrl}${image}` }} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text1}>{title}</Text>
                    {
                        !prizeClaimConfirmation && <Text style={styles.text2}>{option}</Text>
                    }
                    {
                        prizeClaimConfirmation && <Text style={styles.text2}>{claimOption === 1 && `Credit` || claimOption === 2 && `Cash` || claimOption === 3 && `Cash and Credit` || claimOption === 4 && `Prize`}</Text>
                    }
                    {
                        !prizeClaimConfirmation && <Text style={styles.text3}>{delivery}</Text>
                    }
                    {
                        prizeClaimConfirmation && <Text style={styles.text3}>{claimOption === 4 ? `Delivery ${delivery}` : `${delivery}`}</Text>
                    }
                    {
                        prizeClaimConfirmation && <Text style={styles.cardAmount}>{claimOption === 1 && `£${payoutAmountCredit} Credit` || claimOption === 2 && `£${payoutAmountCash}` || claimOption === 3 && `Cash £${payoutAmountCash} Site Credit £${payoutAmountCredit}` || claimOption === 4 && `--`}</Text>
                    }
                </View>
            </View>
            {
                prizeClaimConfirmation && <View style={styles.horizontalLine}></View>
            }
        </View>
    )
}

export default CardSection

