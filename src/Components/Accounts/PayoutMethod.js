import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Image } from 'react-native-svg';

const PayoutMethod = (props) => {
    const { viewBackgroundColor } = props;

    const styles = StyleSheet.create({

        formContainer: {
            backgroundColor: '#FFFFFF',
            borderRadius: scale(12),
            marginBottom: scale(16)
        },

        circleCloseIcon: {
            height: scale(16),
            width: scale(16),
            resizeMode: 'contain'
        },
        unverifiedContainer: {
            backgroundColor: 'rgba(0, 6, 22, 0.2)',
            flexDirection: 'row',
            gap: scale(4),
            justifyContent: 'center',
            alignItems: 'center',
            height: scale(18),
            paddingHorizontal: scale(6),
            borderRadius: scale(2)
        },
        unverified: {
            color: '#000616',
            fontFamily: 'NunitoSans-Bold',
            fontSize: scale(10),
        },
        verifyNumber: {
            color: '#000616',
            fontSize: scale(18),
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            lineHeight: scale(22.05),
            marginBottom: scale(31),
        },
        verifyPhoneNumber: {
            color: 'rgba(0, 6, 22, 0.6)',
            fontSize: scale(16),
            fontFamily: 'NunitoSans-Regular',
            textAlign: 'center',
            lineHeight: scale(22.05),
            marginBottom: scale(24),
            marginHorizontal: scale(20),
        },
        imgCardContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: scale(32),
        },
        imgCard: {
            backgroundColor: '#D9D9D9',
            height: scale(161),
            width: scale(123.96),
            borderRadius: scale(5),
            elevation: scale(6,)
        },
        verifyNumberButton: {
            backgroundColor: '#FFBD0A',
            paddingVertical: scale(14),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(6),
        },
        verifyNumberButtonText: {
            color: '#000000',
            fontSize: scale(16),
            fontFamily: 'Gilroy-ExtraBold'
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
            // marginBottom: scale(20)
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
            fontSize: scale(16),
            color: '#1C1C27',
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            marginLeft: scale(30),
            marginRight: scale(11)
        },
        _nameText: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: scale(16),
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            marginLeft: scale(30),
            marginRight: scale(11)
        },
        addressText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            marginLeft: scale(30),
            marginRight: scale(11)
        },
        buttonText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#1C1C27' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            lineHeight: scale(15)
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
            fontSize: scale(16),
            paddingBottom: scale(5)
        },
        priceDelevaryAddressContainer: {
            marginBottom: scale(40)
        },
        TicketModal: {
            backgroundColor: 'rgba(0, 6, 22, 0.7)'
        },
        modalView: {
            marginTop: scale(120),
            paddingBottom: scale(40),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(11),
            alignItems: 'center',
            height: '100%',
        },
        bankDetailsModalView: {
            marginTop: scale(260),
            paddingBottom: scale(40),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(11),
            alignItems: 'center',
            height: '100%',
        },
        payPalDetailsModalView: {
            marginTop: scale(475),
            paddingBottom: scale(30),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
            borderRadius: scale(11),
            // alignItems: 'center',
            height: '100%',
        },
        deleteAddressModal: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            paddingBottom: scale(30),
        },
    })
    return (
        <View>
            <View style={styles.formContainer}>
                <View style={[styles.addressBoxConatiner]} >
                    <View style={styles.addressBoxContainer1}>
                        <View style={styles.checkBox}></View>
                        <View style={[styles.xMarkAddressContainer]}>
                            <View style={styles.addressContainer}>
                                <Text style={[styles.nameText, { fontSize: responsiveFontSize(2.2) }]}>{'Lloyds Bank Current'}</Text>
                                <Text style={[styles.addressText, { marginBottom: scale(16) }]}>{'Account number ending 4444'}</Text>
                                <Text style={[styles.nameText, { marginBottom: scale(19) }]}>{'J THOMPSON'}</Text>
                            </View>
                            <View style={styles.addressEditMainContainer}>
                                <Pressable onPress={() => setEditModalVisible(true)}>
                                    <Image style={styles.circleCloseIcon} source={viewBackgroundColor === '#FFFFFF' ? payoutEditLight : payoutEditDark} />
                                </Pressable>
                                <Pressable>
                                    <Image style={styles.circleCloseIcon} source={viewBackgroundColor === '#FFFFFF' ? payoutTrashLight : payoutTrashDark} />
                                </Pressable>
                            </View>
                        </View>
                    </View>

                </View>
            </View>
         
        </View>

    )
}

export default PayoutMethod