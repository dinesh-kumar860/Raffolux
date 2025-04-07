import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Constants from '../../helpers/constants'

const FlashCashCard = (props) => {
    const {flasCashPrice, flashCashText} = props;
    const [open, setOpen] = useState(false);
    const [dropDownValue, setDropDownValue] = useState('First Item');

    const handleDropDownPress = (title) => {
        setDropDownValue(title);
        setOpen(!open);
    }
    
    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text onPress={() => handleDropDownPress(title)} style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.flashCard}>
            <View style={styles.cardTopSec}>
                <Text style={styles.cardTopSecText1}>£{flasCashPrice}</Text>
                <Text style={styles.cardTopSecText2}>{flashCashText}</Text>
            </View>
            <View style={styles.bottomContentPadding}>
                <View style={styles.cardDetails}>
                    <View style={styles.cardValue}>
                        <Text style={styles.cardValueText}>£0.25</Text>
                    </View>
                    <View style={styles.ticketCount}>
                        <View style={styles.ticketCountSec}>
                            <FontAwesome name={'ticket'} style={styles.ticketIcon} />
                            <Text style={styles.ticketValueNumber}> 399</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.progress}>
                    <View style={styles.progressBar}></View>
                </View>
                <Pressable style={styles.dropDown} onPress={() => setOpen(!open)}>
                    <View>
                        <Text style={styles.dropDownText}>{dropDownValue}</Text>
                    </View>
                    <View style={styles.arrowDownContainer}>
                        <View style={styles.arrowDown}></View>
                    </View>
                </Pressable>
                {open &&
                    <SafeAreaView style={styles.dropDownSafeArea}>
                        <FlatList
                            data={Constants.DATA}
                            renderItem={({ item }) => <Item title={item.title} />}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView >
                }
                <View style={styles.cardDropDownSec}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.cartBtn}>ADD TO CART</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.leftTktSec}>
                    <View style={styles.leftTktSec1}>
                        <FontAwesome
                            name={'ticket'}
                            style={styles.leftTktSecIcon}></FontAwesome>
                        <Text style={styles.leftTktSecText}> 294 left</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default FlashCashCard

const styles = StyleSheet.create({
    flashCard: {
        borderRadius: scale(6),
        backgroundColor: '#28293D',
        width: responsiveWidth(43),
        // height: responsiveHeight(130)
    },
    cardTopSec: {
        height: scale(115),
        backgroundColor: '#5536F9',
        borderRadius: scale(6),
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTopSecText1: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(7),
        color: '#fff',
    },
    cardTopSecText2: {
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(2.5),
        color: '#fff',
    },
    bottomContentPadding: {
        padding: scale(10),
    },
    progress: {
        height: scale(8),
        borderRadius: scale(6),
        backgroundColor: '#000000',
        marginBottom: 12,
    },
    progressBar: {
        width: '60%',
        backgroundColor: '#25F361',
        height: responsiveHeight(1),
        borderRadius: scale(6),
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: scale(10)
    },
    cardValue: {
        backgroundColor: '#000000',
        borderRadius: scale(3),
        height: scale(32),
        width: scale(60),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardValueText: {
        fontFamily: 'NunitoSans-ExtraBold',
        fontSize: responsiveFontSize(1.5),
        color: '#fff',
        paddingVertical: 7,
    },
    ticketCount: {
        backgroundColor: '#000000',
        borderRadius: scale(3),
        width: scale(60),
        height: scale(32),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ticketCountSec: {
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ticketIcon: {
        fontSize: responsiveFontSize(1.4),
        color: 'white',
        marginTop: scale(1)
    },
    ticketValueNumber: {
        fontFamily: 'NunitoSans-ExtraBold',
        fontSize: responsiveFontSize(1.5),
        color: '#fff',
        marginBottom: 0,
    },
    buttonStyle: {
        width: '100%',
        backgroundColor: '#25F361',
        borderRadius: 5,
        paddingHorizontal: 9,
        paddingVertical: 11,
        marginTop: 5,
    },
    cartBtn: {
        alignSelf: 'center',
        color: '#1C1C27',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: responsiveFontSize(1.6),
    },

    leftTktSec: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    leftTktSec1: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftTktSecIcon: {
        color: '#fff',
        fontSize: scale(9),
        padding: 0,
    },
    leftTktSecText: {
        color: '#fff',
        fontSize: responsiveFontSize(1.1),
        fontFamily: 'Nunito-Regular',
    },
    arrowDownContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        left: scale(20),
        top: scale(5)
    },
    dropDown: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: scale(1.5),
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: scale(4),
        marginBottom: scale(8),
        height: scale(35),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // zIndex: scale(1),
        // elevation: scale(1)
    },

    arrowDown: {
        width: responsiveWidth(2),
        height: responsiveHeight(2),
        borderTopWidth: responsiveWidth(1.5),
        borderRightWidth: responsiveWidth(1.5),
        borderBottomWidth: responsiveWidth(0),
        borderLeftWidth: responsiveWidth(1.5),
        borderTopColor: "#FFFFFF",
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    dropDownText: {
        color: '#FFFFFF',
        fontFamily: 'Gilroy-Bold',
    },
    item: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        marginVertical: scale(2),
        paddingHorizontal: scale(5),
        marginHorizontal: scale(8),
        borderRadius: scale(4),
    },
    title: {
        fontSize: responsiveFontSize(2),
    },
    dropDownSafeArea: {
        backgroundColor: '#1C1C27',
        borderRadius: scale(4),
        width: '100%',
        position: 'absolute',
        top: scale(110),
        left: scale(10),
        zIndex: scale(1),
        elevation: scale(1)
    }
})