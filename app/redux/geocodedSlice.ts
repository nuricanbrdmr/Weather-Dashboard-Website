import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGeocoded = createAsyncThunk(
  "geocoded/fetchGeocoded",
  async (city: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/geocoded?search=${city}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      }
      return rejectWithValue({ message: "An unknown error occurred" });
    }
  }
);

const initialState = {
  geocodedData: null,
  loading: false,
  error: null as null | { message: string; status?: number; data?: any },
};

const geocodedSlice = createSlice({
  name: "geocoded",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeocoded.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeocoded.fulfilled, (state, action) => {
        state.loading = false;
        state.geocodedData = action.payload;
      })
      .addCase(fetchGeocoded.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as typeof state.error;
      });
  },
});

export default geocodedSlice.reducer;
