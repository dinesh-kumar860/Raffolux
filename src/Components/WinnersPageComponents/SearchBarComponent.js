import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState, memo } from 'react'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

import Fontisto from 'react-native-vector-icons/Fontisto';

import { fetchWinnersDatewiseDataFilterWithLogin } from '../../api/winnersApi';

import ThemeContext from '../../utils/themes/themeWrapper';
import { isEmptyArray } from '../../utils/utils';
import * as common from '../../helpers/common';
import ActivityIndicatorLoader from '../../helpers/ActivityIndicatorLoader';


const SearchBarComponent = () => {
    const theme = useContext(ThemeContext);
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false)

    const fetchSearchData = async (query) => {
        setSearchLoading(true)
        setSearchQuery(query)
        let response = await fetchWinnersDatewiseDataFilterWithLogin({ searchValue: query });
        response && setSearchLoading(false)
        response && setSearchedData(response);
    };

    return (
        <View>
            <View style={[styles.seaechBarContainer, { backgroundColor: theme.theme === 'dark' ? '#070B1A' : '#F4F4F5' }]}>
                <Fontisto name="search" size={20} color={theme.color} style={styles.searchStyle} />
                <TextInput
                    style={[styles.input, { color: theme.color }]}
                    placeholder="search by prize"
                    placeholderTextColor={theme.color}
                    onChangeText={fetchSearchData}
                    value={searchQuery}
                />
            </View>
            {
                searchQuery && <View style={styles.searchDropDown}>
                    {
                        searchLoading === false ?
                            !isEmptyArray(searchedData) ?
                                searchedData?.map((element, i) => (
                                    <View key={i} style={styles.dropDownDataContainer}>
                                        <Text style={[styles.searchText, { color: theme.color, flex: 0.89 }]} numberOfLines={1} responsiveFontSize >{element.Title}</Text>
                                        <Pressable onPress={() => navigation.navigate('DrawDetails', { drawCode: element.DrawCode })} >
                                            <LinearGradient colors={['#FFD70D', '#FFAE05']} style={[styles.dropDownDrawButton, { flex: 0.11 }]}>
                                                <Text style={styles.dropDownDrawText}>{common.winners.draw}</Text>
                                            </LinearGradient>
                                        </Pressable>
                                    </View>
                                ))
                                :
                                <Text style={[styles.loadingText, { color: theme.color, textAlign: 'center' }]}  >No data found</Text>
                            :
                            <ActivityIndicatorLoader theme={theme} />
                    }

                </View>
            }
        </View>
    )
}

export default memo(SearchBarComponent)

const styles = StyleSheet.create({
    seaechBarContainer: {
        marginTop: scale(20),
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'rgba(151,151,151,0.6)',
        borderWidth: 0.66,
        borderRadius: scale(6),
        gap: scale(5),
        height:48,
        padding: scale(3),
    },
    searchDropDown: {
        // borderWidth: scale(1),
        borderColor: 'rgba(151,151,151,0.6)',
        // borderRadius:scale(6),
        borderBottomLeftRadius: scale(6),
        borderBottomRightRadius: scale(6),
        borderBottomWidth: scale(1),
        borderRightWidth: scale(1),
        borderLeftWidth: scale(1),
    },
    dropDownDataContainer: {
        flexDirection: 'row',
        gap: scale(5),
        paddingVertical: scale(10),
        paddingHorizontal: scale(10),
        justifyContent: 'space-between'
    },
    searchText: {
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: responsiveFontSize(2),
    },
    dropDownDrawButton: {
        backgroundColor: 'yellow',
        paddingHorizontal: scale(15),
        paddingVertical: scale(5),
        borderRadius: scale(5),
    },
    dropDownDrawText: {
        fontFamily: 'NunitoSans-SemiBold',
        fontSize: responsiveFontSize(1.6),
        color: '#000616',
    },
    horizontalLine: {
        height: scale(1),
        backgroundColor: 'rgba(151,151,151,0.6)'
    },
    searchStyle: {
        opacity: 0.5,
        marginLeft: scale(15),
    },
    input: {
        fontFamily: 'NunitoSans-SemiBold',
        flex: 1,
        fontSize: responsiveFontSize(2),
        marginLeft: scale(10),
        opacity: scale(0.6)
    },
})