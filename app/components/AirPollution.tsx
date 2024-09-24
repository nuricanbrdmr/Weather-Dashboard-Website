"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Skeleton, Slider } from "antd";
import { thermo } from "../icons";
import { airQulaityIndexText } from "../utils/misc";
import { fetchPollution } from "../redux/pollutionSlice";

const AirPollution = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { pollutionData, loading, error } = useSelector(
    (state: RootState) => state.pollution
  );

  useEffect(() => {
    dispatch(fetchPollution(citycoords));
  }, [dispatch, citycoords]);

  const { list } = pollutionData || {};

  const airQualityIndex = list?.[0]?.main?.aqi ? list[0].main.aqi * 10 : 0;

  const filteredIndex = airQulaityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : (
    <div className="grid col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2">
      {error && <p>Error: {error}</p>}
      {pollutionData && list && (
        <div
          className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
       dark:bg-dark-grey shadow-sm dark:shadow-none"
        >
          <h2 className="flex items-center gap-2 font-medium">
            {thermo}Air Pollution
          </h2>
          <Slider
            value={airQualityIndex}
            disabled={true}
            className="progress"
          />
          <p className="text-sm">
            Air quality is {filteredIndex?.description || "unknown"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AirPollution;
