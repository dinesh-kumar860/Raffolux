import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

import { Url } from '../../helpers/routesApi'

const TicketsDetails = (props) => {
    const { theme, image, title, raffleId, raffleCode, totalData, cartItemDetails } = props;
    const filteredData = cartItemDetails.filter((ele, i) => ele.raffle_id === raffleId)

    const styles = StyleSheet.create({
        horizontalLine: {
            height: scale(1),
            backgroundColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)',
            marginVertical: scale(20)
        },
        container: {
            flexDirection: 'row',
            gap: scale(15)
        },
        image: {
            height: 116,
            width: 98,
            resizeMode: 'cover',
            borderRadius: scale(6)
        },
        textContainer: {
            flex: 1,
            gap: scale(10)
        },
        title: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            color:theme.color,
        },
        ticketContainer: {
            height: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: scale(1),
            borderColor: theme.theme ==='dark' ? '#FFBD0A' :'#000616',
            borderRadius: scale(50),
        },
        ticketNumber: {
            color: theme.theme ==='dark' ? '#FFBD0A' :'#000616',
            fontFamily: 'NunitoSans-Regular',
            marginHorizontal: scale(10),
            fontSize: responsiveFontSize(1.5)
        },
        noOfChancesContainer: {
            height: 28,
            backgroundColor: '#FFBD0A',
            alignSelf: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(3),
            marginLeft: 114,
            marginTop: scale(15)
        },
        chancesText: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            marginHorizontal: scale(15)
        },
    })

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: `${Url.ImageUrl}${image}` }} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: scale(5) }}>
                        {
                            cartItemDetails?.map((ele, i) => {
                                if (ele.raffle_id === raffleId) {
                                    return (
                                        <View style={styles.ticketContainer} key={i}>
                                            <Text style={styles.ticketNumber}>{ele.ticket_no}</Text>
                                        </View>
                                    )
                                }
                            })
                        }

                    </View>
                </View>
            </View>
            <View style={styles.noOfChancesContainer}>
                <Text style={styles.chancesText}>That’s {filteredData.length} chance{filteredData.length > 1 && `s`} to win!</Text>
            </View>
            <View style={styles.horizontalLine}></View>
        </View>
    )
}

export default TicketsDetails

