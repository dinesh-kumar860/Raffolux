import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import ThemeContext from '../utils/themes/themeWrapper'
import Header from '../utils/Header';
import { useInternet } from '../utils/InternetConnection/InternetContextWrapper';
import { isEmptyObject } from '../utils/utils';
import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage';

import ClaimStepper from './ClaimSummaryComponents/ClaimStepper';
import BottomButtonContainer from './ClaimSummaryComponents/BottomButtonContainer';

import PrizeClaimCard from './PrizeClaimComponents/PrizeClaimCard';
import PrizeJackPotCard from './PrizeClaimComponents/PrizeJackPotCard';

import { fetchMyPrizeClaimsWithLogin } from '../api/prizeClaimApi';

import * as Common from '../helpers/common'
import Loader from '../helpers/Loader';

import Footer from './Footer';


const PrizeClaimNew = () => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();
    const { isConnected } = useInternet();
    const scrollTop = useRef();

    const claimPrizesCount = useSelector((state) => state.getAccountData.claimPrizesCount);

    const [totalData, setTotalData] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedSplit, setSelectedSplit] = useState({});


    useEffect(() => {
        const setStates = async () => {
            selectedStoragePrizes = await RaffoluxAsyncStorage.getItem('selectedPrizeOptions') || {}
            selectedStorageSplits = await RaffoluxAsyncStorage.getItem('selectedPrizeSplit') || {}
            setSelectedOptions(selectedStoragePrizes)
            setSelectedSplit(selectedStorageSplits)
        }
        setStates()
    }, []);


    useEffect(() => {
        const fetchOldValues = async () => {
            const oldOptions = await RaffoluxAsyncStorage.getItem('selectedPrizeOptions') || {}
            const updatedStorageOptions = { ...oldOptions };

            for (const ticketNoAlias in totalData?.winningTickets) {
                const ele = totalData?.winningTickets[ticketNoAlias];
                if (ele.typeOfClaim === 1 && ele.category[0]?.CategoryName === Common.prizeClaim.raffoluxtickets) {
                    // setSelectedOptions(prevOptions => ({ ...prevOptions, [`${ele.ticket_no_alias}${ele.Position}`]: Common.prizeClaim.Credit }));
                    updatedStorageOptions[`${ele.ticket_no_alias}${ele.Position}`] = Common.prizeClaim.Credit;
                }
                if (ele.typeOfClaim === 2 && Number(ele.websiteRaffles[0]?.RetailPrice) < 7000) {
                    totalData?.categoryList?.map((ele1, j) => {
                        if (ele1.id === ele.CategoryID_id && ele1.CategoryDisplayName === Common.prizeClaim.RaffoluxTickets) {
                            // setSelectedOptions(prevOptions => ({ ...prevOptions, [`${ele.ticket_no_alias}${ele.Position}`]: Common.prizeClaim.Credit }));
                            updatedStorageOptions[`${ele.ticket_no_alias}${ele.Position}`] = Common.prizeClaim.Credit;
                        }
                    })
                }
                if (ele.typeOfClaim === 2 && Number(ele.websiteRaffles[0]?.RetailPrice) > 7000) {
                    // setSelectedOptions(prevOptions => ({ ...prevOptions, [`${ele.ticket_no_alias}${ele.Position}`]: 'jackpot' }));
                    updatedStorageOptions[`${ele.ticket_no_alias}${ele.Position}`] = 'jackpot';
                }
            }

            setSelectedOptions(updatedStorageOptions)

            await RaffoluxAsyncStorage.setItem('selectedPrizeOptions', updatedStorageOptions);
        }

        fetchOldValues();

    }, [totalData])


    useEffect(() => {
        if (isConnected) {
            const fetchMyPrizeClaims = async () => {
                let response = await fetchMyPrizeClaimsWithLogin();
                response && setTotalData(response)
            };
            fetchMyPrizeClaims()
        }
    }, [isConnected,claimPrizesCount]);


    const backArrowPress = () => navigation.goBack();


    const handleClaimPrize = async () => {
        const selectedStoragePrizes = await RaffoluxAsyncStorage.getItem('selectedPrizeOptions')
        const selectedStorageSplits = await RaffoluxAsyncStorage.getItem('selectedPrizeSplit')

        let isAnyContainerEmpty = false;
        for (const ticketNoAlias in totalData?.winningTickets) {
            const ele = totalData?.winningTickets[ticketNoAlias];
            if (ele.typeOfClaim === 1 && ele.category[0]?.CategoryName === Common.prizeClaim.cash) {
                const claimOption = selectedStoragePrizes[`${ele.ticket_no_alias}${ele.Position}`];

                if (!claimOption) {
                    isAnyContainerEmpty = true;
                    break;
                }
                if (claimOption === Common.prizeClaim.Split && !selectedStorageSplits[`${ele.ticket_no_alias}${ele.Position}`]) {
                    isAnyContainerEmpty = true;
                    break;
                }
            }
            if (ele.typeOfClaim === 1 && Common.prizeClaim.specialCategories.includes(ele.category[0]?.CategoryName.toLowerCase())) {
                const claimOption = selectedStoragePrizes[`${ele.ticket_no_alias}${ele.Position}`];

                if (!claimOption) {
                    isAnyContainerEmpty = true;
                    break;
                }
            }
            if (ele.typeOfClaim === 1 && ele.category[0]?.CategoryName === Common.prizeClaim.raffoluxtickets) {
                const claimOption = selectedStoragePrizes[`${ele.ticket_no_alias}${ele.Position}`];

                if (!claimOption) {
                    isAnyContainerEmpty = true;
                    break;
                }
            }
            if (ele.typeOfClaim === 2 && Number(ele.websiteRaffles[0]?.RetailPrice) < 7000) {
                const claimOption = selectedStoragePrizes[`${ele.ticket_no_alias}${ele.Position}`];

                if (!claimOption) {
                    isAnyContainerEmpty = true;
                    break;
                }
                if (claimOption === Common.prizeClaim.Split && !selectedStorageSplits[`${ele.ticket_no_alias}${ele.Position}`]) {
                    isAnyContainerEmpty = true;
                    break;
                }
            }
        }
        if (isAnyContainerEmpty) {
            Alert.alert(`${Common.prizeClaim.PleaseSelectAnOptionFromEachPrize}`);
        }
        else {
            const prizeClaims = [];

            for (const ticketNoAlias in selectedStoragePrizes) {
                const claimOption = selectedStoragePrizes[ticketNoAlias];
                let splitPercentage = Common.prizeClaim.zero;
                if (claimOption === Common.prizeClaim.Split) {
                    splitPercentage = selectedStorageSplits[ticketNoAlias] || Common.prizeClaim.zero;
                }
                prizeClaims.push({ option: claimOption, ticket_no_alias: ticketNoAlias, split: splitPercentage });
            }

            const claimArray = [];
            let totalCash = 0;

            totalData.winningTickets?.map((ele, i) => {
                prizeClaims.map((ele1, j) => {
                    if (Number(`${ele.ticket_no_alias}${ele.Position}`) === Number(ele1.ticket_no_alias)) {
                        if (ele1.option == 'Cash') {
                            totalCash = totalCash + Number(ele.price.cash)
                        } else if (ele1.option == 'Split') {
                            if (ele1.split == '25%') {
                                totalCash = totalCash + Number(ele.price.cash) * 0.25
                            } else if (ele1.split == '50%') {
                                totalCash = totalCash + Number(ele.price.cash) * 0.50
                            } else {
                                totalCash = totalCash + Number(ele.price.cash) * 0.75
                            }
                        }
                        claimArray.push({ ticketNo: ele.ticket_no_alias, option: ele1.option, split: ele1.split, winnerArr: ele, categoryListArray: totalData?.categoryList })
                    }
                })
            });
            navigation.navigate('PrizeClaimSummaryNew', { winnerRaffleDetails: claimArray, specialCategories: Common.prizeClaim.specialCategories, totalCash: totalCash, pendingPrizes: false });
        }
    };

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        stepperContainer: {
            marginTop: responsiveHeight(4),
            marginHorizontal: responsiveWidth(17),
        },
        pleaseChooseText: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            opacity: 0.8,
        },
        subHeaderMargin: {
            marginTop: responsiveHeight(4),
            marginBottom: responsiveHeight(2)
        },
        prizeCardMainContainer: {
            marginHorizontal: responsiveWidth(4),
            gap: responsiveHeight(2),
            marginBottom: responsiveHeight(10)
        },
        footerContainer: {
            marginBottom: responsiveHeight(10)
        }
    });

    return (
        <>
            {
                isEmptyObject(totalData) ? <Loader />
                    :
                    <>
                        <ScrollView style={styles.mainContainer} ref={scrollTop} >
                            <Header title={'Prize Claim'} backArrowPress={backArrowPress} theme={theme} />
                            <View style={styles.stepperContainer}>
                                <ClaimStepper page={'PrizeClaim'} />
                            </View>
                            <Text style={[styles.pleaseChooseText, styles.subHeaderMargin]}>{`Please choose how you would like to \nreceive your prizes!`}</Text>
                            <View style={styles.prizeCardMainContainer}>
                                {
                                    totalData && totalData.winningTickets?.length > 0 && totalData.winningTickets?.map((ele, i) => (
                                        <>
                                            {
                                                ele.typeOfClaim == 1 && totalData.categoryList?.map((category, index) => {
                                                    if (ele.CategoryID_id === category.id && category.CategoryDisplayName === Common.prizeClaim.Cash) {
                                                        return <PrizeClaimCard key={`${index}_${ele.Position}_${ele.ticket_no_alias}`} theme={theme} typeOfClaim={ele.typeOfClaim} position={ele.Position} setSelectedOptions={setSelectedOptions} setSelectedSplit={setSelectedSplit} selectedOption={selectedOptions[`${ele.ticket_no_alias}${ele.Position}`]} ticketNo={ele.ticket_no_alias} title={ele.name ? ele.name : ele.websiteRaffles[0].Title} imageUrl={ele.img_url ? ele.img_url : ele.websiteRaffles[0].MainImageUrl} prizeId={ele.id} raffleId={ele.raffle_id_id} data={Common.prizeClaim.optionList2} price_cash={ele.price.cash} price_credit={ele.price.credit} isCashAlternative={false} selectedSplit={selectedSplit[`${ele.ticket_no_alias}${ele.Position}`]} isCredit={false} winningTicket={ele.TicketNo} />
                                                    }
                                                    if (ele.CategoryID_id === category.id && category.CategoryDisplayName === Common.prizeClaim.RaffoluxTickets) {
                                                        return <PrizeClaimCard key={`${index}_${ele.Position}_${ele.ticket_no_alias}`} theme={theme} typeOfClaim={ele.typeOfClaim} position={ele.Position} setSelectedOptions={setSelectedOptions} setSelectedSplit={setSelectedSplit} selectedOption={selectedOptions[`${ele.ticket_no_alias}${ele.Position}`]} ticketNo={ele.ticket_no_alias} title={ele.name ? ele.name : ele.websiteRaffles[0].Title} imageUrl={ele.img_url ? ele.img_url : ele.websiteRaffles[0].MainImageUrl} prizeId={ele.id} raffleId={ele.raffle_id_id} data={Common.prizeClaim.optionList3} price_cash={ele.price.cash} price_credit={ele.price.credit} isCashAlternative={false} selectedSplit={selectedSplit[`${ele.ticket_no_alias}${ele.Position}`]} isCredit={true} winningTicket={ele.TicketNo} />
                                                    }
                                                    if (ele.CategoryID_id === category.id && Common.prizeClaim.specialCategories.includes(category.CategoryDisplayName.toLowerCase())) {
                                                        return <PrizeClaimCard key={`${index}_${ele.Position}_${ele.ticket_no_alias}`} theme={theme} typeOfClaim={ele.typeOfClaim} position={ele.Position} setSelectedOptions={setSelectedOptions} setSelectedSplit={setSelectedSplit} selectedOption={selectedOptions[`${ele.ticket_no_alias}${ele.Position}`]} ticketNo={ele.ticket_no_alias} title={ele.name ? ele.name : ele.websiteRaffles[0].Title} imageUrl={ele.img_url ? ele.img_url : ele.websiteRaffles[0].MainImageUrl} prizeId={ele.id} raffleId={ele.raffle_id_id} data={Common.prizeClaim.optionList1} price_cash={ele.price.cash} price_credit={ele.price.credit} isCashAlternative={true} selectedSplit={selectedSplit[`${ele.ticket_no_alias}${ele.Position}`]} isCredit={false} winningTicket={ele.TicketNo} />
                                                    }
                                                })
                                            }

                                            {
                                                ele.typeOfClaim === 2 && Number(ele.websiteRaffles[0]?.RetailPrice) < 7000 &&
                                                totalData.categoryList?.map((ele1, j) => {
                                                    if (ele1.id === ele.CategoryID_id && ele1.CategoryDisplayName === Common.prizeClaim.RaffoluxTickets) {
                                                        return <PrizeClaimCard key={`${j}_${ele.Position}__${ele.ticket_no_aliass}`} theme={theme} typeOfClaim={ele.typeOfClaim} position={ele.Position} categoryName={ele1.CategoryDisplayName} setSelectedOptions={setSelectedOptions} setSelectedSplit={setSelectedSplit} selectedOption={selectedOptions[`${ele.ticket_no_alias}${ele.Position}`]} ticketNo={ele.ticket_no_alias} title={ele.name ? ele.name : ele.websiteRaffles[0].Title} imageUrl={ele.img_url ? ele.img_url : ele.websiteRaffles[0].MainImageUrl} prizeId={ele.id} raffleId={ele.raffle_id_id} data={Common.prizeClaim.optionList3} price_cash={ele.price.cash} price_credit={ele.price.credit} isCashAlternative={false} selectedSplit={selectedSplit[`${ele.ticket_no_alias}${ele.Position}`]} isCredit={true} winningTicket={ele.TicketNo} />
                                                    }
                                                    if (ele1.id === ele.CategoryID_id && ele1.CategoryDisplayName === Common.prizeClaim.Cash) {
                                                        return <PrizeClaimCard key={`${j}_${ele.Position}___${ele.ticket_no_alias}`} theme={theme} typeOfClaim={ele.typeOfClaim} position={ele.Position} categoryName={ele1.CategoryDisplayName} setSelectedOptions={setSelectedOptions} setSelectedSplit={setSelectedSplit} selectedOption={selectedOptions[`${ele.ticket_no_alias}${ele.Position}`]} ticketNo={ele.ticket_no_alias} title={ele.name ? ele.name : ele.websiteRaffles[0].Title} imageUrl={ele.img_url ? ele.img_url : ele.websiteRaffles[0].MainImageUrl} prizeId={ele.id} raffleId={ele.raffle_id_id} data={Common.prizeClaim.optionList2} price_cash={ele.price.cash} price_credit={ele.price.credit} isCashAlternative={false} selectedSplit={selectedSplit[`${ele.ticket_no_alias}${ele.Position}`]} isCredit={false} winningTicket={ele.TicketNo} />
                                                    }
                                                    if (ele1.id === ele.CategoryID_id && Common.prizeClaim.specialCategories.includes(ele1.CategoryDisplayName.toLowerCase())) {
                                                        return <PrizeClaimCard key={`${j}_${ele.Position}__${ele.ticket_no_alias}`} theme={theme} typeOfClaim={ele.typeOfClaim} position={ele.Position} categoryName={ele1.CategoryDisplayName} setSelectedOptions={setSelectedOptions} setSelectedSplit={setSelectedSplit} selectedOption={selectedOptions[`${ele.ticket_no_alias}${ele.Position}`]} ticketNo={ele.ticket_no_alias} title={ele.name ? ele.name : ele.websiteRaffles[0].Title} imageUrl={ele.img_url ? ele.img_url : ele.websiteRaffles[0].MainImageUrl} prizeId={ele.id} raffleId={ele.raffle_id_id} data={Common.prizeClaim.optionList1} price_cash={ele.price.cash} price_credit={ele.price.credit} isCashAlternative={true} selectedSplit={selectedSplit[`${ele.ticket_no_alias}${ele.Position}`]} isCredit={false} winningTicket={ele.TicketNo} />
                                                    }
                                                    return null;
                                                })
                                            }

                                            {
                                                ele.typeOfClaim === 2 && Number(ele.websiteRaffles[0]?.RetailPrice) > 7000 &&
                                                <PrizeJackPotCard key={`jackpot_${ele.Position}_${Common.prizeClaim.Jackpot}_${ele.ticket_no_alias}`} winningTicket={ele.TicketNo} ticketNo={ele.ticket_no_alias} position={ele.Position} title={ele.name ? ele.name : ele.websiteRaffles[0]?.Title} imageUrl={ele.img_url ? ele.img_url : ele.websiteRaffles[0]?.MainImageUrl} setSelectedOptions={setSelectedOptions} isSelected={selectedOptions[`${ele.ticket_no_alias}${ele.Position}`] == 'jackpot'} prizeId={ele.id} raffleId={ele.raffle_id_id} price_cash={ele.websiteRaffles[0]?.RetailPrice} price_credit={ele.websiteRaffles[0]?.RetailPrice} isJackpot={true} />
                                            }
                                        </>
                                    ))
                                }
                            </View>
                            <View style={styles.footerContainer}>
                                {/* <Footer /> */}
                            </View>
                        </ScrollView>
                        <BottomButtonContainer theme={theme} title={'Claim'} completeClaim={handleClaimPrize} changeOpacity={false} page={'prizeClaim'} disableButton={false} isDataFetching={null} />
                    </>
            }
        </>
    )
}

export default memo(PrizeClaimNew)


