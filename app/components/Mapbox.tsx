"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchWeather } from "../redux/weatherSlice";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Komponent: Aktif şehir koordinatlarına uç
function FlyToActiveCity({ activeCityCords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5, // Harita uçma animasyonu süresi
      };

      map.flyTo(
        [activeCityCords.lat, activeCityCords.lon],
        zoomLev,
        flyToOptions
      );
    }
  }, [activeCityCords, map]);

  return null;
}

const Mapbox = () => {
  const citycoords = useSelector((state) => state?.citycoords);
  const dispatch = useDispatch<AppDispatch>();
  const { weatherData, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeather(citycoords));
  }, [dispatch, citycoords]);

  const activeCityCords = weatherData?.coord || null;

  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      {error && <p>Error: {error}</p>}
      {loading && <p>Loading...</p>}

      {activeCityCords ? (
        <MapContainer
          center={[activeCityCords.lat, activeCityCords.lon]}
          zoom={13}
          scrollWheelZoom={false}
          className="rounded-lg m-4"
          style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <FlyToActiveCity activeCityCords={activeCityCords} />
        </MapContainer>
      ) : (
        <p>No city coordinates available.</p>
      )}
    </div>
  );
};

export default Mapbox;
