import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { scale } from 'react-native-size-matters'

import MyCreditCard from './MyCreditCard'


const MyCreditMainCard = (props) => {
    const { theme, data, title } = props;

    const styles = StyleSheet.create({
        dateContainer: {
            gap: scale(24)
        },
        todayText: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.4),
            lineHeight: scale(13.64),
            color: theme.color,
            opacity: scale(0.799)
        },
    });

    return (
        <View style={styles.dateContainer}>
            <Text style={styles.todayText}>{title}</Text>
            {
                data?.map((ele, i) => (
                    <MyCreditCard theme={theme} key={i} image={ele.display_image_url} value={ele.value} time={ele.created_at} />
                ))
            }
        </View>
    )
}

export default memo(MyCreditMainCard)

