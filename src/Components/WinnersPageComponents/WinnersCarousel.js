import React, { useState, useContext, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View, } from 'react-native';
import { scale } from 'react-native-size-matters';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { isEmptyArray } from '../../utils/utils';
import ThemeContext from '../../utils/themes/themeWrapper';

import ActivityIndicatorLoader from '../../helpers/ActivityIndicatorLoader';
import * as common from '../../helpers/common'

import WinnersCarouselData from './WinnersCarouselData';

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6)

const WinnersCarousel = (props) => {
    const theme = useContext(ThemeContext);
    const { winnersData } = props
    const isCarousel = useRef(null);
    const [index, setIndex] = useState(0);

    const handleSnapToItem = (index) => setIndex(index)

    return (
        <View>
            {!isEmptyArray(winnersData) ?
                winnersData?.length === 0 ? <Text style={{ color: theme.color }}>{common.common.NoDataFound}</Text> : <>
                    <Carousel
                        layout={'default'}
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={winnersData}
                        renderItem={({ item }) => (
                            <WinnersCarouselData theme={theme} item={item} SLIDER_WIDTH={SLIDER_WIDTH} ITEM_WIDTH={ITEM_WIDTH} />
                        )}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        useScrollView={true}
                        onSnapToItem={handleSnapToItem}
                        loop={true}
                        // lockScrollWhileSnapping={true}
                        loopClonesPerSide={winnersData.length}
                    />
                    <View >
                        <Pagination
                            dotsLength={winnersData?.length}
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
                            // containerStyle={styles.paginationStyle}
                        />
                    </View>
                </>
                :
                <ActivityIndicatorLoader theme={theme} />
            }
        </View>
    )
}

export default WinnersCarousel;
