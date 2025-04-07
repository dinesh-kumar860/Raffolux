import { StyleSheet, Text, View, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { memo, useEffect, useRef, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';

import { deleteBankDetailsWithLogin, deletePaypalDetailsWithLogin } from '../../api/PrizeSummaryApi';
import PayOutCheckBoxContainer from './PayOutCheckBoxContainer';

import { scrollToElement } from '../../utils/ScrollToElement';
import { useInternet } from '../../utils/InternetConnection/InternetContextWrapper';

import * as Common from '../../helpers/common'


const PayOutSection = (props) => {
    const { theme, scrollViewRef, setSelectedPayoutId, selectedPayoutId, isAddressShow, fetchBankDetails, fetchPaypalDetails, paypalData, bankData } = props;
    const { isConnected } = useInternet();
    const [isBankCheckBoxChecked, setIsBankCheckBoxChecked] = useState(false);
    const [isPaypalCheckBoxChecked, setIsPaypalCheckBoxChecked] = useState(false);
    const [paypalEditId, setPaypalEditId] = useState(null);
    const [bankEditId, setBankEditId] = useState(null)
    const [isPaypalUpdate, setIsPaypalUpdate] = useState(false);
    const [isBankUpdate, setIsBankUpdate] = useState(false);
    const [paypalInitialValues, setPaypalInitialValues] = useState({ email: '' });
    const [bankInitialValues, setBankInitialValues] = useState({ fullName: '', sortCode: '', accountNumber: '' })
    const [isPayoutDeleting, setisPayoutDeleting] = useState(false)

    const payoutRef = useRef(null)
    const addNewPayoutRef = useRef(null)

    const handlePayoutBox = (id) => setSelectedPayoutId(id);

    const scrollToPayoutRef = () => scrollToElement(scrollViewRef, addNewPayoutRef);

    const handleCheckBox = (isBank) => {
        setIsBankCheckBoxChecked(isBank);
        setIsPaypalCheckBoxChecked(!isBank);
        setPaypalInitialValues({ email: '' });
        setBankInitialValues({ fullName: '', sortCode: '', accountNumber: '' });
        setIsPaypalUpdate(false);
        setIsBankUpdate(false);
        scrollToPayoutRef();
    };

    const handleEdit = (id, isBank) => {
        const prefix = isBank ? `${Common.prizeClaim.bank_}` : `${Common.prizeClaim.paypal_}`;
        setSelectedPayoutId(`${prefix}${id}`);
        setIsBankCheckBoxChecked(isBank);
        setIsPaypalCheckBoxChecked(!isBank);

        if (isBank) {
            setBankEditId(id);
            setIsBankUpdate(true);
            bankData?.forEach((ele) => {
                if (ele.id === id) {
                    bankInitialValues.fullName = ele.bank_name;
                    bankInitialValues.sortCode = ele.sort_code;
                    bankInitialValues.accountNumber = ele.account_number;
                }
            });
        } else {
            setPaypalEditId(id);
            setIsPaypalUpdate(true);
            paypalData?.forEach((ele) => {
                if (ele.id === id) {
                    paypalInitialValues.email = ele.mail_id;
                }
            });
        }

        scrollToPayoutRef();
    };

    const handleDelete = async (id, isBank) => {
        setisPayoutDeleting(true);
        setSelectedPayoutId(`${isBank ? `${Common.prizeClaim.bank_}` : `${Common.prizeClaim.paypal_}`}${id}`);

        let response;

        if (isBank) {
            response = await deleteBankDetailsWithLogin({ bankId: id });
            fetchBankDetails();
        } else {
            response = await deletePaypalDetailsWithLogin({ payPalId: id });
            fetchPaypalDetails();
        }

        if (response === 200) {
            setisPayoutDeleting(false);
            setIsBankCheckBoxChecked(false);
            setIsPaypalCheckBoxChecked(false);
            setSelectedPayoutId(null);
            scrollToElement(scrollViewRef, payoutRef);
            Toast.show('Deleted Successfully', Toast.SHORT)
        } else {
            setisPayoutDeleting(false);
        }
    };

    const handleBankCheckBox = () => handleCheckBox(true);
    const handlePaypalCheckBox = () => handleCheckBox(false);


    useEffect(() => {
        if (isConnected) {
            fetchPaypalDetails();
            fetchBankDetails();
        }
    }, [isConnected]);

    const BankDetailsContainer = ({ ele,type, id, mainText, subText, handlePayout, editpayout, deletePayout }) => {
        return (
            <Pressable style={styles.addressBoxConatiner(type, id)} onPress={() => handlePayout(`${type}${id}`)} >
                {
                    isPayoutDeleting && `${type}${id}` === selectedPayoutId ?
                        <ActivityIndicator color={theme.color} style={styles.payoutXmark} />
                        :
                        <Ionicons style={styles.payoutXmark} name='close' size={20} onPress={() => deletePayout(id, type == Common.prizeClaim.bank_ ? true : false)} />
                }
                <View style={styles.payoutTextCheckBoxContainer}>
                    <CheckBox
                        style={[styles.payoutCheckBox, { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }]}
                        tintColors={{ true: '#FFBD0A', false: theme.color }}
                        onCheckColor={theme.color}
                        // disabled={false}
                        value={`${type}${id}` === selectedPayoutId}
                        onValueChange={() => handlePayout(`${type}${id}`)}
                        boxType='square'
                        onFillColor='#FFBD0A'
                        // tintColor={theme.color}
                        onTintColor='#FFBD0A'
                    />
                    <View style={styles.bankTextContainer}>
                        <Text style={styles.bankText1}>{mainText}</Text>
                        {
                            subText && <Text style={styles.bankText2}>{subText}</Text>
                        }
                    </View>
                </View>
                <TouchableOpacity style={styles.bankEditMainContainer} onPress={() => editpayout(id, type == Common.prizeClaim.bank_ ? true : false)}>
                    <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.addressEditContainer}>
                        <Text style={styles.buttonText}>{Common.prizeClaim.Edit}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Pressable>
        )
    };

    const styles = StyleSheet.create({
        payoutSectionContainer: {
            marginTop: scale(28),
        },
        payoutXmark: {
            alignSelf: 'flex-end',
            marginRight: scale(11),
            color: theme.theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#1C1C27'
        },
        payoutTextCheckBoxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(15)
        },
        bankTextContainer: {
            flex: 1,
            marginRight: scale(40)
        },
        bankText1: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(2.2),
            color: theme.color,
        },
        bankText2: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            opacity: scale(0.8),
            flex: 1,
        },
        bankEditMainContainer: {
            alignSelf: 'flex-end',
            marginRight: scale(11),
            marginTop: scale(12)
        },
        sectionHeaderTitle: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            lineHeight: scale(22)
        },
        deliveryAddressSubText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            color: theme.color,
            lineHeight: scale(22),
            opacity: scale(0.7),
        },
        deliveryAddressSubTextFontSize: {
            fontSize: responsiveFontSize(2),
            marginTop: scale(8)
        },
        deliveryAddressSubTextMargin: {
            marginTop: scale(22),
            marginBottom: scale(8)
        },
        paypalContainer: {
            gap: scale(15)
        },
        addressBoxesMainContainer: {
            gap: scale(16)
        },
        addressBoxConatiner(type, id) {
            return {
                borderColor: `${type}${id}` === selectedPayoutId ? 'rgba(255, 189, 10, 0.5)' : theme.theme === 'dark' ? 'rgba(255,255,255,0.19)' : 'rgba(0,0,0,0.19)',
                backgroundColor: `${type}${id}` === selectedPayoutId ? 'rgba(255, 189, 10, 0.15)' : null,
                paddingTop: scale(11),
                paddingBottom: scale(19),
                borderWidth: scale(2),
                borderRadius: scale(6),
            }
        },
        payoutCheckBox: {
            marginLeft: scale(22),
        },
        addressEditContainer: {
            paddingHorizontal: scale(15),
            paddingVertical: scale(5),
            borderRadius: scale(4)
        },
        buttonText: {
            color: '#1C1C27',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            lineHeight: scale(15)
        },
        newAddressText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            color: theme.color,
            marginTop: scale(22),
            marginBottom: scale(10)
        },
        payoutCheckBoxContainerStyle: {
            gap: scale(8)
        }
    })


    return (
        <View style={styles.payoutSectionContainer} ref={payoutRef}>
            <Text style={styles.sectionHeaderTitle}>{isAddressShow == false ? `${Common.prizeClaim.two}` : `${Common.prizeClaim.three}`}{Common.prizeClaim.PayoutDetails}</Text>
            <Text style={[styles.deliveryAddressSubText, styles.deliveryAddressSubTextFontSize]}>{Common.prizeClaim.WhatBankAccountOrPaypalAddressWouldYouLikeUsToSendYourWinningsTo}</Text>
            {
                paypalData?.length > 0 || bankData?.length > 0 ?
                    <>
                        <Text style={[styles.deliveryAddressSubText, styles.deliveryAddressSubTextMargin]}>{Common.prizeClaim.RecentlyUsed}</Text>
                        <View style={styles.paypalContainer}>
                            {
                                paypalData?.length > 0 && paypalData?.slice(0, 2).map((ele, i) => (
                                    <BankDetailsContainer key={i} ele={ele} type={Common.prizeClaim.paypal_} id={ele.id} mainText={ele.mail_id} subText={null} handlePayout={handlePayoutBox} editpayout={handleEdit} deletePayout={handleDelete} />
                                ))
                            }
                            {
                                bankData?.length > 0 && bankData?.slice(0, 2).map((ele, i) => (
                                    <BankDetailsContainer key={i} ele={ele} type={Common.prizeClaim.bank_} id={ele.id} mainText={ele.bank_name} subText={`${Common.prizeClaim.Accountnumberending} ${ele.account_number.slice(-4)}`} handlePayout={handlePayoutBox} editpayout={handleEdit} deletePayout={handleDelete} />
                                ))
                            }
                        </View>
                    </>
                    :
                    null
            }

            <Text style={styles.newAddressText} ref={addNewPayoutRef}>{Common.prizeClaim.Addnewpayoutdetails}</Text>
            <View style={styles.payoutCheckBoxContainerStyle}>
                <PayOutCheckBoxContainer theme={theme} mainRef={scrollViewRef} childRef={payoutRef} setIsBankCheckBoxChecked={setIsBankCheckBoxChecked} isBankCheckBoxChecked={isBankCheckBoxChecked} setIsPaypalCheckBoxChecked={setIsPaypalCheckBoxChecked} isPaypalCheckBoxChecked={isPaypalCheckBoxChecked} handleBankCheckBox={handleBankCheckBox} handlePaypalCheckBox={handlePaypalCheckBox} fetchPaypalDetails={fetchPaypalDetails} fetchBankDetails={fetchBankDetails} paypalInitialValues={paypalInitialValues} isPaypalUpdate={isPaypalUpdate} paypalEditId={paypalEditId} bankInitialValues={bankInitialValues} isBankUpdate={isBankUpdate} bankEditId={bankEditId} />
            </View>
        </View>

    )
}

export default memo(PayOutSection)

