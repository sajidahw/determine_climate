// Search component for zipcode search on top of the screen using the async paginate package

import { useState } from "react";
// import { AsyncPaginate } from "react-select-async-paginate";
import {
  OPENWEATHER_API_KEY,
  OPENWEATHER_API_URL,
  OPENWEATHER_API_URL_ZIPCODE_CONVERSION,
} from "../../api";
// driven by OpenWeather Geo API for zipcode search to obtain lat/long data

// action which drives the zipcode search in passing data to other widgets
const ZipcodeSearch = ({ setCurrentWeather, setForecastWeather }) => {
  // use state hooks variables with set for updating variable
  const [zipcodesearch, setZipcodeSearch] = useState(""); // initial state is null

  // using fetch method to url to retrieve data from OPENWEATHER GEO API for zipcode search-showing results of zipcodeValue
  const fetchWeatherByZipcode = async () => {
    // return: return array of objects with long & lat as OpenWeatherMap API requires it to retrieve weather data
    // fetch(url, options) where options is {method: "GET"} as default so fetch(url) ok.
    // // fetch(
    //     `${OPENWEATHER_API_URL}/zip?zip=${zipcodeValue}&appid=${OPENWEATHER_API_KEY}`)

    // label: `${city.zip}, ${city.name}, ${city.country}`,
    //         value: `${city.lat} ${city.lon}`,

    const response = await fetch(
      `${OPENWEATHER_API_URL_ZIPCODE_CONVERSION}/zip?zip=${zipcodesearch},US&appid=${OPENWEATHER_API_KEY}`
    );

    const geodata = await response.json();

    const weatherResponse = await fetch(
      `${OPENWEATHER_API_URL}/weather?lat=${geodata.lat}&lon=${geodata.lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    );
    const weatherData = await weatherResponse.json();

    //  how to Format the weatherData  and label value
    // label: `${weatherData.zip}, ${weatherData.name}, ${weatherData.country}`,
    // value: `${weatherData.coord.lat} ${weatherData.coord.lon}`,

    // console.log(geodata);
    // console.log(weatherData);

    // update the responses to the state via setVar so data can be passed to the components & using spread operator to add data from citysearch.js
    setCurrentWeather({
      city: weatherData.name,
      ...weatherData,
    }); // pulling from vars above & adding data from citysearch.js so labels appear
    setForecastWeather({
      city: weatherData.name,
      ...weatherData,
    });
    //   return fetch(${OPENWEATHER_API_URL})
  };

  /* retrieve data from asyncPaginate component, searchCityData */
  const handleOnChange = (e) => {
    setZipcodeSearch(e.target.value); /* update our search with new value*/

    //testing
    // console.log(searchZipcodeData);
  };

  // what the user sees
  // changed type=number to type=text
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

// initially tested with dummy component: return('Hello World!')
// replaced with asyncPaginate placeholder to search for cities.
// returns/get long and lat data from OpenWeather Geo API after a user enters in a zipcode
