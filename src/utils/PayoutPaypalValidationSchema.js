
import * as yup from 'yup';

export const PayoutPaypalValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required')
        .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, 'Invalid email address')
        .trim(),
});
