
import * as yup from 'yup';

export const AddressValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Name is required')
    .matches(/^(?!.*\s{2})[A-Za-z0-9\s]{1,50}$/, 'Invalid name')
    .min(2, 'Name must be at least 2 characters')
    .trim(),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10,11}$/, 'Phone number must be 10 or 11 digits')
    .trim(),
  postCode: yup
    .string()
    .required('PostCode is required')
    .matches(/^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\s?\d[A-Za-z]{2}$/, 'Invalid Post Code')
    .trim(),
  addressLine1: yup
    .string()
    .required('Address is required')
    .max(250, 'Address must be less than 250 characters')
    .trim(),
  addressLine2: yup
    .string()
    .max(250, 'Address must be less than 250 characters')
    .trim(),
  city: yup
    .string()
    .required('City is required')
    .trim()
    .min(2, 'City name must be at least 2 characters')
    .max(50, 'City must be less than 50 characters'),
});
