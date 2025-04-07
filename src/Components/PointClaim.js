import { StyleSheet, Text, View, Image, ScrollView, KeyboardAvoidingView, } from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';

import ThemeContext from '../utils/themes/themeWrapper';
import Header from '../utils/Header';

import { Url } from '../helpers/routesApi';
import * as Common from '../helpers/common';

import Footer from './Footer';
import BottomButtonContainer from './ClaimSummaryComponents/BottomButtonContainer';
import DeliveryAddress from './ClaimSummaryComponents/DeliveryAddress';

import { updatePointsClaimWithLogin } from '../api/pointsStoreApi';
import { getCreditBalance, getStoreBalance } from "../ReduxToolKit/apiSlice";

const PointClaim = ({ route, navigation }) => {
    const { overViewData } = route.params;
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addressError, setAddressError] = useState(false);
    const [disableClaimButton, setDisableClaimButton] = useState(false)
    const scrollViewRef = useRef();

    const backArrowPress = () => navigation.goBack();

    const completeClaim = async () => {
        if (overViewData.store_item.item_type === 1 && !selectedAddressId) {
            setAddressError(true)
        }
        else {
            setDisableClaimButton(true)
            setAddressError(false)
            let dataObj = {
                item_id: overViewData.store_item.id,
                item_type: overViewData.store_item.item_type,
                item_address: overViewData.store_item.item_type === 1 ? selectedAddressId : 0
            }
            let response = await updatePointsClaimWithLogin(dataObj);
            if(response){
                dispatch(getStoreBalance());
                dispatch(getCreditBalance());
                setDisableClaimButton(false);
                navigation.navigate('PointConfirmation', { transactionId: response.transaction_id, confirmationOverViewData: response })
            }else{
                setDisableClaimButton(false);
            }
        }
    };

    useEffect(() => {
        selectedAddressId && setAddressError(false);
    }, [selectedAddressId])

    const scrollToTop = () => scrollViewRef.current.scrollTo({ y: 0, animated: true });

    // useFocusEffect(
    //     React.useCallback(() => {
    //         return () => {
    //             fetchAddressData();
    //             setIsUpdateAddress(false);
    //             setAddressInputShow(false);
    //             setAddNewDeliveryButtonHide(false);
    //             scrollToTop();
    //         };
    //     }, [])
    // );

    const styles = StyleSheet.create({
        keyboardAvoidingViewContainer:{
             backgroundColor: theme.background,
              flex: 1 
        },
        scrollViewContainer:{
            flexGrow:1
        },
        mainContainer: {
            flex: 1
        },
        container: {
            paddingHorizontal: scale(16)
        },
        firstSectionContainer: {
            marginTop: scale(25)
        },
        sectionHeaderTitle: {
             color: theme.color ,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            lineHeight: scale(22)
        },
        firstSectionCardMainContainer: {
            marginTop: scale(22),
            gap: scale(10)
        },
        firstSectionCardContainer: {
            flexDirection: 'row',
            gap: scale(11),
            alignItems: 'center'
        },
        firstSectionCardImageContainer: {
            height: scale(86),
            width: scale(74),
        },
        firstSectionCardImage: {
            resizeMode: 'contain',
            height: scale(86),
            width: scale(74)
        },
        firstSectionCardTitle: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            color: theme.color
        },
        horizontalLine: {
            borderColor: theme.color,
            borderWidth: scale(0.5),
            opacity: scale(0.1),
            height:scale(1)
        },
        overViewSectionContainer: {
            marginTop: scale(36),
            marginBottom: scale(150)
        },
        overViewClaimText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.7),
            color: theme.color,
            lineHeight: scale(22),
            marginTop: scale(15),
            opacity: scale(0.8)
        },
        overViewCardContainer: {
            flex: 1,
            marginTop: scale(8),
        },
        overViewCardContainer1: {
            flex: 1,
            flexDirection: 'row',
            gap: scale(12),
        },
        overViewCardTextContainer: {
            flex: 1,
        },
        deliveryContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        overViewCardTitle: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2.2),
            color: theme.theme === 'dark' ? '#FFBD0A' : '#00651C' ,
            lineHeight: scale(22),
        },
        overViewDeliveryText: {
            flex: 1,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2.2),
            color: theme.color,
            opacity: scale(0.69),
        },
        overViewDeliveryTextAlign:{
            textAlign:'right'
        }
    })

    return (
        <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset={-50} style={styles.keyboardAvoidingViewContainer}  >
            <ScrollView contentContainerStyle={styles.scrollViewContainer} ref={scrollViewRef}>
                <View style={styles.mainContainer}>
                    <Header title={Common.PointClaim.PointClaim} theme={theme} backArrowPress={backArrowPress} />
                    <View style={[styles.container]}>
                        <View style={styles.firstSectionContainer}>
                            <Text style={styles.sectionHeaderTitle}>{Common.PointClaim.YourPointClaimSummary}</Text>
                            <View style={styles.firstSectionCardMainContainer} >
                                <View style={styles.firstSectionCardContainer} >
                                    <View style={styles.firstSectionCardImageContainer}>
                                        <Image style={styles.firstSectionCardImage} source={{ uri: `${Url.ImageUrl}${overViewData.store_item.image}` }} />
                                    </View>
                                    <Text style={styles.firstSectionCardTitle}>{overViewData.store_item.item_name}</Text>
                                </View>
                                <View style={styles.horizontalLine}></View>
                            </View>
                        </View>
                        {
                            overViewData?.store_item.item_type === 1 &&
                            <DeliveryAddress scrollViewRef={scrollViewRef} theme={theme} scrollToTop={scrollToTop} storeItemId={overViewData.store_item.id} setSelectedAddressId={setSelectedAddressId} selectedAddressId={selectedAddressId} />
                        }
                        <View style={styles.overViewSectionContainer}>
                            <Text style={styles.sectionHeaderTitle}>{overViewData.store_item.item_type === 1 ? 3 : 2}{Common.PointClaim.Overview}</Text>
                            <Text style={styles.overViewClaimText}>{Common.PointClaim.PointClaim}</Text>
                            <View style={styles.overViewCardContainer}>
                                <View style={styles.overViewCardContainer1}>
                                    <Feather name={'check'} size={25} color={theme.theme === 'dark' ? '#FFBD0A' : '#00651C'} />
                                    <View style={styles.overViewCardTextContainer}>
                                        <View style={styles.deliveryContainer}>
                                            <Text style={styles.overViewCardTitle}>
                                                {overViewData.item_name}
                                            </Text>
                                            <Text style={[styles.overViewDeliveryText, styles.overViewDeliveryTextAlign]}>{overViewData.price}</Text>
                                        </View>
                                        <Text style={styles.overViewDeliveryText}>{overViewData.message}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {/* <Footer /> */}
            </ScrollView>
            <BottomButtonContainer theme={theme} completeClaim={completeClaim} title={'Complete Point Claim'} addressError={addressError} disableButton={disableClaimButton} isDataFetching={disableClaimButton} />
        </KeyboardAvoidingView>
    )
}

export default PointClaim;

