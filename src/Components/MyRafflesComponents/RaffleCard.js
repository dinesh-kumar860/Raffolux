import { Image, Pressable, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { memo, useState } from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native';

import { Url } from '../../helpers/routesApi';
import * as common from '../../helpers/common'

import { timeFormatter } from '../../utils/TimeFormatter';
import { isEmptyObject } from '../../utils/utils';

import { fetchMyRafflesTicketsWithLogin } from '../../api/myRafflesApi';

import Tickets from './Tickets';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import myRafflesEndedWinningTicketImageLight from '../../assets/Images/myRafflesEndedWinningTicketImageLight.png'
import myRafflesEndedWinningTicketImageDark from '../../assets/Images/myRafflesEndedWinningTicketImageDark.png'
import ActivityIndicatorLoader from '../../helpers/ActivityIndicatorLoader';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';


const RaffleCard = (props) => {
    const { theme, image, title, time, ticketCount, id, raffleCode, type, winnersTicketNumber } = props;

    const navigation = useNavigation()
    const [ticketsData, setTicketsData] = useState([]);
    const [ticketsToggle, setTicketsToggle] = useState(false);
    const [ticketLoading, setTicketLoading] = useState(false);

    const showAndHideTickets = async () => {
        setTicketsToggle(!ticketsToggle)
        setTicketLoading(true)
        let response = await fetchMyRafflesTicketsWithLogin({ raffle_id: id })
        if (response) {
            setTicketLoading(false)
            !isEmptyObject(response) && setTicketsData(response.tickets)
        }
        else {
            setTicketLoading(false)
        }
    };


    const styles = StyleSheet.create({
        activeRafflesMainContainer: {
            gap: scale(15),
        },
        activeRafflesContainer: {
            flexDirection: 'row',
            marginTop: scale(23),
            gap: scale(10)
        },
        activeCardImage: {
            resizeMode: 'cover',
            height: scale(74),
            width: scale(74),
            borderRadius: scale(6)
        },
        textContainer: {
            gap: scale(2),
            flex: 1
        },
        raffleText1: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2.1),
            lineHeight: scale(22),
            color: theme.color
        },
        raffleText2: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            lineHeight: scale(16),
            color: theme.color,
            opacity: scale(0.6)
        },
        raffleText3: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            lineHeight: scale(16),
            marginTop: scale(6),
            color: type === `${common.myRaffles.active}` || type === `${common.myRaffles.pending}` ? theme.theme === 'light' ? '#00651C' : '#FFBD0A' : theme.color
        },
        horizontalLine: {
            height: scale(1),
            borderWidth: scale(0.5),
            opacity: scale(0.1),
            borderColor: theme.color
        },
        showAndHideContainer: {
            width: responsiveWidth(16),
            height: responsiveHeight(2),
            borderWidth: scale(0.5),
            borderRadius: 3,
            borderColor: type === `${common.myRaffles.active}` || type === `${common.myRaffles.pending}` ? theme.theme === 'light' ? '#00651C' : '#FFBD0A' : theme.color,
            flexDirection: 'row',
            gap: scale(2),
            alignItems: 'center',
            justifyContent: 'center',
        },
        eyeIcon: {
            color: type === `${common.myRaffles.active}` || type === `${common.myRaffles.pending}` ? theme.theme === 'light' ? '#00651C' : '#FFBD0A' : theme.color
        },
        showText: {
            color: type === `${common.myRaffles.active}` || type === `${common.myRaffles.pending}` ? theme.theme === 'light' ? '#00651C' : '#FFBD0A' : theme.color,
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            bottom: scale(2)
        },
        ticketContainer: {
            marginTop: scale(11),
            flexDirection: 'row',
            gap: scale(8),
            flexWrap: 'wrap'
        },
        chevronRightIcon: {
            alignSelf: "center"
        },
        endedWinningTicketContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scale(20)
        },
        winningTicketMainContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(13)
        },
        winnerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            color: theme.theme === 'light' ? '#000616' : '#FFBD0A'
        },
        winningTicketImage: {
            height: 14,
            width: 38,
            alignItems: 'center',
            justifyContent: 'center',
        },
        winnerTicketNumberText: {
            color: theme.background,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.2),
        },
        viewRaffleContainer: {
            height: responsiveHeight(2),
            width: responsiveWidth(23),
            flexDirection: 'row',
            gap: 6.6,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 0.5,
            borderColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            borderRadius: 3,
            paddingHorizontal: 10,
        },
        viewRaffleText: {
            color: theme.theme === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
            top: -2
        },
        loader: {
            flexDirection: 'row',
            gap: scale(10),
            alignSelf: 'center',
            alignItems: 'center'
        },
        loadingText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.5),
        },
        activeRafflesShowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: responsiveHeight(1.5)
        }
    })

    return (
        <View style={styles.activeRafflesMainContainer}>
            <View style={styles.activeRafflesContainer}>
                <View style={styles.activeRafflesImage}>
                    <FastImage style={styles.activeCardImage} source={{ uri: `${Url.ImageUrl}${image}` }} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.raffleText1} numberOfLines={1}>{title}</Text>
                    <Text style={styles.raffleText2}>
                        {
                            type === `${common.myRaffles.active}` || type === `${common.myRaffles.pending}` ? `${common.myRaffles.ending} ${timeFormatter(time, 'MyRaffles')}` : `${common.myRaffles.thisRaffleWasDrawn} ${timeFormatter(time, 'MyRafflesEndedSection')}`
                        }
                    </Text>
                    {
                        ticketCount?.map((ele, j) => id === ele.id && <Text key={ele.id} style={[styles.raffleText3]}>{common.myRaffles.You} {type === `${common.myRaffles.active}` && `${common.myRaffles.own}` || type === `${common.myRaffles.ended}` && `${common.myRaffles.owned}` || type === `${common.myRaffles.pending}` && `${common.myRaffles.ownPending}`} {ele.count} {common.InstantNonInstant.ticket}{ele.count > 1 && 's'} {common.myRaffles.inThisRaffle}</Text>)
                    }
                    <View style={styles.activeRafflesShowContainer}>
                        <TouchableOpacity style={styles.showAndHideContainer} onPress={() => showAndHideTickets(id)}>
                            <Ionicons name={ticketsToggle ? 'eye-off-outline' : 'eye-outline'} style={styles.eyeIcon} size={12} />
                            <Text style={styles.showText}>
                                {ticketsToggle ? `${common.myRaffles.hide}` : `${common.myRaffles.show}`}
                            </Text>
                        </TouchableOpacity>
                        {
                            type === `${common.myRaffles.active}` || type === `${common.myRaffles.pending}` ?
                                <TouchableOpacity style={styles.viewRaffleContainer} onPress={() => navigation.navigate('InstantContainer', { RaffleId: raffleCode, raffle_id: id })}>
                                    <Text style={styles.viewRaffleText}>{common.myRaffles.viewRaffle}</Text>
                                    <Feather name={'chevron-right'} size={11} color={theme.theme === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'} />
                                </TouchableOpacity>
                                : null
                        }

                    </View>

                    {
                        ticketsToggle && <View style={styles.ticketContainer}>
                            {
                                ticketLoading === false ?
                                    ticketsData?.map((ele, i) => (
                                        <Tickets key={i} ticketNo={ele.ticket_no_alias} />
                                    ))
                                    :
                                    <ActivityIndicatorLoader theme={theme} />
                            }
                        </View>
                    }
                    {
                        type === `${common.myRaffles.ended}` &&
                        <View style={styles.endedWinningTicketContainer}>
                            <View style={styles.winningTicketMainContainer}>
                                <Text style={styles.winnerText}>{common.myRaffles.WINNER}</Text>
                                <ImageBackground style={styles.winningTicketImage} source={theme.theme === 'light' ? myRafflesEndedWinningTicketImageLight : myRafflesEndedWinningTicketImageDark} >
                                    <Text style={styles.winnerTicketNumberText} >{winnersTicketNumber}</Text>
                                </ImageBackground>
                            </View>
                            <TouchableOpacity style={styles.viewRaffleContainer} onPress={() => navigation.navigate('InstantContainer', { RaffleId: String(raffleCode) })}>
                                <Text style={styles.viewRaffleText}>{common.myRaffles.viewRaffle}</Text>
                                <Feather name={'chevron-right'} size={11} color={theme.theme === 'light' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                {/* {
                    type === `${common.myRaffles.active}` || type === `${common.myRaffles.pending}` ? <Feather name={'chevron-right'} size={25} color={theme.color} style={styles.chevronRightIcon} onPress={() => navigation.navigate('InstantContainer', { RaffleId: raffleCode, raffle_id: id })} /> : null
                } */}
            </View>
            <View style={styles.horizontalLine}>
            </View>
        </View>
    )
}

export default memo(RaffleCard)

