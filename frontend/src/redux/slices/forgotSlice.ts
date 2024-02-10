import axios from '../../utils/axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface EmailI {
  email: string;
}
export interface EmailCode {
  email: string;
  code: string;
}
export interface ForgotInfo {
  email: string;
  image: string;
  isLoading: boolean;
  userSuccess: boolean;
  sendCodeSuccess: boolean;
  verifySuccess: boolean;
  cancelSuccess: boolean;
  error: string;
}

const initialState: ForgotInfo = {
  email: '',
  image: '',
  isLoading: false,
  userSuccess: false,
  sendCodeSuccess: false,
  verifySuccess: false,
  cancelSuccess: false,
  error: '',
};

// Find user by email address
export const findUserByEmail = createAsyncThunk(
  'user/forgot',
  async (data: EmailI, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/user/finduser',
        JSON.stringify({ email: data.email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err: unknown | any) {
      if (!err?.response) {
        return rejectWithValue('ServerIsNotAccessable');
      } else if (err?.response?.status === 401) {
        return rejectWithValue(
          err?.response?.data.error
            ? err?.response?.data.error
            : 'EmailDoseNotExist'
        );
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('GeneralError');
      }
    }
  }
);

// Send code by email to reset password
export const sendResetCode = createAsyncThunk(
  'user/forgotcode',
  async (data: EmailI, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/user/sendresetcode',
        JSON.stringify({ email: data.email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err: unknown | any) {
      if (!err?.response) {
        return rejectWithValue('ServerIsNotAccessable');
      } else if (err?.response?.status === 401) {
        return rejectWithValue(
          err?.response?.data.error
            ? err?.response?.data.error
            : 'EmailDoseNotExist'
        );
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('GeneralError');
      }
    }
  }
);

// Verify stored code with entered code by user
export const verifyResetCode = createAsyncThunk(
  'user/forgotcodeverify',
  async (data: EmailCode, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/user/verifyresetcode',
        JSON.stringify({ email: data.email, code: data.code }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err: unknown | any) {
      if (!err?.response) {
        return rejectWithValue('ServerIsNotAccessable');
      } else if (err?.response?.status === 400) {
        return rejectWithValue(
          err?.response?.data.error
            ? err?.response?.data.error
            : 'CodeIsNotMatch'
        );
      } else if (err?.response?.status === 401) {
        return rejectWithValue(
          err?.response?.data.error
            ? err?.response?.data.error
            : 'EmailDoseNotExist'
        );
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('GeneralError');
      }
    }
  }
);

// Cancel password reset - Code must be delete
export const cancelResetCode = createAsyncThunk(
  'user/forgotcodecancel',
  async (data: EmailI, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        '/user/cancelresetcode',
        JSON.stringify({ email: data.email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err: unknown | any) {
      if (!err?.response) {
        return rejectWithValue('ServerIsNotAccessable');
      } else if (err?.response?.status === 401) {
        return rejectWithValue(
          err?.response?.data.error
            ? err?.response?.data.error
            : 'EmailDoseNotExist'
        );
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue('GeneralError');
      }
    }
  }
);

export const forgotSlice = createSlice({
  name: 'forgot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findUserByEmail.pending, (state) => {
      state.isLoading = true;
      state.userSuccess = false;
      state.sendCodeSuccess = false;
      state.verifySuccess = false;
      state.cancelSuccess = false;
      state.error = '';
      // return {
      //   ...state,
      //   isLoading: true,
      //   success: false,
      //   error: "",
      // };
    });
    builder.addCase(
      findUserByEmail.fulfilled,
      (state, action: PayloadAction<ForgotInfo>) => {
        state.email = action.payload?.email;
        state.image = action.payload?.image;
        state.isLoading = false;
        state.userSuccess = true;
        state.error = '';
        // return {
        //   ...state,
        //   email: action.payload?.email,
        //   image: action.payload?.image,
        //   isLoading: false,
        //   success: true,
        //   error: "",
        // };
      }
    );
    builder.addCase(findUserByEmail.rejected, (state, action) => {
      state.email = '';
      state.image = '';
      state.isLoading = false;
      state.userSuccess = false;
      state.error =
        (action.payload as string) || (action.error.message as string);
      // return {
      //   ...state,
      //   email: "",
      //   image: "",
      //   isLoading: false,
      //   success: false,
      //   error: (action.payload as string) || (action.error.message as string),
      // };
    });

    // Send reset code for changeing passworf by email
    builder.addCase(sendResetCode.pending, (state) => {
      state.isLoading = true;
      state.userSuccess = false;
      state.sendCodeSuccess = false;
      state.verifySuccess = false;
      state.cancelSuccess = false;
      state.error = '';
    });
    builder.addCase(sendResetCode.fulfilled, (state) => {
      // state.email = action.payload?.email;
      // state.image = action.payload?.image;
      state.isLoading = false;
      state.sendCodeSuccess = true;
      state.error = '';
    });
    builder.addCase(sendResetCode.rejected, (state, action) => {
      // state.email = '';
      // state.image = '';
      state.isLoading = false;
      state.sendCodeSuccess = false;
      state.error =
        (action.payload as string) || (action.error.message as string);
    });

    // Check if the code by user entered is match with the code in DB
    builder.addCase(verifyResetCode.pending, (state) => {
      state.isLoading = true;
      state.userSuccess = false;
      state.sendCodeSuccess = false;
      state.verifySuccess = false;
      state.cancelSuccess = false;
      state.error = '';
    });
    builder.addCase(verifyResetCode.fulfilled, (state) => {
      // state.email = action.payload?.email;
      // state.image = action.payload?.image;
      state.isLoading = false;
      state.verifySuccess = true;
      state.error = '';
    });
    builder.addCase(verifyResetCode.rejected, (state, action) => {
      // state.email = '';
      // state.image = '';
      state.isLoading = false;
      state.verifySuccess = false;
      state.error =
        (action.payload as string) || (action.error.message as string);
    });

    // Check if the code by user entered is match with the code in DB
    builder.addCase(cancelResetCode.pending, (state) => {
      state.isLoading = true;
      state.userSuccess = false;
      state.sendCodeSuccess = false;
      state.verifySuccess = false;
      state.cancelSuccess = false;
      state.error = '';
    });
    builder.addCase(cancelResetCode.fulfilled, (state) => {
      state.email = '';
      state.image = '';
      state.isLoading = false;
      state.cancelSuccess = true;
      state.error = '';
    });
    builder.addCase(cancelResetCode.rejected, (state, action) => {
      state.email = '';
      state.image = '';
      state.isLoading = false;
      state.cancelSuccess = false;
      state.error =
        (action.payload as string) || (action.error.message as string);
    });
  },
});

// export const { signout, renew } = userSlice.actions;

export const forgotSelector = (state: RootState) => state.forgot;

export default forgotSlice.reducer;
