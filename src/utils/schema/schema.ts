import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const loginSchema = yupResolver(
  Yup.object().shape({
    email: Yup.string()
      .nullable()
      .required('This field is required')
      .email('Invalid email')
      .required('This field is required'),
    password: Yup.string().nullable().required('This field is required'),
  })
);
export const signUpSchema = yupResolver(
  Yup.object().shape({
    name: Yup.string().nullable().required('This field is required'),
    email: Yup.string()
      .nullable()
      .required('This field is required')
      .email('Invalid email')
      .required('This field is required'),
    password: Yup.string()
      .min(5, 'At least five characters long')
      .max(8, 'Maximum 8 characters are allowed')
      .nullable()
      .required('This field is required'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('This field is required'),
  })
);
export const productSchema = yupResolver(
  Yup.object().shape({
    name: Yup.string().nullable().required('This field is required'),
    type: Yup.string().required('Please select type'),
    price: Yup.number()
      .min(30, 'Min price is 30')
      .typeError('Must be a number')
      .required('This field is required'),
    desc: Yup.string()
      .max(400, 'Maximum 400 characters allowed')
      .required('This field is required'),
    rating: Yup.number()
      .typeError('Must be a number')
      .min(1, 'Min rating is 1')
      .max(5, 'Rate out of 5')
      .required('This field is required'),
    image: Yup.mixed()
      .required('This field is required')
      .test('fileSize', (value: any) => {
        if (!value) {
          return false;
        }
        return value && value?.size <= 2 * 1024 * 1024;
      })
      .test('fileType', 'Unsupported file type', (value: any) => {
        if (!value) {
          return false;
        }
        return value.type === 'image/jpeg' || value.type === 'image/png';
      }),
  })
);

export const AccountSchema = yupResolver(
  Yup.object().shape({
    name: Yup.string().nullable(),
    email: Yup.string().nullable(),
    password: Yup.string().when('isShowPasswordField', {
      is: (value: boolean) => value,
      then: () =>
        Yup.string()
          .min(5, 'At least five characters long')
          .max(8, 'Maximum 8 characters are allowed')
          .required('This field is required'),
      otherwise: () => Yup.string().nullable(),
    }),
    confirmpassword: Yup.string().when('isShowPasswordField', {
      is: (value: boolean) => value,
      then: () =>
        Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('This field is required'),
      otherwise: () => Yup.string().nullable(),
    }),
  })
);

export const DealSchema = yupResolver(
  Yup.object().shape({
    name: Yup.string().required('This field is required'),
    desc: Yup.string().required('This field is required'),
    discount: Yup.number()
      .typeError('This field is required')
      .required('This field is required'),
    rating: Yup.number()
      .typeError('Must be a number')
      .required('This field is required'),
    image: Yup.mixed()
      .required('This field is required')
      .test('fileSize', (value: any) => {
        if (!value) {
          return false;
        }
        return value && value?.size <= 2 * 1024 * 1024;
      })
      .test('fileType', 'Unsupported file type', (value: any) => {
        if (!value) {
          return false;
        }
        return value.type === 'image/jpeg' || value.type === 'image/png';
      }),
    types: Yup.array().min(1, 'At least one option must be selected'),
    product1: Yup.string().when('pizza', {
      is: (value: boolean) => value,
      then: () => Yup.string().required('This field is required'),
      otherwise: () => Yup.string().nullable(),
    }),
    product2: Yup.string().when('sides', {
      is: (value: boolean) => value,
      then: () => Yup.string().required('This field is required'),
      otherwise: () => Yup.string().nullable(),
    }),
    product3: Yup.string().when('drinks', {
      is: (value: boolean) => value,
      then: () => Yup.string().required('This field is required'),
      otherwise: () => Yup.string().nullable(),
    }),
    product4: Yup.string().when('desserts', {
      is: (value: boolean) => value,
      then: () => Yup.string().required('This field is required'),
      otherwise: () => Yup.string().nullable(),
    }),
  })
);

export const BannerSchema = yupResolver(
  Yup.object().shape({
    name: Yup.string().nullable().required('This field is required'),
    desc: Yup.string().nullable().required('This field is required'),
    image: Yup.mixed()
      .required('This field is required')
      .test('fileSize', (value: any) => {
        if (!value) {
          return false;
        }
        return value && value?.size <= 2 * 1024 * 1024;
      })
      .test('fileType', 'Unsupported file type', (value: any) => {
        if (!value) {
          return false;
        }
        return value.type === 'image/jpeg' || value.type === 'image/png';
      }),
  })
);

export const CategorySchema = yupResolver(
  Yup.object().shape({
    name: Yup.string().nullable().required('This field is required'),
    type: Yup.string().nullable().required('This field is required'),
    image: Yup.mixed()
      .required('This field is required')
      .test('fileSize', (value: any) => {
        if (!value) {
          return false;
        }
        return value && value?.size <= 2 * 1024 * 1024;
      })
      .test('fileType', 'Unsupported file type', (value: any) => {
        if (!value) {
          return false;
        }
        return value.type === 'image/jpeg' || value.type === 'image/png';
      }),
  })
);

export const AddressSchema = yupResolver(
  Yup.object().shape({
    receiverName: Yup.string().trim().required('This field is required'),
    receiverEmail: Yup.string()
      .nullable()
      .required('This field is required')
      .email('Invalid email')
      .required('This field is required'),
    state: Yup.string().required('This field is required'),
    pinCode: Yup.string()
      .min(6, 'Please enter a vaild pincode')
      .max(6, 'Please enter a valid pincode')
      .typeError('Please enter a valid pincode')
      .required('This field is required'),
    district: Yup.string().required('This field is required'),
    address: Yup.string().required('This field is required'),
    phoneNumber: Yup.string()
      .min(10, 'Please enter a valid phone number')
      .max(10, 'Please enter a vaild phone number')
      .typeError('')
      .required('This field is required'),
    altPhoneNumber: Yup.string()
      .min(10, 'Please enter a valid phone number')
      .max(10, 'Please enter a vaild phone number')
      .typeError('')
      .required('This field is required'),
    city: Yup.string().required('This field is required'),
  })
);
