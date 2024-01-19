import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from '../../utils/axios';

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

interface UserI {
  email: string;
  password: string;
}

export const doAuth = createAsyncThunk('user/fetchUsers', (authInfo: UserI) => {
  return axios
    .post('/api/auths', JSON.stringify(authInfo), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    .then((response) => response.data);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signout: (state) => {
      state.isLoading = false;
      state.userInfo = {
        accessToken: '',
        fname: '',
        lname: '',
        email: '',
        username: '',
        image: '',
        avatar: '',
        cover: '',
      };
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      doAuth.fulfilled,
      (state, action: PayloadAction<UserInfo>) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.error = '';
      }
    );
    builder.addCase(doAuth.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.userInfo = {
        accessToken: '',
        fname: '',
        lname: '',
        email: '',
        username: '',
        image: '',
        avatar: '',
        cover: '',
      };
      state.error = action.error.message || 'ServerIsNotAccessable';
    });
  },
});

export const { signout } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
