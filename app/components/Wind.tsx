"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchWeather } from "../redux/weatherSlice";
import { Skeleton } from "antd";
import Image from "next/image";
import { wind } from "../icons";

const Wind = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { weatherData, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather(citycoords));
  }, [dispatch, citycoords]);

  const windSpeed = weatherData?.wind?.speed;
  const windDir = weatherData?.wind?.deg;

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : (
    <div>
      {error && <p>Error: {error}</p>}
      {weatherData && wind && (
        <div
          className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex 
        flex-col gap-3 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
          <div className="top gap-2">
            <h2 className="flex items-center gap-2 font-medium">
              {wind}Sunset
            </h2>

            <div className="compass relative flex items-center justify-center">
              <div className="image relative">
                <Image
                  src={"/compass_body.svg"}
                  alt="compass"
                  width={110}
                  height={110}
                />
                <Image
                  src={"/compass_arrow.svg"}
                  alt="compass"
                  className="absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert"
                  style={{
                    transform: `rotate(${windDir}deg) translateX(-50%)`,
                    height: "100%",
                  }}
                  width={11}
                  height={11}
                />
              </div>
              <p className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] dark:text-white font-medium">
                {Math.round(windSpeed)} m/s
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wind;
