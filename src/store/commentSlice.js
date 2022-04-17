import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getTreeData } from "../utility";

const initialState = {
  comments: [],
};

// First, create the thunk
export const getCommentByPostId = createAsyncThunk(
  // action type name
  "comment/getCommentByPostId",
  // api call
  async (postId, thunkAPI) => {
    const res = await axios.get(`http://localhost:3000/comment/${postId}`);
    return res.data;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentByPostId.fulfilled, (state, action) => {
      let track = {};

      let newData = action.payload.map((item, i) => {
        if (!item.parentId) {
          item["parentId"] = 0;
        }

        if (track[item.name.trim()]) {
          item["image"] = track[item.name.trim()];
        } else {
          let img = `https://robohash.org/${i + 10}?size=200x200`;
          item["image"] = img;
          track[item.name.trim()] = img;
        }

        return item;
      });
      state.comments = getTreeData(newData);
    });
  },
});

export default commentSlice.reducer;
