"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchWeather } from "../redux/weatherSlice";
import { Skeleton } from "antd";
import { unixToTime } from "../utils/misc";
import { sunset } from "../icons";

const Sunset = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { weatherData, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather(citycoords));
  }, [dispatch, citycoords]);

  const { sys, timezone } = weatherData || {};

  const times = sys?.sunset;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(sys?.sunrise, timezone);

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : (
    <>
      {error && <p>Error: {error}</p>}
      {weatherData && sys && (
        <div className="pt-6 pb-4 px-4 h-[12rem] border rounded-lg flex flex-col gap-10 dark:bg-dark-grey shadow-sm dark:shadow-none">
          <div className="top">
            <h2 className="flex items-center gap-2 font-medium">
              {sunset}Sunset
            </h2>
            <p className="pt-4 text-2xl">{sunsetTime}</p>
          </div>

          <p className="text-sm">Sunrise: {sunrise}</p>
        </div>
      )}
    </>
  );
};

export default Sunset;
