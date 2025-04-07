import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React  from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const TermsAndConditionsCard = (props) => {
    const {theme} = props;
    const navigation = useNavigation()
    return (
        <View style={[styles.termsAndConditionsCardContainer, { backgroundColor: theme.theme === 'dark' ? '#141628' : '#FFFFFF' }]}>
        <View style={styles.termsAndConditionsCard}>
            <LinearGradient colors={['#FFD70D', '#FFAE05']} style={styles.prizeBackground} >
                <Image style={styles.prizeImage} source={require('../../assets/Images/prizeClaimPrizeImage.png')} />
            </LinearGradient>
            <Text style={[styles.termsAndConditionsCardText, { color: theme.color }]}>We’ve changed our prize claim process! Please refer to our <Text style={styles.orangeText} onPress={()=>navigation.navigate('TermsAndConditions')}>terms & conditions</Text> for more information</Text>
        </View>
    </View>
    )
}

export default TermsAndConditionsCard

const styles = StyleSheet.create({
    termsAndConditionsCardContainer: {
        marginTop: scale(16),
        borderRadius: scale(6),
        elevation: scale(3)
    },
    termsAndConditionsCard: {
        flexDirection: 'row',
        gap: scale(20),
        alignItems: 'center',
        paddingVertical: scale(15),
        marginHorizontal: scale(22),
    },
    prizeBackground: {
        height: scale(58),
        width: scale(58),
        borderRadius: scale(58),
        alignItems: 'center',
        justifyContent: 'center'
    },
    prizeImage: {
        height: scale(23),
        width: scale(23),
    },
    termsAndConditionsCardText: {
        flex: 1,
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: responsiveFontSize(1.7),
        lineHeight: 21,
        color: '#1C1C27',
        opacity: 0.8
    },
    orangeText: {
        color: '#FFBD0A'
    },
})