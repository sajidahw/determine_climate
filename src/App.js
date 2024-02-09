
import './App.css';
import CitySearch from './components/citysearch/citysearch'; // component passing prop onSearchCityChange to pass data
import AutocompleteGoogleMaps from './components/googlemaps/autocompleteGoogleMaps';
import ActualWeather from './components/actual_weather/actual_weather';
import { OPENWEATHER_API_URL, OPENWEATHER_API_KEY } from './api';
 // eslint-disable-next-line
import { GOOGLEMAPS_API_KEY, googlemaps_api_url } from './api';
import { useState } from 'react';


// placing components on to main page
function App() {

  // 2 hooks to store the 2 fetches
  const[currentWeather, setCurrentWeather] = useState(null); // initial value to be empty
  const[forecastWeather, setForecastWeather] = useState(null);
  
  const handleOnCitySearchChange = (searchCityData) => {  
    const [lat, lon] = searchCityData.value.split(" ");

    // 2 API calls in promise fetch for current weather and then forecast from OpenWeather API code
    // 2 fetches will be stored into variables to pass to the promise array

    // 1st fetch for current weather, truncate API call to create constant in api.js; replace {} w/${} & import
    // replace {lat},{lon} with our defined vars above${lat},${lon
    const currentWeatherAPIFetch = fetch(`${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`);

    // 2nd fetch for forecast [based off of API doc code]
    const forecastWeatherAPIFetch = fetch(`${OPENWEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`);

    // order is important; promise.all will wait for both fetches to complete before moving on
    Promise.all([currentWeatherAPIFetch, forecastWeatherAPIFetch])
      .then(async (response) => {
        // map which data we are getting in JSON from API fetches
        const currentWeatherResponse = await response[0].json();
        const forecastWeatherResponse = await response[1].json();

        // update the responses to the state via setVar so data can be passed to the components & using spread operator to add data from citysearch.js
        setCurrentWeather({ city: searchCityData.label, ...currentWeatherResponse}); // pulling from vars above & adding data from citysearch.js so labels appear
        setForecastWeather({ city: searchCityData.label, ...forecastWeatherResponse});
      })
      .catch((error) => console.log(error));// catch any errors if it fails

    // experiment with this, check API doc and test if it works
    // const cityLocationFetch = fetch(`${googlemaps_api_url}?key=${GOOGLEMAPS_API_KEY}&libraries=places`)

    // console.log(searchCityData); // log the searchCityData to the console
  }
  
 // testing to see if get current weather and forecast
  console.log(currentWeather);
  console.log(forecastWeather);

// passing in component if no errors by using &&
  return (
    <div className="inputcontainer">
      <CitySearch onSearchCityChange={handleOnCitySearchChange} /> 
      {currentWeather && <ActualWeather data={ currentWeather}/>}

      <div className='mapLabel'>
        <h2> Find and Display a Location</h2>

        <div className='gmap'>
          <AutocompleteGoogleMaps />
        </div>
        {/* <AutocompleteGoogleMaps /> */}
      </div>

    </div>
  );
}

export default App;

// importing our CitySearch component with added event via <CitySearch /> in the App component