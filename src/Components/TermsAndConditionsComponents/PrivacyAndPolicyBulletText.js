import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'

const PrivacyAndPolicyBulletText = (props) => {
    const { text, textStyle, theme } = props

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            gap: scale(5),
            marginLeft: scale(10)
        },
        bullet: {
            fontSize: 22,
            color: theme.color,
            opacity:scale(0.8)
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.bullet}>{'\u2022'}</Text>
            <Text style={[textStyle]}>{text}</Text>
        </View>
    )
}

export default PrivacyAndPolicyBulletText

