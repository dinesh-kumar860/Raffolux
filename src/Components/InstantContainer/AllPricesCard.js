import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo, useContext, useState } from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image'

import { Url } from '../../helpers/routesApi';
import AllPricesCardChild from './AllPricesCardChild';

import { InstantArrowDark, InstantArrowLight, _InstantArrowDark, _InstantArrowLight } from '../../assets/svgPaths/svgPaths';
import { G, Path, Svg } from 'react-native-svg';
import ActivityIndicatorLoader from '../../helpers/ActivityIndicatorLoader';
import ThemeContext from '../../utils/themes/themeWrapper';

const AllPricesCard = (props) => {
    const { status, title, items, image, img_url, ticket_no_alias, instant_win_prize_name, viewBackgroundColor, _allPrices } = props;
    const theme = useContext(ThemeContext);
    const [toggle, setToggle] = useState(false);
    const [allItemsRendered, setAllItemsRendered] = useState(false)

    const statusInfo = items.map(ele => ele.status);
    const statusActive = items.filter(ele => (ele.status === 1 || ele.status === 2) && ele);
    const statusPriceOwn = statusInfo.some(ele => (ele === 1 || ele === 2) && true);

    const handleToggle = () => {
        setToggle(!toggle);
        setAllItemsRendered(false)
    };

    const handleOnEnd = () => setAllItemsRendered(true);

    const styles = StyleSheet.create({
        cardContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgb(239,239,239)' : 'rgb(37,41,54)',
            borderRadius: scale(7),
            marginBottom: scale(12)
        },
        cardStyle: {
            flexDirection: 'row',
            flex: 1,
            gap: 15,
            paddingLeft: scale(14),
            paddingRight: scale(20),
            paddingVertical: scale(14),
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgb(239,239,239)' : 'rgb(37,41,54)',
            borderRadius: scale(7),
            borderBottomLeftRadius: toggle ? scale(0) : scale(7),
            borderBottomRightRadius: toggle ? scale(0) : scale(7),
        },
        imageSection: {
            padding: scale(14)
        },
        image: {
            width: 96,
            height: 52,
            resizeMode: 'cover',
        },
        detailsSection: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        titleStyle: {
            fontFamily: 'Gilroy-ExtraBold',
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontSize: responsiveFontSize(2),
            marginBottom: scale(8),
        },
        AvailableCount: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        NeonDotContainer: {
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.01)' : '#303440',
            borderColor: viewBackgroundColor === '#FFFFFF' ? '#d8d9db' : '#4f525d',
            borderLeftWidth: scale(1),
            borderTopWidth: scale(1),
            borderBottomWidth: scale(1),
            padding: scale(4),
            borderTopLeftRadius: scale(6),
            borderBottomLeftRadius: scale(6),
        },
        NeonDot: {
            height: scale(15),
            width: scale(15),
            marginLeft: scale(2),
        },
        availableTextConatiner:{
            backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.01)' : '#303440',
            borderColor: viewBackgroundColor === '#FFFFFF' ? '#d8d9db' : '#4f525d',
            borderRightWidth: scale(1),
            borderTopWidth: scale(1),
            borderBottomWidth: scale(1),
            borderTopRightRadius: scale(6),
            borderBottomRightRadius: scale(6),
            padding: scale(4),
        },
        AvailableText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.5),
        },
        downArrowSection: {
            justifyContent: 'center',
        },
    });

    return (
        <Pressable style={styles.cardContainer} onPress={() => handleToggle()} >
            <View style={styles.cardStyle}>
                <FastImage
                    style={styles.image}
                    source={{ uri: `${Url.webPImgUrl}${image.img_url}`, headers: { Authorization: 'someAuthToken' }, priority: FastImage.priority.normal }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={[styles.detailsSection, { flex: 1 }]}>
                    <View>
                        <Text style={styles.titleStyle} numberOfLines={1}>{`Win ${title}`}</Text>
                        <View style={styles.AvailableCount}>
                            <View style={styles.NeonDotContainer} >
                                <Image source={statusPriceOwn === false ? require('../../assets/Images/NanoDotInactive.png') : require('../../assets/Images/NanoDot.png')} style={styles.NeonDot} />
                            </View>
                            <View style={styles.availableTextConatiner}>
                            <Text style={styles.AvailableText}>{`${statusPriceOwn === false ? statusInfo?.length : statusActive?.length} / ${statusInfo?.length} ${statusPriceOwn === false ? 'Already Won  ' : 'Available  '}`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.downArrowSection}>
                        {!toggle ? <Pressable onPress={() => handleToggle()}>
                            {viewBackgroundColor === '#FFFFFF' ?
                                <Svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <G opacity="0.8">
                                        <Path d={InstantArrowDark} fill="#000616" />
                                    </G>
                                </Svg> :
                                <Svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/Svg">
                                    <Path d={InstantArrowLight} fill="white" />
                                </Svg>
                            }
                        </Pressable> :
                            <Pressable onPress={() => handleToggle()}>
                                {viewBackgroundColor === '#FFFFFF' ?
                                    <Svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d={_InstantArrowDark} fill="#000616" />
                                    </Svg>
                                    :
                                    <Svg width="17" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d={_InstantArrowLight} fill="white" />
                                    </Svg>
                                }
                            </Pressable>}
                    </View>
                </View>
            </View>

            {toggle &&
                <View style={{ backgroundColor: viewBackgroundColor === '#FFFFFF' ? 'rgb(239,239,239)' : 'rgb(37,41,54)', borderBottomLeftRadius: scale(7), borderBottomRightRadius: scale(7) }}>
                    <View style={{ borderBottomColor: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.2)' : 'rgba(255, 255, 255, 0.2)', borderBottomWidth: StyleSheet.hairlineWidth, marginBottom: scale(20), marginHorizontal: scale(15) }} />
                    <FlatList
                        data={items}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        style={{  justifyContent: 'center',alignItems:'center' }}
                        renderItem={({ item, index }) => (
                            <AllPricesCardChild key={index} {...item} viewBackgroundColor={viewBackgroundColor} />
                        )}
                        ListEmptyComponent={() => (
                            <Text style={styles.AvailableText}>No data found</Text>
                        )}
                        onEndReached={handleOnEnd}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={allItemsRendered === false && items?.length > 10 ? <View style={{ marginVertical: scale(15) }}><ActivityIndicatorLoader theme={theme} /></View> : null}
                    // contentContainerStyle={styles.PrizesContainer}
                    />
                </View>
            }
        </Pressable>
    )
}

export default memo(AllPricesCard);

const styles = StyleSheet.create({})