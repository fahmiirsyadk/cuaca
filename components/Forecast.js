import useSwr from "swr";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import dayjs from "dayjs";
import tw from "@tailwindcssinjs/macro";

const API_KEY = "e3f10e29d989865adc8c990f62b406be";
const STATE = "id";

const colorTempCondition = (temp) =>
  temp <= 30
    ? css(tw`text-blue-600`)
    : temp <= 36
    ? css(tw`text-yellow-600`)
    : css(tw`text-orange-600`);

const Temp = styled.h1(tw`
    text-lg
    font-bold
  `);

const fetcher = (url) => fetch(url).then((res) => res.json());

const Forecast = ({ city }) => {
  const { data, error } = useSwr(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city},${STATE}&cnt=5&appid=${API_KEY}&units=metric&lang=id`,
    fetcher
  );

  // console.log("Forecast", data);
  if (!data) return <div>Loading data...</div>;
  const { list } = data;
  console.log(list);
  return (
    <div>
      {list.map((forecast) => (
        <div
          key={forecast.dt_txt}
          className={css(
            tw`border border-gray-300 rounded p-4 max-h-12 mb-4 flex justify-between items-center`
          )}
        >
          <span className={css(tw`font-semibold text-lg text-cool-gray-600`)}>
            {dayjs(forecast.dt_txt).format("hh:mm")}
          </span>
          <Temp className={colorTempCondition(forecast.main.temp)}>
            {forecast.main.temp}
            <sup>°C</sup>
          </Temp>
          <span>
            <img
              className={css(tw`w-20`)}
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
              alt={forecast.weather[0].description}
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
