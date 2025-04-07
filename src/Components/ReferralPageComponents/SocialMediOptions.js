import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { scale } from 'react-native-size-matters'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { Linking } from 'react-native'

const SocialMediOptions = (props) => {
    const { image, title, theme, link } = props;

    const goToApp = (link) => Linking.openURL(link)

    const styles = StyleSheet.create({
        container: {
            gap: scale(5.58),
            alignItems: 'center',
        },
        image: {
            height: 40,
            width: 40,
            resizeMode: 'contain'
        },
        title: {
            color: theme.theme === 'dark' ? '#FFF' : '#141628',
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.3),
            opacity: scale(0.75)
        }
    })
    return (
        <Pressable style={styles.container} onPress={() => goToApp(link)}>
            <Image style={styles.image} source={image} />
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    )
}

export default SocialMediOptions

