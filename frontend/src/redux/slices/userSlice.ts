import { createSlice } from '@reduxjs/toolkit';
import {
  ACT_LOGIN_REQUEST,
  ACT_LOGIN_SUCCESS,
  ACT_LOGIN_FAILED,
} from '../types';

// Define a type for the slice state
export interface UserInfo {
  accessToken: string;
  fname: string;
  lname: string;
  email: string;
  username: string;
  image: string;
  avatar: string;
  cover: string;
}

export interface UserState {
  userInfo: UserInfo;
  isLoading: boolean;
  error: string;
}

// Define the initial state using that type
const initialState: UserState = {
  userInfo: {
    accessToken: '',
    fname: '',
    lname: '',
    email: '',
    username: '',
    image: '',
    avatar: '',
    cover: '',
  },
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authentication: (state, action) => {
      const { type, payload } = action;
      switch (type) {
        case ACT_LOGIN_REQUEST: {
          return { ...state, isLoading: true };
        }
        case ACT_LOGIN_SUCCESS: {
          return {
            userInfo: {
              accessToken: payload.accessToken,
              fname: payload.fname,
              lname: payload.lname,
              email: payload.email,
              username: payload.username,
              image: payload.image,
              avatar: payload.avatar,
              cover: payload.cover,
            },
            isLoading: false,
            error: '',
          };
        }
        case ACT_LOGIN_FAILED: {
          return {
            userInfo: {
              accessToken: '',
              fname: '',
              lname: '',
              email: '',
              username: '',
              image: '',
              avatar: '',
              cover: '',
            },
            isLoading: false,
            error: payload.error,
          };
        }
        default:
          return state;
      }
    },
  },
});

export const { authentication } = userSlice.actions;

export default userSlice.reducer;
