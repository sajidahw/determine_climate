// Search component for city search on top of the screen using the async paginate package

import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geodbApiOptions, geodb_api_url } from "../../api";


// action which drives the city search in passing data to other widgets
const CitySearch = ({ onSearchCityChange }) => {
    // use state hooks variables with set for updating variable
    const [citysearch, setCitySearch] = useState(null); // initial state is null

    // using fetch method to url to retrieve data from GeoDB API; adding constraint to show cities with population over 10,000 and showing results of inputValue
    const loadCityOptions = (inputValue) => {

        // promise chain instead of async/await
        // inner return: return array of objects with long & lat as OpenWeatherMap API requires it to retrieve weather data
        return fetch(
            `${geodb_api_url}/cities?minPopulation=50000&namePrefix=${inputValue}`, geodbApiOptions)
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            label: `${city.name}, ${city.region}, ${city.country}, ${city.countryCode}`,
                            value: `${city.latitude} ${city.longitude}`,
                        };
                    }),
                };
            })
            .catch((err) => console.error(err));
    };

    /* retrieve data from asyncPaginate componen, searchCityData */
    const handleOnChange = (searchCityData) => {
        setCitySearch(searchCityData); /* update our search with new value*/
        onSearchCityChange(searchCityData); /* pass the city search data received from input */
    };

    // what the user sees
    return (
        <AsyncPaginate
            placeholder="Begin typing a city's name to autocomplete. Overwrite a city to continue searching :"
            debounceTimeout={600}/* slows API requests in ms */
            value={citysearch} /* user input value of city name */
            onChange={handleOnChange} /* update value from App.js to pass info to other 2 widgets*/
            loadOptions={loadCityOptions} /* load city long+lat from API */
        />
    )
}

export default CitySearch;

// initially tested with dummy component: return('Hello World!')
// replaced with asyncPaginate placeholder to search for cities.
// returns/get long and lat data from GeoDB API after a user enters in a city