import React, { memo, useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { scale } from 'react-native-size-matters';
import { fetchAllRafflesWithLogin } from '../../api/homeApi';
import { isEmptyArray } from '../../utils/utils';
import { InstantNonInstant } from '../../helpers/common';
import LiveCompetitionNew from '../HomePageComponents/LiveCompetitionNew';
import NoDataLiveCard from '../HomePageComponents/NoDataLiveCard';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { AuthContext } from '../../Context/AuthContext';

const AddToCartModal = (props) => {
    const { theme, setTicketSelectorApiCall, setSuccessModalVisible, successModalVisible, viewBackgroundColor, title, entries, CategoryID_id, goToCart, setTicketSelectorCount, setButtonDisabled } = props;
    const [data, setData] = useState([]);
    const { userToken } = useContext(AuthContext)

    const FetchAllRaffles = async () => {
        let response = await fetchAllRafflesWithLogin();

        let sameCategory = response.filter((ele) => CategoryID_id === ele.CategoryID_id && ele);

        const _differentSameCategories = sameCategory.filter((ele) => ele.Title !== title && ele);

        const differentCategories = response.filter((ele) => CategoryID_id !== ele.CategoryID_id && ele);

        !isEmptyArray(_differentSameCategories) ? setData(_differentSameCategories.slice(0, 2)) : setData(differentCategories.slice(0, 2));

        !isEmptyArray(_differentSameCategories) && _differentSameCategories.length === 1 && setData([..._differentSameCategories.slice(0, 1), ...differentCategories.slice(0, 1)]);
    }

    useEffect(() => {
        FetchAllRaffles();
    }, [])

    const styles = StyleSheet.create({
        HeaderWithClose: {
            marginTop: scale(16),
            marginBottom: scale(7),
            flexDirection: 'row',
            alignSelf: 'flex-end',
        },
        closeIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            marginRight: scale(1),
        },
        successText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
        },
        successMessage: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'Nunito-Regular',
            fontSize: responsiveFontSize(1.7),
            textAlign: 'center'
        },
        BackToRaffle: {
            backgroundColor: '#FFBD0A',
            borderRadius: scale(6),
            minWidth: 140,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center'
        },
        BackToRaffleText: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.7),
        },
        ViewCart: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#f2f2f3' : '#0d1222',
            minWidth: 140,
            height: 40,
            borderRadius: scale(6),
            borderColor: viewBackgroundColor === '#FFFFFF' ? '#00061633' : '#3d414e',
            borderWidth: scale(1),
            alignItems: 'center',
            justifyContent: 'center'
        },
        ViewCartText: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(13, 18, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.7),
        },
        related: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(13, 18, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'Nunito-Regular',
            fontSize: responsiveFontSize(1.7),
            marginBottom:responsiveHeight(1)
        },
        LiveComponents: {
            marginTop: scale(12),
            marginHorizontal: scale(5),
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 5,
        },
    });

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.HeaderWithClose}>
                <TouchableOpacity onPress={userToken ? () => { setSuccessModalVisible(false); setTicketSelectorApiCall(false); setTicketSelectorCount(null); setButtonDisabled(false) } : () => setSuccessModalVisible(false)}>
                    <Ionicons name={'close'} size={30} style={styles.closeIcon} />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: scale(5) }}>
                <Text style={styles.successText}>{InstantNonInstant.Success}</Text>
            </View>
            <View style={{ paddingHorizontal: scale(30), marginBottom: scale(20) }}>
                <Text style={styles.successMessage}>{`${entries} ${entries !== 1 ? InstantNonInstant.entries : InstantNonInstant.entry} ${InstantNonInstant.forThe} ${title} ${entries === 1 ? InstantNonInstant.has : InstantNonInstant.have} ${InstantNonInstant.beenAddedToYourCart}`}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: scale(8), marginBottom: scale(23) }}>
                <TouchableOpacity style={styles.ViewCart} onPress={userToken ? () => { setSuccessModalVisible(false); setTicketSelectorApiCall(false); setTicketSelectorCount(null); setButtonDisabled(false) } : () => setSuccessModalVisible(false)}>
                    <Text style={styles.ViewCartText}>{InstantNonInstant.BackToRaffle}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.BackToRaffle} onPress={() => goToCart()}>
                    <Text style={styles.BackToRaffleText}>{InstantNonInstant.ViewCart}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.related}>{InstantNonInstant.WeThinkYouWouldLike}</Text>
            </View>
            {!isEmptyArray(data) ?
                <>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.LiveComponents}>
                            {!isEmptyArray(data) ? (
                                data?.map((ele, i) => <LiveCompetitionNew key={i} {...ele} setSuccessModalVisible={setSuccessModalVisible} raffleId={ele.Raffle_id}/>)
                            ) : (
                                <NoDataLiveCard />
                            )}
                        </View>
                    </ScrollView>
                </> :
                <View style={{ marginTop: scale(10) }}>
                    <ActivityIndicator color={theme.color} />
                </View>
            }
        </View>
    )
}

export default memo(AddToCartModal);