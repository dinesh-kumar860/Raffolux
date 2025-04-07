
import { RaffoluxAsyncStorage } from "../utils/RaffoluxAsyncStorage";


const routesApi = async () => {

	try {
		const token = await RaffoluxAsyncStorage.getItem('token')
		let routes = token ?
			{
				fetchAllRafflesWithLogin: 'fetchAllRafflesWithLogin',
				fetchFeaturedRafflesWithLogin: 'fetchFeaturedRafflesWithLogin',
				fetchStatistics: 'fetchStatistics',
				fetchPrizesWon: 'fetchPrizesWon',
				fetchRaffleWinners: 'fetchRaffleWinners',
				fetchRaffleWinnersThisWeek: 'fetchRaffleWinnersThisWeek',
				fetchRaisedCharity: 'fetchRaisedCharity',
				fetchSoldOutRafflesWithLogin: 'fetchSoldOutRafflesWithLogin',
				getRafflePageDataWithLogin: 'getRafflePageDataWithLogin',
				fetchTopPrizesWithLogin: 'fetchTopPrizesWithLogin',
				fetchAllPrizesWithLogin: 'fetchAllPrizesWithLogin',
				fetchTicketsSelectorWithLogin: 'fetchTicketsSelectorWithLogin',
				fetchSuperFeaturedRaffleWithLogin: 'fetchSuperFeaturedRaffleWithLogin',
				fetchMyPrizeCashClaimsWithLogin:'fetchMyPrizeCashClaimsWithLogin',
				
				addToCartWithLogin: 'addToCartWithLogin',
				fetchFromCartWithLogin: 'fetchFromCartWithLogin',
				deleteItemFromCartWithLogin: 'deleteItemFromCartWithLogin',
				fetchDiscountedPriceWithLogin: 'fetchDiscountedPriceWithLogin',
				deleteTicketFromCartWithLogin: 'deleteTicketFromCartWithLogin',

				// Charity Api
				charitySupportWithLogin: 'charitySupportWithLogin',
				fetchTotalRaisedCharitiesCount: 'fetchTotalRaisedCharitiesCount',
				fetchAllCharities: 'fetchAllCharities',
				fetchIndividualCharity: 'fetchIndividualCharity',
				updateCharityWithLogin: 'updateCharityWithLogin',

				// login Api
				signIn: 'signIn',
				generateOtpSmsVerificationWithLogin: 'generateOtpSmsVerificationWithLogin',
				socialSignInGoogle: 'socialSignIn/google/mobile',
				socialSignInFacebook: 'socialSignIn/facebook/mobile',

				// MyRaffles Api
				fetchMyRafflesWithLogin: 'fetchMyRafflesWithLogin',
				fetchMyPendingRafflesWithLogin: 'fetchMyPendingRafflesWithLogin',
				fetchMyRafflesTicketsWithLogin: 'fetchMyRafflesTicketsWithLogin',

				// MyCreditApi
				fetchMyCreditWithLogin: 'fetchMyCreditWithLogin',
				fetchOlderCreditWithLogin: 'fetchOlderCreditWithLogin',

				//winnersApi
				fetchWinnersMonthWithLogin: 'fetchWinnersMonthWithLogin',
				fetchWinnersMonthwiseDataWithLogin: 'fetchWinnersMonthwiseDataWithLogin',
				fetchWinnersDatewiseDataWithLogin: 'fetchWinnersDatewiseDataWithLogin',
				fetchWinnersDatewiseDataFilterWithLogin: 'fetchWinnersDatewiseDataFilterWithLogin',
				fetchlatestWinnersWithLogin: "fetchlatestWinnersWithLogin",

				//drawDetailsApi
				fetchDrawDetailsWithLogin: 'fetchDrawDetailsWithLogin',
				sortDrawticketsPurchaseWithLogin: 'sortDrawticketsPurchaseWithLogin',

				//pointsStoreApi
				fetchPointsStoreBalanceWithLogin: 'fetchPointsStoreBalanceWithLogin',
				fetchPointsClaimRenderWithLogin: 'fetchPointsClaimRenderWithLogin',
				fetchPointsStoreWithLogin: 'fetchPointsStoreWithLogin',
				fetchPointsClaimWithLogin: "fetchPointsClaimWithLogin",

				//claimAddressApi
				displayAddressWithLogin: 'displayAddressWithLogin',
				addAddressWithLogin: 'addAddressWithLogin',
				updateAddressDetailsWithLogin: 'updateAddressDetailsWithLogin',
				deleteAddressDetailsWithLogin: 'deleteAddressDetailsWithLogin',
				updatePointsClaimWithLogin: 'updatePointsClaimWithLogin',

				//winnersGallery
				fetchWinnersGalleryWithLogin: 'fetchWinnersGalleryWithLogin',

				//PrizeClaimApi
				fetchMyPrizeClaimsWithLogin: 'fetchMyPrizeClaimsWithLogin',

				//PrizeSummaryPayoutApi
				fetchPaypalDetailsWithLogin: 'fetchPaypalDetailsWithLogin',
				fetchBankDetailsWithLogin: 'fetchBankDetailsWithLogin',
				deletePaypalDetailsWithLogin: 'deletePaypalDetailsWithLogin',
				deleteBankDetailsWithLogin: 'deleteBankDetailsWithLogin',
				addBankDetailsWithLogin: 'addBankDetailsWithLogin',
				updateBankDetailsWithLogin: 'updateBankDetailsWithLogin',
				addPaypalDetailsWithLogin: 'addPaypalDetailsWithLogin',
				updatePaypalDetailsWithLogin: 'updatePaypalDetailsWithLogin',
				claimMyPrizesWithLogin: 'claimMyPrizesWithLogin',

				fetchMyPrizeClaimsCountWithLogin: 'fetchMyPrizeClaimsCountWithLogin',
				claimMethodChangeWithLogin:'claimMethodChangeWithLogin',

				//AccountsApi
				displayAddressWithLogin: 'displayAddressWithLogin',
				addAddressDetailsWithLogin: 'addAddressDetailsWithLogin',
				changePasswordWithLogin: 'changePasswordWithLogin',
				fetchAccountWithLogin: 'fetchAccountWithLogin',
				updateAccountWithLogin: 'updateAccountWithLogin',
				generateOtpSmsVerificationForAccountWithLogin: 'generateOtpSmsVerificationForAccountWithLogin',
				updateServiceOptsWithLogin: 'updateServiceOptsWithLogin',
				//SmsVerification
				verifySmsOtpForAccountWithLogin: "verifySmsOtpForAccountWithLogin",
				generateOtpSmsVerificationWithLogin: "generateOtpSmsVerificationWithLogin",

				//ReferralsApi
				fetchMyReferralCode: 'fetchMyReferralCode',

				//NewsAndBlogApi
				fetchNewsAndBlogs: 'fetchNewsAndBlogs',
				fetchNews: 'fetchNews',

				//cartApi
				cartPaymentWithLogin: 'cartPaymentWithLogin',
				fetchCartCountWithLogin: 'fetchCartCountWithLogin',

				//paymentSucccessApi
				fetchFromCartOnPaymentWithLogin: 'fetchFromCartOnPaymentWithLogin',

				//categories
				fetchCategoryWithLogin: "fetchCategoryWithLogin",
			}
			:
			{
				fetchAllRafflesWithLogin: 'fetchAllRaffles',
				fetchFeaturedRafflesWithLogin: 'fetchFeaturedRaffles',
				fetchStatistics: 'fetchStatistics',
				fetchPrizesWon: 'fetchPrizesWon',
				fetchRaffleWinners: 'fetchRaffleWinners',
				fetchRaffleWinnersThisWeek: 'fetchRaffleWinnersThisWeek',
				fetchRaisedCharity: 'fetchRaisedCharity',
				fetchSoldOutRafflesWithLogin: 'fetchSoldOutRaffles',
				getRafflePageDataWithLogin: 'getRafflePageData',
				fetchTopPrizesWithLogin: 'fetchTopPrizes',
				fetchAllPrizesWithLogin: 'fetchAllPrizes',
				fetchTicketsSelectorWithLogin: 'fetchTicketsSelector',
				fetchSuperFeaturedRaffleWithLogin: 'fetchSuperFeaturedRaffle',

				addToCartWithLogin: 'addToCartWithLogin',
				fetchFromCartWithLogin: 'fetchFromCartWithLogin',
				deleteItemFromCartWithLogin: 'deleteItemFromCartWithLogin',
				fetchDiscountedPriceWithLogin: 'fetchDiscountedPriceWithLogin',
				deleteTicketFromCartWithLogin: 'deleteTicketFromCartWithLogin',

				// Charity Api
				charitySupportWithLogin: 'charitySupportWithLogin',
				fetchTotalRaisedCharitiesCount: 'fetchTotalRaisedCharitiesCount',
				fetchAllCharities: 'fetchAllCharities',
				fetchIndividualCharity: 'fetchIndividualCharity',
				updateCharityWithLogin: 'updateCharityWithLogin',

				// login Api
				signIn: 'signIn',
				generateOtpSmsVerificationWithLogin: 'generateOtpSmsVerificationWithLogin',
				socialSignInGoogle: 'socialSignIn/google/mobile',
				socialSignInFacebook: 'socialSignIn/facebook/mobile',

				// MyRaffles Api
				fetchMyRafflesWithLogin: 'fetchMyRafflesWithLogin',
				fetchMyPendingRafflesWithLogin: 'fetchMyPendingRafflesWithLogin',
				fetchMyRafflesTicketsWithLogin: 'fetchMyRafflesTicketsWithLogin',

				// MyCreditApi
				fetchMyCreditWithLogin: 'fetchMyCreditWithLogin',
				fetchOlderCreditWithLogin: 'fetchOlderCreditWithLogin',

				//winnersApi
				fetchWinnersMonthWithLogin: 'fetchWinnersMonth',
				fetchWinnersMonthwiseDataWithLogin: 'fetchWinnersMonthwiseData',
				fetchWinnersDatewiseDataWithLogin: 'fetchWinnersDatewiseData',
				fetchWinnersDatewiseDataFilterWithLogin: 'fetchWinnersDatewiseDataFilter',
				fetchlatestWinnersWithLogin: "fetchlatestWinners",

				//drawDetailsApi
				fetchDrawDetailsWithLogin: 'fetchDrawDetails',
				sortDrawticketsPurchaseWithLogin: 'sortDrawticketsPurchase',

				//pointsStoreApi
				fetchPointsStoreBalanceWithLogin: 'fetchPointsStoreBalanceWithLogin',
				fetchPointsClaimRenderWithLogin: 'fetchPointsClaimRenderWithLogin',
				fetchPointsStoreWithLogin: 'fetchPointsStoreWithLogin',
				fetchPointsClaimWithLogin: "fetchPointsClaimWithLogin",

				//claimAddressApi
				displayAddressWithLogin: 'displayAddressWithLogin',
				addAddressWithLogin: 'addAddressWithLogin',
				updateAddressDetailsWithLogin: 'updateAddressDetailsWithLogin',
				deleteAddressDetailsWithLogin: 'deleteAddressDetailsWithLogin',
				updatePointsClaimWithLogin: 'updatePointsClaimWithLogin',

				//winnersGallery
				fetchWinnersGalleryWithLogin: 'fetchWinnersGallery',

				//PrizeClaimApi
				fetchMyPrizeClaimsWithLogin: 'fetchMyPrizeClaimsWithLogin',

				//PrizeSummaryPayoutApi
				fetchPaypalDetailsWithLogin: 'fetchPaypalDetailsWithLogin',
				fetchBankDetailsWithLogin: 'fetchBankDetailsWithLogin',
				deletePaypalDetailsWithLogin: 'deletePaypalDetailsWithLogin',
				deleteBankDetailsWithLogin: 'deleteBankDetailsWithLogin',
				addBankDetailsWithLogin: 'addBankDetailsWithLogin',
				updateBankDetailsWithLogin: 'updateBankDetailsWithLogin',
				addPaypalDetailsWithLogin: 'addPaypalDetailsWithLogin',
				updatePaypalDetailsWithLogin: 'updatePaypalDetailsWithLogin',
				claimMyPrizesWithLogin: 'claimMyPrizesWithLogin',

				fetchMyPrizeClaimsCountWithLogin: 'fetchMyPrizeClaimsCountWithLogin',

				//AccountsApi
				displayAddressWithLogin: 'displayAddressWithLogin',
				addAddressDetailsWithLogin: 'addAddressDetailsWithLogin',
				changePasswordWithLogin: 'changePasswordWithLogin',
				fetchAccountWithLogin: 'fetchAccountWithLogin',
				updateAccountWithLogin: 'updateAccountWithLogin',
				generateOtpSmsVerificationForAccountWithLogin: 'generateOtpSmsVerificationForAccountWithLogin',
				updateServiceOptsWithLogin: 'updateServiceOptsWithLogin',
				//SmsVerification
				verifySmsOtpForAccountWithLogin: "verifySmsOtpForAccountWithLogin",
				generateOtpSmsVerificationWithLogin: "generateOtpSmsVerificationWithLogin",

				//ReferralsApi
				fetchMyReferralCode: 'fetchMyReferralCode',

				//NewsAndBlogApi
				fetchNewsAndBlogs: 'fetchNewsAndBlogs',
				fetchNews: 'fetchNews',

				//cartApi
				cartPaymentWithLogin: 'cartPaymentWithLogin',
				fetchCartCountWithLogin: 'fetchCartCountWithLogin',

				//paymentSucccessApi
				fetchFromCartOnPaymentWithLogin: 'fetchFromCartOnPaymentWithLogin',

				//categories
				fetchCategoryWithLogin: "fetchCategory",

				//GuestCheckout
				guestCheckout: "guestCheckout",
				fetchGuestCartOnPayment: "fetchGuestCartOnPayment",
				guestAccountCreation: "guestAccountCreation"

			}
		return routes
	} catch (error) {
		console.log('error in fetching token', error)
		return error
	}

}

const Url = {
	ImageUrl: 'https://raffolux-static.s3.eu-west-2.amazonaws.com/static/website/',
	TaxFreeImgUrl: 'https://static.raffolux.com/static/website/media23/raf2000A_mini.webp',
	webPImgUrl: 'https://static.raffolux.com/static/website/',
	TrustPilotLink: 'https://www.trustpilot.com/review/raffolux.com'
};


export { routesApi, Url }



