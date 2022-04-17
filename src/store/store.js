import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";

// const reducerSlice = createSlice({
//   name: "store",
//   initialState: {},
//   reducers: {
//     someAction: function () {},
//   },
// });
export const store = configureStore({
  reducer: {
    post: postSlice,
  },
});
