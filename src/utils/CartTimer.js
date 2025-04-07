import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { scale } from 'react-native-size-matters';
import * as Common from '../helpers/common'
import { useFocusEffect } from '@react-navigation/native';
import { isEmptyArray, isEmptyObject } from './utils';

const CartTimer = (props) => {
    const { expiresIn, onRefresh } = props;

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [myTime, setMyTime] = useState('00:00:00');

    const getTime = () => {
        const time = !isEmptyArray(expiresIn) && Date.parse(expiresIn) - Date.now();
        setDays(String(Math.floor(time / (1000 * 60 * 60 * 24))).padStart(2, '0'));
        setHours(String(Math.floor(time / (1000 * 60 * 60) % 24)).padStart(2, '0'));
        setMinutes(String(Math.floor((time / 1000 / 60) % 60)).padStart(2, '0'));
        setSeconds(String(Math.floor((time / 1000) % 60)).padStart(2, '0'));
    }

    const renderDates = () => {
        const time = minutes ? `${hours} : ${minutes} : ${seconds}` : '00:00:00';
        setMyTime(time);
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        renderDates();
    }, [seconds]);

    useEffect(() => {
        (myTime === Common.timerText.zeroTime || myTime.includes('-'))&& onRefresh();
    }, [myTime]);

    const styles = StyleSheet.create({
        raffleEndingTime: {
            fontFamily: 'NunitoSans-SemiBold',
            color: '#1C1C27',
            fontSize: scale(13.2)
        },
    })

    return <Text style={styles.raffleEndingTime}>  {`${Common.timerText.YourCartWillExpireIn} ${myTime !== Common.timerText.zeroTime ? myTime : Common.timerText.zeroTime}`}</Text>
}

export default CartTimer;