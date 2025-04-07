import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Common from '../helpers/common'


const SetTimerUpperPart = (props) => {
	const { EndTime, is_timer_enabled } = props;

	const [days, setDays] = useState(null);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [myTime, setMyTime] = useState('');

	const getTime = () => {
		const time = Date.parse(EndTime) - Date.now();
		setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
		setHours(Math.floor(time / (1000 * 60 * 60) % 24));
		setMinutes(Math.floor((time / 1000 / 60) % 60));
		setSeconds(Math.floor((time / 1000) % 60));
	}

	const renderDates = () => {
		if (is_timer_enabled === true) {
			if (days > 0) {
				setMyTime(`${days}d ${hours}h`)
			}
			else if (days == 0) {
				setMyTime(`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`);
			}
			else if (days < 0) {
				setMyTime(Common.Home.EXPIRED);
			}
		}
	}

	useEffect(() => {
		const interval = setInterval(() => getTime(), 0);
		return () => clearInterval(interval);
	}, [renderDates])

	useEffect(() => renderDates(), [seconds]);

	const styles = StyleSheet.create({
		timerCount: {
			borderRadius: scale(14),
			backgroundColor: myTime !== 'EXPIRED' && days == 0 ? '#FD5558' : 'transparent',
			width: responsiveWidth(28),
			height: 20,
			margin: scale(8),
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
			gap: scale(5)
		},
		timerText: {
			color: '#fff',
			fontFamily: 'Gilroy-ExtraBold',
			fontSize: responsiveFontSize(1.5),
		},
	})

	return (
		<>
			{
				(myTime !== 'EXPIRED' && days == 0) &&
				<View style={ styles.timerCount}>
					<Text style={styles.timerText}>{myTime}</Text>
				</View>
			}
		</>

	)
}

export default SetTimerUpperPart

const styles = StyleSheet.create({})