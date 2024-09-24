import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import pollutionReducer from "./pollutionSlice";
import fivedayReducer from "./fivedaySlice";
import uvReducer from "./uvSlice";
import geocodedReducer from "./geocodedSlice";
import citycoordsReducer from "./citycoordsSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    pollution: pollutionReducer,
    fiveday: fivedayReducer,
    uv: uvReducer,
    geocoded: geocodedReducer,
    citycoords: citycoordsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
