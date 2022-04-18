import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  post: {},
  page: 1,
  pages: 1,
  // value: 0,
};

// First, create the thunk
export const getPosts = createAsyncThunk(
  // action type name
  "post/getPosts",
  // api call
  async (page, thunkAPI) => {
    let api;

    const res = await axios.get(`/post?page=${page}`);
    return res.data;
  }
);

export const getPostById = createAsyncThunk(
  // action type name
  "post/getPostById",
  // api call
  async (id, thunkAPI) => {
    const res = await axios.get(`http://localhost:3000/post/${id}`);
    return res.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updatePages: (state, action) => {
      state.pages = action.payload;
    },
    changePage: (state, action) => {
      console.log("from change page", action.payload);
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload.data;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { changePage, updatePages } = postSlice.actions;

export default postSlice.reducer;
// export const postReducer = postSlice.reducer
