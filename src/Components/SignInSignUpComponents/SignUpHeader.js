import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const SignUpHeader = (props) => {
    const { title,theme } = props;
    const navigation = useNavigation();

    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
        },
        headerTextContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: "center",
        },
        headerText: {
            color: theme.color,
            fontSize: responsiveFontSize(3),
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            opacity: scale(0.9),
            marginHorizontal: scale(25)
        },
    });

    return (
        <View style={styles.headerContainer} >
            {
                title === 'Verify your account to claim your FREE BONUS' ? null : <Feather name={'chevron-left'} size={25} color={theme.color} onPress={() => navigation.goBack()} />
            }

            <View style={styles.headerTextContainer}>
                {
                    title === 'Verify your account to claim your FREE BONUS' ? <Text style={styles.headerText}>Verify your account to claim your <Text style={{ color: '#FFBD0A' }}>FREE BONUS</Text></Text> : <Text style={styles.headerText}>{title}</Text>
                }
            </View>
        </View>
    )
}

export default SignUpHeader

