import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, TextInput } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import SvgUri from 'react-native-svg-uri';
import { Svg, Path } from 'react-native-svg';
import ThemeContext from '../utils/themes/themeWrapper'

const ProgressBarTwo = (props) => {
    const { value, total_entries, entries_sold } = props;
    const theme = useContext(ThemeContext);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF')
    }, [theme])

    const styles = StyleSheet.create({
        progressBar: {
            height: responsiveHeight(1),
            borderRadius: 8,
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgb(249,232,187)' : '#000000',
            marginBottom: 10,
            // width: '100%',
            marginHorizontal: scale(10)
        }
    })

    return (
        <>
            <View style={{ height: scale(50), justifyContent: 'flex-end', position: 'relative' }}>

                <View style={{
                    position: 'absolute', bottom: scale(15), left: value > 1 && value <= 3 ? scale(22) : value > 3 && value <= 5 ? scale(22) : value > 5 && value <= 10 ? scale(22) : value > 10 && value <= 20 ? scale(22) : value > 20 && value <= 30 ? scale(22) : value > 30 && value <= 40 ? scale(17) : value > 40 && value <= 50 ? scale(17) : value > 50 && value <= 60 ? scale(15) : value > 60 && value <= 70 ? scale(14) : value > 70 && value <= 80 ? scale(10) : value > 80 && value <= 90 ? scale(8) : value > 90 && value <= 100 ? scale(8) : scale(15),
                    justifyContent: 'flex-end', alignItems: 'flex-end',
                    width: value >= 100 ? '100%' : value > 1 && value <= 3 ? '8%' : value > 3 && value <= 5 ? '8%' : value > 5 && value <= 10 ? '8%' : value > 10 && value <= 15 ? '8%' : value > 15 && value <= 20 ? '18%' : value > 20 && value <= 25 ? '23%' : value > 25 && value <= 30 ? '27%' : value > 30 && value <= 35 ? '34%' : value > 35 && value <= 40 ? '38%' : value > 40 && value <= 45 ? '43%' : value > 45 && value <= 50 ? '49%' : value > 50 && value <= 55 ? '53%' : value > 55 && value <= 60 ? '57%' : value > 60 && value <= 65 ? '63%' : value > 65 && value <= 70 ? '67%' : value > 70 && value <= 75 ? '73%' : value > 75 && value <= 80 ? '77%' : value > 80 && value <= 85 ? '83%' : value > 85 && value <= 90 ? '87%' : value > 90 && value <= 95 ? '93%' : value > 95 && value <= 100 ? '97%' : '1%',
                }}>
                    <Svg width={47} height={47} viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 9.75C0 4.36522 4.36522 0 9.75 0H30.25C35.6348 0 40 4.36522 40 9.75C40 15.1348 35.6348 19.5 30.25 19.5H25L20 24L15 19.5H9.75C4.36522 19.5 0 15.1348 0 9.75Z" fill="#FFBD0A" />
                    </Svg>
                    <Text style={{ fontSize: scale(12), width: value > 95 && value <= 100 ? 40 : 30, position: 'absolute', bottom: value > 10 && value <= 20 ? scale(15) : scale(14), right: value > 10 && value <= 20 ? scale(5) : value > 95 && value <= 100 ? scale(0) : scale(5.6), color: '#000616', fontFamily: 'NunitoSans-ExtraBold' }}>{`${value}%`}</Text>
                </View>

                <View style={styles.progressBar}>
                    <View style={{
                        height: '100%',
                        width: value >= 100 ? '100%' : value > 1 && value <= 3 ? '3%' : value > 3 && value <= 5 ? '5%' : value > 5 && value <= 10 ? '7%' : value > 10 && value <= 15 ? '7%' : value > 15 && value <= 20 ? '18%' : value > 20 && value <= 25 ? '23%' : value > 25 && value <= 30 ? '27%' : value > 30 && value <= 35 ? '33%' : value > 35 && value <= 40 ? '37%' : value > 40 && value <= 45 ? '43%' : value > 45 && value <= 50 ? '49%' : value > 50 && value <= 55 ? '53%' : value > 55 && value <= 60 ? '57%' : value > 60 && value <= 65 ? '63%' : value > 65 && value <= 70 ? '67%' : value > 70 && value <= 75 ? '73%' : value > 75 && value <= 80 ? '77%' : value > 80 && value <= 85 ? '83%' : value > 85 && value <= 90 ? '87%' : value > 90 && value <= 95 ? '93%' : value > 95 && value <= 100 ? '97%' : '1%',
                        backgroundColor: '#FFBD0A',
                        borderColor: '#FFBD0A',
                        borderRadius: scale(8),
                        marginLeft: 0,
                        paddingBottom: scale(2),
                    }}>
                    </View>
                </View>

            </View>
            <View style={{ marginHorizontal: scale(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: theme.color, fontFamily: 'NunitoSans-Regular', fontSize: scale(10) }}>0</Text>
                <Text style={{ color: theme.color, fontFamily: 'NunitoSans-Regular', fontSize: scale(10) }}>{`${entries_sold} tickets left`}</Text>
                <Text style={{ color: theme.color, fontFamily: 'NunitoSans-Regular', fontSize: scale(10) }}>{total_entries}</Text>
            </View>
        </>
    )
}

export default ProgressBarTwo;