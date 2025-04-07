import React from 'react';
import { Text, StyleSheet, Pressable, Image } from 'react-native';
import { scale } from 'react-native-size-matters';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';


const SocialMediaContainer = (props) => {
    const { socialMediaButton, image, title, theme } = props;

    const styles = StyleSheet.create({
        googleFbContainer: {
            flexDirection: 'row',
            backgroundColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.05)' : 'rgba(255, 255, 255, 0.3)' ,
            borderWidth: scale(1.24),
            borderColor: theme.theme == 'light' ? 'rgba(0, 6, 22, 0.195995)' : 'rgba(255,255,255,0.2)',
            height: responsiveHeight(6),
            gap: scale(12),
            borderRadius: scale(4),
            alignItems: 'center',
            justifyContent: 'center'
        },
        socialMediaImage: {
            resizeMode: 'contain',
            width: scale(22),
            height: scale(22)
        },
        socialMediaText: {
            color: theme.color,
            letterSpacing: scale(1),
            fontSize: responsiveFontSize(1.5),
            textAlign: 'center',
            textAlignVertical: 'center',
            opacity: scale(0.800000011920929),
        }
    });

    return (
        <Pressable style={styles.googleFbContainer} onPress={() => socialMediaButton()}>
            <Image style={styles.socialMediaImage} source={image} />
            <Text style={styles.socialMediaText}>{title}</Text>
        </Pressable>
    )
}

export default SocialMediaContainer

