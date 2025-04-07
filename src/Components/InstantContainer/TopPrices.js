import { View, Text, StyleSheet, Image } from 'react-native'
import React, { memo } from 'react'
import { scale } from 'react-native-size-matters';

const TopPrices = (props) => {
    const { status, name, ticket_no_alias, viewBackgroundColor } = props;
    
    const styles = StyleSheet.create({
        PrizesContainer: {
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            // flexWrap: 'wrap'
        },

        WinCard: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.05)' : 'rgb(31,36,50)',
            paddingVertical: scale(12),
            paddingHorizontal: scale(5),
            width: scale(155),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.196)' : 'rgba(151, 151, 151, 0.4)',
            borderWidth: scale(0.76),
            borderRadius: scale(10),
            marginBottom: scale(10),
            gap: scale(10),
            justifyContent: 'center',
            alignItems: 'center'
        },

        StatusContsiner: {
            backgroundColor: status === 1 ? 'rgba(0, 192, 141, 0.8)' : '#FFBD0A',
            borderRadius: scale(20),
            paddingHorizontal: scale(5),
            height: scale(18),
            width: scale(68),
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: name.length > 21 ? scale(20) : scale(0),
            marginTop: scale(0),
        },

        WinNowText: {
            color: '#000616',
            fontFamily: 'Gilroy-Black',
            fontSize: scale(9)
        },
        DetailsTextContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: scale(15)
        },
        DetailsText: {
            color: ((status === 1 || status === 2) && viewBackgroundColor === '#FFFFFF') ? '#000616' : ((status === 1 || status === 2) && viewBackgroundColor !== '#FFFFFF') ? 'rgba(255, 255, 255, 0.8)' : status === 3 && viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            fontFamily: 'NunitoSans-Regular',
            fontSize: scale(11.56),
            marginBottom: scale(4),
            textAlign: 'center'
        },
        _DetailsText: {
            color: ((status === 1 || status === 2) && viewBackgroundColor === '#FFFFFF') ? '#000616' : ((status === 1 || status === 2) && viewBackgroundColor !== '#FFFFFF') ? 'rgba(255, 255, 255, 0.8)' : status === 3 && viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            fontFamily: 'NunitoSans-Regular',
            fontSize: scale(11.56),
            marginBottom: scale(4),
        },
    });

    return (
        <View style={styles.WinCard} >
            <View style={[styles.StatusContsiner]}>
                <Text style={styles.WinNowText}>{`${(status === 1 || status === 2) ? 'WIN NOW' : 'PRIZE WON'}`}</Text>
            </View>
            <View style={styles.DetailsTextContainer}>
                <Text style={styles.DetailsText} numberOfLines={1}>{name}</Text>
                <Text style={styles._DetailsText}>{`#${ticket_no_alias}`}</Text>
            </View>
        </View>
    )
}

export default memo(TopPrices)