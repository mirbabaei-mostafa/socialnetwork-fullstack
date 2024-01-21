import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { AxiosResponse } from "axios";
// import { RootState } from "../store";

export interface NewUserInfo {
  fname: string;
  lname: string;
  email: string;
  // username: string;
  password: string;
  gender: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
}
export interface UserInfo {
  fname: string;
  lname: string;
  email: string;
}

export interface RegisterState {
  userInfo: UserInfo;
  isLoading: boolean;
  error: string;
}

const initialState: RegisterState = {
  userInfo: {
    fname: "",
    lname: "",
    email: "",
  },
  isLoading: false,
  error: "",
};

export const doRegister = createAsyncThunk(
  "user/register",
  async (registerInfo: NewUserInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/register",
        JSON.stringify(registerInfo),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err: unknown | any) {
      if (!err?.response) {
        return rejectWithValue("ServerIsNotAccessable");
      } else if (err?.response) {
        return rejectWithValue(err?.response?.data.error);
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("GeneralError");
      }
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doRegister.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(doRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInfo = {
        fname: action.payload?.fname,
        lname: action.payload?.lname,
        email: action.payload?.email,
      };
      state.error = "";
    });
    builder.addCase(doRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.userInfo = {
        fname: "",
        lname: "",
        email: "",
      };
      state.error =
        (action.payload as string) || (action.error.message as string);
    });
  },
});

// export const userSelector = (state: RootState) => state.user;

export default registerSlice.reducer;
