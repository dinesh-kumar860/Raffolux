import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import Toast from 'react-native-simple-toast';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ThemeContext from '../../utils/themes/themeWrapper';
import { AddressValidationSchema } from '../../utils/AddressValidationSchema';

import * as Common from '../../helpers/common'
import ClaimAddDetailsModal from './ClaimAddDetailsModal';
import { deleteAddressDetailsWithLogin } from '../../api/pointsStoreApi';


const ClaimAddressData = (props) => {
    const theme = useContext(ThemeContext);

    const { id, name, phoneNo, postCode, address1, address2, city, setSelectedAddressId, isSelected, type, fetchDetails } = props;

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [isAddressDeleting, setIsAddressDeleting] = useState(false)

    const styles = StyleSheet.create({
        addressContainer: {
            paddingLeft: 17,
            paddingRight: 11,
            paddingTop: 11,
            paddingBottom: 11,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: isSelected ? '#FFBD0A' : theme.theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
        },
        closeIconContainer: {
            alignSelf: 'flex-end'
        },
        contentContainer: {
            flexDirection: 'row',
            flex: 1,
            gap: responsiveWidth(6),
            alignItems: 'center',
            marginRight: responsiveWidth(10),
        },
        radioButton: {
            height: 20,
            width: 20,
            borderRadius: 50,
            borderWidth: !isSelected ? 1 : null,
            borderColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            backgroundColor: isSelected ? '#FFBD0A' : null,
            alignItems: 'center',
            justifyContent: 'center'
        },
        editContainer: {
            alignSelf: 'flex-end',
            width: responsiveWidth(10),
            height: responsiveHeight(3),
            backgroundColor: '#FFBD0A',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3
        },
        editText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            color: '#000616',
        },
        contentDataContainer: {
            gap: responsiveHeight(1),
            flex: 1
        },
        mainText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            opacity: isSelected ? 1 : 0.8
        },
        dataTextFont: {
            fontFamily: 'NunitoSans-Regular'
        },
        addressText: {
            flex: 1,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
            color: theme.color,
            opacity: isSelected ? 0.8 : 0.7
        },
        addressTextFontSize: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            opacity: 0.8
        },
        modalBackgroundOpacity: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: responsiveWidth(3)
        }
    });

    const handleOnPress = () => {
        setSelectedAddressId(id)
    }

    const handleEdit = () => {
        setEditModalVisible(!editModalVisible)
    }

    const handleDelete = async () => {
        setIsAddressDeleting(true)
        let response = await deleteAddressDetailsWithLogin({ addressId: id });
        if (response) {
            setIsAddressDeleting(false)
            if (response.status === 200) {
                setSelectedAddressId(null)
                fetchDetails();
                Toast.show('Deleted Successfully', Toast.SHORT)
            }
        } else {
            setIsAddressDeleting(false)
        }
    }

    return (
        <>
            <Pressable style={styles.addressContainer} onPress={() => handleOnPress()} disabled={isSelected}>
                <Pressable style={styles.closeIconContainer} onPress={() => handleDelete()}>
                    {
                        isAddressDeleting ? <ActivityIndicator color={theme.color} /> : <Ionicons name={'close'} size={18} color={theme.theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'} />
                    }
                </Pressable>
                <View style={styles.contentContainer}>
                    <View style={styles.radioButton}>
                        {isSelected && <Feather name={'check'} size={10} color={theme.background} />}
                    </View>
                    <View style={styles.contentDataContainer}>
                        <Text style={[styles.addressText, styles.addressTextFontSize]}>{name}</Text>
                        <Text style={styles.addressText}>{phoneNo}</Text>
                        <Text style={styles.addressText}>{postCode}</Text>
                        <Text style={styles.addressText}>{address1}</Text>
                        {address2.trim().length > 0 && <Text style={styles.addressText}>{address2}</Text>}
                        <Text style={styles.addressText}>{city}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editContainer} onPress={() => handleEdit()}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </Pressable>
            <Modal animationType='slide' visible={editModalVisible} transparent={true} onRequestClose={() => setEditModalVisible(!editModalVisible)}   >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    <View style={styles.modalBackgroundOpacity}>
                        <ClaimAddDetailsModal id={id} modalVisible={editModalVisible} setModalVisible={setEditModalVisible} initialValues={{ fullName: name ? name : '', phoneNumber: phoneNo ? phoneNo : '', postCode: postCode ? postCode : '', addressLine1: address1 ? address1 : '', addressLine2: address2 ? address2 : '', city: city ? city : '' }} validationSchema={AddressValidationSchema} inputFields={Common.ClaimInputFields.addressInputFields} buttonText={'Update this address'} type={type} fetchDetails={fetchDetails} />
                    </View>
                </ScrollView>
            </Modal>
        </>

    )
}


export default ClaimAddressData

