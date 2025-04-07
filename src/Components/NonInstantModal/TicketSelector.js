import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View, Pressable, ActivityIndicator } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { Image } from 'react-native-animatable'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import NonInstantModalTickets from './NonInstantModalTickets'

const TicketSelector = (props) => {
    const { viewBackgroundColor, ticketsState, setTicketSelectorApiCall, _raffleId, entryCost, setNonInstantViewCartPopup, totalEntries, goToCart, setTicketSelectorCount } = props;

    const [modalVisible, setModalVisible] = useState(false);


    const styles = StyleSheet.create({
        TicketSelectorButton: {
            borderRadius: scale(6),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.196)' : 'rgba(255, 255, 255, 0.2)',
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.05)' : 'rgba(255, 255, 255, 0.05)',
            borderWidth: scale(1.24),
            height: scale(37),
            flexDirection: 'row',
            marginHorizontal: scale(15),
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(10)
        },
        ticketsText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
        },
        TicketModal: {
            backgroundColor: 'rgb(64,64,64)'
        },
        modalView: {
            marginTop: scale(35),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(20),
            height: '100%',
        },
    })
    return (
        <>
            <Pressable style={styles.TicketSelectorButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.ticketsText}>Ticket Selector</Text>
                <Image style={{ height: scale(16), width: scale(17) }} source={viewBackgroundColor === '#FFFFFF' ? require('../../assets/Images/TicketSelectorBlack.png') : require('../../assets/Images/TicketSelectorWhite.png')} />
            </Pressable>

            <Modal animationType="slide" transparent={!true} visible={modalVisible} onRequestClose={() => { setModalVisible(false) }} >
                <TouchableWithoutFeedback >
                    <View style={styles.TicketModal}>
                        <View style={styles.modalView}>
                            <NonInstantModalTickets totalEntries={totalEntries} setModalVisible={setModalVisible} modalVisible={modalVisible} viewBackgroundColor={viewBackgroundColor} entryCost={entryCost} _raffleId={_raffleId} setTicketSelectorApiCall={setTicketSelectorApiCall} setTicketSelectorCount={setTicketSelectorCount} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}

export default memo(TicketSelector)

