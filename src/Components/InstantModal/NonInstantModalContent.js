import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import SvgUri from 'react-native-svg-uri'

const NonInstantModalContent = (props) => {
    const {setModalVisible, modalVisible, viewBackgroundColor} = props;

    const styles = StyleSheet.create({
        ModalFirstContainer: {
            position: 'relative'
        },
        HeaderWithClose: {
            marginTop: scale(28),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalHeaderText: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.6),
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            left: scale(30)
        },
    })

    return (
        <>
        <View style={styles.ModalFirstContainer}>
            <View style={styles.HeaderWithClose}>
                <View style={{ width: scale(330), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.modalHeaderText}>Select your tickets</Text>
                </View>
                <View style={{paddingRight: scale(50)}}>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <SvgUri width={20} height={20} source={require('../../assets/Images/close.svg')} />
                    </Pressable>
                </View>
            </View>

            <View style={{ borderBottomColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.2)' : 'rgba(255, 255, 255, 0.2)', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: scale(20), marginBottom: scale(40) }} />
        </View>
        </>
    )
}

export default NonInstantModalContent