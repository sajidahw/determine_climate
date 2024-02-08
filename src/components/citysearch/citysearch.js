// Search component for city search on top of the screen using the async paginate package

import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geodbApiOptions, geodb_api_url } from "../../api";


// action which drives the city search in passing data to other widgets
const CitySearch = ({onSearchCityChange}) => {
    // use state hooks variables with set for updating variable
    const [citysearch, setCitySearch] = useState(null); // initial state is null

    // using fetch method to url to retrieve data from GeoDB API
    const loadCityOptions = async (inputValue) => {
        try {
            const response = await fetch(geodb_api_url, geodbApiOptions);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    /* retrieve data from asyncPaginate componen, searchCityData */
    const handleOnChange = (searchCityData) => {
        setCitySearch(searchCityData); /* update our search*/
        onSearchCityChange(searchCityData); /* pass the city search data received from input */

    }

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