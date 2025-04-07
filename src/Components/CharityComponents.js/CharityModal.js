import React, { useState } from 'react';
import { Text, View, Pressable, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { updateCharityWithLogin } from '../../api/charityApi';

import { Url } from '../../helpers/routesApi';
import * as common from '../../helpers/common';
import { openLink } from '../../helpers/OpenBrowser';



const CharityModal = props => {
    const { setModalVisible, charityUrl, modalVisible, charityOrgName, aboutOrganisation, donationAmount, charityImage, modalBackgroundColor, id, isCharitySupported, onRefresh, scrollToTopRef, userToken } = props;
    const [disableButton, setDisableButton] = useState(false)

    const supportModal = async (id) => {
        setDisableButton(true)
        let response = await updateCharityWithLogin({ charity_id: id });
        setDisableButton(false)
        if (response == 200) {
            setModalVisible(!modalVisible);
            onRefresh();
            scrollToTopRef();
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: scale(10),
        },
        modalContainer: {
            backgroundColor: modalBackgroundColor,
            borderRadius: scale(12),
            textAlign: 'center',
            alignSelf: 'center',
        },
        xIcon: {
            alignSelf: 'flex-end',
            marginTop: scale(10),
            marginRight: scale(10),
        },
        flexContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: scale(10),
            marginTop: scale(10),
        },
        charityModalImage: {
            width: scale(90),
            height: scale(90),
        },
        OrgName: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            marginTop: scale(15),
            color: '#FFFFFF',
        },
        aboutOrg: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            marginHorizontal: scale(15),
            color: '#FFFFFF',
            opacity: scale(0.7),
        },
        totalRaisedContainer: {
            flexDirection: 'column',
            gap: scale(2),
            marginTop: scale(20),
        },
        totalRaisedText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.6),
            color: '#FFFFFF',
            opacity: scale(0.7),
        },
        totalRaisedAmount: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3.2),
            color: '#FFFFFF',
        },
        supportButtonContainer: {
            marginTop: scale(20),
            width: scale(225),
            marginBottom: scale(40),
        },
        supportButton: {
            padding: scale(13),
            backgroundColor: '#FFFFFF',
            borderRadius: scale(6),
        },
        supportButtonText: {
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            fontSize: responsiveFontSize(2.2),
            opacity: scale(0.8),
            color: '#000616'
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <View style={styles.xIcon}>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <Feather name={common.common.x} size={25} color={'#FFFFFF'} />
                    </Pressable>
                </View>
                <View style={styles.flexContainer}>
                    <Pressable onPress={() => openLink(charityUrl)}>
                        <Image source={{ uri: `${Url.ImageUrl}${charityImage}`, }} style={styles.charityModalImage} />
                    </Pressable>
                    <Text style={styles.OrgName} onPress={() => openLink(charityUrl)}>{charityOrgName}</Text>
                    <Text style={styles.aboutOrg}>{aboutOrganisation}</Text>
                    <View style={styles.totalRaisedContainer}>
                        <Text style={styles.totalRaisedText}>{common.charity.charityCard.totalRaised}</Text>
                        <Text style={styles.totalRaisedAmount}>£{parseInt((donationAmount)).toLocaleString()}</Text>
                    </View>

                    <View style={styles.supportButtonContainer}>
                        {
                            userToken &&
                            <TouchableOpacity style={styles.supportButton} disabled={disableButton} onPress={() => supportModal(id)}>
                             {disableButton ? <ActivityIndicator color={'#000'} /> :  <Text style={styles.supportButtonText}>{common.charity.charityModal.support}</Text>}
                            </TouchableOpacity>
                        }

                    </View>
                </View>
            </View>
        </View>
    );
};


export default CharityModal;
