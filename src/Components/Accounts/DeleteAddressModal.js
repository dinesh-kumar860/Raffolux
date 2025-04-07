import { View, Text, StyleSheet, Pressable,  ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import  Toast  from 'react-native-simple-toast';

import ThemeContext from '../../utils/themes/themeWrapper';

import { deleteAddressDetailsWithLogin } from '../../api/pointsStoreApi';
import { deleteBankDetailsWithLogin, deletePaypalDetailsWithLogin } from '../../api/PrizeSummaryApi';
import * as Common from '../../helpers/common';


const DeleteAddressModal = (props) => {
    const theme = useContext(ThemeContext);
    const { deleteModalVisible, setDeleteModalvisible, fetchDetails, id, type } = props;
    const [disableButton, setDisableButton] = useState(false);

    const deleteIdData = async () => {
        const deleteDetails = async (deleteFunction, params) => {
            setDisableButton(true);
            let response = await deleteFunction(params);
            if (response) {
                fetchDetails();
                setDeleteModalvisible(!deleteModalVisible);
                setDisableButton(false);
                Toast.show('Successfully deleted!', Toast.SHORT);
            }
            setDisableButton(false);
        };
    
        if (type === 'address') {
            await deleteDetails(deleteAddressDetailsWithLogin, { addressId: id });
        } else if (type === 'bank') {
            await deleteDetails(deleteBankDetailsWithLogin, { bankId: id });
        } else if (type === 'paypal') {
            await deleteDetails(deletePaypalDetailsWithLogin, { payPalId: id });
        }
    };
    

    const styles = StyleSheet.create({
        ModalFirstContainer: {
            paddingHorizontal: scale(30),
            backgroundColor: theme.theme === 'light' ? '#FFFFFF' : '#070B1A',
            marginHorizontal: scale(16),
            borderRadius: scale(11),
        },
        HeaderWithClose: {
            marginTop: scale(30),
            marginBottom: scale(20),
            justifyContent: 'center',
            alignItems: 'center'
        },
        modalHeaderText: {
            color: theme.theme === 'light' ? '#000616' : 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            paddingHorizontal: scale(9.6)
        },
        saveButton: {
            backgroundColor: theme.theme === 'light' ? 'rgba(0, 6, 22, 0.25)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: scale(6),
            alignItems: 'center',
            height: 48,
            borderColor: theme.theme === 'light' ? 'rgba(0, 6, 22, 0.25)' : 'rgba(255, 255, 255, 0.20)',
            borderWidth: scale(1.24),
            justifyContent: 'center'
        },
        cancelButton: {
            marginTop: scale(14),
            marginBottom: scale(27),
            textAlign: 'center',
        },
        saveChanges: {
            color: theme.theme === 'light' ? '#000616' : '#FFFFFF',
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'Gilroy-ExtraBold',
        }
    })
    return (
        <View style={styles.ModalFirstContainer}>
            <View style={styles.HeaderWithClose}>
                <Text style={styles.modalHeaderText}>{Common.account.AreYouSureYouWantToDeleteThisSaved} {type === 'address' && `address` || type === 'bank' && `bank details` || type == 'paypal' && `paypal details`}?</Text>
            </View>
            <Pressable onPress={() => deleteIdData()} style={styles.saveButton} disabled={disableButton}>
                {
                    disableButton ? <ActivityIndicator color={theme.color} /> : <Text style={styles.saveChanges}>{Common.account.Delete} {type === 'address' && `address` || type === 'bank' && `bank details` || type == 'paypal' && `paypal details`}</Text>
                }
            </Pressable>
            <Text style={[styles.saveChanges, styles.cancelButton]} onPress={() => setDeleteModalvisible(false)}>{Common.common.cancel}</Text>
        </View>
    )
}

export default DeleteAddressModal