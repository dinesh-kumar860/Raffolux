import React, { useState, useEffect, memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';

const SetTimerDownPart = (props) => {
    const { EndTime } = props;

    const [days, setDays] = useState(0);
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
        // down part
        if (days > 0) {
            // setMyTime(`${days}d ${hours}h`);
            setMyTime(`${days} DAYS`);
        }
        // else if (days <= 1 && days > 0) {
        //     setMyTime(`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`);
        // }
        else if (days === 0) {
            setMyTime(`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`);
        }
        // else{
        //     setMyTime(`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`);
        // }        
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 0);
        return () => clearInterval(interval);
    }, [renderDates])

    useEffect(() => renderDates(), [seconds]);

    const styles = StyleSheet.create({
        raffleEndingTime: {
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.5),
            color: '#fff',
        },
      
    })

    return (
        <>
            <Text style={styles.raffleEndingTime}>{myTime === 'EXPIRED' ? 'EXPIRED' : `DRAW IN ${myTime.slice(0, 7)}`}</Text>
        </>
    )
}

export default memo(SetTimerDownPart);