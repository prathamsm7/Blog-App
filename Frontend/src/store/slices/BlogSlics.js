import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  blogs: [],
  isLoading: false,
  isError: false,
};

export const getPosts = createAsyncThunk("post/getAll", async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/post/getposts");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
      state.message = "";
    }),
      builder.addCase(getPosts.fulfilled, (state, action) => {
        state.blogs = action.payload;

        state.isLoading = false;
        state.isError = false;
      }),
      builder.addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
  reducers: {},
});

export const { switchTab } = blogSlice.actions;

export default blogSlice.reducer;
