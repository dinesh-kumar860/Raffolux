import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { memo, useContext } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import ThemeContext from '../../utils/themes/themeWrapper';
import { RaffoluxAsyncStorage } from '../../utils/RaffoluxAsyncStorage';

import { Url } from '../../helpers/routesApi';
import * as Common from '../../helpers/common'

import PrizeOption from './PrizeOption';

import ClaimYouWonImage from '../../assets/Images/ClaimYouWonImage.png'
import myRafflesEndedWinningTicketImageDark from '../../assets/Images/myRafflesEndedWinningTicketImageDark.png'


const PrizeClaimCard = (props) => {
    const theme = useContext(ThemeContext);
    const { typeOfClaim, position, setSelectedOptions, selectedOption, setSelectedSplit, ticketNo, title, imageUrl, prizeId, raffleId, data, price_cash, price_credit, isCashAlternative, selectedSplit, isJackpot, isCredit, winningTicket } = props;

    const choosePrize = async (type, ticketNumber) => {
        setSelectedOptions(prevOptions => ({ ...prevOptions, [ticketNumber]: type }));
        setSelectedSplit(prevSplit => ({ ...prevSplit, [ticketNumber]: Common.prizeClaim.fiftyPercent }));

        const updatedOptions = {
            ... await RaffoluxAsyncStorage.getItem('selectedPrizeOptions') || {},
            [ticketNumber]: type,
        };

        const updatedSplit = {
            ... await RaffoluxAsyncStorage.getItem('selectedPrizeSplit') || {},
            [ticketNumber]: Common.prizeClaim.fiftyPercent,
        };

       await RaffoluxAsyncStorage.setItem('selectedPrizeOptions', updatedOptions);
       await RaffoluxAsyncStorage.setItem('selectedPrizeSplit', updatedSplit);
    };

    const chooseSplit = async (percentage, ticketNumber) => {
        setSelectedSplit(prevSplit => ({ ...prevSplit, [ticketNumber]: percentage }))

        const updatedSplit = {
            ... await RaffoluxAsyncStorage.getItem('selectedPrizeSplit') || {},
            [ticketNumber]: percentage,
        };

        await RaffoluxAsyncStorage.setItem('selectedPrizeSplit', updatedSplit);
    }

    const SplitPercentages = (props) => {
        const { percentage, isSelected } = props
        return (
            <TouchableOpacity style={styles.splitPercentageContainer(isSelected)} onPress={() => chooseSplit(percentage, `${ticketNo}${position}`)}>
                <Text style={[styles.cardTitle, styles.percentageText(isSelected)]}>{percentage}</Text>
            </TouchableOpacity>
        )
    };

    const styles = StyleSheet.create({
        pleaseChooseText: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            opacity: 0.8,
        },
        prizeCardContainer: {
            backgroundColor: theme.theme === 'dark' ? '#141628' : '#FFF',
            borderRadius: 12,
            paddingTop: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(5.8),
            paddingBottom: responsiveHeight(3),
            elevation: 4,
            shadowColor: '#000616',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4
        },
        descriptionContainer: {
            flexDirection: 'row',
            gap: 8
        },
        prizeCardImage: {
            height: responsiveHeight(12.6),
            width: responsiveWidth(27.5),
            resizeMode: 'cover',
            borderRadius: 12
        },
        descriptionContentContainer: {
            flex: 1,
        },
        cardWonImage: {
            width: responsiveWidth(26),
            height: responsiveHeight(3.2),
            resizeMode: "contain",
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: responsiveHeight(1)
        },
        youWonText: {
            fontFamily: 'Gilroy-Heavy',
            color: '#FFBD0A',
            fontSize: responsiveFontSize(2)
        },
        cardTitle: {
            fontFamily: 'NunitoSans-SemiBold',
            color: theme.color,
            fontSize: responsiveFontSize(2),
        },
        winningTicketContainer: {
            flexDirection: 'row',
            gap: responsiveWidth(3),
            alignItems: 'center',
            marginTop: responsiveHeight(1.5)
        },
        winningTicketText: {
            fontFamily: 'Gilroy-ExtraBold',
            color: '#FFBD0A',
            fontSize: responsiveFontSize(1.8)
        },
        winningTicketImage: {
            width: responsiveWidth(10),
            height: responsiveHeight(1.8),
            alignItems: 'center',
            justifyContent: 'center'
        },
        ticketNumber: {
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000616',
            fontSize: responsiveFontSize(1.1)
        },
        horizontalLine: {
            height: 0.5,
            backgroundColor: theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.20)',
            marginTop: responsiveHeight(3)
        },
        cardPleaseChooseText: {
            marginTop: responsiveHeight(2),
            marginBottom: responsiveHeight(1.5)
        },
        cardOptionsContainer: {
            gap: 8,
        },
        orContainer: {
            height: 22,
            alignItems: 'center',
            justifyContent: 'center'
        },
        jackpotTextOpacity: {
            opacity: 0.5
        },
        percentagesContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: responsiveHeight(3)
        },
        splitPercentageContainer(active) {
            return {
                height: responsiveHeight(5.4),
                width: responsiveWidth(24.2),
                backgroundColor: active ? 'rgba(255, 189, 10, 0.05)' : null,
                borderColor: active ? 'rgba(255, 189, 10, 0.40)' : theme.theme == 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                borderWidth: 1.5,
                borderRadius: 3,
                alignItems: 'center',
                justifyContent: 'center'
            }
        },
        percentageText(active) {
            return {
                opacity: active ? 1 : 0.5
            }
        },
        splitReceiveText: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.4),
            textAlign: 'center',
            opacity: 0.7,
            marginTop: responsiveHeight(3),
            marginBottom: responsiveHeight(1)
        },
        orangeText: {
            color: '#FFBD0A'
        }
    });



    return (
        <View style={styles.prizeCardContainer}>
            <View style={styles.descriptionContainer}>
                <Image source={{ uri: `${Url.ImageUrl}${imageUrl}` }} style={styles.prizeCardImage} />
                <View style={styles.descriptionContentContainer}>
                    <ImageBackground style={styles.cardWonImage} source={ClaimYouWonImage} >
                        <Text style={styles.youWonText}>YOU WON</Text>
                    </ImageBackground>
                    <Text style={styles.cardTitle}>Win {title}</Text>
                    <View style={styles.winningTicketContainer}>
                        <Text style={styles.winningTicketText}>WINNING TICKET:</Text>
                        <ImageBackground source={myRafflesEndedWinningTicketImageDark} style={styles.winningTicketImage}>
                            <Text style={styles.ticketNumber}>{winningTicket}</Text>
                        </ImageBackground>
                    </View>
                </View>
            </View>
            <View style={styles.horizontalLine}></View>
            <Text style={[styles.pleaseChooseText, styles.cardPleaseChooseText]}>Please choose your prize option</Text>
            <View style={styles.cardOptionsContainer}>
                {
                    data?.map((ele, i) => {
                        return (
                            <>
                                {ele.title === 'Split' && <View style={styles.orContainer}><Text style={[styles.cardTitle, styles.jackpotTextOpacity]}>or</Text></View>}
                                <PrizeOption key={`${i}_${ele}_${ticketNo}${position}`} typeOfClaim={typeOfClaim} position={position} title={title} prizeOption={ele.title} isSelected={selectedOption === ele.title} imageUrl={imageUrl} ticketNo={ticketNo} theme={theme} isCashAlternative={isCashAlternative} choosePrize={choosePrize} prizeId={prizeId} raffleId={raffleId} price_cash={price_cash} price_credit={price_credit} />
                            </>
                        )
                    }
                    )
                }
            </View>
            {
                selectedOption === Common.prizeClaim.Split &&
                <>
                    <View style={styles.percentagesContainer}>
                        <SplitPercentages percentage={Common.prizeClaim.twentyfivePercent} isSelected={selectedSplit === Common.prizeClaim.twentyfivePercent} />
                        <SplitPercentages percentage={Common.prizeClaim.fiftyPercent} isSelected={selectedSplit === Common.prizeClaim.fiftyPercent} />
                        <SplitPercentages percentage={Common.prizeClaim.seventyfivePercent} isSelected={selectedSplit === Common.prizeClaim.seventyfivePercent} />
                    </View>
                    <Text style={styles.splitReceiveText}>You will receive <Text style={styles.orangeText}>£{selectedSplit === Common.prizeClaim.twentyfivePercent && price_cash * 0.25 || selectedSplit === Common.prizeClaim.fiftyPercent && price_cash * 0.50 || selectedSplit === Common.prizeClaim.seventyfivePercent && price_cash * 0.75} Cash</Text> and <Text style={styles.orangeText}>£{selectedSplit === Common.prizeClaim.twentyfivePercent && price_cash * 0.75 || selectedSplit === Common.prizeClaim.fiftyPercent && price_cash * 0.50 || selectedSplit === Common.prizeClaim.seventyfivePercent && price_cash * 0.25} Site Credit</Text></Text>
                </>
            }
        </View>
    )
};


export default memo(PrizeClaimCard)

