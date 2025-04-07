import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CheckBox from '@react-native-community/checkbox';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from 'react-native-responsive-dimensions';



const WorkWithUsCheckBoxes = (props) => {
    const { title, isCheckBox, image, theme } = props;

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: scale(22)
        },
        title: {
            flex: 1,
            fontFamily: 'NunitoSans',
            fontSize: responsiveFontSize(2),
            color:theme.color,
            lineHeight: scale(22),
            opacity:scale(0.8)
        }
    })
    return (
        <View style={styles.container}>
           {
            isCheckBox && <CheckBox
            // style={{ transform: [{ scale: 1.2 }] }}
            tintColors={{ true: '#FFBD0A' }}
            onCheckColor={'#FFBD0A'}
            disabled={false}
            value={true}
        />
           } 
           {
            image
           }
           {
            isCheckBox ? <Text style={styles.title}>{title}</Text> : <Text style={[styles.title,{color:'#FFBD0A'}]}>{title}</Text>
           }
            
        </View>
    )
}

export default WorkWithUsCheckBoxes

