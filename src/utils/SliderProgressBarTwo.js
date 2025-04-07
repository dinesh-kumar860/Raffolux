import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from './themes/themeWrapper';
import Slider from 'react-native-slider';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { Path, Svg } from 'react-native-svg';

const SliderProgressBarTwo = ({ value, entries_sold, total_entries }) => {

    const theme = useContext(ThemeContext);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF')
    }, [theme])

    const styles = StyleSheet.create({
        progressBar: {
            height: scale(1),
            borderRadius: 8,
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgb(249,232,187)' : '#000000',
            marginHorizontal: scale(13)
        }
    })

    return (
        <View>
            <View style={{ paddingHorizontal: scale(14) }}>
                <View style={{ position: 'relative' }}>
                    <View style={{ position: 'absolute', marginLeft: `${value <=10 ? value - 5 : value <=20 ? value - 5 : value <=30 ? value - 5 : value <=40 ? value - 5 : value <=50 ? value - 5 : value <=60 ? value - 5 : value <=80 ? value - 5: value <=90 ? value - 5 : value <=100 ? value - 7.5 : value - 9}%`, top: scale(-10) }}>
                        <Svg width={47} height={47} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 9.75C0 4.36522 4.36522 0 9.75 0H30.25C35.6348 0 40 4.36522 40 9.75C40 15.1348 35.6348 19.5 30.25 19.5H25L20 24L15 19.5H9.75C4.36522 19.5 0 15.1348 0 9.75Z" fill="#FFBD0A" />
                        </Svg>
                    </View>
                    <Text style={{ width: 50, textAlign: 'center', marginLeft: `${value <=10 ? value - 5 : value <=20 ? value - 5 : value <=30 ? value - 5 : value <=40 ? value - 5 : value <=50 ? value - 5 : value <=60 ? value - 5 : value <=80 ? value - 5: value <=90 ? value - 5 : value <=100 ? value - 7.5 : value - 9}%`, color: '#000616', fontFamily: 'NunitoSans-ExtraBold' }}>{`${Math.floor(value)}%`}</Text>
                </View>

                <Slider
                    maximumValue={97}
                    minimumValue={0}
                    value={value}
                    minimumTrackTintColor={'#FFBD0A'}
                    maximumTrackTintColor={'#FFBD0A'}
                    thumbTintColor="transparent"
                    trackStyle={{
                        height: scale(6),
                        borderRadius: scale(10),
                        backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgb(249,232,187)' : '#000000',
                    }}
                    disabled={true}
                />
            </View>
            <View style={{ marginHorizontal: scale(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: theme.color, fontFamily: 'NunitoSans-Regular', fontSize: responsiveFontSize(1.2) }}>  0</Text>
                <Text style={{ color: theme.color, fontFamily: 'NunitoSans-Regular', fontSize: responsiveFontSize(1.2) }}>{Number(entries_sold).toLocaleString()} tickets sold</Text>
                <Text style={{ color: theme.color, fontFamily: 'NunitoSans-Regular', fontSize: responsiveFontSize(1.2) }}>{total_entries.toLocaleString()}  </Text>
            </View>
        </View>
    )
}

export default SliderProgressBarTwo