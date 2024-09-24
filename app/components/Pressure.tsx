"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Skeleton } from "antd";
import { fetchWeather } from "../redux/weatherSlice";
import { gauge } from "../icons";

const Pressure = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { weatherData, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather(citycoords));
  }, [dispatch, citycoords]);

  const { pressure } = weatherData?.main || {};

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return "Very low pressure";

    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure. Expect weather changes.";

    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure. Expect weather changes.";

    if (pressure >= 1025 && pressure < 1040)
      return "High pressure. Expect weather changes.";

    if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

    return "Unavailable pressure data";
  };

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : (
    <>
      {error && <p>Error: {error}</p>}
      {weatherData && pressure && (
        <div
          className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex 
            flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
          <div className="top gap-2">
            <h2 className="flex items-center gap-2 font-medium">
              {gauge} Pressure
            </h2>
            <p className="pt-4 text-2xl">{pressure} hPa</p>
          </div>
          <p className="text-sm">{getPressureDescription(pressure)}.</p>
        </div>
      )}
    </>
  );
};

export default Pressure;
