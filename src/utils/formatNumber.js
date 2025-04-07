import * as Constants from '../helpers/constants'

export default function formatNumber(num, precision = 1) {
    String(num).length <= 5 ? precision = 0 : precision;
    const found = Constants.suffixData.find((x) => Math.abs(num) >= x.threshold);
    return found ? (num / found.threshold).toFixed(precision) + found.suffix : null
}