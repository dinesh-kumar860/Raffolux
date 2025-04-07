import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";

import * as common from '../helpers/common';
import ThemeContext from '../utils/themes/themeWrapper';

import { useNavigation } from '@react-navigation/native';

const TermsAndConditions = () => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();

    const SubText = ({ number, text }) => {
        return (
            <View style={styles.textContainer}>
                <Text style={styles.subText1}>{number}.</Text>
                <Text style={[styles.subText1, { flex: 1 }]}>{text}</Text>
            </View>
        )
    };

    const DefinitionsSubText = ({ boldText, normalText }) => {
        return (
            <View style={styles.textContainer}>
                <Text style={[styles.subText1, { fontFamily: 'NunitoSans-ExtraBold', opacity: 0.9 }]}>{boldText}: <Text style={[styles.subText1, { flex: 1, color: theme.theme == 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }]}>{normalText}</Text></Text>
            </View>
        )
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingLeft: scale(18),
            paddingRight: scale(15),
            paddingTop: scale(30),
            backgroundColor: theme.theme === 'dark' ? '#000616' : '#F5F5F5'
        },
        mainContainer: {
            paddingBottom: 80
        },
        header: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            color: theme.color
        },
        text: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.8),
            color: theme.color,
            letterSpacing: 0.5,
            opacity: scale(0.7),
            marginTop: scale(8),
            lineHeight: scale(22)
        },
        subHeadersMainContainer: {
            marginTop: scale(44),
            gap: scale(32)
        },
        subText: {
            color: theme.color,
            opacity: scale(0.7),
            letterSpacing: scale(0.5),
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            lineHeight: scale(22),
        },
        subHeader: {
            color: theme.color,
            opacity: scale(0.8),
            letterSpacing: scale(0.5),
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(2.2),
            lineHeight: scale(22),
        },
        subHeadersContainer: {
            // gap: scale(8)
        },
        subTextContainer: {
            gap: scale(22)
        },
        subTextMainContainer: {
            flexDirection: 'row',
            gap: scale(2)
        },
        subtext: {
            color: theme.color,
            opacity: 0.7,
            letterSpacing: scale(0.5),
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            lineHeight: scale(24),
        },
        textContainer: {
            flexDirection: 'row',
            gap: scale(2),
        },
        subText1: {
            color: theme.color,
            opacity: 0.7,
            letterSpacing: scale(0.5),
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            lineHeight: scale(24),
        }
    });

    const goToPrivacy = () => navigation.navigate('PrivacyAndPolicy')


    return (
        <ScrollView style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={styles.header} >{common.termsAndConditions.termsAndConditions}</Text>
                <Text style={styles.text}>{common.termsAndConditions.termsAndConditionsSubText}</Text>
                <View style={styles.subHeadersMainContainer}>
                    <View style={[styles.subHeadersContainer, { gap: scale(8) }]}>
                        <Text style={styles.subHeader}>{common.termsAndConditions.terms}</Text>
                        <Text style={styles.subText}>{common.termsAndConditions.termsSubText}</Text>
                    </View>
                    <View style={[styles.subHeadersContainer, { gap: scale(16) }]}>
                        <Text style={styles.subHeader}>{common.termsAndConditions.thePromoter}</Text>
                        <View style={styles.subTextContainer}>
                            <SubText number={'1'} text={common.termsAndConditions.thePromoterSubText} />
                        </View>
                    </View>
                    <View style={[styles.subHeadersContainer, { gap: scale(16) }]}>
                        <Text style={styles.subHeader}>{common.termsAndConditions.howToEnter}</Text>
                        <View style={styles.subTextContainer}>
                            <SubText number={'2'} text={common.termsAndConditions.howToEnterSubText1} />
                            <SubText number={'3'} text={common.termsAndConditions.howToEnterSubText2} />
                            <View style={[styles.subTextContainer, { marginHorizontal: scale(15) }]}>
                                <SubText number={'a'} text={common.termsAndConditions.howToEnterSubText3} />
                                <SubText number={'b'} text={common.termsAndConditions.howToEnterSubText4} />
                                <SubText number={'c'} text={common.termsAndConditions.howToEnterSubText5} />
                            </View>
                            <SubText number={'4'} text={common.termsAndConditions.howToEnterSubText6} />
                            <View style={styles.subTextMainContainer}>
                                <Text style={styles.subtext}>5.</Text>
                                <Text style={[styles.subtext, { flex: 1 }]}>Purchasers of Raffolux Tickets will be asked to provide their contact details, including an e-mail address and, optionally, a telephone number. This information will be processed in accordance with the provisions below and the Promoter’s Data Protection and <Text style={{ textDecorationLine: 'underline' }} onPress={() => goToPrivacy()}>Privacy Policy</Text>. The Promoter’s relevant payment provider will require the purchaser’s card payment details and may require their postcode. Once the purchase order for the Raffolux Tickets is submitted, the Registered User's card payment will be electronically approved and the Promoter will not retain any records of the Registered User's card details.</Text>
                            </View>

                            <View style={styles.subTextMainContainer}>
                                <Text style={styles.subtext}>6.</Text>
                                <Text style={[styles.subtext, { flex: 1 }]}>Entrants entering into a Competition for free via Postal Entry must become a Registered User, and then mail their full name and a contact telephone number (including area code if providing a landline number) and the e-mail registered to their Account, as well as the title of the Competition they wish to enter, to Raffolux Ltd, Raffolux Ltd, 4 Ravey Street, London, EC2A 4QP. The aforementioned information required must be handwritten in order to be valid, and printed in legible English. This information will be processed in accordance with the provisions in these Terms and the Promoter’s Data Protection and <Text style={{ textDecorationLine: 'underline' }} onPress={() => goToPrivacy()}>Privacy Policy</Text>.</Text>
                            </View>
                            <SubText number={'7'} text={common.termsAndConditions.howToEnterSubText9} />
                            <View style={styles.subTextMainContainer}>
                                <Text style={styles.subtext}>8.</Text>
                                <Text style={[styles.subtext, { flex: 1 }]}>Entrants entering into a Flash Competition may do so for free via Telephone Entry. Entrants entering Flash Competitions via Telephone Entry must become a Registered User, and then call 07727650878. All calls received by this telephone number will only be charged at the normal rate with no additional charges. Telephone Entry entrants must provide their full name, the e-mail associated with their Raffolux account, the title of the Flash Competition they wish to enter, and a contact telephone number in order to be entered into the Flash Competition. This information will be processed in accordance with the provisions in these Terms and the Promoter's Data Protection and <Text style={{ textDecorationLine: 'underline' }} onPress={() => goToPrivacy()}>Privacy Policy.</Text></Text>
                            </View>
                            {/* <SubText number={'8'} text={common.termsAndConditions.howToEnterSubText10} /> */}
                            <SubText number={'9'} text={common.termsAndConditions.howToEnterSubText11} />
                            <SubText number={'10'} text={common.termsAndConditions.howToEnterSubText12} />
                            <View style={[styles.subTextContainer, { marginHorizontal: scale(15) }]}>
                                <SubText number={'a'} text={common.termsAndConditions.howToEnterSubText13} />
                                <SubText number={'b'} text={common.termsAndConditions.howToEnterSubText14} />
                                <SubText number={'c'} text={common.termsAndConditions.howToEnterSubText15} />
                            </View>
                            <SubText number={'11'} text={common.termsAndConditions.howToEnterSubText16} />
                            <SubText number={'12'} text={common.termsAndConditions.howToEnterSubText17} />
                            <SubText number={'13'} text={common.termsAndConditions.howToEnterSubText18} />
                            <View style={[styles.subTextContainer, { marginHorizontal: scale(15) }]}>
                                <SubText number={'a'} text={common.termsAndConditions.howToEnterSubText19} />
                                <SubText number={'b'} text={common.termsAndConditions.howToEnterSubText20} />
                                <SubText number={'c'} text={common.termsAndConditions.howToEnterSubText21} />
                            </View>
                            <SubText number={'14'} text={common.termsAndConditions.howToEnterSubText22} />
                            <View style={[styles.subTextContainer, { marginHorizontal: scale(15) }]}>
                                <SubText number={'a'} text={common.termsAndConditions.howToEnterSubText23} />
                                <SubText number={'b'} text={common.termsAndConditions.howToEnterSubText24} />
                                <SubText number={'c'} text={common.termsAndConditions.howToEnterSubText25} />
                                <SubText number={'d'} text={common.termsAndConditions.howToEnterSubText26} />
                                <SubText number={'e'} text={common.termsAndConditions.howToEnterSubText27} />
                            </View>
                            <SubText number={'15'} text={common.termsAndConditions.howToEnterSubText28} />
                            <SubText number={'16'} text={common.termsAndConditions.howToEnterSubText29} />
                            <SubText number={'17'} text={common.termsAndConditions.howToEnterSubText30} />
                            <SubText number={'18'} text={common.termsAndConditions.howToEnterSubText31} />
                        </View>
                    </View>
                    <View style={[styles.subHeadersContainer, { gap: scale(24) }]}>
                        <Text style={styles.subHeader}>{common.termsAndConditions.eligibility}</Text>
                        <View style={[styles.subTextContainer,]}>
                            <SubText number={'19'} text={common.termsAndConditions.eligibilitySubText1} />
                            <SubText number={'20'} text={common.termsAndConditions.eligibilitySubText2} />
                            <SubText number={'21'} text={common.termsAndConditions.eligibilitySubText3} />
                            <SubText number={'22'} text={common.termsAndConditions.eligibilitySubText4} />
                            <View style={[styles.subTextContainer, { marginHorizontal: scale(15) }]}>
                                <SubText number={'a'} text={common.termsAndConditions.eligibilitySubText5} />
                                <SubText number={'b'} text={common.termsAndConditions.eligibilitySubText6} />
                                <SubText number={'c'} text={common.termsAndConditions.eligibilitySubText7} />
                                <SubText number={'d'} text={common.termsAndConditions.eligibilitySubText8} />
                                <SubText number={'e'} text={common.termsAndConditions.eligibilitySubText9} />
                            </View>
                            <SubText number={'23'} text={common.termsAndConditions.eligibilitySubText10} />
                            <View style={[styles.subTextContainer, { marginHorizontal: scale(15) }]}>
                                <SubText number={'a'} text={common.termsAndConditions.eligibilitySubText11} />
                                <SubText number={'b'} text={common.termsAndConditions.eligibilitySubText12} />
                                <SubText number={'c'} text={common.termsAndConditions.eligibilitySubText13} />
                                <SubText number={'d'} text={common.termsAndConditions.eligibilitySubText14} />
                                <SubText number={'e'} text={common.termsAndConditions.eligibilitySubText15} />
                            </View>
                            <SubText number={'24'} text={common.termsAndConditions.eligibilitySubText16} />
                            <SubText number={'25'} text={common.termsAndConditions.eligibilitySubText17} />
                            <SubText number={'26'} text={common.termsAndConditions.eligibilitySubText18} />
                            <SubText number={'27'} text={common.termsAndConditions.eligibilitySubText19} />
                            <View style={[styles.subTextContainer, { marginHorizontal: scale(15) }]}>
                                <SubText number={'a'} text={common.termsAndConditions.eligibilitySubText20} />
                                <SubText number={'b'} text={common.termsAndConditions.eligibilitySubText21} />
                                <SubText number={'c'} text={common.termsAndConditions.eligibilitySubText22} />
                                <SubText number={'d'} text={common.termsAndConditions.eligibilitySubText23} />
                                <SubText number={'e'} text={common.termsAndConditions.eligibilitySubText24} />
                                <SubText number={'f'} text={common.termsAndConditions.eligibilitySubText25} />
                                <SubText number={'g'} text={common.termsAndConditions.eligibilitySubText26} />
                            </View>
                            <SubText number={'28'} text={common.termsAndConditions.eligibilitySubText27} />
                        </View>
                    </View>
                    <View style={[styles.subHeadersContainer, { gap: scale(24) }]}>
                        <Text style={styles.subHeader}>{common.termsAndConditions.PrizesAndTheDraw}</Text>
                        <View style={styles.subTextContainer}>
                            <SubText number={'29'} text={common.termsAndConditions.PrizesAndTheDrawSubText1} />
                            <SubText number={'30'} text={common.termsAndConditions.PrizesAndTheDrawSubText2} />
                            <SubText number={'31'} text={common.termsAndConditions.PrizesAndTheDrawSubText3} />
                            <SubText number={'32'} text={common.termsAndConditions.PrizesAndTheDrawSubText4} />
                            <View style={[styles.subTextContainer, { marginHorizontal: scale(15) }]}>
                                <SubText number={'a'} text={common.termsAndConditions.PrizesAndTheDrawSubText5} />
                                <SubText number={'b'} text={common.termsAndConditions.PrizesAndTheDrawSubText6} />
                            </View>
                            <SubText number={'33'} text={common.termsAndConditions.PrizesAndTheDrawSubText7} />
                            <SubText number={'34'} text={common.termsAndConditions.PrizesAndTheDrawSubText8} />
                            <SubText number={'35'} text={common.termsAndConditions.PrizesAndTheDrawSubText9} />
                            <SubText number={'36'} text={common.termsAndConditions.PrizesAndTheDrawSubText10} />
                            <SubText number={'37'} text={common.termsAndConditions.PrizesAndTheDrawSubText11} />
                            <SubText number={'38'} text={common.termsAndConditions.PrizesAndTheDrawSubText12} />
                            <SubText number={'39'} text={common.termsAndConditions.PrizesAndTheDrawSubText13} />
                            <SubText number={'40'} text={common.termsAndConditions.PrizesAndTheDrawSubText14} />
                            <SubText number={'41'} text={common.termsAndConditions.PrizesAndTheDrawSubText15} />
                            <SubText number={'42'} text={common.termsAndConditions.PrizesAndTheDrawSubText16} />
                        </View>
                    </View>
                    <View style={[styles.subHeadersContainer, { gap: scale(24) }]}>
                        <Text style={styles.subHeader}>{common.termsAndConditions.Charity}</Text>
                        <View style={styles.subTextContainer}>
                            <SubText number={'43'} text={common.termsAndConditions.CharitySubText1} />
                            <SubText number={'44'} text={common.termsAndConditions.CharitySubText2} />
                        </View>
                    </View>
                    <View style={[styles.subHeadersContainer, { gap: scale(24) }]}>
                        <Text style={styles.subHeader}>{common.termsAndConditions.AnnouncementOfWinners}</Text>
                        <View style={styles.subTextContainer}>
                            <SubText number={'45'} text={common.termsAndConditions.AnnouncementOfWinnersSubText1} />
                        </View>
                    </View>
                    <View style={[styles.subHeadersContainer, { gap: scale(24) }]}>
                        <Text style={styles.subHeader}>{common.termsAndConditions.LimitationOfLiability}</Text>
                        <View style={styles.subTextContainer}>
                            <SubText number={'46'} text={common.termsAndConditions.LimitationOfLiabilitySubText1} />
                            <SubText number={'47'} text={common.termsAndConditions.LimitationOfLiabilitySubText2} />
                            <SubText number={'48'} text={common.termsAndConditions.LimitationOfLiabilitySubText3} />
                            <SubText number={'49'} text={common.termsAndConditions.LimitationOfLiabilitySubText4} />
                            <SubText number={'50'} text={common.termsAndConditions.LimitationOfLiabilitySubText5} />
                        </View>
                    </View>
                    <View style={[styles.subHeadersContainer, { gap: scale(24) }]}>
                        <Text style={styles.subHeader}>{common.termsAndConditions.General}</Text>
                        <View style={styles.subTextContainer}>
                            <SubText number={'51'} text={common.termsAndConditions.GeneralSubText1} />
                            <SubText number={'52'} text={common.termsAndConditions.GeneralSubText2} />
                            <SubText number={'53'} text={common.termsAndConditions.GeneralSubText3} />
                            <SubText number={'54'} text={common.termsAndConditions.GeneralSubText4} />
                            <SubText number={'55'} text={common.termsAndConditions.GeneralSubText5} />
                            <SubText number={'56'} text={common.termsAndConditions.GeneralSubText6} />
                            <SubText number={'57'} text={common.termsAndConditions.GeneralSubText7} />
                        </View>
                    </View>
                    <View style={[styles.subHeadersContainer, { gap: scale(24) }]}>
                        <Text style={styles.subHeader}>{common.termsAndConditions.Definitions}</Text>
                        <View style={[styles.subTextContainer, { marginHorizontal: scale(15) }]}>
                            <Text style={styles.subText1}>{common.termsAndConditions.DefinitionSubText1}</Text>
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText2} normalText={common.termsAndConditions.DefinitionSubText3} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText4} normalText={common.termsAndConditions.DefinitionSubText5} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText6} normalText={common.termsAndConditions.DefinitionSubText7} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText8} normalText={common.termsAndConditions.DefinitionSubText9} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText10} normalText={common.termsAndConditions.DefinitionSubText11} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText12} normalText={common.termsAndConditions.DefinitionSubText13} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText14} normalText={common.termsAndConditions.DefinitionSubText15} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText16} normalText={common.termsAndConditions.DefinitionSubText17} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText18} normalText={common.termsAndConditions.DefinitionSubText19} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText20} normalText={common.termsAndConditions.DefinitionSubText21} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText22} normalText={common.termsAndConditions.DefinitionSubText23} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText24} normalText={common.termsAndConditions.DefinitionSubText25} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText66} normalText={common.termsAndConditions.DefinitionSubText67} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText26} normalText={common.termsAndConditions.DefinitionSubText27} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText28} normalText={common.termsAndConditions.DefinitionSubText29} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText30} normalText={common.termsAndConditions.DefinitionSubText31} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText32} normalText={common.termsAndConditions.DefinitionSubText33} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText34} normalText={common.termsAndConditions.DefinitionSubText35} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText36} normalText={common.termsAndConditions.DefinitionSubText37} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText38} normalText={common.termsAndConditions.DefinitionSubText39} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText40} normalText={common.termsAndConditions.DefinitionSubText41} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText42} normalText={common.termsAndConditions.DefinitionSubText43} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText44} normalText={common.termsAndConditions.DefinitionSubText45} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText46} normalText={common.termsAndConditions.DefinitionSubText47} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText48} normalText={common.termsAndConditions.DefinitionSubText49} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText50} normalText={common.termsAndConditions.DefinitionSubText51} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText52} normalText={common.termsAndConditions.DefinitionSubText53} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText54} normalText={common.termsAndConditions.DefinitionSubText55} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText56} normalText={common.termsAndConditions.DefinitionSubText57} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText58} normalText={common.termsAndConditions.DefinitionSubText59} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText60} normalText={common.termsAndConditions.DefinitionSubText61} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText62} normalText={common.termsAndConditions.DefinitionSubText63} />
                            <DefinitionsSubText boldText={common.termsAndConditions.DefinitionSubText64} normalText={common.termsAndConditions.DefinitionSubText65} />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default TermsAndConditions

