import { View, Text, Pressable, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect, memo, useMemo, useRef, useCallback } from 'react'
import { scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';

import { isEmptyArray } from '../../utils/utils';
import { InstantNonInstant } from '../../helpers/common';

import TicketNumber from './TicketNumber';

import { addToCartWithLogin } from '../../api/commonApi';
import { _fetchCartCountWithLogin, fetchTicketsData } from '../../ReduxToolKit/apiSlice';
import TicketsRange from './TicketsRange';

const RangeButtons = ({ totalEntries, _sortButtons, _setSortButtons, viewBackgroundColor, entryCost, tickets, _raffleId, setModalVisible, modalVisible, setTicketSelectorApiCall, setTicketSelectorCount }) => {
    const dispatch = useDispatch();
    const [ticketsArr, setTicketsArr] = useState([])
    const [selectedButton, setSelectedButton] = useState(!isEmptyArray(_sortButtons) && _sortButtons[0]);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [disableCartButton, setDisableCartButton] = useState(false)

    const scrollToRangeRef = useRef(null)

    const handleRangeSelect = useCallback((range) => {
        let end = range.end;
        let endArr = String(end).split('');
        const lastItem = endArr[endArr.length - 1];
        if (lastItem < 9) {
            endArr.pop();
            endArr.push(9);
        }
        setSelectedButton({ start: range.start, end: range.end });

        scrollToRangeRef.current.scrollTo({ y: 0, animated: false });
    }, []);


    const ticketStatusMap = useMemo(() => {
        const statusMap = new Map();
        tickets?.forEach((ticket) => {
            statusMap.set(ticket.ticketNumber, ticket.status);
        });
        return statusMap;
    }, [tickets]);

    useEffect(() => {
        setSelectedButton(!isEmptyArray(_sortButtons) && _sortButtons[0])
    }, []);

    useEffect(() => {
        setTicketsArr([])
        if (selectedButton) {
            const newNumbers = [];
            for (let i = selectedButton?.start; i <= selectedButton?.end; i++) {
                newNumbers.push(i);
            }
            setTicketsArr(newNumbers);
        }
    }, [selectedButton]);


    const handleTicketSelect = useCallback((ticket) => {
        setSelectedTickets((prevSelectedTickets) => {
            if (prevSelectedTickets.includes(ticket)) {
                Toast.showWithGravity(`${InstantNonInstant.TicketNumber} ${ticket} ${InstantNonInstant.removedFromCart}`, Toast.SHORT, Toast.CENTER);
                return prevSelectedTickets.filter((t) => t !== ticket);
            } else {
                return [...prevSelectedTickets, ticket];
            }
        });
    }, []);

    const handleRemoveticket = (ticket) => {
        setSelectedTickets(selectedTickets.filter(ele => ele !== ticket));
        Toast.showWithGravity(`${InstantNonInstant.TicketNumber} ${ticket} ${InstantNonInstant.removedFromCart}`, Toast.SHORT, Toast.CENTER);
    }

    const handleClearAll = () => {
        setSelectedTickets([]);
        Toast.showWithGravity(InstantNonInstant.NoItemInCart, Toast.SHORT, Toast.CENTER);
    };

    const _addToCartWithLogin = async () => {
        setDisableCartButton(true)
        const _data = { raffle_id: _raffleId, numberOftickets: selectedTickets.length, selectedInstantTickets: selectedTickets };
        const addToCart = await addToCartWithLogin(_data);
        dispatch(_fetchCartCountWithLogin());
        if (addToCart === 200) {
            setTicketSelectorApiCall(true);
            setDisableCartButton(false)
            setModalVisible(false);
            setTicketSelectorCount(selectedTickets?.length)
        }
        if (addToCart.status === 400) {
            Toast.show(addToCart.message.message, Toast.SHORT);
            setDisableCartButton(false)
        }
        if (addToCart.status === 500) {
            Toast.show(InstantNonInstant.NoMoreAvailableTickets, Toast.SHORT);
            setDisableCartButton(false)
        }
    }


    const styles = StyleSheet.create({
        sortButtonTextStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: scale(16),
            textAlign: 'center'
        },
        TicketSelectionContainer: {
            paddingTop: scale(15),
            borderTopLeftRadius: scale(12),
            borderTopRightRadius: scale(12),
            borderColor: 'rgba(151, 151, 151, 0.1517)',
            borderWidth: scale(1),
            height: !isEmptyArray(selectedTickets) ? scale(250) : scale(150),
            marginBottom: scale(150),
            backgroundColor: viewBackgroundColor,
        },
        selectedTicketsStyle: {
            paddingVertical: scale(0),
            marginHorizontal: scale(15),
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        Selections: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF'
        },
        numberCard: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#ffde84' : 'rgba(255, 189, 10, 0.5)',
            borderRadius: scale(6),
            paddingHorizontal: scale(6),
            paddingVertical: scale(3),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(4),
            marginRight: scale(10)
        },
        selectedNumber: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFBD0A',
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.8),
            marginBottom: scale(1)
        },
        crossMarkStyle: {
            height: scale(8),
            width: scale(8),
        },
        selectedTicketsContainer: {
            flexDirection: 'row',
            paddingTop: scale(12),
            paddingBottom: scale(40),
            paddingHorizontal: scale(16),
            gap: scale(5),
        },
        ClearAllContainer: {
            width: scale(60),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.6)' : 'rgba(151, 151, 151, 0.6)',
            borderWidth: scale(0.66),
            borderRadius: scale(15),
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(5),
            justifyContent: 'center',
        },
        clearAllText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#F2F2F2F2',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.2),
            marginBottom: scale(1)
        },

        filterButtonsContainer: {
            marginHorizontal: scale(17),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(28),
        },
        sortButtonStyle: {
            backgroundColor: "rgb(229,230,232)",
            height: scale(45),
            width: scale(60),
            borderRadius: scale(6),
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: scale(4)
        },
        sortButtonTextStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: scale(16),
            textAlign: 'center'
        },

        closeIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            marginRight: scale(1),
            position: 'absolute',
            bottom: scale(5),
        },
        rangeButtonsContainer: {
            gap: scale(15),
            marginLeft: scale(15)
        },
        horizontalLine: {
            height: scale(1),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'
        },
        ticketsListContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: scale(11),
            justifyContent: 'center',
            marginTop: scale(15),
            marginHorizontal: scale(15),
            marginBottom: isEmptyArray(selectedTickets) ? scale(308) : scale(410)
        },
        bottomCartContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        },
        AddtoCartContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' && !isEmptyArray(selectedTickets) ? '#FFBD0A' : viewBackgroundColor !== '#FFFFFF' && !isEmptyArray(selectedTickets) ? '#FFBD0A' : viewBackgroundColor === '#FFFFFF' && isEmptyArray(selectedTickets) ? '#ffe59d' : '#6a5214',
            marginHorizontal: scale(15),
            paddingHorizontal: scale(20),
            borderRadius: scale(6),
            height: 48,
            marginBottom: scale(7),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },

        addToCartText: {
            color: viewBackgroundColor === '#FFFFFF' && !isEmptyArray(selectedTickets) ? '#000616' : viewBackgroundColor !== '#FFFFFF' && !isEmptyArray(selectedTickets) ? '#000616' : viewBackgroundColor !== '#FFFFFF' && isEmptyArray(selectedTickets) ? '#000616' : '#9f9fa2',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.3),
            justifyContent: 'center',
            alignItems: 'center',
        },
        popup: {
            position: 'absolute',
            top: scale(50),
            backgroundColor: '#FFFFFF',
            paddingHorizontal: scale(20),
            justifyContent: 'center',
            alignItems: 'center',
            elevation: scale(6),
            width: '80%',
            paddingVertical: scale(30),
            borderRadius: scale(6)
        },
        popupText: {
            color: 'rgba(0, 6, 22, 0.8)',
            fontFamily: 'NunitoSans-Regular',
            fontSize: scale(14)
        },

    });

    return (
        <View >
            <View style={styles.rangeButtonsContainer}>
                <FlatList
                    data={_sortButtons}
                    keyExtractor={(item, index) => `${item?.start}_${index}`}
                    horizontal={true}
                    renderItem={({ item, index }) => {
                        return (
                            <TicketsRange start={item.start == selectedButton?.start} viewBackgroundColor={viewBackgroundColor} itemStart={item.start} itemEnd={item.end} item={item} handleOnpress={handleRangeSelect} />
                        )
                    }}
                />
                <View style={styles.horizontalLine}></View>
            </View>
            <ScrollView style={{ flexGrow: 1 }} nestedScrollEnabled={true} ref={scrollToRangeRef}>
                <View style={styles.ticketsListContainer}>
                    {
                        ticketsArr?.length > 0 ?
                            ticketsArr?.map((ele, i) => <TicketNumber ticket={ele} key={i} handleTicketSelect={handleTicketSelect} selected={selectedTickets.includes(ele)} status={ticketStatusMap.get(ele)} viewBackgroundColor={viewBackgroundColor} />)
                            :
                            <ActivityIndicator color={'#000616'} />
                    }
                </View>
            </ScrollView>
            <View style={styles.bottomCartContainer}>
                {!isEmptyArray(selectedTickets) ?
                    <View style={styles.TicketSelectionContainer}>
                        <View style={styles.selectedTicketsStyle}>
                            <Text style={styles.Selections}>{InstantNonInstant.Selections}</Text>
                            <Pressable style={styles.ClearAllContainer} onPress={() => handleClearAll()}>
                                <AntDesign name={'close'} size={10} color={viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF'} />
                                <Text style={styles.clearAllText}>{InstantNonInstant.ClearAll}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.selectedTicketsContainer}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} style={{ flexGrow: 1 }} >
                                {selectedTickets?.map((ele, i) => {
                                    return (
                                        <View key={i} style={styles.numberCard} >
                                            <Pressable onPress={() => handleRemoveticket(ele)} >
                                                <AntDesign name={'close'} size={12} color={viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFBD0A'} />
                                            </Pressable>
                                            <Text style={styles.selectedNumber}>{ele}</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                        <TouchableOpacity style={[styles.AddtoCartContainer, { justifyContent: disableCartButton ? 'center' : 'space-between' }]} onPress={() => _addToCartWithLogin()} disabled={disableCartButton}  >
                            {
                                disableCartButton ? <ActivityIndicator color={'#000616'} /> :
                                    <><Text style={styles.addToCartText}>{InstantNonInstant.AddToCart}</Text>
                                        <Text style={styles.addToCartText}>{`£${(selectedTickets?.length * entryCost).toFixed(2)}`}</Text></>
                            }
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.TicketSelectionContainer}>
                        <Pressable style={styles.AddtoCartContainer}>
                            <Text style={styles.addToCartText}>{InstantNonInstant.AddToCart}</Text>
                            <Text style={styles.addToCartText}>{`£0.00`}</Text>
                        </Pressable>
                    </View>
                }
                {/* {removed !== null &&
                <View style={styles.popup}>
                    <Text style={styles.popupText}>{`Ticket Number ${removed} removed from cart`}</Text>
                </View>
            } */}
            </View>
        </View>
    )
}

export default memo(RangeButtons);