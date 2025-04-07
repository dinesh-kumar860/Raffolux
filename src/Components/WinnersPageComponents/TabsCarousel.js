import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ScrollView, FlatList, SafeAreaView, StatusBar, TouchableOpacity,Image} from 'react-native';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import WinnersCarousel from './WinnersCarousel';




const TabsCarousel = (props) => {
    const {tabData} = props
    const [selectedId, setSelectedId] = useState(null);

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <Pressable onPress={onPress} style={[styles.item, { backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>{item.month}</Text>
        </Pressable>
    );    

    const renderItem = ({ item }) => {
        const backgroundColor = item.monthCode === selectedId ? 'rgba(0,0,0,0.1)' : null;
        const color  = item.monthCode === selectedId ? '#000616' : 'rgba(0,0,0,0.7)';
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.monthCode)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={tabData}
                renderItem={renderItem}
                keyExtractor={item => item.monthCode}
                extraData={selectedId}
                horizontal={true}
            />
            <View style={styles.winnerMedalContainer}>
                <Image source={require('../../assets/Images/winMedal.png')} style={styles.medalImage}/>
                <Text style={styles.imageText}>Top Winners in March</Text>
            </View>
            <WinnersCarousel />
        </View>
    )
}

export default TabsCarousel

const styles = StyleSheet.create({
    container: {
        // flexDirection:'row'
        // flex: 1,
        // gap:scale(5)
        // marginTop: StatusBar.currentHeight || 0,
        gap:scale(30)
    },
    item: {
        padding: scale(10),
        marginHorizontal: scale(10),
        borderRadius:scale(6)
    },
    title: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: 'Gilroy-ExtraBold',
        color:'#000616'
    },
    winnerMedalContainer:{
        flexDirection:'row',
        gap:scale(8),
        alignItems:'center',
        justifyContent:'center'
    },
    medalImage:{

    },
    imageText:{
        fontSize: responsiveFontSize(2.4),
        fontFamily: 'Gilroy-ExtraBold',
        color:'#000616',
    },
  

})