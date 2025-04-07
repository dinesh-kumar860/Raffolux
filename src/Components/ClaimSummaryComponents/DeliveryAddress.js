import { StyleSheet, Text, View, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

import { Formik } from 'formik';

import { addAddressWithLogin, deleteAddressDetailsWithLogin, displayAddressWithLogin, updateAddressDetailsWithLogin } from '../../api/pointsStoreApi';

import ClaimTextInputFields from './ClaimTextInputFields';
import ClaimLinearGradientButton from './ClaimLinearGradientButton';

import * as Common from '../../helpers/common'

import { scrollToElement } from '../../utils/ScrollToElement';
import { useInternet } from '../../utils/InternetConnection/InternetContextWrapper';
import { AddressValidationSchema } from '../../utils/AddressValidationSchema';


const DeliveryAddress = (props) => {
    const { theme, storeItemId, setSelectedAddressId, selectedAddressId, scrollViewRef } = props;
    const { isConnected } = useInternet();
    const [editId, setEditId] = useState(null);
    const [addressData, setAddressData] = useState([]);
    const [isUpdateAddress, setIsUpdateAddress] = useState(false);
    const [addressInputShow, setAddressInputShow] = useState(false);
    const [addNewDeliveryButtonHide, setAddNewDeliveryButtonHide] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isEditing2nd, setIsEditing2nd] = useState(false);
    const [isAddressDeleting, setIsAddressDeleting] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const deliveryRef = useRef(null);
    const addNewDeliveryRef = useRef(null);

    const initialValues = { fullName: '', phoneNumber: '', postCode: '', addressLine1: '', addressLine2: '', city: '' }

    const handleAddress = (id, values) => {
        setSelectedAddressId(id);
    };

    const handleSubmit = async (value, { resetForm }) => {
        try {
            await AddressValidationSchema.validate(value, { abortEarly: false });
        } catch (validationError) {
            console.error(validationError.errors);
            return;
        };

        let dataObj;
        if (isAdd) {
            dataObj = {
                full_name: value.fullName,
                phone_number: value.phoneNumber,
                post_code: value.postCode,
                address1: value.addressLine1,
                address2: value.addressLine2.trim().length === 0 ? ' ' : value.addressLine2,
                city: value.city
            };
        } else {
            dataObj = {
                userFullName: value.fullName,
                userPhoneNumber: value.phoneNumber,
                postCode: value.postCode,
                address1: value.addressLine1,
                address2: value.addressLine2.trim().length === 0 ? ' ' : value.addressLine2,
                town: value.city,
                addressId: editId
            };
        }
        const AddUpdateAddress = async (dataObj) => {
            setButtonDisabled(true)
            const response = isAdd ? await addAddressWithLogin(dataObj) : await updateAddressDetailsWithLogin(dataObj)
            if (response) {
                setButtonDisabled(false)
                resetForm();
                fetchAddressData();
                setIsUpdateAddress(false);
                setAddressInputShow(false);
                setAddNewDeliveryButtonHide(false);
                scrollToElement(scrollViewRef, deliveryRef);
                isAdd ? Toast.show('Added Successfully', Toast.SHORT) : Toast.show('Updated Successfully', Toast.SHORT)
            } else {
                setButtonDisabled(false)
            }
        }
        await AddUpdateAddress(dataObj)
    };

    const editAddress = (id, values, touched, index, setFieldTouched) => {
        index === 1 ? setIsEditing2nd(true) : setIsEditing2nd(false)
        Common.PointClaim.addressInputFields.forEach(ele => {
            setFieldTouched(ele.formikName, false);
        });
        setIsUpdateAddress(true);
        setAddressInputShow(true);
        setAddNewDeliveryButtonHide(true)
        setEditId(id);
        setSelectedAddressId(id);
        scrollToElement(scrollViewRef, addNewDeliveryRef)
        const selectedAddress = addressData?.find((ele) => ele.id === id);
        if (selectedAddress) {
            values.fullName = selectedAddress.full_name;
            values.phoneNumber = selectedAddress.phone_no;
            values.postCode = selectedAddress.post_code;
            values.addressLine1 = selectedAddress.address_line_1;
            values.addressLine2 = selectedAddress.address_line_2;
            values.city = selectedAddress.city;
        }
    };

    useLayoutEffect(() => {
        isUpdateAddress === true && addressInputShow && scrollToElement(scrollViewRef, addNewDeliveryRef)
    }, [addressInputShow]);

    useEffect(() => {
        if (addNewDeliveryButtonHide) {
            setTimeout(() => {
                scrollToElement(scrollViewRef, addNewDeliveryRef);
            }, 0);
        }
    }, [addNewDeliveryButtonHide]);

    const addNewDeliveryAddress = (setFieldTouched, setValues) => {
        const emptyValues = {};
        Common.PointClaim.addressInputFields.forEach(ele => {
            emptyValues[ele.formikName] = "";
            setFieldTouched(ele.formikName, false);
        });
        setValues(emptyValues);
        setAddressInputShow(true);
        setAddNewDeliveryButtonHide(true)
    };

    const deleteAddress = async (id,setFieldTouched,setValues) => {
        setSelectedAddressId(id)
        setIsAddressDeleting(true)
        let response = await deleteAddressDetailsWithLogin({ addressId: id });
        if (response) {
            setIsAddressDeleting(false)
            if (response.status === 200) {
                const emptyValues = {};
                Common.PointClaim.addressInputFields.forEach(ele => {
                    emptyValues[ele.formikName] = "";
                    setFieldTouched(ele.formikName, false);
                });
                setValues(emptyValues);
                fetchAddressData();
                setIsUpdateAddress(false);
                setAddressInputShow(false);
                setAddNewDeliveryButtonHide(false);
                scrollToElement(scrollViewRef, deliveryRef);
                Toast.show('Deleted Successfully', Toast.SHORT)
            }
        } else {
            setIsAddressDeleting(false)
        }
    };

    const fetchAddressData = async () => {
        let response = await displayAddressWithLogin();
        if (response) {
            setAddressData(response);
            setSelectedAddressId(response[0]?.id)
            !isEditing2nd && setSelectedAddressId(response[0]?.id)
            isEditing2nd && setSelectedAddressId(response[1]?.id)
        };
    }

    useEffect(() => {
        if (isConnected) {
            fetchAddressData();
            setIsEditing2nd(false)
        }
    }, [storeItemId, isConnected]);


    useFocusEffect(
        React.useCallback(() => {
            return () => {
                if (isConnected) {
                    fetchAddressData();
                    setIsUpdateAddress(false);
                    setAddressInputShow(false);
                    setAddNewDeliveryButtonHide(false);
                    setIsEditing2nd(false)
                }
            };
        }, [isConnected])
    );

    const styles = StyleSheet.create({
        secondSectionContainer: {
            marginTop: scale(24),
            gap: scale(8)
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
            fontSize: responsiveFontSize(2)
        },
        addressBoxesMainContainer: {
            gap: scale(16)
        },
        addressBoxConatiner(id) {
            return {
                borderWidth: scale(2),
                borderRadius: scale(6),
                borderColor: id === selectedAddressId ? 'rgba(255, 189, 10, 0.5)' : theme.theme === 'dark' ? 'rgba(255,255,255,0.19)' : 'rgba(0,0,0,0.19)',
                backgroundColor: id === selectedAddressId ? 'rgba(255, 189, 10, 0.15)' : null
            }
        },
        addressBoxContainer1: {
            flexDirection: 'row',
            alignItems: "center"
        },
        xMark: {
            marginTop: scale(11),
            marginRight: scale(11),
            color: theme.theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#1C1C27',
            alignSelf: 'flex-start'
        },
        xMarkAddressContainer: {
            flex: 1,
            flexDirection: 'row',
        },
        checkBox: {
            marginLeft: scale(30),
        },
        addressContainer: {
            marginTop: scale(23),
            gap: scale(5),
            flex: 1,
        },
        addressText(id) {
            return {
                fontFamily: 'NunitoSans-SemiBold',
                fontSize: responsiveFontSize(2),
                color: id === selectedAddressId && theme.theme === 'dark' ? '#FFF' : theme.theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#1C1C27',
                marginLeft: scale(30),
                marginRight: scale(11),
            }
        },
        addressTextFontSize: {
            fontSize: responsiveFontSize(2.2)
        },
        newAddressText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            color: theme.color,
            marginVertical: scale(22)
        },
        addressEditMainContainer: {
            alignSelf: "flex-end",
            marginRight: scale(20),
            marginBottom: scale(20),
        },
        addressEditContainer: {
            paddingHorizontal: scale(15),
            paddingVertical: scale(5),
            borderRadius: scale(4)
        },
        inputFieldMainContainer: {
            gap: scale(8)
        },
        saveAddressButton: {
            height: scale(44),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: scale(6),
            marginTop: scale(22)
        },
        buttonText: {
            color: '#1C1C27',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            lineHeight: scale(15)
        },
        buttonTextFontSize: {
            fontSize: responsiveFontSize(1.8)
        }
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={AddressValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, setValues }) => (
                <View style={styles.secondSectionContainer} ref={deliveryRef} >
                    <Text style={styles.sectionHeaderTitle} >{Common.PointClaim.DeliveryDetails}</Text>
                    <Text style={[styles.deliveryAddressSubText, styles.deliveryAddressSubTextFontSize]}>{Common.PointClaim.WhatAddressWouldYouLikeUs}</Text>
                    {
                        addressData?.length > 0 &&
                        <View>
                            <Text style={styles.deliveryAddressSubText}>{Common.PointClaim.RecentlyUsed}</Text>
                            <View style={styles.addressBoxesMainContainer}>
                                {
                                    addressData?.slice(0, 2).map((ele, i) => (
                                        <Pressable style={styles.addressBoxConatiner(ele.id)} key={ele.id} onPress={() => handleAddress(ele.id, values)} >
                                            <View style={styles.addressBoxContainer1}>
                                                <CheckBox
                                                    style={[styles.checkBox, { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }]}
                                                    tintColors={{ true: '#FFBD0A', false: theme.theme === 'dark' ? 'rgba(255,255,255,0.5)' : '#1C1C27' }}
                                                    onCheckColor={theme.background}
                                                    disabled={ele.id === selectedAddressId}
                                                    value={ele.id === selectedAddressId}
                                                    onValueChange={() => handleAddress(ele.id, values)}
                                                    boxType='square'
                                                    onFillColor='#FFBD0A'
                                                    // tintColor={theme.color}
                                                    onTintColor='#FFBD0A'
                                                />
                                                <View style={styles.xMarkAddressContainer}>
                                                    <View style={styles.addressContainer}>
                                                        <Text style={[styles.addressText(ele.id), styles.addressTextFontSize]}>{ele.full_name}</Text>
                                                        <Text style={styles.addressText(ele.id)}>{ele.phone_no}</Text>
                                                        <Text style={styles.addressText(ele.id)}>{ele.post_code}</Text>
                                                        <Text style={styles.addressText(ele.id)}>{ele.address_line_1}</Text>
                                                        {ele.address_line_2.trim().length > 0 && <Text style={styles.addressText(ele.id)}>{ele.address_line_2}</Text>}
                                                        <Text style={styles.addressText(ele.id)}>{ele.city}</Text>
                                                    </View>
                                                    {isAddressDeleting && selectedAddressId == ele.id ? <ActivityIndicator color={theme.color} style={styles.xMark} /> : <Ionicons style={styles.xMark} name='close' size={20} onPress={() => deleteAddress(ele.id,setFieldTouched,setValues)} />}
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => editAddress(ele.id, values, touched, i, setFieldTouched)} style={styles.addressEditMainContainer}>
                                                <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.addressEditContainer}>
                                                    <Text style={[styles.buttonText, styles.buttonTextFontSize]}>{Common.PointClaim.Edit}</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </Pressable>
                                    ))
                                }
                            </View>
                            {
                                !addNewDeliveryButtonHide && <ClaimLinearGradientButton handleOnPress={() => addNewDeliveryAddress(setFieldTouched, setValues)} title={Common.PointClaim.AddNewDeliveryAddress} />
                            }
                        </View>
                    }
                    {
                        addressData?.length == 0 || addressInputShow ?
                            <>
                                <Text style={styles.newAddressText} ref={addNewDeliveryRef} >{Common.PointClaim.Addnewdeliveryaddress}</Text>
                                <View style={styles.inputFieldMainContainer} >
                                    {
                                        Common.PointClaim.addressInputFields?.map((ele, i) => (
                                            <ClaimTextInputFields key={i} theme={theme} title={ele.name} formikName={ele.formikName} touched={touched} errors={errors} values={values} handleChange={handleChange} handleBlur={handleBlur} />
                                        ))
                                    }
                                </View>
                                <ClaimLinearGradientButton handleOnPress={!isUpdateAddress ? () => { handleSubmit(); setIsAdd(true) } : () => { handleSubmit(); setIsAdd(false) }} title={!isUpdateAddress ? `${Common.PointClaim.SaveThisAddress}` : `${Common.PointClaim.UpdateAddress}`} disabled={buttonDisabled} />
                            </> : null
                    }
                </View>
            )}
        </Formik>
    )
}

export default memo(DeliveryAddress)

