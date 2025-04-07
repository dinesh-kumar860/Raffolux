import { View, Text, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import React, { useContext, useState } from 'react';
import * as Common from '../../helpers/common';
import { AuthContext } from '../../Context/AuthContext'
import { scale } from 'react-native-size-matters';
import { DrawerActions, useNavigation } from '@react-navigation/native';


const Logout = () => {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext);
    
    return (
        <View style={{ flex: 1 }} >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{'Are you sure you want to logout?'}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: scale(150), paddingVertical: scale(5) }}>

                        <TouchableHighlight activeOpacity={1}
                            style={styles.buttonClose}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.textStyle}>{Common.Home.No}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight activeOpacity={1}
                            style={styles.button}
                            onPress={() => logout()}
                        >
                            <Text style={styles._textStyle}>{Common.Home.Yes}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#1c1c27'
    },
    modalView: {
        margin: 20,
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 60,
        alignItems: "center",
        // shadowColor: "#ffb005b0",
        // shadowOffset: {
        //     width: 0,
        //     height: 2
        // },
        // shadowRadius: 4,
        // elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#ffb005b0'
    },
    buttonClose: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#000",
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'Gilroy-Medium',

    },

    _textStyle: {
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'Gilroy-Medium',

    },

    modalText: {
        color: "#000",
        fontSize: scale(15),
        fontFamily: 'Gilroy-Medium',
        marginBottom: scale(10),
        textAlign: "center",
        lineHeight: scale(20)
    }
});

export default Logout