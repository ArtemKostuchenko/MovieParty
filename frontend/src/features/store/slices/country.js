import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseAxios from "../../fetch/axios";

const initialState = {
  country: null,
  isLoading: false,
  isError: false,
  error: null,
};

export const addCountry = createAsyncThunk(
  "country/add",
  async ({ name, originalName, countryIcon }, ThunkAPI) => {
    try {
      const resp = await baseAxios.post("/auth/register", {
        name,
        originName: originalName,
        icon: countryIcon,
      });
      return resp.data;
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

const countrySlice = createSlice({
  name: "country",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addCountry.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.country = null;
      })
      .addCase(addCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.country = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export default countrySlice.reducer;
