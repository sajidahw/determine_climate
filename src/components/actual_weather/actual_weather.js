import "./actual_weather.css";

// dummy component to integrate inside of app.js file to start building
// card display of current weather data
// 'data' is being passed in from app.js from && line of component
// downloaded icons for static testing: src="../icons/50d.png"
// downloaded icons from folder: src={`icons/${data.weather[0].icon}.png`}
// icons from API: src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
const ActualWeather = ({ data }) => {
  return (
    <>
      <br></br>

      <h2 className="currentweatherH2">Current Weather</h2>
      <br></br>

      <div className="actualweather_card">
        <div className="actualweather_contents">
          <div>
            <p className="city-name">{data.city}</p>
            <p className="weather-description">{data.weather[0].description}</p>
          </div>

          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>

        <div className="bottom_specifics">
          <p className="temperature">{Math.round(data.main.temp)}°F</p>

          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label top">Details: </span>
            </div>

            <div className="parameter-row">
              <span className="parameter-label">Feels like: </span>
              <span className="parameter-value">
                {Math.round(data.main.feels_like)}°F
              </span>
            </div>

            <div className="parameter-row">
              <span className="parameter-label">Wind: </span>
              <span className="parameter-value">{data.wind.speed} mph</span>
            </div>

            <div className="parameter-row">
              <span className="parameter-label">Humidity: </span>
              <span className="parameter-value">{data.main.humidity}%</span>
            </div>

            <div className="parameter-row">
              <span className="parameter-label">Pressure: </span>
              <span className="parameter-value">{data.main.pressure} inHg</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActualWeather;

// top = actualweather_contents
// bottom = bottom
