import { View, Text, StyleSheet, Pressable, Image, Modal, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import payoutEditLight from '../../assets/Images/payoutEditLight.png'
import payoutTrashLight from '../../assets/Images/payoutTrashLight.png'
import payoutEditDark from '../../assets/Images/payoutEditDark.png'
import payoutTrashDark from '../../assets/Images/payoutTrashDark.png'

import PayPalDetails from './PayPalDetails';
import DeleteAddressModal from './DeleteAddressModal';

const PayoutPaypalMethod = (props) => {
    const { viewBackgroundColor, mail_id, id, fetchPaypalDetails } = props;
    const [editPaypalDetailsModal, setEditPaypalDetailsModal] = useState(false);
    const [deletePaypalDetailsModal, setDeletePaypalDetailsModal] = useState(false)

    const editPaypal = () => setEditPaypalDetailsModal(true)

    const deletePaypal = async () => setDeletePaypalDetailsModal(!deletePaypalDetailsModal)

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
            color: '#1C1C27',
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            marginLeft: scale(30),
            marginRight: scale(11)
        },
        payPalDetailsModalView: {
            marginTop: scale(475),
            paddingBottom: scale(30),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(11),
            height: '100%',
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
                                <Text style={styles.nameText}>{mail_id}</Text>
                            </View>
                            <View style={styles.addressEditMainContainer}>
                                <Pressable onPress={() => editPaypal(id)}>
                                    <Image style={styles.circleCloseIcon} source={viewBackgroundColor === '#FFFFFF' ? payoutEditLight : payoutEditDark} />
                                </Pressable>
                                <Pressable onPress={() => deletePaypal()}>
                                    <Image style={styles.circleCloseIcon} source={viewBackgroundColor === '#FFFFFF' ? payoutTrashLight : payoutTrashDark} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <Modal animationType="slide" transparent={true} visible={editPaypalDetailsModal} propagateSwipe={true} onRequestClose={() => { setEditPaypalDetailsModal(!editPaypalDetailsModal) }} >
                <KeyboardAvoidingView style={styles.xMarkAddressContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.xMarkAddressContainer} >
                        <PayPalDetails setModalVisible={setEditPaypalDetailsModal} visibleModal={editPaypalDetailsModal} fetchPaypalDetails={fetchPaypalDetails} isEdit={true} mail_id={mail_id} id={id} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
            <Modal animationType="fade" transparent={true} visible={deletePaypalDetailsModal} propagateSwipe={true} onRequestClose={() => { setDeletePaypalDetailsModal(!deletePaypalDetailsModal) }} >
                <View style={styles.modalContainer}>
                    <DeleteAddressModal setDeleteModalvisible={setDeletePaypalDetailsModal} deleteModalVisible={deletePaypalDetailsModal} fetchDetails={fetchPaypalDetails} id={id} type={'paypal'} />
                </View>
            </Modal>

        </View>

    )
}

export default PayoutPaypalMethod