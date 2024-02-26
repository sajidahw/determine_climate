// air quality will be displayed from Alex's microservice for air pollution data pulled from OpenWeather API

import "./air_pollution.css";
import { useCollapse } from "react-collapsed"; // for collapsible definitions within card

const AirQuality = ({ data: pollutionData }) => {
  const {
    getCollapseProps: getCollapsePropsAir,
    getToggleProps: getTogglePropsAir,
    isExpanded: isExpandedAir,
  } = useCollapse(); // for collapsible/expandable air pollution within card

  const {
    getCollapseProps: getCollapsePropsDef,
    getToggleProps: getTogglePropsDef,
    isExpanded: isExpandedDef,
  } = useCollapse(); // for collapsible/expandable definitions within card

  return (
    <>
      <br></br>

      <h2 className="currentairH2">Current Air Pollution</h2>
      <br></br>

      <div className="airpollution_card">
        <div className="airpollution_contents">
          <div>
            <p className="city-name">{pollutionData.city}</p>
            <p className="aqi-description">
              Air Quality Index: {pollutionData.aqi}
            </p>
          </div>
        </div>

        <button className="showMoreAir" {...getTogglePropsAir()}>
          {isExpandedAir
            ? "Collapse"
            : "Expand for Detail Air Pollution Levels"}
        </button>

        <section className="expandable" {...getCollapsePropsAir()}>
          <div className="airpollution_contentsDetails">
            {/* <p> Air Quality Index: {pollutionData.aqi}</p> */}
            {/* <p className="aqi-description">Air Quality Index: {pollutionData.aqi}</p> */}

            <div className="details">
              <div className="parameter-row">
                <span className="parameter-label top">Details: </span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">
                  Carbon Monoxide (CO) concentration:
                </span>
                <span className="parameter-value">
                  {Math.round(pollutionData.co)} μg/m3
                </span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">
                  Nitrogen monoxide (NO) concentration:
                </span>
                <span className="parameter-value">
                  {/* {Math.round(pollutionData.no)}μg/m3 */}
                  {pollutionData.no} μg/m3
                </span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">
                  Nitrogen dioxide (NO2) concentration:
                </span>
                <span className="parameter-value">
                  {Math.round(pollutionData.no2)} μg/m3
                </span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">
                  Ozone (O3) concentration:
                </span>
                <span className="parameter-value">
                  {Math.round(pollutionData.o3)} μg/m3
                </span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">
                  Sulphur dioxide (SO2) concentration:
                </span>
                <span className="parameter-value">
                  {/* {Math.round(pollutionData.so2)}μg/m3 */}
                  {pollutionData.so2} μg/m3
                </span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">
                  Fine particles matter (PM2.5) concentration:
                </span>
                <span className="parameter-value">
                  {Math.round(pollutionData.pm2_5)} μg/m3
                </span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">
                  Coarse particulate matter (PM10) concentration:
                </span>
                <span className="parameter-value">
                  {Math.round(pollutionData.pm10)} μg/m3
                </span>
              </div>

              <div className="parameter-row">
                <span className="parameter-label">
                  Ammonia (NH3) concentration:
                </span>
                <span className="parameter-value">
                  {Math.round(pollutionData.nh3)} μg/m3
                </span>
              </div>
            </div>
          </div>
        </section>

        <div>
          <button className="showMore" {...getTogglePropsDef()}>
            {isExpandedDef
              ? "Collapse"
              : "Expand for Air Quality Index Level Definitions"}
          </button>
          <section className="expandable" {...getCollapsePropsDef()}>
            <ul>
              <li>
                <i>
                  <b>AQI [based on UK scale]</b>
                </i>
              </li>
              {/* <p className="definitionAir"> */}
              <dl className="definitionAir">
                <dt>1 = Good</dt>
                <dt>2 = Fair</dt>
                <dt>3 = Moderate</dt>
                <dt>4 = Poor</dt>
                <dt>5 = Very Poor</dt>
              </dl>
              {/* 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor */}
              {/* </p> */}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default AirQuality;

// top = actualweather_contents
// bottom = bottom
