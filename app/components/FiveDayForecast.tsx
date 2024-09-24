"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Skeleton } from "antd";
import { fetchFiveday } from "../redux/fivedaySlice";
import { calender } from "../icons";
import { kelvinToCelsius, unixToDay } from "../utils/misc";

const FiveDayForecast = () => {
  const citycoords = useSelector((state) => state?.citycoords);

  const dispatch = useDispatch<AppDispatch>();
  const { fivedayData, loading, error } = useSelector(
    (state: RootState) => state.fiveday
  );

  useEffect(() => {
    dispatch(fetchFiveday(citycoords));
  }, [dispatch, citycoords]);

  const { city, list } = fivedayData || {};

  const processData = (
    dailyData:
      | {
          main: { temp_min: number; temp_max: number };
          dt: number;
        }[]
      | undefined
  ) => {
    if (!dailyData || dailyData.length === 0) {
      return null; // Eğer dailyData yoksa veya boşsa işleme devam etme
    }

    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData?.forEach((day) => {
      if (day.main.temp_min < minTemp) {
        minTemp = day.main.temp_min;
      }
      if (day.main.temp_max > maxTemp) {
        maxTemp = day.main.temp_max;
      }
    });

    return {
      day: unixToDay(dailyData[0].dt), // İlk günün tarihi
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
    };
  };

  const dailyForecasts = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list?.slice(i, i + 8);
    const processedData = processData(dailyData);
    if (processedData) {
      dailyForecasts.push(processedData);
    }
  }

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : error ? (
    <p>Error: {error}</p>
  ) : fivedayData && city && list ? (
    <div
      className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {calender} 5-Day Forecast for {city.name}
        </h2>
        <div className="forecast-list pt-3">
          {dailyForecasts.map((day, i) => (
            <div
              key={i}
              className="daily-forevast py-4 flex flex-col justify-evenly border-b-2"
            >
              <p className="text-xl min-w-[3.5rem]">{day.day}</p>
              <p className="text-sm flex justify-between">
                <span>(low)</span>
                <span>(high)</span>
              </p>

              <div className="flex-1 flex items-center justify-between gap-4">
                <p className="font-bold">{day.minTemp}°C</p>
                <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                <p className="font-bold">{day.maxTemp}°C</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>No forecast data available.</p>
  );
};

export default FiveDayForecast;
