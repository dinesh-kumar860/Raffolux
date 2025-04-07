import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters';

import { deleteTicketFromCartWithLogin } from '../../api/commonApi';

import Octicons from 'react-native-vector-icons/Octicons';
import CrossMarkBlack from '../../assets/Images/CrossMarkBlack.png';
import { useDispatch } from 'react-redux';
import { fetchTicketsData } from '../../ReduxToolKit/apiSlice';

const CartEntries = (props) => {
    const { cart, cartitem, raffle_id, ticket_no, price, onRefresh } = props;
    const dispatch = useDispatch()
    const [apiDiableState, setApiDiableState] = useState(false);

    const _deleteTicketFromCartWithLogin = async (raffle_id, cart_id, cartItem_id, ticketNumber) => {
        setApiDiableState(true);
        const data = { raffle_id: raffle_id, cart_id: cart_id, cartItem_id: cartItem_id, ticketNumber: ticketNumber }
        const response = await deleteTicketFromCartWithLogin(data);
        
        response && onRefresh();
        response &&   dispatch(fetchTicketsData({raffle_id: raffle_id}))
        setTimeout(()=>{
            setApiDiableState(false);
        }, 2000)
    }

    const styles = StyleSheet.create({
        crossMarkStyle: {
            height: scale(8),
            width: scale(8),
            // marginLeft: scale(5),
            // marginRight: scale(4),
            // marginHorizontal: scale(20)
        },
        numberCard: {
            backgroundColor: '#FFBD0A',
            borderRadius: scale(15),
            paddingRight: scale(4),
            paddingLeft: scale(10),
            height: scale(19),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(5),
            marginRight: scale(5),
            marginBottom: scale(5),
        },
        giftCard: {
            backgroundColor: '#FFBD0A',
            borderRadius: scale(15),
            paddingHorizontal: scale(5.3),
            height: scale(19),
            // width: scale(50),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(5),
            marginRight: scale(5),
            marginBottom: scale(5),
        },
        selectedNumber: {
            color: '#000616',
            fontFamily: 'NunitoSans-Bold',
            fontSize: scale(13),
            marginRight: scale(10),
        },
        _selectedNumber: {
            color: '#000616',
            fontFamily: 'NunitoSans-Bold',
            fontSize: scale(13),
            paddingHorizontal: scale(12),
            justifyContent: 'center',
            alignItems: 'center'
        },
    })

    return (
        <View >
            {ticket_no ?
                <Pressable style={styles.numberCard} onPress={() => apiDiableState === false && _deleteTicketFromCartWithLogin(raffle_id, cart, cartitem, ticket_no)}>
                    <Image source={CrossMarkBlack} style={styles.crossMarkStyle} />
                    <Text style={styles.selectedNumber}>{ticket_no}</Text>
                </Pressable> :
                <Pressable style={styles.giftCard}>
                    <Text style={styles._selectedNumber}><Octicons name={'gift'} size={16} /></Text>
                </Pressable>
            }
        </View>
    )
}

export default CartEntries