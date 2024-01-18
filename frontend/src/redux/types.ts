export const ACT_LOGIN_REQUEST: string = 'LOGIN_REQUEST';
export const ACT_LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
export const ACT_LOGIN_FAILED: string = 'LOGIN_FAILED';

export type ErrorResult = {
  success: boolean;
  message: string;
  status: number;
};
