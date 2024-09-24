"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Skeleton } from "antd";
import { thermometer } from "../icons";
import { fetchWeather } from "../redux/weatherSlice";
import { kelvinToCelsius } from "../utils/misc";

const FeelsLike = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { weatherData, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather(citycoords));
  }, [dispatch, citycoords]);

  const { feels_like, temp_min, temp_max } = weatherData?.main || {};

  const feelsLikeText = (
    feelsLike: number,
    minTemo: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemo + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return "Feels significantly colder than actual temperature.";
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return "Feels close to the actual temperature.";
    }
    if (feelsLike > avgTemp + 5) {
      return "Feels significantly warmer than actual temperature.";
    }

    return "Temperature feeling is typical for this range.";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : (
    <div>
      {error && <p>Error: {error}</p>}
      {weatherData && feels_like && (
        <div
          className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex 
            flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
          <div className="top gap-2">
            <h2 className="flex items-center gap-2 font-medium">
              {thermometer} Feels Like
            </h2>
            <p className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}°</p>
          </div>
          <p className="text-sm">{feelsLikeDescription}</p>
        </div>
      )}
    </div>
  );
};

export default FeelsLike;
