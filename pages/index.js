import dynamic from "next/dynamic";
import { useState } from "react";
import { mutate } from "swr";
import { useForm } from "react-hook-form";
import { css } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";

const API_KEY = process.env.API_KEY;
const CITY = "Yogyakarta";
const STATE = "id";

const WeatherComponent = dynamic(() => import("../components/Weather"), {
  loading: () => <p>Loading Weather</p>,
});

const ForecastComponent = dynamic(() => import("../components/Forecast"), {
  loading: () => <p>Loading Forecast</p>,
});

// feels_like: 29.54
// grnd_level: 1010
// humidity: 80
// pressure: 1013
// sea_level: 1013
// temp: 26.39
// temp_max: 26.39
// temp_min: 26.39

const fetcher = (url) => fetch(url).then((res) => res.json());

// const ForecastsStyled = ({ forecast }) => <div>data forecast</div>;

const Homepage = () => {
  const [city, setCity] = useState(CITY);
  const [region, setRegion] = useState(STATE);
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      city: CITY,
    },
  });

  const onSubmit = async ({ city }) => {
    mutate(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${region}&appid=${API_KEY}&units=metric&lang=id`,
      fetcher(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${region}&appid=${API_KEY}&units=metric&lang=id`
      ),
      false
    );
    setCity(city);
  };

  return (
    <div className={css(tw`container mx-auto w-6/12`)}>
      <div className={css(tw`text-center py-4 lg:px-4`)}>
        <div
          className={css(
            tw`px-4 py-2 bg-black items-center text-white leading-none rounded-full flex lg:inline-flex`
          )}
          role="alert"
        >
          <h1 className={css(tw`font-semibold text-xl text-center flex-auto`)}>
            Weather App
          </h1>
        </div>
      </div>
      <div className={css(tw`mx-auto text-center pt-10`)}>
        <span className={css(tw`text-lg font-bold text-gray-700`)}>
          Cuaca hari ini
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className={css(
              tw`block mx-auto text-2xl lg:text-5xl text-center font-bold text-gray-900 outline-none`
            )}
            name="city"
            type="text"
            placeholder="Yogyakarta"
            inputMode="text"
            ref={register({ required: true })}
          />
        </form>
      </div>
      <WeatherComponent city={city} />
      <div>
        <h3
          className={css(
            tw`text-center font-bold text-2xl text-gray-700 py-10`
          )}
        >
          Forecast dalam 5 waktu
        </h3>
        <ForecastComponent city={city} />
      </div>
    </div>
  );
};

export default Homepage;
