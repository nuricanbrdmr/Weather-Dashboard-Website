"use client";
import React from "react";
import { useDispatch } from "react-redux";
import defaultStates from "../utils/defaultStates";
import { setActiveCityCoords } from "../redux/citycoordsSlice";

const TopCities = () => {
  const dispatch = useDispatch();
  return (
    <div className="states flex flex-col gap-3 flex-1">
      <h2 className="flex items-center gap-2 font-medium">Top Large Cities</h2>
      <div className="flex flex-col gap-4">
        {defaultStates.map((state, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                dispatch(
                  setActiveCityCoords({
                    lat: state.lat,
                    lon: state.lon,
                  })
                )
              }
              className="border rounded-lg cursor-pointer shadow-md dark:bg-dark-grey dark:shadow-none"
            >
              <p className="px-6 py-4">{state.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCities;
