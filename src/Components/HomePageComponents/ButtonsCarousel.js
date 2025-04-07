import React, { memo, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import * as Common from '../../helpers/common';



const ButtonsCarousel = props => {
	const { setCategoryID, CategoryID, theme, tabsFilteredArray } = props;

	const handleTabPress = (id) => setCategoryID(id);

	useEffect(() => {
		setCategoryID(0)
	}, [])

	const Tab = ({ title, handleOnPress, isActive, id }) => {
		return (
			<TouchableOpacity style={styles.wrapperCustom(isActive)} onPress={() => handleOnPress(id)} disabled={isActive}>
				<Text style={styles.text(isActive)}>{title}</Text>
			</TouchableOpacity>
		)
	}

	const styles = StyleSheet.create({
		Container: {
			borderRadius: scale(6),
			flexDirection: 'row',
			justifyContent: 'space-between',
			gap: scale(8),
			paddingRight: scale(10)
		},
		text(isActive) {
			return {
				color: theme.color,
				fontFamily: 'Gilroy-ExtraBold',
				fontSize: responsiveFontSize(1.5),
				paddingHorizontal: scale(13),
				textAlign: 'center',
				opacity: isActive ? null : 0.8
			}
		},
		wrapperCustom(isActive) {
			return {
				backgroundColor: isActive ? theme.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' : theme.theme === 'dark' ? '#000616' : 'rgba(255, 255, 255, 0.1)',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: scale(6),
				paddingTop: scale(8),
				paddingBottom: scale(8)
			}
		}
	});

	return (
		<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
			<View style={styles.Container}>
				{
					Common.Home.tabsArray.filter(tab =>
						tab.title === 'All' || tab.title === 'Other' || tabsFilteredArray.includes(tab.id)
					).map((ele, i) => (
						<Tab key={i} title={ele.title} handleOnPress={handleTabPress} isActive={CategoryID === ele.id} id={ele.id} />
					))
				}
			</View>
		</ScrollView>
	);
};

export default memo(ButtonsCarousel);


