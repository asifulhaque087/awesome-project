import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  post: {},
  // value: 0,
};

// First, create the thunk
export const getPosts = createAsyncThunk(
  // action type name
  "post/getPosts",
  // api call
  async (thunkAPI) => {
    const res = await axios.get("http://localhost:3000/post/");
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
    increment: (state) => {
      // state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.post = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = postSlice.actions;

export default postSlice.reducer;
// export const postReducer = postSlice.reducer