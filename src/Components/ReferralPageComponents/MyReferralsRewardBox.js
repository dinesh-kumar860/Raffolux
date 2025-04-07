import { StyleSheet, Text, View, } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MyReferralsRewardBox = (props) => {
    const { iconName, title, theme, rewardBackgroundColor, rewardTextColor, index, claimed } = props
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={[rewardTextColor]}>{title}</Text>
                {
                    claimed && title !== `REWARD` &&
                    <AntDesign name={'checkcircle'} color={'#FFBD0A'} size={8} />
                }
            </View>
            <View style={[rewardBackgroundColor]}>
                <FontAwesome6 name={iconName} size={20} color={theme.theme === 'dark' && claimed ? '#FFBD0A' : theme.color} />
            </View>
        </View>
    )
}

export default MyReferralsRewardBox

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: scale(3)
    },
    text: {
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: responsiveFontSize(1.2),
        opacity: scale(0.5),
    },

})