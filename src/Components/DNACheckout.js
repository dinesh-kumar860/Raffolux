import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from '../utils/themes/themeWrapper'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';


const DNACheckout = () => {
    const theme = useContext(ThemeContext);


    const styles = StyleSheet.create({
        container: {
            // flex:1,
            backgroundColor: theme.theme == 'dark' ? '#141729' : '#FFF',
        },
        closeIconContainer: {
            alignSelf: 'flex-end'
        },
        closeIcon: {
            color: theme.theme == 'light' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
            marginTop: responsiveHeight(2),
            marginRight: responsiveHeight(2),
        },
        headerText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            textAlign:'center'
        }
    })


    return (
        <View style={styles.container}>
            <Pressable style={styles.closeIconContainer}>
                <Ionicons name={'close'} size={25} style={styles.closeIcon} />
            </Pressable>
            <Text style={styles.headerText}>Payment</Text>
        </View>
    )
}

export default DNACheckout

