import React, { useContext, useEffect, useState, useCallback } from 'react'
import { View, Text, ScrollView, RefreshControl, StyleSheet, Pressable, Image, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

import { displayAddressWithLogin } from '../../api/accountsApi';
import { fetchBankDetailsWithLogin, fetchPaypalDetailsWithLogin } from '../../api/PrizeSummaryApi';

import * as common from '../../helpers/common';

import { useInternet } from '../../utils/InternetConnection/InternetContextWrapper';
import ThemeContext from '../../utils/themes/themeWrapper';
import { isEmptyArray } from '../../utils/utils';

import AddNewAddressModal from './AddNewAddressModal';
import AddNewPaymentMethod from './AddNewPaymentMethod';
import PayoutPaypalContainer from './PayoutPaypalContainer';
import PyoutBankContainer from './PyoutBankContainer';
import PrizeDeliveryAddressContaier from './PrizeDeliveryAddressContaier';

import payoutEditLight from '../../assets/Images/payoutEditLight.png'
import payoutTrashLight from '../../assets/Images/payoutTrashLight.png'
import addressPlus from '../../assets/Images/addressPlus.png'
import payoutEditDark from '../../assets/Images/payoutEditDark.png'
import payoutTrashDark from '../../assets/Images/payoutTrashDark.png'
import addressPlusDark from '../../assets/Images/addressPlusDark.png'


const PayoutDetails = () => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();
    const { isConnected } = useInternet()
    const [address, setAddress] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [payoutModalVisible, setPayoutModalVisible] = useState(false);
    const [paypalData, setPaypalData] = useState([]);
    const [bankData, setBankData] = useState([]);

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#000616') : setViewBackgroundColor('#FFFFFF');
    }, [theme])


    const _displayAddressWithLogin = async () => {
        const response = await displayAddressWithLogin();
        response && setAddress(response);
    };

    const fetchPaypalDetails = async () => {
        let response = await fetchPaypalDetailsWithLogin();
        response && setPaypalData(response)
    };

    const fetchBankDetails = async () => {
        let response = await fetchBankDetailsWithLogin();
        response && setBankData(response)
    }

    useEffect(() => {
        if (isConnected === true) {
            _displayAddressWithLogin();
            fetchPaypalDetails();
            fetchBankDetails();
        }
    }, [isConnected]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        _displayAddressWithLogin();
        fetchPaypalDetails();
        fetchBankDetails();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);


    const AddNewDetails = ({ title, modalToggle, setModalToggle }) => {
        return (
            <Pressable style={styles.addNewAddressButton} onPress={() => setModalToggle(!modalToggle)}>
                <Image style={styles.circleCloseIcon} source={viewBackgroundColor === '#FFFFFF' ? addressPlus : addressPlusDark} />
                <Text style={styles.addNewAddressStyle}>{title}</Text>
            </Pressable>
        )
    }

    const styles = StyleSheet.create({
        MainContainer: {
            flex: 1,
            paddingHorizontal: scale(16),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616',
            opacity: modalVisible ? 0.9 : null
        },
        headerBar: {
            height: scale(48),
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
        },
        headerBarIcon: {
            textAlign: 'left',
            flex: 0.1
        },
        headerTextStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 0.9)',
            fontSize: responsiveFontSize(3.5),
            fontFamily: 'Gilroy-ExtraBold',
            marginBottom: scale(24),
        },
        useDetailsStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            marginBottom: scale(24),
        },
        circleCloseIcon: {
            height: scale(16),
            width: scale(16),
            resizeMode: 'contain'
        },
        addNewAddressButton: {
            paddingVertical: scale(18),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderStyle: 'dashed',
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.5)' : 'rgba(255, 255, 255, 0.5)',
            borderWidth: scale(1.24),
            borderRadius: scale(12),
            gap: scale(6)
        },
        addNewAddressStyle: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            paddingBottom: scale(5)
        },
        priceDelevaryAddressContainer: {
            marginBottom: scale(40)
        },
        TicketModal: {
            backgroundColor: 'rgba(0, 0, 0, 0.70)',
        },
        modalView: {
            marginTop: scale(80),
            paddingBottom: scale(40),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(11),
            height: '100%',
        },
        payoutModalView: {
            paddingBottom: scale(40),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(11),
            alignItems: 'center',
            height: '100%',
        }
    })


    return (
        <View style={styles.MainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                <View style={styles.headerBar}>
                    <Pressable style={styles.headerBarIcon} onPress={() => navigation.goBack()} >
                        <AntDesign name={'left'} size={20} color={theme.color} />
                    </Pressable>
                </View>
                <Text style={styles.headerTextStyle}>{common.account.PayoutDetails}</Text>
                <View style={styles.priceDelevaryAddressContainer}>
                    <Text style={styles.useDetailsStyle}>{common.account.PrizeDeliveryAddress}</Text>
                    {
                        address?.length > 0 &&
                        <>
                            {!isEmptyArray(address) && address?.slice(0, 2).map((ele, i) =>
                                <PrizeDeliveryAddressContaier key={i} {...ele} viewBackgroundColor={viewBackgroundColor} _displayAddressWithLogin={_displayAddressWithLogin} payoutEditLight={payoutEditLight} payoutTrashLight={payoutTrashLight} addressPlus={addressPlus} payoutEditDark={payoutEditDark} payoutTrashDark={payoutTrashDark} addressPlusDark={addressPlusDark} />)
                            }
                        </>
                    }
                    <AddNewDetails title={common.account.addNewAddress} modalToggle={modalVisible} setModalToggle={setModalVisible} />
                </View>

                <View style={styles.priceDelevaryAddressContainer}>
                    <Text style={styles.useDetailsStyle}>{common.account.PayoutMethod}</Text>
                    {
                        bankData?.length > 0 || paypalData?.length > 0 ?
                            <>
                                {
                                    bankData?.length > 0 && bankData?.slice(0, 2).map((ele, i) => (
                                        <PyoutBankContainer key={i} {...ele} viewBackgroundColor={viewBackgroundColor} fetchBankDetails={fetchBankDetails} />
                                    ))
                                }
                                {
                                    paypalData?.length > 0 && paypalData?.slice(0, 2).map((ele, i) => (
                                        <PayoutPaypalContainer key={i} {...ele} viewBackgroundColor={viewBackgroundColor} fetchPaypalDetails={fetchPaypalDetails} />
                                    ))
                                }
                            </>
                            : null
                    }
                    <AddNewDetails title={common.account.addNewPayoutMethod} modalToggle={payoutModalVisible} setModalToggle={setPayoutModalVisible} />
                </View>
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={modalVisible} propagateSwipe={true} onRequestClose={() => { setModalVisible(false) }} >
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}} >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1}} >
                        <TouchableWithoutFeedback >
                            <View style={styles.TicketModal}>
                                <View style={styles.modalView}>
                                    <AddNewAddressModal setModalVisible={setModalVisible} modalVisible={modalVisible} _displayAddressWithLogin={_displayAddressWithLogin} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>

            <Modal animationType="slide" transparent={true} visible={payoutModalVisible} propagateSwipe={true} onRequestClose={() => { setPayoutModalVisible(false) }} >
                <ScrollView showsVerticalScrollIndicator={false} style={styles.payoutModalConatiner} contentContainerStyle={{ flex: 1 }} >
                    <AddNewPaymentMethod setPayoutModalVisible={setPayoutModalVisible} payoutModalVisible={payoutModalVisible} fetchPaypalDetails={fetchPaypalDetails} fetchBankDetails={fetchBankDetails} />
                </ScrollView>
            </Modal>
        </View>
    )
}

export default PayoutDetails