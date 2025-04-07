import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

import WorkWithUsOptions from './TermsAndConditionsComponents/WorkWithUsOptions'
import WorkWithUsCheckBoxes from './TermsAndConditionsComponents/WorkWithUsCheckBoxes'
import * as common from '../helpers/common';
import { Url } from '../helpers/routesApi'
import WorkWithUsCarouselContainer from './TermsAndConditionsComponents/WorkWithUsCarouselContainer';
import ThemeContext from '../utils/themes/themeWrapper';
import WorkWithUsCharitableDonationsCarousel from './TermsAndConditionsComponents/WorkWithUsCharitableDonationsCarousel'
import { scrollToTop } from '../utils/scrollToTop'
import { useFocusEffect } from '@react-navigation/native'


const WorkWithUs = () => {
    const theme = useContext(ThemeContext);
    const [refreshing, setRefreshing] = useState(false);
    const scrollToTopRef = useRef();
    const businessRef = useRef(null);
    const charityRef = useRef(null);


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                scrollToTop(scrollToTopRef);
            };
        }, [])
    );


    const styles = StyleSheet.create({
        container: {
            paddingTop: scale(30),
            backgroundColor: theme.background
        },
        imageContainer: {
            height: 306,
            width: '100%',
        },
        image: {
            height: 306,
            width: '100%',
            resizeMode: 'contain'
        },
        headerText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(4),
            textAlign: 'center',
            color: theme.color,
            marginVertical: scale(10)
        },
        subHeader: {
            textAlign: 'center',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            color: theme.color,
            opacity: scale(0.7)
        },
        optionsContainer: {
            paddingHorizontal: scale(15),
            marginTop: scale(22),
            gap: scale(10)
        },
        orangeText: {
            color: '#FFBD0A'
        },
        businessContainer: {
            marginTop: scale(50)
        },
        image2Container: {
            marginTop: scale(22)
        },
        image2: {
            height: 221,
            width: '100%',
            resizeMode: 'contain'
        },
        checkBoxesContainer: {
            marginHorizontal: scale(20),
            marginTop: scale(40),
            gap: scale(18),
            paddingHorizontal: scale(17)
        },
        orangeContainer: {
            paddingVertical: scale(60),
            marginTop: scale(20),
            gap: scale(18),
            backgroundColor: '#2a2a7208',
            paddingHorizontal: scale(37)
        },
        contactUsContainer: {
            height: 58,
            width: 200,
            borderColor: '#2a3138',
            borderWidth: scale(1),
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            borderRadius: scale(6),
            marginTop: scale(15),
            backgroundColor: '#FFFFFF'
        },
        contactUsMainContainer: {
            marginTop: scale(50),
            paddingHorizontal: scale(17),
        },
        buttonText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            color: '#2a3138',
        },
        charityContainer: {
            marginTop: scale(50),
        }

    })
    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} nestedScrollEnabled={true} />
        } ref={scrollToTopRef} style={{ backgroundColor: theme.background }} >
            <View style={styles.container}>
                <View style={{ paddingHorizontal: scale(17) }}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: `${Url.webPImgUrl}media/workwithus-mobile.png` }} />
                    </View>
                    <Text style={styles.headerText}>{common.workWithUs.workWithUS}</Text>
                    <Text style={styles.subHeader}>{common.workWithUs.thereAreManyWays}</Text>
                    <View>
                        <View style={styles.optionsContainer}>
                            <WorkWithUsOptions title={common.workWithUs.iAmBusiness} theme={theme}   mainRef={scrollToTopRef} childRef={businessRef} />
                            <WorkWithUsOptions title={common.workWithUs.iAmCharity} theme={theme}  mainRef={scrollToTopRef} childRef={charityRef}  />
                        </View>
                    </View>
                </View>

                <View style={styles.businessContainer} ref={businessRef}>
                    <Text style={styles.headerText}>For <Text style={styles.orangeText}>{common.workWithUs.businesses}</Text></Text>
                    <Text style={[styles.subHeader, { paddingHorizontal: scale(17) }]}>{common.workWithUs.areYouBusiness}</Text>
                    <View style={styles.image2Container} >
                        <Image style={styles.image2} source={{ uri: `${Url.webPImgUrl}media/business-img.png` }} />
                        <View style={styles.checkBoxesContainer}>
                            {
                                common.workWithUs.checkBoxData?.map((ele, i) => (
                                    <WorkWithUsCheckBoxes key={i} title={ele} isCheckBox={true} theme={theme} />
                                ))
                            }
                        </View>
                        <View style={styles.orangeContainer}>
                            {
                                common.workWithUs.orangeData?.map((ele, i) => (
                                    <WorkWithUsCheckBoxes key={i} title={ele.title} isCheckBox={false} image={ele.image} theme={theme} />
                                ))
                            }
                        </View>
                        <View style={styles.contactUsMainContainer}>
                            <Text style={styles.headerText}>{common.workWithUs.contactUs}</Text>
                            <Text style={styles.subHeader}>{common.workWithUs.getInTouch}</Text>
                            <View style={styles.contactUsContainer}>
                                <Text style={styles.buttonText}>{common.workWithUs.contactUs}</Text>
                            </View>
                        </View>
                        <View style={styles.charityContainer} ref={charityRef}>
                            <View style={styles.charityDonationsCarouselContainer}>
                                <Text style={[styles.headerText, { marginBottom: scale(20) }]}>{common.workWithUs.charitableDonations}</Text>
                                <View style={styles.carouselContainer}>
                                    <WorkWithUsCharitableDonationsCarousel theme={theme} charitableDontaionsImages={common.workWithUs.charitableDontaionsImages} />
                                </View>
                            </View>
                            <Text style={[styles.headerText, { marginTop: scale(50), marginBottom: scale(20) }]}>{common.workWithUs.afewWords} <Text style={styles.orangeText}>{common.workWithUs.charityPartners}</Text></Text>
                            <View style={styles.carouselContainer}>
                                <WorkWithUsCarouselContainer theme={theme} charityData={common.workWithUs.charityData} />
                            </View>
                        </View>
                        <View style={[styles.contactUsMainContainer, { marginBottom: scale(100) }]}>
                            <Text style={styles.headerText}>{common.workWithUs.contactUs}</Text>
                            <Text style={styles.subHeader}>{common.workWithUs.getInTouch}</Text>
                            <View style={styles.contactUsContainer}>
                                <Text style={styles.buttonText}>{common.workWithUs.contactUs}</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default WorkWithUs

