import { StyleSheet, Text, View, Image, Switch, Pressable, Linking, DevSettings } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { DrawerContentScrollView, } from '@react-navigation/drawer'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import { useSelector } from 'react-redux';

import ThemeContext from '../utils/themes/themeWrapper';
import { AuthContext } from '../Context/AuthContext';
import { capitalizeFirstLetter } from '../helpers/CapitalizeFirstLetter';

import YouAreWinnerButton from '../Components/MenuComponents/YouAreWinnerButton';
import { RaffoluxAsyncStorage } from '../utils/RaffoluxAsyncStorage';
import * as Common from '../helpers/common';
import MenuTitleCard from '../Components/MenuComponents.js/MenuTitleCard';

import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ReferralPageRaffoluxSymbol from '../assets/Images/ReferralPageRaffoluxSymbol.png';
import menuMyCreditIconLight from '../assets/Images/menuMyCreditIconLight.png';
import menuMyCreditIconDark from '../assets/Images/menuMyCreditIconDark.png';
import menuStoreIconLight from '../assets/Images/menuStoreIconLight.png';
import menuStoreIconDark from '../assets/Images/menuStoreIconDark.png';
import menuWinnersIconLight from '../assets/Images/menuWinnersIconLight.png';
import menuWinnersIconDark from '../assets/Images/menuWinnersIconDark.png';
import menuCharityIconLight from '../assets/Images/menuCharityIconLight.png';
import menuCharityIconDark from '../assets/Images/menuCharityIconDark.png';
import menuGambleAwareLight from '../assets/Images/menuGambleAwareLight.png';
import menuGambleAwareDark from '../assets/Images/GambleAware5.png';


const DrawerContent = (props) => {
    const navigation = useNavigation();
    const theme = useContext(ThemeContext);

    const { storeBalance, userToken } = props;
    const { logout } = useContext(AuthContext);

    const [mode, setMode] = useState(false);

    const name = useSelector((state) => state.getAccountData.data[0]?.first_name);
    const activeRafflesCount = useSelector((state) => state.getAccountData.activeRafflesCount);
    const claimPrizesCount = useSelector((state) => state.getAccountData.claimPrizesCount);
    const creditBalance = useSelector((state) => state.getAccountData.creditBlance)

    useEffect(() => {
        const fetchThemeMode = async () => {
            try {
                const themeModeFromStorage = await RaffoluxAsyncStorage.getItem('themeMode');
                if (themeModeFromStorage !== null) {
                    setMode(themeModeFromStorage);
                }
            } catch (error) {
                console.error('Error fetching theme mode from AsyncStorage:', error);
            }
        };
        fetchThemeMode()

    }, [])


    const lightDarkButton = async (val) => {
        setMode(val);
        EventRegister.emit('changeTheme', val);
        await RaffoluxAsyncStorage.setItem('themeMode', val)
    };

    const toggleMenu = () => props.navigation.dispatch(DrawerActions.closeDrawer());

    const handleLogout = () => {
        toggleMenu()
        logout()
        navigation.navigate('Home')
    }

    const handleNavigation = (route) => route === 'theme' ? lightDarkButton(!mode) : route === 'logout' ? handleLogout() : navigation.navigate(route)


    const lightDarkSwitch = () => {
        return <Switch value={mode} onValueChange={mode => { lightDarkButton(mode) }} thumbColor={mode ? '#FFFFFF' : '#FFFFFF'} trackColor={{ false: 'rgba(20, 22, 40, 0.8015)', true: '#000000' }} />
    }

    const styles = StyleSheet.create({
        drawerContainer: {
            flex: 1,
            backgroundColor: theme.background,
        },
        commonThemeColor: {
            color: theme.color
        },
        profileContainer: {
            backgroundColor: '#28293D',
            paddingHorizontal: scale(15),
            gap: scale(5),
            paddingBottom: scale(27),
            paddingTop: scale(15),
            top:-4
        },
        closeMark: {
            marginBottom: scale(27),
            alignSelf: 'flex-end',
            color: '#FFFFFF'
        },
        withoutLoginCloseMark: {
            marginTop: scale(12),
            color: theme.color,
            marginRight: scale(15)
        },
        nameText: {
            color: '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2)
        },
        activeRafflesText: {
            fontFamily: 'NunitoSans-Regular',
            color: '#FFFFFF',
            fontSize: responsiveFontSize(1.8),
            opacity: scale(0.8)
        },
        YouAreAWinnerContainer: {
            position: 'relative'
        },
        youAreAWinnerBubbleConatiner: {
            position: 'absolute',
            top: 0,
            right: 0
        },
        youAreWinnerText: {
            fontFamily: 'Gilroy-Heavy',
            color: '#000616',
            fontSize: responsiveFontSize(2.4)
        },
        winnerRaffleCountContainer: {
            backgroundColor: '#F44',
            borderRadius: scale(50),
            minWidth: scale(18),
            minHeight: scale(18),
            marginBottom: scale(15),
            alignItems: 'center',
            justifyContent: "center",
        },
        winnerCountText: {
            fontFamily: 'NunitoSans-ExtraBold',
            fontSize: responsiveFontSize(1.4),
            textAlign: 'center',
            color: '#FFFFFF'
        },
        pointsContainer: {
            marginVertical: scale(20),
            paddingHorizontal: scale(15),
            gap: scale(16)
        },
        myPointsText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            opacity: scale(0.5)
        },
        youHavePointsContainer: {
            flexDirection: 'row'
        },
        youHavePointsText: {
            color: theme.color,
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2.2),
        },
        raffoluxImageTextContainer: {
            backgroundColor: "#000616",
            paddingHorizontal: scale(4),
            flexDirection: 'row',
            borderRadius: scale(4),
            gap: scale(3.5),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.theme === Common.common.light ? 'rgba(20, 22, 40, 0.05)' : '#FFBD0A'
        },
        raffoluxSymbol: {
            resizeMode: "contain",
            width: scale(12),
            height: scale(12),
        },
        raffoluxPointNumber: {
            color: '#FFFFFF',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            paddingRight: scale(4)
        },
        groovyPrizeText: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.8),
            opacity: scale(0.7)
        },
        orangeText: {
            color: '#FFBD0A'
        },
        menuContainer: {
            paddingHorizontal: scale(15),
        },
        menuContainerMargin: {
            marginTop: scale(24)
        },
        componentsContainer: {
            gap: scale(8),
            marginTop: scale(8)
        },
        singleComponentsContainer: {
            backgroundColor: theme.theme === Common.common.light ? 'rgba(0,0,0,0.05)' : '#141628',
            padding: scale(14),
            borderRadius: scale(4),
            flexDirection: 'row',
        },
        componentsNameText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            opacity: scale(0.904)
        },
        responsiveFont10: {
            fontSize: responsiveFontSize(1.3)
        },
        myRafflesContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        myRafflesContainer1: {
            flexDirection: 'row',
            gap: scale(15),
            alignItems: 'center'
        },
        raffleCount: {
            position: 'relative',
        },
        raffleCountTextContainer: {
            position: 'absolute',
            backgroundColor: '#FFD70D',
            borderRadius: scale(50),
            alignItems: 'center',
            justifyContent: 'center',
            left: scale(2),
            top: activeRafflesCount > 10 ? scale(-7) : scale(-5)
        },
        raffleCountText: {
            fontFamily: 'NunitoSans-Bold',
            fontSize: responsiveFontSize(1.3),
            color: '#1C1C27',
            paddingHorizontal: scale(5),
            paddingVertical: activeRafflesCount > 10 ? scale(4) : scale(1),
        },
        myRafflesIcon: {
            resizeMode: "contain",
            height: scale(16),
            width: scale(16)
        },
        myCreditIcon: {
            resizeMode: "contain",
            height: scale(12),
            width: scale(16),
        },
        storeIcon: {
            resizeMode: "contain",
            height: scale(15),
            width: scale(15)
        },
        winnersIcon: {
            resizeMode: "contain",
            height: scale(16),
            width: scale(18)
        },
        charityIcon: {
            resizeMode: "contain",
            height: scale(16),
            width: scale(15)
        },
        termsAndPrivacyContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: scale(50)
        },
        termsText: {
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.5),
            color: theme.color
        },
        socialMediaContainer: {
            marginTop: scale(30)
        },
        socialMediaImagesContainer: {
            flexDirection: 'row',
            gap: scale(15),
            justifyContent: "center",
            marginBottom: scale(60)
        },
        socialmediaImage: {
            width: 32,
            height: 32,
            resizeMode: 'contain'
        },
        gamCareImage: {
            width: 133,
            height: 38,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: scale(30)
        },
        gambleAwareImage: {
            width: 186,
            height: 24,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: scale(24),
            marginBottom: scale(60)
        }
    })


    return (
        <DrawerContentScrollView style={styles.drawerContainer}>
            {
                userToken ?
                    <>
                        <View style={styles.profileContainer}>
                            <Ionicons name={'close'} size={25} style={styles.closeMark} onPress={() => toggleMenu()} />
                            <Text style={styles.nameText} >{Common.common.Hi} {capitalizeFirstLetter(name)},</Text>
                            <Text style={styles.activeRafflesText}>{Common.DrawerContent.YouHaveTicketsIn} <Text style={styles.orangeText} onPress={() => handleNavigation(Common.common.MyRaffles)}>{activeRafflesCount} {Common.myRaffles.active} {activeRafflesCount == 1 ? `${Common.common.raffle}` : `${Common.common.raffles}`}</Text></Text>
                            {
                                claimPrizesCount > 0 && <View style={styles.YouAreAWinnerContainer}>
                                    <YouAreWinnerButton />
                                    <View style={styles.youAreAWinnerBubbleConatiner}>
                                        <View style={styles.winnerRaffleCountContainer}>
                                            <Text style={styles.winnerCountText} >{claimPrizesCount}</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                        </View>
                        <View style={styles.pointsContainer}>
                            <Text style={styles.myPointsText}>{Common.DrawerContent.MYPOINTS}</Text>
                            <View style={styles.youHavePointsContainer}>
                                <Text style={styles.youHavePointsText}>{Common.pointsStore.YouHave} </Text>
                                <View style={styles.raffoluxImageTextContainer}>
                                    <Image style={styles.raffoluxSymbol} source={ReferralPageRaffoluxSymbol} />
                                    <Text style={styles.raffoluxPointNumber}>{Number(storeBalance)}</Text>
                                </View>
                                <Text style={styles.youHavePointsText}> {Number(storeBalance) === 1 ? `${Common.common.point}` : `${Common.common.points}`}</Text>
                            </View>
                            <Text style={styles.groovyPrizeText}>{Common.DrawerContent.UseYourRaffoluxPointsToRedeem} <Text style={styles.orangeText} onPress={() => handleNavigation(Common.common.PointsStore)}>{Common.DrawerContent.Store}</Text></Text>
                        </View>
                    </>
                    :
                    <Ionicons name={'close'} size={25} style={[styles.closeMark, styles.withoutLoginCloseMark]} onPress={() => toggleMenu()} />
            }

            <View style={styles.menuContainer}>
                <Text style={styles.myPointsText}>{Common.DrawerContent.MENU}</Text>
                <View style={styles.componentsContainer}>
                    <MenuTitleCard theme={theme} image={<Feather name={'home'} size={17} color={theme.color} />} title={Common.common.Home} onPress={handleNavigation} page={Common.common.Home} />
                    {userToken && <MenuTitleCard theme={theme} image={<Fontisto name={'ticket'} size={17} color={theme.color} />} title={Common.DrawerContent.MyTickets} onPress={handleNavigation} page={Common.common.MyRaffles} activeRafflesCount={activeRafflesCount} />}
                    {userToken && <MenuTitleCard theme={theme} image={<Image style={styles.myCreditIcon} source={theme.theme === 'light' ? menuMyCreditIconLight : menuMyCreditIconDark} />} title={Common.DrawerContent.MyCredit} onPress={handleNavigation} page={Common.common.MyCredit} endText={<Text style={[styles.componentsNameText, styles.orangeText, styles.responsiveFont10]}>£{creditBalance}</Text>} />}
                    {userToken && <MenuTitleCard theme={theme} image={<Image style={styles.storeIcon} source={theme.theme === 'light' ? menuStoreIconLight : menuStoreIconDark} />} title={Common.DrawerContent.Store} onPress={handleNavigation} page={Common.common.PointsStore} />}
                    <MenuTitleCard theme={theme} image={<Image style={styles.winnersIcon} source={theme.theme === 'light' ? menuWinnersIconLight : menuWinnersIconDark} />} title={Common.InstantNonInstant.Winners} onPress={handleNavigation} page={Common.InstantNonInstant.Winners} />
                    {userToken && <MenuTitleCard theme={theme} image={<Octicons name={'gift'} size={17} color={theme.color} />} title={Common.DrawerContent.ReferAFriend} onPress={handleNavigation} page={Common.common.Referral} />}
                    <MenuTitleCard theme={theme} image={<Image style={styles.charityIcon} source={theme.theme === 'light' ? menuCharityIconLight : menuCharityIconDark} />} title={Common.charity.charity} onPress={handleNavigation} page={Common.charity.charity} />
                    {userToken == null && <MenuTitleCard theme={theme} image={<Ionicons name={'moon-outline'} size={17} color={theme.color} />} title={Common.DrawerContent.LightDark} onPress={handleNavigation} endText={lightDarkSwitch()} page={Common.common.theme} />}
                    {userToken == null && <MenuTitleCard theme={theme} image={<AntDesign name={'questioncircleo'} size={17} color={theme.color} />} title={Common.DrawerContent.HelpAndFAQs} onPress={handleNavigation} page={Common.common.FAQ} />}
                </View>
            </View>
            {
                userToken &&
                <>
                    <View style={[styles.menuContainer, styles.menuContainerMargin]}>
                        <Text style={styles.myPointsText}>{Common.DrawerContent.ACCOUNTSETTINGS}</Text>
                        <View style={styles.componentsContainer}>
                            <MenuTitleCard theme={theme} image={<Octicons name={'person'} size={17} color={theme.color} />} title={Common.DrawerContent.PersonalInfo} onPress={handleNavigation} page={Common.common.Accounts} />
                            <MenuTitleCard theme={theme} image={<Ionicons name={'moon-outline'} size={17} color={theme.color} />} title={Common.DrawerContent.LightDark} onPress={handleNavigation} endText={lightDarkSwitch()} page={Common.common.theme} />
                        </View>
                    </View>
                    <View style={[styles.menuContainer, styles.menuContainerMargin]}>
                        <Text style={styles.myPointsText}>{Common.DrawerContent.SITEINFORMATION}</Text>
                        <View style={styles.componentsContainer}>
                            <MenuTitleCard theme={theme} image={<AntDesign name={'questioncircleo'} size={17} color={theme.color} />} title={Common.DrawerContent.HelpAndFAQs} onPress={handleNavigation} page={Common.common.FAQ} />
                            <MenuTitleCard theme={theme} image={<MaterialIcons name={'logout'} size={17} color={theme.color} />} title={Common.DrawerContent.LogOut} onPress={handleNavigation} page={Common.common.logout} />
                        </View>
                    </View></>
            }


            <View style={[styles.termsAndPrivacyContainer, styles.menuContainer]}>
                {
                    Common.menu?.terms.map((ele, i) => (
                        <Text key={i} style={styles.termsText} onPress={() => handleNavigation(ele.compnent)}>{ele.title}</Text>
                    ))
                }
            </View>
            <View style={styles.socialMediaContainer}>
                <View style={styles.socialMediaImagesContainer}>
                    {
                        Common.menu?.socialMediaContainer.map((ele, i) => (
                            <Pressable onPress={() => Linking.openURL(ele.link)} key={i} >
                                <Image style={styles.socialmediaImage} source={theme.theme === 'light' ? ele.light : ele.dark} />
                            </Pressable>
                        ))
                    }
                </View>
                {/* <Image style={styles.gamCareImage} source={theme.theme === 'light' ? require('../assets/Images/menuGamCareLight.png') : require('../assets/Images/GamCare5.png')} /> */}
                {/* <Image style={styles.gambleAwareImage} source={theme.theme === 'light' ? menuGambleAwareLight : menuGambleAwareDark} /> */}
            </View>
        </DrawerContentScrollView>
    )
};

export default DrawerContent;

