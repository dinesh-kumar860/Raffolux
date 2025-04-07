import {  StyleSheet, Text, View } from 'react-native'
import React, { memo, useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { Pressable } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import RangeButtons from './RangeButtons';
import { fetchTicketsSelectorWithLogin } from '../../api/instantNonInstantApi';

import { InstantNonInstant } from '../../helpers/common';
import ActivityIndicatorLoader from '../../helpers/ActivityIndicatorLoader';

import ThemeContext from '../../utils/themes/themeWrapper';
import { UnZip } from '../../utils/UnzipFolder';
import { isEmptyArray } from '../../utils/utils';

const NonInstantModalTickets = (props) => {
    const theme = useContext(ThemeContext)
    const { totalEntries, setModalVisible, modalVisible, viewBackgroundColor, entryCost, _raffleId, setTicketSelectorApiCall, setTicketSelectorCount } = props

    const [_sortButtons, _setSortButtons] = useState([]);
    const [tickets, setTickets] = useState([])

    const getTickets = async () => {
        const result = await fetchTicketsSelectorWithLogin({ raffle_id: _raffleId });
        if (result) {
            UnZip(result.data, (error, jsonData) => {
                if (error) {
                    console.error('Error:', error);
                } else {
                    setTickets(jsonData)
                }
            });
        }
    }

    useEffect(() => {
        getTickets()
        let arr = [];
        let startRange = 1;
        let stepSize = 299
        let endRange = stepSize;

        while (startRange <= totalEntries) {
            if (endRange > totalEntries) {
                endRange = totalEntries;
            }
            arr.push({
                start: startRange,
                end: endRange
            });
            startRange = endRange + 1;
            endRange += stepSize + 1;
        }

        _setSortButtons(arr);
        // setSelectedButton(arr[0]);
    }, []);


    const styles = StyleSheet.create({
        HeaderWithClose: {
            marginTop: scale(28),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: scale(19)
        },
        modalHeaderText: {
            fontSize: responsiveFontSize(2.2),
            fontFamily: 'Gilroy-ExtraBold',
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'
        },
        filterButtonsContainer: {
            marginTop: scale(17),
        },
        activityLoaderContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }
    })


    return (
        <>
            <View style={styles.HeaderWithClose}>
                <View></View>
                <Text style={styles.modalHeaderText}>{InstantNonInstant.SelectYourTickets}</Text>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Ionicons name={'close'} size={25}  color={viewBackgroundColor === '#FFFFFF' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'} />
                </Pressable>
            </View>
            {
                isEmptyArray(tickets) ? <View style={styles.activityLoaderContainer}><ActivityIndicatorLoader theme={theme} /></View> :
                    <View style={styles.filterButtonsContainer}>
                        <RangeButtons totalEntries={totalEntries} _sortButtons={_sortButtons} viewBackgroundColor={viewBackgroundColor} entryCost={entryCost} tickets={tickets} _raffleId={_raffleId} setModalVisible={setModalVisible} modalVisible={modalVisible} setTicketSelectorApiCall={setTicketSelectorApiCall} setTicketSelectorCount={setTicketSelectorCount} />
                    </View>
            }

        </>
    )
}

export default memo(NonInstantModalTickets)

