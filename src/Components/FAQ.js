import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native'
import React, { useContext } from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";

import FAQSupportCard from './TermsAndConditionsComponents/FAQSupportCard';
import FAQQuestion from './TermsAndConditionsComponents/FAQQuestion';

import ThemeContext from '../utils/themes/themeWrapper';

import * as Common from '../helpers/common';


const FAQ = () => {
    const theme = useContext(ThemeContext);


    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.theme === 'dark' ? '#000616' : '#F5F5F5'
        },
        container: {
            paddingHorizontal: scale(16),
            paddingBottom: scale(150),
            backgroundColor: theme.theme === 'dark' ? '#000616' : '#F5F5F5'
        },
        headerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            letterSpacing: scale(0.417),
            color: theme.color,
            textAlign: 'center',
            marginTop: scale(30)
        },
        headerSubText: {
            color: theme.color,
            opacity: 0.8,
            letterSpacing: scale(0.5),
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            lineHeight: scale(22),
            textAlign: 'center',
            marginTop: scale(8)
        },
        supportCardContainer: {
            marginTop: scale(22),
            gap: scale(15)
        },
        topQuestionsContainer: {
            gap: scale(30),
            paddingHorizontal: scale(16)
        },
        headerTextStyles: {
            marginTop: scale(55),
            fontSize: responsiveFontSize(3),
            marginBottom: scale(45)
        }
    })
    return (
        <View style={styles.mainContainer} >
            <ScrollView>
                <View style={[styles.container,]}>
                    <Text style={styles.headerText}>Help & Support</Text>
                    <Text style={styles.headerSubText}>Let us know how we can help you :)</Text>
                    <View style={styles.supportCardContainer}>
                        <FAQSupportCard theme={theme} image={theme.theme === 'dark' ? require('../assets/Images/FAQCommentSmileDark.png') : require('../assets/Images/FAQCommetSmileLight.png')} title={'Live Chat'} subTitle={'Chat with one of our helpful advisors.'} contact={'Start a live chat'} />
                        <FAQSupportCard theme={theme} image={theme.theme === 'dark' ? require('../assets/Images/FAQEnvelopeDark.png') : require('../assets/Images/FAQEnvelopeLight.png')} title={'Contact support'} subTitle={'Send us an email with your query'} contact={'support@raffolux.com'} />
                        <FAQSupportCard theme={theme} image={theme.theme === 'dark' ? require('../assets/Images/FAQPhoneDark.png') : require('../assets/Images/FAQPhoneLight.png')} title={'Call us'} subTitle={'Mon - Fri from 9am to 5:30pm'} contact={'+44 2039 297496'} />
                    </View>
                    <Text style={[styles.headerText, { marginTop: scale(65) }]}>Frequently Asked Questions</Text>
                    <Text style={styles.headerSubText}>Quick answers to any questions that you may have. Can’t see what you’re looking for? Contact us via <Text style={{ textDecorationLine: 'underline' }} >Live Chat</Text> or <Text style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL('mailto:support@raffolux.com')}>Email us</Text></Text>
                    {
                        Common.FAQ.questions?.map((question, i) => (
                            <View key={i}>
                                <Text style={[styles.headerText, styles.headerTextStyles]}>{question.header}</Text>
                                <View style={styles.topQuestionsContainer}>
                                    {
                                        question.subHeaders.map((subHeader, j) => (
                                            <FAQQuestion key={j} theme={theme} title={subHeader.title} />
                                        ))
                                    }
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default FAQ

