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
                            
                            label: `${city.name}, ${city.country}, ${city.countryCode}`,
                            value: `${city.latitude} ${city.longitude}`,
                            
                        };
                    }),
                };
            })
            .catch((err) => console.error(err));
    };

    /* retrieve data from asyncPaginate componen, searchCityData */
    const handleOnChange = (searchCityData) => {
        setCitySearch(searchCityData); /* update our search*/
        onSearchCityChange(searchCityData); /* pass the city search data received from input */

    };

    // what the user sees
    return (
        <AsyncPaginate
            placeholder="Search for a city :"
            debounceTimeout={600}/* slows API requests in ms*/
            value={citysearch}
            onChange={handleOnChange} /* update value from App.js to pass info to other 2 widgets*/
            loadOptions={loadCityOptions} /* load city options from API */
        />
    )
}

export default CitySearch;

// initially tested with dummy component: return('Hello World!')
// replaced with asyncPaginate placeholder to search for cities.