import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { axiosPrivate } from '../utils/axios';
import { UserState } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { shallowEqual } from 'react-redux';
import { InternalAxiosRequestConfig } from 'axios';

const useAxiosToken = () => {
  const refreshToken = useRefreshToken();
  const userState: UserState = useAppSelector((state: RootState): UserState => {
    return state.user as UserState;
  }, shallowEqual);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requstInterceptor = axiosPrivate.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        if (!config.headers['Authorization']) {
          config.headers[
            'Authorization'
          ] = `Bearer ${userState.userInfo.accessToken}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err) => {
        const preReq = err?.config;
        if (err?.response?.status === 403 && !preReq?.sent) {
          preReq.sent = true;
          const newAccessToken = await refreshToken();
          preReq.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(preReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requstInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [userState, dispatch]);

  return axiosPrivate;
};

export default useAxiosToken;
