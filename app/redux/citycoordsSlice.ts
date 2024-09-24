import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: 51.752021,
  lon: -1.257726,
};

export const citycoordsSlice = createSlice({
  name: "citycoords",
  initialState,
  reducers: {
    setActiveCityCoords: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
});

export const { setActiveCityCoords } = citycoordsSlice.actions;

export default citycoordsSlice.reducer;
