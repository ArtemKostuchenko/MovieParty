import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "../../fetch/axios";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, ThunkAPI) => {
    try {
      const resp = await baseAxios.post("/auth/login", { email, password });
      return resp.data;
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ email, nickname, password }, ThunkAPI) => {
    try {
      const resp = await baseAxios.post("/auth/register", {
        email,
        nickname,
        password,
      });
      return resp.data;
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
