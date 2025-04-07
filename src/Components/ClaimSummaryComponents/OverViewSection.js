import { StyleSheet, Text, View, } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import OverViewSectionCard from './OverViewSectionCard';

const OverViewSection = (props) => {
    const { theme, winnerRaffleDetails, specialCategories, isAddressShow, isPayoutShow } = props
    return (
        <View style={styles.overViewSectionContainer}>
            <Text style={[styles.sectionHeaderTitle, { color: theme.color }]}>
                {
                    isAddressShow && isPayoutShow && `4` || !isAddressShow && isPayoutShow && `3` || isAddressShow && !isPayoutShow && `3` || !isAddressShow && !isPayoutShow && `2`
                }
                . Overview</Text>
            <Text style={[styles.overViewClaimText, { color: theme.color }]}>Prize claims</Text>
            <View style={styles.overViewCardContainer}>
                {winnerRaffleDetails.map((ele, i) => (
                    <OverViewSectionCard key={i} theme={theme} claim2CategoryList={ele.categoryListArray} claim1CategoryList={ele.winnerArr.category} typeOfClaim={ele.winnerArr.typeOfClaim} specialCategories={specialCategories} image={ele.winnerArr.typeOfClaim === 1 ? ele.winnerArr.img_url : ele.winnerArr.websiteRaffles[0]?.MiniImageUrl} title={ele.winnerArr.typeOfClaim === 1 ? ele.winnerArr.name : ele.winnerArr.websiteRaffles[0]?.Title} option={ele.option} cash={ele.winnerArr.price.cash} credit={ele.winnerArr.price.credit} split={ele.split} />
                ))}
            </View>
        </View>
    )
}

export default OverViewSection

const styles = StyleSheet.create({
    sectionHeaderTitle: {
        color: '#1C1C27',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2.2),
        lineHeight: scale(22)
    },
    overViewSectionContainer: {
        marginTop: scale(36),
        marginBottom: scale(150)
    },
    overViewClaimText: {
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: responsiveFontSize(1.7),
        color: '#1C1C27',
        lineHeight: scale(22),
        marginTop: scale(15),
        opacity: scale(0.8)
    },
    overViewCardContainer: {
        flex: 1,
        marginTop: scale(8),
        gap: scale(25)
    },

})