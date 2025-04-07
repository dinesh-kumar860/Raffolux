import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../../utils/themes/themeWrapper';


const ForgotPasswordHeader = (props) => {
    const navigation = useNavigation();
    const theme= useContext(ThemeContext)
    const { title } = props;

    const styles = StyleSheet.create({
        text: {
            color: theme.color,
            fontSize: responsiveFontSize(3),
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            opacity: scale(0.9),
        }
    })
    return (
        <View style={styles.container}>
            <Feather name={'chevron-left'} size={25} color={theme.color} style={{ marginLeft: scale(11) }} onPress={() => navigation.goBack()} />
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default ForgotPasswordHeader

