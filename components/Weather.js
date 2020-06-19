import useSwr from "swr";
import styled from "@emotion/styled";
import { css } from "@emotion/css";
import Head from "next/head";
import tw from "@tailwindcssinjs/macro";

const API_KEY = process.env.API_KEY;
const STATE = "id";

const colorTempCondition = (temp) =>
  temp <= 30
    ? css(tw`text-blue-600`)
    : temp <= 36
    ? css(tw`text-yellow-600`)
    : css(tw`text-orange-600`);

const Header = styled.header(tw`
  flex
  flex-auto
  justify-between
  items-center
`);

const Temp = styled.h1(tw`
  text-2xl
  font-bold
  sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl
`);

const HeaderLeft = styled.div(tw``);
const HeaderRight = styled.div(tw``);

const fetcher = (url) => fetch(url).then((res) => res.json());

const Weather = ({ city }) => {
  const { data, error } = useSwr(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${STATE}&appid=${API_KEY}&units=metric&lang=id`,
    fetcher,
    {
      loadingTimeout: 3000,
      shouldRetryOnError: true,
    }
  );

  console.log("ini data", data);

  if (error || data?.cod === "404") return <div>Error</div>;
  if (!data) return <div>Loading</div>;

  const {
    main: { temp, feels_like },
    weather,
    name,
  } = data;

  return (
    <Header>
      <Head>
        <link
          rel="icon"
          href={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
          sizes="16x16"
          type="image/png"
        />
        <title>{name}</title>
      </Head>
      <HeaderLeft>
        <Temp className={colorTempCondition(temp)}>
          {temp}
          <sup>°C</sup>
        </Temp>
        <span className={css(tw`font-medium text-gray-800`)}>
          Berasa seperti:{" "}
          <span
            className={(css(tw`font-bold`), colorTempCondition(feels_like))}
          >
            {feels_like}
            <sup>°C</sup>
          </span>
        </span>
      </HeaderLeft>
      <HeaderRight>
        <div className={css(tw`text-center`)}>
          <img
            className={css(tw`w-48 mx-auto`)}
            src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
            alt={weather[0].description}
          />
          <h2 className={css(tw`font-bold text-gray-800 text-2xl`)}>
            {weather[0].description}
          </h2>
        </div>
      </HeaderRight>
    </Header>
  );
};

export default Weather;
