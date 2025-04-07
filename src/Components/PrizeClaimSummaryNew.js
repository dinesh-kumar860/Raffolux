import { ScrollView, StyleSheet, Text, View, Linking } from 'react-native';
import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import InAppBrowser from 'react-native-inappbrowser-reborn';

import Header from '../utils/Header'
import ThemeContext from '../utils/themes/themeWrapper'
import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage';
import { isEmptyArray } from '../utils/utils';

import ClaimStepper from './ClaimSummaryComponents/ClaimStepper'
import ClaimSummaryCard from './ClaimSummaryComponents/ClaimSummaryCard'
import ClaimDeliveryAddress from './ClaimSummaryComponents/ClaimDeliveryAddress'
import BottomButtonContainer from './ClaimSummaryComponents/BottomButtonContainer'
import ClaimPayoutSection from './ClaimSummaryComponents/ClaimPayoutSection';

import { claimMethodChangeWithLogin, claimMyPrizesWithLogin } from '../api/PrizeSummaryApi'
import { fetchMyPrizeCashClaimsWithLogin } from '../api/homeApi';

import { fetchMyPrizeCashClaims, getActiveRafflesCount, getClaimPrizeCount, getCreditBalance, getStoreBalance } from '../ReduxToolKit/apiSlice'


const PrizeClaimSummaryNew = ({ route }) => {
	const { winnerRaffleDetails, specialCategories, totalCash, pendingPrizes } = route.params;

	const theme = useContext(ThemeContext);
	const mainScrollviewRef = useRef(null);
	const mainPayoutRef = useRef(null);
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const pendingPrizeClaimCashData = useSelector((state) => state.getAccountData.prizeClaimCashData);

	const [selectedPayoutOption, setSelectedPayoutOption] = useState(null);
	const [selectedPayoutId, setSelectedPayoutId] = useState(null);
	const [selectedAddressId, setSelectedAddressId] = useState(null);
	const [isAddressShow, setIsAddressShow] = useState(false);
	const [isPayoutShow, setIsPayoutShow] = useState(false);
	const [isCreditShow, setCreditShow] = useState(false);
	const [isDataFetching, setIsDataFetching] = useState(false);


	useEffect(() => {
		const raffleOptionArray = []
		winnerRaffleDetails.map((ele, i) => {
			raffleOptionArray.push(ele.option);
		})
		raffleOptionArray.includes('Prize') ? setIsAddressShow(true) : setIsAddressShow(false);
		raffleOptionArray.includes('Cash') || raffleOptionArray.includes('Split') ? setIsPayoutShow(true) : setIsPayoutShow(false);
		(!raffleOptionArray.includes('Cash') && !raffleOptionArray.includes('Split') && !raffleOptionArray.includes('Prize') && !raffleOptionArray.includes('jackpot')) ? setCreditShow(true) : setCreditShow(false);
	}, [winnerRaffleDetails?.map((ele) => ele.option)]);

	useEffect(() => {
		setSelectedPayoutId(null)
	}, [selectedPayoutOption]);


	React.useEffect(() => {
		const unsubscribe = navigation.addListener('focus', async () => {
			await RaffoluxAsyncStorage.removeItem('trueLayerClaimData')
			await RaffoluxAsyncStorage.removeItem('trueLayerClaimURL')
		});
		return unsubscribe;
	}, [navigation]);


	const handleCompleteClaim = async () => {
		setIsDataFetching(true)
		let raffleSummary = [];
		winnerRaffleDetails?.map((ele, i) => {
			let raffleObj = {}
			raffleObj['raffleType'] = ele.winnerArr.typeOfClaim === 1 ? 'instant_draw_raffle' : 'final_draw_raffle';
			raffleObj['raffleId'] = ele.winnerArr.raffle_id;
			raffleObj['ticketNo'] = ele.ticketNo;
			raffleObj['claimOption'] = ele.option === 'Credit' && 1 || ele.option === 'Cash' && 2 || ele.option === 'Split' && 3 || ele.option === 'Prize' && 4 || ele.option == 'jackpot' && 5;
			raffleObj['claimType'] = ele.winnerArr.typeOfClaim;
			raffleObj['claimAsPrize'] = ele.option === 'Prize' ? true : false;
			ele.option === 'Split' ? raffleObj['splitPercent'] = ele.split === '25%' && 25 || ele.split === '50%' && 50 || ele.split === '75%' && 75 : null
			raffleSummary.push(raffleObj)
		})
		let dataObj = {
			paymentMethod: selectedPayoutOption !== "trueLayer" ? selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? 'Bank' : 'PayPal' : ' ' : 'TrueLayer',
			bankId: selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? selectedPayoutId.split('_')[1] : undefined : undefined,
			payPalId: selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? undefined : selectedPayoutId.split('_')[1] : undefined,
			prizeOption: isAddressShow,
			addressId: isAddressShow && selectedAddressId !== null ? selectedAddressId : 0,
			raffleSummary: raffleSummary,
			isMobile: true,
			mobilePageType: 'prizeClaimSummary'
		}

		let response = await claimMyPrizesWithLogin(dataObj)
		if (response) {
			await RaffoluxAsyncStorage.removeItem('selectedPrizeOptions');
			await RaffoluxAsyncStorage.removeItem('selectedPrizeSplit')

			if (response.isTrueLayer == true) {
				dispatch(getStoreBalance());
				dispatch(fetchMyPrizeCashClaims());
				dispatch(getCreditBalance());
				dispatch(getClaimPrizeCount());
				dispatch(getActiveRafflesCount({ "page": 1 }));
				await RaffoluxAsyncStorage.setItem('trueLayerClaimData', response.claimPrizeFor)
				await RaffoluxAsyncStorage.setItem('trueLayerClaimURL', response.redirectUrl);
				await RaffoluxAsyncStorage.removeItem('selectedPrizeOptions');
				setIsDataFetching(false)
				openBrowser(response.redirectUrl, 'prizeClaimSummary')
			} else {
				dispatch(getStoreBalance());
				dispatch(getCreditBalance());
				dispatch(getClaimPrizeCount());
				dispatch(getActiveRafflesCount({ "page": 1 }));
				setIsDataFetching(false)
				await RaffoluxAsyncStorage.removeItem('selectedPrizeOptions');
				navigation.navigate('PrizeConfirmationNew', { confirmationData: response.claimPrizeFor })
			}
		}
		else {
			setIsDataFetching(false)
		}
	};


	const handlePendingPrizesClaim = async () => {
		setIsDataFetching(true)
		let raffleSummary = [];
		winnerRaffleDetails?.map((ele, i) => {
			let raffleObj = {}
			raffleObj['raffleId'] = ele.raffleId;
			raffleObj['ticketNo'] = Number(ele.ticketNumber);
			raffleObj['transactionId'] = ele.transactionId
			raffleSummary.push(raffleObj)
		})
		let dataObj = {
			paymentMethod: selectedPayoutOption !== "trueLayer" ? selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? 'Bank' : 'PayPal' : ' ' : 'TrueLayer',
			payPalId: selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? undefined : selectedPayoutId.split('_')[1] : undefined,
			bankId: selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? selectedPayoutId.split('_')[1] : undefined : undefined,
			raffleSummary: raffleSummary,
			isMobile: true,
			mobilePageType: 'pending_cash_prize'
		}
		let response = await claimMethodChangeWithLogin(dataObj);
		setIsDataFetching(false)
		if (response) {
			if (response.message == "truelayer link is sent.") {
				await RaffoluxAsyncStorage.setItem('trueLayerClaimData', winnerRaffleDetails)
				await RaffoluxAsyncStorage.setItem('trueLayerClaimURL', response.data.redirectUrl)
				dispatch(fetchMyPrizeCashClaims());
				setIsDataFetching(false)
				openBrowser(response.data.redirectUrl, 'pendingPrizeClaimSummary')
			}
			if (response.message == "Cash payment will be credited in next 24 business hours") {
				dispatch(fetchMyPrizeCashClaims());
				setIsDataFetching(false)
				navigation.navigate('PrizeConfirmationNew', { confirmationData: winnerRaffleDetails, pendingPrizePaymentMethod: selectedPayoutOption !== "trueLayer" ? selectedPayoutId !== null ? selectedPayoutId.split('_')[0] === 'bank' ? 'bank' : 'paypal' : ' ' : 'trueLayer', isPendingPrizeCashClaimSuccess: true })
			}
		} else {
			setIsDataFetching(false)
		}
	};

	const scrollToTop = () => mainScrollviewRef.current.scrollTo({ y: 0, animated: true });

	const handleDeepLink = async (event) => {
		InAppBrowser.close();
		let claimData = await RaffoluxAsyncStorage.getItem('trueLayerClaimData');
		if (event.url.includes('message')) {
			navigation.navigate('PrizeClaimTrueLayerError', { route: pendingPrizes ? 'pendingrizeClaimSummary' : 'prizeClaimSummary' })
		} if (event.url.includes('payout') && event.url.includes('prizeClaimSummary')) {
			navigation.navigate('PrizeConfirmationNew', { confirmationData: claimData, isPendingPrizeCashClaimSuccess:  false })
		}
		if (event.url.includes('payout') && event.url.includes('pending_cash_prize')) {
			navigation.navigate('PrizeConfirmationNew', { confirmationData: claimData, isPendingPrizeCashClaimSuccess:  true })
		}
	}

	// const linking = { prefixes: ['raffoluxmobile://'], config: { screens: { Main: { path: 'open?', parse: { authToken: (authToken) => authToken, }, }, }, }, };


	useEffect(() => {
		Linking.addEventListener('url', handleDeepLink);
		return () => {
			// Linking.removeEventListener('url', handleDeepLink);
		};
	}, []);


	const openBrowser = async (url, type) => {
		try {
			await InAppBrowser.isAvailable();
			await InAppBrowser.open(url, {
				// iOS Properties
				dismissButtonStyle: 'cancel',
				preferredBarTintColor: 'gray',
				preferredControlTintColor: 'white',
				// Android Properties
				showTitle: true,
				toolbarColor: '#6200EE',
				secondaryToolbarColor: 'black',
				enableUrlBarHiding: true,
				enableDefaultShare: true,
				forceCloseOnRedirection: true,
				incognito: true
			}).then(async (result) => {
				if (result.type == 'cancel') {
					let claimData = await RaffoluxAsyncStorage.getItem('trueLayerClaimData');
					let response = await fetchMyPrizeCashClaimsWithLogin()
					if (response) {
						if (type == "pendingPrizeClaimSummary") {
							isEmptyArray(response.data) ? navigation.navigate('PrizeConfirmationNew', { confirmationData: claimData }) : null
						} else {
							!isEmptyArray(response.data) ? navigation.navigate('PrizeClaimTrueLayerError', { trueLayerData: claimData, route: "prizeClaimSummary" }) : navigation.navigate('Home',{fromNavBar:true})
						}
					} else {
						navigation.navigate('Home', { fromNavBar: true })
					}
				}
				return result
			})
		} catch (error) {
			console.log(error)
		}

	}

	const styles = StyleSheet.create({
		mainCont: {
			flex: 1,
			backgroundColor: theme.background
		},
		scrollViewContainer: {
			flexGrow: 1,
			backgroundColor: theme.background,
		},
		mainContainer: {
			flex: 1,
			paddingBottom: responsiveHeight(25),
		},
		container: {
			paddingHorizontal: responsiveWidth(4),
			paddingBottom: responsiveHeight(10)
		},
		stepperContainer: {
			marginTop: responsiveHeight(4),
			marginHorizontal: responsiveWidth(13),
		},
		sunHeaderText: {
			color: theme.color,
			fontFamily: 'Gilroy-ExtraBold',
			fontSize: responsiveFontSize(2.2),
			textAlign: 'center',
			marginTop: responsiveHeight(5),
			opacity: 0.9
		},
		summaryCardsContainer: {
			marginTop: responsiveHeight(2),
			gap: responsiveHeight(2)
		},
		payoutHeader: {
			color: theme.color,
			fontFamily: 'NunitoSans-SemiBold',
			fontSize: responsiveFontSize(2),
			textAlign: 'center',
			opacity: 0.8
		},
		deliveryContainer: {
			marginTop: responsiveHeight(5)
		},
	})

	return (
		<View style={styles.mainCont}>
			<ScrollView style={styles.scrollViewContainer} ref={mainScrollviewRef}>
				<View style={styles.mainContainer}>
					<Header title={'Prize Claim'} theme={theme} />
					<View style={styles.container}>
						<View style={styles.stepperContainer}>
							<ClaimStepper page={'PrizeSummary'} />
						</View>
						<Text style={styles.sunHeaderText}>Prize Claim Summary</Text>
						<View style={styles.summaryCardsContainer}>
							{
								pendingPrizes ?
									winnerRaffleDetails?.map((ele, i) => {
										return (
											<ClaimSummaryCard key={i} typeOfClaim={1} image={ele.mainImgUrl} title={ele.title} option={ele.option} cash={ele.payoutAmount} selectedPayoutOption={selectedPayoutOption} totalCash={totalCash} />
										)
									})
									:
									winnerRaffleDetails?.map((ele, i) => {
										return (
											<ClaimSummaryCard key={i} claim2CategoryList={ele.categoryListArray[0].CategoryDisplayName} claim1CategoryList={ele.winnerArr.category} typeOfClaim={ele.winnerArr.typeOfClaim} specialCategories={specialCategories} image={ele.winnerArr.img_url ? ele.winnerArr.img_url : ele.winnerArr.websiteRaffles[0].MainImageUrl} title={ele.winnerArr.name ? ele.winnerArr.name : ele.winnerArr.websiteRaffles[0].Title} option={ele.option} cash={ele.winnerArr.price.cash} credit={ele.winnerArr.price.credit} split={ele.split} selectedPayoutOption={selectedPayoutOption} totalCash={totalCash} />
										)
									})
							}
						</View>
						{
							isPayoutShow &&
							<ClaimPayoutSection totalCash={totalCash} mainScrollviewRef={mainScrollviewRef} setSelectedPayoutId={setSelectedPayoutId} selectedPayoutId={selectedPayoutId} setSelectedPayoutOption={setSelectedPayoutOption} selectedPayoutOption={selectedPayoutOption} page={pendingPrizes ? 'pendingPrizeClaim' : 'prizeSummary'} />
						}
						{
							isAddressShow &&
							<View style={styles.deliveryContainer}>
								<ClaimDeliveryAddress setSelectedAddressId={setSelectedAddressId} selectedAddressId={selectedAddressId} />
							</View>
						}
						{
							isCreditShow &&
							<Text style={[styles.payoutHeader, styles.deliveryContainer]}>You will receive your prize instantly!</Text>
						}
					</View>
				</View>
			</ScrollView>
			<BottomButtonContainer theme={theme} completeClaim={pendingPrizes ? handlePendingPrizesClaim : handleCompleteClaim} title={'Confirm'} disableButton={((isAddressShow && isPayoutShow) ? (!selectedPayoutOption || !selectedAddressId) ? true : (selectedPayoutOption && selectedPayoutOption !== 'trueLayer' && !selectedPayoutId) ? true : false : isPayoutShow ? (!selectedPayoutOption || selectedPayoutOption && selectedPayoutOption !== 'trueLayer' && !selectedPayoutId) ? true : false : (isAddressShow && !selectedAddressId) ? true : false) || isDataFetching} isDataFetching={isDataFetching} changeOpacity={(isAddressShow && isPayoutShow) ? (!selectedPayoutOption || !selectedAddressId) ? true : (selectedPayoutOption && selectedPayoutOption !== 'trueLayer' && !selectedPayoutId) ? true : false : isPayoutShow ? (!selectedPayoutOption || selectedPayoutOption && selectedPayoutOption !== 'trueLayer' && !selectedPayoutId) ? true : false : (isAddressShow && !selectedAddressId) ? true : false} />
		</View>
	)
}

export default memo(PrizeClaimSummaryNew)
