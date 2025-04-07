// import { useNavigation } from "@react-navigation/native";
import React, { useContext, useMemo, useState } from "react";
import { NativeModules, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { scale } from "react-native-size-matters";
import { errorScreen } from "../helpers/common";
import ThemeContext from "../utils/themes/themeWrapper";

const Fallback = ({ error, resetErrorBoundary }) => {
	// const navigation = useNavigation();
	// Call resetErrorBoundary() to reset the error boundary and retry the render.
	// const handleReloadApp = () => NativeModules.DevSettings.reload();
	const [viewBackgroundColor, setViewBackgroundColor] = useState('');
	const theme = useContext(ThemeContext);
	const handleReloadApp = () => resetErrorBoundary();

	useMemo(() => {
		theme.theme === 'dark' ? setViewBackgroundColor('#070B1A') : setViewBackgroundColor('#FFFFFF');
	}, [theme])

	const styles = StyleSheet.create({
		seeTermsText: {
			color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#F2F2F2',
			fontFamily: 'Gilroy-ExtraBold',
			fontSize: scale(13),
		},
		_seeTermsText: {
			color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#F2F2F2',
			fontFamily: 'NunitoSans-Regular',
			fontSize: scale(40),
		},
		addToCartText: {
			color: viewBackgroundColor === '#FFFFFF' ? '#000616' : '#F2F2F2',
			fontFamily: 'Gilroy-ExtraBold',
			fontSize: responsiveFontSize(1.8),
			justifyContent: 'center',
			textAlign: 'center',
			width: '100%'
		},
		AddtoCartContainer: {
			backgroundColor: '#FFBD0A',
			paddingHorizontal: scale(20),
			marginVertical: scale(20),
			borderRadius: scale(6),
			height: scale(43),
			marginBottom: scale(7),
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
	})

	return (
		<View style={{ flex: 1, backgroundColor: viewBackgroundColor === '#FFFFFF' ? '#F2F2F2' : '#000616', }}>
			<View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: scale(20) }}>
				<Text style={styles._seeTermsText}>{errorScreen.Oops}</Text>
				<Text style={styles.seeTermsText}>{errorScreen.SomethingWentWrong}</Text>
				{/* <Text style={styles.seeTermsText}>{error.message}</Text> */}
				<TouchableOpacity style={styles.AddtoCartContainer}>
					<Text style={styles.addToCartText} onPress={() => handleReloadApp()}>{errorScreen.RestartApplication}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Fallback;