import accountsPersonLogo from '../assets/Images/accountsPersonLogo.png';
import addressBookLogo from '../assets/Images/addressBookLogo.png';
import accountsMegaphoneLogo from '../assets/Images/accountsMegaphoneLogo.png';
import accountsKeyLogo from '../assets/Images/accountsKeyLogo.png';
import accountsArrowIcon from '../assets/Images/accountsArrowIcon.png';

import accountsPersonLogoDark from '../assets/Images/accountsPersonLogoDark.png';
import addressBookLogoDark from '../assets/Images/addressBookLogoDark.png';
import accountsMegaphoneLogoDark from '../assets/Images/accountsMegaphoneLogoDark.png';
import accountsKeyLogoDark from '../assets/Images/accountsKeyLogoDark.png';
import accountsArrowIconDark from '../assets/Images/accountsArrowIconDark.png';

import whatsapp from '../assets/Images/myReferralWhatsapp.png';
import instagram from '../assets/Images/myReferralInstagram.png';
import telegram from '../assets/Images/myReferralTelegram.png';
import gmail from '../assets/Images/myReferralGmail.png';
import messenger from '../assets/Images/myReferralMessenger.png';
import messages from '../assets/Images/myReferralMessages.png';
import facebook from '../assets/Images/myReferralFacebook.png';
import mail from '../assets/Images/myReferralMail.png';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Url } from './routesApi';

//Footer
import visaIcon from '../assets/Images/VisaCopy1.png'
import masterCardIcon from '../assets/Images/MastercardCopy1.png'
import paypalIcon from '../assets/Images/PayPalCopy1.png'
import gpayIcon from '../assets/Images/GooglePayCopy1.png'
import applePayIcon from '../assets/Images/ApplePayCopy1.png'
import facebookIcon from '../assets/Images/FacebookIcon.png'
import instagramIcon from '../assets/Images/InstagramIcon.png'
import twitterIcon from '../assets/Images/TwitterIcon.png'
import linkedInIcon from '../assets/Images/LinkedInIcon.png'

//Menu
import menuFacebookImageLight from '../assets/Images/menuFacebookImageLight.png'
import menuFacebookImageDark from '../assets/Images/menuFacebookImageDark.png'
import menuTwitterImageLight from '../assets/Images/menuTwitterImageLight.png'
import menuTwitterImageDark from '../assets/Images/menuTwitterImageDark.png'
import menuInstagramImageLight from '../assets/Images/menuInstagramImageLight.png'
import menuInstagramImageDark from '../assets/Images/menuInstagramImageDark.png'
import menuLinkedinImageLight from '../assets/Images/menuLinkedinImageLight.png'
import menuLinkedinImageDark from '../assets/Images/menuLinkedinImageDark.png'



export const common = {
    poundSymbol: '£',
    NoDataFound: 'No Data Found!',
    LiveDraew: 'Live Draew',
    en_US: 'en-US',
    wonInPrizes: 'won in prizes',
    trophy: 'trophy',
    ribbon: 'ribbon',
    gift: 'gift',
    winnersaDay: 'winners a day',
    winners: 'winners',
    donated: 'donated',
    oneFifty: '150+',
    success: 'success',
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    passwordMessage: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long',
    UnknownError: 'something went wrong',
    excellent: "Excellent",
    congratulations: "Congratulations",
    draw: "Draw",
    purchaseSuccessful: "Purchase Successful",
    thankYou: "Thank you",
    goodLuck: "Good luck!",
    continue: "CONTINUE",
    Won: "Won",
    londonTimezone: 'Europe/London',
    noImagegradientColors: ['#FFD70D', '#FFAE05'],
    gradientLocations: [0.0031, 0.5013, 0.5014, 0.5015, 1],
    gradientStartPoint: { x: 0, y: 0 },
    gradientEndPoint: { x: 1, y: 0 },
    gradientColors: ['#00C08D', '#00C0A0', '#00C09D', '#D9D9D9', '#D9D9D9'],
    ddLLLhaFormat: 'dd LLL, h a',
    HHHH_Format: 'HH:mm',
    Do_MMM_YYYY_Format: 'd MMM yyyy',
    Tickets: "Tickets",
    sold: "sold",
    loadMore: "+ load more",
    prizes: "prizes",
    prize: "prize",
    termsAndConditions: "terms & conditions",
    RP: "RP",
    PhoneNumber: "Phone Number",
    UserNumberAlreadyExists: "User Number Already Exists",
    SaveChanges: "Save Changes",
    verified: "verified",
    Unverified: "Unverified",
    InvalidEmailAddress: 'Invalid email address',
    EmailIsRequired: 'Email is required',
    PasswordIsRequired: 'Password is required',
    InvalidPassword: "Invalid Password",
    UserEmailDoesNotExists: "User Email Does Not Exists",
    ForgotPassword: "Forgot password?",
    SignIn: "Sign in",
    SignInWithGoogle: 'Sign in with Google',
    SignInWithFacebook: 'Sign in with Facebook',
    and: "and",
    Hi: "Hi",
    MyRaffles: "MyRaffles",
    point: "point",
    points: "points",
    PointsStore: "PointsStore",
    Home: 'Home',
    MyCredit: "MyCredit",
    Referral: "Referral",
    light: "light",
    dark: "dark",
    Accounts: "Accounts",
    theme: 'theme',
    FAQ: "FAQ",
    logout: "logout",
    PrizeClaim: "PrizeClaim",
    raffle: "raffle",
    raffles: "raffles",
    Cancel: "Cancel",
    credit: "credit",
    Verify: "Verify",
    Success: "Success!",
    Continue: "Continue",
    cancel: "cancel",
    linearGradientColors: ['#FFD70D', '#FFAE05'],
    TicketLimitExceeded: "Ticket Limit Exceeded",
    WithoutLoginCartData: "WithoutLoginCartData",
    error: "error",
    PaymentFailure: "PaymentFailure",
    PaymentSuccessWithoutLogin: "PaymentSuccessWithoutLogin",
    cartId: "cartId",
    cartIdDetails: "cartIdDetails",
    url: 'url',
    slide: "slide",
    close: "close",
    Authentication: "Authentication",
    FirstName: "First name",
    enterYourName: "enter your name",
    firstName: "firstName",
    LastName: "Last name",
    enterYourLastName: "enter your last name",
    lastName: "lastName",
    EmailAddress: "Email address",
    enterYourEmailAddress: "enter your email address",
    email: "email",
    TermsAndConditions: "TermsAndConditions",
    PrivacyAndPolicy: "PrivacyAndPolicy",
    chevronLeft: 'chevron-left',
    ribbon: "ribbon",
    handled: "handled",
    search: "search",
    arrowForward: "arrow-forward",
    slide: "slide",
    x: "x",
    chevronUp: "chevron-up",
    chevronDown: "chevron-down"
}


export const AppConstants = {
    ErrorFetchingThemeModeFromAsyncStorage: 'Error fetching theme mode from AsyncStorage:'
}

export const timerText = {
    YourCartWillExpireIn: 'Your cart will expire in',
    zeroTime: '00 : 00 : 00',
}

export const Home = {
    CHOOSE_YOUR_SIGN_UP_OFFER: 'CHOOSE YOUR SIGN UP OFFER',
    OFFERS: 'OFFERS',
    LIVE_COMPETITIONS: 'LIVE COMPETITIONS',
    LIVE_RAFFLES: 'LIVE RAFFLES',
    FEATURED_JACKPOTS: 'FEATURED JACKPOTS',
    Awaiting_Draw: 'AWATING DRAW',
    activeRaffles: 'active raffles',
    endingSoon: 'ending soon',
    Ticketprice: 'Ticket price',
    RaffleEnds: 'Raffle ends',
    TicketsAvailable: 'Tickets available',
    PLAY: 'PLAY',
    All: 'All',
    Cash: 'Cash',
    Tech: 'Tech',
    Holidays: 'Holidays',
    Other: 'Other',
    Indulgence: 'Indulgence',
    Electronic: 'Electronic',
    Car: 'Car',
    Promotion: 'Promotion',
    wonInPrizesSoFar: 'won in prizes so far',
    ENDSTODAY: 'ENDS TODAY',
    EXPIRED: 'EXPIRED',
    daysLeft: 'days left',
    dayLeft: 'day left',
    ZeroTime: '00:00:00',
    days: 'days',
    hrs: 'hrs',
    Menu: 'Menu',
    Token: 'token',
    Home: 'home',
    AreYouSureYouWantToLogout: 'Are you sure you want to logout?',
    No: 'No',
    Yes: 'Yes',
    ENTERNOW: 'ENTER NOW',
    CashAlternative: 'Cash alternative: ',
    SOLD: '% SOLD: ',
    EnterNow: 'Enter now',
    NoImageToShow: 'No Image',
    SupportedPaymentOptions: 'Supported payment options',
    tabsArray: [
        {
            title: 'All',
            id: 0
        },
        {
            title: 'Cash',
            id: 35
        },
        {
            title: 'Tech',
            id: 6
        },
        {
            title: 'Holidays',
            id: 9
        },
        {
            title: 'Car',
            id: 36
        },
        {
            title: 'Promotion',
            id: 100
        },
        {
            title: 'Other',
            id: 1000
        }
    ],
    superRaffleGradientColors: ['#00061600', '#000616']
}

export const liveComponents = {
    LAUNCH_PRICE: 'LAUNCH PRICE',
}

export const cart = {
    Cart: 'Cart',
    PlayWithConfidence: 'Play with Confidence',
    RatedExcellent: 'Rated Excellent',
    PromoCode: 'Promo code',
    PromoCodeSuccess: 'Promo code bARGAIN25 applied successfully',
    UseCreditBalance: 'Use credit balance',
    available: 'available',
    UseMyCreditBalanceForThisPurchase: 'Use my credit balance for this purchase',
    CreditBalanceApplied: 'Credit balance applied',
    Subtotal: 'Subtotal',
    YouWillEarn: 'You will earn',
    forThisPurchase: 'for this purchase',
    APPLY: 'APPLY',
    TOTAL: 'TOTAL',
    CHECKOUT: 'CHECKOUT',
    zeroValue: '£0.00',
    DiscountCodeApplied: 'Discount code applied',
    phoneNumber: '020 3929 7496',
    stillUser: `Still unsure?  Give us a call on`,
    _stillUser: `we’ll be happy to answer any questions`,
    SorryThisCodeHasExpired: 'Sorry, this code has expired',
    InvalidVoucher: 'Invalid Voucher',
    VoucherNotApplicable: 'Voucher Not Applicable',
    VoucherLimitExceeded: 'Voucher limit exceeded.',
    yourCartIsEmpty: 'Your cart is empty. Why not check out our current raffles to get started?',
    sinceTheCartIsEmptyYouCantApplyThePromoCode: `since the cart is empty you can't apply the promo code `,
    NoSuchVoucherExists: 'No Such Voucher Exists.',
    NoItemInCart: 'No Item in Cart',
    PleaseFillInThepromoCodeField: 'Please fill in the promo code field.',
    WeThinkYouWouldLike: 'We think you would like',
    and: 'and',
    enterPromoCode: 'enter promo code',
    YouCantApplyPromocodeSinceYouHaveAddedCustomRaffleToTheCart: `You can't apply promocode, Since you have added custom raffle to the cart`,
    PromoCode: 'Promo code',
    appliedSuccessfully: 'applied successfully',
    showEntries: 'show entries',
    hideEntries: 'hide entries',
    perEntry: 'per entry',
    promoCode: "promoCode",
}

export const WithoutLoginCart = {
    YourCartIsEmpty: "Your Cart is empty",
    HaveALookAtWhatOn: "Have a look at what’s on offer and add tickets to your cart to get started!",
    ToTheRaffles: "To the raffles",
    perEntry: "per entry",
    decrement: "decrement",
    increment: "increment",
    delete: "delete",
    minus: "minus",
    plus: "plus",
    close: "close",
    raffle: "raffle",
    OrderSummary: "Order summary",
    Subtotal: "Subtotal",
    TOTAL: "TOTAL",
    arrowBack: "arrow-back",
    Checkout: "Checkout"
}
export const Category = {
    category: 'category',
    Raffles: 'Raffles',
    NoRafflesFoundIn: 'No raffles found in',
}

export const account = {
    PersonalInformation: 'Personal Information',
    ChangePassword: 'Change password',
    PayoutDetails: 'Payout details',
    MarketingPreferences: 'Marketing preferences',
    PrizeDeliveryAddress: "Prize delivery address",
    addNewAddress: "add new address",
    PayoutMethod: "Payout Method",
    addNewPayoutMethod: 'add new payout method',
    EditSavedAddress: "Edit saved address",
    AreYouSureYouWantToDeleteThisSaved: "Are you sure you want to delete this saved",
    Delete: "Delete",
    AccountNumberEnding: "Account number ending",
    EditBankDetails: "Edit Bank details",
    AddNewBankDetails: "Add new bank details",
    SavedSuccessfully: "Saved Successfully!",
    UpdatedSuccessfully: "Updated Successfully!",
    AddNewPayoutMethod: "Add new payout method",
    BankTransfer: "Bank Transfer",
    Paypal: "Paypal",
    EditPaypalDetails: "Edit Paypal details",
    AddPaypalDetails: "Add Paypal details",
    UpdateDetails: "Update details",
    SaveDetails: "Save details",
    AddNewAddress: "Add new address",
    ChangeYourPassword: "Change your password",
    HowShouldWeContactYou: "How should we contact you?",
    IWouldLikeToReceiveExcitingUpdates: "I would like to receive exciting updates on raffles, my chosen charity, partner promotions, exclusive discounts and free tickets.",
    IWantToOptInForOccasionalSMSMarketing: "I want to opt in for occasional SMS marketing about raffles that are ending soon."
}

export const Footer = {
    Categories: [
        { id: '1', lable: 'Cash', value: 'cash' },
        { id: '2', lable: 'Tech', value: 'electronic' },
        { id: '3', lable: 'Cars', value: 'car' },
        { id: '4', lable: 'Holidays', value: 'holiday' },
        { id: '5', lable: 'Indulgence', value: 'indulgence' },
    ],
    paymentSection: [visaIcon, masterCardIcon, paypalIcon, gpayIcon, applePayIcon],
    socialMediaApps: [
        { image: facebookIcon, link: 'https://www.facebook.com/raffolux' },
        { image: instagramIcon, link: 'https://www.instagram.com/raffolux/?hl=en-gb' },
        { image: twitterIcon, link: 'https://twitter.com/raffolux' },
        { image: linkedInIcon, link: 'https://uk.linkedin.com/company/raffolux' },
    ],
    website: [
        { title: 'My Raffles', component: 'MyRaffles' },
        { title: 'News & Blog', component: 'NewsAndBlog' },
        { title: 'Account', component: 'Accounts' },
        { title: 'Responsible Play', component: 'ResponsiblePlayAndWellbeing' },
        { title: 'Winners Gallery', component: 'WinnersGallery' },
    ],
    privacyPolicy: [
        // { title: 'Work With Us', component: 'WorkWithUs' },
        { title: 'Privacy Policy', component: 'PrivacyAndPolicy' },
        { title: 'Terms of Service', component: 'TermsAndConditions' },
    ]
}

export const cartArr = ['Reliable and Secure Card Processing ', 'Trustworthy Draws from Random.org', 'Transparent Entry Lists & No Extensions', 'Checkout with PayPal, Apple Pay & G Pay']

export const cartpara = 'Still unsure?  Give us a call on 01923 918637 and we�ll be happy to answer any questions '

export const accountsList = [
    { icon: accountsPersonLogo, route: 'PersonalInformation', text: 'Personal Information', arrowIcon: accountsArrowIcon },
    { icon: addressBookLogo, route: 'PayoutDetails', text: 'Payout details', arrowIcon: accountsArrowIcon },
    { icon: accountsMegaphoneLogo, route: 'MarketingPreferences', text: 'Marketing preferences', arrowIcon: accountsArrowIcon },
    { icon: accountsKeyLogo, route: 'ChangePassword', text: 'Change password', arrowIcon: accountsArrowIcon },
]
export const accountsListDark = [
    { icon: accountsPersonLogoDark, route: 'PersonalInformation', text: 'Personal Information', arrowIcon: accountsArrowIconDark },
    { icon: addressBookLogoDark, route: 'PayoutDetails', text: 'Payout details', arrowIcon: accountsArrowIconDark },
    { icon: accountsMegaphoneLogoDark, route: 'MarketingPreferences', text: 'Marketing preferences', arrowIcon: accountsArrowIconDark },
    { icon: accountsKeyLogoDark, route: 'ChangePassword', text: 'Change password', arrowIcon: accountsArrowIconDark },
]

export const accounts = {
    PasswordSuccessfullyChanged: "Password successfully changed!",
}

export const termsAndConditions = {
    termsAndConditions: 'Terms & Conditions',
    termsAndConditionsSubText: "The following Terms apply to all purchases of Raffolux Tickets and all Entries submitted to any Competition on the Promoter's Website or App.",
    terms: 'TERMS',
    termsSubText: 'When joining Raffolux, Entrants will be required to tick on the Website or App that they have read and accepted these Terms and agreed to be bound by them.',
    thePromoter: 'The Promoter',
    thePromoterSubText: 'All Competitions are operated by the Promoter, and the Promoter is the official sponsor of each Competition unless specified otherwise. Where the product is sourced from a Raffolux Partner, the Promoter is authorised by that Raffolux Partner to offer their respective Product(s) as Prizes in the Competitions.',
    howToEnter: 'How to Enter',
    howToEnterSubText1: 'By submitting an Entry, a Postal Entry or a Telephone Entry, Entrants agree to be bound by these Terms. If you do not so agree to be bound, do not purchase Raffolux Tickets, and do not submit an Entry, Postal Entry or Telephone Entry.',
    howToEnterSubText2: 'To validly purchase Raffolux Tickets and validly enter a Competition, a Visitor must become a Registered User by completing all details on the Membership Form on the Website or App, or signing in through one of the linked social media platforms, and must then either:',
    howToEnterSubText3: 'pay an amount to purchase the desired number of Raffolux Tickets and thereby make an Entry before the Closing Date of that particular Competition;',
    howToEnterSubText4: 'submit a Competition entry via the free Postal Entry option (see terms 6 and 7 for more details on postal entry)',
    howToEnterSubText5: 'submit a Competition entry for free for any Flash Competition via the Telephone Entry option (see terms 8 and 9 for more details on telephone entry)',
    howToEnterSubText6: "Purchases of Raffolux Tickets shall be processed by VivaWallet. This shall be subject to the payment providers' terms and conditions, which are available to view on their website.",
    howToEnterSubText7: "Purchasers of Raffolux Tickets will be asked to provide their contact details, including an e-mail address and, optionally, a telephone number. This information will be processed in accordance with the provisions below and the Promoter’s Data Protection and Privacy Policy. The Promoter’s relevant payment provider will require the purchaser’s card payment details and may require their postcode. Once the purchase order for the Raffolux Tickets is submitted, the Registered User's card payment will be electronically approved and the Promoter will not retain any records of the Registered User's card details.",
    howToEnterSubText8: "Entrants entering into a Competition for free via Postal Entry must become a Registered User, and then mail their full name and a contact telephone number (including area code if providing a landline number) and the e-mail registered to their Account, as well as the title of the Competition they wish to enter, to Raffolux Ltd, 4 Ravey Street, London, EC2A 4QP. The aforementioned information required must be printed in legible English. This information will be processed in accordance with the provisions in these Terms and the Promoter’s Data Protection and Privacy Policy.",
    howToEnterSubText9: "Postal Entries must be sent by first or second class stamp, and must be received by the Promoter at Raffolux Ltd, 4 Ravey Street, London, EC2A 4QP before the Draw Date of the relevant Competition or the point that the Competition sells out - whichever comes first - in order to be entered into the Competition. Postal Entries must be sent on an unenclosed postcard or letter. Attempted Postal Entries received on anything other than a postcard or in a letter will not be accepted. The Entrant must specify which Competition they wish to enter. In the case of multiple entries received on a single postcard or within a single envelope, only one entry will be entered into the relevant Competition. If the Entrant's Account cannot be identified from the details provided on the Postal Entry, then the Competition-specific single ticket entry will not be processed. Postal Entries without correct and sufficient postage paid will be invalid and will not be considered. Personal and hand deliveries will not be accepted.",
    howToEnterSubText10: "Entrants entering into a Flash Competition may do so for free via Telephone Entry. Entrants entering Flash Competitions via Telephone Entry must become a Registered User, and then call 07727650878. All calls received by this telephone number will only be charged at the normal rate with no additional charges. Telephone Entry entrants must provide their full name, the e-mail associated with their Raffolux account, the title of the Flash Competition they wish to enter, and a contact telephone number in order to be entered into the Flash Competition. This information will be processed in accordance with the provisions in these Terms and the Promoter's Data Protection and Privacy Policy.",
    howToEnterSubText11: "Telephone Entries must be received before the Draw Date of the relevant Flash Competition in order to be entered into the Competition. If the Entrant's account cannot be identified from the details provided on the phone call, then the entry into the Flash Competition will not be processed.",
    howToEnterSubText12: "The Promoter will store and process the Entrant’s personal information. The personal information must include details of at least one form of contact and will be used for the following purposes:",
    howToEnterSubText13: "to notify any Winner or Runner(s) Up that they have won a Prize in a Competition;",
    howToEnterSubText14: "to administer the Website and App and conduct the Competitions; and",
    howToEnterSubText15: "after a Draw, to post the Winner and, where applicable, any Runner(s) Up’s first name, town/county of residence and profile image or other provided photo on the Website and/or App, and in media communications about the Competitions.",
    howToEnterSubText16: "All Entrants are solely and completely responsible for providing the Promoter with accurate and current contact details.",
    howToEnterSubText17: "The Promoter will be in no way liable for any failure or inability to make contact with any Entrant due to any errors, omissions or inaccuracies in the contact details provided by the Entrants or otherwise.",
    howToEnterSubText18: "The Promoter will not accept:",
    howToEnterSubText19: "responsibility for Entries that are lost, mislaid, damaged or delayed in transit, regardless of cause including, for example, equipment failure, technical malfunction, systems, satellite, network, server, computer hardware or software failure of any kind; or",
    howToEnterSubText20: "responsibility for Postal Entries that are lost, mislaid, damaged, or delayed in receipt at the specified address until after the earlier of the Closing Date of the relevant Competition or the point that the Competition sells out, and this holds regardless of the cause including, for example, failure of postal service, natural disasters, and water corruption; or",
    howToEnterSubText21: "any other purported proof of entry to the Competition other than as recorded by the systems of the Website or App, or by the Promoter upon receipt of a Postal Entry or Telephone Entry.",
    howToEnterSubText22: "An Entry, and/or a Postal Entry and/or Telephone Entry shall be declared void (without any refund being given) if the Entrant engages in:",
    howToEnterSubText23: "any form of fraud, whether actual or apparent;",
    howToEnterSubText24: "fraudulent misrepresentation;",
    howToEnterSubText25: "fraudulent concealment;",
    howToEnterSubText26: "hacking or interference with the proper functioning of the Website or App; or",
    howToEnterSubText27: "amending, or unauthorised use of, any code that constitutes the Website or App (for example, utilising any information from the Website's code to gain an advantage over other Entrants).",
    howToEnterSubText28: "Each individual Entrant may submit up to the maximum number of entries specified in total for any one particular Competition.",
    howToEnterSubText29: "Only valid Entries, Postal Entries and Telephone Entries will be entitled to participate in a Competition and be eligible to win a Prize in a Competition.",
    howToEnterSubText30: "All funds paid to the Promoter in return for Raffolux Tickets, and all Entries, Postal Entries and Telephone Entries to any one Competition are final. Refunds shall not be given at any time apart from under the circumstances described in terms 28 and 42.",
    howToEnterSubText31: "For further help with Entries, Postal Entries and Telephone Entries, please contact us by using the chat icon on the Website or App.",
    eligibility: "Eligibility",
    eligibilitySubText1: "Competitions are open for entry only to private individuals (i.e. not a limited company, partnership or limited liability partnership) aged 18 (eighteen) or over and residing in the United Kingdom, excluding the Promoter and their employees.",
    eligibilitySubText2: "Only Registered Users are eligible to enter any Competition.",
    eligibilitySubText3: "In entering a Competition, all Entrants confirm that they are eligible to do so and eligible to claim any Prize awarded in the relevant Competition. The Promoter may require any Entrant, including any Winner and/or Runner(s) Up to provide evidence that they are and were eligible to enter a particular Competition.",
    eligibilitySubText4: "The Promoter will not accept and will not refund Entries that are:",
    eligibilitySubText5: "automatically generated by computer;",
    eligibilitySubText6: "completed by third parties;",
    eligibilitySubText7: "paid for using a debit/credit card belonging to someone other than the Entrant;",
    eligibilitySubText8: "altered, reconstructed, forged or tampered with; or",
    eligibilitySubText9: "incomplete",
    eligibilitySubText10: "The Promoter will not accept and will not refund Postal Entries that are:",
    eligibilitySubText11: "completed by third parties;",
    eligibilitySubText12: "illegible, have been altered, reconstructed, forged or tampered with;",
    eligibilitySubText13: "incomplete;",
    eligibilitySubText14: "incorrectly sent by post;",
    eligibilitySubText15: "delayed in receipt at the Promoter's specified address (see term 7) until after the earlier of the Closing Date of the relevant Competition or the point that the Competition sells out, or are not received at the Promoter's specified address (see term 7) through whatever reason other than the Promoter's actions.",
    eligibilitySubText16: "The Promoter reserves all rights to disqualify Entrants if their conduct is contrary to the spirit or intention of the Competition entered.",
    eligibilitySubText17: "Entries, Postal Entries and Telephone Entries on behalf of another private individual will not be accepted, and joint submissions are not allowed. Registered Users may not create more than one account to play under and benefit from, whether the additional accounts are created under fake names or not. If the Promoter discovers that Entries, Postal Entries or Telephone Entries are being made by the same individual from more than one account, all such entries will be voided, no refund shall be given, no Prizes won shall be paid out and the Promoter will be entitled to claim back any Prizes won by the additional accounts. If the Promoter, in their sole estimation, believes that one or more accounts are Linked Accounts, then those Linked Accounts shall have their entries voided with no refunds given, no Prizes won shall be paid out to those Linked Accounts, and the Promoter will be entitled to claim back any Prize or its equivalent value that has already been claimed by the Linked Accounts.",
    eligibilitySubText18: "By entering the Competition, Entrants warrant that all information that they submit is accurate, true, current and complete. The Promoter reserves the right to disqualify any Entrant (entirely at the Promoter's discretion) if there are reasonable grounds to believe the Entrant has acted in breach of any of these Terms.",
    eligibilitySubText19: "The Promoter reserves the right to close or suspend a Registered User’s Account (and prevent the individual who created the Account from participating in any future competitions under a different e-mail) at any time and for any reason. Without limiting the preceding sentence, the Promoter shall be entitled to close or suspend a Registered User’s account if:",
    eligibilitySubText20: "the Registered User is writing abusive, misleading, or factually incorrect statements to the Promoter's staff, on social media, review websites, and so on;",
    eligibilitySubText21: "the Registered User has become bankrupt;",
    eligibilitySubText22: "the Promoter considers that the Registered User has used the Website or the App in a fraudulent manner or for illegal and/or unlawful or improper purposes;",
    eligibilitySubText23: "the Promoter considers that the Registered User has used the Website or the App in an unfair manner, has deliberately cheated or taken unfair advantage of the Promoter or any of its other Registered Users or if the Registered User’s Account is being used for the benefit of a third party;",
    eligibilitySubText24: "the Promoter is requested to do so by the police, any regulatory authority or court;",
    eligibilitySubText25: "the Promoter considers that any of the events referred to in ‘a.’ to ‘d.’ may have occurred or are likely to occur; or",
    eligibilitySubText26: "the Registered User’s Account is deemed to be dormant.",
    eligibilitySubText27: "If the Promoter closes or suspends the Registered User’s Account for any of the reasons referred to in ‘a.’ to ‘f.’ above, the Registered User shall be liable for any and all claims, losses, liabilities, damages, costs and expenses incurred or suffered by the Promoter arising therefrom and shall indemnify and hold the Promoter harmless on demand for the same. In the circumstances referred to in ‘a.’, ‘b.’, ‘f.’ and ‘g’ above, the Promoter may choose to refund any outstanding entries to the Registered User. In the same circumstances in the preceding sentence, the Promoter reserves the right to disqualify any Entries that have already been entered into a Competition for which the Draw has not yet taken place.",
    PrizesAndTheDraw: "Prizes and the Draw",
    PrizesAndTheDrawSubText1: "The Winner and any Runner(s) Up for each Competition will be determined and awarded the relevant Competition Prize(s) so specified on the Website and on the App in accordance with these Terms.",
    PrizesAndTheDrawSubText2: "The Draw to determine the Winner and, where applicable, any Runner(s) Up will be made on the Draw Date.",
    PrizesAndTheDrawSubText3: "Unless brought about by circumstances outside of the Promoter's control (e.g. a server crash that lasts for a notable period), the Promoter will never extend the Closing Date for any Competition.",
    PrizesAndTheDrawSubText4: "On a Competition's Draw Date:",
    PrizesAndTheDrawSubText5: "there will be a Draw to determine the Winner, and the Prize shall be awarded to the Winner subject to KYC checks being completed as outlined in term 35;",
    PrizesAndTheDrawSubText6: "where the Competition provides for one or more Runner Up Prize(s), there will be a Draw or Draws to determine the Runner(s) up, who shall be awarded the associated Runner Up Prize(s) subject to KYC checks being completed as outlined in term 35.",
    PrizesAndTheDrawSubText7: "If any Winner or Runner(s) Up cannot be contacted by the Promoter within 21 (twenty-one) days of being notified of their status as the Winner by e-mail and/or telephone provided in the contact details submitted in their Entry, the Promoter shall be entitled to award their Prize to the Entrant next Drawn, with the effect that the first Runner Up (as applicable) would become the Winner, the second Runner Up (as applicable) would become the first Runner Up, and so on. Any alternate Winner or Runner Up shall likewise comply with the above 21 (twenty-one) day contact requirement.",
    PrizesAndTheDrawSubText8: "The Promoter shall use its best efforts to ensure and preserve the random nature of the Draw. The Draws are currently operated either live utilising a ball machine produced by SmartPlay International, or remotely using a True Random Number Generator. In the event that any mechanical defect occurs that relates to the draw (such as an incomplete number being drawn), the draw will be cancelled and re-run once the defect has been remedied, or, failing this, using an alternative random draw method. The result(s) of the Draw are final and the Promoter shall not enter into any correspondence in relation to the same.",
    PrizesAndTheDrawSubText9: "Upon the request of the Promoter, the Winner, and where applicable, any Runner(s) Up will be required to forward personal identification, such as a driver's license or passport, as well as a recent utility bill or other official document confirming their address, to the Promoter to prove their identity and age, that their Entry, Postal Entry or Telephone Entry was made in accordance with these Terms, and that there is no lawful impediment (pursuant to any applicable UK or international law) to the Winner or any Runner(s) Up being awarded any Prize in the relevant Competition. The Promoter may refuse delivery of the Prize to the Winner and any Runner(s) Up if the requested personal identification is not received. In the event that the Promoter reasonably believes that there may be a lawful impediment to awarding a Prize to a Winner or any Runner(s) Up, the Promoter may suspend making such award until the legal issue is resolved or if, in the reasonable opinion of the Promoter such issue cannot be resolved, to award that Prize in a like manner as set out in term 32.",
    PrizesAndTheDrawSubText10: "In the event that the Winner or Runner Up wins a vehicle, unless the Promoter elects at its sole discretion to deliver the vehicle, the Winner or Runner Up will be required to travel to the Promoter's offices or a mutually agreed location to collect the Prize. For winners outside of Great Britain, registration and transport will be the responsibility of the Winner or Runner Up.",
    PrizesAndTheDrawSubText11: "The Promoter is entitled to refuse delivery of a Prize to a P.O. box or any other location that may be used to conceal the identity of a Winner, in order to ensure that a Prize is not delivered to a fraudulent Winner.",
    PrizesAndTheDrawSubText12: "In cases where the Promoter reasonably suspects fraud has occurred, and/or an individual has taken steps to gain an unfair and unintended advantage over other Entrants in any Competition, the Promoter is entitled to refuse delivery of any Prizes that the individual under suspicion may have won. The Promoter is entitled to use any legitimate Competition wins to set off an amount owing to it from an individual, howsoever that liability arises.",
    PrizesAndTheDrawSubText13: "In cases where the Prize is an experience, which should be taken to include, for example, domestic and international holidays, day-trips and one-off events or occasions, the Winner of the Prize or any Runner(s) Up will be contacted by either the Promoter or a Raffolux Partner to arrange delivery of the experience. If the Winner or Runner Up fails to confirm necessary details (e.g. the people who will be attending the experience, the desired date of the experience, etc.) within 14 days from the point of being contacted, then it is acknowledged that, on occasion, certain elements of the Prize may not be available, in which case the Promoter and the Winner/Runner Up will arrange a mutually agreeable substitute experience up to the same value as the original Prize. Where booking with a third-party provider, the Winner or Runner Up must get in contact with the Promoter before booking to confirm all items of the experience (e.g. flights, travel dates, number of people) so that the Promoter can ensure full delivery of the Prize on the desired dates, as often these items are booked with different providers and require co-ordination. In instances where the Winner or Runner up fails to confirm the details with the Promoter before booking the experience and complications arise, the Promoter will substitute up to the total value of the original Prize where possible, but will have no further liability to the Winner or Runner Up.",
    PrizesAndTheDrawSubText14: "The Promoter does not in any way guarantee or give any warranties as to the value of the Prize, its condition, history or any other matters associated with the Prize.",
    PrizesAndTheDrawSubText15: "In that the event that the Promoter sends the Winner or any Runner(s) Up a Prize that is greater than the value of the Prize advertised in the Competition and noted in the description, then the Winner or Runner Up, upon the request of the Promoter, must return the excess value that was sent in error. For example, if the Entrant has won a £100 Prize, and the Promoter sends the Entrant £1000 in error, then the Entrant must return £900 to the Promoter.",
    PrizesAndTheDrawSubText16: "The Promoter reserves the right to remove a Competition from the Website or App at any time, and in the rare event that this occurs, will refund all the Entries and any Postal Entry (relative to the value of the used stamps) and/or Telephone Entry to that Competition to the Registered User in the form of Site Credit.",
    Charity: "Charity",
    CharitySubText1: "Registered Users have the option to select to support one of the promoter’s Partnered Charities. At the end of each month, and weighted by the Registered User's relative spend to total sales that month, the Promoter will donate 8% (eight per cent) of the month's net proceeds to the Partnered Charity selected by the Registered User, and 2% (two per cent) to be split and donated in even parts to the remaining Partnered Charities. If for any reason the donation is deemed to be a taxable supply, then any payments to charities or their trading subsidiary will be inclusive of VAT.",
    CharitySubText2: "The Raffolux Partner or the Promoter may, for any Competition for which it has provided a Prize, specify a Charity to which a percentage of the total Raffolux Ticket sales will be donated. The Promoter or the Raffolux Partner will make the Charitable Donation after the Draw.",
    AnnouncementOfWinners: "Announcement of Winners and any Runner(s) Up",
    AnnouncementOfWinnersSubText1: "The Promoter has the right, with the winner's consent, to announce and publish any of the information outlined in term 10(c) pertaining to any Competition’s Winner and Runner(s) Up on the Website and via email marketing campaigns, as well as on the Promoter’s associated social media pages/sites, such as Facebook, Instagram and Twitter. The Promoter may also ask the Winner and/or any Runner(s) Up to participate in further reasonable publicity requests.",
    LimitationOfLiability: "Limitation of Liability",
    LimitationOfLiabilitySubText1: "Insofar as is permitted by law, the Promoter, its agents or distributors will not in any circumstances be responsible or liable to compensate any Entrant or accept any liability for any loss, damage, personal injury or death occurring as a result of submitting an Entry, Postal Entry or Telephone Entry, or in relation to the use and enjoyment of a Prize by the Winner or Runner(s) Up gained through any Competition, except where death or personal injury is caused by the negligence or fraud of the Promoter, or that of their agents, distributors, or employees. The Winner’s statutory rights are not affected.",
    LimitationOfLiabilitySubText2: "The liability of the Promoter to each Entrant is limited to the aggregate value of the Entry Fees paid by that Entrant.",
    LimitationOfLiabilitySubText3: "The Promoter accepts no liability for errors or omissions contained within the description of any Prize awarded as part of any of the Competitions on the Website or App, or the Prize Value, or any other description or specification or any other part of the Website or App. It is the responsibility of each Entrant (and in particular the Winner and any Runner(s) Up) to satisfy him/herself as to the accuracy of any such details and/or any content of the Website or App.",
    LimitationOfLiabilitySubText4: "The Promoter accepts no liability for errors or omissions caused by human error or technical faults within the Promoter's technological infrastructure. This limitation of liability applies in situations such as where errors or faults lead to the system or the Promoter's staff wrongly paying out or promising to pay out Prizes or cash alternatives to Registered Users, Registered Users winning prizes in a reasonably unintended manner, the system drawing a Competition twice, Treasure Hunt raffles having the ticket selector available for use, and so on. In such situations, no prizes shall be paid out and, subject to a full refund issued to the Registered User (or Site Credit should the Registered User prefer), the Promoter shall have no further liability for any reason. Confirmation emails and other communications from the Promoter do not constitute acceptance of any transaction on the Promoter's Website or App.",
    LimitationOfLiabilitySubText5: "The Promoter accepts no liability for non-receipt or issues with receipt of a Prize due to errors in information provided by the Winner or Runner Up, such as incorrect bank account details or a wrong delivery address.",
    General: "General",
    GeneralSubText1: "The Promoter shall not be a trustee of any Entry Fees received, unless it is subject to a specific contractual agreement with a Raffolux Partner or Charity to act as such.",
    GeneralSubText2: "The Promoter reserves the right to suspend or cancel any Competition at any time, either before or after Entries and/or Postal Entries and/or Telephone Entries have been received. In cases where a human or a technical error has resulted in participants being awarded one or more Prizes in an unfair manner or participants being disadvantaged, the Promoter reserves the right to cancel the Competition, not award any Prizes for that Competition, and refund Entry Fees paid directly to the Entrant. This applies even if the Prizes have already been won, as each participant must have the same chance of winning per ticket in every Competition. If a Competition is cancelled due to the Promoter’s actions and specifically not those of the Raffolux Partner or any other entity associated with the Competition, the Promoter will return the Entry Fees paid by each Entrant to them as Site Credit, and return the relevant Entry Fee for each Postal Entry or Telephone Entry made by each Entrant to them as Site Credit (relative to the value of the ticket price in the Competition). Where all the Entry Fees have been returned, the Promoter shall have no further liability to the Entrant or to any other person.",
    GeneralSubText3: "Without prejudice to the operation of term 52, the Promoter reserves the right to cancel any Competition in the event that an order is made or a resolution is passed for the winding up of the Promoter, or an order is made for the appointment of an administrator to manage the affairs of the Promoter, or circumstances arise which entitle a court or creditor to appoint a receiver or manager or which entitle a court to make a winding up order, or the Promoter takes or suffers any analogous action in consequence of debt or an application to court for protection from its creditors is made by the Promoter.",
    GeneralSubText4: "The Promoter may occasionally run promotions where customers will receive benefits, such as but not limited credit, additional tickets or discounts. Unless otherwise stated, such benefits are to be availed of no more than once per Registered User, and the Promoter reserves the right to not provide any stated benefit if the Promoter, at their sole discretion, believes the promotion is being availed of beyond the intended limit. Where the Promoter runs promotions where a minimum spend is required to be enter into a competition, the spend required is deemed to exclude credit unless explicitly stated otherwise.",
    GeneralSubText5: "The Promoter reserves the right to make reasonable amendments to these Terms at any time, with immediate effect upon publishing such amendments on the Website and App. Any such amendments shall not prejudice any Entries, Postal Entries or Telephone Entries received prior to the time of such changes.",
    GeneralSubText6: "These Terms shall not create or be construed as creating any form of contract, joint venture or other agreement between any Entrant and the Promoter.",
    GeneralSubText7: "All Competitions that the Promoter promotes, their administration and all associated activities shall be governed by the laws of England and Wales, and all parties submit to the exclusive jurisdiction of the courts of England and Wales.",
    Definitions: "Definitions",
    DefinitionSubText1: "Note that throughout the Terms, plural forms of the capitalised terms are used, and have the same meaning as given below.",
    DefinitionSubText2: "Account",
    DefinitionSubText3: "means the Registered User's Raffolux account.",
    DefinitionSubText4: "App",
    DefinitionSubText5: "means the Raffolux mobile application, available on both iOS and Android platforms.",
    DefinitionSubText6: "Charity/Charities",
    DefinitionSubText7: "means the charities or charitable causes that may be specified by a Raffolux Partner or the Promoter for a particular Competition.",
    DefinitionSubText8: "Charitable Donation",
    DefinitionSubText9: "means the percentage of the total Raffolux Ticket sales for a Competition that will be paid to the Charity or Charities specified by the Raffolux Partner.",
    DefinitionSubText10: "Closing Date",
    DefinitionSubText11: "means the date on which a Competition closes.",
    DefinitionSubText12: "Competition",
    DefinitionSubText13: "means any free draw operated by the Promoter on its Website and/or App to which these Terms apply, wherein the Entrants submit Entries, and/or Postal Entries and/or Telephone Entries via the Website and App for a chance to win Prize(s).",
    DefinitionSubText14: "Draw",
    DefinitionSubText15: "means the random selection of an Entry and/or Postal Entry and/or Telephone Entry from the class of total entries, that occurs on the relevant Competition’s Draw Date to determine the Winner and, where applicable, any Runner(s) Up.",
    DefinitionSubText16: "Draw Date",
    DefinitionSubText17: "means the date at which the Draw takes place, which will be the earlier of the Closing Date of the relevant Competition, or the point that the Competition is sold out.",
    DefinitionSubText18: "Entrant",
    DefinitionSubText19: "means any natural person (not including a limited company, partnership or limited liability partnership) who validly submits an Entry, Postal Entry or Telephone Entry to a Competition, in accordance with these Terms.",
    DefinitionSubText20: "Entry",
    DefinitionSubText21: "means a validly submitted and completed entry by the Entrant through the Website or App in order to gain an opportunity to win a Prize.",
    DefinitionSubText22: "Entry Fee",
    DefinitionSubText23: "means the entry fee payable as a condition of submitting a valid Entry. The fee will be stated clearly for each Competition, and may vary between Competitions.",
    DefinitionSubText24: "Flash Competition",
    DefinitionSubText25: "means a competition for a Prize that has a duration of 48 hours or less, and can be entered either online or for free by Telephone Entry (see terms 8 and 9 for more information)",
    DefinitionSubText66:"Linked Accounts",
    DefinitionSubText67:" Any two accounts which are linked by any detail, whether that be name, bank details, payment details, activity patterns, and so on.",
    DefinitionSubText26: "Membership Form",
    DefinitionSubText27: "means the form required to be completed, unless a linked social media sign-in is used, in order for a Visitor to become a Registered User.",
    DefinitionSubText28: "Partnered Charity",
    DefinitionSubText29: "means one of the charities that can be selected to be sponsored by Registered Users, to receive donations in accordance with the procedure laid out in term 43.",
    DefinitionSubText30: "Postal Entry",
    DefinitionSubText31: "means a validly composed and posted postcard or letter, in accordance with these Terms, that is received by the Promoter.",
    DefinitionSubText32: "Prize",
    DefinitionSubText33: "refers to the good or service so specified in each Competition that a Winner or Runner Up of that Competition may receive. The Prize to be awarded to the Winner and/or Runner(s) Up cannot be substituted for any Prize of equivalent value, such as a cash prize, solely due to a request of the Winner and/or Runner(s) Up. The Promoter reserves the right to offer a cash alternative to the Prize specified in the Competition, and to offer a Prize of equal or greater value if for some reason the Prize is no longer available due to circumstances outside the Entrant’s control.",
    DefinitionSubText34: "Prize Value",
    DefinitionSubText35: "means the description of the value of a Prize of a Competition.",
    DefinitionSubText36: "Product",
    DefinitionSubText37: "means a good or service owned by a Raffolux Partner.",
    DefinitionSubText38: "Promoter",
    DefinitionSubText39: "means Raffolux, which is the trading name of Raffolux Ltd, company number 10962686, whose registered office address is Raffolux Ltd, 4 Ravey Street, London, EC2A 4QP.",
    DefinitionSubText40: "Raffolux Partner",
    DefinitionSubText41: "refers to a company or private individual that enters into an agreement with the Promoter to provide one or more Products.",
    DefinitionSubText42: "Raffolux Tickets",
    DefinitionSubText43: "means the virtual tickets that Registered Users purchase in order to enter into a Competition.",
    DefinitionSubText44: "Registered User",
    DefinitionSubText45: "means a Visitor that has filled out a Membership Form, or signed in through one of the linked social media platforms such as Facebook or Twitter. Registered Users are eligible to make Entries, a Postal Entry or a Telephone Entry to any Competition, insofar as they are eligible to do so due to the nature of the Competition itself.",
    DefinitionSubText46: "Runner(s) Up",
    DefinitionSubText47: "means the Entrant(s) selected second, third, fourth, and so on as required by the Draw on the Draw Date.",
    DefinitionSubText48: "Runner Up Prize(s)",
    DefinitionSubText49: "means the Prize that a Runner Up will receive, as may be specified in a Competition.",
    DefinitionSubText50: "Site Credit",
    DefinitionSubText51: "Site Credit: means a store of credit that can be applied to reduce a Registered User’s checkout balance.",
    DefinitionSubText52: "Telephone Entry",
    DefinitionSubText53: "means a validly completed entry by phone call, in accordance with these Terms, that is received by the Promoter.",
    DefinitionSubText54: "Terms",
    DefinitionSubText55: "means these terms and conditions.",
    DefinitionSubText56: "Treasure Hunt Raffle",
    DefinitionSubText57: "means a raffle where a number of instant win prizes are available. Where the ticket number listed against an instant win prize in the raffle description corresponds to an Entrant's ticket number, the relevant instant win prize shall be transferred to the ticket holder. Instant win prizes shall not be transferred to a ticket holder for any other reason other than direct correspondence with the ticket number the Entrant has acquired. The ticket selector is disabled for this type of raffle, and customers buy randomly allocated tickets for their chance to win.",
    DefinitionSubText58: "True Random Number Generator",
    DefinitionSubText59: "means the Random.org software built by DR Mads Haahr of the School of Computer Science and Statistics at Trinity College Dublin in Ireland. The particular software utilises atmospheric noise to ensure the highest level of entropy, and select a truly random Winner of each Competition.",
    DefinitionSubText60: "Visitor",
    DefinitionSubText61: "means any unique visitor that is a natural person (not including a limited company, partnership or limited liability partnership) to the Raffolux Website or App.",
    DefinitionSubText62: "Website",
    DefinitionSubText63: "means https://raffolux.com and all sub-domains attached to this domain.",
    DefinitionSubText64: "Winner",
    DefinitionSubText65: "means the Entrant first selected by the Draw on the Draw Date, and in accordance with these Terms."
}

export const PrivacyAndPolicy = {
    welcomeToRaffoluxPrivacy: [
        {
            text: 'This Privacy and Cookies Policy (the "Policy") applies to the website https://raffolux.com (the “Website”) and the Raffolux App (the "App"), both of which are run by Raffolux Ltd ("Raffolux"), whose registered office address is at Raffolux Ltd, 4 Ravey Street, London, EC2A 4QP (company number 10962686). All references in this Policy to "we", "us", and "our" are to Raffolux.'
        },
        {
            text: 'Raffolux recognises the importance of honest and responsible use of your personal information, and we are committed to protecting and respecting your privacy. This Policy explains how Raffolux collects, uses and discloses personal information about you when you visit the Website or the App, and when you contact Raffolux, whether by e-mail, post, fax or telephone using the contact options on the Website and App. The information you provide to us through the Website and the App will initially be collected by Raffolux, but may then be shared with other companies to the extent that it is necessary to do so for Raffolux to operate effectively.'
        },
        {
            text: 'It is important to Raffolux that you feel completely comfortable in visiting and using the Website and the App.'
        },
        {
            text: 'Our website uses information which may involve the use of cookies and Web beacons. Please see the "Cookies" section below for more information.'
        },
        {
            text: 'This website is not intended for children and we do not knowingly collect data relating to children.'
        }
    ],
    dataProtection: [
        {
            text: 'For the purposes of the Data Protection Act 2018 (the "Act") and the General Data Protection Regulation 2016/679 (the "GDPR"), the data controller is Raffolux.'
        },
        {
            text: 'We have appointed a data protection officer (DPO) who is responsible for overseeing questions in relation to this privacy policy. If you have any questions about this privacy policy, including any requests to exercise your legal rights, please contact the DPO using the details set out below.'
        }
    ],
    contactDetails: [
        {
            text: 'If you have any questions about this privacy policy or our privacy practices, please contact our DPO:'
        },
        {
            text: 'Name: Zion Chetram'
        },
        {
            text: 'Email address: zion@raffolux.com'
        },
        {
            text: 'Postal address: Raffolux Ltd, 4 Ravey Street, London, EC2A 4QP'
        },
        {
            text: 'Telephone number: 02039 297496'
        },
        {
            text: "You have the right to make a complaint at any time to the Information Commissioner's Office (ICO), the UK regulator for data protection issues (www.ico.org.uk). We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance."
        },
    ],
    changesToPrivacyPolicy: [
        {
            text: 'We keep our privacy policy under regular review. This version was last updated in May 2023.'
        },
        {
            text: 'It is important that the personal data we hold about you is accurate and current. Please keep us informed if your personal data changes during your relationship with us.'
        },
    ],
    thirdPartyLinks: 'This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.',
    legalBasisText1: 'The legal basis on which Raffolux relies to process your personal information includes:',
    legalBasisText2: 'On some occasions, Raffolux processes your data with your consent (for example, when you agree that Raffolux may place cookies on your device or process or share information that you input into our website)',
    legalBasisText3: 'On other occasions, Raffolux processes your data when we need to do this to fulfil a contract with you (for example, if you win a prize in a competition that Raffolux promoted or where we are required to do this by law, e.g. to comply with record keeping obligations).',
    legalBasisText4: 'Raffolux also processes your data when it is in Raffolux’s legitimate interests to do this, and when these interests are not overridden by your data protection rights (including, for example, when Raffolux shares data with our affiliates).',
    legalBasisText5: "In most cases, the information that Raffolux processes about you is required to deal with your request or registration, or is required by law, or is necessary for the exercise of Raffolux’s legitimate business interests and needs, in which case special care is taken to safeguard your rights and to ensure any such use is proportionate.",
    legalBasisText6: "Raffolux may also convert personal information into anonymous data and use it (normally on an aggregated statistical basis) for research and analysis to improve Raffolux’s performance.",
    PersonalInformationText1: "Personal data, or personal information, means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).",
    PersonalInformationText2: "If you want to contact Raffolux or to use certain facilities we provide on the Website, you will need to provide us with some additional personal information so that we can liaise with you and deal with your request, query or application. If you do choose to provide Raffolux with your personal information, Raffolux will collect that information for our own use and for the purposes described in this Policy.",
    PersonalInformationText3: "We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:",
    PersonalInformationText4: "Identity Data includes first name, last name, username or similar identifier, title, date of birth and gender.",
    PersonalInformationText5: "Contact Data includes billing address, delivery address, email address and telephone numbers.",
    PersonalInformationText6: "Financial Data includes bank account and payment card details.",
    PersonalInformationText7: "Transaction Data includes details about payments to and from you.",
    PersonalInformationText8: "Technical Data includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.",
    PersonalInformationText9: "Profile Data includes your username and password, purchases or orders made by you, preferences, feedback and survey responses.",
    PersonalInformationText10: "Usage Data includes information about how you use our website, products and services.",
    PersonalInformationText11: "Marketing and Communications Data includes your preferences in receiving marketing from us and our third parties and your communication preferences.",
    PersonalInformationText12: "This information will be collected primarily from you as information voluntarily provided to us, but we may also collect it where lawful to do so from (and combine it with information from) public sources, third party service providers, individuals whom you have indicated have agreed for you to provide their personal information, government, tax or law enforcement agencies, and other third parties. We may also collect personal information about you from your use of other company services.",
    PersonalInformationText13: "We also collect, use and share Aggregated Data such as statistical or demographic data for any purpose. Aggregated Data could be derived from your personal data but is not considered personal data in law as this data will not directly or indirectly reveal your identity. For example, we may aggregate your Usage Data to calculate the percentage of users accessing a specific website feature. However, if we combine or connect Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the combined data as personal data which will be used in accordance with this privacy policy",
    PersonalInformationText14: "We do not collect any Special Categories of Personal Data about you (this includes details about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union membership, information about your health, and genetic and biometric data). Nor do we collect any information about criminal convictions and offences.",
    PersonalInformationText15: "Raffolux may use information about you for purposes described in this Policy or disclosed to you on our Website and App or with our services. For example, we may use information about you for the following purposes, all of which we believe to be in our legitimate business interests:",
    PersonalInformationText16: "to operate competitions promoted on the Website and App;",
    PersonalInformationText17: "to respond to and/or deal with any request or enquiry you may raise;",
    PersonalInformationText18: "to improve our products and services and to ensure that content on the Website and App is presented in the most effective manner for you and for your device;",
    PersonalInformationText19: "to administer the Website and App;",
    PersonalInformationText20: "for internal record keeping;",
    PersonalInformationText21: "to contact you (directly, either by Raffolux or through a relevant partner or agent) by e-mail or phone for the above reasons;",
    PersonalInformationText22: "subject to your consent where required under applicable laws, to carry out direct marketing, targeting through paid marketing, and/or e-mail marketing that you have requested;",
    PersonalInformationText23: "to perform any contract Raffolux has with you; for compliance with legal, regulatory and other good governance obligations; and",
    PersonalInformationText24: "subject to your consent when entering a charity prize draw or raffle, to share your personal data via secure transfer to any specified third party organisations.",
    PersonalInformationText25: "Your personal information will be made available for the purposes mentioned above (or as otherwise notified to you from time to time), on a 'need-to-know' basis and only to responsible management, human resources, accounting, legal, audit, compliance, information technology and other Raffolux staff who properly need to know these details for their functions within Raffolux. Please note that certain individuals who will see your personal information may not be based at Raffolux or in your country of residence (please see below).",
    PersonalInformationText26: "We may share personal information within Raffolux as needed for reasonable management, analysis, planning and decision making, including in relation to taking decisions regarding the expansion and promotion of our service offering and for use by Raffolux for the other purposes described in this Policy.",
    PersonalInformationText27: "Your personal information may also be made available to third parties (within or outside Raffolux) providing relevant services under contract to Raffolux (see below for further details), such as credit and debit card processors, auditors and compliance managers, provider or call centres and IT hosting and IT maintenance providers. These companies may use information about you to perform their functions on our behalf. Subject to your consent when entering a charity prize draw or raffle, Raffolux may also share your personal data via secure transfer to any specified third party organisations. Those organisations will process that data for their own respective purposes, and will become the controller of that personal data. Raffolux has put in place various security and data privacy measures, inclusive in scope of such third parties, in order to protect personal information and shall seek to comply with applicable legal requirements.",
    PersonalInformationText28: 'The data that we collect from you may be transferred to, and stored at, a destination outside the European Economic Area ("EEA"). It may also be processed by staff operating outside the EEA that work for us or for one of our providers. This may include staff engaged in, among other things, the fulfilment of any contract with you, the processing of your payment details and the provision of support services. By submitting your personal data, you agree to this transfer, storing or processing. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Policy.',
    PersonalInformationText29: "We may disclose specific information upon lawful request by government authorities, law enforcement and regulatory authorities where required or permitted by law and for tax or other purposes. Personal information may also be released to external parties in response to legal process, and when required to comply with laws, or to enforce our agreements, corporate policies, and terms of use, or to protect the rights, property or safety of Raffolux, our employees, agents, customers, and others, as well as to parties to whom you authorise Raffolux to release your personal information.",
    PersonalInformationText30: "We will not sell your personal information to any third party other than as part of any restructuring of Raffolux or sale of the business.",
    PersonalInformationText31: "We have set out below, in a table format, a description of all the ways we plan to use your personal data, and which of the legal bases we rely on to do so. We have also identified what our legitimate interests are where appropriate.",
    PersonalInformationText32: "Note that we may process your personal data for more than one lawful ground depending on the specific purpose for which we are using your data. Please contact us if you need details about the specific legal ground we are relying on to process your personal data where more than one ground has been set out in the table below.We may share personal information within Raffolux as needed for reasonable management, analysis, planning and decision making, including in relation to taking decisions regarding the expansion and promotion of our service offering and for use by Raffolux for the other purposes described in this Policy.",
    PersonalInfoTableData: {
        tableHead: ['Purpose/Activity', 'Type of data', 'Lawful basis for processing including basis of legitimate interest'],
        widthArr: [140, 160, 180],
        tableData: [
            ['To register you as a new customer', `(a) Identity\n\n(b) Contact`, 'Performance of a contract with you'],
            [`To process and deliver your order including:\n\n(a) Manage payments, fees and charges\n\n(b) Collect and recover money owed to us`, `(a) Identity\n\n(b) Contact\n\n(c) Financial\n\n(d) Transaction\n\n(e) Marketing and Communications`, `(a) Performance of a contract with you\n\n(b) Necessary for our legitimate interests (to recover debts due to us)`],
            [`To manage our relationship with you which will include:\n\n(a) Notifying you about changes to our terms of privacy policy\n\n(b) Asking you to leave a review or take a survey`, `(a) Identity\n\n(b) Contact\n\n(c) Profile\n\n(d) Marketing and Communications`, `(a) Performance of a contract with you\n\n(b) Necessary to comply with a legal obligation\n\n(c) Necessary for our legitimate interests (to keep our records updated and to study how customers use our products/services)`],
            [`To enable you to partake in a prize draw, competition or complete a survey`, `(a) Identity\n\n(b) Contact\n\n(c) Profile\n\n(d) Usage\n\n(e) Marketing and Communications`, `(a) Performance of a contract with you\n\n(b) Necessary for our legitimate interests (to study how customers use our products/services, to develop them and grow our business`],
            [`To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting and hosting of data)`, `(a) Identity\n\n(b) Contact\n\n(c) Technical`, `(a) Necessary for our legitimate interests (for running our business, provision of administration and IT services, network security, to prevent fraud and in the context of a business reorganisation or group restructuring exercise)\n\n(b) Necessary to comply with a legal obligation`],
            [`To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you`, `(a) Identity\n\n(b) Contact\n\n(c) Profile\n\n(d) Usage\n\n(e) Marketing and Communications\n\n(f) Technical`, `Necessary for our legitimate interests (to study how customers use our products/services, to develop them, to grow our business and to inform our marketing strategy)`],
            [`To use data analytics to improve our website, products/services, marketing, customer relationships and experiences`, `(a) Technical\n\n(b) Usage`, `Necessary for our legitimate interests (to define types of customers for our products and services, to keep our website updated and relevant, to develop our business and to inform our marketing strategy)`],
            [`To make suggestions and recommendations to you about goods or services that may be of interest to you`, `(a) Identity\n\n(b) Contact\n\n(c) Technical\n\n(d) Usage\n\n(e) Profile\n\n(f) Marketing and Communications`, `Necessary for our legitimate interests (to develop our products/services and grow our business)`]
        ]
    },
    PersonalInformationText33: "We strive to provide you with choices regarding certain personal data uses, particularly around marketing and advertising. Raffolux may wish to provide you with information about new products, services, promotions and offers which may be of interest to you, and may invite you to take part in market research or request feedback on our products and services. This communication may occur by e-mail, telephone, post, social media or SMS. We will obtain your consent and advise you of how to opt-out of receiving such communications where we are required to do so in accordance with applicable law.",
    PersonalInformationText34: "Raffolux takes reasonable steps to maintain appropriate physical, technical and administrative security to help prevent loss, misuse, unauthorised access, disclosure or modification of personal information. While we take these reasonable efforts to safeguard your personal information, we cannot guarantee the security of any personal information you disclose online. You accept the inherent security implications of dealing online and will not hold us responsible for any breach of security unless such breach has been caused by the specific negligence of Raffolux, or our agents.",
    PersonalInformationText35: "How long will you use my personal data for?",
    PersonalInformationText36: "We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.",
    PersonalInformationText37: "To determine the appropriate retention period for personal data, we consider the amount, nature and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal, regulatory, tax, accounting or other requirements.",
    PersonalInformationText38: "By law we have to keep basic information about our customers (including Contact, Identity, Financial and Transaction Data) for six years after they cease being customers for tax purposes.",
    PersonalInformationText39: "In some circumstances you can ask us to delete your data: see your legal rights below for further information.",
    PersonalInformationText40: "In some circumstances we will anonymise your personal data (so that it can no longer be associated with you) for research or statistical purposes, in which case we may use this information indefinitely without further notice to you.",
    legalRightsText: "You have the right to:",
    legalRightsBoldText1: "Request access ",
    legalRightsNormalText1: `to your personal data (commonly known as a "data subject access request"). This enables you to receive a copy of the personal data we hold about you and to check that we are lawfully processing it.`,
    legalRightsBoldText2: "Request correction ",
    legalRightsNormalText2: "of the personal data that we hold about you. This enables you to have any incomplete or inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you provide to us.",
    legalRightsBoldText3: "Request erasure  ",
    legalRightsNormalText3: `of your personal data. This enables you to ask us to delete or remove personal data where there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove your personal data where you have successfully exercised your right to object to processing (see below), where we may have processed your information unlawfully or where we are required to erase your personal data to comply with local law. Note, however, that we may not always be able to comply with your request of erasure for specific legal reasons which will be notified to you, if applicable, at the time of your request.`,
    legalRightsBoldText4: "Object to processing ",
    legalRightsNormalText4: "of your personal data where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object where we are processing your personal data for direct marketing purposes. In some cases, we may demonstrate that we have compelling legitimate grounds to process your information which override your rights and freedoms.",
    legalRightsBoldText5: "Request restriction of processing ",
    legalRightsNormalText5: "of your personal data. This enables you to ask us to suspend the processing of your personal data in the following scenarios:",
    legalRightsBulletText1: "If you want us to establish the data's accuracy.",
    legalRightsBulletText2: "Where our use of the data is unlawful but you do not want us to erase it.",
    legalRightsBulletText3: "Where you need us to hold the data even if we no longer require it as you need it to establish, exercise or defend legal claims.",
    legalRightsBulletText4: " You have objected to our use of your data but we need to verify whether we have overriding legitimate grounds to use it.",
    legalRightsBoldText6: "Request the transfer",
    legalRightsNormalText6: "of your personal data to you or to a third party. We will provide to you, or a third party you have chosen, your personal data in a structured, commonly used, machine-readable format. Note that this right only applies to automated information which you initially provided consent for us to use or where we used the information to perform a contract with you.",
    legalRightsBoldText7: "Withdraw consent at any time",
    legalRightsNormalText7: "where we are relying on consent to process your personal data. However, this will not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your consent, we may not be able to provide certain products or services to you. We will advise you if this is the case at the time you withdraw your consent.",
    legalRightsText2: "If you wish to do so, or to notify Raffolux of a change in your details, please contact support@raffolux.com and/or post to Raffolux Ltd, 4 Ravey Street, London, EC2A 4QP.",
    legalRightsText3: "There are exceptions to these rights, however. For example, access to personal information may be denied in some circumstances if making the information available would reveal personal information about another person, or if we are legally prevented from disclosing such information. In addition, we may be able to retain data even if you withdraw your consent, where we can demonstrate that we have a legal requirement to process and store your data.",
    legalRightsText4: "If you have a question about the use of your personal information, or wish to file a complaint about it, please contact us using the contact details set out above.",
    legalRightsText5: "Finally, if you have unresolved concerns, you also have the right to complain to the data protection authorities.",
    optingOutText1: "You can ask us or third parties to stop sending you marketing messages at any time by logging into the website and checking or unchecking relevant boxes to adjust your marketing preferences OR by following the opt-out links on any marketing message sent to you OR by contacting us at any time.",
    optingOutText2: "Where you opt out of receiving these marketing messages, this will not apply to personal data provided to us as a result of a product/service purchase, warranty registration, product/service experience or other transactions.",
    useOfCookiesText1: "We use cookies for certain areas of the Website and App. Cookies are small data files stored on your hard drive by a website. Cookies help us improve the Website and App, and your experience of them. We use cookies to see which areas and features are popular and to count visits to our websites, to recognise you as a returning visitor, to assist us with our marketing and to tailor your experience of the Website and/or App according to your preferences. Overall, cookies help us provide you with a better Website and App, by enabling us to monitor which pages you find useful and which you do not. We may also use cookies for targeting and/or advertising purposes. We may use Web beacons on our Website and App, or in our e-mails. Web beacons are electronic images that may be used to deliver cookies, count visits, understand usage of group websites and to tell if an e-mail has been opened and acted upon. Further details about cookie purposes and types are below. To delete or block cookies through your browser settings at any time, and for more general information about cookies including the difference between session and persistent cookies, visit www.allaboutcookies.org.",
    useOfCookiesText2: "We also use Google Analytics on the Website and App to collect information about your online activity on the Site, such as the Web pages you visit and the links you click on the Website and App. We use the information to compile reports and to help us improve the Website and App. The cookies collect information in an anonymous form, including the number of visitors to the Website and App, where visitors have come to the Website and App from and the pages they visited.",
    useOfCookiesText3: "For more information about the information gathered using Google Analytics please visit http://www.google.com/intl/en/analytics/privacyoverview.html. You can prevent these cookies by selecting the appropriate settings on your browser. If you do this you may not be able to use the full functionality of this Site. You may download and install the Google Analytics Opt-out Browser Add-on available here: http://tools.google.com/dlpage/gaoptout.",
    cookiesTableData: {
        tableHead: ["Cookie name/Type", "Duration", "Purpose", "Category of Cookie as defined in the ICC Cookie Guide"],
        widthArr: [140, 160, 180, 240],
        tableData: [
            ["csrftoken", "1 year", "This cookie is associated with Django web development platform for python. Used to help protect the website against Cross-Site Request Forgery attacks.", "1 - Strictly necessary cookies"],
            ["__lc_cid", "1 year 1 month 4 days", "This is an essential cookie for the website live chat box to function properly.", "3 - Functionality cookies"],
            ["__lc_cst", "1 year 1 month 4 days", "This cookie is used for the website live chat box to function properly.", "3 - Functionality cookies"],
            ["__oauth_redirect_detector", "Less than a minute", "his cookie is used to recognize the visitors using live chat at different times in order to optimize the chat-box functionality.", "3 - Functionality cookies"],
            ["__kla_id", "1 year 1 month 4 days", "Klaviyo sets this cookie to collect information on the visitor’s behavior. This information is used for internal analytics and to optimise the website. It also registers if the visitor has subscribed to a news letter.", "2 - Performance cookies"],
            ["_gcl_au", "3 months", "Google Tag Manager sets the cookie to experiment advertisement efficiency of websites using their services.", "2 - Performance cookies"],
            ["_ga", "1 year 1 month 4 days", "Google Analytics sets this cookie to calculate visitor, session and campaign data and track site usage for the site's analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognise unique visitors.", "2 - Performance cookies"],
            ["_gid", "1 day", "Google Analytics sets this cookie to store information on how visitors use a website while also creating an analytics report of the website's performance. Some of the collected data includes the number of visitors, their source, and the pages they visit anonymously.", "2 - Performance cookies"],
            ["_gat_gtag_UA_*", "1 minute", "Google Analytics sets this cookie to store a unique user ID.", "2 - Performance cookies"],
            ["_fbp", "3 months", "Facebook sets this cookie to display advertisements when either on Facebook or on a digital platform powered by Facebook advertising after visiting the website.", "2 - Performance cookies"],
            ["_gat_UA-*", "1 minute", "Google Analytics sets this cookie for user behaviour tracking.", "2 - Performance cookies"],
            ["_uetsid", "1 day", "Bing Ads sets this cookie to engage with a user that has previously visited the website.", "2 - Performance cookies"],
            ["_uetvid", "1 year 24 days", "Bing Ads sets this cookie to engage with a user that has previously visited the website.", "2 - Performance cookies"],
            ["__adroll", "1 year 1 month", "This cookie is set by AdRoll to identify users across visits and devices. It is used by real-time bidding for advertisers to display relevant advertisements.", "4 - Targeting cookies or advertising cookies"],
            ["__adroll_shared", "1 year 1 month", "Adroll sets this cookie to collect information on users across different websites for relevant advertising.", "4 - Targeting cookies or advertising cookies"],
            ["MUID", "1 year 24 days", "Bing sets this cookie to recognise unique web browsers visiting Microsoft sites. This cookie is used for advertising, site analytics, and other operations.", "4 - Targeting cookies or advertising cookies"],
            ["__adroll_fpc", "1 year", "AdRoll sets this cookie to target users with advertisements based on their browsing behaviour.", "4 - Targeting cookies or advertising cookies"],
            ["__ar_v4", "1 year", "This cookie is set under the domain DoubleClick, to place ads that point to the website in Google search results and to track conversion rates for these ads.", "4 - Targeting cookies or advertising cookies"],
            ["fr", "3 months", "Facebook sets this cookie to show relevant advertisements by tracking user behaviour across the web, on sites with Facebook pixel or Facebook social plugin.", "4 - Targeting cookies or advertising cookies"],
            ["raffolux_id", "1 year 1 month 4 days", ".", "3 - Functionality cookies"],
            ["WZRK_S_W6K-Z97-ZK6Z", "20 minutes", ".", "3 - Functionality cookies"],
            ["WZRK_G", "1 year 1 month 4 days", ".", "3 - Functionality cookies"],
            ["_cioanonid", "1 year", ".", "3 - Functionality cookies"],
            ["theme", "never", ".", "3 - Functionality cookies"],
            ["_te_", "Length of the user's session", ".", "3 - Functionality cookies"],
            ["_cio", "1 day", ".", "3 - Functionality cookies"]
        ]
    },
    cookieSettingsText1:"We will ask for your consent to the use of cookies set out in this Policy when you first access the Website or App, and if we introduce any new cookies to the Website/App. When you first visit the Website and App, a box/banner will appear asking you to agree to the cookies that we set on the Website/App.",
    cookieSettingsText2:"You can usually choose to set your browser to warn you when a cookie is being sent or to remove or reject cookies. Each browser is a little different, so look at your browser help menu to learn the correct way to modify your cookie settings. If you choose to remove or reject cookies, it will affect many features or services on our Website and App.",
    cookieSettingsBoldText1:"If you agree to cookies ",
    cookieSettingsNormalText1:`from our Website or App by clicking on the "Accept All" button, we will set cookies from all four categories on your device. If you wish to delete the cookies we have set on your device, please refer to your browser help menu.`,
    cookieSettingsBoldText2:"If you do nothing ",
    cookieSettingsNormalText2:"to indicate your cookie preference for our Website or App (i.e. if you do not click on any button in the cookie box/banner), only category 1 cookies will be set on your device. To modify your cookie settings, please refer to the help menu of your browser.",
    cookieSettingsBoldText3:"If you say no ",
    cookieSettingsNormalText3:`to cookies on our Website or App by clicking on the "Reject All" button, we will not set category 2, 3 and 4 cookies on your device. Please note that if you do this you may not be able to use the full functionality of our Site.`,
    cookieSettingsText3:"You can choose to enable or disable cookies that perform functional, analytics, performance, advertisement and uncategorised functions by clicking the 'Customize' button in the cookie box/banner.",
    changesToPrivacyText1:"We keep this Policy under regular review. We may change this Policy from time to time by updating this page in order to reflect changes in the law and/or our privacy practices.",
    changesToPrivacyText2:"We encourage you to check the date of this Policy when you visit the Website or App for any updates or changes. We will notify you of any modified versions of this Policy that might materially affect the way we use or disclose your personal information.",
    contactAddressText1:"If you have any questions about this Policy, please contact us by e-mail at support@raffolux.com, or by post at:",
    contactAddressText2:"Raffolux Ltd, 4 Ravey Street, London, EC2A 4QP"
}

export const responsiblePlayAndWellBeing = {
    responsiblePlay: [
        {
            text: "Raffolux's online free draws are not regulated by the UK Gambling Commission, however the team at Raffolux are committed to promoting and upholding socially responsible play on our platform. The welfare of our members is of the utmost important to us, and we continually strive to ensure that our members play only within their means and in a healthy manner."
        },
        {
            text: "We want our players to use our website as an occasional flutter, where they have the chance fantastic prizes while supporting great causes. Playing online free draws can be addictive, and so this page contains useful links and advice for our players."
        },
        {
            text: "We design our free draws in a responsible manner to ensure that they do not have a distinct appeal to vulnerable groups or those who are underage. We understand the vast majority of players play responsibly and within their means, however, it is our responsibility and duty to provide support and curtail any problematic or excessive play. We are here to support our customers and make sure they play responsibly, and that they are always in control of their play."
        },
    ],
    dataProtection: [
        {
            text: "Treating free draws as a way of making money, rather than a source of entertainment"
        },
        {
            text: "Attempting to chase losses or playing free draws to escape financial difficulty"
        },
        {
            text: "Spending money and time beyond your means"
        },
        {
            text: "Selling possessions and borrowing money in order to keep playing free draws"
        },
        {
            text: "Unable or struggling to manage or stop playing free draws"
        },
    ],
    actionText2: "If we see or perceive there to be any signs of excessive play, we will get in touch with you to check on your wellbeing",
    actionText3: "If we believe that you are playing excessively or beyond your means, we may close your account with an explanation.",
    actionText4: "We cap the tickets a player can purchase on every free draw to avoid heavy spending.",
    moreActionText1: "You may find it helpful to track of the amount you have spent playing free draw or skill-based competition websites",
    wellBeingText1: "We have been working with our partners at Mental Health UK to make support available to our members. If you feel like you want to access guidance on your mental health, then please visit the following links recommended by Mental Health UK to support our members:",
    wellBeingCards: [
        {
            title: 'COVID-19 and your mental health',
            url: 'https://mentalhealth-uk.org/help-and-information/covid-19-and-your-mental-health/'
        },
        {
            title: "Resources for young people and parents and carers to support them to develop their resilience",
            url: 'https://mentalhealth-uk.org/support-and-services/supporting-young-people/'
        },
        {
            title: "Find local support",
            url: 'https://mentalhealth-uk.org/support-and-services/find-local-support/'
        },
        {
            title: "Get urgent help",
            url: 'https://mentalhealth-uk.org/help-and-information/get-urgent-help/'
        },
        {
            title: "Monthly ‘How To’ webinars where we interview a panel of experts on specific subjects related to mental health, sign up and see all previous sessions",
            url: 'https://mentalhealth-uk.org/webinars/'
        },
        {
            title: "The online community Clic, where people can access peer support, information, Q&A, online events and more, which is moderated 24/7 to help anyone at any time, should they need urgent support",
            url: 'https://clic-uk.org/'
        },
        {
            title: "A Digital Information guide to the most common mental health problems",
            url: 'https://truths.mentalhealth-uk.org/'
        },
        {
            title: "Mental Health and Money Advice, that includes top tips, information and advice related to different circumstances, guides related to different welfare benefits and policies, template letters and more",
            url: 'https://www.mentalhealthandmoneyadvice.org/'
        },
        {
            title: "Savings calculator tool",
            url: 'https://www.mentalhealthandmoneyadvice.org/en/tools/savings-calculator/'
        },
        {
            title: "Budget planner tool",
            url: 'https://www.mentalhealthandmoneyadvice.org/en/tools/budget-planner/'
        },
        {
            title: "Universal Credit Money Manager",
            url: 'https://www.mentalhealthandmoneyadvice.org/en/tools/universal-credit-money-manager/'
        }
    ]
}

// export const workWithUs = {
//     charityData: [
//         {
//             image: `${Url.webPImgUrl}media/HOSPICE_LOGO.jpg`,
//             description: "“We are delighted that Raffolux have chosen to support Hospice UK and put charity at the heart of everything they do.”",
//             name: "Ali Or, Head of Corporate Development"
//         },
//         {
//             image: `${Url.webPImgUrl}images/WCR_LOGO.jpg`,
//             description: "“The website is transparent, trusted by both us and consumers taking part. Raffolux has been a lifeline for us over the past few months.”",
//             name: "Neil Woodley, Head of Philanthropy and Partnerships"
//         },
//         {
//             image: `${Url.webPImgUrl}media/MHUK_LOGO.jpg`,
//             description: "“It is fantastic to know we have the support of Raffolux customers who have chosen to support us regularly”",
//             name: "Katie Legg, Director of Strategy and Partnership"
//         },
//         {
//             image: `${Url.webPImgUrl}media/GOSH_LOGO.jpg`,
//             description: "“From their amazing prizes through to their expertise in their area, we have felt supported on the client journey every step of the way. They are a fantastic company to work with, and their transparency and openness has been there from the initial stages of research”",
//             name: "Laura Howley, Corporate Partnerships"
//         },
//         {
//             image: `${Url.webPImgUrl}media/White Background Logo.png`,
//             description: "“We were originally planning on running our own raffle internally, but working with Raffolux drastically reduced the workload on our end and increased the total we would have raised”",
//             name: "Calum Pettit, Development Officer"
//         },
//         {
//             image: `${Url.webPImgUrl}media/Mintridge_Logo_Black-Type_RGB.jpg`,
//             description: "“What is not to love about Raffolux? From a professional team in regular communication with our charity throughout the entire process, to engaging a new audience for Team Mintridge as well as raising much needed funds to continue our work with young people.”",
//             name: "Managing Director"
//         },
//         {
//             image: `${Url.webPImgUrl}media/PennyAppealLogo2.jpg`,
//             description: "“Thanks to Raffolux for their raffle and generous support, we’ve been able to raise funds to help provide communities with fresh clean water by building a tube well”",
//             name: "Yaseen Sheikh, Fundraising Manager"
//         },
//         {
//             image: `${Url.webPImgUrl}media/HuracanLogo.png`,
//             description: "“The process was very simple and straightforward for us, the donation was very quickly processed via Work For Good and the amounts raised really will make a difference to a small charity like The Huracan Foundation”",
//             name: "Mary Mitchell, Programme Director",
//         },
//         {
//             image: `${Url.webPImgUrl}media/PebblesProject.png`,
//             description: "“It requires little to no admin for the organization as Raffolux does everything for you”",
//             name: "Rachel Ward Da-Costa, Fundraising Co-Ordrinator"
//         },
//         {
//             image: `${Url.webPImgUrl}media/workwithus/Smileforme.png`,
//             description: "“Raffolux have been great to work with. The whole process for us as a charity was simple and straightforward.”",
//             name: "Alice, Founder"
//         },
//     ],
//     charitableDontaionsImages: [
//         {
//             image: `${Url.webPImgUrl}media/workwithus/HOSP.jpg`
//         },
//         {
//             image: `${Url.webPImgUrl}media/workwithus/WWF.jpg`
//         },
//         {
//             image: `${Url.webPImgUrl}media/workwithus/WCR2.jpg`
//         },
//         {
//             image: `${Url.webPImgUrl}media/workwithus/WCR1.jpg`
//         },
//         {
//             image: `${Url.webPImgUrl}media/workwithus/WA.jpg`
//         },
//         {
//             image: `${Url.webPImgUrl}media/workwithus/MHUK.jpg`
//         },
//         {
//             image: `${Url.webPImgUrl}media/workwithus/HOSP.jpg`
//         },
//         {
//             image: `${Url.webPImgUrl}media/workwithus/WWF.jpg`
//         },
//     ],
//     checkBoxData: [
//         'A unique way to market your product / service', 'Your very own custom raffle to promote your product / service', 'Follow up your raffle with a promotional email to all entrants', '“Promotion” badge and highlighted on the homepage'
//     ],
//     orangeData: [
//         {
//             image: <FontAwesome5 name={'user-friends'} color={'#FFBD0A'} size={25} />,
//             title: 'Reach over 150,000 unique monthly viewers'
//         },
//         {
//             image: <FontAwesome5 name={'envelope-open-text'} color={'#FFBD0A'} size={25} />,
//             title: 'Access to email database of up to 58,000 users'
//         },
//         {
//             image: <FontAwesome name={'ticket'} color={'#FFBD0A'} size={25} />,
//             title: '4,000 average unique views per raffle'
//         },
//     ],
//     workWithUS: "Work with us",
//     thereAreManyWays: "There are many ways to work with Raffolux whether you are a charitable organisation or a business",
//     iAmBusiness: "I am a business",
//     iAmCharity: "I am a charity",
//     businesses: "Businesses",
//     areYouBusiness: "Are you a business or brand looking to advertise your product or service?",
//     contactUs: "Contact us",
//     getInTouch: "Get in touch today to discuss how we can provide a bespoke raffle solution for your business",
//     charitableDonations: "Charitable donations",
//     afewWords: "A few words from our",
//     charityPartners: "charity partners",
// }

export const InstantNonInstant = {
    SorryThisRaffleHasEnded: 'Sorry, this raffle has ended.',
    NoMoreAvailableTickets: 'No more available tickets!',
    TheWinning: 'The Winning',
    ticketsWere: 'tickets were',
    ticketWas: 'ticket was',
    ticketsWas: 'tickets was',
    MAXPerPerson: `MAX \n per person`,
    EntryPrice: `Entry\n Price`,
    DrawDate: `Draw date:`,
    DateFormat: 'Do MMM, ha',
    CASHALTAvailable: `Cash Alt\nAvailable`,
    totalEntries: `total entries`,
    SeeTermsForFree: `See terms for free `,
    telephoneEntry: `telephone entry*`,
    postalEntry: `postal entry*`,
    Excellent: `Excellent`,
    Trustpilot: `Trustpilot`,
    Details: `Details`,
    Prizes: `Prizes`,
    Description: `Description`,
    ticket: `ticket`,
    tickets: `tickets`,
    zeroTickets: '0 tickets',
    zeroTicket: '0 ticket',
    AddToCart: 'Add to cart',
    YouCantApplyCreditSinceYouHaveAddedCustomRaffleToTheCart: `You can't apply credit, Since you have added custom raffle to the cart`,
    ClearAll: 'Clear all',
    Selections: 'Selections',
    WeThinkYouWouldLike: 'We think you would like',
    ViewCart: 'View cart',
    BackToRaffle: 'Back to raffle',
    Success: 'Success!',
    forThe: 'for the',
    beenAddedToYourCart: 'been added to your cart.',
    entries: 'entries',
    entry: 'entry',
    has: 'has',
    have: 'have',
    SelectYourTickets: 'Select your tickets',
    TicketNumber: 'Ticket Number',
    removedFromCart: 'removed from cart',
    NoItemInCart: 'No Item in Cart',
    NoMoreAvailableTickets: 'No more available tickets!',
    NoDataFound: 'No data found',
    AllPrizes: 'All prizes',
    Available: 'Available',
    SearchByItemOrTick: 'Search by item or tick…',
    search: 'search',
    onThe: 'on the',
    by: 'by',
    EntryList: 'Entry list',
    Winners: 'Winners',
    RAFFLE_ENDED: 'RAFFLE ENDED',
    WithLuckyTicketNumber: 'With lucky ticket number',
    ThisDrawWasProvidedAndVerifiedAt: `This draw was provided and verified \nat`
};

export const charity = {
    charity: 'Charity',
    totalRaised: "Total raised for charity",
    myCharity: 'MY CHARITY',
    youDontSupport: 'You do not currently support one of our partner charities',
    chooseOne: "Choose one of our charity partners to start supporting them with every purchase you make on Raffolux!",
    youAreSupporting: "You are supporting",
    thankYouForSupport: "Thank you for your continued support!",
    soFar: "So far you have helped to raise over",
    towards: "towards",
    thatsIncredible: "that's incredible!",
    viewSite: "View site",
    ourCharityPartners: "OUR CHARITY PARTNERS",
    charityCard: {
        totalRaised: "TOTAL RAISED"
    },
    charityModal: {
        support: "support"
    },
    SearchForACharity: "Search for a charity"
};

export const winners = {
    winnersSoFar: "WINNERS SO FAR",
    couldYouBeNext: "COULD YOU BE NEXT?",
    topWinnersIn: "Top Winners in",
    winnerList: "Winner List",
    draw: "Draw",
    latestWinners: "Latest Winners",
    rafffleDetails: "Rafffle details",
    drawDetails: "Draw details",
    withWinning: "with winning ticket number"
};

export const myCredit = {
    creditBalance: "CREDIT BALANCE",
    recentActivity: "RECENT ACTIVITY",
    today: "TODAY",
    wonCredit: "Won Credit",
    creditSpent: "Credit spent",
    thisWeek: "THIS WEEK",
    youcanEarn: "You can earn credit through promotional codes and raffles."
};


export const menu = {
    terms: [
        { title: 'Terms | ', compnent: 'TermsAndConditions' },
        { title: 'Privacy | ', compnent: 'PrivacyAndPolicy' },
        { title: 'Help | ', compnent: 'FAQ' },
        { title: 'Responsible Play', compnent: 'ResponsiblePlayAndWellbeing' },
    ],
    socialMediaContainer: [
        { light: menuFacebookImageLight, dark: menuFacebookImageDark, link: 'https://www.facebook.com/raffolux' },
        { light: menuTwitterImageLight, dark: menuTwitterImageDark, link: 'https://twitter.com/raffolux' },
        { light: menuInstagramImageLight, dark: menuInstagramImageDark, link: 'https://www.instagram.com/raffolux/?hl=en-gb' },
        { light: menuLinkedinImageLight, dark: menuLinkedinImageDark, link: 'https://uk.linkedin.com/company/raffolux' },
    ]
}

export const prizeClaim = {
    specialCategories: ["supersaturday", "christmas", "promotion", "fitness", "car", "electronic", "experience", "holiday", "indulgence", "watch", "collectable", "jewellery", "handbag", "shoe", "vehicle", "home"],
    optionList1: [
        { id: 1, title: 'Prize' },
        { id: 2, title: 'Cash' },
        { id: 3, title: 'Credit' }
    ],
    optionList2: [
        { id: 1, title: 'Cash' },
        { id: 2, title: 'Credit' },
        { id: 3, title: 'Split' }
    ],
    optionList3: [{ id: 1, title: 'Credit' }],
    Congratulations: "Congratulations",
    youveGotSomePrizesToClaim: "you’ve got some prizes to claim!",
    Cash: "Cash",
    RaffoluxTickets: "Raffolux Tickets",
    PrizeClaim: "Prize Claim",
    ClaimPrizes: "Claim Prizes",
    Jackpot: "Jackpot",
    raffoluxtickets: "raffoluxtickets",
    Credit: "Credit",
    cash: "cash",
    Split: "Split",
    twentyfivePercent: "25%",
    fiftyPercent: '50%',
    seventyfivePercent: "75%",
    PleaseSelectAnOptionFromEachPrize: "Please select an option from each prize.",
    zero: "0",
    PrizeSummary: "PrizeSummary",
    YOUWON: "YOU WON",
    JACKPOTWIN: "JACKPOT WIN!",
    YouWON: "You WON",
    YouWONtheJackpotPrizeof: "You WON the Jackpot Prize of",
    Pleasechooseyourprizeoption: "Please choose your prize option",
    Iwanttheprize: "I want the prize",
    Iwantthecash: "I want the cash",
    Youwillreceivethephysicalprize: "You will receive the physical prize",
    Youwillreceiveacashalternativeof: "You will receive a cash alternative of",
    Youwillreceive: "You will receive",
    Iwantthecredit: "I want the credit",
    inSiteCredit: "in Site Credit",
    Prize: "Prize",
    HowWouldYouLikeToSplitYourWinnings: "How would you like to split your winnings?",
    CashAnd: "Cash and",
    SiteCredit: "Site Credit",
    CongratulationsWeWillBeInTouch: "Congratulations! We will be in touch with you through your preferred method as soon as possible to organise your prize.",
    ClaimJackpotPrize: "Claim jackpot prize",
    CompletePrizeClaim: "Complete Prize Claim",
    Yourprizeclaimsummary: "1. Your prize claim summary",
    YouwillreceivePhysicalPrize: "You will receive Physical Prize",
    EditDetails: "Edit details",
    PayoutDetails: ". Payout Details",
    WhatBankAccountOrPaypalAddressWouldYouLikeUsToSendYourWinningsTo: "What bank account or Paypal address would you like us to send your winnings to?",
    RecentlyUsed: "Recently used",
    paypal_: "paypal_",
    bank_: "bank_",
    Accountnumberending: "Account number ending",
    Accountrending: "Account ending",
    Addnewpayoutdetails: "Add new payout details",
    Edit: "Edit",
    two: '2',
    three: '3',
    SavePayoutMethod: "Save payout method",
    UpdatePayoutMethod: "Update payout method",
    PayPalEmailAddress: 'PayPal Email Address',
    email: "email",
    BankTransfer: "Bank Transfer",
    Paypal: "Paypal"
}

export const FAQ = {
    questions: [
        {
            header: 'Top Questions',
            // subHeaders:['What is Raffolux?','How do I enter a raffle?','Who can play with Raffolux?','How is the winner selected?','When is the draw?',"What if Raffolux doesn't sell enough tickets?"]
            subHeaders: [
                {
                    title: 'What is Raffolux?',
                    description: [
                        '1. Click into one of our raffles',
                        '2. Select how many tickets into the draw you would like to purchase. You can also choose to select which ticket number you want to buy by using the ticket selector!',
                        '3. Add those tickets to your cart. If you haven’t made an account with us or you’re not logged in, you will be asked to do so at this stage.',
                        '4. Go to your cart and checkout.',
                        "5. The winner is drawn securely and independently by random.org, and then posted to our winner's page <Text style={{ textDecorationLine: 'underline' }}>here</Text> around 15 minutes after the raffle closes! You can also find the public results of every draw on random.org's site <Text style={{ textDecorationLine: 'underline' }}>here</Text>."
                    ]
                },
                {
                    title: 'How do I enter a raffle?',
                    description: [
                        '1. Click into one of our raffles',
                        '2. Select how many tickets into the draw you would like to purchase. You can also choose to select which ticket number you want to buy by using the ticket selector!',
                        '3. Add those tickets to your cart. If you haven’t made an account with us or you’re not logged in, you will be asked to do so at this stage.',
                        '4. Go to your cart and checkout.',
                        "5. The winner is drawn securely and independently by random.org, and then posted to our winner's page <Text style={{ textDecorationLine: 'underline' }}>here</Text> around 15 minutes after the raffle closes! You can also find the public results of every draw on random.org's site <Text style={{ textDecorationLine: 'underline' }}>here</Text>."
                    ]
                },
                {
                    title: 'Who can play with Raffolux?',
                    description: [
                        "To play Raffolux, you must be over 18 years old."
                    ]
                },
                {
                    title: 'How is the winner selected?',
                    description: [
                        "We draw all our raffles instantly and independently, using random.org's true randomisation software. Once Raffolux has compiled a list of tickets for the draw, we send the list over to random.org who draw the winning ticket number. Random.org then posts the winning ticket number on its <Text style={{ textDecorationLine: 'underline' }}>public register</Text>",
                        "You can also find records of all our winners and draws <Text style={{ textDecorationLine: 'underline' }}>here</Text> !"
                    ]
                },
                {
                    title: 'When is the draw?',
                    description: [
                        "Our draws all take place instantly on the date and time specified in the raffle description, using random.org's true randomisation software. If a raffle sells out early, it will draw immediately at that time so we can announce the winner faster!",
                        "Our raffles are (almost always) drawn at 10pm in the evening every day."
                    ]
                },
                {
                    title: "What if Raffolux doesn't sell enough tickets?",
                    description: [
                        "We will <Text style={styles.boldText}>always</Text> go ahead and draw a winner, regardless of the number of tickets that are sold.",
                        "We will also <Text style={styles.boldText}>never</Text> extend the draw date, even if we've hugely undersold the raffle. So, if you've got the only ticket in the draw when the raffles closes, we'll be sending you a winner's email the next day!"
                    ]
                },
            ]
        },
        {
            header: 'Playing the Raffles',
            // subHeaders: ['How many tickets can I buy for a raffle?', 'How long do the raffles last?']
            subHeaders: [
                {
                    title: 'How many tickets can I buy for a raffle?',
                    description: [
                        "If a ticket limit per person applies, we will state it in the description on the raffle page."
                    ]
                },
                {
                    title: 'How long do the raffles last?',
                    description: [
                        "Our raffles last for a fixed number of days, and are drawn instantly on the time and date specified on the raffle description. If the tickets sell out early, then the raffle will be drawn at the point of sell-out."
                    ]
                },
                {
                    title: 'Can I get my tickets refunded?',
                    description: [
                        "Unfortunately we aren’t able to remove or refund tickets purchased for a raffle, apart from in exceptional circumstances listed in our <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('TermsAndConditions')}>terms</Text>"
                    ]
                },
                {
                    title: 'How much does it cost to enter a raffle?',
                    description: [
                        "The ticket prices are shown on each raffle!"
                    ]
                },
                {
                    title: 'How do I know if I have won?',
                    description: [
                        "15 minutes after the draw closes, we will email you to congratulate you on your win! We may also give you a quick call to celebrate, particularly if it's amazing news. You can also check our winner list <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Winners')}>here</Text> at any time, which we update after each draw."
                    ]
                },
                {
                    title: 'Where can I view my tickets?',
                    description: [
                        "When you are logged in, you can view your tickets and raffles entered in the <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('MyRaffles')}>My Raffles</Text> section at the top of the website. These are separated by active raffles (those that are yet to be drawn), and recently ended raffles (those that have already been drawn).",
                        "We’ll also email your ticket numbers to you after every purchase."
                    ]
                },
                {
                    title: 'Why should I play with Raffolux?',
                    description: [
                        "1) Guaranteed Winners! Regardless of the number of tickets sold, the prize will always be drawn and awarded to the lucky winner.",
                        "2) No extensions! We will never extend the draw time, even if we have only sold one ticket.",
                        "3) You’ll be supporting our amazing charity partners! We donate 10% of our net proceeds to charity, with 8% going towards the charity of your choice, and 2% spread equally among our remaining charity partners. Thanks to our players, over £600,000 has been donated to charities across the UK so far."
                    ]
                },
            ]
        },
        {
            header: "Drawing the winners",
            subHeaders: [
                {
                    title: "How does the 'instant draw' work?",
                    description: [
                        "Our ‘instant draws’ are run within a minute of the raffle closing, and the draw is performed independently by random.org’s true randomisation software. When the draw is complete, random.org automatically stamps it in their <Text style={{ textDecorationLine: 'underline' }} onPress={() => openLink('https://www.random.org/draws/records/?owner=34188')}>public register</Text>, where the winning ticket number and raffle entrants can be viewed."
                    ]
                },
                {
                    title: "If my ticket is drawn, how will I find out?",
                    description: [
                        "We follow up with all our winners over email (and sometimes by phone, if it's a special prize or we can't reach you by email) after every draw! You can also check the winner list <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Winners')}>here</Text>, which includes the draw details for each raffle.",
                        "There's no need to remember your ticket numbers - we do that for you!"
                    ]
                },
                {
                    title: "Is there a list of all previous draws and winners?",
                    description: [
                        "You can find every single Raffolux winner to date in random.org's <Text style={{ textDecorationLine: 'underline' }} onPress={() => openLink('https://www.random.org/draws/records/?owner=34188')}>public register</Text>, and you can also see the most recent month's winners on our own winner's page <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Winners')}>here</Text>"
                    ]
                },
            ]
        },
        {
            header: "Prizes",
            subHeaders: [
                {
                    title: "How do prizes get delivered?",
                    description: [
                        "We send our prizes directly to our winners’ doorsteps by courier! Should the prize be too large or valuable to send by mail, we will arrange for it to be delivered personally.",
                        "For all cash prizes, we send these directly to your bank account.",
                        "For prizes worth over £10,000, we often invite our winners to our offices (with all travel covered) to collect their prize!"
                    ]
                },
                {
                    title: "Can I receive a cash alternative to my prize?",
                    description: [
                        "You can receive a cash alternative to the prize on almost every occasion. Just ask us when you’re claiming your prize and we’ll see what we can do!"
                    ]
                },
                {
                    title: "Do holiday and experience prizes need to be taken on specific dates?",
                    description: [
                        "Most of the time, we’ll be able to offer a range of dates for each holiday. The exact details will be stated on the raffle itself. If the range of dates on offer don't work for you, then we can offer a cash alternative or try to find another holiday of the same value."
                    ]
                },
                {
                    title: "Can I suggest a prize?",
                    description: [
                        "Absolutely! Please do send in your suggestions, we’d love to hear them – just click the chat icon in the bottom-right of the screen, or get in touch with support@raffolux.com if it’s after 6pm."
                    ]
                },
                {
                    title: "What happens if the prize isn’t claimed?",
                    description: [
                        "We will always email and call our players to let them know that they’ve won! If we can't get through, we will of course keep trying.",
                        "Our claim period is 180 days from the date of the draw. For any prizes that have not been claimed during that period, we reserve the right to distribute the cash alternative to our charity partners."
                    ]
                },
            ]
        },
        {
            header: "Charity",
            subHeaders: [
                {
                    title: "What does Raffolux do for charity?",
                    description: [
                        "Charity is right at the heart of our mission at Raffolux, and we’ve currently raised over £600,000 for charities across the UK.",
                        "Every time you play, you’ll be supporting a charity of your choice which you can <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Charity')}>change at any time</Text>. We donate 10% of all net proceeds (revenue minus marketing, prize and payment handling costs) to charities. 8% is donated to charities our players select, and 2% is spread equally across all of our charity partners.",
                        "We also run raffles for the exclusive benefit of particular good causes, where the majority of ticket sales will be donated directly to the specified charity."
                    ]
                },
                {
                    title: "What charities does Raffolux support?",
                    description: [
                        "We work with some fantastic charities such as Alzheimer's Society, Great Ormond Street Hospital Children's Charity, Mental Health UK and many more - you can see our list of sponsored charities <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Charity')}>here</Text>!"
                    ]
                },
                {
                    title: "Can I change my sponsored charity?",
                    description: [
                        "Yes, you can do so at any time by changing your selection <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Charity')}>here</Text>!"
                    ]
                },
                {
                    title: "Can my business or charity become a Raffolux partner?",
                    description: [
                        "We are always open to talking about partnerships with new organisations and would love to hear from you! Please send us an email to support@raffolux.com, and one of our partnerships team will follow up with you directly."
                    ]
                },
            ]
        },
        {
            header: "Payment",
            subHeaders: [
                {
                    title: "Are card payments secure?",
                    description: [
                        "We use secure, encrypted connections across our website and do not hold your card details on our servers. Our payment providers are fully PCI and ISO compliant, and we leave all of the financial processing to them. Raffolux will never share any of your financial data."
                    ]
                },
                {
                    title: "How can I pay?",
                    description: [
                        "You can pay by debit card, PayPal, Apple Pay or Google Pay with our platform."
                    ]
                },
                {
                    title: "Can I save card details for future use?",
                    description: [
                        "Yes, you can save your card details!"
                    ]
                },
            ]
        },
        {
            header: "Accounts",
            subHeaders: [
                {
                    title: "What if I’ve lost my email or password?",
                    description: [
                        "No need to worry! If you have lost or forgotten your password, just go to the ‘sign in’ page and then click ‘reset password’. If you’ve forgotten the email associated with your account, then please do get in contact with us by sending an email to support@raffolux.com and we will locate and verify your account."
                    ]
                }
            ]
        },
    ]
}

export const myRaffles = {
    tabsData: ['Active', 'Ended'],
    PENDINGCLAIMS: "PENDING CLAIMS",
    youHave: "you have",
    toClaim: "to claim",
    WehaveChanged: "We’ve changed our prize claim process! Please refer to our",
    forMoreInformation: "for more information",
    claimMyPrizes: "Claim My Prizes",
    MYRAFFLES: "MY RAFFLES",
    YouAreNotCurrentlyEnteredIntoAnyRaffles: "You are not currently entered into any raffles",
    YouHaventEnteredAnyRafflesYet: "You haven't entered any raffles yet.",
    ending: "Ending:",
    thisRaffleWasDrawn: "This raffle was drawn",
    own: "own",
    owned: "owned",
    ownPending: "own (pending)",
    inThisRaffle: "in this raffle",
    hide: "hide",
    show: "show",
    WINNER: "WINNER",
    viewRaffle: "view raffle",
    active: "active",
    ended: "ended",
    pending: "pending",
    clickHereToSee: "click here to see what's on",
    You: "You"
}

export const pointsStore = {
    tabsData: ['Store', 'Earned'],
    YouHave: "You have",
    RaffoluxPoints: "Raffolux points",
    LATESTOFFERS: "LATEST OFFERS",
    ALLPRIZES: "ALL PRIZES",
    WouldYouLikeToRedeem: "Would you like to redeem",
    using: "using",
    BalanceAfterRedemption: "Balance after redemption",
    Redeem: "Redeem",
    YouDontHaveEnoughPointsToClaim: "You don't have enough points to claim",
    YourNewlyRedeemedPrize: "Your newly redeemed prize can now be found in your prize claims, head there now to claim your",
    EarnExtraRP: "📣  Earn extra RP from referrals",
    ClaimPrize: "Claim Prize",
    BackToStore: "Back to Store",
    OFF: "% OFF"
}

export const errorScreen = {
    Oops: 'Oops!',
    SomethingWentWrong: 'Something went wrong',
    TryAgain: 'Try again',
    RestartApplication: 'Reload'
}

export const NewsAndBlogs = {
    writtenByRaffolux: "Written by Raffolux  |",
    feelGood: "Feel Good",
    MinRead: "|  5 min read",
    NewsBlog: "News & Blog  >",
    NewsAndBlog: "News & Blog"
}

export const PaymentSucess = {
    purchaseWasSuccessful: "your purchase was successful! Your tickets are below and you will receive an email confirmation shortly.",
    viewMyTickets: "view my tickets"
}

export const WinnersGallery = {
    withLuckyTicketNumber: "with lucky ticket number",
    drawDetails: "draw details",
    winnersList: "winners list",
    winnersGallery: "Winners Gallery",
    YouReachedEnd: "Wow! You’ve reached the end of our winner’s gallery, why not check out our latest raffles?",
    liveRaffles: "Live raffles"
};

export const PaymentFailure = {
    paymentFailed: "Payment failed",
    yourPaymentFailed: "Your payment failed, no money will be taken from your account. Please try again or contact support@raffolux.com if you believe this was in error."
}

export const paymentSuccess = {
    SorryYouCantGoBack: `Sorry.You can't go back`
}

export const apiSliceConstants = {
    NoPrizeToClaim: 'No Prize To Claim'
}

export const FooterConstants = {
    PaymentsWeAccept: 'Payments we accept',
    PLEASEPLAYRESPONSIBLY: `PLEASE PLAY \nRESPONSIBLY`,
    Contact: 'Contact',
    AviationHouse: 'Aviation House, 125 Kingsway,',
    London: ' London, WC2B 6NH',
    Website: 'Website',
    Categories: 'Categories',
    tel: 'tel:01923 918637',
    number: '01923 918637',
    mailto: 'mailto:support@raffolux.com',
    mailId: 'support@raffolux.com',
    copyRight: 'Copyright © 2019 - 2023 Raffolux Ltd. All rights reserved. Company No. 10962686',
    FollowUs: 'Follow us',
}

export const DrawDetails = {
    DrawProvidedAndVerified: "Draw provided and verified by",
    totalEntries: "total entries",
    thisCertifiesThat: "This certifies that Raffolux Ltd, a limited registered company in England & Wales No. 10962686, held a true random draw in compliance with all applicable legislation on",
    forThePrize: "for the prize",
    whichHasWill: "which has / will now been gifted to",
    TheTrueRandomDraw: 'The true random draw used to select a winning entry from a randomised list of all valid entries displayed below was powered by "Random.org".',
    Winners: "Winner(s)",
    one: "#1"
}

export const Referral = {
    VerifyYourAccount: "Verify your account ",
    toStartReferring: "to start referring",
    InviteFriendsAnd: "Invite friends and",
    earnRewards: "earn rewards",
    Verify: "Verify",
    shareMyLink: "share my link",
    ref: "ref/",
    ReferAndEarn: "Refer & Earn",
    MyReferrals: "My Referrals",
    InviteFriend: "Invite Friend",
    ShareReferralCode: "Share Referral Code",
    socialMediaApps: [
        { title: 'Whatsapp', image: whatsapp, link: `whatsapp://send?phone=0` },
        { title: 'Instagram', image: instagram, link: 'https://www.instagram.com/' },
        { title: 'Messenger', image: messenger, link: 'https://www.messenger.com/' },
        { title: 'Telegram', image: telegram, link: 'tg://msg?text=' },
        { title: 'Gmail', image: gmail, link: 'mailto:' },
        { title: 'Messages', image: messages, link: 'sms:' },
        { title: 'Facebook', image: facebook, link: 'https://www.facebook.com/' },
        { title: 'Mail', image: mail, link: 'mailto:' }
    ],
    EARNPOINTS: "EARN POINTS",
    ForEveryFriendYouReferYouWillReceive: "For every friend you refer, you will receive",
    ReferralLink: "Referral link",
    HOWITWORKS: "HOW IT WORKS",
    HowItWorksData: [
        { number: "1", title: 'Referring friends is easy! Use your unique referral link to invite your friends to Raffolux' },
        { number: "2", title: 'Your referred friend signs up and makes their first purchase' },
        { number: "3", title: 'Once your friend makes their first payment your points will be automatically credited to your account!' },
        { number: "4", title: 'You can check on your pending referrals in the ‘My Referrals’ section ' },
    ],
    VerifyYourAccountToAccess: "Verify your account to access your unique referral link and start earning points for referrals",
    VerifyMyAccount: "Verify my Account",
    YouHave: "You have  ",
    points: "  points",
    EarnPointsAsYouComplete: "Earn points as you complete successful referrals, for every 5 and 10 referrals you’ll earn yourself a special reward!",
    NiceJobYouAre: "Nice job, you are",
    referralsAwayFromEarningReward: "referrals away from earning a reward!",
    REFERRALSTATUS: "REFERRAL STATUS"
};

export const PointClaim = {
    addressInputFields: [
        {
            name: 'Full Name',
            formikName: 'fullName'
        },
        {
            name: 'Phone Number',
            formikName: 'phoneNumber'
        },
        {
            name: 'Postcode',
            formikName: 'postCode'
        },
        {
            name: 'Address Line 1',
            formikName: 'addressLine1'
        },
        {
            name: 'Address Line 2',
            formikName: 'addressLine2'
        },
        {
            name: 'Town / City',
            formikName: 'city'
        },
    ],
    PointClaim: "Point Claim",
    YourPointClaimSummary: "1. Your point claim summary",
    Overview: ". Overview",
    PointClaims: "Point claims",
    DeliveryDetails: "2. Delivery details",
    WhatAddressWouldYouLikeUs: "What address would you like us to send your physical prizes to?",
    RecentlyUsed: "Recently used",
    Edit: "Edit",
    AddNewDeliveryAddress: "Add New Delivery address",
    Addnewdeliveryaddress: "Add new delivery address",
    SaveThisAddress: "Save this address",
    UpdateAddress: "Update address",
    PleaseAddAnAddress: "Please add an address",
    PleaseAddOrSelectPayoutDetails: "Please add or select payout details",
    NeedHelpPleaseReferToOur: "Need help? Please refer to our",
    FAQs: "FAQs",
    or: "or",
    ContactUs: "Contact Us",
    ExploreMore: "Explore more",
    Point: "Point",
    ClaimComplete: "Claim Complete!",
    YouWillShortlyReceiveAnEmail: "You will shortly receive an email confirming the details of your",
    claim: "claim",
    YourClaimID: "Your claim ID:",
    prize: "prize",
    point: "point",
    Prize: "Prize"
}

export const PersonalInformation = {
    UserDetails: "User details",
    VerificationStatus: "Verification status",
    VerifyNumber: "Verify number"
}


export const Login = {
    inputFields: [
        {
            name: 'email',
            formikName: 'email',
            placeHolder: 'enter your email address'
        },
        {
            name: 'password',
            formikName: 'password',
            placeHolder: 'password'
        },
    ],
    SorryThatLoginWasInvalid: "Sorry,that login was invalid. Please try again",
    SignInViaSocialAccount: "Sign in via social account"
}

export const SignUp = {
    CreateYourRaffoluxAccountAndJoinTheAction: "Create your Raffolux account and join the action!",
    GetStarted: "Get started",
    or: "or",
    SignUpWithGoogle: "Sign up with Google",
    SignUpWithFacebook: "Sign up with Facebook",
    AlreadyHaveAnAccount: "Already have an account?",
    PasswordMustBeAtLeast6CharactersLong: "Password must be at least 6 characters long",
    WeJustNeedAFewMoreDetails: "We just need a few more details...",
    WeUseThisNumberToVerify: "We use this number to verify your account and will never contact you for marketing purposes unless opted in via marketing preferences.",
    ReferralCode: "Referral Code",
    InvalidReferralCode: "Invalid Referral Code",
    PromotionUpdates: 'I would like to receive exciting updates on raffles, my chosen charity, partner promotions, exclusive discounts and free tickets!',
    SmsUpdates: "I would like to receive exclusive offers and discounts via SMS",
    ByCreatingAnAccountYouAgree: "By creating an account you agree that you are at least 18 years of age, a UK resident and have read, accept and agree to the",
    TermsAndConditions: "Terms and Conditions",
    PrivacyPolicy: "Privacy Policy."
};

export const SignUpVerification = {
    PleaseEnterThe6digit: "Please enter the 6-digit code that was just sent to",
    IncorrectCodePleaseTryAgain: "Incorrect code, please try again or resend a new code",
    DidntReceiveACode: "Didn’t receive a code?",
    ResendCode: "Resend code",
    Verify: "Verify",
    IfYouDidntReceiveACodePlease: "If you didnt receive a code please make sure your phone number is correct and try again!",
    SkipThisStep: "Skip this step",
    VerifyYourAccountToClaimYourFREEBONUS: "Verify your account to claim your FREE BONUS",
    Success: "Success!",
    YourAccountHasBeenVerifiedSuccessfully: "Your account has been verified successfully!",
    GETSTARTED: "GET STARTED",
    AreYouSureYouDontWantYourFreeBonus: "Are you sure you don’t want your Free Bonus?",
    YouCanAlwaysVerifyAndClaimYourFreeBonus: "You can always verify and claim your free bonus later by going to the Account Page and following the steps.",
    VerifyLater: "Verify later",
    VerifyNow: 'Verify now'
};

export const AddressInputFields = [
    {
        name: 'Full name (first name and surname)',
        formikName: 'fullName'
    },
    {
        name: 'Phone Number',
        formikName: 'phoneNumber'
    },
    {
        name: 'Postcode',
        formikName: 'postCode'
    },
    {
        name: 'Address Line 1',
        formikName: 'addressLine1'
    },
    {
        name: 'Address Line 2',
        formikName: 'addressLine2'
    },
    {
        name: 'Town / City',
        formikName: 'city'
    },
]

export const PayoutBankFields = [
    {
        name: 'Full name',
        formikName: 'fullName'
    },
    {
        name: 'Sort Code',
        formikName: 'sortCode'
    },
    {
        name: 'Account Number',
        formikName: 'accountNumber'
    },
]

export const AccountsChangePassword = {
    inputFields: [
        {
            name: 'Current password',
            formikName: 'currentPassword'
        },
        {
            name: 'New Password',
            formikName: 'newPassword'
        },
        {
            name: 'Confirm New Password',
            formikName: 'confirmPassword'
        },
    ]
}

export const DrawerContent = {
    YouHaveTicketsIn: "You have tickets in",
    MYPOINTS: "MY POINTS",
    UseYourRaffoluxPointsToRedeem: "Use your Raffolux points to redeem prizes in the",
    Store: "Points Store",
    MENU: "MENU",
    MyTickets: "My Tickets",
    MyCredit: "My Credit",
    ReferAFriend: "Refer a friend",
    ACCOUNTSETTINGS: "ACCOUNT SETTINGS",
    PersonalInfo: "Personal Info",
    LightDark: "Light/Dark",
    SITEINFORMATION: "SITE INFORMATION",
    HelpAndFAQs: "Help & FAQs",
    LogOut: 'Log out',
    YOUREAWINNER: "YOU’RE A WINNER",
};

export const SmsVerification = {
    LetsGetStarted: "Let’s get started",
    PleaseEnterTheDigitCode: "Please enter the 6-digit code that was just sent to",
    IncorrectCodePleaseTryAgain: "Incorrect code, please try again or resend a new code",
    HaventReceivedACode: "Haven’t received a code? ",
    ResendCode: "Resend code",
    YourAccountHasBeenVerifiedSuccessfully: "Your account has been verified successfully!",
}


export const GuestCheckout = {
    GuestCheckout: "Guest Checkout",
    HaveAnAccount: "Have an account?",
    IWouldLikeToReceiveExciting: "I would like to receive exciting updates on my raffles, promotions and exclusive discounts!",
    ContinueToPayment: "Continue to payment",
    ByContinuingToPaymentYouAgree: "By continuing to payment you agree that you are at least 18 years of age, a UK resident and have read, accept and agree to the",
    TermsandConditions: "Terms and Conditions",
    and: "and",
    PrivacyPolicy: "Privacy Policy"
}

export const WithoutPaymentSuccessful = {
    PurchaseSuccessful: "Purchase successful!",
    Congratulations: "Congratulations",
    youNowOwnTheFollowingTickets: "you now own the following tickets:",
    Thats: "That’s",
    chancesToWin: "chances to win!",
    YouWillShortlyReceiveAnEmailConfirmingYourTickets: "You will shortly receive an email confirming your tickets!",
    Continue: 'Continue'
}

export const ClaimInputFields = {
    bankInputFields: [
        {
            name: 'Account holder name',
            formikName: 'fullName',
            placeHolder: 'full name of account holder'
        },
        {
            name: 'Sort code',
            formikName: 'sortCode',
            placeHolder: 'Enter account sort code'
        },
        {
            name: 'Account number',
            formikName: 'accountNumber',
            placeHolder: 'Enter account number'
        },
    ],
    paypalInputFields: [
        {
            name: 'Paypal Address',
            formikName: 'email',
        },
    ],
    addressInputFields: [
        {
            name: 'Full name (first name and surname)',
            formikName: 'fullName',
            placeHolder: ' '
        },
        {
            name: 'Phone Number',
            formikName: 'phoneNumber',
            placeHolder: ' '
        },
        {
            name: 'Postcode',
            formikName: 'postCode',
            placeHolder: 'Your area postcode'
        },
        {
            name: 'Address Line 1',
            formikName: 'addressLine1',
            placeHolder: ' '
        },
        {
            name: 'Address Line 2',
            formikName: 'addressLine2',
            placeHolder: ' '
        },
        {
            name: 'Town / City',
            formikName: 'city',
            placeHolder: ' '
        },
    ]
}
