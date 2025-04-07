import { TouchableOpacity, View, Text, Image, FlatList, Dimensions, StyleSheet } from 'react-native';
import React, { memo, useRef, useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Entypo from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';
import { Url } from '../../helpers/routesApi';
import { scale } from 'react-native-size-matters';

const ThumbNail = ({ images }) => {
    const [indexSelected, setIndexSelected] = useState(0);
    const carouselRef = useRef();

    const { width } = Dimensions.get('window');
    const THUMB_SIZE_WIDTH = 63.94;
    const THUMB_SIZE_HEIGHT = 44.53;

    const onSelect = indexSelected => setIndexSelected(indexSelected);

    const onTouchThumbnail = touched => {
        if (touched === indexSelected) return;
        carouselRef?.current?.snapToItem(touched);
    };

    return (
        <View>
            <View style={styles.secondContainer}>
                <Carousel
                    ref={carouselRef}
                    layout='default'
                    data={images}
                    sliderWidth={width}
                    itemWidth={width}
                    onSnapToItem={index => onSelect(index)}
                    renderItem={({ item, index }) => <FastImage key={index} source={{ uri: `${Url.webPImgUrl}${item.ImgURL}`, headers: { Authorization: 'someAuthToken' }, priority: FastImage.priority.normal }} style={styles.mainImg} />}
                    resizeMode={FastImage.resizeMode.contain}
                    loop={true}
                />
                <View style={styles.arrowButtonsContainer}>
                    <TouchableOpacity onPress={() => carouselRef.current.snapToPrev()}>
                        <Entypo name={'chevron-left'} color={'#e8e9e6'} size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => carouselRef.current.snapToNext()}>
                        <Entypo name={'chevron-right'} color={'#e8e9e6'} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Carousel View */}
            {/* Thumbnail component using FlatList */}
            <View style={{paddingHorizontal: scale(10)}}>
                <FlatList
                    // numColumns={4}
                    // horizontal={true}
                    data={images}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => onTouchThumbnail(index)} activeOpacity={0.9}>
                            <FastImage
                                style={{
                                    width: THUMB_SIZE_WIDTH,
                                    height: THUMB_SIZE_HEIGHT,
                                    marginRight: scale(7),
                                    marginBottom: scale(17),
                                    borderRadius: scale(8),
                                    // borderWidth: index === indexSelected ? 2 : 0.75,
                                    // borderColor: index === indexSelected ? '#FFBD0A' : 'transparent'
                                }}
                                source={{ uri: `${Url.webPImgUrl}${item.ImgURL}`, headers: { Authorization: 'someAuthToken' }, priority: FastImage.priority.normal }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

export default memo(ThumbNail);

const styles = StyleSheet.create({
    secondContainer: { 
        marginBottom: scale(20),
        position: 'relative' 
    },
    mainImg: { 
        height: scale(190)
    },
    arrowButtonsContainer: { 
        width: '100%', 
        height: '100%', 
        paddingHorizontal: scale(8), 
        position: 'absolute', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    contentContainerStyle: { 
        flexDirection: 'row', 
        paddingHorizontal: scale(20), 
        flexWrap: 'wrap', 
        justifyContent: 'center' 
    }
})