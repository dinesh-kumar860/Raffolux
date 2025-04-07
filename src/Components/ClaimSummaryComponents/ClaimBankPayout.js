import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import ThemeContext from '../../utils/themes/themeWrapper'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import AddNewClaimPayoutButton from './AddNewClaimPayoutButton';
import ClaimPayoutData from './ClaimPayoutData';
import ClaimAddDetailsModal from './ClaimAddDetailsModal';
import * as Common from '../../helpers/common'
import { PayoutBankValidationSchema } from '../../utils/PayoutBankValidationSchema';
import { isEmptyArray } from '../../utils/utils';


const ClaimBankPayout = (props) => {
    const { data, setSelectedPayoutId, selectedPayoutId, fetchBankDetails } = props
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
            <Text style={styles.headerText}>Account details</Text>
            <Text style={[styles.subHeaderText, styles.subHeaderMargin]}>Which bank account would you like us to send your winnings to?</Text>
            {
                !isEmptyArray(data) &&
                <View style={styles.bankDataContainer}>
                    <Text style={styles.previouslyUsedText}>Previously used</Text>
                    <View style={styles.dataContainer}>
                        {
                            data?.slice(0, 2).map((ele, i) => {
                                return (
                                    <ClaimPayoutData key={i} id={`bank_${ele.id}`} idToSend={ele.id} mainText={ele.bank_name} subText={`${Common.prizeClaim.Accountrending} ${ele.account_number.slice(-4)}`} setSelectedPayoutId={setSelectedPayoutId} isSelected={selectedPayoutId == `bank_${ele.id}`} validationSchema={PayoutBankValidationSchema} initialValues={{ fullName: ele.bank_name ? ele.bank_name : '', sortCode: ele.sort_code ? ele.sort_code : '', accountNumber: ele.account_number ? ele.account_number : '' }} inputFields={Common.ClaimInputFields.bankInputFields} buttonText={'Update account details'} type={'bankEdit'} fetchDetails={fetchBankDetails} />
                                )
                            })
                        }
                    </View>
                </View>
            }
            <View style={styles.addNewAccountContainer}>
                <AddNewClaimPayoutButton title={'+ Add a new bank account'} handleOnPress={() => setModalVisible(!modalVisible)} />
            </View>
            <Modal animationType='slide' visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(!modalVisible)}   >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                    <View style={styles.modalBackgroundOpacity}>
                        <ClaimAddDetailsModal modalVisible={modalVisible} setModalVisible={setModalVisible} initialValues={{ fullName: '', sortCode: '', accountNumber: '' }} validationSchema={PayoutBankValidationSchema} inputFields={Common.ClaimInputFields.bankInputFields} buttonText={'Save account details'} type={'bank'} fetchDetails={fetchBankDetails} />
                    </View>
                </ScrollView>
            </Modal>
        </View>
    )
}

export default ClaimBankPayout
