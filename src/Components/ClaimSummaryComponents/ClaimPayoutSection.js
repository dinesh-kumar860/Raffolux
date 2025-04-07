import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'

import ClaimSummaryPayoutOption from './ClaimSummaryPayoutOption'
import ClaimBankPayout from './ClaimBankPayout'
import ClaimPaypalPayout from './ClaimPaypalPayout'

import ThemeContext from '../../utils/themes/themeWrapper'

import { fetchBankDetailsWithLogin, fetchPaypalDetailsWithLogin } from '../../api/PrizeSummaryApi'

import RaffoluxExaclamtorySymbolBlack from '../../assets/Images/RaffoluxExaclamtorySymbolBlack.png'
import ClaimPaypalIcon from '../../assets/Images/ClaimPaypalIcon.png'
import ClaimTrueLayerIcon from '../../assets/Images/ClaimTrueLayerIcon.png'
import ClaimBankTransferBankImage from '../../assets/Images/ClaimBankTransferBankImage.png'


const ClaimPayoutSection = (props) => {
    const { totalCash, mainScrollviewRef, setSelectedPayoutId, selectedPayoutId, setSelectedPayoutOption, selectedPayoutOption, page } = props;

    const theme = useContext(ThemeContext);
    const mainPayoutRef = useRef(null);

    const [paypalData, setPaypalData] = useState([])
    const [bankData, setBankData] = useState([])

    const fetchPaypalDetails = async () => {
        let response = await fetchPaypalDetailsWithLogin();
        if (response) {
            setPaypalData(response);
            setSelectedPayoutId(null)
        }
    };

    const fetchBankDetails = async () => {
        let response = await fetchBankDetailsWithLogin()
        if (response) {
            setBankData(response)
            setSelectedPayoutId(null)
        }
    };

    useEffect(() => {
        fetchPaypalDetails();
        fetchBankDetails()
    }, []);



    const styles = StyleSheet.create({
        payoutContainer: {
            marginTop: responsiveHeight(3)
        },
        payoutHeader: {
            color: theme.color,
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            opacity: 0.8
        },
        payoutRadioButtonOptionsContainer: {
            gap: 11,
            marginTop: responsiveHeight(2),
        },
        payoutBankContainer: {
            marginTop: responsiveHeight(3)
        }
    })

    return (
        <>
            <View style={styles.payoutContainer}>
                <Text style={styles.payoutHeader}>Please choose a payout method</Text>
                <View style={styles.payoutRadioButtonOptionsContainer}>
                    {
                        page == "prizeSummary" ?
                            totalCash <= 2000 ?
                                <ClaimSummaryPayoutOption mainScrollviewRef={mainScrollviewRef} childRef={mainPayoutRef} title={'Bank Transfer'} amount={totalCash} type={'trueLayer'} isActive={selectedPayoutOption === 'trueLayer'} setSelectedPayoutOption={setSelectedPayoutOption} image={ClaimTrueLayerIcon} viaText={'via TrueLayer'} description={'You will be taken to our partner TrueLayer to complete your direct bank transfer payout.'} />
                                :
                                <ClaimSummaryPayoutOption mainScrollviewRef={mainScrollviewRef} childRef={mainPayoutRef} title={'Bank Transfer'} amount={totalCash} type={'bank'} isActive={selectedPayoutOption === 'bank'} setSelectedPayoutOption={setSelectedPayoutOption} image={page == 'trueLayerError' ? ClaimBankTransferBankImage : RaffoluxExaclamtorySymbolBlack} viaText={page == 'trueLayerError' ? 'via manual transfer' : 'via Raffolux customer service'} description={page == 'trueLayerError' ? 'A member of our customer service team will fulfil your prize winnings payment' : 'Bank transfer is restricted to working hours Mon to Fri, 9am to 6pm'} page={page} />
                            :
                            <>
                                {totalCash <= 2000 && <ClaimSummaryPayoutOption mainScrollviewRef={mainScrollviewRef} childRef={mainPayoutRef} title={'Bank Transfer'} amount={totalCash} type={'trueLayer'} isActive={selectedPayoutOption === 'trueLayer'} setSelectedPayoutOption={setSelectedPayoutOption} image={ClaimTrueLayerIcon} viaText={'via TrueLayer'} description={'You will be taken to our partner TrueLayer to complete your direct bank transfer payout.'} />}
                                <ClaimSummaryPayoutOption mainScrollviewRef={mainScrollviewRef} childRef={mainPayoutRef} title={'Bank Transfer'} amount={totalCash} type={'bank'} isActive={selectedPayoutOption === 'bank'} setSelectedPayoutOption={setSelectedPayoutOption} image={page == 'trueLayerError' ? ClaimBankTransferBankImage : RaffoluxExaclamtorySymbolBlack} viaText={page == 'trueLayerError' ? 'via manual transfer' : 'via Raffolux customer service'} description={page == 'trueLayerError' ? 'A member of our customer service team will fulfil your prize winnings payment' : 'Bank transfer is restricted to working hours Mon to Fri, 9am to 6pm'} page={page} />
                            </>
                    }
                    <ClaimSummaryPayoutOption mainScrollviewRef={mainScrollviewRef} childRef={mainPayoutRef} title={'Paypal Transfer'} amount={totalCash} type={'paypal'} isActive={selectedPayoutOption === 'paypal'} setSelectedPayoutOption={setSelectedPayoutOption} image={ClaimPaypalIcon} viaText={'via Paypal'} description={'Paypal transfers are manual and are therefore restricted to working hours Mon to Fri, 9am to 6pm'} />
                </View>
            </View>

            <View style={styles.payoutBankContainer} ref={mainPayoutRef}>
                {
                    selectedPayoutOption === 'bank' && <ClaimBankPayout mainScrollviewRef={mainScrollviewRef} setSelectedPayoutId={setSelectedPayoutId} selectedPayoutId={selectedPayoutId} data={bankData} fetchBankDetails={fetchBankDetails} />
                }
                {
                    selectedPayoutOption === 'paypal' && <ClaimPaypalPayout mainScrollviewRef={mainScrollviewRef} setSelectedPayoutId={setSelectedPayoutId} selectedPayoutId={selectedPayoutId} data={paypalData} fetchPaypalDetails={fetchPaypalDetails} />
                }
            </View>
        </>
    )
}

export default memo(ClaimPayoutSection)

