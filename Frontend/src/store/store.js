import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserSlice";
import BlogReducer from "./slices/BlogSlics";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    blogs: BlogReducer,
  },
});
