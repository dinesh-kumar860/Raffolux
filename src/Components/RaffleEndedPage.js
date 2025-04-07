import { View, Text, StyleSheet, ScrollView, RefreshControl, Image, Pressable, TouchableOpacity,ImageBackground } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import { routes } from '../helpers/routes';
import * as Common from '../helpers/common';
import { Url } from '../helpers/routesApi';

import { formattedDateTime, isEmptyArray } from '../utils/utils';

import Description from './InstantContainer/Description';
import Footer from './Footer';

import RandomImg from '../assets/Images/RandomImg.png';
import WinnerBadge from '../assets/Images/WinnerBadge.png';
import CombinedShape from '../assets/Images/CombinedShape.png';
import CombinedShapeForDarkMode from '../assets/Images/CombinedShapeForDarkMode.png';
import ListMenu from '../assets/Images/ListMenu.png';
import ListMenuDarkMode from '../assets/Images/ListMenuDarkMode.png';
import Crown from '../assets/Images/Crown.png';
import CrownDarkMode from '../assets/Images/CrownDarkMode.png';



const RaffleEndedPage = (props) => {
    const { RaffleExpire, coverPhoto, _getRafflePageDataWithLogin, viewBackgroundColor, winnersData, title, RaffleId, descriptionData, details, raffleType } = props;
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState('Description')


    const goToWinners = () => navigation.navigate(routes.Winners);
    const goToDrawDetails = () => !isEmptyArray(winnersData) && navigation.navigate('DrawDetails', { drawCode: winnersData[0].DrawCode })

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setActiveTab('Description')
            setRefreshing(false);
        }, 1000);
    }, []);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616',
        },
        scrollViewContainer: {
            flexGrow: 1,
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616'
        },
        image: {
            width: '100%',
            resizeMode: 'contain',
            borderBottomLeftRadius: scale(8),
            borderBottomRightRadius: scale(8),
        },
        imageContainer: {
            height: responsiveHeight(26),
        },
        imageInfo: {
            backgroundColor: 'rgba(0, 6, 22, 0.85)',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        RaffleEnded: {
            color: '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            marginBottom: scale(8)
        },
        RaffleEndedDetails: {
            color: '#FFFFFF',
            fontSize: responsiveFontSize(1.8),
            fontFamily: 'NunitoSans-Regular',
            textAlign: 'center',
            marginBottom: scale(22)
        },
        randomImg: {
            height: responsiveHeight(4),
            width: responsiveWidth(44),
        },
        raffleDetailsContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F5F5F5' : '#000616',
            marginTop: scale(30),
        },
        winnerTextImage: {
            height: responsiveHeight(5.2),
            width: responsiveWidth(36),
            marginBottom: scale(22)
        },
        WinnerSentance: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
            marginBottom: scale(20),
            marginHorizontal: scale(45),
        },
        raffleImage: {
            height: scale(120),
            width: scale(120),
            borderRadius: 100,
            marginBottom: scale(25)
        },
        WinnerSentance2: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            marginBottom: scale(9)
        },
        winnerTicketImage: {
            height: responsiveHeight(3.5),
            width: responsiveWidth(19),
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: scale(32),
        },
        TicketsCount: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.23),
            textAlign: 'center'
        },
        buttonsContainer: {
            paddingHorizontal: scale(16),
            gap: 10,
            marginBottom: responsiveHeight(3)
        },
        Button: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#0006160D' : '#FFFFFF0D',
            borderWidth: scale(1.24),
            borderColor: viewBackgroundColor === '#FFFFFF' ? '#00061632' : '#FFFFFF32',
            borderRadius: scale(6),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: scale(6),
            height: responsiveHeight(6.2)
        },
        buttonImage: {
            height: 14,
            width: 17
        },
        ButtonText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            marginBottom: scale(8),
            textAlign: 'center',
            paddingTop: scale(9)
        },
        contentContainer: {
            paddingHorizontal: scale(16),
        },
        tabsContainer: {
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.20)' : 'rgba(151, 151, 151, 0.60)',
            borderWidth: 1,
            height: responsiveHeight(6.2),
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            borderRadius: 6,
            marginBottom: responsiveHeight(3)
        },
        singleTabContainer(isActive) {
            return {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: viewBackgroundColor === '#FFFFFF' ? isActive ? 'rgba(0, 6, 22, 0.30)' : 'rgba(0, 6, 22, 0.20)' : isActive ? 'rgba(151, 151, 151, 0.60)' : 'rgba(151, 151, 151, 0.60)',
                backgroundColor: viewBackgroundColor === '#FFFFFF' ? isActive ? 'rgba(0, 6, 22, 0.05)' : null : isActive ? '#070B1A' : null,
                borderRightWidth: isActive && activeTab === "Description" ? 1.24 : 0,
                borderLeftWidth: isActive && activeTab === "Details" ? 1.24 : 0,
                borderRadius: 6,
            }
        },
        tabText(isActive) {
            return {
                color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
                fontFamily: 'Gilroy-ExtraBold',
                fontSize: responsiveFontSize(1.6),
                letterSpacing: 0.275,
                opacity: isActive ? 1 : 0.6
            }
        }
    });

    const Tab = (props) => {
        const { tabTitle, isActive } = props
        return (
            <TouchableOpacity style={styles.singleTabContainer(isActive)} onPress={() => setActiveTab(tabTitle)} disabled={isActive}>
                <Text style={styles.tabText(isActive)}>{tabTitle}</Text>
            </TouchableOpacity>
        )
    }

    const Button = (props) => {
        const { image, buttonText ,handleOnPress} = props
        return (
            <Pressable style={styles.Button} onPress={() => handleOnPress()}>
                <Image source={image} style={styles.buttonImage} />
                <Text style={styles.ButtonText}>{buttonText}</Text>
            </Pressable>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View style={styles.imageContainer}>
                    <ImageBackground source={{ uri: `${Url.ImageUrl}${coverPhoto}` }} style={styles.image} >
                        <View style={styles.imageInfo}>
                            <Text style={styles.RaffleEnded}>{Common.InstantNonInstant.RAFFLE_ENDED}</Text>
                            <Text style={styles.RaffleEndedDetails}>{`${Common.InstantNonInstant.ThisDrawWasProvidedAndVerifiedAt} ${formattedDateTime(RaffleExpire, Common.common.HHHH_Format, Common.common.londonTimezone)} ${Common.InstantNonInstant.onThe} ${formattedDateTime(RaffleExpire, Common.common.Do_MMM_YYYY_Format, Common.common.londonTimezone)} ${Common.InstantNonInstant.by}`}</Text>
                            <Image style={styles.randomImg} source={RandomImg} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.raffleDetailsContainer}>
                    <Image style={styles.winnerTextImage} source={WinnerBadge} />
                    <Text style={styles.WinnerSentance}>{`${winnersData[0]?.Name} won ${title}`}</Text>
                    <Image style={styles.raffleImage} source={{ uri: `${Url.ImageUrl}${coverPhoto}` }} />
                    <Text style={styles.WinnerSentance2}>{Common.InstantNonInstant.WithLuckyTicketNumber}</Text>
                    <ImageBackground style={styles.winnerTicketImage} source={viewBackgroundColor === '#FFFFFF' ? CombinedShape : CombinedShapeForDarkMode} >
                        <Text style={styles.TicketsCount}>{winnersData[0]?.TicketNo}</Text>
                    </ImageBackground>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button image={viewBackgroundColor === '#FFFFFF' ? ListMenu : ListMenuDarkMode} buttonText={Common.InstantNonInstant.EntryList} handleOnPress={goToDrawDetails} />
                    <Button image={viewBackgroundColor === '#FFFFFF' ?  Crown : CrownDarkMode} buttonText={Common.InstantNonInstant.Winners} handleOnPress={goToWinners} />
                </View>
                <View style={styles.contentContainer}>
                    {
                        raffleType == "NonInstant" ?
                            <>
                                <View style={styles.tabsContainer} >
                                    <Tab tabTitle={"Description"} isActive={activeTab == "Description"} />
                                    <Tab tabTitle={"Details"} isActive={activeTab == "Details"} />
                                </View>
                                <Description descriptionData={activeTab == "Description" ? descriptionData : details} />
                            </>
                            :
                            <Description descriptionData={descriptionData} />
                    }
                </View>
                <View>
                    {/* <Footer /> */}
                </View>
            </ScrollView>
        </View>

    )
}

export default RaffleEndedPage