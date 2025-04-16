export const BUTTON_TEXTS = Object.freeze({
  AUTH: Object.freeze({
    RESET_PASSWORD: 'Reset Password',
    SIGN_UP: 'Sign Up',
    LOG_IN: 'Log In',
  }),
  CONTINUE: 'Continue',
  STATES: Object.freeze({
    DEFAULT: 'Submit',
    LOADING: 'Loading...',
    SUCCESS: 'Success!',
    ERROR: 'Error, please try again',
  }),
});

export const ROUTES = Object.freeze({
  AUTH: {
    RESET_PASSWORD: '/reset-password',
    REGISTER: '/register',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    VERIFY_CODE: '/verify-code',
    ENTER_NEW_PASS: '/new-password',
  },
  HOME: '/',
  USER_SETUP: {
    GENDER: '/gender',
    INDEX: '/setup',
    GOAL: '/goal',
    WEIGHT: '/weight',
    HEIGHT: '/height',
    AGE: '/age',
    ACTIVITY: '/activity',
  },
});

export const URLS = Object.freeze({
  USER_GENDER: '/setup/gender',
  USER_AGE: '/setup/age',
  USER_WEIGHT: '/setup/weight',
  USER_HEIGHT: '/setup/height',
  USER_GOAL: '/setup/goal',
  USER_ACTIVITY: '/setup/activity',
  PUSH_SUBSCRIBE: '/push/subscribe',
  PUSH_SEND: '/push/send',
  PUSH_CHECK_SUBSCRIPTION: '/push/check-subscription',
  GET_CHATS: '/chat/:chatId',
  SEND_MESSAGE: '/messages',
  GET_MESSAGES: '/messages/:chatId',
  UPDATE_MESSAGE: '/messages/:messageId',
  DELETE_MESSAGE: '/messages/:messageId',
});

export const TAGS = Object.freeze({
  CHAT: 'Chat',
  MESSAGE: 'Message',
});

export const TAG_TYPES = Object.values(TAGS);

export const BASE_URL = 'https://gymlog-yho1.onrender.com/api';

export const GENDERS = Object.freeze({
  MALE: 'Male',
  FEMALE: 'Female',
});
