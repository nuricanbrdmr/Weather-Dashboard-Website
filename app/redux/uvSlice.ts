import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUv = createAsyncThunk(
  "uv/fetchUv",
  async ({ lat, lon }: { lat: number; lon: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/uv?lat=${lat}&lon=${lon}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  uvData: null,
  loading: false,
  error: null,
};

const uvSlice = createSlice({
  name: "uv",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUv.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUv.fulfilled, (state, action) => {
        state.loading = false;
        state.uvData = action.payload;
      })
      .addCase(fetchUv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default uvSlice.reducer;
