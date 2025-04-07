import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import ThemeContext from '../../utils/themes/themeWrapper'


const AddNewClaimPayoutButton = (props) => {
    const { title, handleOnPress } = props
    const theme = useContext(ThemeContext)

    const styles = StyleSheet.create({
        container: {
            height: 40,
            borderWidth: 1.5,
            borderColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            color: theme.color,
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            opacity: 0.6
        }
    })

    return (
        <TouchableOpacity onPress={() => handleOnPress()}>
            <View style={styles.container} >
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AddNewClaimPayoutButton
