"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchUv } from "../redux/uvSlice";
import { Skeleton, Slider } from "antd";
import { sun } from "../icons";

const UvIndex = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { uvData, loading, error } = useSelector(
    (state: RootState) => state.uv
  );

  useEffect(() => {
    dispatch(fetchUv(citycoords));
  }, [dispatch, citycoords]);

  const { daily } = uvData || {};
  const { uv_index_max, uv_index_clear_sky_max } = daily || {};

  const uvIndexMax = uv_index_max ? uv_index_max[0].toFixed(0) : 0;

  const uvIndexCategory = (uvIndex: number | null) => {
    if (uvIndex === null)
      return { text: "N/A", protection: "No data available" };

    if (uvIndex <= 2) {
      return {
        text: "Low",
        protection: "No protection required",
      };
    } else if (uvIndex <= 5) {
      return {
        text: "Moderate",
        protection: "Stay in shade near midday.",
      };
    } else if (uvIndex <= 7) {
      return {
        text: "High",
        protection: "Wear a hat and sunglasses.",
      };
    } else if (uvIndex <= 10) {
      return {
        text: "Very High",
        protection: "Apply sunscreen SPF 30+ every 2 hours.",
      };
    } else if (uvIndex > 10) {
      return {
        text: "Extreme",
        protection: "Avoid being outside.",
      };
    }
    return { text: "N/A", protection: "No data available" };
  };

  const marginLeftPercentage = uvIndexMax
    ? (parseInt(uvIndexMax) / 14) * 100
    : 0;

  return loading ? (
    <Skeleton className="h-[12rem] w-full col-span-2 md:col-span-full" />
  ) : (
    <>
      {error && <p>Error: {error}</p>}
      {uvData && daily && (
        <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none">
          <div className="top">
            <h2 className="flex items-center gap-2 font-medium">
              {sun} UV Index
            </h2>
            <p className="pt-4 text-2xl">
              {uvIndexMax !== null ? uvIndexMax : "N/A"}
              <span className="text-sm">
                (
                {uvIndexCategory(uvIndexMax ? parseInt(uvIndexMax) : null).text}
                )
              </span>
            </p>

            <Slider
              value={marginLeftPercentage}
              disabled={true}
              className="progress"
            />
          </div>
          <p className="text-sm text-ellipsis line-clamp-1">
            {
              uvIndexCategory(uvIndexMax ? parseInt(uvIndexMax) : null)
                .protection
            }
          </p>
        </div>
      )}
    </>
  );
};

export default UvIndex;
