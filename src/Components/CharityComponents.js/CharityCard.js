import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

import CharityModal from './CharityModal';

import { fetchIndividualCharity } from '../../api/charityApi';

import { Url } from '../../helpers/routesApi';
import * as common from '../../helpers/common';

import { isEmptyArray } from '../../utils/utils';


const CharityCard = props => {
    const { id, CharityImgUrl, CharityName, DonationAmountDisplayed, CharityColor, isCharitySupported, onRefresh, scrollToTopRef, userToken } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [supportModalData, setSupportModalData] = useState([]);

    const handleModalVisible = async (id) => {
        let response = await fetchIndividualCharity({ id: id })
        !isEmptyArray(response) && setSupportModalData(response);
        setModalVisible(!modalVisible)
    };

    const styles = StyleSheet.create({
        charityCardContainer: {
            height: responsiveHeight(14),
            borderRadius: scale(6),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: CharityColor
        },
        charityCardItem1: {
            marginLeft: scale(20),
            flex: 0.3
        },
        charityCardImage: {
            width: scale(75),
            height: scale(75),
            borderRadius: scale(50),
        },
        charityCardItem2: {
            gap: scale(6),
            paddingLeft: scale(10),
            flex: 0.5
        },
        charityCardItem2Text1: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(2),
            color: '#FFFFFF'
        },
        charityCardItem2Text2: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.7),
            opacity: scale(0.7),
            color: '#FFFFFF',
        },
        charityCardItem2Text3: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3.1),
            color: '#FFFFFF',
        },
        charityCardItem3: {
            flex: 0.1
        },
        charityCardItem4: {
            marginRight: scale(18),
            flex: 0.1
        },
        modalClose: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalBackgroundOpacity: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
        },
    });

    return (
        <Pressable style={styles.charityCardContainer} onPress={() => handleModalVisible(id)} >
            <View style={styles.charityCardItem1}>
                <Image style={styles.charityCardImage} source={{ uri: `${Url.ImageUrl}${CharityImgUrl}`, }} />
            </View>
            <View style={styles.charityCardItem2}>
                <Text style={styles.charityCardItem2Text1} numberOfLines={1}>{CharityName}</Text>
                <Text style={styles.charityCardItem2Text2}>{common.charity.charityCard.totalRaised}</Text>
                <Text style={styles.charityCardItem2Text3}>£{DonationAmountDisplayed.toLocaleString('en-US')}</Text>
            </View>
            <View style={styles.charityCardItem3}></View>
            {
                userToken && 
                <View style={styles.charityCardItem4}>
                        <Ionicons name={common.common.arrowForward} size={30} color={'#FFFFFF'} />
                </View>
            }

            <Modal animationType={common.common.slide} transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(false); }}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalClose}>
                        <View style={styles.modalBackgroundOpacity}>
                            <CharityModal scrollToTopRef={scrollToTopRef} id={id} setModalVisible={setModalVisible} modalVisible={modalVisible} charityOrgName={supportModalData[0]?.CharityName} aboutOrganisation={supportModalData[0]?.CharityDescription} donationAmount={supportModalData[0]?.DonationAmountDisplayed} charityImage={supportModalData[0]?.CharityLogoImgUrl} modalBackgroundColor={supportModalData[0]?.CharityColor} charityUrl={supportModalData[0]?.CharityUrl} isCharitySupported={isCharitySupported} onRefresh={onRefresh} userToken={userToken} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </Pressable>
    );
};



export default CharityCard;
