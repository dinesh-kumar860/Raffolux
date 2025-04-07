import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import SocialMediOptions from './SocialMediOptions';
import * as Common from '../../helpers/common';

const SocialMediaModal = (props) => {
    const { theme, modalVisible, setModalVisible } = props

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.theme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
            paddingHorizontal: scale(20),
            justifyContent: 'flex-end',
            flex: 1,
        },
        container2: {
            backgroundColor: theme.theme === 'light' ? '#FFF' : '#141628',
            elevation: scale(4),
            borderRadius: scale(11),
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: scale(21),
            marginHorizontal: scale(20)
        },
        header: {
            color: theme.theme === 'dark' ? '#FFF' : '#141628',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            alignSelf: 'center',
        },
        socialMediaAppContainer: {
            marginTop: scale(33),
            marginLeft: scale(22),
            marginRight: scale(20),
            justifyContent: 'space-around',
            gap: scale(28),
            flexWrap: 'wrap',
            flexDirection: "row",
            marginBottom: scale(50)
        }
    })
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <View style={styles.headerContainer}>
                    <View></View>
                    <Text style={styles.header}>{Common.Referral.ShareReferralCode}</Text>
                    <AntDesign style={styles.closeMark} name={'close'} color={theme.theme === 'dark' ? '#FFF' : '#141628'} size={22} onPress={()=>setModalVisible(!modalVisible)} />
                </View>
                <View style={styles.socialMediaAppContainer}>
                    {
                        Common.Referral.socialMediaApps?.map((ele, i) => (
                            <SocialMediOptions key={i} title={ele.title} image={ele.image} theme={theme} link={ele.link} />
                        ))
                    }
                </View>
            </View>

        </View>
    )
}

export default SocialMediaModal

