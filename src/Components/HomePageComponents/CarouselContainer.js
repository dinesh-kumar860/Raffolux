import React, { memo } from 'react'
import { StyleSheet, View, ScrollView } from "react-native";
import { scale } from 'react-native-size-matters';

import Carousel from './Carousel';

const CarouselContainer = (props) => {
    const { carouselData } = props;

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles._Container}>
                {carouselData?.map((ele, i) => <Carousel key={i} {...ele} />)}
            </View>
        </ScrollView>
    )
}

export default memo(CarouselContainer);

const styles = StyleSheet.create({
    _Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: scale(5),
        paddingRight: scale(10)
    }
})