import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

const WinnerCard = props => {
	const { numberText, winnerText, image, viewBackgroundColor} = props;


	const styles = StyleSheet.create({
		container: {
			backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : '#000616',
			borderWidth: scale(1.24),
			borderColor: viewBackgroundColor === '#FFFFFF' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.25)',
			borderRadius: scale(6),
			minWidth: 105,
			minHeight: 80,
			justifyContent: 'center',
			alignItems: 'center',
		},
		icon(text) {
			return {
				resizeMode: 'contain',
				height: scale(19),
				width: text === 'winners' ? scale(30) : scale(26),
				marginTop: scale(9)
			}
		},
		TextNumber: {
			fontSize: responsiveFontSize(2.2),
			fontFamily: 'Gilroy-ExtraBold',
			color: viewBackgroundColor === '#FFFFFF' ? '#28293D' : '#fff',
			marginTop: scale(5),
			textAlign: 'center',
		},
		Text: {
			color: viewBackgroundColor === '#FFFFFF' ? 'rgba(0, 6, 22, 0.5)' : '#fff',
			fontFamily: 'NunitoSans-Regular',
			fontSize: responsiveFontSize(1.2),
			textAlign: 'center',
			letterSpacing: scale(0.133),
			marginBottom: scale(5)
		},
	});


	return (
		<View style={styles.container}>
			<Image source={image} style={styles.icon(winnerText)} />
			{winnerText === 'winners a day' || winnerText === 'donated' ? <Text style={styles.TextNumber}>{`£${numberText}`}</Text> : <Text style={styles.TextNumber}>{numberText}</Text>}
			<Text style={styles.Text}>{winnerText}</Text>
		</View>
	);
};

export default WinnerCard;
