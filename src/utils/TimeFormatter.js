import { getDaySuffix } from "./GetDaySuffix";
import { DateTime } from 'luxon';

export const timeFormatter = (timestamp, page) => {
    const date = DateTime.fromISO(timestamp).setZone('Europe/London');
    const currentDate = DateTime.now().setZone('Europe/London');

    let weekdays;
    if (page === 'LiveCompetitionsWeekdays') {
        weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    }
    else {
        weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }

    let months;
    if (page === 'DrawDetailsImageSection' || page === 'NewsAndBlogsNewsPAge') {
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    }
    else {
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }

    const weekday = weekdays[date.weekday - 1]; // Subtract 1 to adjust for the 0-based index
    const day = date.day;
    const year = date.year;
    const month = months[date.month - 1]; // Subtract 1 to adjust for the 0-based index
    const hour = date.hour.toString().padStart(2, '0');
    const minute = date.minute.toString().padStart(2, '0');

    if (page === 'MyRaffles') {
        return `${weekday} ${day}${getDaySuffix(day)} ${month}, ${hour}:${minute}`;
    }
    if (page === 'DrawDetails') {
        return `${weekday} ${day}${getDaySuffix(day)} ${month} ${year}`
    }
    if (page === 'DrawDetailsImageSection') {
        return `${month} ${day}${getDaySuffix(day)} ${year}`
    }
    if (page === 'PointsStore') {
        return `${day} ${month} ${year}`
    }
    if (page === 'MyCredit') {
        return `${day} ${month}`
    }
    if (page === 'NewsAndBlogs') {
        return `${month} ${day}${getDaySuffix(day)}`
    }
    if (page === 'NewsAndBlogsNewsPAge') {
        return `${day}${getDaySuffix(day)} ${month}`
    }
    if (page === 'MyRafflesEndedSection') {
        return `${day}/${date.month}/${year} at ${hour}:${minute}`
    }
    if (page === 'LiveCompetitionsWeekdays') {
        let hr = date.hour % 12;
        let ampm = date.hour < 12 ? 'am' : 'pm';
        if (hr === 0) hr = 12
        return `${weekday} ${hr}${ampm}`
    }
    if (page === 'LiveCompetition') {
        const daysLeft = date.diff(currentDate, 'days').toObject().days;
        return daysLeft
    }
    if (page === 'PaymentSuccessWithoutLogin' || page === 'paymentSuccess') {
        return `${day} ${month}, ${hour}:${minute}`
    }

};