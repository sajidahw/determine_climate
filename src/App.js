// main page for all requests and responses from APIs made and displayed by each component;
// parsing and data manipulation/display is detailed within each components' file

import "./App.css";
import CitySearch from "./components/citysearch/citysearch"; // autocomplete for city search
import ZipcodeSearch from "./components/zipsearch/zipsearch";
import ActualWeather from "./components/actual_weather/actual_weather"; // weather data
import { OPENWEATHER_API_URL, OPENWEATHER_API_KEY } from "./api";
import AirQuality from "./components/air_pollution/air_quality"; // structure display from Alex's air pollution microservice
import { useState } from "react";

function App() {
  // polution air data (partner microservice) being incorporated within city search
  const [pollutionData, setPollutionData] = useState(null);

  // 2 hooks to store the 2 fetches to see basic weather card data
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleOnCitySearchChange = (searchCityData) => {
    const [lat, lon] = searchCityData.value.split(" ");

    // 2 API calls using the same location as requests sent at the same time using different APIs
    const currentWeatherAPIFetch = fetch(
      `${OPENWEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    );

    // fetching pollution data from Alex's microservice
    const currentPollutionAPIFetch = fetch(
      `https://361-microservice.vercel.app/api/get-pollution-data?lat=${lat}&lon=${lon}`
    );

    // using Promise.all to wait for both fetches to complete before updating the state as an array of responses
    Promise.all([currentWeatherAPIFetch, currentPollutionAPIFetch])
      .then(async (response) => {
        const currentWeatherResponse = await response[0].json();
        const currentPollutionResponse = await response[1].json();

        setCurrentWeather({
          city: searchCityData.label,
          ...currentWeatherResponse,
        });

        // tying air quality info to searchCityData's lat & lon
        setPollutionData({
          city: searchCityData.label,
          ...currentPollutionResponse,
        });
      })
      .catch((error) => console.log(error)); // fails
  };

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

        {pollutionData && <AirQuality data={pollutionData} />}

        <button
          className="weatherCardButton"
          onClick={() => setPollutionData("")}
        >
          Remove Air Pollution
        </button>

        <div></div>
        <div></div>

        <CitySearch onSearchCityChange={handleOnCitySearchChange} />

        <ZipcodeSearch
          setCurrentWeather={setCurrentWeather}
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
