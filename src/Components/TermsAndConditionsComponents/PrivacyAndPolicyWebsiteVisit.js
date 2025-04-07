import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/AntDesign';

import { openLink } from '../../helpers/OpenBrowser';


const PrivacyAndPolicyWebsiteVisit = (props) => {
    const { theme, url, title } = props;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.theme === 'dark' ? '#141628' : '#FFFFFF',
            borderWidth: scale(1),
            borderRadius: scale(11),
            borderColor:  theme.theme === 'dark' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)',
            gap: scale(15),
            paddingLeft: scale(20),
            paddingVertical: scale(20),
        },
        text: {
            fontFamily: 'NunitoSans-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            lineHeight: scale(22),
            letterSpacing: scale(0.5),
            opacity: scale(0.8),
            color:  theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.90)' :'rgba(0, 6, 22, 0.90)',
            paddingRight: scale(33)
        },
        buttonContainer: {
            width: 96,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.theme === 'dark' ? 'rgba(0, 6, 22, 0.50)'  :   'rgba(0, 6, 22, 0.05)',
            flexDirection: 'row',
            gap: scale(17),
            borderRadius: scale(5.714)
        },
        buttonText: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(2),
            color: theme.color
        }
    
    })
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <Pressable style={styles.buttonContainer} onPress={()=>openLink(url)}>
                <Text style={styles.buttonText}>visit</Text>
                <AntDesign name={'caretright'} color={ theme.theme === 'dark' ? 'rgba(255,255,255,0.6)' :'rgba(0,0,0,0.6)'} size={12} />
            </Pressable>
        </View>
    )
}

export default PrivacyAndPolicyWebsiteVisit

