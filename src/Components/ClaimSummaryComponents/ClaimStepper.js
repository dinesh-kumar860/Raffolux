import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import ClaimStepperYellowOval from '../../assets/Images/ClaimStepperYellowOval.png'
import ClaimStepperDarkOval from '../../assets/Images/ClaimStepperDarkOval.png'
import ThemeContext from '../../utils/themes/themeWrapper'
import myCreditWonCreditBackground from '../../assets/Images/myCreditWonCreditBackground.png'

const ClaimStepper = (props) => {
    const { page } = props
    const theme = useContext(ThemeContext)

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 9
        },
        image: {
            height: 18,
            width: 18,
            resizeMode: 'contain'
        },
        backgroundImage: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        horizontalLine: {
            height: 3,
            backgroundColor: theme.theme == 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
            flex: 1
        },
        lightThemeOvalStyle:{
            height:15,
            width:15,
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius:50
        }
    })

    const CheckedYellowOval = () => {
        return (
            <ImageBackground style={[styles.image, styles.backgroundImage]} source={myCreditWonCreditBackground} >
                <FontAwesome5 name={'check'} size={11} color={theme.background} />
            </ImageBackground>
        )
    }

    const LightThemeOval = () => {
        return (
            <View style={styles.lightThemeOvalStyle}>

            </View>
        )
    };

    return (
        <View style={styles.container}>
            {
                page === 'PrizeClaim' ? <Image source={ClaimStepperYellowOval} style={styles.image} /> : <CheckedYellowOval />
            }
            <View style={[styles.horizontalLine, { backgroundColor: page !== 'PrizeClaim' ? '#FFBD0A' : theme.theme == 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }]} ></View>
            {(page === 'PrizeClaim' && (theme.theme == 'dark' ? <Image source={ClaimStepperDarkOval} style={styles.image} /> : <LightThemeOval /> ) ) || page === 'PrizeSummary' && <Image source={ClaimStepperYellowOval} style={styles.image} /> || (page === 'PrizeConfirmation' && <CheckedYellowOval />)}
            <View style={[styles.horizontalLine, { backgroundColor: page == 'PrizeConfirmation' ? '#FFBD0A' : theme.theme == 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }]}></View>
            {
                page === 'PrizeConfirmation' ? <CheckedYellowOval /> : (theme.theme == 'dark' ? <Image source={ClaimStepperDarkOval} style={styles.image} /> : <LightThemeOval /> )
            }

        </View>
    )
}

export default ClaimStepper

