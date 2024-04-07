import * as Yup from 'yup';

export const singUpSchema = Yup.object({
  email: Yup.string().email('invalid email').required('Email is Required !'),
  checkbox: Yup.boolean().isTrue('Please select checkbox !'),

  password: Yup.string()
    // .password('invalid password')
    .optional(),
  passwordMin: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .min(8, 'Error'),
  passwordLC: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .matches(/[a-z]/, 'Error'),
  passwordUC: Yup.string()
    .oneOf([Yup.ref('password'), null])
    .matches(/[A-Z]/, 'Error'),

  phone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .max(5)
    .optional(),
});
