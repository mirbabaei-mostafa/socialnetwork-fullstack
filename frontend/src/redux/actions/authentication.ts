import axios from '../../utils/axios';
import { AppDispatch } from '../store';
import {
  ACT_LOGIN_REQUEST,
  ACT_LOGIN_SUCCESS,
  ACT_LOGIN_FAILED,
} from '../types';

type AuthInfo = {
  email: string;
  password: string;
};

const authentication =
  (authInfo: AuthInfo, setError: any) => async (dispatch: AppDispatch) => {
    dispatch({ type: ACT_LOGIN_REQUEST });
    try {
      await axios
        .post('/api/auth', JSON.stringify(authInfo), {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then((res) => {
          dispatch({
            type: ACT_LOGIN_SUCCESS,
            payload: res?.data,
          });
        });
    } catch (err: unknown | any) {
      let errMsg: string = '';
      let errStatus: number = 0;
      if (!err?.response) {
        errMsg = 'ServerIsNotAccessable';
        errStatus = 503;
      } else if (err?.response?.status === 400) {
        errStatus = err?.response?.status;
        err?.response?.data.error
          ? (errMsg = err?.response?.data.error)
          : (errMsg = 'InvalidEmailPassword');
      } else if (err?.response?.status === 401) {
        errStatus = err?.response?.status;
        err?.response?.data.error
          ? (errMsg = err?.response?.data.error)
          : (errMsg = 'IncorectEmailPassword');
      } else if (err?.response?.status === 403) {
        errStatus = err?.response?.status;
        err?.response?.data.error
          ? (errMsg = err?.response?.data.error)
          : (errMsg = 'Forbidden');
      } else if (err instanceof Error) {
        errMsg = err.message;
      } else {
        errMsg = 'GeneralError';
      }
      dispatch({
        type: ACT_LOGIN_FAILED,
        payload: { error: errMsg, status: errStatus },
      });
      setError(errMsg);
    }
  };

export default authentication;
