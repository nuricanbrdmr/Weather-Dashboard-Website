"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { people } from "../icons";
import { fetchFiveday } from "../redux/fivedaySlice";
import { Skeleton } from "antd";
import { formatNumber } from "../utils/misc";

const Population = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { fivedayData, loading, error } = useSelector(
    (state: RootState) => state.fiveday
  );

  useEffect(() => {
    dispatch(fetchFiveday(citycoords));
  }, [dispatch, citycoords]);

  const { city } = fivedayData || {};

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : (
    <div>
      {error && <p>Error: {error}</p>}
      {fivedayData && city && (
        <div
          className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex 
        flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
          <div className="top gap-2">
            <h2 className="flex items-center gap-2 font-medium">
              {people}Sunset
            </h2>
            <p className="pt-4 text-2xl">{formatNumber(city.population)}</p>
          </div>
          <p className="text-sm">Latest UN population data for {city.name}</p>
        </div>
      )}
    </div>
  );
};

export default Population;
