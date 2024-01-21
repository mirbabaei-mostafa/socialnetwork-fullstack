import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from '@redux-devtools/extension';
import userReducer from './slices/userSlice';
import registerReducer from './slices/registerSlice';
import accessTokenReducer from './slices/accessTokenSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    accesstoken: accessTokenReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
