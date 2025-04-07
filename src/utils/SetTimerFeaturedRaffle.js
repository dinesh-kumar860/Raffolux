import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import * as Common from '../helpers/common'

const SetTimerFeaturedRaffle = (props) => {
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

    // for featured raffle
    if (days >= 1) {
      setMyTime(`${days}d ${hours}h`);
    }
    else if (days < 0) {
      setMyTime(Common.Home.EXPIRED);
    }
    else {
      setMyTime(`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`);
    }

  }

  useEffect(() => {
    const interval = setInterval(() => getTime(), 0);
    return () => clearInterval(interval);
  }, [renderDates])

  useEffect(() => renderDates(), [seconds]);

  const styles = StyleSheet.create({

    CarouselTimerText: {
      color: '#FD5558',
      fontFamily: 'Gilroy-ExtraBold',
      fontSize: responsiveFontSize(1.8),
    },

  })

  return (
    <>
      <Text style={styles.CarouselTimerText}>{myTime}</Text>
    </>
  )
}

export default SetTimerFeaturedRaffle

const styles = StyleSheet.create({})