import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';
import { responsiveFontSize } from "react-native-responsive-dimensions";


const FAQSupportCard = (props) => {
    const { title, subTitle, image, contact, theme } = props

    const styles = StyleSheet.create({
        container: {
            // height:112,
            borderColor: theme.theme === 'dark' ? 'rgba(255,255,255,0.25)' :'rgba(0,0,0,0.25)',
            borderWidth: scale(1),
            backgroundColor: theme.theme === 'dark' ? 'rgba(0,0,0,0.15)' :'#FFFFFF',
            borderRadius: scale(11),
            padding: scale(16)
        },
        imageTextContainer: {
            flexDirection: 'row',
            gap: scale(16),
            alignItems: 'center',
        },
        imageContainer: {
            width: 40,
            height: 40,
            backgroundColor:theme.theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,6,22,0.05)',
            borderColor:theme.theme === 'dark' ?'rgba(255,255,255,0.20)' : 'rgba(0,6,22,0.20)',
            borderWidth: scale(0.886),
            borderRadius: scale(4.286),
            alignItems: 'center',
            justifyContent: 'center'
        },
        image: {
            width: 20,
            height: 20,
            resizeMode: 'contain'
        },
        title: {
            fontFamily: "NunitoSans-Bold",
            fontSize: responsiveFontSize(2.2),
            color: theme.color,
            letterSpacing: scale(0.417)
        },
        subTitle: {
            fontFamily: "NunitoSans-SemiBold",
            fontSize: responsiveFontSize(1.8),
            color:  theme.color,
            letterSpacing: scale(0.5),
            opacity: scale(0.5),
            lineHeight: scale(17),
        }
    })

    const openContact = (title) =>{
        if(title==="Contact support"){
            Linking.openURL('mailto:support@raffolux.com')
        }
        if(title === "Call us"){
            Linking.openURL('tel:+44 2039297496')
        }
    }
    return (
        <Pressable style={styles.container} onPress={()=>openContact(title)}>
            <View style={styles.imageTextContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={image} />
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>
            </View>
            <View style={[styles.imageTextContainer, { marginLeft: scale(54), marginTop: scale(16) }]}>
                <Text style={[styles.title, { textDecorationLine: 'underline' }]}>{contact}</Text>
            </View>
        </Pressable>
    )
}

export default FAQSupportCard

