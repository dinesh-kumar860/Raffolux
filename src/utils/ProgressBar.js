import React from 'react'
import Slider from 'react-native-slider';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from "react-native";
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import ProgressBarOval from '../assets/Images/ProgressBarOval.png'

const ProgressBar = (props) => {
    const { value, isCustomRaffle } = props;
    return (
        <View style={isCustomRaffle && styles.progressBar}>
            {isCustomRaffle &&
            <View style={{
                height: '100%',
                width: value >= 100 ? '100%' : value > 1 && value <= 5 ? '2%' : value > 5 && value <= 10 ? '7%' : value > 15 && value <= 20 ? '18%' : value > 20 && value <= 25 ? '23%' : value > 25 && value <= 30 ? '27%' : value > 30 && value <= 35 ? '33%' : value > 35 && value <= 40 ? '37%' : value > 40 && value <= 45 ? '43%' : value > 45 && value <= 50 ? '47%' : value > 50 && value <= 55 ? '53%' : value > 55 && value <= 60 ? '57%' : value > 60 && value <= 65 ? '63%' : value > 65 && value <= 70 ? '67%' : value > 70 && value <= 75 ? '73%' : value > 75 && value <= 80 ? '77%' : value > 80 && value <= 85 ? '83%' : value > 85 && value <= 90 ? '87%' : value > 90 && value <= 95 ? '93%' : value > 95 && value <= 100 ? '97%' : '1%',
                backgroundColor: '#FFBD0A',
                borderColor: '#FFBD0A',
                borderRadius: scale(8),
                marginLeft: 0,
                paddingBottom: scale(2),
            }}></View>
        }
            {/* <Image source={ProgressBarOval} style={{position:'absolute',top:-2,marginLeft:`${value}%`,height:8,width:scale(1),borderRadius:scale(50)}}/> */}

        </View>
        // isCustomRaffle &&
        // <Slider
        //     maximumValue={100}
        //     minimumValue={0}
        //     value={value > 100 ? 100 : value}
        //     minimumTrackTintColor={'#FFBD0A'}
        //     maximumTrackTintColor={'#FFBD0A'}
        //     thumbTintColor={"#00FF00"}
        //     thumbStyle={{ borderRadius: scale(10), backgroundColor: '#FFBD0A', height: scale(8), width: scale(8) }}
        //     trackStyle={{ height: scale(3.3), borderRadius: scale(10), backgroundColor: 'rgba(255, 189, 10, 0.2)' }}
        //     disabled={true}
        // />
    )
}

export default ProgressBar;

const styles = StyleSheet.create({
    progressBar: {
        height: responsiveHeight(0.5),
        borderRadius: 8,
        backgroundColor: 'rgba(255, 189, 10, 0.2)',
        position:'relative'
    }
})