import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiId = import.meta.env.VITE_API;

const initialState = {
  activeTab: 0,
  isAuthenticated: localStorage.getItem("user") ? true : false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  isLoading: false,
  isError: false,
  message: "",
  isOpen: false,
  modalType: 1,
};

export const userLogin = createAsyncThunk(
  "userLogin",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiId}/user/login`, userDetails, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSignup = createAsyncThunk(
  "userSignup",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiId}/user/register`, userDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogout = createAsyncThunk("userLogout", async () => {
  const response = await axios.get(`${apiId}/user/logout`, {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
      state.message = "";
    }),
      builder.addCase(userLogin.fulfilled, (state, action) => {
        // localStorage.setItem('isAuthenticated', true);
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.isLoading = false;
        state.isError = false;
      }),
      builder.addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder.addCase(userSignup.pending, (state, action) => {
      state.isLoading = true;
      state.message = "";
    }),
      builder.addCase(userSignup.fulfilled, (state, action) => {
        // localStorage.setItem('isAuthenticated', true);
        state.isLoading = false;
        state.isError = false;
      }),
      builder.addCase(userSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder.addCase(userLogout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      // localStorage.removeItem('isAuthenticated');
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.user = {};
      state.isLoading = false;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      console.log("rejected err", action);
      state.isLoading = false;
      state.isError = true;
    });
  },
  reducers: {
    switchTab: (state, action) => {
      state.activeTab = action.payload;
    },
    showModal: (state, action) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { switchTab, showModal } = userSlice.actions;

export default userSlice.reducer;
