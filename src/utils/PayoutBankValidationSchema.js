import * as yup from 'yup';

export const PayoutBankValidationSchema = yup.object().shape({
    fullName: yup
        .string()
        .required('Full name is required')
        .matches(/^(?!.*\s{2})[A-Za-z0-9\s]{1,50}$/, 'Invalid name')
        .min(2, 'Name must be at least 2 characters')
        .trim(),
    sortCode: yup
        .string()
        .required('Sort Code is required')
        .matches(/^(?!(?:0{6}|00-00-00))(?:\d{6}|\d\d-\d\d-\d\d)$/, 'Invalid Sort Code'),
    accountNumber: yup
        .string()
        .required('Account Number is required')
        .matches(/^(?!(?:0{8}|01234567|12345678))(\d){8}$/, 'Invalid Account Number')
        .trim(),
});