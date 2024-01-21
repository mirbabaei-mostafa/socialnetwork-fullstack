import { createSlice } from '@reduxjs/toolkit';

interface AccessTokenState {
  isLoading: boolean;
  error: string;
}

const initialState: AccessTokenState = {
  isLoading: false,
  error: '',
};

export const accessTokenSlice = createSlice({
  name: 'accesstoken',
  initialState,
  reducers: {},
});

export default accessTokenSlice.reducer;
