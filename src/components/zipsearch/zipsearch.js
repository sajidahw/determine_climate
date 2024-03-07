import { useState } from "react";
import {
  OPENWEATHER_API_KEY,
  OPENWEATHER_API_URL,
  OPENWEATHER_API_URL_ZIPCODE_CONVERSION,
} from "../../api";
// driven by OpenWeather Geo API for zipcode search to obtain lat/long data

// action which drives the zipcode search in passing data to other widgets
const ZipcodeSearch = ({ setCurrentWeather, setPollutionData }) => {
  // use state hooks variables with set for updating variable
  const [zipcodesearch, setZipcodeSearch] = useState("");

  // retrieve data from OPENWEATHER GEO API for zipcode search-showing results of zipcodeValue
  const fetchWeatherByZipcode = async () => {
    // return: array of objects with long & lat
    // fetch(url, options) where options is {method: "GET"} as default so fetch(url) ok.

    // first API call to get the lat/long data from OpenWeather Geo API
    const response = await fetch(
      `${OPENWEATHER_API_URL_ZIPCODE_CONVERSION}/zip?zip=${zipcodesearch},US&appid=${OPENWEATHER_API_KEY}`
    );

    const geodata = await response.json();

    // second API call to get the weather data from OpenWeatherMap API based off of lat/lon coordinates
    const weatherResponse = await fetch(
      `${OPENWEATHER_API_URL}/weather?lat=${geodata.lat}&lon=${geodata.lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    );
    const weatherData = await weatherResponse.json();

    // retrieving pollution data from Alex's microservice
    const currentPollutionAPIFetch = await fetch(
      `https://361-microservice.vercel.app/api/get-pollution-data?lat=${geodata.lat}&lon=${geodata.lon}`
    );
    const pollutionData = await currentPollutionAPIFetch.json();

    setCurrentWeather({
      city: weatherData.name,
      ...weatherData,
    });

    setPollutionData({
      city: weatherData.name,
      ...pollutionData,
    });
  };

  /* retrieve new data from input */
  const handleOnChange = (e) => {
    setZipcodeSearch(e.target.value); /* update our search with new value*/
  };

  return (
    <>
      <br></br>
      <br></br>
      <div></div>
      <div></div>
      <br></br>

      <h2>Search Weather by Zipcode</h2>
      <div></div>
      <div>
        <label className="red">NOTE: </label>
        <label>
          Entering in U.S. zipcodes gives faster and precise weather results.
        </label>
        <br></br>
        <label>
          Enter a U.S. zipcode:
          <input
            name="zipcode"
            type="text"
            placeholder="example: 94110"
            onChange={handleOnChange}
            value={zipcodesearch}
          />
        </label>
        <button type="submit" onClick={fetchWeatherByZipcode}>
          Submit
        </button>

        <button className="zipClear" onClick={() => setZipcodeSearch("")}>
          Clear Entry
        </button>
      </div>
      <br></br>
    </>
  );
};

export default ZipcodeSearch;

// asyncPaginate placeholder to search for cities as dropdown of city results.
// returns/get long and lat data from OpenWeather Geo API after a user enters in a zipcode
