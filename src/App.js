import "./App.css";
import CitySearch from "./components/citysearch/citysearch"; // component passing prop onSearchCityChange to pass data
import ZipcodeSearch from "./components/zipsearch/zipsearch";
// import AutocompleteGoogleMaps from "./components/googlemaps/autocompleteGoogleMaps";
import ActualWeather from "./components/actual_weather/actual_weather";
import { OPENWEATHER_API_URL, OPENWEATHER_API_KEY } from "./api";
// import Pollution from "./components/air_pollution/air_pollution";
import AirQuality from "./components/air_pollution/air_quality"; // structure display from Alex's microservice

// eslint-disable-next-line
import { GOOGLEMAPS_API_KEY, googlemaps_api_url } from "./api";
import { useState } from "react";

// placing components on to main page
function App() {
  // *** CITY SEARCH **

  // polution air data being incorporated with city search
  const [pollutionData, setPollutionData] = useState(null);

  // 2 hooks to store the 2 fetches to see basic weather card data
  const [currentWeather, setCurrentWeather] = useState(null); // initial value to be empty
  // const [forecastWeather, setForecastWeather] = useState(null); // forecastWeather never used

  const handleOnCitySearchChange = (searchCityData) => {
    const [lat, lon] = searchCityData.value.split(" ");

    // 2 API calls in promise fetch for current weather and then forecast from OpenWeather API code
    // 2 fetches will be stored into variables to pass to the promise array

    // 1st fetch for current weather, truncate API call to create constant in api.js; replace {} w/${} & import
    // replace {lat},{lon} with our defined vars above${lat},${lon
    const currentWeatherAPIFetch = fetch(
      `${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    );

    // 2nd fetch for forecast [based off of API doc code]
    // const forecastWeatherAPIFetch = fetch(
    //   `${OPENWEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    // );

    // fetching pollution data from Alex's microservice
    const currentPollutionAPIFetch = fetch(
      `https://361-microservice.vercel.app/api/get-pollution-data?lat=${lat}&lon=${lon}`
    );

    // order is important; promise.all will wait for both fetches to complete before moving on
    Promise.all([
      currentWeatherAPIFetch,
      // forecastWeatherAPIFetch,
      currentPollutionAPIFetch,
    ])
      .then(async (response) => {
        // map which data we are getting in JSON from API fetches
        const currentWeatherResponse = await response[0].json();
        // const forecastWeatherResponse = await response[1].json();

        const currentPollutionResponse = await response[1].json(); //[2] if using forecastWeatherResponse

        // update the responses to the state via setVar so data can be passed to the components & using spread operator to add data from citysearch.js
        setCurrentWeather({
          city: searchCityData.label,
          ...currentWeatherResponse,
        }); // pulling from vars above & adding data from citysearch.js so labels appear
        // setForecastWeather({
        //   city: searchCityData.label,
        //   ...forecastWeatherResponse,
        // });

        // tying air quality info to searchCityData's lat & lon
        setPollutionData({
          city: searchCityData.label,
          ...currentPollutionResponse,
        });
      })
      .catch((error) => console.log(error)); // catch any errors if it fails

    // experiment with this, check API doc and test if it works
    // const cityLocationFetch = fetch(`${googlemaps_api_url}?key=${GOOGLEMAPS_API_KEY}&libraries=places`)

    // console.log(searchCityData); // log the searchCityData to the console
  };

  // testing to see if get current weather and forecast
  // console.log(currentWeather);
  // console.log(forecastWeather);

  // ***ZIPCODE SEARCH**
  // ### commented out below code bc it's being driven by zipsearch.js instead #######
  // 2 hooks to store the 2 fetches to see basic weather card data
  // const [currentZipcodeWeather, setCurrentZipcodeWeather] = useState(null);
  // const [forecastZipcodeWeather, setForecastZipcodeWeather] = useState(null);

  // const handleOnZipcodeSearchChange = (searchZipcodeData) => {
  //   const { lat, lon } = searchZipcodeData;

  // 2 API calls in promise fetch for current weather and then forecast from OpenWeather API code
  // 2 fetches will be stored into variables to pass to the promise array

  // 1st fetch for current weather, truncate API call to create constant in api.js; replace {} w/${} & import; code adapted from OpenWeather API doc
  // replace {lat},{lon} with defined vars above${lat},${lon
  // const currentZipcodeWeatherAPIFetch = fetch(
  //   `${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
  // );

  // // 2nd fetch for forecast [based off of API doc code]
  // const forecastZipcodeWeatherAPIFetch = fetch(
  //   `${OPENWEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
  // );

  // order is important; promise.all will wait for both fetches to complete before moving on
  // Promise.all([currentZipcodeWeatherAPIFetch, forecastZipcodeWeatherAPIFetch])
  //   .then(async (response) => {
  //     // map which data we are getting in JSON from API fetches
  //     const currentZipcodeWeatherResponse = await response[0].json();
  //     const forecastZipcodeWeatherResponse = await response[1].json();
  //   })
  //   .catch((error) => console.log(error)); // catch any errors if it fails

  // experiment with this, check API doc and test if it works
  // const cityLocationFetch = fetch(`${googlemaps_api_url}?key=${GOOGLEMAPS_API_KEY}&libraries=places`)

  // console.log(searchCityData); // log the searchCityData to the console
  // };

  // passing in component if no errors by using && to feed to weather card in ActualWeather.js
  return (
    <>
      <h1>Weather Retrieval App</h1>
      <h3>
        Greetings, retrieve weather for your selected location by entering a
        city's name or a U.S. zipcode.
      </h3>

      <div className="inputcontainer">
        {currentWeather && <ActualWeather data={currentWeather} />}
        <div></div>
        <button
          className="weatherCardButton"
          onClick={() => setCurrentWeather("")}
        >
          Remove Weather
        </button>

        {/* {pollutionData && <Pollution data={pollutionData} />} */}
        {pollutionData && <AirQuality data={pollutionData} />}

        <button
          className="weatherCardButton"
          onClick={() => setPollutionData("")}
        >
          Remove Air Pollution
        </button>

        {/* <button
          className="weatherCardButton"
          onClick={() => setCurrentWeather("")}
        >
          Remove Weather
        </button> */}
        <div></div>
        <div></div>

        <CitySearch onSearchCityChange={handleOnCitySearchChange} />

        <ZipcodeSearch
          setCurrentWeather={setCurrentWeather}
          // setForecastWeather={setForecastWeather}
          setPollutionData={setPollutionData}
        />
      </div>

      <footer>
        <p>&copy; Sajidah W | Winter 2024 | REACT Weather App</p>
      </footer>
    </>
  );
}

export default App;

// importing CitySearch component with added event via <CitySearch /> in the App component

// inside div "inputcontainer" above when reinstating autocomplete Google Maps

/* <div className="mapLabel">
  <h2> Find and Display a Location</h2>

  <div className="gmap">
    <AutocompleteGoogleMaps />
  </div>
</div>; */
