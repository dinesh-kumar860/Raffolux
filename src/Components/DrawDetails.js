import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Svg, Path } from 'react-native-svg';

import Loader from '../helpers/Loader';
import { Url } from '../helpers/routesApi';
import SplitName from '../helpers/SplitName';
import ActivityIndicatorLoader from '../helpers/ActivityIndicatorLoader';
import * as common from '../helpers/common'

import ThemeContext from '../utils/themes/themeWrapper';
import Header from '../utils/Header';
import { isEmptyObject } from '../utils/utils';
import { timeFormatter } from '../utils/TimeFormatter';

import Footer from './Footer';

import { fetchDrawDetailsWithLogin, sortDrawticketsPurchaseWithLogin } from '../api/drawDetailsApi';
import DrawDetailsWinnersCard from './DrawDetailsComponents/DrawDetailsWinnersCard';

import drawDetailsRandomOrg from '../assets/Images/drawDetailsRandomOrg.png'

const DrawDetails = ({ route, navigation }) => {
    const { drawCode } = route.params;
    const theme = useContext(ThemeContext);

    const [raffleId, setRaffleId] = useState(null)
    const [drawDetailsData, setDrawDetailsData] = useState({});
    const [sortTicketsData, setSortTicketsData] = useState([]);
    const [sortTicketsTotalCount, setSortTicketsTotalCount] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const [dataLoading, setDataLoading] = useState(false);
    const [allItemsRendered, setAllItemsRendered] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const flatListRef = useRef(null);

    const fetchMoreData = async (number) => {
        setDataLoading(true);
        setPageNumber(number);
        setAllItemsRendered(false);
        let response = await sortDrawticketsPurchaseWithLogin({ raffleId: raffleId, pageNumber: number })
        if (response) {
            !isEmptyObject(response) && setDataLoading(false)
            !isEmptyObject(response) && setSortTicketsTotalCount(response.totalDataCount)
            !isEmptyObject(response) && setSortTicketsData(prevData => [...prevData, ...response.sortedTicketList]);
        } else {
            setDataLoading(false)
        }
    }

    useEffect(() => {
        const drawDetailsFun = async () => {
            let response = await fetchDrawDetailsWithLogin({ drawCode: drawCode });
            !isEmptyObject(response) && setDrawDetailsData(response)
            !isEmptyObject(response) && setRaffleId(response?.drawDetails[0]?.RaffleLink_id)
            if (!isEmptyObject(response)) {
                let sortTicketsResponse = await sortDrawticketsPurchaseWithLogin({ raffleId: response?.drawDetails[0]?.RaffleLink_id, pageNumber: pageNumber })
                !isEmptyObject(sortTicketsResponse) && setSortTicketsTotalCount(sortTicketsResponse.totalDataCount)
                !isEmptyObject(sortTicketsResponse) && setSortTicketsData(sortTicketsResponse.sortedTicketList);
            }
        };
        drawDetailsFun();
    }, [drawCode]);

    const backArrowPress = () => navigation.goBack();

    const onEndReached = () => setAllItemsRendered(true);

    const scrollToTop = () => flatListRef.current.scrollToOffset({ animated: true, offset: 0 });

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        offsetY > 1600 ? setShowScrollToTop(true) : setShowScrollToTop(false);
    };

    const drawInfoList = [
        {
            image: theme.theme === 'light' ?
                <Svg width="18" height="16" viewBox="0 0 36 32" fill="none" xmlns="http:www.w3.org/2000/svg">
                    <Path id="Shape" fill-rule="evenodd" clip-rule="evenodd" d="M27 12L26.9688 1.0375C26.9688 0.4875 26.5187 0.0375 25.9688 0.0375L9.98125 0C9.425 0 8.96875 0.45 8.96875 1.0125L9 12H27ZM0 20V30C0 31.1063 0.89375 32 2 32H34C35.1063 32 36 31.1063 36 30V20H0ZM35.9609 17.9382C35.9476 17.9605 35.9399 17.9735 35.9188 18H0.075C0.065625 17.9844 0.0578125 17.9734 0.05 17.9625C0.0421875 17.9516 0.034375 17.9406 0.025 17.925L3.5 9.2625C3.80625 8.50625 4.5375 8.00625 5.35625 8.00625H6.9875L7 12.0063H6.96875L5.96875 14.0063H29.9937L28.9937 12.0063L28.9812 8.00625H30.6437C31.4625 8.00625 32.1937 8.50625 32.5 9.2625L35.9688 17.925C35.9659 17.9298 35.9633 17.9341 35.9609 17.9382Z" fill="#000616cc" />
                </Svg>
                :
                <Svg width="18" height="16" viewBox="0 0 36 32" fill="none" xmlns="http:www.w3.org/2000/Svg">
                    <Path id="Shape" fill-rule="evenodd" clip-rule="evenodd" d="M27 12L26.9688 1.0375C26.9688 0.4875 26.5187 0.0375 25.9688 0.0375L9.98125 0C9.425 0 8.96875 0.45 8.96875 1.0125L9 12H27ZM0 20V30C0 31.1063 0.89375 32 2 32H34C35.1063 32 36 31.1063 36 30V20H0ZM35.9609 17.9382C35.9476 17.9605 35.9399 17.9735 35.9188 18H0.075C0.065625 17.9844 0.0578125 17.9734 0.05 17.9625C0.0421875 17.9516 0.034375 17.9406 0.025 17.925L3.5 9.2625C3.80625 8.50625 4.5375 8.00625 5.35625 8.00625H6.9875L7 12.0063H6.96875L5.96875 14.0063H29.9937L28.9937 12.0063L28.9812 8.00625H30.6437C31.4625 8.00625 32.1937 8.50625 32.5 9.2625L35.9688 17.925C35.9659 17.9298 35.9633 17.9341 35.9609 17.9382Z" fill="#ffffff" />
                </Svg>,
            data: !isEmptyObject(drawDetailsData) && `Drawn: ${timeFormatter(drawDetailsData?.drawDetails[0]?.DrawDateTime, 'DrawDetailsImageSection')}`
        },
        {
            image: <Ionicons name={'person'} color={theme.color} size={15} />,
            data: !isEmptyObject(drawDetailsData) && `${drawDetailsData?.raffleDetails[0]?.total_entries} ${common.DrawDetails.totalEntries}`
        },
        {
            image: <FontAwesome5 name={'trophy'} color={theme.color} size={15} />,
            data: !isEmptyObject(drawDetailsData) && `${drawDetailsData && drawDetailsData?.raffleDetails[0]?.NoWinners > 1 ? `${drawDetailsData?.raffleDetails[0]?.NoWinners} Winners` : `${drawDetailsData?.raffleDetails[0]?.NoWinners} Winner`}`
        }
    ]

    const DrawDetailInfo = ({ image, data }) => {
        return (
            <View style={styles.singleButtoncontainer}>
                {image}
                <Text style={styles.buttonText}>{data}</Text>
            </View>
        )
    };

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.background
        },
        flatListContainer: {
            backgroundColor: theme.background
        },
        container: {
            backgroundColor: theme.background,
            gap: scale(8),
            paddingHorizontal: scale(16),
            paddingTop: scale(8)
        },
        cardContainer: {
            alignItems: 'center',
            paddingTop: scale(16),
            borderWidth: scale(1),
            borderRadius: scale(12),
            backgroundColor: theme.theme === 'dark' ? '#070B1A' : 'rgba(255,255,255,0.5)',
            borderColor: theme.theme === 'dark' ? 'rgba(151,151,151,0.3)' : 'rgba(0,0,0,0.151715)'
        },
        cardContainerPadding: {
            gap: scale(8),
            paddingTop: scale(24)
        },
        raffleImage: {
            width: scale(288),
            height: scale(169),
            borderRadius: scale(6),
            alignSelf: "center",
            resizeMode: 'contain',
        },
        insideCardContent: {
            justifyContent: 'center',
            gap: scale(16),
            marginHorizontal: scale(15)
        },
        raffleName: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            letterSpacing: scale(0.75),
            textAlign: 'center',
            color: theme.color
        },
        threeButtonsContainer: {
            gap: scale(8),
            marginBottom: scale(19),
        },
        singleButtoncontainer: {
            flexDirection: 'row',
            borderWidth: scale(1),
            borderRadius: scale(6),
            justifyContent: 'center',
            alignItems: "center",
            padding: scale(12),
            gap: scale(8),
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.151797)' : 'rgba(0,0,0,0.151797)'
        },
        logoStyle: {
            width: responsiveWidth(4),
            height: responsiveHeight(2.2),
            resizeMode: 'contain',
        },
        buttonText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.7),
            opacity: scale(0.8),
            letterSpacing: scale(0.2)
        },
        randomOrgText1: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
            color: theme.color
        },
        randomOrgImageContainer: {
            backgroundColor: '#F9F9F9',
            paddingHorizontal: scale(19),
            paddingVertical: scale(8),
            marginHorizontal: scale(85),
            borderRadius: scale(3)
        },
        randomOrgImage: {
            resizeMode: 'contain',
            width: scale(145),
            height: scale(18),
            alignSelf: 'center'
        },
        randomOrgText2: {
            color: theme.color,
            textAlign: 'center',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.2),
            marginHorizontal: scale(21),
            marginBottom: scale(26),
            marginTop: scale(16),
            opacity: scale(0.8),
            lineHeight: scale(16)
        },
        winnersChampionImageContainer: {
            flexDirection: 'row',
            gap: scale(12),
            justifyContent: 'center',
            alignItems: "center",
            marginTop: scale(36)
        },
        winnersChampionImage: {
            resizeMode: 'contain',
            width: scale(26),
            height: scale(24)
        },
        winnersChampionImageText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.4)
        },
        numberOneWinnerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: scale(1),
            borderRadius: scale(6),
            paddingVertical: scale(15),
            paddingHorizontal: scale(18),
            marginTop: scale(21),
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.151797)' : 'rgba(0,0,0,0.151797)'
        },
        numberOneWinnerText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            opacity: scale(0.8),
            letterSpacing: scale(0.25),
        },
        winningTicktContainer: {
            borderWidth: scale(1),
            borderColor: '#979797',
            borderRadius: scale(3)
        },
        winningTicktNumber: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            opacity: scale(0.8),
            paddingHorizontal: scale(11),
            paddingVertical: scale(1),
            letterSpacing: scale(0.25)
        },
        ticketsSoldContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scale(24)
        },
        noOfTicketsContainer: {
            gap: scale(4)
        },
        noOfTicketsContainerText1: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            opacity: scale(0.9),
            letterSpacing: scale(0.25)
        },
        noOfTicketsContainerText2: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.4),
            letterSpacing: scale(0.375)
        },
        horizontalLine: {
            borderWidth: scale(0.2),
            backgroundColor: '#FFFFFF',
            opacity: scale(0.5),
            marginTop: scale(18),
            height: scale(1)
        },
        loadMoreContainer: {
            marginBottom: scale(24),
            gap: scale(15)
        },
        loadMoreText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            color: theme.theme === 'dark' ? '#FFBD0A' : theme.color,
            textAlign: 'center',
            lineHeight: scale(21.8),
        },
        activityIndicatorContainer: {
            height: responsiveHeight(30)
        },
        arrowMainContainer: {
            position: 'absolute',
            bottom: 20,
            right: 20
        },
        loader: {
            flexDirection: 'row',
            gap: scale(10),
            alignSelf: 'center',
            alignItems: 'center'
        },
        loadingText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
        },
        upArrowContainer: {
            paddingHorizontal: scale(10),
            paddingVertical: scale(8),
            backgroundColor: '#FFBD0A',
            borderRadius: scale(50)
        }
    })

    return (
        <View style={styles.mainContainer}>
            {!isEmptyObject(drawDetailsData) ? (
                <FlatList
                    data={sortTicketsData}
                    windowSize={25}
                    initialNumToRender={20}
                    renderItem={({ item }) => (
                        <DrawDetailsWinnersCard theme={theme} firstName={item?.first_name} lastName={item?.last_name[0]} ticketNo={item?.ticket_no} />
                    )}
                    keyExtractor={(item, index) => `${item?.ticket_no}_${index}`}
                    contentContainerStyle={styles.flatListContainer}
                    ref={flatListRef}
                    onScroll={handleScroll}
                    ListHeaderComponent={
                        <>
                            <Header title={`Draw Details: ${drawDetailsData?.winnerDetails[0]?.TicketNo}`} theme={theme} backArrowPress={backArrowPress} />
                            <View style={styles.container}>
                                <View style={styles.cardContainer}>
                                    <View style={styles.insideCardContent}>
                                        <Image style={styles.raffleImage} source={{ uri: `${Url.ImageUrl}${drawDetailsData?.raffleDetails[0]?.MainImageUrl}`, }} />
                                        <Text style={styles.raffleName}>{drawDetailsData?.winnerDetails[0]?.TicketNo} - {drawDetailsData?.raffleDetails[0]?.Title}</Text>
                                        <View style={styles.threeButtonsContainer}>
                                            {
                                                drawInfoList?.map((ele, i) => (
                                                    <DrawDetailInfo key={i} image={ele.image} data={ele.data} />
                                                ))
                                            }
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.cardContainer, styles.cardContainerPadding]}>
                                    <Text style={styles.randomOrgText1}>{common.DrawDetails.DrawProvidedAndVerified}</Text>
                                    <View style={styles.randomOrgImageContainer}><Image style={styles.randomOrgImage} source={drawDetailsRandomOrg} /></View>
                                    <Text style={styles.randomOrgText2} numberOfLines={7} adjustsFontSizeToFit >{common.DrawDetails.thisCertifiesThat} {timeFormatter(drawDetailsData?.drawDetails[0]?.DrawDateTime, "DrawDetails")} {common.DrawDetails.forThePrize} "{drawDetailsData?.winnerDetails[0]?.TicketNo} - {drawDetailsData?.raffleDetails[0]?.Title}", {common.DrawDetails.whichHasWill} "{drawDetailsData?.winnerDetails[0]?.Name}". {common.DrawDetails.TheTrueRandomDraw} </Text>
                                </View>
                                <View style={[styles.winnersChampionImageContainer]}>
                                    <FontAwesome5 name={'trophy'} color={theme.color} size={25} />
                                    <Text style={styles.winnersChampionImageText}>{common.DrawDetails.Winners}</Text>
                                </View>
                                <View style={styles.numberOneWinnerContainer}>
                                    <Text style={styles.numberOneWinnerText}>{common.DrawDetails.one}</Text>
                                    <Text style={styles.numberOneWinnerText}>{SplitName(drawDetailsData?.winnerDetails[0]?.Name)}</Text>
                                    <View style={styles.winningTicktContainer}>
                                        <Text style={styles.winningTicktNumber}>{drawDetailsData?.winnerDetails[0]?.TicketNo}</Text>
                                    </View>
                                </View>
                                <View style={styles.ticketsSoldContainer}>
                                    <View styles={styles.noOfTicketsContainer}>
                                        <Text style={styles.noOfTicketsContainerText1}>{common.common.Tickets}</Text>
                                        <Text style={styles.noOfTicketsContainerText2}>{sortTicketsTotalCount} / {drawDetailsData?.raffleDetails[0]?.total_entries}  {common.common.sold}</Text>
                                    </View>
                                </View>
                                <View style={styles.horizontalLine}>
                                </View>
                            </View>
                        </>
                    }
                    ListFooterComponent={
                        allItemsRendered === true ?
                            <>
                                <View style={styles.loadMoreContainer}>
                                    {
                                        dataLoading === false ?
                                            sortTicketsTotalCount > sortTicketsData?.length &&
                                            <Text style={styles.loadMoreText} onPress={() => fetchMoreData(pageNumber + 1)}>{common.common.loadMore}</Text>
                                            :
                                            <ActivityIndicatorLoader theme={theme} />
                                    }
                                </View>
                                {/* <Footer /> */}
                            </>
                            :
                            <View style={styles.activityIndicatorContainer}>
                                <ActivityIndicatorLoader theme={theme} />
                            </View>
                    }
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.1}
                />
            ) : (
                <Loader />
            )}
            {showScrollToTop && (
                <View style={styles.arrowMainContainer}>
                    <TouchableOpacity onPress={() => scrollToTop()} style={[styles.upArrowContainer]}>
                        <FontAwesome5 name={'arrow-up'} color='#000616' size={25} />
                    </TouchableOpacity>
                </View>
            )}
        </View>

    )
}

export default DrawDetails

