"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Skeleton } from "antd";
import { fetchWeather } from "../redux/weatherSlice";
import { droplets } from "../icons";
const Humidity = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { weatherData, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather(citycoords));
  }, [dispatch, citycoords]);

  const { humidity } = weatherData?.main || {};

  const getHumidityText = (humidity: number) => {
    if (humidity < 30) return "Dry: May cause skin irritation";
    if (humidity >= 30 && humidity < 50)
      return "Comfortable: Ideal for health and comfort";
    if (humidity >= 50 && humidity < 70)
      return "Moderate: Sticky, may increase allergens";
    if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
    return "Unavailable: Humidity data not available";
  };

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : (
    <div>
      {error && <p>Error: {error}</p>}
      {weatherData && humidity && (
        <div
          className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex 
            flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
          <div className="top gap-2">
            <h2 className="flex items-center gap-2 font-medium">
              {droplets} Humidity
            </h2>
            <p className="pt-4 text-2xl">{humidity}%</p>
          </div>
          <p className="text-sm">{getHumidityText(humidity)}.</p>
        </div>
      )}
    </div>
  );
};

export default Humidity;
