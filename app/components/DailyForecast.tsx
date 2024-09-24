"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Carousel, Skeleton } from "antd";
import { fetchFiveday } from "../redux/fivedaySlice";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "../icons";
import moment from "moment";
import { kelvinToCelsius } from "../utils/misc";

const DailyForecast = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { fivedayData, loading, error } = useSelector(
    (state: RootState) => state.fiveday
  );

  useEffect(() => {
    dispatch(fetchFiveday(citycoords));
  }, [dispatch]);

  const { city, list } = fivedayData || {};

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const todayForecast =
    list?.filter((forecast: { dt_txt: string; main: { temp: number } }) => {
      return forecast.dt_txt.startsWith(todayString);
    }) || [];

  const getIcon = (weatherMain: string) => {
    switch (weatherMain) {
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

  // Group forecasts into sets of 3
  const groupedForecasts = todayForecast.reduce(
    (acc: any[], forecast: any, index: number) => {
      if (index % 3 === 0) {
        acc.push(todayForecast.slice(index, index + 3));
      }
      return acc;
    },
    []
  );

  const ForecastItem = ({ forecast }: { forecast: any }) => (
    <div
      className="flex flex-col items-center justify-between gap-8 h-full px-2"
      key={forecast.dt_txt}
    >
      <p className="dark:text-gray-300 font-semibold text-sm">
        {moment(forecast.dt_txt).format("HH:mm")}
      </p>
      <span className="dark:text-white text-3xl">
        {getIcon(forecast.weather[0].main)}
      </span>
      <p className="dark:text-white text-sm">
        {kelvinToCelsius(forecast.main.temp)}°C
      </p>
    </div>
  );

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 dark:bg-dark-grey shadow-sm dark:shadow-none">
      {groupedForecasts.length < 1 ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full h-full">
          <Carousel
            draggable
            dots={false}
            style={{ height: "100% !important" }}
            className="!h-full !cursor-pointer custom-carousel"
          >
            {groupedForecasts.map((group, index) => (
              <div key={index} className="!flex !justify-around w-full h-full">
                {group.map((forecast: any) => (
                  <ForecastItem key={forecast.dt_txt} forecast={forecast} />
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default DailyForecast;
