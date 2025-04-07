import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { _fetchCartCountWithLogin, fetchTicketsData } from '../../ReduxToolKit/apiSlice';
import { deleteItemFromCartWithLogin } from '../../api/commonApi';

import ThemeContext from '../../utils/themes/themeWrapper';

import { Url } from '../../helpers/routesApi';
import { Home, InstantNonInstant, cart, common } from '../../helpers/common';

import CartEntries from './CartEntries';


const Cards = (props) => {
    const { MiniImageUrl, params, custom_raffle_id, setIsCustomRaffle, MainImageUrl, Title, entry_cost_gbp, pricePerEntryLength, cartItems, cartItem_id, cart_id, raffle_id, onRefresh, ticket_number, RaffleExpire, empty, setEmpty } = props;
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [showState, setShowState] = useState(false);
    const [apiDiableState, setApiDiableState] = useState(false);

    const handlePress = () => setShowState(!showState);

    const _deleteItemFromCartWithLogin = async (raffle_id, cart_id, cartItem_id) => {
        setApiDiableState(true);
        const data = { raffle_id: raffle_id, cart_id: cart_id, cartItem_id: cartItem_id }
        const response = await deleteItemFromCartWithLogin(data)
        if (response) {
            dispatch(_fetchCartCountWithLogin());
            dispatch(fetchTicketsData({ raffle_id: raffle_id }))
            onRefresh();
            setApiDiableState(false);
        }
    }

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme])


    const styles = StyleSheet.create({
        closeIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#898a93',
            bottom: scale(5),
        },
        infoContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FAFCFC' : '#141628',
            paddingBottom: scale(5),
            paddingRight: scale(16),
            paddingLeft: scale(10),
            paddingTop: scale(15),
            marginHorizontal: scale(12),
            marginTop: scale(10),
            marginBottom: scale(10),
            borderRadius: scale(8),
            ...Platform.select({
                ios: {
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                },
                android: {
                    elevation: 5,
                },
            }),
            elevation: scale(4),
        },
        CartImage: {
            height: scale(72),
            width: scale(60.84),
            marginBottom: scale(5)
        },
        textContainer: {
            flex: 1,
            marginLeft: scale(8),
            gap: scale(10)
        },
        CartTitle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: scale(14),
        },
        CartSubTitle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFBD0A',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: scale(14)
        },
        _CartSubTitle: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(28, 28, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: scale(14),
            textAlign: 'right'
        },
        subTextContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        horizontalLine: {
            height: scale(1),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(28, 28, 39, 0.4000000059604645)' : 'rgba(255, 255, 255, 0.4)',
            marginLeft: scale(8),
            marginVertical: scale(10)
        },
        pressableStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: scale(16)
        },
        pressableText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#494952' : 'rgba(255, 255, 255, 0.8)',
            fontSize: scale(12)
        },
        noImageTitle: {
            fontSize: responsiveFontSize(1.8),
            textAlign: 'center',
            fontFamily: 'Gilroy-ExtraBold',
            color: '#000616',
            marginTop: scale(8),
            lineHeight: scale(15),
            marginHorizontal: scale(10),
            height: scale(30)
        },
    });

    return (
        <View style={styles.infoContainer} >
            <View style={{ flexDirection: 'row' }}>
                <Pressable style={{ paddingRight: scale(8) }} onPress={() => apiDiableState === false && _deleteItemFromCartWithLogin(raffle_id.raffle_id, cart_id.cart, cartItem_id.cartitem)}>
                    <Ionicons name={'close'} size={20} style={styles.closeIcon} />
                </Pressable>
                <View>
                    {MiniImageUrl.length > 10 ? <Image style={styles.CartImage} source={{ uri: `${Url.ImageUrl}${MiniImageUrl}` }} /> :
                        <LinearGradient colors={common.noImagegradientColors} style={[styles.CartImage, { justifyContent: 'center' }]}>
                            <Text style={styles.noImageTitle} numberOfLines={2}>{Home.NoImageToShow}</Text>
                        </LinearGradient>}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.CartTitle}>{Title}</Text>
                    <Text style={styles.CartSubTitle}>{`£${entry_cost_gbp} ${cart.perEntry}`}</Text>
                    <View style={styles.subTextContainer}>
                        <View>
                            <Text style={styles._CartSubTitle}>{`${pricePerEntryLength} ${pricePerEntryLength !== 1 ? InstantNonInstant.entries : InstantNonInstant.entry}`}</Text>
                        </View>
                        <View>
                            <Text style={styles.CartSubTitle}>{`£${(pricePerEntryLength * entry_cost_gbp).toFixed(2)}`}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.horizontalLine}></View>
            {!showState &&
                <Pressable style={styles.pressableStyle} onPress={() => handlePress()}>
                    <Text style={styles.pressableText}>{cart.showEntries}</Text>
                </Pressable>}
            {showState &&
                <View style={{ marginHorizontal: scale(8), paddingBottom: scale(30) }}>
                    <Pressable style={styles.pressableStyle} onPress={() => handlePress()}>
                        <Text style={styles.pressableText}>{cart.hideEntries}</Text>
                    </Pressable>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {cartItems.map((ele, i) => <CartEntries key={i} {...ele} onRefresh={onRefresh} />)}
                    </View>
                </View>
            }
        </View>
    )
}

export default Cards