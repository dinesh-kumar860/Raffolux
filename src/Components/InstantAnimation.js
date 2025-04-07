import React, { useEffect, useRef, useState, useContext } from 'react';
import { StyleSheet, View, Image, Animated, Text, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { Easing } from 'react-native-reanimated';
import ThemeContext from '../utils/themes/themeWrapper';
import { Url } from '../helpers/routesApi';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import RaffoluxExaclamtorySymbolBlack from '../assets/Images/RaffoluxExaclamtorySymbolBlack.png';
import { scale } from 'react-native-size-matters';

import WinnerBadge from '../assets/Images/WinnerBadge.png';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { isEmptyArray, isEmptyObject } from '../utils/utils';
import InstantPrizeWin from './InstantPrizeWin';



const InstantAnimation = ({ route }) => {
    const { winningTicketDetails, cartItems, raffleImage, title, drawTime, jwtToken, raffleId, cartId, cartUserId ,raffleCode,isAllRafflesOpen,highestWinningObject} = route.params;

    const logoScaleAnim = useRef(new Animated.Value(0)).current;
    const logoShakeAnim = useRef(new Animated.Value(0)).current;
    const cardAnim = useRef(new Animated.Value(0)).current;
    const fadeOutAnim = useRef(new Animated.Value(0)).current;
    const [showConfetti, setShowConfetti] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // Logo blast animation

        // Animated.timing(logoScaleAnim, {
        //     toValue: 1.1,
        //     duration: 100,
        //     easing: Easing.linear,
        //     useNativeDriver: true,
        // }),
        // Animated.timing(logoScaleAnim, {
        //     toValue: 1,
        //     duration: 100,
        //     easing: Easing.linear,
        //     useNativeDriver: true,
        // })
        Animated.timing(logoScaleAnim, {
            toValue: 5,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        })
            .start(() => {
                // Shake animation after logo becomes big
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(logoShakeAnim, {
                            toValue: 1,
                            duration: 10,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }),
                        Animated.timing(logoShakeAnim, {
                            toValue: -1,
                            duration: 10,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }),
                        Animated.timing(logoShakeAnim, {
                            toValue: 1,
                            duration: 10,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }),
                        Animated.timing(logoShakeAnim, {
                            toValue: -1,
                            duration: 10,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        }),
                    ]),
                    { iterations: 3 } // 2 seconds
                ).start(() => {
                    setShowConfetti(true);
                    setTimeout(() => {
                        setShowCard(true);
                        Animated.timing(cardAnim, {
                            toValue: 1,
                            duration: 2000,
                            easing: Easing.out(Easing.exp),
                            useNativeDriver: true,
                        }).start(() => {
                            // Fade out animation
                            setTimeout(() => {
                                Animated.timing(fadeOutAnim, {
                                    toValue: 1,
                                    duration: 100,
                                    easing: Easing.out(Easing.exp),
                                    useNativeDriver: true,
                                }).start(() => {
                                    setModalVisible(true)
                                });
                            }, 500); // Delay before fading out
                        });
                    }, 1000); // Adjust delay as needed
                });
            });
    }, [logoScaleAnim, logoShakeAnim, cardAnim, fadeOutAnim]);

    const logoShakeInterpolate = logoShakeAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-10deg', '10deg'],
    });

    const cardTranslateY = cardAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [60, 0],
    });

    const cardScale = cardAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
    });

    const cardOpacity = cardAnim.interpolate({
        inputRange: [1, 1],
        outputRange: [1, 1],
    });

    const fadeOutOpacity = fadeOutAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

    const handleNavigation = () => {
        setModalVisible(false);
        navigation.goBack()
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.background,
        },
        logoContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo: {
            width: responsiveWidth(10),
            height: responsiveHeight(5),
            resizeMode: 'contain'
        },
        confetti: {
            width: '100%',
            height: '100%',
            position: 'absolute',
        },
        card: {
            width: responsiveWidth(47),
            height: responsiveHeight(29),
            backgroundColor: "#141729",
            borderRadius: 12,
            elevation: scale(4),
            position: 'relative',
            // top: '50%', // Center vertically
            // left: '50%', // Center horizontally
            // transform: [{ translateX: -50 }, { translateY: -50 }] 
        },
        instantWinCardContainerElevation: {
            shadowColor: "#FFBD0A",
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,
            elevation: 24,
        },
        boughtTicketsLength: {
            fontSize: responsiveFontSize(12.8),
            color: "#FFBD0A",
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            // marginHorizontal: responsiveWidth(5),
            marginTop: responsiveHeight(3)
        },
        winningTicketRaffleImageContainer: {
            marginTop: responsiveHeight(4.4),
            marginHorizontal: responsiveWidth(3)
        },
        winningTicketRaffleImage: {
            height: responsiveHeight(11),
            width: "100%",
            resizeMode: 'cover',
        },
        ticketNumberContainer: {
            height: responsiveHeight(2.8),
            backgroundColor: '#FFBD0A',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: responsiveWidth(4),
            borderRadius: 12,
            marginTop: responsiveHeight(1.2),
            alignSelf: 'center'
        },
        ticketNumber: {
            color: '#000616',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
            letterSpacing: 1
        },
        descriptionText: {
            color: "#FFFFFF",
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            marginHorizontal: responsiveWidth(5),
            marginTop: responsiveHeight(1)
        },
        winnerBadge: {
            resizeMode: "contain",
            position: 'absolute',
            width: responsiveWidth(32),
            height: responsiveHeight(4.5),
            top: -15,
            alignSelf: 'center',
        },
        modalContainer: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: responsiveWidth(3),
            paddingVertical: responsiveHeight(2),
        }
    });

    return (
        <View style={styles.container}>
            {!showConfetti && (
                <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScaleAnim }, { rotate: logoShakeInterpolate }] }]}>
                    <Image source={{ uri: `${Url.ImageUrl}redev_images/LogoOutline-GlowShadow.png` }} style={styles.logo} />
                </Animated.View>
            )}
            {showConfetti && (
                <LottieView
                    source={require('../assets/Images/LottieAnimation2.json')}
                    autoPlay
                    loop={false}
                    style={styles.confetti}
                />
            )}
            {showCard && (
                !isEmptyObject(highestWinningObject) ?
                    <Animated.View style={{ transform: [{ translateY: cardTranslateY }, { scale: cardScale }], opacity: fadeOutOpacity }} >
                        <View style={[styles.card, styles.instantWinCardContainerElevation]}>
                            <View style={styles.winningTicketRaffleImageContainer}>
                                <FastImage source={{ uri: `${Url.ImageUrl}${highestWinningObject?.img_url}` }} style={styles.winningTicketRaffleImage} resizeMode={FastImage.resizeMode.contain} />
                            </View>
                            <View style={styles.ticketNumberContainer}>
                                <Text style={styles.ticketNumber}>{highestWinningObject?.TicketNo}</Text>
                            </View>
                            <Text style={styles.descriptionText}>{highestWinningObject?.name}</Text>
                        </View>
                        <Image source={WinnerBadge} style={styles.winnerBadge} />
                    </Animated.View>
                    :
                    <Animated.View style={{ transform: [{ translateY: cardTranslateY }, { scale: cardScale }], opacity: fadeOutOpacity }} >
                        <View style={styles.card}>
                            <Text style={styles.boughtTicketsLength}>{cartItems?.length}</Text>
                            <Text style={styles.descriptionText}>Chance{cartItems?.length > 1 ? 's' : ''} to Win the Jackpot Draw!</Text>
                        </View>
                    </Animated.View>
            )}
            <Modal animationType="fade" transparent={false} visible={modalVisible} onRequestClose={() => { handleNavigation() }} style={{ backgroundColor: 'blue' }} >
                <View style={styles.modalContainer}>
                    <InstantPrizeWin cartItems={cartItems} winningTicketDetails={winningTicketDetails} raffleImage={raffleImage} title={title} drawTime={drawTime} isPrizesWon={winningTicketDetails.length > 0 ? true : false} jwtToken={jwtToken} raffleId={raffleId} cartId={cartId} cartUserId={cartUserId} raffleCode={raffleCode} isAllRafflesOpen={isAllRafflesOpen} />
                </View>
            </Modal>
        </View>
    );
};



export default InstantAnimation;
