import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import React, { useState, useEffect, useContext, memo } from 'react';
import { scale } from 'react-native-size-matters';
import ThemeContext from '../../utils/themes/themeWrapper';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import RenderHTML from 'react-native-render-html';

const Details = (props) => {
    const { detailsData } = props;
    const { width } = useWindowDimensions();
    const theme = useContext(ThemeContext);
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    
    // const hasHtmlTags = /<[^>]+>/i.test(detailsData);
    // const htmlContant = detailsData.map((ele) => ele.replaceAll(',', '').trim());
    // const _htmlContant = htmlContant.map((ele) => ele.trim());

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
            marginBottom: scale(250)
        },
    })

    return (
        <View style={styles.ProductContainer}>
                <RenderHTML
                    contentWidth={width}
                    source={{ html: `${detailsData}` }}
                    tagsStyles={{
                        body: { color: theme.color },
                        li: {
                            color:  theme.color,
                            fontFamily: 'NunitoSans-Regular',
                            fontSize: responsiveFontSize(2),
                            letterSpacing: 0.5,
                            marginBottom: scale(10)
                        }
                    }}
                />
        </View>
    )
}

export default memo(Details);