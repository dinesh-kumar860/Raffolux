import { View, Text, ScrollView, StyleSheet, Pressable, Image, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import EditSavedAddressModal from './EditSavedAddress';
import DeleteAddressModal from './DeleteAddressModal';

const PrizeDeliveryAddress = (props) => {
    const { viewBackgroundColor, _displayAddressWithLogin, id, full_name, phone_no, post_code, address_line_1, address_line_2, city, payoutEditLight, payoutTrashLight, payoutEditDark, payoutTrashDark } = props;
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalvisible] = useState(false)

    const deleteAddress = async () => setDeleteModalvisible(true)


    const styles = StyleSheet.create({
        formContainer: {
            backgroundColor: '#FFFFFF',
            borderRadius: scale(12),
            marginBottom: scale(16)
        },
        circleCloseIcon: {
            height: scale(16),
            width: scale(16),
            resizeMode: 'contain',
            opacity: scale(0.8)
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
            marginBottom: scale(5)
        },
        addressEditMainContainer: {
            flexDirection: 'row',
            alignSelf: "flex-end",
            marginRight: scale(20),
            marginBottom: scale(20),
            gap: scale(18)
        },
        addressText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            marginLeft: scale(30),
            marginRight: scale(11)
        },
        TicketModal: {
            backgroundColor: 'rgba(0, 6, 22, 0.7)'
        },
        modalView: {
            marginTop: scale(120),
            paddingBottom: scale(40),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(11),
            height: '100%',
        },
        deleteAddressModal: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            paddingBottom: scale(30),
        },
        modalContainer: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            justifyContent: 'center'
        },
        modalKeyboardAvoidingContainer: {
            flex: 1
        },
        modalScrollViewContainer: {
            flexGrow: 1
        }
    })

    return (
        <View style={styles.formContainer}>
            <View style={styles.addressBoxConatiner} >
                <View style={styles.addressBoxContainer1}>
                    <View style={styles.checkBox}></View>
                    <View style={styles.xMarkAddressContainer}>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressText}>{full_name}</Text>
                            <Text style={styles.addressText}>{phone_no}</Text>
                            <Text style={styles.addressText}>{post_code}</Text>
                            <Text style={styles.addressText}>{address_line_1}</Text>
                            {address_line_2 && address_line_2.trim().length > 0 && <Text style={styles.addressText}>{address_line_2}</Text>}
                            <Text style={styles.addressText}>{city}</Text>
                        </View>
                        <View style={styles.addressEditMainContainer}>
                            <Pressable onPress={() => setEditModalVisible(true)}>
                                <Image style={styles.circleCloseIcon} source={viewBackgroundColor === '#FFFFFF' ? payoutEditLight : payoutEditDark} />
                            </Pressable>
                            <Pressable onPress={() => deleteAddress(id)}>
                                <Image style={styles.circleCloseIcon} source={viewBackgroundColor === '#FFFFFF' ? payoutTrashLight : payoutTrashDark} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
            <Modal animationType="slide" transparent={true} visible={editModalVisible} propagateSwipe={true} onRequestClose={() => { setEditModalVisible(false) }} >
                <KeyboardAvoidingView style={styles.modalKeyboardAvoidingContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScrollViewContainer} >
                        <TouchableWithoutFeedback>
                            <View style={styles.TicketModal}>
                                <View style={styles.modalView}>
                                    <EditSavedAddressModal setEditModalVisible={setEditModalVisible} editModalVisible={editModalVisible} _displayAddressWithLogin={_displayAddressWithLogin} id={id} full_name={full_name} phone_no={phone_no} post_code={post_code} address_line_1={address_line_1} address_line_2={address_line_2} city={city} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
            <Modal animationType="fade" transparent={true} visible={deleteModalVisible} propagateSwipe={true} onRequestClose={() => { setDeleteModalvisible(!deleteModalVisible) }} >
                <View style={styles.modalContainer}>
                    <DeleteAddressModal setDeleteModalvisible={setDeleteModalvisible} deleteModalVisible={deleteModalVisible} fetchDetails={_displayAddressWithLogin} id={id} type={'address'} />
                </View>
            </Modal>
        </View>
    )
}

export default PrizeDeliveryAddress