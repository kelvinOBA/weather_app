import { useEffect, useState, useRef } from "react";
import Loader from "./Loader";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import {
  getWeatherData,
  changeUnitType,
  gotoPrev,
  gotoNext,
  saveCardsToShow,
  saveDefaultArrayLength,
} from "../redux/actions";

import { useSelector, useDispatch } from "react-redux";

import BarChart from "./BarChart";
import WeatherControl from "./WeatherControls";

const WeatherCard = () => {
  const dispatch = useDispatch();
  const {
    weatherCardData,
    distinctWeatherData,

    nextPage,
    prevPage,
    loader,
    unit,
  } = useSelector((state) => state.weatherDataReducer);

  const [windowWidth, setWindowWidth] = useState(0);
  const [barChartData, setBarCharData] = useState([
    {
      hour: "09:00",
      temp: 99.4,
    },
  ]);

  const childRef = useRef();

  useEffect(() => {
    if (document) {
      setWindowWidth(document.documentElement.clientWidth);
    }
    onResize(windowWidth);
    window.addEventListener("resize", () => {
      onResize(windowWidth);
    });
  }, [windowWidth]);

  const onResize = (windowSize) => {
    if (windowSize > 767) {
      dispatch(saveCardsToShow(3));
      dispatch(saveDefaultArrayLength(3));
    } else {
      dispatch(saveCardsToShow(1));
      dispatch(saveDefaultArrayLength(1));
    }
  };

  const fetchWeatherData = () => {
    dispatch(getWeatherData());
  };
  const getBarData = (day) => {
    let barData = [];

    let datav = distinctWeatherData.filter((data) => {
      if (data.day === day) {
        barData.push({
          temp: data.main.temp,
          hour: data.hour,
        });
      }
    });
    setBarCharData(barData);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [unit]);

  return (
    <div>
      <WeatherControl />
      <div>
        <div className="weather-container">
          {loader && <Loader />}

          <div
            className={`arrow ${prevPage === 0 ? "fade-elem" : ""}`}
            onClick={() => dispatch(gotoPrev())}
          >
            {!loader && <ArrowCircleLeftIcon fontSize="large" />}
          </div>
          {weatherCardData.slice(prevPage, nextPage)?.map((data, index) => {
            return (
              !loader && (
                <div
                  className="weather-card"
                  key={index}
                  onClick={(e) => {
                    getBarData(data.day);
                    childRef.current.openPopOver(e);
                  }}
                >
                  <p className="weather-card__txt bg-font mg-bt-20">
                    {data.main.temp} &deg;
                  </p>
                  <p className="weather-card__txt md-font mg-bt-20">
                    {data.weather[0].main}
                  </p>

                  <img
                    className="mg-bt-20"
                    height="80"
                    src={`http://openweathermap.org/img/w/${
                      data.weather[0].icon + ".png"
                    }`}
                  />
                  <div className="weather-card__day">{data.day}</div>
                </div>
              )
            );
          })}
          <div
            className={`arrow ${
              nextPage === weatherCardData.length ? "fade-elem" : ""
            }`}
          >
            {!loader && (
              <ArrowCircleRightIcon
                onClick={() => {
                  dispatch(gotoNext());
                }}
                fontSize="large"
              />
            )}
          </div>
          <BarChart ref={childRef} chartData={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
