import { createSlice } from "@reduxjs/toolkit";
import {
  ACT_LOGIN_REQUEST,
  ACT_LOGIN_SUCCESS,
  ACT_LOGIN_FAILED,
} from "../types";
import { RootState } from "../store";

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
  status: number;
}

// Define the initial state using that type
const initialState: UserState = {
  userInfo: {
    accessToken: "",
    fname: "",
    lname: "",
    email: "",
    username: "",
    image: "",
    avatar: "",
    cover: "",
  },
  isLoading: false,
  error: "",
  status: 0,
};

export const userSlice = createSlice({
  name: "user",
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
            ...state,
            userInfo: {
              ...state.userInfo,
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
            error: "",
            status: 0,
          };
        }
        case ACT_LOGIN_FAILED: {
          return {
            ...state,
            userInfo: {
              ...state.userInfo,
              accessToken: "",
              fname: "",
              lname: "",
              email: "",
              username: "",
              image: "",
              avatar: "",
              cover: "",
            },
            isLoading: false,
            error: payload.error,
            status: payload.status,
          };
        }
        default:
          return state;
      }
    },
  },
});

export const { authentication } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
