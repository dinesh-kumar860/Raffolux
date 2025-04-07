import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import prizeClaimCashIconYellow from '../../assets/Images/prizeClaimCashIconYellow.png';
import prizeClaimCreditIconYellow from '../../assets/Images/prizeClaimCreditIconYellow.png';

import ThemeContext from '../../utils/themes/themeWrapper'

import { Url } from '../../helpers/routesApi';
import * as Common from '../../helpers/common';


const ClaimSummaryCard = (props) => {
    const theme = useContext(ThemeContext);
    const { claim1CategoryList, claim2CategoryList, typeOfClaim, image, title, option, cash, credit, split, specialCategories, selectedPayoutOption, totalCash } = props;


    const InstantPayout = () => {
        return (
            <View style={styles.rowContainer}>
                <FontAwesome name={'bolt'} size={14} style={[styles.instantTextColor, styles.instantImageWidth]} />
                <Text style={[styles.receiveText, styles.instantTextColor]}>Instant Payout</Text>
            </View>
        )
    };

    const Description = ({ image, text }) => {
        return (
            <View style={styles.rowContainer}>
                {image}
                <Text style={[styles.receiveText, styles.transferTextColor]}>{text}</Text>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            padding: 16,
            flexDirection: 'row',
            gap: responsiveWidth(4),
            backgroundColor: theme.theme === 'dark' ? '#141628' : '#FFF',
            borderRadius: 12,
            elevation: scale(4),
            shadowColor: '#000616',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4
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
            fontSize: responsiveFontSize(2),
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

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: `${Url.ImageUrl}${image}` }} style={styles.image} />
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.title}>Win {title}</Text>
                {
                    option !== 'jackpot' ?
                        <View style={styles.rowContainer}>
                            {
                                option === Common.prizeClaim.Prize ? <FontAwesome5 name={'gift'} size={12} color={'#FFBD0A'} /> :
                                    <Image source={(option === Common.prizeClaim.Cash || option === Common.prizeClaim.Split) ? prizeClaimCashIconYellow : option === Common.prizeClaim.Credit ? prizeClaimCreditIconYellow : null} style={styles.iconStyle} />
                            }
                            {
                                option === Common.prizeClaim.Prize && <Text style={[styles.receiveText, styles.orangeText]}>{Common.prizeClaim.YouwillreceivePhysicalPrize}</Text>
                            }
                            {
                                option === Common.prizeClaim.Credit && <Text style={[styles.receiveText, styles.orangeText]}>{Common.prizeClaim.Youwillreceive} £{Number(credit).toFixed(2)} {Common.prizeClaim.inSiteCredit} </Text>
                            }
                            {
                                option === Common.prizeClaim.Split && split === Common.prizeClaim.twentyfivePercent &&
                                <Text style={[styles.receiveText, styles.orangeText]}>{Common.prizeClaim.Youwillreceive} £{(Number(cash) * 0.25).toFixed(2)} {Common.prizeClaim.CashAnd} £{(Number(cash) * 0.75).toFixed(2)} {Common.prizeClaim.SiteCredit}</Text>
                            }
                            {
                                option === Common.prizeClaim.Split && split === Common.prizeClaim.fiftyPercent &&
                                <Text style={[styles.receiveText, styles.orangeText]}>{Common.prizeClaim.Youwillreceive} £{(Number(cash) * 0.50).toFixed(2)} {Common.prizeClaim.CashAnd} £{(Number(cash) * 0.50).toFixed(2)} {Common.prizeClaim.SiteCredit}</Text>
                            }
                            {
                                option === Common.prizeClaim.Split && split === Common.prizeClaim.seventyfivePercent &&
                                <Text style={[styles.receiveText, styles.orangeText]}>{Common.prizeClaim.Youwillreceive} £{(Number(cash) * 0.75).toFixed(2)} {Common.prizeClaim.CashAnd} £{(Number(cash) * 0.25).toFixed(2)} {Common.prizeClaim.SiteCredit}</Text>
                            }
                            {
                                option === Common.prizeClaim.Cash && typeOfClaim === 1 ? specialCategories?.includes(claim1CategoryList[0]?.CategoryName.toLowerCase()) ? <Text style={[styles.receiveText, styles.orangeText]}>{Common.prizeClaim.Youwillreceiveacashalternativeof} £{Number(cash).toFixed(2)}</Text> :
                                    <Text style={[styles.receiveText, styles.orangeText]}>{Common.prizeClaim.Youwillreceive} £{Number(cash).toFixed(2)}</Text> : null
                            }
                            {
                                option === Common.prizeClaim.Cash && typeOfClaim === 2 ? specialCategories?.includes(claim2CategoryList?.toLowerCase()) ? <Text style={[styles.receiveText, styles.orangeText]}>{Common.prizeClaim.Youwillreceiveacashalternativeof} £{Number(cash).toFixed(2)}</Text> :
                                    <Text style={[styles.receiveText, styles.orangeText]}>{Common.prizeClaim.Youwillreceive} £{Number(cash).toFixed(2)}</Text> : null
                            }
                        </View>
                        :
                        <View style={styles.rowContainer}>
                            <Image source={prizeClaimCashIconYellow} style={styles.iconStyle} />
                            <Text style={[styles.receiveText, styles.orangeText]}>Once you have completed your claim we will be in contact to organise your prize for you!</Text>
                        </View>
                }

                {
                    option == Common.prizeClaim.Credit && <InstantPayout />
                }
                {
                    option == Common.prizeClaim.Prize && <Description image={<FontAwesome5 name={'truck'} size={12} style={styles.transferTextColor} />} text={`Delivery in 1-2 business days`} />
                }
                {
                    selectedPayoutOption == "paypal" && option !== Common.prizeClaim.Credit && option !== Common.prizeClaim.Prize && <Description image={<Ionicons name={'information-circle'} size={14} style={styles.transferTextColor} />} text={`Paypal transfers are manual and are therefore restricted to working hours Mon to Fri, 9am to 6pm`} />
                }
                {
                    selectedPayoutOption == "bank" && option !== Common.prizeClaim.Credit && option !== Common.prizeClaim.Prize && <Description image={<FontAwesome name={'envelope'} size={12} style={styles.transferTextColor} />} text={`Manual transfer within 24 hours`} />
                }
                {
                    totalCash > 2000 ?
                        selectedPayoutOption != "paypal" && selectedPayoutOption != "bank" && option !== Common.prizeClaim.Credit && option !== Common.prizeClaim.Prize && <Description image={<FontAwesome name={'envelope'} size={12} style={styles.transferTextColor} />} text={`Manual transfer within 24 hours`} />
                        :
                        selectedPayoutOption != "paypal" && selectedPayoutOption != "bank" && option !== Common.prizeClaim.Credit && option !== Common.prizeClaim.Prize && <InstantPayout />
                }
            </View>
        </View>
    )
}

export default ClaimSummaryCard
