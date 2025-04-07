import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';

import ThemeContext from '../utils/themes/themeWrapper';

import RaffoluxExaclamtorySymbolBlack from '../assets/Images/RaffoluxExaclamtorySymbolBlack.png'

import { Url } from './routesApi';

const Loader = () => {
	const theme = useContext(ThemeContext)


	const styles = StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.background
		},
		content: {
			flexDirection: 'row'
		},
		raffoluxText: {
			fontSize: responsiveFontSize(6),
			fontFamily: 'Gilroy-ExtraBold',
			color: theme.theme === 'dark' ? '#FFBD0A' : '#000616'
		},
		pointImage: {
			height: scale(40),
			width: scale(40)
		}
	})

	return (
		<View style={styles.container}>
				<View style={styles.content}>
					<Animatable.Image resizeMode='contain' animation="bounce" iterationCount="infinite" duration={1000} easing="ease-in-out" style={styles.pointImage} source={theme.theme === 'dark' ? { uri: `${Url.ImageUrl}loading/point.webp` } : RaffoluxExaclamtorySymbolBlack} />
					<Animatable.Text animation="fadeIn" iterationCount={1} duration={500} easing="ease-in-out" style={styles.raffoluxText}>raffolux</Animatable.Text>
				</View>
		</View>
	)
}

export default Loader

