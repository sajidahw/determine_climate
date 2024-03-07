import "./actual_weather.css";
import { useCollapse } from "react-collapsed"; // for collapsible definitions within card

const ActualWeather = ({ data }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(); // for collapsible definitions within card

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
        <div className="card_specifics">
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

        <div>
          <button className="showMore" {...getToggleProps()}>
            {isExpanded ? "Collapse" : "Expand for Weather Definitions"}
          </button>
          <section className="expandable" {...getCollapseProps()}>
            <ul>
              <li>
                <i>Feels like: </i>
              </li>
              <p className="definition">
                Temperature from a human's weather perception regarding outside
                weather.
              </p>
              <li>
                <i>Wind: </i>
              </li>
              <p className="definition">
                Wind speed in miles per hour for horizontal speed and direction.
              </p>
              <li>
                <i>Humidity: </i>
              </li>
              <p className="definition">
                The amount of water vapor in the air. The higher the humidiy,
                the wetter it feels outside.
              </p>
              <li>
                <i>Pressure: </i>
              </li>
              <p className="definition">
                Atmosphereic pressure on sea level measured in hPa. High
                pressure is associated with dry weather and mostly clear skies
                whereas low pressure is associated with clouds and
                precipitation.
              </p>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default ActualWeather;
