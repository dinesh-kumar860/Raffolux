import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../../utils/themes/themeWrapper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AddNewClaimPayoutButton from './AddNewClaimPayoutButton';
import ClaimPayoutData from './ClaimPayoutData';
import * as Common from '../../helpers/common'
import { PayoutPaypalValidationSchema } from '../../utils/PayoutPaypalValidationSchema';
import ClaimAddDetailsModal from './ClaimAddDetailsModal';
import { isEmptyArray } from '../../utils/utils';


const ClaimPaypalPayout = (props) => {
    const { setSelectedPayoutId, selectedPayoutId, data, fetchPaypalDetails} = props;

    const theme = useContext(ThemeContext);

    const [modalVisible, setModalVisible] = useState(false)


    const styles = StyleSheet.create({
        headerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            lineHeight: 24,
            color: theme.color,
            opacity: 0.9
        },
        subHeaderText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            opacity: 0.8,
        },
        subHeaderMargin: {
            marginTop: responsiveHeight(2)
        },
        bankDataContainer: {
            marginTop: responsiveHeight(3)
        },
        previouslyUsedText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
            color: theme.color,
            opacity: 0.8,
        },
        dataContainer: {
            marginTop: responsiveHeight(1.5),
            gap: responsiveHeight(2)
        },
        addNewAccountContainer: {
            marginTop: responsiveHeight(3)
        },
        modalBackgroundOpacity: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: responsiveWidth(3)
        }
    });


    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>PayPal email address</Text>
            <Text style={[styles.subHeaderText, styles.subHeaderMargin]}>What Paypal email address would you like us to send your prize to?</Text>
            {
                !isEmptyArray(data) &&
                <View style={styles.bankDataContainer}>
                    <Text style={styles.previouslyUsedText}>Previously used</Text>
                    <View style={styles.dataContainer}>
                        {
                            data?.slice(0,2)?.map((ele, i) => (
                                <ClaimPayoutData key={i} id={`paypal_${ele.id}`} idToSend={ele.id} mainText={ele.mail_id} setSelectedPayoutId={setSelectedPayoutId} isSelected={selectedPayoutId == `paypal_${ele.id}`}  validationSchema={PayoutPaypalValidationSchema} initialValues={{ email: ele.mail_id ? ele.mail_id : '' }} inputFields={Common.ClaimInputFields.paypalInputFields} buttonText={'Update Paypal address'} type={'paypalEdit'}  fetchDetails={fetchPaypalDetails} />
                            ))
                        }
                    </View>
                </View>
            }

            <View style={styles.addNewAccountContainer}>
                <AddNewClaimPayoutButton title={'+ Add new Paypal email address'} handleOnPress={() => setModalVisible(!modalVisible)} />
            </View>
            <Modal animationType='slide' visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(!modalVisible)}   >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    <View style={styles.modalBackgroundOpacity}>
                        <ClaimAddDetailsModal modalVisible={modalVisible} setModalVisible={setModalVisible} initialValues={{ email: '' }} validationSchema={PayoutPaypalValidationSchema} inputFields={Common.ClaimInputFields.paypalInputFields} buttonText={'Save Paypal address'} type={'paypal'} fetchDetails={fetchPaypalDetails} />
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}

export default ClaimPaypalPayout
