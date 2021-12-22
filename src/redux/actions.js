import {
  SAVE_WEATHER_DATA,
  PREV_PAGE,
  SAVE_CARDS_TO_SHOW,
  NEXT_PAGE,
  SAVE_DEFAULT_ARRAY_LENGTH,
  START_LOADER,
  SAVE_DISTINCT_WEATHER,
  STOP_LOADER,
  CHANGE_UNIT,
} from "./types";
import dayJs from "dayjs";
import store from "./store";

export const getWeatherData = () => (dispatch) => {
  dispatch({ type: START_LOADER });

  let endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=London,us&units=${
    store.getState().weatherDataReducer.unit
  }&appid=6166c722417ec3a451f59215e3e4599b`;
  try {
    let formattedData;

    fetch(endpoint).then(function (response) {
      response.json().then(function (data) {
        formattedData = data.list.map((data) => {
          data.day = dayJs(data?.dt_txt).format("dddd");
          let getHour = data.dt_txt.split(" ");
          data.hour = getHour[1];
          return data;
        });

        let weatherObject = {};
        let distinctWeather = formattedData?.filter(function (entry) {
          if (weatherObject[entry.day]) {
            return false;
          }
          weatherObject[entry.day] = true;
          return true;
        });

        dispatch({ type: SAVE_WEATHER_DATA, payload: distinctWeather });
        dispatch({ type: SAVE_DISTINCT_WEATHER, payload: formattedData });
      });

      dispatch({ type: STOP_LOADER });
    });
  } catch (error) {
    dispatch({ type: STOP_LOADER });
  }
};

export const changeUnitType = (unitType) => (dispatch) => {
  dispatch({ type: CHANGE_UNIT, payload: unitType });
};
export const gotoPrev = () => (dispatch) => {
  dispatch({ type: PREV_PAGE });
};
export const gotoNext = () => (dispatch) => {
  dispatch({ type: NEXT_PAGE });
};
export const saveCardsToShow = (number) => (dispatch) => {
  dispatch({ type: SAVE_CARDS_TO_SHOW, payload: number });
};
export const saveDefaultArrayLength = (number) => (dispatch) => {
  dispatch({ type: SAVE_DEFAULT_ARRAY_LENGTH, payload: number });
};
