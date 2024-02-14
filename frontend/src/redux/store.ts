import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from '@redux-devtools/extension';
import userReducer from './slices/userSlice';
import registerReducer from './slices/registerSlice';
import forgotReducer from './slices/forgotSlice';
import postReducer from './slices/postSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    forgot: forgotReducer,
    post: postReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
