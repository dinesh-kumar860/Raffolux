import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState, useEffect, useContext, useMemo, memo } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

import AllPricesCard from './AllPricesCard';
import ThemeContext from '../../utils/themes/themeWrapper';

import { isEmptyArray } from '../../utils/utils';
import { removeDuplicates } from '../../helpers/AllPricesFormatData';
import ActivityIndicatorLoader from '../../helpers/ActivityIndicatorLoader';

const Prices = (props) => {
    const theme = useContext(ThemeContext);
    const { allPrices } = props;
    const [viewBackgroundColor, setViewBackgroundColor] = useState('');
    let [_allPrices, setAllPrices] = useState([]);
    const [allParentItemsRendered, setAllParentItemsRendered] = useState(false)

    useMemo(() => {
        theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
    }, [theme])

    useEffect(() => {
        !isEmptyArray(allPrices) && _removeDuplicates();
    }, [allPrices])

    const _removeDuplicates = async () => {
        const result = await removeDuplicates(allPrices)
        setAllPrices([...result])
    }

    const handleOnEndReached = () => setAllParentItemsRendered(true)

    const styles = StyleSheet.create({
        AvailableText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(2),
            textAlign: 'center',
            marginTop: scale(20)
        },
    });

    return (
        <FlatList
            data={_allPrices}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            renderItem={({ item, index }) => <AllPricesCard key={index} {...item} viewBackgroundColor={viewBackgroundColor} />}
            // ListEmptyComponent={() => (
            //     <Text style={[styles.AvailableText]}>No data found</Text>
            // )}
            // onEndReached={handleOnEndReached}
            // ListFooterComponent={allParentItemsRendered === false ? <View style={{ marginVertical: scale(20) }}><ActivityIndicatorLoader theme={theme} /></View> : null}
            // contentContainerStyle={styles.PrizesContainer}
        />
    )
}

export default memo(Prices)