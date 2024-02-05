import { axios } from "../../utils/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ForgotInfo {
  email: string;
  image: string;
  isLoading: boolean;
  success: boolean;
  error: string;
}

const initialState: ForgotInfo = {
  email: "",
  image: "",
  isLoading: false,
  success: false,
  error: "",
};

// Find user by email address
const findUserByEmail = createAsyncThunk(
  "user/forgot",
  async (email: string, { rejectWithValue }) => {}
);

export const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findUserByEmail.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      findUserByEmail.fulfilled,
      (state, action: PayloadAction<ForgotInfo>) => {
        return {
          ...state,
          email: action.payload?.email,
          image: action.payload?.image,
          isLoading: false,
          success: true,
          error: "",
        };
      }
    );
    builder.addCase(findUserByEmail.rejected, (state, action) => {
      return {
        ...state,
        email: "",
        image: "",
        isLoading: false,
        success: false,
        error: (action.payload as string) || (action.error.message as string),
      };
    });
  },
});

// export const { signout, renew } = userSlice.actions;

export const forgotSelector = (state: RootState) => state.forgot;

export default forgotSlice.reducer;
