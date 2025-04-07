import Accounts from "../Components/Accounts/Accounts"
import ChangePassword from "../Components/Accounts/ChangePassword"
import MarketingPreferences from "../Components/Accounts/MarketingPreferences"
import PayoutDetails from "../Components/Accounts/PayoutDetails"
import PersonalInformation from "../Components/Accounts/PersonalInformation"
import Authentication from "../Components/Authentication/Authentication"
import ForgotPasswordScreen1 from "../Components/Authentication/ForgotPasswordScreen1"
import ForgotPasswordScreen2 from "../Components/Authentication/ForgotPasswordScreen2"
import SignUpBonus from "../Components/Authentication/SignUpBonus"
import SignUpScreen2 from "../Components/Authentication/SignUpScreen2"
import SignUpVerificationFail from "../Components/Authentication/SignUpVerificationFail"
import SignUpVerificationScreen from "../Components/Authentication/SignUpVerificationScreen"
import SignUpVerificationSuccessPage from "../Components/Authentication/SignUpVerificationSuccessPage"
import Cart from "../Components/Cart"
import Category from "../Components/Category"
import Charity from "../Components/Charity"
import DrawDetails from "../Components/DrawDetails"
import FAQ from "../Components/FAQ"
import Home from "../Components/Home"
import InstantContainer from "../Components/InstantContainer"
import MyCredit from "../Components/MyCredit"
import MyRaffles from "../Components/MyRaffles"
import News from "../Components/News"
import NewsAndBlog from "../Components/NewsAndBlog"
import PaymentFailure from "../Components/PaymentFailure"
import PaymentFailureWithoutLogin from "../Components/PaymentFailureWithoutLogin"
import PaymentPendingWithLogin from "../Components/PaymentPendingWithLogin"
import PaymentPendingWithoutLogin from "../Components/PaymentPendingWithoutLogin"
import PaymentSucccessWithoutLogin from "../Components/PaymentSucccessWithoutLogin"
import PaymentSuccess from "../Components/PaymentSuccess"
import PaymentSuccessfulRevealTickets from "../Components/PaymentSuccessfulRevealTickets"
import PointClaim from "../Components/PointClaim"
import PointConfirmation from "../Components/PointConfirmation"
import PointsStore from "../Components/PointsStore"
import PrivacyAndPolicy from "../Components/PrivacyAndPolicy"
import PrizeClaimNew from "../Components/PrizeClaimNew"
import PrizeClaimSummaryNew from "../Components/PrizeClaimSummaryNew"
import PrizeClaimTrueLayerError from "../Components/PrizeClaimTrueLayerError"
import PrizeConfirmationNew from "../Components/PrizeConfirmationNew"
import Referral from "../Components/Referral"
import ResponsiblePlayAndWellbeing from "../Components/ResponsiblePlayAndWellbeing"
import TermsAndConditions from "../Components/TermsAndConditions"
import Winners from "../Components/Winners"
import WinnersGallery from "../Components/WinnersGallery"
import WithoutLoginCart from "../Components/WithoutLoginCart"
import WorkWithUs from "../Components/WorkWithUs"
import Loader from "./Loader"
import PaymentSuccessfulRevealTicketsWithoutLogin from "../Components/PaymentSuccessfulRevealTicketsWithoutLogin"
import InstantAnimation from "../Components/InstantAnimation"

export default StackRoutes = [
    {
        name: 'Home',
        component: Home
    },
    {
        name: 'Authentication',
        component: Authentication
    },
    {
        name: 'SignUpScreen2',
        component: SignUpScreen2
    },
    {
        name: 'SignUpVerificationScreen',
        component: SignUpVerificationScreen
    },
    {
        name: 'SignUpVerificationSuccessPage',
        component: SignUpVerificationSuccessPage
    },
    {
        name: 'SignUpVerificationFail',
        component: SignUpVerificationFail
    },
    {
        name: 'ForgotPasswordScreen1',
        component: ForgotPasswordScreen1
    },
    {
        name: 'ForgotPasswordScreen2',
        component: ForgotPasswordScreen2
    },
    {
        name: 'Winners',
        component: Winners
    },
    {
        name: 'DrawDetails',
        component: DrawDetails
    },
    {
        name: 'MyRaffles',
        component: MyRaffles
    },
    {
        name: 'Charity',
        component: Charity
    },
    {
        name: 'PointsStore',
        component: PointsStore
    },
    {
        name: 'PointClaim',
        component: PointClaim
    },
    {
        name: 'PointConfirmation',
        component: PointConfirmation
    },
    {
        name: 'MyCredit',
        component: MyCredit
    },
    {
        name: 'Accounts',
        component: Accounts
    },
    {
        name: 'PersonalInformation',
        component: PersonalInformation
    },
    {
        name: 'ChangePassword',
        component: ChangePassword
    },
    {
        name: 'PayoutDetails',
        component: PayoutDetails
    },
    {
        name: 'MarketingPreferences',
        component: MarketingPreferences
    },
    {
        name: 'Referral',
        component: Referral
    },
    {
        name: 'Cart',
        component: Cart
    },
    {
        name: 'InstantContainer',
        component: InstantContainer
    },
    {
        name: 'WinnersGallery',
        component: WinnersGallery
    },
    {
        name: 'FAQ',
        component: FAQ
    },
    {
        name: 'TermsAndConditions',
        component: TermsAndConditions
    },
    {
        name: 'PrivacyAndPolicy',
        component: PrivacyAndPolicy
    },
    {
        name: 'ResponsiblePlayAndWellbeing',
        component: ResponsiblePlayAndWellbeing
    },
    {
        name: 'Category',
        component: Category
    },
    {
        name: 'WorkWithUs',
        component: WorkWithUs
    },
    {
        name: 'PaymentSuccess',
        component: PaymentSuccess
    },
    {
        name: 'PaymentFailure',
        component: PaymentFailure
    },
    {
        name: 'NewsAndBlog',
        component: NewsAndBlog
    },
    {
        name: 'News',
        component: News
    },
    {
        name: 'Loader',
        component: Loader
    },
    {
        name: 'WithoutLoginCart',
        component: WithoutLoginCart
    },
    {
        name: 'PaymentSuccessWithoutLogin',
        component: PaymentSucccessWithoutLogin
    },
    {
        name: 'PrizeClaimTrueLayerError',
        component: PrizeClaimTrueLayerError
    },
    {
        name: 'PrizeClaimNew',
        component: PrizeClaimNew
    },
    {
        name: 'PrizeConfirmationNew',
        component: PrizeConfirmationNew
    },
    {
        name: 'PrizeClaimSummaryNew',
        component: PrizeClaimSummaryNew
    },
    {
        name: 'PaymentSuccessfulRevealTickets',
        component: PaymentSuccessfulRevealTickets
    },
    {
        name: 'PaymentPendingWithLogin',
        component: PaymentPendingWithLogin
    },
    {
        name: 'PaymentPendingWithoutLogin',
        component: PaymentPendingWithoutLogin
    },
    {
        name: 'PaymentFailureWithoutLogin',
        component: PaymentFailureWithoutLogin
    },
    {
        name: 'InstantAnimation',
        component: InstantAnimation
    },
    {
        name: 'PaymentSuccessfulRevealTicketsWithoutLogin',
        component: PaymentSuccessfulRevealTicketsWithoutLogin
    },

    
]