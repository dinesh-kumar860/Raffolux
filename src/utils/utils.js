import { DateTime } from 'luxon';

export const strToLowercase = (str) => str.toLowerCase();

export const isEmptyObject = (val) => isNullOrEmpty(val) || (val && Object.keys(val).length === 0);

export const isEmptyArray = (val) => val && !val.length;

export const isNullOrEmpty = (str) => !str;

export const hasText = (str) => !!(str && str.trim() !== "");

export const hasNoText = (str) => !(str && str.trim() !== "");

export const parseStr = (str, replaceStr = "") => isNullOrEmpty(str) ? replaceStr : str;

export const parseArray = (arr, replaceStr = []) => isNullOrEmpty(arr) || isEmptyArray(arr) ? replaceStr : arr;

export const fortmatData = (data) => JSON.stringify(data, null, 2);

export const findIndexInArrayOfObjects = (data, idToCompare, idKeyName) => data.findIndex(x => x[idKeyName] === idToCompare);

export const formattedDateTime = (dateStr, dateFormat, londonTimezone) => DateTime.fromISO(dateStr).setZone(londonTimezone).toFormat(dateFormat);