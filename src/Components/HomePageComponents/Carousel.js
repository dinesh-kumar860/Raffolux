import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

import { Url } from '../../helpers/routesApi';
import * as Common from '../../helpers/common';

import SliderProgressBar from '../../utils/SliderProgressBar';
import SetTimerFeaturedRaffle from '../../utils/SetTimerFeaturedRaffle';
import { isNullOrEmpty } from '../../utils/utils';

import { fetchTicketsData } from '../../ReduxToolKit/apiSlice';


const Carousel = (props) => {
	const { id, Raffle_id, PromoImageUrl, MainImageUrl, RaffleCode, custom_raffle_id, is_unlimited_raffle, XLImageUrl, entry_cost_gbp, RaffleExpire, time_left_days, total_entries_sold, total_entries, percentage_sold, is_timer_enabled } = props;
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const isCustomRaffle = (isNullOrEmpty(custom_raffle_id) || is_unlimited_raffle === false);


	const handleNavigate = () => {
		dispatch(fetchTicketsData({ raffle_id: Raffle_id }));
		navigation.navigate('InstantContainer', { RaffleId: RaffleCode, raffle_id: Raffle_id })
	};

	const styles = StyleSheet.create({
		card: {
			height: scale(281),
			width: responsiveWidth(90),
			borderRadius: scale(20),
			marginVertical: scale(8),
		},
		image: {
			width: '100%',
			height: '100%',
			borderRadius: scale(8),
			resizeMode: 'cover'
		},
		cardDetails: {
			paddingBottom: scale(9),
			width: '94%',
			backgroundColor: 'rgba(0, 0, 0, 0.4)',
			borderRadius: scale(6),
			paddingHorizontal: scale(10),
			position: 'absolute',
			bottom: scale(10),
			left: scale(8),
			right: scale(0),
		},
		ProgressBarContainer: {
			marginTop: scale(9),
			height: scale(30)
		},
		percentage: {
			fontFamily: 'NunitoSans-SemiBold',
			fontSize: responsiveFontSize(1.2),
			color: '#FFBD0A',
			position: 'absolute'
		},
		progressBar: {
			position: 'relative'
		},
		ticketDetails: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingVertical: isCustomRaffle ? scale(0) : scale(15),
			marginVertical: scale(0),
		},
		_ticketDetails: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingTop: scale(15),
			paddingBottom: scale(0),
			marginVertical: scale(0),
		},
		ticketDetailsCont: {
			gap: scale(3),
			paddingTop: scale(2)
		},
		ticketLabel: {
			fontSize: responsiveFontSize(1.3),
			fontFamily: 'NunitoSans-Regular',
			color: 'rgba(255, 255, 255, 0.8)',
		},
		ticketValue: {
			color: '#fff',
			fontFamily: 'Gilroy-ExtraBold',
			fontSize: responsiveFontSize(1.8),
		},
		playButton: {
			backgroundColor: '#FFBD0A',
			borderRadius: scale(4),
			paddingHorizontal: scale(20),
			justifyContent: 'center',
			paddingVertical: scale(9),
		},
		playButtonText: {
			color: '#000616',
			fontFamily: 'Gilroy-Black',
			fontSize: responsiveFontSize(1.8),
		}
	});


	return (
		<TouchableOpacity style={styles.card} onPress={() => handleNavigate()}>
			{PromoImageUrl !== '' ? <Image source={{ uri: `${Url.ImageUrl}${PromoImageUrl}` }} style={styles.image} /> : <Image source={{ uri: `${Url.ImageUrl}${MainImageUrl}` }} style={styles.image} />}
			<View style={styles.cardDetails}>
				{
					isCustomRaffle &&
					<View style={styles.ProgressBarContainer}>
						<View style={styles.progressBar}>
							<Text style={styles.percentage}>{isCustomRaffle ? `Sold ${percentage_sold}%` : null}</Text>
							<SliderProgressBar percentage_sold={percentage_sold} isCustomRaffle={isCustomRaffle} />
						</View>
					</View>
				}
				<View style={isCustomRaffle ? styles.ticketDetails : styles._ticketDetails}>
					<View style={styles.ticketDetailsCont}>
						<Text style={styles.ticketLabel}>{Common.Home.Ticketprice}</Text>
						<Text style={styles.ticketValue}>{`£${entry_cost_gbp}`}</Text>
					</View>
					<View style={styles.ticketDetailsCont}>
						<Text style={ styles.ticketLabel}>{Common.Home.RaffleEnds}</Text>
						<SetTimerFeaturedRaffle EndTime={RaffleExpire} time_left_days={time_left_days} bold={true} light={false} homeCarousel={true} />
					</View>
					<TouchableOpacity style={styles.playButton} onPress={() => handleNavigate()}>
						<Text style={styles.playButtonText}>{Common.Home.ENTERNOW}</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Carousel;
