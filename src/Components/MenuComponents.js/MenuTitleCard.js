import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

import * as Common from '../../helpers/common'

const MenuTitleCard = (props) => {
    const { theme, image, title, onPress, endText, page, activeRafflesCount } = props;

    const styles = StyleSheet.create({
        singleComponentsContainer: {
            backgroundColor: theme.theme === 'dark' ? '#141628' : 'rgba(0,0,0,0.05)',
            padding: scale(14),
            borderRadius: scale(4),
            flexDirection: 'row',
            alignItems: 'center'
        },
        componentsNameText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            opacity: scale(0.904),
            color: theme.color
        },
        myRafflesContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        myRafflesContainer1: {
            flexDirection: 'row',
            gap: scale(15),
            alignItems: 'center'
        },
        raffleCountTextContainer: {
            position: 'absolute',
            backgroundColor: '#FFD70D',
            borderRadius: scale(50),
            alignItems: 'center',
            justifyContent: 'center',
            left: scale(2),
            top: activeRafflesCount > 10 ? scale(-7) : scale(-5)
        },
        raffleCountText: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.3),
            color: '#1C1C27',
            paddingHorizontal: scale(5),
            paddingVertical: activeRafflesCount > 10 ? scale(4) : scale(1),
        },
        youHavePointsContainer: {
            flexDirection: 'row'
        }
    })

    return (
        <Pressable style={styles.singleComponentsContainer} onPress={() => onPress(page)}>
            <View style={styles.myRafflesContainer}>
                <View style={styles.myRafflesContainer1} >
                    {image}
                    {
                        page === 'MyRaffles' ?
                            <View style={styles.youHavePointsContainer}>
                                <Text style={styles.componentsNameText}>{Common.DrawerContent.MyTickets}</Text>
                                <View style={styles.raffleCount}>
                                    <View style={styles.raffleCountTextContainer}>
                                        <Text style={styles.raffleCountText} >{activeRafflesCount}</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            <Text style={styles.componentsNameText}>{title}</Text>
                    }
                </View>
            </View>
            {endText}
        </Pressable>

    )
}

export default MenuTitleCard

