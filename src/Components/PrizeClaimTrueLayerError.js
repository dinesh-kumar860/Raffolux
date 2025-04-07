import { Image, StyleSheet, Text, View, ScrollView, BackHandler, Alert, Linking } from 'react-native'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import InAppBrowser from 'react-native-inappbrowser-reborn'

import ThemeContext from '../utils/themes/themeWrapper'
import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage'
import { isEmptyArray, isNullOrEmpty } from '../utils/utils'

import ClaimConfirmationCard from './ClaimConfirmationComponents/ClaimConfirmationCard'
import ClaimPayoutSection from './ClaimSummaryComponents/ClaimPayoutSection'
import BottomButtonContainer from './ClaimSummaryComponents/BottomButtonContainer'

import TrueLayerConnectionErrorImage from '../assets/Images/TrueLayerConnectionErrorImage.png'

import { claimMethodChangeWithLogin } from '../api/PrizeSummaryApi'
import { openLink } from '../helpers/OpenBrowser'
import { useDispatch } from 'react-redux'
import { fetchMyPrizeCashClaims } from '../ReduxToolKit/apiSlice'


const PrizeClaimTrueLayerError = () => {
    const theme = useContext(ThemeContext);
    const mainScrollviewRef = useRef(null);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();


    const [selectedPayoutOption, setSelectedPayoutOption] = useState(null);
    const [selectedPayoutId, setSelectedPayoutId] = useState(null);
    const [isDataFetching, setIsDataFetching] = useState(false);

    const [totalData, setTotalData] = useState([]);
    const [cashSplitData, setCashSplitData] = useState([]);
    const [claimedData, setClaimedData] = useState([])
    const [pendingCash, setPendingCash] = useState(null);
    const [pendingClaimCashPrizeData, setPendingClaimCashPrizeData] = useState([])
    const [pendingClaimTotalCash, setPendingClaimTotalCash] = useState(0)


    const handleData = async () => {
        let claimDta = await RaffoluxAsyncStorage.getItem('trueLayerClaimData');
        if (route.params.route == "pendingrizeClaimSummary") {
            if (claimDta) {
                setPendingClaimCashPrizeData(claimDta);
                let totalCash = 0
                claimDta.map((ele, i) => {
                    totalCash = totalCash + Number(ele.payoutAmount)
                })
                setPendingClaimTotalCash(totalCash)
            }
        } else {
            if (claimDta) {
                setTotalData(claimDta)
                let cashArr = [];
                let claimedArr = [];
                let totalCash = 0
                claimDta && claimDta.map((ele, i) => {
                    if (ele.claim.claimOption == 2 || ele.claim.claimOption == 3) {
                        totalCash = totalCash + Number(ele.claim.payoutAmountCash)
                        cashArr.push(ele)
                    } else {
                        claimedArr.push(ele)
                    }
                })
                setPendingCash(Number(totalCash))
                setCashSplitData(cashArr)
                setClaimedData(claimedArr)
            }
        }
    }

    useEffect(() => {
        setSelectedPayoutId(null)
    }, [selectedPayoutOption]);

    useEffect(() => {
        handleData();
        setSelectedPayoutId(null);
    }, [route.params.route])

    const handletrueLayerCompleteClaim = async () => {
        setIsDataFetching(true)
        let raffleSummary = [];
        totalData?.map((ele, i) => {
            let raffleObj = {}
            raffleObj['raffleId'] = ele.claim.raffleId;
            raffleObj['ticketNo'] = Number(ele.claim.ticketNo);
            raffleObj['transactionId'] = ele.claim.transactionId
            raffleSummary.push(raffleObj)
        })
        let dataObj = {
            paymentMethod: selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? 'Bank' : 'PayPal' : ' ',
            payPalId: selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? undefined : selectedPayoutId.split('_')[1] : undefined,
            bankId: selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? selectedPayoutId.split('_')[1] : undefined : undefined,
            raffleSummary: raffleSummary
        }
        let response = await claimMethodChangeWithLogin(dataObj);
        if (response) {
            setIsDataFetching(false)
            if (response.status == 200) {
                cashSplitData?.map((ele, i) => {
                    if (selectedPayoutId != null) {
                        if (selectedPayoutId.split('_')[0] === 'bank') {
                            ele.claim['bankId'] = selectedPayoutId.split('_')[1]
                        }
                        if (selectedPayoutId.split('_')[0] === 'paypal') {
                            ele.claim['paypalId'] = selectedPayoutId.split('_')[1]
                        }
                    }
                    return ele
                })
                navigation.navigate('PrizeConfirmationNew', { confirmationData: cashSplitData })
            }
        } else {
            setIsDataFetching(false)
        }
    };

    const handleTrueLayerTransfer = async () => {
        const redirectionUrl = await RaffoluxAsyncStorage.getItem('trueLayerClaimURL');
        if (redirectionUrl) {
            openLink(redirectionUrl)
        }
    };

    const handlePendingPrizeClaimCash = async () => {
        setIsDataFetching(true)
        let raffleSummary = [];
        pendingClaimCashPrizeData?.map((ele, i) => {
            let raffleObj = {}
            raffleObj['raffleId'] = ele.raffleId;
            raffleObj['ticketNo'] = Number(ele.ticketNumber);
            raffleObj['transactionId'] = ele.transactionId
            raffleSummary.push(raffleObj)
        })
        let dataObj = {
            paymentMethod: selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? 'Bank' : 'PayPal' : ' ',
            payPalId: selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? undefined : selectedPayoutId.split('_')[1] : undefined,
            bankId: selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? selectedPayoutId.split('_')[1] : undefined : undefined,
            raffleSummary: raffleSummary,
            isMobile: true,
            mobilePageType: 'prizeClaimTrueLayer'
        }
        let response = await claimMethodChangeWithLogin(dataObj);
        if (response) {
            if (response.message == "Cash payment will be credited in next 24 business hours") {
                dispatch(fetchMyPrizeCashClaims());
                setIsDataFetching(false)
                navigation.navigate('PrizeConfirmationNew', { confirmationData: pendingClaimCashPrizeData, isPendingPrizeCashClaimSuccess: true })
            }
        } else {
            setIsDataFetching(false)
        }

    };


    const handleDeepLink = async (event) => {
        InAppBrowser.close();
        if (event.url.includes('payout') && event.url.includes('prizeClaimTrueLayer')) {
            let claimData = await RaffoluxAsyncStorage.getItem('trueLayerClaimData')
            navigation.navigate('PrizeConfirmationNew', { confirmationData: claimData, isPendingPrizeCashClaimSuccess: false })
        }
    }

    // const linking = { prefixes: ['raffoluxmobile://'], config: { screens: { Main: { path: 'open?', parse: { authToken: (authToken) => authToken, }, }, }, }, };


    useEffect(() => {
        Linking.addEventListener('url', handleDeepLink);
        return () => {
            // Linking.removeEventListener('url', handleDeepLink);
        };
    }, []);


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
            flexGrow: 1,
            backgroundColor: theme.background
        },
        container: {
            paddingTop: responsiveHeight(6.2),
            paddingBottom: 200,
            marginHorizontal: responsiveWidth(4.2)
        },
        descriptionContainer: {
            alignItems: 'center',
            marginHorizontal: responsiveWidth(3.8)
        },
        imageContainer: {
            borderWidth: 12,
            borderColor: 'rgba(253, 85, 88, 0.15)',
            borderRadius: 100
        },
        image: {
            height: 32,
            width: 32,
            resizeMode: 'contain'
        },
        connectionErrorText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            lineHeight: 34,
            color: theme.color,
            marginTop: responsiveHeight(2)
        },
        descriptionTextContainer: {
            marginTop: responsiveHeight(1),
            gap: responsiveHeight(2)
        },
        descriptionText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            lineHeight: 24,
            color: theme.color,
            textAlign: 'center',
            opacity: 0.7
        },
        prizeCardContainer: {
            marginTop: responsiveHeight(3),
            gap: responsiveHeight(2),
        },
        horizontalLine: {
            height: 1,
            backgroundColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            marginVertical: responsiveHeight(5),
        },
        claimIdContainer: {
            height: responsiveHeight(4.8),
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.1038)' : 'rgba(0,0,0,0.1038)',
            borderRadius: 18,
            width: responsiveWidth(68),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(2),
            alignSelf: 'center'
        },
        claimIdText: {
            color: theme.color,
            fontFamily: 'Gilroy-Bold',
            fontSize: responsiveFontSize(2.2),
        },
        paidPrizeCardsContainer: {
            marginTop: responsiveHeight(4),
            gap: responsiveHeight(3)
        }
    })


    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.mainContainer} ref={mainScrollviewRef}   >
                <View style={styles.container} >
                    <View style={styles.descriptionContainer} >
                        <View style={styles.imageContainer} >
                            <Image source={TrueLayerConnectionErrorImage} style={styles.image} />
                        </View>
                        <Text style={styles.connectionErrorText} >Connection error</Text>
                        <View style={styles.descriptionTextContainer}>
                            <Text style={styles.descriptionText} >We are having trouble connecting to TrueLayer. Please choose a different payout method to receive your cash prizes.</Text>
                            <Text style={styles.descriptionText} >Any physical or credit prizes have been claimed and paid out successfully.</Text>
                        </View>
                    </View>
                    <View style={styles.prizeCardContainer}>
                        {
                            route.params.route != "pendingrizeClaimSummary" ?
                                !isEmptyArray(cashSplitData) && cashSplitData?.map((ele, i) => (
                                    <ClaimConfirmationCard key={i} typeOfClaim={ele.claim.claimType} image={ele.claim.img_url ? ele.claim.img_url : ele.claim.raffleDetails[0].MainImageUrl} title={ele.claim.raffleDetails[0].Title} option={ele.claim.claimOptionName} cash={ele.claim.payoutAmountCash} credit={ele.claim.payoutAmountCredit} cashSplit={ele.claim.cashClaimPercentage} paymentType={selectedPayoutOption} page={'trueLayerErrorPending'} />
                                ))
                                :
                                !isEmptyArray(pendingClaimCashPrizeData) && pendingClaimCashPrizeData?.map((ele, i) => (
                                    <ClaimConfirmationCard key={i} image={ele.mainImgUrl} title={ele.title} option={ele.option} cash={ele.payoutAmount} paymentType={selectedPayoutOption} page={'trueLayerErrorPending'} />
                                ))
                        }
                    </View>
                    <View style={styles.payoutSectionContainer} >
                        <ClaimPayoutSection totalCash={route.params.route != "pendingrizeClaimSummary" ? pendingCash : pendingClaimTotalCash} mainScrollviewRef={mainScrollviewRef} setSelectedPayoutId={setSelectedPayoutId} selectedPayoutId={selectedPayoutId} setSelectedPayoutOption={setSelectedPayoutOption} selectedPayoutOption={selectedPayoutOption} page={'trueLayerError'} />
                    </View>
                    {
                        !isEmptyArray(claimedData) && route.params.route !== "pendingrizeClaimSummary" &&
                        <>
                            <View style={styles.horizontalLine} ></View>
                            <Text style={styles.descriptionText} >Paid out successfully</Text>

                            <View style={styles.claimIdContainer}>
                                <Text style={styles.claimIdText}>Your claim ID: {totalData[0]?.claim.transactionId}</Text>
                            </View>
                            <View style={styles.paidPrizeCardsContainer} >
                                {
                                    !isEmptyArray(claimedData) && claimedData.map((ele, i) => (
                                        <ClaimConfirmationCard key={i} typeOfClaim={ele.claim.claimType} image={ele.claim.img_url ? ele.claim.img_url : ele.claim.raffleDetails[0].MainImageUrl} title={ele.claim.raffleDetails[0].Title} option={ele.claim.claimOptionName} cash={ele.claim.payoutAmountCash} credit={ele.claim.payoutAmountCredit} cashSplit={ele.claim.cashClaimPercentage} paymentType={(ele.claim.paypalId !== null && 'paypal') || (ele.claim.bankId !== null && 'bank')} page={'trueLayerErrorPaid'} />
                                    ))
                                }
                            </View>
                        </>
                    }
                </View>
            </ScrollView>
            <BottomButtonContainer theme={theme} completeClaim={route.params.route !== "pendingrizeClaimSummary" ? selectedPayoutOption !== "trueLayer" ? handletrueLayerCompleteClaim : handleTrueLayerTransfer : selectedPayoutOption === "trueLayer" ? handleTrueLayerTransfer : handlePendingPrizeClaimCash} title={'Continue'} disableButton={selectedPayoutOption !== "trueLayer" ? !selectedPayoutId || isDataFetching : false} isDataFetching={isDataFetching} changeOpacity={selectedPayoutOption !== "trueLayer" ? !selectedPayoutId : false} />
        </View>
    )
}

export default memo(PrizeClaimTrueLayerError)
