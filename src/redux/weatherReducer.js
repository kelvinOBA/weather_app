import {
  SAVE_WEATHER_DATA,
  SAVE_DISTINCT_WEATHER,
  START_LOADER,
  STOP_LOADER,
  CHANGE_UNIT,
  PREV_PAGE,
  NEXT_PAGE,
  SAVE_CARDS_TO_SHOW,
  SAVE_DEFAULT_ARRAY_LENGTH
} from "./types";

const initialState = {
  weatherCardData: [],
  distinctWeatherData: [],
  loader: false,
  unit: "metric",
  prevPage: 0,
  nextPage: 1,
  cardsToShow: null,
};

const weatherDataReducer = function (state = initialState, action) {
  switch (action.type) {
    case SAVE_WEATHER_DATA:
      return { ...state, weatherCardData: action.payload };
    case SAVE_DISTINCT_WEATHER:
      return { ...state, distinctWeatherData: action.payload };

    case START_LOADER:
      return { ...state, loader: true };

    case STOP_LOADER:
      return { ...state, loader: false };

    case CHANGE_UNIT:
      return { ...state, unit: action.payload };
    case PREV_PAGE:
      return {
        ...state,
        prevPage: state.prevPage !== 0 ? state.prevPage - state.cardsToShow : 0,
        nextPage: state.nextPage - state.cardsToShow ,
      };
    case NEXT_PAGE:
      return {
        ...state,
        nextPage: state.nextPage + state.cardsToShow ,
        prevPage: state.prevPage + state.cardsToShow ,
      };
    case SAVE_CARDS_TO_SHOW:
      return {
        ...state,
        cardsToShow: action.payload ,
      };
    case SAVE_DEFAULT_ARRAY_LENGTH:
      return {
        ...state,
        nextPage: action.payload,
        prevPage: 0,
      };

    default:
      return state;
  }
};

export default weatherDataReducer;
