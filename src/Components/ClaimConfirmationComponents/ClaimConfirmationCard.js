import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Image } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import prizeClaimCashIconYellow from '../../assets/Images/prizeClaimCashIconYellow.png';
import prizeClaimCreditIconYellow from '../../assets/Images/prizeClaimCreditIconYellow.png';

import { Url } from '../../helpers/routesApi';
import * as Common from '../../helpers/common';

import ThemeContext from '../../utils/themes/themeWrapper'


const ClaimConfirmationCard = (props) => {
    const theme = useContext(ThemeContext);
    const { typeOfClaim, image, title, option, cash, credit, cashSplit, paymentType, page } = props;

    const styles = StyleSheet.create({
        container: {
            padding: 16,
            flexDirection: 'row',
            gap: responsiveWidth(4),
            borderRadius: 12,
            backgroundColor: page == 'trueLayerErrorPending' ? theme.theme == 'dark' ? '#141628' : 'rgba(0,0,0,0.05)' : null
        },
        imageContainer: {
            height: responsiveHeight(10.5),
            width: responsiveWidth(23),
            borderRadius: 6,
            backgroundColor: theme.theme == 'dark' ? '#141628' : 'rgba(0,0,0,0.05)'
        },
        image: {
            height: responsiveHeight(10.5),
            width: responsiveWidth(23),
            borderRadius: 6,
            resizeMode: 'cover'
        },
        descriptionContainer: {
            flex: 1,
            gap: 8
        },
        title: {
            color: theme.color,
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2)
        },
        rowContainer: {
            flexDirection: 'row',
            // alignItems: 'center',
            gap: 8,
        },
        iconStyle: {
            height: 12,
            width: 11.968,
            resizeMode: 'contain'
        },
        receiveText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            flex: 1,
            top: -3
        },
        orangeText: {
            color: '#FFBD0A'
        },
        instantTextColor: {
            color: '#25F3AA',
            opacity: 0.8
        },
        instantImageWidth: {
            width: 11.968
        },
        transferTextColor: {
            color: theme.theme == 'dark' ? '#D0D0D4' : 'rgba(0,0,0,0.4)'
        }
    })

    const InstantPayout = () => {
        return (
            <View style={styles.rowContainer}>
                <FontAwesome name={'bolt'} size={14} style={[styles.instantTextColor, styles.instantImageWidth]} />
                <Text style={[styles.receiveText, styles.instantTextColor]}>Instant Payout</Text>
            </View>
        )
    }

    const Description = (props) => {
        const { image, text } = props
        return (
            <View style={styles.rowContainer}>
                {image}
                <Text style={[styles.receiveText, styles.transferTextColor]}>{text}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: `${Url.ImageUrl}${image}` }} style={styles.image} />
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.rowContainer}>
                    {
                        option === Common.prizeClaim.Prize ? <FontAwesome5 name={'gift'} size={12} color={'#FFBD0A'} /> :
                            <Image source={(option === Common.prizeClaim.Cash || option === "Cash and Credit" || option == 'Jackpot') ? prizeClaimCashIconYellow : option === Common.prizeClaim.Credit ? prizeClaimCreditIconYellow : null} style={styles.iconStyle} />
                    }
                    {
                        <Text style={[styles.receiveText, styles.orangeText]}>
                            {option === Common.prizeClaim.Prize && Common.prizeClaim.YouwillreceivePhysicalPrize}
                            {option === Common.prizeClaim.Credit && `${Common.prizeClaim.Youwillreceive} £${Number(credit).toFixed(2)} ${Common.prizeClaim.inSiteCredit}`}
                            {option === "Cash and Credit" && `${Common.prizeClaim.Youwillreceive} £${Number(cash).toFixed(2)} ${Common.prizeClaim.CashAnd} £${Number(credit).toFixed(2)} ${Common.prizeClaim.SiteCredit}`}
                            {option === Common.prizeClaim.Cash && `${Common.prizeClaim.Youwillreceive} £${Number(cash).toFixed(2)}`}
                            {option == 'Jackpot' && `Once you have completed your claim we will be in contact to organise your prize for you!`}
                        </Text>
                    }
                </View>
                {
                    option === Common.prizeClaim.Credit && <InstantPayout />

                }
                {
                    option === Common.prizeClaim.Prize && <Description image={<FontAwesome5 name={'truck'} size={12} style={styles.transferTextColor} />} text={`Delivery in 1-2 business days`} />
                }
                {
                    page == 'prizeConfirmation' ?
                        <>
                            {
                                (option === "Cash and Credit" || option === Common.prizeClaim.Cash) ? paymentType == 'bank' ? <Description image={<FontAwesome5 name={'envelope'} size={12} style={styles.transferTextColor} />} text={`Manual transfer within 24 hours`} />
                                    :
                                    paymentType == 'paypal' ? <Description image={<Ionicons name={'information-circle'} size={14} color={theme.color} />} text={`Paypal transfers are manual and are therefore restricted to working hours Mon to Fri, 9am to 6pm`} />
                                        :
                                        <InstantPayout /> : null
                            }
                        </>
                        :
                        page == 'trueLayerErrorPending' ?
                            <>
                                {
                                    paymentType !== null ?
                                        paymentType == 'bank' ? <Description image={<FontAwesome5 name={'envelope'} size={12} style={styles.transferTextColor} />} text={`Manual transfer within 24 hours`} />
                                            :
                                            paymentType == 'paypal' ? <Description image={<Ionicons name={'information-circle'} size={14} color={theme.color} />} text={`Paypal transfers are manual and are therefore restricted to working hours Mon to Fri, 9am to 6pm`} />
                                                :
                                                paymentType == 'trueLayer' ? <InstantPayout />
                                                    :
                                                    null
                                        :
                                        <Description image={<Ionicons name={'information-circle-outline'} size={14} style={styles.transferTextColor} />} text={`Please choose alternative payout`} />
                                }
                            </>
                            :
                            null
                }
            </View>
        </View>
    )
}

export default ClaimConfirmationCard
