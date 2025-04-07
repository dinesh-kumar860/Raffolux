import { StyleSheet, Text, View } from 'react-native';
import React, { memo } from 'react';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const AllPricesCardChild = (props) => {
    const { status, instant_win_prize_name, ticket_no_alias, viewBackgroundColor } = props;

    const styles = StyleSheet.create({
        WinCard: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgb(236,236,236)' : 'rgb(31,36,50)',
            paddingVertical: scale(12),
            paddingHorizontal: scale(5),
            width: scale(150),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.196)' : 'rgba(151, 151, 151, 0.4)',
            borderWidth: scale(0.76),
            borderRadius: scale(10),
            marginBottom: scale(10),
            gap: scale(10),
            justifyContent: 'center',
            alignItems: 'center',
            margin:5
        },

        StatusContsiner: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? (status === 1 || status === 2) ? 'rgba(0, 192, 141, 0.8)' : 'rgba(0, 6, 22, 0.10)' : (status === 1 || status === 2) ? 'rgba(0, 192, 141, 0.8)' : '#757577',
            borderRadius: scale(20),
            paddingHorizontal: scale(5),
            height: scale(18),
            width: scale(68),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: scale(0),
        },

        WinNowText: {
            color: ((status === 1 || status === 2) && viewBackgroundColor === '#FFFFFF') ? '#000616' : ((status === 1 || status === 2) && viewBackgroundColor !== '#FFFFFF') ? '#000616' : status === 3 && viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.3)' : '#2f333d',
            fontFamily: 'Gilroy-Black',
            fontSize: responsiveFontSize(1.1)
        },
        DetailsTextContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: scale(15)
        },
        DetailsText: {
            color: ((status === 1 || status === 2) && viewBackgroundColor === '#FFFFFF') ? '#000616' : ((status === 1 || status === 2) && viewBackgroundColor !== '#FFFFFF') ? 'rgba(255, 255, 255, 0.8)' : status === 3 && viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            fontFamily: 'NunitoSans-Regular',
            fontSize:responsiveFontSize(1.5),
            marginBottom: scale(4),
            textAlign: 'center'
        },
    });

    return (
        <View style={styles.WinCard} >
            <View style={[styles.StatusContsiner]}>
                <Text style={styles.WinNowText}>{`${(status === 1 || status === 2) ? 'WIN NOW' : 'PRIZE WON'}`}</Text>
            </View>
            <View style={styles.DetailsTextContainer}>
                <Text style={styles.DetailsText} numberOfLines={1}>{instant_win_prize_name}</Text>
                <Text style={styles.DetailsText}>{`#${ticket_no_alias}`}</Text>
            </View>
        </View>
    )
}

export default memo(AllPricesCardChild);
