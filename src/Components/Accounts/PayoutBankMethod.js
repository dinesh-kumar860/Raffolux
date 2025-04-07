import { View, Text, StyleSheet, Pressable, Image, Modal, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import payoutEditLight from '../../assets/Images/payoutEditLight.png'
import payoutTrashLight from '../../assets/Images/payoutTrashLight.png'
import payoutEditDark from '../../assets/Images/payoutEditDark.png'
import payoutTrashDark from '../../assets/Images/payoutTrashDark.png'

import AddNewBankDetails from './AddNewBankDetails';
import DeleteAddressModal from './DeleteAddressModal';

import * as Common from '../../helpers/common'

const PayoutBankMethod = (props) => {
    const { viewBackgroundColor, bank_name, account_number, sort_code, id, fetchBankDetails } = props;
    const [editBankDetailsModal, setEditBankDetailsModal] = useState(false);
    const [deleteBankDetailsModal, setDeleteBankDetailsModal] = useState(false)

    const editBank = () => setEditBankDetailsModal(true)

    const deleteBank = async () => setDeleteBankDetailsModal(!deleteBankDetailsModal)


    const styles = StyleSheet.create({
        formContainer: {
            borderRadius: scale(12),
            marginBottom: scale(16),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
        },
        circleCloseIcon: {
            height: scale(16),
            width: scale(16),
            resizeMode: 'contain'
        },
        addressBoxConatiner: {
            borderRadius: scale(6),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#070B1A',
        },
        addressBoxContainer1: {
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'center',
        },
        checkBox: {
            marginLeft: scale(37),
        },
        xMarkAddressContainer: {
            flex: 1,
        },
        addressContainer: {
            marginTop: scale(23),
            gap: scale(5),
            flex: 1,
        },
        addressEditMainContainer: {
            flexDirection: 'row',
            alignSelf: "flex-end",
            marginRight: scale(20),
            marginBottom: scale(20),
            gap: scale(18)
        },
        nameText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2.2),
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            marginLeft: scale(30),
            marginRight: scale(11)
        },
        addressText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            marginLeft: scale(30),
            marginRight: scale(11),
            marginBottom: scale(16)
        },
        modalKeyboardAvoidingView:{
            flex:1
        },
        modalContainer: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            justifyContent: 'center'
        }
    })
    return (
        <View>
            <View style={styles.formContainer}>
                <View style={styles.addressBoxConatiner} >
                    <View style={styles.addressBoxContainer1}>
                        <View style={styles.checkBox}></View>
                        <View style={styles.xMarkAddressContainer}>
                            <View style={styles.addressContainer}>
                                <Text style={styles.nameText}>{bank_name}</Text>
                                <Text style={styles.addressText}>{Common.account.AccountNumberEnding} {account_number.slice(-4)}</Text>
                            </View>
                            <View style={styles.addressEditMainContainer}>
                                <Pressable onPress={() => editBank()}>
                                    <Image style={styles.circleCloseIcon} source={viewBackgroundColor === '#FFFFFF' ? payoutEditLight : payoutEditDark} />
                                </Pressable>
                                <Pressable onPress={() => deleteBank()}>
                                    <Image style={styles.circleCloseIcon} source={viewBackgroundColor === '#FFFFFF' ? payoutTrashLight : payoutTrashDark} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Modal animationType="slide" transparent={true} visible={editBankDetailsModal} propagateSwipe={true} onRequestClose={() => { setEditBankDetailsModal(!editBankDetailsModal) }} >
                <KeyboardAvoidingView style={styles.modalKeyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalKeyboardAvoidingView} >
                        <AddNewBankDetails setModalVisible={setEditBankDetailsModal} modalVisible={editBankDetailsModal} fetchBankDetails={fetchBankDetails} bank_name={bank_name} account_number={account_number} sort_code={sort_code} id={id} isEdit={true} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
            <Modal animationType="fade" transparent={true} visible={deleteBankDetailsModal} propagateSwipe={true} onRequestClose={() => { setDeleteBankDetailsModal(!deleteBankDetailsModal) }} >
                <View style={styles.modalContainer}>
                    <DeleteAddressModal setDeleteModalvisible={setDeleteBankDetailsModal} deleteModalVisible={deleteBankDetailsModal} fetchDetails={fetchBankDetails} id={id} type={'bank'} />
                </View>
            </Modal>

        </View>

    )
}

export default PayoutBankMethod