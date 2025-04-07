import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";

import * as common from '../helpers/common';
import PrivacyAndPolicyBulletText from './TermsAndConditionsComponents/PrivacyAndPolicyBulletText';
import ThemeContext from '../utils/themes/themeWrapper';
import PrivacyAndPolicyWebsiteVisit from './TermsAndConditionsComponents/PrivacyAndPolicyWebsiteVisit';

import { openLink } from '../helpers/OpenBrowser';


const ResponsiblePlayAndWellbeing = () => {
    const theme = useContext(ThemeContext);

    const styles = StyleSheet.create({
        mainContainer:{
            flex:1,
            backgroundColor: theme.theme === 'dark' ? '#000616' : '#F5F5F5'
        },
        container: {
            paddingLeft: scale(17),
            paddingRight: scale(14),
            paddingBottom: scale(150),
            backgroundColor: theme.theme === 'dark' ? '#000616' : '#F5F5F5'
        },
        headerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            letterSpacing: scale(0.417),
            color: theme.color,
            opacity: theme.theme === 'dark' ? scale(0.9) : null,
            marginTop: scale(30)
        },
        headerSubText: {
            fontFamily: 'NunitoSans-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            letterSpacing: scale(0.417),
            color: theme.color,
            lineHeight: scale(22),
            opacity: scale(0.8),
            marginTop: scale(30)
        },
        textContainer: {
            gap: scale(15),
            marginRight: scale(10)
        },
        text: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            letterSpacing: scale(0.5),
            color: theme.color,
            lineHeight: scale(24),
            opacity: scale(0.8),
            flex: 1
        },
        bulletContainer: {
            flexDirection: 'row',
            gap: scale(5),
            marginLeft: scale(10)
        },
        bullet: {
            fontSize: 22,
            color: theme.color,
            opacity: scale(0.8)
        },
        wellBeingCntainer: {
            marginTop: scale(40),
        },
        cardsContainer: {
            gap: scale(15),
            marginTop: scale(30)
        }
    })
    return (
        <View style={styles.mainContainer}>
             <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Responsible Play & Wellbeing</Text>
                <View style={{ gap: scale(15) }}>
                    <Text style={styles.headerSubText}>Responsible Play with Raffolux</Text>
                    <View style={styles.textContainer}>
                        {
                            common.responsiblePlayAndWellBeing.responsiblePlay?.map((ele, i) => (
                                <Text key={i} style={styles.text}>{ele.text}</Text>
                            ))
                        }
                    </View>
                </View>
                <View style={{ gap: scale(15) }}>
                    <Text style={styles.headerSubText}>Data Protection</Text>
                    <View style={styles.textContainer}>
                        {
                            common.responsiblePlayAndWellBeing.dataProtection?.map((ele, i) => (
                                <PrivacyAndPolicyBulletText key={i} theme={theme} textStyle={styles.text} text={ele.text} />
                            ))
                        }
                    </View>
                </View>
                <View style={{ gap: scale(15) }}>
                    <Text style={styles.headerSubText}>Actions we will take</Text>
                    <View style={styles.textContainer}>
                        <View style={styles.bulletContainer}>
                            <Text style={styles.bullet}>{'\u2022'}</Text>
                            <Text style={styles.text}>If you feel like your play has become problematic (or for any reason at all), you can self-exclude yourself from the Raffolux website. You just need to get in contact with us using email at <Text style={{ textDecorationLine: 'underline' }} onPress={() => { Linking.openURL('mailto:support@raffolux.com')}}>support@raffolux.com</Text> or the live chat function in the bottom right of the screen, and we will close your account for the requested time period, as well as permanently.</Text>
                        </View>
                        <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.responsiblePlayAndWellBeing.actionText2} />
                        <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.responsiblePlayAndWellBeing.actionText3} />
                        <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.responsiblePlayAndWellBeing.actionText4} />
                    </View>
                </View>
                <View style={{ gap: scale(15) }}>
                    <Text style={styles.headerSubText}>More actions that you can take</Text>
                    <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.responsiblePlayAndWellBeing.moreActionText1} />
                    <View style={styles.bulletContainer}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.text}>There are a number of treatment centres in the UK that may be of help, especially if you feel like your behaviour has got out of control. <Text style={{ textDecorationLine: 'underline' }} onPress={() => openLink('https://gordonmoody.org.uk')}>Gordon Moody</Text>, available at <Text style={{ textDecorationLine: 'underline' }} onPress={() => openLink('https://gordonmoody.org.uk')}>https://gordonmoody.org.uk</Text>, have treatment programs and counselling support available.</Text>
                    </View>
                </View>
                <View style={styles.wellBeingCntainer}>
                    <Text style={styles.headerSubText}>Wellbeing</Text>
                    <Text style={[styles.text, { marginTop: scale(15) }]}>{common.responsiblePlayAndWellBeing.wellBeingText1}</Text>
                    <View style={styles.cardsContainer}>
                        {
                            common.responsiblePlayAndWellBeing.wellBeingCards?.map((ele, i) => (
                                <PrivacyAndPolicyWebsiteVisit key={i} title={ele.title} url={ele.url} theme={theme} />
                            ))
                        }
                    </View>
                </View>
            </View>
        </ScrollView>

        </View>
       
    )
}

export default ResponsiblePlayAndWellbeing

