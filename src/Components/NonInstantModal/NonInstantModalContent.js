import { View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, FlatList } from 'react-native'
import React, { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { useDispatch } from 'react-redux'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import TicketsList from './TicketsList'
import { isEmptyArray } from '../../utils/utils'

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AddToCartModal from '../InstantContainer/AddToCartModal';
import RangeButtons from './RangeButtons';

import { addToCartWithLogin } from '../../api/commonApi'
import { cartCountApiCallActive } from '../../ReduxToolKit/cartSlice'
import { _fetchCartCountWithLogin } from '../../ReduxToolKit/apiSlice'

import Ionicons from 'react-native-vector-icons/Ionicons';
import crossMark from '../../assets/Images/crossMark.png';
import CrossMarkWhite from '../../assets/Images/CrossMarkWhite.png';
import CrossMarkBlack from '../../assets/Images/CrossMarkBlack.png';
import { Path, Svg } from 'react-native-svg';

const NonInstantModalContent = (props) => {
    const { ticketsState, _fetchTicketsSelectorWithLogin, setModalVisible, modalVisible, viewBackgroundColor, tickets, totalEntries, entryCost, _raffleId, setTicketSelectorApiCall, setNonInstantViewCartPopup, setSuccessModalVisible, successModalVisible, title, entries, CategoryID_id, goToCart } = props;
    const dispatch = useDispatch();
    const [ticketSelect, setTicketSelect] = useState(false);
    let [selections, setSelections] = useState([]);
    const [removed, setRemoved] = useState(null);
    const [clear, setClear] = useState(false);
    const [selectedButton, setSelectedButton] = useState({});
    let [_sortButtons, _setSortButtons] = useState([]);
    let [_entryCost, _setEntryCost] = useState(entryCost);
    let [_tickets, _setTickets] = useState(tickets);
    const [isStatus400, setStatus400] = useState(null);

    const handleTicketButtonClick = () => setTicketSelect(!ticketSelect);
    const handleClear = () => setClear(true);

    const handleRemoveTicket = (removeNum) => {
        setSelections(selections.filter(ele => ele !== removeNum));
        setRemoved(removeNum);
    };

    const _addToCartWithLogin = async () => {
        const _data = { raffle_id: _raffleId, numberOftickets: selections.length, selectedInstantTickets: selections };
        const addToCart = await addToCartWithLogin(_data);
        dispatch(_fetchCartCountWithLogin());
        if (addToCart === 200) {
            // setNonInstantViewCartPopup(true);
            _fetchTicketsSelectorWithLogin(ticketsState);
            setTicketSelectorApiCall(true);
            setModalVisible(false);
            // setTimeout(() => {
            // setNonInstantViewCartPopup(false);
            // setSuccessModalVisible(true);
            // }, 2000);
        }
        addToCart.status === 400 && setStatus400(addToCart.message.message);
        addToCart.status === 500 && setStatus400('No more available tickets!');
        setTimeout(() => {
            setStatus400(null);
        }, 2000)
    }

    useEffect(() => {
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
        setSelectedButton(arr[0]);
    }, [])

    useMemo(() => {
        if (removed) {
            setSelections(selections.filter(ele => ele !== removed));
            setTimeout(() => {
                setRemoved(null);
            }, 2000)
        }
    }, [removed])


    useMemo(() => {
        if (clear) {
            setSelections([]);
            _setEntryCost(entryCost);
            setTimeout(() => {
                setClear(false);
            }, 2000);
        }
    }, [clear]);

    const memoizedTickets = useMemo(() => {
        return [...tickets.slice(selectedButton.start === 1 ? 0 : selectedButton.start, selectedButton.end)];
    }, [tickets, selectedButton]);

    const memoizedEntryCost = useMemo(() => {
        return selections.length * entryCost;
    }, [selections, entryCost]);

    useEffect(() => {
        _setTickets(memoizedTickets);
        _setEntryCost(memoizedEntryCost);
    }, [memoizedTickets, memoizedEntryCost]);

    const styles = StyleSheet.create({
        ModalFirstContainer: {

        },
        HeaderWithClose: {
            marginTop: scale(28),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalHeaderText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.6),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            left: scale(25),
            marginBottom: scale(40)
        },
        ticketsButtonContainer: {
            paddingHorizontal: scale(17),
            paddingVertical: scale(20),
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            // marginBottom: scale(210),
            gap: scale(10)
        },

        numberText: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.6)' : 'rgba(255, 255, 255, 0.9)',
            fontSize: scale(15),
            fontFamily: 'Gilroy-ExtraBold',
        },

        AddtoCartContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' && !isEmptyArray(selections) ? '#FFBD0A' : viewBackgroundColor !== '#FFFFFF' && !isEmptyArray(selections) ? '#FFBD0A' : viewBackgroundColor === '#FFFFFF' && isEmptyArray(selections) ? '#ffe59d' : '#6a5214',
            marginHorizontal: scale(15),
            paddingHorizontal: scale(20),
            paddingVertical: scale(14),
            borderRadius: scale(6),
            // height: scale(48),
            marginBottom: scale(7),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },

        addToCartText: {
            color: viewBackgroundColor === '#FFFFFF' && !isEmptyArray(selections) ? '#000616' : viewBackgroundColor !== '#FFFFFF' && !isEmptyArray(selections) ? '#000616' : viewBackgroundColor !== '#FFFFFF' && isEmptyArray(selections) ? '#000616' : '#9f9fa2',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.3),
            justifyContent: 'center',
            alignItems: 'center',
        },

        Selections: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#F2F2F2F2',
            fontFamily: 'Gilroy-ExtraBold',
            // fontSize: responsiveFontSize(2.3),
            fontSize: scale(18),
            justifyContent: 'center',
            alignItems: 'center',
        },

        TicketSelectionContainer: {
            paddingTop: scale(15),
            marginHorizontal: scale(11),
            borderTopLeftRadius: scale(12),
            borderTopRightRadius: scale(12),
            borderColor: 'rgba(151, 151, 151, 0.1517)',
            borderWidth: scale(1),
            height: !isEmptyArray(selections) ? scale(250) : scale(150),
        },

        selectedTicketsStyle: {
            paddingVertical: scale(0),
            marginHorizontal: scale(15),
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        numberCard: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#ffde84' : 'rgba(255, 189, 10, 0.5)',
            borderRadius: scale(6),
            paddingHorizontal: scale(8),
            paddingVertical: scale(5),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(5),
            marginRight: scale(10)
        },

        selectedNumber: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFBD0A',
            fontFamily: 'NunitoSans-ExtraBold',
            fontSize: scale(13),
        },

        crossMarkStyle: {
            height: scale(8),
            width: scale(8),
        },

        selectedTicketsContainer: {
            flexDirection: 'row',
            marginTop: scale(12),
            marginBottom: scale(40),
            marginHorizontal: scale(16),
            gap: scale(5)
        },

        ClearAllContainer: {
            // paddingVertical: scale(1),
            width: scale(70),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.6)' : 'rgba(151, 151, 151, 0.6)',
            borderWidth: scale(0.66),
            borderRadius: scale(15),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },

        clearAllText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#F2F2F2F2',
            fontFamily: 'NunitoSans-Regular',
            fontSize: scale(12),
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

        SuccessTicketModal: {
            backgroundColor: 'transparent'
        },
        SuccessModalView: {
            marginTop: scale(35),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(10),
            // padding: scale(35),
            alignItems: 'center',
            // shadowColor: '#000',
            // shadowOffset: { width: scale(0), height: scale(2) },
            // shadowOpacity: scale(0.25),
            // shadowRadius: scale(4),
            // elevation: scale(5),
            // height: scale(358),
            paddingBottom: 23.69,
            borderColor: viewBackgroundColor === '#FFFFFF' ? '#00061633' : '#3d414e',
            borderWidth: scale(1),
        },
        flatListContent: {
            paddingVertical: scale(16),
            marginHorizontal: scale(16)
        },
    })

    return (
        <>
            <View style={styles.ModalFirstContainer}>
                <View style={styles.HeaderWithClose}>
                    <View style={{ width: scale(330), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.modalHeaderText}>Select your tickets</Text>
                    </View>
                    <View style={{ paddingRight: scale(55) }}>
                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <Ionicons name={'close'} size={35} style={styles.closeIcon} />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.filterButtonsContainer}>
                    {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', gap: scale(12) }}>
                            <RangeButtons selectedButton={selectedButton} setSelectedButton={setSelectedButton} totalEntries={totalEntries} _setSortButtons={_setSortButtons} _sortButtons={_sortButtons} viewBackgroundColor={viewBackgroundColor} />
                        </View>
                    </ScrollView> */}
                    <FlatList
                        data={_sortButtons}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{alignItems: 'center', paddingHorizontal: scale(4)}}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', gap: scale(12) }}>
                                <RangeButtons
                                    selectedButton={selectedButton}
                                    setSelectedButton={setSelectedButton}
                                    totalEntries={totalEntries}
                                    _setSortButtons={_setSortButtons}
                                    _sortButtons={_sortButtons}
                                    viewBackgroundColor={viewBackgroundColor}
                                    {...item}
                                />
                            </View>
                        )}
                    />
                </View>

                <View style={{ borderBottomColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.2)' : 'rgba(255, 255, 255, 0.2)', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: scale(20) }} />

                {/* <ScrollView>
                    <View style={styles.ticketsButtonContainer} pointerEvents='auto'>
                        {_tickets?.map((ele, i) => {
                            return (
                                <TicketsList key={i} handleRemoveTicket={handleRemoveTicket} _entryCost={_entryCost} _setEntryCost={_setEntryCost} ticketSelect={ticketSelect} setTicketSelect={setTicketSelect} viewBackgroundColor={viewBackgroundColor} handleTicketButtonClick={handleTicketButtonClick} {...ele} selections={selections} setSelections={setSelections} />
                            )
                        })}
                    </View>
                </ScrollView> */}

                <FlatList
                    data={_tickets}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={6}
                    contentContainerStyle={styles.flatListContent}
                    renderItem={({ item, index }) => (
                        <View style={{ marginHorizontal: scale(4) }}>
                            <TicketsList
                                key={index}
                                handleRemoveTicket={handleRemoveTicket}
                                _entryCost={_entryCost}
                                _setEntryCost={_setEntryCost}
                                ticketSelect={ticketSelect}
                                setTicketSelect={setTicketSelect}
                                viewBackgroundColor={viewBackgroundColor}
                                handleTicketButtonClick={handleTicketButtonClick}
                                {...item}
                                selections={selections}
                                setSelections={setSelections}
                            />
                        </View>
                    )}
                />
                {!isEmptyArray(selections) ?
                    <View style={styles.TicketSelectionContainer}>
                        <View style={styles.selectedTicketsStyle}>
                            <Text style={styles.Selections}>Selections</Text>
                            <Pressable style={styles.ClearAllContainer} onPress={() => handleClear()}>
                                <View>
                                    <Svg width="8" height="8" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M5.85248 5.23386C6.02816 5.40908 6.02816 5.69335 5.85248 5.86858C5.67679 6.04382 5.39174 6.0438 5.21604 5.86858L3.00031 3.64239L0.768825 5.86784C0.593138 6.04305 0.30809 6.04305 0.132384 5.86784C-0.0433217 5.69262 -0.0433029 5.40835 0.132384 5.23312L2.36462 3.00842L0.131765 0.766136C-0.0439217 0.590924 -0.0439217 0.306647 0.131765 0.131416C0.307452 -0.0438147 0.5925 -0.043796 0.768206 0.131416L3.00031 2.37444L5.23179 0.148995C5.40747 -0.0262168 5.69252 -0.0262168 5.86823 0.148995C6.04393 0.324207 6.04391 0.608485 5.86823 0.783715L3.636 3.00842L5.85248 5.23386Z" fill={viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF'} />
                                    </Svg>
                                </View>
                                <Text style={styles.clearAllText}>Clear all</Text>
                            </Pressable>
                        </View>
                        <View style={styles.selectedTicketsContainer}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {selections?.map((ele, i) => {
                                    return (
                                        <Pressable key={i} style={styles.numberCard} onPress={() => setRemoved(ele)}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                {viewBackgroundColor === '#FFFFFF' ?
                                                    <Image source={CrossMarkBlack} style={styles.crossMarkStyle} />
                                                    :
                                                    <Image source={crossMark} style={styles.crossMarkStyle} />
                                                }
                                            </View>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={styles.selectedNumber}>{ele}</Text>
                                            </View>
                                        </Pressable>
                                    )
                                })}
                            </ScrollView>
                        </View>
                        <Pressable style={styles.AddtoCartContainer} onPress={() => _addToCartWithLogin()}>
                            <Text style={styles.addToCartText}>Add to cart</Text>
                            <Text style={styles.addToCartText}>{`£${_entryCost.toFixed(2)}`}</Text>
                        </Pressable>
                    </View>
                    :
                    <View style={styles.TicketSelectionContainer}>
                        <Pressable style={styles.AddtoCartContainer}>
                            <Text style={styles.addToCartText}>Add to cart</Text>
                            <Text style={styles.addToCartText}>{`£0.00`}</Text>
                        </Pressable>
                    </View>
                }
            </View>
            {removed !== null &&
                <View style={styles.popup}>
                    <Text style={styles.popupText}>{`Ticket Number ${removed} removed from cart`}</Text>
                </View>
            }
            {clear !== false &&
                <View style={styles.popup}>
                    <Text style={styles.popupText}>{`You cleared your cart`}</Text>
                </View>
            }
            {isStatus400 !== null &&
                <View style={styles.popup}>
                    <Text style={styles.popupText}>{isStatus400}</Text>
                </View>
            }
        </>
    )
}

export default memo(NonInstantModalContent);
