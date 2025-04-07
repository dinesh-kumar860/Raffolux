import React from 'react';
import { View } from 'react-native';
import Slider from 'react-native-slider';
import { scale } from 'react-native-size-matters';

const SliderProgressBar = ({ percentage_sold, isCustomRaffle }) => {
    return (
        isCustomRaffle ?
        <Slider
            maximumValue={100}
            minimumValue={0}
            value={percentage_sold > 100 ? 100 : percentage_sold}
            minimumTrackTintColor={'#FFBD0A'}
            maximumTrackTintColor={'#FFBD0A'}
            thumbTintColor={"#00FF00"}
            thumbStyle={{ borderRadius: scale(10), backgroundColor: '#FFBD0A', height: scale(8), width: scale(8) }}
            trackStyle={{ height: scale(3.3), borderRadius: scale(10), backgroundColor: 'rgba(255, 189, 10, 0.2)' }}
            disabled={true}
        /> :
        <View style={{height: scale(8)}}></View>
    )
}

export default SliderProgressBar