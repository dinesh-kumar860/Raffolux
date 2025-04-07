import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { capitalizeFirstLetter } from '../../helpers/CapitalizeFirstLetter';
import * as common from '../../helpers/common';
import { Url } from '../../helpers/routesApi';
import { isEmptyObject } from '../../utils/utils';

import { fetchPointsClaimWithLogin } from '../../api/pointsStoreApi';

import xMarkStoreModal from '../../assets/Images/xMarkStoreModal.png'
import StorePageRaffoluxSymbol from '../../assets/Images/StorePageRaffoluxSymbol.png'


const StoreModal = (props) => {
    const navigation = useNavigation()
    const { modalVisible, setModalVisible, modalData, storeBalance, userName, difference, fetchPointsStoreBalance } = props;
    const [success, setSuccess] = useState(false);
    const [isDataFetching, setIsDataFetching] = useState(false)

    const closeModal = () => setModalVisible(false)

    const redeemButton = () => setSuccess(true);

    const handleClaimPrize = async (id) => {
        setIsDataFetching(true)
        let response = await fetchPointsClaimWithLogin({ "item_id": id });
        if (response) {
            setIsDataFetching(false)
            !isEmptyObject(response) && navigation.navigate('PointClaim', { overViewData: response });
            !isEmptyObject(response) && closeModal();
        } else {
            setIsDataFetching(false)
        }

    };

    const styles = StyleSheet.create({
        container: {
            gap: scale(12),
            backgroundColor: '#FFF',
            borderRadius: scale(6)
        },
        imageMainConatiner: {
            flexDirection: 'row',
            backgroundColor: modalData.color
        },
        imageContainer: {
            flex: 1,
            height: scale(200),
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalImage: {
            resizeMode: 'contain',
            height: scale(200),
            width: scale(170),
        },
        xIconContainer: {
            marginTop: scale(10),
            marginRight: scale(10),
            width: scale(25),
            height: scale(25),
            alignItems: 'center',
            justifyContent: 'center',
        },
        xIcon: {
            width: scale(14),
            height: scale(14),
            resizeMode: 'contain'
        },
        modalTitle: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            textAlign: 'center',
            marginTop: scale(8)
        },
        raffoluxImageRpContainer: {
            backgroundColor: "#000616",
            padding: scale(4),
            paddingHorizontal: scale(4),
            flexDirection: 'row',
            borderRadius: scale(10),
            gap: scale(3.5),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: scale(20),
            alignSelf: "center"
        },
        raffoluxSymbol: {
            resizeMode: "contain",
            width: scale(12),
            height: scale(12)
        },
        raffoluxPointNumber: {
            color: '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
        },
        horizontalLine: {
            borderColor: '#000',
            borderWidth: scale(0.5),
            opacity: scale(0.1),
            marginHorizontal: scale(25),
            marginTop: scale(3),
            height: scale(1)
        },
        modalSubText: {
            fontFamily: 'NunitoSans-SemiBold',
            marginHorizontal: scale(26),
            textAlign: 'center',
            fontSize: responsiveFontSize(2),
            lineHeight: scale(21),
            opacity: scale(0.8),
            color: '#000616',
            marginTop: scale(4)
        },
        modalRaffoluxSymbol: {
            width: scale(13),
            height: scale(13)
        },
        redemptionContainer: {
            backgroundColor: 'rgba(0,0,0,0.1)',
            flexDirection: 'row',
            paddingVertical: scale(6),
            paddingHorizontal: scale(13),
            borderRadius: 12,
            alignSelf: 'center',
        },
        redemptionContainerMargin: {
            marginTop: scale(8)
        },
        redText: {
            color: 'red'
        },
        redemptionText: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5)
        },
        buttonContainer: {
            paddingVertical: scale(13),
            marginHorizontal: scale(25),
            borderRadius: 4,
            marginTop: scale(14)
        },
        RedeemButton: {
            textAlign: 'center',
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.7),
        },
        cancelButton: {
            textAlign: 'center',
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.7),
            marginBottom: scale(32),
            marginTop: scale(8),
            opacity: scale(0.6)
        },
        successModalSubText: {
            fontFamily: 'NunitoSans-SemiBold',
            marginHorizontal: scale(26),
            textAlign: 'center',
            fontSize: responsiveFontSize(2),
            lineHeight: scale(21),
            opacity: scale(0.8),
            color: '#000616'
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.imageMainConatiner}>
                <View style={styles.imageContainer}>
                    <Image style={styles.modalImage} source={{ uri: `${Url.ImageUrl}${modalData.image}`, }} />
                </View>
                <Pressable style={styles.xIconContainer} onPress={() => closeModal()}>
                    <Image style={styles.xIcon} source={xMarkStoreModal} />
                </Pressable>
            </View>
            {
                !success && <><Text style={styles.modalTitle}>{modalData.item_name}</Text>
                    <View style={styles.raffoluxImageRpContainer}>
                        <Image style={styles.raffoluxSymbol} source={StorePageRaffoluxSymbol} />
                        <Text style={styles.raffoluxPointNumber}>{(Number(modalData.point_prize) - Number(modalData.descounted_point_prize)).toLocaleString()} {common.common.RP}</Text>
                    </View>
                    <View style={styles.horizontalLine}></View>

                    {
                        Number(storeBalance) >= (Number(modalData.point_prize) - Number(modalData.descounted_point_prize)) ?
                            <>
                                <Text style={styles.modalSubText}>{common.pointsStore.WouldYouLikeToRedeem} {modalData.item_name} {common.pointsStore.using} {(Number(modalData.point_prize) - Number(modalData.descounted_point_prize)).toLocaleString()} {common.common.RP}?</Text>
                                <View style={styles.redemptionContainer}>
                                    <Text style={styles.redemptionText}>{common.pointsStore.BalanceAfterRedemption}  </Text>
                                    <Image style={styles.modalRaffoluxSymbol} source={StorePageRaffoluxSymbol} />
                                    <Text style={styles.redemptionText}> {Number(storeBalance) - (Number(modalData.point_prize) - Number(modalData.descounted_point_prize))} {common.common.RP}</Text>
                                </View>
                                <TouchableOpacity onPress={() => redeemButton(modalData.id)} >
                                    <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.buttonContainer}>
                                        <Text style={styles.RedeemButton}>{common.pointsStore.Redeem}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </>
                            :
                            <>
                                <View style={styles.redemptionContainer}>
                                    <Text style={[styles.redemptionText, styles.redText]}>{common.pointsStore.YouDontHaveEnoughPointsToClaim}</Text>
                                </View>
                                <TouchableOpacity disabled={true} >
                                    <LinearGradient colors={['rgba(255, 215, 13, 0.4)', 'rgba(255, 174, 5, 0.4)']} style={styles.buttonContainer}>
                                        <Text style={styles.RedeemButton}>{common.pointsStore.Redeem}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </>
                    }

                    <Text style={styles.cancelButton} onPress={() => closeModal()}>{common.common.Cancel}</Text></>
            }
            {
                success && <>
                    <Text style={styles.modalTitle}>{common.common.congratulations} {capitalizeFirstLetter(userName)}</Text>
                    <Text style={styles.successModalSubText}>{common.pointsStore.YourNewlyRedeemedPrize} {modalData.item_name}</Text>
                    <View style={[styles.redemptionContainer, styles.redemptionContainerMargin]}>
                        <Text style={styles.redemptionText}>{common.pointsStore.EarnExtraRP}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { handleClaimPrize(modalData.id) }} >
                        <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.buttonContainer}>
                            {
                                isDataFetching ? <ActivityIndicator color={'#000616'} /> : <Text style={styles.RedeemButton}>{common.pointsStore.ClaimPrize}</Text>
                            }
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.cancelButton} onPress={() => closeModal()}>{common.pointsStore.BackToStore}</Text>
                </>
            }
        </View>
    )
}

export default StoreModal

