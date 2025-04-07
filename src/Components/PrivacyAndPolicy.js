import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";

import * as common from '../helpers/common';
import PrivacyAndPolicyBulletText from './TermsAndConditionsComponents/PrivacyAndPolicyBulletText';
import ThemeContext from '../utils/themes/themeWrapper';
import { Table, Row } from 'react-native-table-component';
import { openLink } from '../helpers/OpenBrowser';


const PrivacyAndPolicy = () => {
    const theme = useContext(ThemeContext);


    const PersonalInfoTable = ({ tableData }) => {
        const [data, setData] = useState(tableData);
        return (
            <View style={styles.personalInfoTableContainer}>
                <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                            <Row
                                data={data.tableHead}
                                widthArr={data.widthArr}
                                style={styles.personalInfoTableContainerHead}
                                textStyle={styles.personalInfoTableContainerHeadText}
                            />
                        </Table>
                        <ScrollView>
                            <Table borderStyle={{ borderWidth: 1, borderColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                                {data.tableData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={data.widthArr}
                                        style={styles.personalInfoTableContainerRowSection}
                                        textStyle={styles.personalInfoTableContainerText}
                                    />
                                ))}
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        );
    };

    const LegalRightsSubText = ({ boldText, normalText }) => {
        return (
            <Text style={[styles.text, { fontFamily: 'Gilroy-Bold' }]}>{boldText}<Text style={{ fontFamily: 'NunitoSans-Regular' }}>{normalText}</Text></Text>
        )
    }

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: theme.theme === 'dark' ? '#000616' : '#F5F5F5'
        },
        container: {
            paddingLeft: scale(17),
            paddingRight: scale(22),
            paddingBottom: scale(150),
            backgroundColor: theme.theme === 'dark' ? '#000616' : '#F5F5F5'
        },
        headerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(3),
            letterSpacing: scale(0.417),
            color: theme.color,
            opacity: theme.theme === 'dark' ? scale(0.9) : null,
            // textAlign: 'center',
            marginTop: scale(30)
        },
        headerSubText: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(2.2),
            letterSpacing: scale(0.417),
            color: theme.color,
            lineHeight: scale(22),
            opacity: scale(0.8),
            marginTop: scale(30)
        },
        textContainer: {
            gap: scale(15)
        },
        text: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(2),
            letterSpacing: scale(0.5),
            color: theme.color,
            lineHeight: scale(24),
            opacity: scale(0.8),
        },
        personalInfoTableContainer: {
            flex: 1
        },
        personalInfoTableContainerRowSection: {
            minHeight: 60
        },
        personalInfoTableContainerHead: {
            minHeight: 44
        },
        personalInfoTableContainerHeadText: {
            fontFamily: 'Gilroy-Bold',
            fontSize: responsiveFontSize(2.2),
            color: theme.color,
            paddingLeft: 5
        },
        personalInfoTableContainerText: {
            margin: 6,
            fontSize: responsiveFontSize(1.8),
            color: theme.color
        },
    });

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.headerText}>Privacy & Cookies Policy</Text>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Welcome to Raffolux's privacy and cookies policy.</Text>
                        <View style={styles.textContainer}>
                            {
                                common.PrivacyAndPolicy.welcomeToRaffoluxPrivacy?.map((ele, i) => (
                                    <Text key={i} style={styles.text}>{ele.text}</Text>
                                ))
                            }
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Data Protection</Text>
                        <View style={styles.textContainer}>
                            {
                                common.PrivacyAndPolicy.dataProtection?.map((ele, i) => (
                                    <Text key={i} style={styles.text}>{ele.text}</Text>
                                ))
                            }
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Contact Details</Text>
                        <View style={styles.textContainer}>
                            {
                                common.PrivacyAndPolicy.contactDetails?.map((ele, i) => (
                                    <Text key={i} style={styles.text}>{ele.text}</Text>
                                ))
                            }
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Changes to the Privacy Policy and your duty to inform us of changes</Text>
                        <View style={styles.textContainer}>
                            {
                                common.PrivacyAndPolicy.changesToPrivacyPolicy?.map((ele, i) => (
                                    <Text key={i} style={styles.text}>{ele.text}</Text>
                                ))
                            }
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Third-party links</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.thirdPartyLinks}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Legal basis for the use of personal data</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.legalBasisText1}</Text>
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.legalBasisText2} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.legalBasisText3} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.legalBasisText4} />
                            <Text style={styles.text}>{common.PrivacyAndPolicy.legalBasisText5}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.legalBasisText6}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Personal information Raffolux collects from you</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText1}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText2}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText3}</Text>
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText4} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText5} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText6} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText7} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText8} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText9} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText10} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText11} />
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText12}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText13}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText14}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Uses made of your Personal Info</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText15}</Text>
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText15} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText16} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText17} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText18} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText19} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText20} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText21} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText22} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText23} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.PersonalInformationText24} />
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Disclosure of Personal Info</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText25}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText26}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText27}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText28}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText29}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText30}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>How we use Personal Info</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText31}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText32}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: scale(15) }}>
                        <PersonalInfoTable tableData={common.PrivacyAndPolicy.PersonalInfoTableData} />
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Direct marketing options</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText33}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Safeguarding</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText34}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Data Retention</Text>
                        <View style={styles.textContainer}>
                            <Text style={[styles.text, { textDecorationLine: 'underline' }]}>{common.PrivacyAndPolicy.PersonalInformationText35}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText36}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText37}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText38}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText39}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.PersonalInformationText40}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Your Legal Rights</Text>
                        <View style={styles.textContainer}>
                            <Text style={[styles.text, { textDecorationLine: 'underline' }]}>{common.PrivacyAndPolicy.legalRightsText}</Text>
                            <LegalRightsSubText boldText={common.PrivacyAndPolicy.legalRightsBoldText1} normalText={common.PrivacyAndPolicy.legalRightsNormalText1} />
                            <LegalRightsSubText boldText={common.PrivacyAndPolicy.legalRightsBoldText2} normalText={common.PrivacyAndPolicy.legalRightsNormalText2} />
                            <LegalRightsSubText boldText={common.PrivacyAndPolicy.legalRightsBoldText3} normalText={common.PrivacyAndPolicy.legalRightsNormalText3} />
                            <LegalRightsSubText boldText={common.PrivacyAndPolicy.legalRightsBoldText4} normalText={common.PrivacyAndPolicy.legalRightsNormalText4} />
                            <LegalRightsSubText boldText={common.PrivacyAndPolicy.legalRightsBoldText5} normalText={common.PrivacyAndPolicy.legalRightsNormalText5} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.legalRightsBulletText1} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.legalRightsBulletText2} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.legalRightsBulletText3} />
                            <PrivacyAndPolicyBulletText theme={theme} textStyle={styles.text} text={common.PrivacyAndPolicy.legalRightsBulletText4} />
                            <LegalRightsSubText boldText={common.PrivacyAndPolicy.legalRightsBoldText6} normalText={common.PrivacyAndPolicy.legalRightsNormalText6} />
                            <LegalRightsSubText boldText={common.PrivacyAndPolicy.legalRightsBoldText7} normalText={common.PrivacyAndPolicy.legalRightsNormalText7} />
                            <Text style={styles.text}>{common.PrivacyAndPolicy.legalRightsText2}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.legalRightsText3}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.legalRightsText4}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.legalRightsText5}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Opting Out</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.optingOutText1}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.optingOutText2}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Our use of Cookies</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.useOfCookiesText1}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.useOfCookiesText2}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.useOfCookiesText3}</Text>
                            <Text style={styles.text}>We use category 1, 2, 3 and 4 cookies as defined in the <Text style={{ color: '#FFBD0A' }} onPress={() => openLink('https://www.cookielaw.org/wp-content/uploads/2019/12/icc_uk_cookiesguide_revnov.pdf')}>International Chamber of Commerce United Kingdom Cookie Guide:</Text></Text>
                        </View>
                    </View>
                    <View style={{ marginTop: scale(15) }}>
                        <PersonalInfoTable tableData={common.PrivacyAndPolicy.cookiesTableData} />
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Cookie Settings</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.cookieSettingsText1}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.cookieSettingsText2}</Text>
                            <LegalRightsSubText boldText={common.PrivacyAndPolicy.cookieSettingsBoldText1} normalText={common.PrivacyAndPolicy.cookieSettingsNormalText1} />
                            <LegalRightsSubText boldText={common.PrivacyAndPolicy.cookieSettingsBoldText2} normalText={common.PrivacyAndPolicy.cookieSettingsNormalText2} />
                            <LegalRightsSubText boldText={common.PrivacyAndPolicy.cookieSettingsBoldText3} normalText={common.PrivacyAndPolicy.cookieSettingsNormalText3} />
                            <Text style={styles.text}>{common.PrivacyAndPolicy.cookieSettingsText3}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Changes to Privacy & Cookies</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.changesToPrivacyText1}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.changesToPrivacyText2}</Text>
                        </View>
                    </View>
                    <View style={{ gap: scale(15) }}>
                        <Text style={styles.headerSubText}>Contact & Address details</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.contactAddressText1}</Text>
                            <Text style={styles.text}>{common.PrivacyAndPolicy.contactAddressText2}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default PrivacyAndPolicy

