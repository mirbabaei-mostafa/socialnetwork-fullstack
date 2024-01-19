import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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

// Define the initial state using that type
const initialState: UserInfo = {
  accessToken: "",
  fname: "",
  lname: "",
  email: "",
  username: "",
  image: "",
  avatar: "",
  cover: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authentication: (state, action: PayloadAction<UserInfo>) => {
      state.accessToken = action.payload.accessToken;
      state.fname = action.payload.fname;
      state.lname = action.payload.lname;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.image = action.payload.image;
      state.avatar = action.payload.avatar;
      state.cover = action.payload.cover;
    },
    signout: (state) => {
      state.accessToken = "";
      state.fname = "";
      state.lname = "";
      state.email = "";
      state.username = "";
      state.image = "";
      state.avatar = "";
      state.cover = "";
    },
  },
});

export const { authentication, signout } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
