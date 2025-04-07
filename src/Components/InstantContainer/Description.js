import { View, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useState, useEffect, useContext, memo } from 'react';
import { scale } from 'react-native-size-matters';
import ThemeContext from '../../utils/themes/themeWrapper';
import RenderHTML from 'react-native-render-html';

const Description = (props) => {
    const { descriptionData } = props;
    const { width } = useWindowDimensions();
    const theme = useContext(ThemeContext);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');

    useEffect(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF')
    }, [theme])

    const styles = StyleSheet.create({
        ProductContainer: {
            borderWidth: scale(1.5),
            borderRadius: scale(12),
            borderColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.15)' : 'rgba(151, 151, 151, 0.1517)',
            padding: scale(20),
            backgroundColor: viewBackgroundColor,
            marginBottom: scale(110)
        },
    })


    const tagsStyles = {
        body: {
            color: theme.color,
        },
    };


    return (
        <View style={styles.ProductContainer}>
            <RenderHTML
                contentWidth={width}
                source={{ html: `${descriptionData}` }}
                tagsStyles={tagsStyles}
            />
        </View>
    )
}

export default memo(Description);