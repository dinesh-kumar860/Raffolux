import {  View, Image } from 'react-native'
import React from 'react';

import singleStar from '../assets/Images/reviewStar.png';


const SingleStar = (props) => {
    const { starImageBackground } = props;

    return (
        <View style={starImageBackground}>
            <Image source={singleStar} />
        </View>
    )
}

export default SingleStar
