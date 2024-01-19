import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
// import { RootState } from "../store";

export interface NewUserInfo {
  fname: string;
  lname: string;
  email: string;
  // username: string;
  // password: string;
  gender: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
}

// const initialState: NewUserInfo = {
//   fname: "",
//   lname: "",
//   email: "",
//   username: "",
//   password: "",
//   gender: "",
//   birth_year: 0,
//   birth_month: 0,
//   birth_day: 0,
// };

export interface RegisterState {
  // userInfo: UserInfo;
  isLoading: boolean;
  error: string;
}

const initialState: RegisterState = {
  isLoading: false,
  error: "",
};

export const doRegister = createAsyncThunk(
  "user/fetchUsers",
  (registerInfo: NewUserInfo) => {
    return axios
      .post("/api/register", JSON.stringify(registerInfo), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => response.data);
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doRegister.fulfilled,
      (state, action: PayloadAction<RegisterState>) => {
        state.isLoading = false;
        // state.userInfo = action.payload;
        state.error = "";
      }
    );
    builder.addCase(doRegister.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      // state.userInfo = {
      //   accessToken: "",
      //   fname: "",
      //   lname: "",
      //   email: "",
      //   username: "",
      //   image: "",
      //   avatar: "",
      //   cover: "",
      // };
      state.error = action.error.message || "ServerIsNotAccessable";
    });
  },
});

// export const userSelector = (state: RootState) => state.user;

export default registerSlice.reducer;
