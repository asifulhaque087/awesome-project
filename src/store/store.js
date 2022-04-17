import { configureStore } from "@reduxjs/toolkit";
import commentSlice from "./commentSlice";
import postSlice from "./postSlice";

export const store = configureStore({
  reducer: {
    post: postSlice,
    comment: commentSlice,
  },
});
