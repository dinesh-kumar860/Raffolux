import { View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import Ionicons from 'react-native-vector-icons/Ionicons';

import ThemeContext from '../../utils/themes/themeWrapper';

import * as Common from '../../helpers/common';

import PayPal from '../../assets/Images/PayPal.png'
import PayPalLight from '../../assets/Images/PayPalLight.png'
import bankTransfer from '../../assets/Images/bankTransfer.png'
import bankTransferLight from '../../assets/Images/bankTransferLight.png'

import AddNewBankDetails from './AddNewBankDetails';
import PayPalDetails from './PayPalDetails';

const AddNewPaymentMethod = (props) => {
    const theme = useContext(ThemeContext);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    const { payoutModalVisible, setPayoutModalVisible, fetchPaypalDetails, fetchBankDetails } = props;

    const [addBankDetailsModal, setAddBankDetailsModal] = useState(false);
    const [addPaypalDetailsModal, setAddPaypalDetailsModal] = useState(false)

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme]);

    const AddPaymentMethod = ({ title, imageLight, imageDark, modalToggle, setModalToggle }) => {
        return (
            <Pressable style={styles.paymentCards} onPress={() => setModalToggle(!modalToggle)}>
                <Image style={styles.paymentIcons} source={viewBackgroundColor === '#FFFFFF' ? imageLight : imageDark} />
                <Text style={styles.patmentText}>{title}</Text>
            </Pressable>
        )
    }

    const styles = StyleSheet.create({
        ModalFirstContainer: {
            paddingHorizontal: scale(10),
            paddingBottom: scale(40),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
            borderTopRightRadius: scale(12),
            borderTopLeftRadius: scale(12),
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        },
        HeaderWithClose: {
            marginTop: scale(15),
            alignItems: 'flex-end'
        },
        modalHeaderText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            textAlign: 'center',
            marginBottom: scale(24),
            marginTop: scale(20)
        },
        closeIcon: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            marginRight: scale(1),
            bottom: scale(5),
        },
        paymentImageContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(15)
        },
        paymentCards: {
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.1)' : 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1.24,
            borderRadius: scale(10),
            width: 132,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center'
        },
        paymentIcons: {
            width: scale(37),
            height: scale(29),
            marginBottom: 10,
            resizeMode: 'contain'
        },
        patmentText: {
            color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.7)' : 'rgba(255, 255, 255, 0.7)',
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'Gilroy-ExtraBold',
        },
        TicketModal: {
            backgroundColor: 'rgba(0, 6, 22, 0.7)',
            flex: 1
        },
        modalView: {
            paddingBottom: scale(40),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(11),
            alignItems: 'center',
            height: '100%',
        },
        modalFlex:{
            flex: 1
        },
        mainContainer: {
            backgroundColor: 'rgba(0, 0, 0, 0.70)',
            flex: 1
        }
    })

    return (
        <View style={styles.mainContainer}>
            <View style={styles.ModalFirstContainer}>
                <View style={styles.HeaderWithClose}>
                    <Pressable onPress={() => setPayoutModalVisible(!payoutModalVisible)}>
                        <Ionicons name={'close'} size={25} style={styles.closeIcon} />
                    </Pressable>
                </View>
                <Text style={styles.modalHeaderText}>{Common.account.AddNewPayoutMethod}</Text>
                <View style={styles.paymentImageContainer}>
                    <AddPaymentMethod title={Common.account.BankTransfer} imageLight={bankTransferLight} imageDark={bankTransfer} modalToggle={addBankDetailsModal} setModalToggle={setAddBankDetailsModal} />
                    <AddPaymentMethod title={Common.account.Paypal} imageLight={PayPal} imageDark={PayPalLight} modalToggle={addPaypalDetailsModal} setModalToggle={setAddPaypalDetailsModal} />
                </View>

                <Modal animationType="slide" transparent={true} visible={addBankDetailsModal} onRequestClose={() => { setAddBankDetailsModal(!addBankDetailsModal) }} >
                    <KeyboardAvoidingView style={styles.modalFlex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} >
                            <AddNewBankDetails setModalVisible={setAddBankDetailsModal} modalVisible={addBankDetailsModal} isEdit={false} fetchBankDetails={fetchBankDetails} payoutModalVisible={payoutModalVisible} setPayoutModalVisible={setPayoutModalVisible} />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </Modal>

                <Modal animationType="slide" transparent={true} visible={addPaypalDetailsModal} propagateSwipe={true} onRequestClose={() => { setAddPaypalDetailsModal(!addPaypalDetailsModal) }} >
                    <KeyboardAvoidingView style={styles.modalFlex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalFlex} >
                            <PayPalDetails setModalVisible={setAddPaypalDetailsModal} visibleModal={addPaypalDetailsModal} fetchPaypalDetails={fetchPaypalDetails} setPayoutModalVisible={setPayoutModalVisible} payoutModalVisible={payoutModalVisible} isEdit={false} />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </Modal>
            </View>
        </View>
    )
}

export default AddNewPaymentMethod