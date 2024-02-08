import './App.css';
import CitySearch from './components/citysearch/citysearch'; // component passing prop onSearchCityChange to pass data


function App() {
  
  const handleOnCitySearchChange = (searchCityData) => {  
    console.log(searchCityData); // log the searchCityData to the console
  }
  
  return (
    <div className="container">
      <CitySearch onSearchCityChange={handleOnCitySearchChange} /> 
    </div>
  );
}

export default App;

// importing our CitySearch component with added event via <CitySearch /> in the App component