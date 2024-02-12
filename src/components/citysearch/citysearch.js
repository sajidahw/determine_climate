// Search component for city search on top of the screen using the async paginate package
// driven by geodb API for city search to obtain lat/long data

import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geodbApiOptions as GeoDB_API_Options, geodb_api_url } from "../../api";

// action which drives the city search in passing data to other widgets
const CitySearch = ({ onSearchCityChange }) => {
  // use state hooks variables with set for updating variable
  const [citysearch, setCitySearch] = useState(null); // initial state is null

  // using fetch method to url to retrieve data from GeoDB API; adding constraint to show cities with population over value listed and showing results of inputValue
  const loadCityOptions = async (inputValue) => {
    // promise chain reworked to async/await
    // inner return: return array of objects with long & lat as OpenWeatherMap API requires it to retrieve weather data
    // options to return countries in descending order so US cities are shown sooner; offset = 0 and limit to show 10 results
    try {
      const cityResponse = await fetch(
        `${geodb_api_url}/cities?sort=-countryCode&limit=15&minPopulation=100000&namePrefix=${inputValue}`,
        GeoDB_API_Options
      );
      const cityResponseData = await cityResponse.json();

      return {
        options: cityResponseData.data.map((city) => {
          return {
            label: `${city.name}, ${city.region}, ${city.country}, ${city.countryCode}`,
            value: `${city.latitude} ${city.longitude}`,
          };
        }),
      };
    } catch (err) {
      return console.error(err);
    }
  };

  /* retrieve data from asyncPaginate component, searchCityData */
  const handleOnChange = (searchCityData) => {
    setCitySearch(searchCityData); /* update search with new value*/
    onSearchCityChange(
      searchCityData
    ); /* pass the city search data received from input */
  };

  // what the user sees
  return (
    <>
      <br></br>
      <br></br>
      <h2>Search Weather by City Name</h2>

      <label className="red">NOTE: </label>
      <label className="cityNote">
        Typing out more letters can give you better results. Autocomplete is
        limited to city population of 100,000 inhabitants. Results are sorted to
        show in descending countries first.
      </label>
      <div></div>
      <label className="cityNote">
        Duplicates may occur. Entering too many city searches within a couple of
        seconds may also result in an error.
      </label>
      {/* <br></br> */}
      <label className="redRate">
        API Rate is Limited and requests are delayed.{" "}
      </label>

      <br></br>
      <br></br>
      <label className="toUse">TO USE: </label>
      <label>
        To begin a new search, click on the input field and overwrite the prompt
        with a new city name.
      </label>

      <label className="paddingBackspace"> Backspace to edit typed city.</label>

      <div></div>
      <div></div>

      <AsyncPaginate
        placeholder="CLICK HERE to begin typing a city's name which features autocomplete. [Backspace to edit city.]"
        debounceTimeout={600} /* slows API requests in ms */
        value={citysearch} /* user input value of city name */
        onChange={
          handleOnChange
        } /* update value from App.js to pass info to other 2 widgets*/
        loadOptions={loadCityOptions} /* load city long+lat from API */
      />

      <button className="cityClear" onClick={() => setCitySearch("")}>
        Clear Entry
      </button>
    </>
  );
};

export default CitySearch;

// initially tested with dummy component: return('Hello World!')
// replaced with asyncPaginate placeholder to search for cities.
// returns/get long and lat data from GeoDB API after a user enters in a city
// async paginate is for drop down menu with autocomplete
