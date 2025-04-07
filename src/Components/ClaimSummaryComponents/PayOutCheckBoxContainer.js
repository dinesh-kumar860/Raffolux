import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import CheckBox from '@react-native-community/checkbox';

import PayoutBankFields from './PayoutBankFields';
import PayoutPaypalFields from './PayoutPaypalFields';

import * as Common from '../../helpers/common'

import prizeClaimPayPalImage from '../../assets/Images/prizeClaimPayPalImage.png'

const PayOutCheckBoxContainer = (props) => {
    const { theme, mainRef, childRef, handleBankCheckBox, handlePaypalCheckBox, isBankCheckBoxChecked, isPaypalCheckBoxChecked, setIsBankCheckBoxChecked, setIsPaypalCheckBoxChecked, fetchPaypalDetails, fetchBankDetails, paypalInitialValues, isPaypalUpdate, paypalEditId, bankInitialValues, isBankUpdate, bankEditId } = props;


    const CheckBoxContainer = ({ handleCheckBox, title, isCheckBoxChecked, image }) => {

        return (
            <Pressable style={styles.addressBoxConatiner(isCheckBoxChecked)} onPress={() => handleCheckBox()}>
                <CheckBox
                    style={[styles.payoutCheckBox, { transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }]}
                    tintColors={{ true: '#FFBD0A', false: theme.color }}
                    disabled={isCheckBoxChecked}
                    value={isCheckBoxChecked}
                    onValueChange={() => handleCheckBox()}
                    onCheckColor={theme.color}
                    boxType='square'
                    onFillColor='#FFBD0A'
                    // tintColor={theme.color}
                    onTintColor='#FFBD0A'
                />
                <View style={styles.textContainer}>
                    <Text style={styles.tansferText}>{title}</Text>
                    {
                        image &&
                        <View style={styles.paypalContainer}>
                            <Image style={styles.paypalImage} source={image} />
                        </View>
                    }
                </View>
            </Pressable>
        )
    };

    const styles = StyleSheet.create({
        CheckBoxesContainer: {
            gap: scale(8)
        },
        addressBoxConatiner(isCheckBoxChecked) {
            return {
                borderColor: isCheckBoxChecked ? ' rgba(255, 189, 10, 0.4975)' : theme.theme === 'dark' ? 'rgba(255,255,255,0.19)' : 'rgba(0,0,0,0.19)',
                backgroundColor: isCheckBoxChecked ? 'rgba(255, 189, 10, 0.15)' : null,
                borderWidth: scale(2),
                borderRadius: scale(6),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 64,
                paddingRight: scale(22),
                gap: scale(20)
            }
        },
        payoutCheckBox: {
            marginLeft: scale(22),
        },
        textContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1
        },
        tansferText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2.2),
            color: theme.color,
        },
        paypalContainer: {
            width: scale(38),
            height: scale(25),
            borderWidth: 0.78,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'rgba(0,0,0,0.1)',
            borderRadius: 3.5,
        },
        paypalImage: {
            width: scale(14),
            height: scale(16)
        },
        payoutFieldsContainer: {
            marginTop: scale(22)
        }
    });

    return (
        <View>
            <View style={styles.CheckBoxesContainer}>
                <CheckBoxContainer handleCheckBox={handleBankCheckBox} title={Common.prizeClaim.BankTransfer} isCheckBoxChecked={isBankCheckBoxChecked} image={null} />
                <CheckBoxContainer handleCheckBox={handlePaypalCheckBox} title={Common.prizeClaim.Paypal} isCheckBoxChecked={isPaypalCheckBoxChecked} image={prizeClaimPayPalImage} />
            </View>
            <View style={styles.payoutFieldsContainer}>
                {isBankCheckBoxChecked && <PayoutBankFields theme={theme} mainRef={mainRef} childRef={childRef} fetchBankDetails={fetchBankDetails} setIsBankCheckBoxChecked={setIsBankCheckBoxChecked} setIsPaypalCheckBoxChecked={setIsPaypalCheckBoxChecked} bankInitialValues={bankInitialValues} isBankUpdate={isBankUpdate} bankEditId={bankEditId} />}
                {isPaypalCheckBoxChecked && <PayoutPaypalFields theme={theme} mainRef={mainRef} childRef={childRef} fetchPaypalDetails={fetchPaypalDetails} setIsBankCheckBoxChecked={setIsBankCheckBoxChecked} setIsPaypalCheckBoxChecked={setIsPaypalCheckBoxChecked} paypalInitialValues={paypalInitialValues} isPaypalUpdate={isPaypalUpdate} paypalEditId={paypalEditId} bankEditId={bankEditId} />}
            </View>
        </View>


    )
}

export default PayOutCheckBoxContainer

