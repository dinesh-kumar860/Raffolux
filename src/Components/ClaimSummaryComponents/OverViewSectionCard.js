import { StyleSheet, Text, View, } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Feather from 'react-native-vector-icons/Feather';

const OverViewSectionCard = (props) => {
    const { theme, claim1CategoryList, claim2CategoryList, typeOfClaim, image, title, option, cash, credit, split, specialCategories } = props;
    return (
        <View style={styles.overViewCardContainer1}>
            <Feather name={'check'} size={25} color={theme.theme === 'dark' ? '#FFBD0A' : '#00651C'} />
            <View style={styles.overViewCardTextContainer}>
                <View style={styles.deliveryContainer}>
                    {
                        <Text style={[styles.overViewCardTitle, { color: theme.theme === 'dark' ? '#FFBD0A' : '#00651C' }]}>
                            {
                                option === 'Cash' ? typeOfClaim === 1 ? specialCategories?.includes(claim1CategoryList[0]?.CategoryName.toLowerCase()) ?
                                    `${title} cash alternative`
                                    :
                                    `${title}`
                                    :
                                    specialCategories?.includes(claim2CategoryList.map((ele, i) => { return ele.CategoryDisplayName }).toLowerCase()) ?
                                        `${title} cash alternative`
                                        :
                                        `${title}`
                                    :
                                    `${title}`
                            }
                        </Text>
                    }

                    <Text style={[styles.overViewDeliveryText, { textAlign: 'right', color: theme.color }]}>
                        {
                            option === 'Credit' && `£${credit}`
                        }
                        {
                            option === 'Prize' && `--`
                        }
                        {
                            option === 'Cash' && `£${cash}`
                        }
                        {
                            option === 'Split' && split === '25%' && `Cash £${cash * 0.25} Site Credit £${cash * 0.75}`
                        }
                        {
                            option === 'Split' && split === '50%' && `Cash £${cash * 0.50} Site Credit £${cash * 0.50}`
                        }
                        {
                            option === 'Split' && split === '75%' && `Cash £${cash * 0.75} Site Credit £${cash * 0.25}`
                        }

                    </Text>
                </View>
                <Text style={[styles.overViewDeliveryText, { color: theme.color }]}>
                    {
                        option === 'Credit' && `Immediate deposit`
                    }
                    {
                        option === 'Prize' && `Delivery within 2 business days`
                    }
                    {
                        option === 'Cash' || option === 'Split' ? `Delivery within 24 hours` : null
                    }
                </Text>
            </View>
        </View>
    )
}

export default OverViewSectionCard

const styles = StyleSheet.create({
    overViewCardContainer1: {
        flexDirection: 'row',
        gap: scale(12),
    },
    overViewCardTextContainer: {
        flex: 1,
    },
    deliveryContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    overViewCardTitle: {
        flex: 1,
        fontFamily: 'NunitoSans-Regular',
        fontSize: responsiveFontSize(2.2),
        color: '#00651C',
        lineHeight: scale(22),
    },
    overViewDeliveryText: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: responsiveFontSize(2.2),
        color: '#1C1C27',
        opacity: scale(0.69),
    },
})