// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const WorkWithUsCharitableDonationsCarousel = () => {
//   return (
//     <View>
//       <Text>WorkWithUsCharitableDonationsCarousel</Text>
//     </View>
//   )
// }

// export default WorkWithUsCharitableDonationsCarousel

// const styles = StyleSheet.create({})

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
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.95)

const WorkWithUsCharitableDonationsCarousel = (props) => {
    const { theme,charitableDontaionsImages } = props;
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
            marginHorizontal:scale(17),
            backgroundColor: '#FFFFFF'
        },
        imageStyle:{
            width: '100%',
            height: 200,
            alignSelf: 'center',
            resizeMode:"contain",
            borderRadius: scale(6),
            // paddingHorizontal:scale(17)
        },
        container:{
            
        }
       
    })
    useEffect(() => {
        const interval = setInterval(() => {
          if (isCarousel.current) {
            const newIndex = (index + 1) % charitableDontaionsImages.length;
            isCarousel.current.snapToItem(newIndex);
            setIndex(newIndex);
          }
        }, 2000);
    
        return () => {
          clearInterval(interval);
        };
      }, [index, charitableDontaionsImages]);

    const CarouselCardItem = ({ item, index }) => {
        return (
            <View style={styles.container} key={index}>
                <Image source={{
                    uri: `${item.image}`,
                }} style={styles.imageStyle} />
                <Image />
            </View>
        )
    };

    return (
        <View>
            {
                charitableDontaionsImages?.length !== 0 && <View>
                    <Carousel
                        layout="default"
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={charitableDontaionsImages}
                        renderItem={CarouselCardItem}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        useScrollView={true}
                        onSnapToItem={(index) => setIndex(index)}
                    />
                </View>
            }
        </View>
    )
}

export default WorkWithUsCharitableDonationsCarousel;

