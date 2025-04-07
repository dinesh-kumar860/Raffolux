import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { memo, useContext } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import ThemeContext from '../../utils/themes/themeWrapper'
import { scrollToElement } from '../../utils/ScrollToElement'


const ClaimSummaryPayoutOption = (props) => {
    const { mainScrollviewRef, childRef, type, title, amount, isActive, setSelectedPayoutOption, image, viaText, description, page } = props;
    const theme = useContext(ThemeContext);

    const handlePayout = (option) => {
        setSelectedPayoutOption(option);
        option !== 'trueLayer' && scrollToElement(mainScrollviewRef, childRef)
    };

    const InstantPrize = () => {
        return (
            <View style={styles.instantPrizeContainer}>
                <FontAwesome name={'bolt'} size={8} color={'rgba(37, 243, 170, 0.9)'} />
                <Text style={styles.instantText}>INSTANT</Text>
            </View>
        )
    };


    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            paddingLeft: 16,
            paddingRight: 21,
            paddingTop: 15,
            paddingBottom: 13,
            gap: 20,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: isActive ? '#FFBD0A' : theme.theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
            borderRadius: 6
        },
        radioButton: {
            height: 20,
            width: 20,
            borderRadius: 50,
            borderWidth: !isActive ? 1 : null,
            borderColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
            backgroundColor: isActive ? '#FFBD0A' : null,
            alignItems: 'center',
            justifyContent: 'center'
        },
        descriptionContainer: {
            flex: 1
        },
        titleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        titleText: {
            color: theme.color,
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.8),
            opacity: isActive ? 1 : 0.8
        },
        textFontSize: {
            fontSize: responsiveFontSize(1.5)
        },
        viaContainer: {
            flexDirection: 'row',
            gap: 7,
            marginTop: 8
        },
        imageContainer: {
            height: 16,
            width: 16,
            backgroundColor: type == 'bank' ? '#FFBD0A' : type == 'trueLayer' ? '#5459D1' : '#FFF',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3
        },
        icon: {
            width: type == 'bank' ? page == 'trueLayerError' ? 9 : 5.399 : type == 'trueLayer' ? 10 : 8,
            height: type == 'bank' ? page == 'trueLayerError' ? 10 : 10.8 : type == 'trueLayer' ? 10 : 10,
            resizeMode: 'contain'
        },
        viaText: {
            color: theme.color,
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.5),
            opacity: 0.7
        },
        textOpacity: {
            opacity: 0.5,
            marginTop: 11
        },
        instantPrizeContainer: {
            flexDirection: 'row',
            backgroundColor: 'rgba(37, 243, 170, 0.2)',
            alignItems: 'center',
            gap: 2,
            borderRadius: 13,
            paddingHorizontal: 6,
            paddingHVertical: 2,
        },
        instantText: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1),
            color: 'rgba(37, 243, 170, 0.9)'
        },
        trueLayerInstantContainer: {
            flexDirection: 'row',
            gap: 12
        }
    })

    return (
        <TouchableOpacity style={styles.container}  onPress={() => handlePayout(type)} disabled={isActive} >
            <View style={styles.radioButton}>
                {isActive && <Feather name={'check'} size={10} color={theme.background} />}
            </View>
            <View style={styles.descriptionContainer}>
                <View style={styles.titleContainer}>
                    <View style={type == 'trueLayer' ? styles.trueLayerInstantContainer : null}>
                        <Text style={styles.titleText}>{title}</Text>
                        {type == 'trueLayer' && <InstantPrize />}
                    </View>
                    <Text style={[styles.titleText, styles.textFontSize]} >£{amount?.toFixed(2)}</Text>
                </View>
                <View style={styles.viaContainer} >
                    <View style={styles.imageContainer}>
                        <Image source={image} style={styles.icon} />
                    </View>
                    <Text style={styles.viaText}>{viaText}</Text>
                </View>
                <Text style={[styles.viaText, styles.textOpacity]} >{description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default memo(ClaimSummaryPayoutOption)
