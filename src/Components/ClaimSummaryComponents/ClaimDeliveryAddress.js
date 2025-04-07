import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../../utils/themes/themeWrapper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import AddNewClaimPayoutButton from './AddNewClaimPayoutButton'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AddressValidationSchema } from '../../utils/AddressValidationSchema';
import * as Common from '../../helpers/common'
import ClaimAddDetailsModal from './ClaimAddDetailsModal'
import ClaimAddressData from './ClaimAddressData'
import { displayAddressWithLogin } from '../../api/accountsApi'

const ClaimDeliveryAddress = (props) => {
    const { setSelectedAddressId, selectedAddressId } = props
    const theme = useContext(ThemeContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [addressData, setAddressData] = useState([]);


    const fetchAddressData = async () => {
        let response = await displayAddressWithLogin();
        if (response) {
            setAddressData(response);
            setSelectedAddressId(response[0]?.id)
        };
    };

    useEffect(() => {
        fetchAddressData()
    }, [])


    const styles = StyleSheet.create({
        headerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            color: theme.color,
            opacity: 0.9,
            lineHeight: 24
        },
        subHeaderText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            opacity: 0.8,
            marginTop: responsiveHeight(1)
        },
        savedAddressContainer: {
            marginTop: responsiveHeight(3),
            gap: responsiveHeight(1.5)
        },
        addNewButtonContainer: {
            marginTop: responsiveHeight(3)
        },
        modalBackgroundOpacity: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: responsiveWidth(3)
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Delivery Details</Text>
            <Text style={styles.subHeaderText}>What address would you like us to send your physical prizes to?</Text>
            <View style={styles.savedAddressContainer}>
                {
                    addressData?.slice(0, 2).map((ele, i) => (
                        <ClaimAddressData key={i} id={ele.id} name={ele.full_name} phoneNo={ele.phone_no} postCode={ele.post_code} address1={ele.address_line_1} address2={ele.address_line_2} city={ele.city} setSelectedAddressId={setSelectedAddressId} isSelected={selectedAddressId == ele.id} type={'addressEdit'} fetchDetails={fetchAddressData} />
                    ))
                }
            </View>
            <View style={styles.addNewButtonContainer}>
                <AddNewClaimPayoutButton title={'+ Add new delivery address'} handleOnPress={() => setModalVisible(!modalVisible)} />
            </View>
            <Modal animationType='slide' visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(!modalVisible)}   >
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == "ios" && 'padding'}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                        <View style={styles.modalBackgroundOpacity}>
                            <ClaimAddDetailsModal modalVisible={modalVisible} setModalVisible={setModalVisible} initialValues={{ fullName: '', phoneNumber: '', postCode: '', addressLine1: '', addressLine2: '', city: '' }} validationSchema={AddressValidationSchema} inputFields={Common.ClaimInputFields.addressInputFields} buttonText={'Save this address'} type={'address'} fetchDetails={fetchAddressData} />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}

export default ClaimDeliveryAddress
