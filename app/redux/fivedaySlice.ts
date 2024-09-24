import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFiveday = createAsyncThunk(
  "fiveday/fetchFiveday",
  async ({ lat, lon }: { lat: number; lon: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/fiveday?lat=${lat}&lon=${lon}`
      );
      return response.data; // Thunk, fulfilled'de bu veriyi döner
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  fivedayData: null,
  loading: false,
  error: null,
};

const fivedaySlice = createSlice({
  name: "fiveday",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiveday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiveday.fulfilled, (state, action) => {
        state.loading = false;
        state.fivedayData = action.payload;
      })
      .addCase(fetchFiveday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default fivedaySlice.reducer;
