"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Skeleton } from "antd";
import { fetchWeather } from "../redux/weatherSlice";
import { eye } from "../icons";

const Visibility = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { weatherData, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather(citycoords));
  }, [dispatch, citycoords]);

  const { visibility } = weatherData || {};

  const getVisibilityDescription = (visibility: number) => {
    const visibilityInKm = Math.round(visibility / 1000);

    if (visibilityInKm > 10) return "Excellent: Clear and vast view";
    if (visibilityInKm > 5) return "Good: Easily navigable";
    if (visibilityInKm > 2) return "Moderate: Some limitations";
    if (visibilityInKm <= 2) return "Poor: Restricted and unclear";
    return "Unavailable: Visibility data not available";
  };

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : (
    <div>
      {error && <p>Error: {error}</p>}
      {weatherData && visibility && (
        <div
          className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex 
            flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
          <div className="top gap-2">
            <h2 className="flex items-center gap-2 font-medium">
              {eye} Visibility
            </h2>
            <p className="pt-4 text-2xl">{Math.round(visibility / 1000)} km</p>
          </div>
          <p className="text-sm">{getVisibilityDescription(visibility)}.</p>
        </div>
      )}
    </div>
  );
};

export default Visibility;
