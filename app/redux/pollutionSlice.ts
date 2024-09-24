import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPollution = createAsyncThunk(
  "pollution/fetchPollution",
  async ({ lat, lon }: { lat: number; lon: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/pollution?lat=${lat}&lon=${lon}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  pollutionData: null,
  loading: false,
  error: null,
};

const pollutionSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPollution.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPollution.fulfilled, (state, action) => {
        state.loading = false;
        state.pollutionData = action.payload;
      })
      .addCase(fetchPollution.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default pollutionSlice.reducer;
