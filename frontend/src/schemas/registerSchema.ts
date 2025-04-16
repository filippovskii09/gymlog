import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),

  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters long!')
    .required('Name is required!'),

  username: yup
    .string()
    .min(2, 'Name must be at least 6 characters long!')
    .required('Username is required!'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&]/,
      'Password must contain at least one special character (@, $, !, %, *, ?, &)'
    )
    .required('Password is required'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),

  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&]/,
      'Password must contain at least one special character (@, $, !, %, *, ?, &)'
    )
    .required('Password is required'),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
});

export const verifyCodeSchema = yup.object({
  code: yup.string().length(6, 'Code must be 6 characters').required('Code is required'),
  email: yup.string().email().required('Email is required'),
});

export const userNewPasswordSchema = yup.object({
  resetToken: yup.string().required('Reset token is required'),

  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&]/,
      'Password must contain at least one special character (@, $, !, %, *, ?, &)'
    )
    .required('Password is required'),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, ?, &)')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
});
