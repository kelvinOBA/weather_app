import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import {
    getWeatherData,
    changeUnitType,
  
  } from "../redux/actions";

const WeatherControl = () => {
  
    const fetchWeatherData = () => {
        dispatch(getWeatherData());
      }; 

const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(changeUnitType(event.target.value));
      };
    

  return (
    <div className="weather-control">
          <p className="mg-bt-20 mg-tp-20">
             Weather  in
               <b> London</b> 
            </p>
        <Stack spacing={2} direction="row">
          
          <Button variant="outlined" onClick={() => fetchWeatherData()}>
            Refresh
          </Button>

          <FormControl component="fieldset">
            <FormLabel component="legend">Temperature type</FormLabel>
            <RadioGroup
              row
              aria-label="temp"
              name="row-radio-buttons-group"
              onChange={handleChange}
              defaultValue="metric"
            >
              <FormControlLabel
                value="metric"
                control={<Radio />}
                label="Celsius"
              />
              <FormControlLabel
                value="imperial"
                control={<Radio />}
                label="Farenheit"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      </div>
  );
};

export default WeatherControl;
