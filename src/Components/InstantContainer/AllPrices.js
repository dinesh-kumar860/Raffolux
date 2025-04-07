import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { memo } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import AllPricesCard from './AllPricesCard';

const AllPrices = (props) => {
    const { viewBackgroundColor, _allPrices } = props;

    const styles = StyleSheet.create({
        AvailableText: {
            color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#FFFFFF',
            fontFamily: 'NunitoSans-Regular',
            fontSize: responsiveFontSize(1.5),
        },
    });

    return (
        <>
            <FlatList
                data={_allPrices}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
                renderItem={({ item, index }) => (
                    <View >
                        <AllPricesCard
                            key={index}
                            {...item}
                            viewBackgroundColor={viewBackgroundColor}
                        />
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.AvailableText}>No data found</Text>
                )}
                // ListFooterComponent={loader ? <ActivityIndicatorLoader theme={theme} /> : null}
                contentContainerStyle={styles.PrizesContainer}
            />
        </>
    )
}

export default memo(AllPrices)