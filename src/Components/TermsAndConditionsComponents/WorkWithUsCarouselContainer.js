
import React, { useEffect } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';


const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9)

const WorkWithUsCarouselContainer = (props) => {
    const { theme,charityData } = props;
    const isCarousel = React.useRef(null);
    const [index, setIndex] = React.useState(0);

    const styles = StyleSheet.create({
        cardImageContainer: {
            gap: scale(5),
            justifyContent: 'center',
            // borderWidth: scale(1),
            // borderColor: 'rgba(0, 6, 22, 0.246203)',
            borderRadius: scale(12),
            paddingVertical: scale(21),
            paddingHorizontal: scale(32),
            width: ITEM_WIDTH,
            elevation:scale(4),
            // marginHorizontal:scale(17),
            backgroundColor: theme.background
        },
        imageStyle:{
            width: responsiveWidth(40),
            height: responsiveHeight(20),
            alignSelf: 'center',
            resizeMode:"contain",
        },
        nameText: {
            fontSize: responsiveFontSize(2.4),
            fontFamily: 'Gilroy-ExtraBold',
            marginTop: scale(3),
            textAlign: 'center',
        },
        raffleText: {
            fontSize: responsiveFontSize(1.9),
            fontFamily: 'Gilroy-ExtraBold',
            textAlign: 'center',
            opacity:scale(0.6)
        },
        paginationContainer: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        winnersDataText: {
            textAlign: 'center',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(2),
            marginBottom: scale(20)
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
          if (isCarousel.current) {
            const newIndex = (index + 1) % charityData.length;
            isCarousel.current.snapToItem(newIndex);
            setIndex(newIndex);
          }
        }, 2000);
    
        return () => {
          clearInterval(interval);
        };
      }, [index, charityData]);

    const CarouselCardItem = ({ item, index }) => {
        return (
            <View style={[styles.cardImageContainer, ]} key={index}>
                <Image source={{
                    uri: `${item.image}`,
                }} style={styles.imageStyle} />
                <Image />
                <Text style={[styles.raffleText, { color: theme.color }]} >{item.description}</Text>
                <Text style={[styles.nameText, { color: theme.color }]} >{item.name}</Text>
            </View>
        )
    };

    return (
        <View>
            {
                charityData.length !== 0 && <View>
                    <Carousel
                        layout="default"
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={charityData}
                        renderItem={CarouselCardItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        useScrollView={true}
                        onSnapToItem={(index) => setIndex(index)}
                    />
                    <View style={styles.paginationContainer}>
                        <Pagination
                            dotsLength={charityData.length}
                            activeDotIndex={index}
                            carouselRef={isCarousel}
                            dotStyle={{
                                width: scale(10),
                                height: scale(10),
                                borderRadius: scale(8),
                                backgroundColor: theme.color,
                                borderWidth: 1,
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            tappableDots={true}
                            containerStyle={styles.paginationStyle}
                        />
                    </View>
                </View>
            }
        </View>
    )
}

export default WorkWithUsCarouselContainer;

