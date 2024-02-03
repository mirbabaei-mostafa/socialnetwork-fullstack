import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { axiosPrivate } from "../../utils/axios";

// https://blog.logrocket.com/handling-user-authentication-redux-toolkit/
// https://github.com/bezkoder/redux-toolkit-authentication/
// https://www.bezkoder.com/redux-toolkit-auth/
// https://github.com/Bria222/React-Redux-Toolkit-Login-Register
// https://redux-toolkit.js.org/api/createAsyncThunk

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
  verify: boolean;
}

export interface UserState {
  userInfo: UserInfo;
  isLoading: boolean;
  error: string;
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
    verify: false,
  },
  isLoading: false,
  error: "",
};

interface UserI {
  email: string;
  password: string;
}

export const doAuth = createAsyncThunk(
  "user/auth",
  async (authInfo: UserI, { rejectWithValue }) => {
    try {
      // const response = await axios.post('/user/auth', JSON.stringify(authInfo), {
      //   headers: { 'Content-Type': 'application/json' },
      //   withCredentials: true,
      // });
      const response = await axiosPrivate.post(
        "/user/auth",
        JSON.stringify(authInfo)
      );
      return response.data;
      // .then((response) => response.data);
    } catch (err: unknown | any) {
      if (!err?.response) {
        return rejectWithValue("ServerIsNotAccessable");
      } else if (err?.response?.status === 400) {
        return rejectWithValue(
          err?.response?.data.error
            ? err?.response?.data.error
            : "InvalidEmailPassword"
        );
      } else if (err?.response?.status === 401) {
        return rejectWithValue(
          err?.response?.data.error
            ? err?.response?.data.error
            : "IncorectEmailPassword"
        );
      } else if (err?.response?.status === 403) {
        return rejectWithValue(
          err?.response?.data.error ? err?.response?.data.error : "Forbiden"
        );
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("GeneralError");
      }
    }
  }
);

export const renewToken = createAsyncThunk(
  "user/token",
  async (authInfo: string, { rejectWithValue }) => {
    try {
      // const response = await axios.get('/user/renew', {
      //   headers: { 'Content-Type': 'application/json' },
      //   withCredentials: true,
      // });
      const response = await axiosPrivate.get("/user/renew");
      return response.data;
      // .then((response) => response.data);
    } catch (err: unknown | any) {
      if (!err?.response) {
        return rejectWithValue("ServerIsNotAccessable");
      } else if (err?.response?.status === 403) {
        return rejectWithValue(
          err?.response?.data.error ? err?.response?.data.error : "Forbiden"
        );
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("GeneralError");
      }
    }
  }
);

export const doVerify = createAsyncThunk(
  "user/activate",
  async (token: string, { rejectWithValue }) => {
    try {
      const controller = new AbortController();
      await axiosPrivate
        .post("/user/activate", JSON.stringify({ token }), {
          signal: controller.signal,
        })
        .then((res) => {
          return res.data;
        });
    } catch (err: unknown | any) {
      if (!err?.response) {
        return rejectWithValue("ServerIsNotAccessable");
      } else {
        return rejectWithValue("InvalidToken");
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signout: (state) => {
      return {
        ...state,
        isLoading: false,
        error: "",
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
          verify: false,
        },
      };
    },
    renew: (state, action: PayloadAction<UserInfo>) => {
      return {
        ...state,
        isLoading: false,
        error: "",
        userInfo: {
          ...state.userInfo,
          accessToken: action.payload?.accessToken,
          fname: action.payload?.fname,
          lname: action.payload?.lname,
          email: action.payload?.email,
          username: action.payload?.username,
          image: action.payload?.image,
          avatar: action.payload?.avatar,
          cover: action.payload?.cover,
          verify: action.payload?.verify,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doAuth.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      doAuth.fulfilled,
      (state, action: PayloadAction<UserInfo>) => {
        return {
          ...state,
          isLoading: false,
          error: "",
          userInfo: {
            ...state.userInfo,
            accessToken: action.payload?.accessToken,
            fname: action.payload?.fname,
            lname: action.payload?.lname,
            email: action.payload?.email,
            username: action.payload?.username,
            image: action.payload?.image,
            avatar: action.payload?.avatar,
            cover: action.payload?.cover,
            verify: action.payload?.verify,
          },
        };
      }
    );
    builder.addCase(doAuth.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: (action.payload as string) || (action.error.message as string),
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
          verify: false,
        },
      };
    });
    builder.addCase(renewToken.pending, (state) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(
      renewToken.fulfilled,
      (state, action: PayloadAction<UserInfo>) => {
        return {
          ...state,
          isLoading: false,
          error: "",
          userInfo: {
            ...state.userInfo,
            accessToken: action.payload?.accessToken,
            fname: action.payload?.fname,
            lname: action.payload?.lname,
            email: action.payload?.email,
            username: action.payload?.username,
            image: action.payload?.image,
            avatar: action.payload?.avatar,
            cover: action.payload?.cover,
            verify: action.payload?.verify,
          },
        };
      }
    );
    builder.addCase(renewToken.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: (action.payload as string) || (action.error.message as string),
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
          verify: false,
        },
      };
    });
    builder.addCase(doVerify.pending, (state) => {
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    });
    builder.addCase(doVerify.fulfilled, (state) => {
      return {
        ...state,
        isLoading: false,
        error: "",
      };
    });
    builder.addCase(doVerify.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: (action.payload as string) || (action.error.message as string),
      };
    });
  },
});

export const { signout, renew } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
