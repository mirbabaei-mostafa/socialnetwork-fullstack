import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios, { axiosPrivate } from "../../utils/axios";
import { FieldArray } from "react-hook-form";

export interface Post {
  // user: string;
  type: string | null;
  text: string;
  images: string[];
  background: string;
  comments: Comments[];
}

export interface Comments {
  commentBy: string;
  comment: string;
  image: string;
  commentDate: string;
}

export interface PostState {
  isLoading: boolean;
  error: string;
  postInfo: Post;
}

const initialState: PostState = {
  isLoading: false,
  error: "",
  postInfo: {
    // user: '',
    type: null,
    text: "",
    images: [],
    background: "",
    comments: [],
  },
};

export interface PostI {
  email: string;
  type: string | null;
  text: string;
  images: string[];
  background: string;
  formData?: FormData;
}

export const createPost = createAsyncThunk(
  "post/create",
  async (postInfo: PostI, { rejectWithValue }) => {
    let imgResp;
    let bgResp;
    try {
      if (postInfo.images) {
        imgResp = await axiosPrivate.post(
          "/post/uploadImages",
          postInfo.formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      if (postInfo.background) {
        bgResp = await axiosPrivate.post(
          "/post/uploadImages",
          postInfo.background,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      const response: Post = await axiosPrivate
        .post(
          "/post/createPost",
          JSON.stringify({
            email: postInfo.email,
            type: postInfo.type,
            text: postInfo.text,
            images: imgResp?.data.images ? imgResp?.data.images : [],
            background: bgResp?.data.images ? bgResp?.data.images : "",
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((res) => {
          return res.data;
        });
      return response;
    } catch (err: any) {
      if (!err?.response) {
        return rejectWithValue("ServerIsNotAccessable");
      } else if (err?.response?.status === 401) {
        return rejectWithValue(
          err?.response?.data.error
            ? err?.response?.data.error
            : "PostCouldNotBeEmpty"
        );
      } else if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue("GeneralError");
      }
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.error = "";
      state.isLoading = true;
      // state.postInfo.user = '';
      state.postInfo.type = null;
      state.postInfo.text = "";
      state.postInfo.images = [];
      state.postInfo.background = "";
    });
    builder.addCase(
      createPost.fulfilled,
      (state, action: PayloadAction<Post>) => {
        state.error = "";
        state.isLoading = false;
        // state.postInfo.user = action?.payload?.user;
        state.postInfo.type = null;
        state.postInfo.text = action.payload?.text;
        state.postInfo.images = action.payload?.images;
        state.postInfo.background = action.payload?.background;
      }
    );
    builder.addCase(createPost.rejected, (state, action) => {
      state.error =
        (action.payload as string) || (action.error.message as string);
      state.isLoading = true;
      // state.postInfo.user = '';
      state.postInfo.type = null;
      state.postInfo.text = "";
      state.postInfo.images = [];
      state.postInfo.background = "";
    });
  },
});

export const postSelector = (state: RootState) => state.post;

export default postSlice.reducer;
