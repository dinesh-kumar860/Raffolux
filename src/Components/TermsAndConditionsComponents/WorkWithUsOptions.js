import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import Entypo from 'react-native-vector-icons/Entypo';
import { scrollToElement } from '../../utils/ScrollToElement';

const WorkWithUsOptions = (props) => {
    const { title, theme,mainRef,childRef } = props;

    const styles = StyleSheet.create({
        mainContainer: {
            borderColor: '#000616',
            borderWidth: scale(1),
            padding: scale(10),
            borderRadius: scale(5),
            backgroundColor: '#FFFFFF'
        },
        container: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.7),
            color: '#000616',
            marginLeft: scale(5)
        }
    })
    return (
        <Pressable style={styles.mainContainer} onPress={() => scrollToElement(mainRef,childRef)}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Entypo name={'chevron-right'} color={'#000616'} size={20} />
            </View>
        </Pressable>

    )
}

export default WorkWithUsOptions

