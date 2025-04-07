import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { scale } from 'react-native-size-matters';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
    const navigation = useNavigation()
    const { theme, title } = props;

    const backArrowPress = () => navigation.goBack();

    return (
        <View style={[styles.headerBar, { backgroundColor: theme.theme === 'dark' ? '#141628' : 'rgba(20, 22, 40, 0.05)' }]}>
            <Pressable style={styles.headerBarIcon} onPress={()=>backArrowPress()}   >
                <Feather name={'chevron-left'} size={25} color={theme.color} />
            </Pressable>
            <View style={styles.headerTextContainer}>
                <Text style={[styles.headerBarText, { color: theme.color }]}>
                    {title}
                </Text>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerBar: {
        height: scale(48),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(20, 22, 40, 0.05)',
        paddingHorizontal: scale(16)
    },
    headerBarIcon: {
        color: '#000616',
        opacity: scale(0.8),
    },
    headerTextContainer: {
        flex: 1,
    },
    headerBarText: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2.2),
        color: '#000616',
        textAlign: 'center'
    },
})