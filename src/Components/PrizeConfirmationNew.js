import { Alert, ScrollView, StyleSheet, Text, View, Image, BackHandler } from 'react-native'
import React, { memo, useContext } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import * as Common from '../helpers/common'
import ClaimConfirmationCard from './ClaimConfirmationComponents/ClaimConfirmationCard';
import BottomButtonContainer from './ClaimSummaryComponents/BottomButtonContainer';
import ClaimStepper from './ClaimSummaryComponents/ClaimStepper';

import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage';
import ThemeContext from '../utils/themes/themeWrapper'

import WithoutLoginPaymentSuccess from '../assets/Images/WithoutLoginPaymentSuccess.png';
import { useDispatch } from 'react-redux';
import { fetchMyPrizeCashClaims } from '../ReduxToolKit/apiSlice';


const PrizeConfirmationNew = ({ route }) => {
    const navigation = useNavigation()
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const { confirmationData, isTrueLayerSuccess, isPendingPrizeCashClaimSuccess, pendingPrizePaymentMethod } = route.params;

    const handleCompleteClaim = async () => {
        await RaffoluxAsyncStorage.removeItem('trueLayerClaimData')
        await RaffoluxAsyncStorage.removeItem('trueLayerClaimURL')
        navigation.navigate('Home', { fromNavBar: true })
        dispatch(fetchMyPrizeCashClaims());
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert("Sorry.You can't go back,Please click on continue")
                return true
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        scrollViewContainer: {
            backgroundColor: theme.background
        },
        container: {
            flex: 1,
            paddingBottom: responsiveHeight(20)
        },
        stepperContainer: {
            marginTop: responsiveHeight(10),
            marginHorizontal: responsiveWidth(13)
        },
        descriptionSection: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        imageContainer: {
            height: responsiveHeight(7.2),
            width: responsiveWidth(15),
            marginTop: responsiveHeight(6),
            backgroundColor: 'rgba(255, 189, 10, 0.15)',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
        },
        image: {
            height: responsiveHeight(4),
            width: responsiveWidth(8.3),
            resizeMode: 'contain',
        },
        titleText: {
            color: theme.color,
            textAlign: 'center',
            fontFamily: 'GIlroy-ExtraBold',
            fontWeight: 800,
            fontSize: responsiveFontSize(3),
            lineHeight: 34,
            marginTop: responsiveHeight(2)
        },
        confirmationText: {
            color: theme.color,
            textAlign: 'center',
            fontFamily: 'NunitoSans-Regular',
            fontWeight: 400,
            fontSize: responsiveFontSize(2),
            lineHeight: 24,
            marginTop: responsiveHeight(1),
            marginHorizontal: responsiveWidth(8),
            opacity: 0.7
        },
        claimIdContainer: {
            height: responsiveHeight(4.8),
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.1038)' : 'rgba(0,0,0,0.1038)',
            borderRadius: 18,
            width: responsiveWidth(68),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(3)
        },
        claimIdText: {
            color: theme.color,
            fontFamily: 'Gilroy-Bold',
            fontSize: responsiveFontSize(2.2),
        },
        contentContainer: {
            marginTop: responsiveHeight(6)
        },
        cardContainer: {
            marginTop: responsiveHeight(4),
            gap: responsiveHeight(1.5),
            marginHorizontal: responsiveWidth(4)
        }
    })

    return (
        <View style={styles.mainContainer} >
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.container} >
                    <View style={styles.stepperContainer} >
                        <ClaimStepper page={'PrizeConfirmation'} />
                    </View>
                    <View style={styles.descriptionSection}>
                        <View style={styles.imageContainer}>
                            <Image source={WithoutLoginPaymentSuccess} style={styles.image} />
                        </View>
                        <Text style={styles.titleText} >Prize Claim Complete!</Text>
                        <Text style={styles.confirmationText} >Your prize claim was successful! You will receive a confirmation email shortly.</Text>
                        <View style={styles.claimIdContainer}>
                            <Text style={styles.claimIdText}>Your claim ID: {!isPendingPrizeCashClaimSuccess ? confirmationData[0]?.claim.transactionId : confirmationData[0]?.transactionId}</Text>
                        </View>
                    </View>
                    <View style={styles.contentContainer} >
                        <Text style={styles.confirmationText} >Summary</Text>
                        <View style={styles.cardContainer}>
                            {
                                !isPendingPrizeCashClaimSuccess ?
                                    confirmationData?.map((ele, i) => (
                                        <ClaimConfirmationCard key={i} typeOfClaim={ele.claim.claimType} image={ele.claim.img_url ? ele.claim.img_url : ele.claim.raffleDetails[0].MainImageUrl} title={ele.claim.prizeName ? ele.claim.prizeName : ele.claim.raffleDetails[0].Title} option={ele.claim.claimOptionName} cash={ele.claim.payoutAmountCash} credit={ele.claim.payoutAmountCredit} cashSplit={ele.claim.cashClaimPercentage} paymentType={(ele.claim.paypalId !== null ? 'paypal' : '') || (ele.claim.bankId !== null ? 'bank' : '')} page={'prizeConfirmation'} isTrueLayerSuccess={isTrueLayerSuccess} />
                                    ))
                                    :
                                    confirmationData?.map((ele, i) => (
                                        <ClaimConfirmationCard key={i} image={ele.mainImgUrl} title={ele.title} option={ele.option} cash={ele.payoutAmount} page={'prizeConfirmation'} isTrueLayerSuccess={isTrueLayerSuccess} paymentType={pendingPrizePaymentMethod} />
                                    ))
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomButtonContainer theme={theme} completeClaim={handleCompleteClaim} title={'Continue'} disableButton={false} />
        </View>
    )
}

export default memo(PrizeConfirmationNew)

