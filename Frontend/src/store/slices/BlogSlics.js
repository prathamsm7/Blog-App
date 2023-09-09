import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiId = import.meta.env.VITE_API;

const initialState = {
  blogs: [],
  isLoading: false,
  isError: false,
};

export const getPosts = createAsyncThunk("post/getAll", async () => {
  try {
    const response = await axios.get(`${apiId}/post/getposts`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (data, { rejectWithValue }) => {
    try {
      const { id, title, text } = data;
      const response = await axios.patch(
        `${apiId}/post/update/${id}`,
        { title, text },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  "post/createPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiId}/post/create`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiId}/post/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  "post/likePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${apiId}/post/like/${id}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
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

    builder.addCase(createPost.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    }),
      builder.addCase(createPost.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
        state.isLoading = false;
        state.isError = false;
      }),
      builder.addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder.addCase(updatePost.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    }),
      builder.addCase(updatePost.fulfilled, (state, action) => {
        let filterData = state.blogs.map((post) => {
          if (post._id == action.payload._id) {
            post = action.payload;
          }
          return post;
        });

        state.blogs = filterData;
        state.isLoading = false;
        state.isError = false;
      }),
      builder.addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder.addCase(likePost.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    }),
      builder.addCase(likePost.fulfilled, (state, action) => {
        let filterData = state.blogs.map((post) => {
          if (post._id == action.payload._id) {
            post = action.payload;
          }
          return post;
        });

        state.blogs = filterData;
        state.isLoading = false;
        state.isError = false;
      }),
      builder.addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder.addCase(deletePost.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    }),
      builder.addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        let filterData = state.blogs.filter((post) => {
          return post._id !== action.payload;
        });
        state.blogs = filterData;
      }),
      builder.addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
  reducers: {},
});

export const { switchTab } = blogSlice.actions;

export default blogSlice.reducer;
