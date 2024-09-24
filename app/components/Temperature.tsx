"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchWeather } from "../redux/weatherSlice";
import { kelvinToCelsius } from "../utils/misc";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "../icons";
import moment from "moment";

const Temperature = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { weatherData, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather(citycoords));
  }, [dispatch, citycoords]);

  const { main, timezone, name, weather } = weatherData || {};

  const temp = main ? kelvinToCelsius(main.temp) : null;
  const minTemp = main ? kelvinToCelsius(main.temp_min) : null;
  const maxTemp = main ? kelvinToCelsius(main.temp_max) : null;

  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const getIcon = () => {
    switch (weather[0].main) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live time update
  useEffect(() => {
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      // custom format : 24  hour format
      const formatedTime = localMoment.format("HH:mm:ss");
      // day of the week
      const day = localMoment.format("dddd");

      setLocalTime(formatedTime);
      setCurrentDay(day);
    }, 1000);
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && main && (
        <div
          className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
          <p className="flex justify-between items-center">
            <span className="font-medium">{currentDay}</span>
            <span className="font-medium">{localTime}</span>
          </p>

          <p className="pt-2 font-bold flex gap-1">
            <span>{name}</span>
            <span>{navigation}</span>
          </p>

          <p className="py-10 text-9xl font-bold self-center"> {temp}°</p>

          <div>
            <div>
              <span>{getIcon()}</span>
              <p className="pt-2 capitalize text-lg font-medium">
                {weather[0].description}
              </p>
            </div>

            <p className="flex items-center gap-2">
              <span>Low: {minTemp}° </span>
              <span>High: {maxTemp}° </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Temperature;
