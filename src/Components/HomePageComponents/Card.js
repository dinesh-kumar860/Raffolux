import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import formatNumber from '../../utils/formatNumber';
import * as common from '../../helpers/common';

import Trophy from '../../assets/Images/trophy.png'
import Ribbon from '../../assets/Images/ribbon.png'
import Giftbox from '../../assets/Images/giftbox.png'

import WinnerCard from './WinnersCards';


const Card = (props) => {
	const { pricesWon, raffleWinnersResponse, raffleWinnersThisWeekResponse, raisedCharityResponse, viewBackgroundColor } = props;

	const formatNumberToK = (number) => {
		const roundedNumber = Math.round(number / 1000) * 1000;
		const formattedNumber = (roundedNumber / 1000).toString() + 'k';
		return formattedNumber;
	};

	return (
		<View style={styles.container}>
			<WinnerCard viewBackgroundColor={viewBackgroundColor} numberText={`${common.common.poundSymbol}${formatNumber(pricesWon)}`.toLocaleString(common.common.en_US)} image={Giftbox} winnerText={common.common.wonInPrizes} iconName={common.common.trophy} iconColor={'#FFBD0A'} />
			<WinnerCard viewBackgroundColor={viewBackgroundColor} numberText={parseInt(raffleWinnersResponse).toLocaleString(common.common.en_US)} image={Trophy} winnerText={common.common.winners} iconName={common.common.trophy} iconColor={'#FFBD0A'} />
			<WinnerCard viewBackgroundColor={viewBackgroundColor} numberText={formatNumberToK(raisedCharityResponse)} image={Ribbon} winnerText={common.common.donated} iconName={common.common.ribbon} iconColor={'#FFBD0A'} />
			{/* <WinnerCard viewBackgroundColor={viewBackgroundColor} numberText={raffleWinnersThisWeekResponse} image={KingPerson} winnerText={common.common.winnersaDay} iconName={common.common.gift} iconColor={'#FFBD0A'} /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: scale(5),
		paddingHorizontal: scale(10)
	},
});

export default memo(Card);
