import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { scale } from 'react-native-size-matters';
import * as Common from '../helpers/common'

const SetTimer = (props) => {
    const { EndTime, is_timer_enabled, time_left_days, bold, light, homeCarousel } = props;

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
        if(days >= 1){
            setMyTime(`${days}d ${hours}h`);
        }
        else if(days < 0){
            setMyTime(Common.Home.EXPIRED);
        }
        else{
            setMyTime(`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`);
        }

        // upper part
        if (is_timer_enabled === true) {
        // if (is_timer_enabled === true) {
            if (days > 0) {
                setMyTime(`${days}d ${hours}h`)
            }
            else if (days == 0) {
                setMyTime(`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`);
            }
            else if(days < 0) {
                // console.log(`${hours} : ${minutes} : ${seconds}`);
                setMyTime(Common.Home.EXPIRED);
            }
        }

        // down part
        else if(days > 0){
            setMyTime(`${days}d ${hours}h`);
        }
        else if(days <= 1 && days > 0) {
            setMyTime(`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`);
        }
        // else{
        //     setMyTime(`${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`);
        // }


        // else if (time_left_days <= 7) {
        //     if (time_left_days >= 1) {
        //         setMyTime(`${days}d ${hours}h`)
        //         // setMyTime(`${days} ${Common.Home.daysLeft}`)
        //     }
        //     else if (time_left_days == 1) {
        //         setMyTime(`${days} ${Common.Home.dayLeft}`)
        //     }
        //     else if (time_left_days == 0) {
        //         setMyTime(Common.Home.ENDSTODAY)
        //     }
        //     else {
        //         // console.log(`${hours} : ${minutes} : ${seconds}`);
        //         setMyTime(Common.Home.EXPIRED)
        //     }
        // }
        // else {
        //     if (time_left_days >= 1) {
        //         setMyTime(`${days}d ${hours}h`)
        //         // setMyTime(`${days} ${Common.Home.daysLeft}`)
        //     }
        // }
        
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, [renderDates])

    useEffect(() => renderDates(), [seconds]);

    const styles = StyleSheet.create({
        timerCount: {
            borderRadius: scale(6),
            backgroundColor: myTime !== 'EXPIRED' ? 'rgba(0, 6, 22, 0.75)' : 'transparent',
            width: scale(80),
            height: scale(25),
            margin: scale(8),
            justifyContent: 'center',
            alignItems: 'center',
        },
        timerText: {
            color: '#fff',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: responsiveFontSize(1.8),
        },
        CarouselTimerText: {
            color: '#FD5558',
            fontFamily: 'Gilroy-ExtraBold',
            fontSize: scale(12.99),
        },
        raffleEndingTime: {
            fontFamily: 'NunitoSans-SemiBold',
            fontSize: responsiveFontSize(1.25),
            color: '#fff',
        },
        noData: {
            height: scale(25),
        }
    })

    return (
        <>
            {homeCarousel === true ?
                <Text style={bold && light === false ? styles.CarouselTimerText : styles.raffleEndingTime}>{myTime}</Text>
                :
                <View style={bold && light === false ? styles.timerCount : ''}>
                    {(light === false && myTime !== 'EXPIRED') && <Text style={bold ? styles.timerText : styles.raffleEndingTime}>{myTime === 'EXPIRED' ? '' : myTime}</Text>}
                </View>
            }
            {light &&
                <Text style={styles.raffleEndingTime}>{myTime === 'EXPIRED' ? 'EXPIRED' : `Ending in ${myTime.slice(0, 7)}`}</Text>
            }
        </>
    )
}

export default SetTimer;