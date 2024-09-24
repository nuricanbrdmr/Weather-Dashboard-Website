"use client";
import Navbar from "./components/Navbar";
import Temperature from "./components/Temperature";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AirPollution from "./components/AirPollution";
import Sunset from "./components/Sunset";
import Wind from "./components/Wind";
import DailyForecast from "./components/DailyForecast";
import UvIndex from "./components/UvIndex";
import Population from "./components/Population";
import FeelsLike from "./components/FeelsLike";
import Humidity from "./components/Humidity";
import Visibility from "./components/Visibility";
import Pressure from "./components/Pressure";
import Mapbox from "./components/Mapbox";
import Footer from "./components/Footer";
import FiveDayForecast from "./components/FiveDayForecast";
import TopCities from "./components/TopCities";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
        <Navbar />
        <div className="pb-4 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
            <Temperature />
            <FiveDayForecast />
          </div>

          <div className="flex flex-col w-full">
            <div className="instruments grid  gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
              <AirPollution />
              <Sunset />
              <Wind />
              <DailyForecast />
              <UvIndex />
              <Population />
              <FeelsLike />
              <Humidity />
              <Visibility />
              <Pressure />
            </div>
            <div className="mapbox-con mt-4 flex gap-4">
              <Mapbox />
              <TopCities />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </Provider>
  );
}
