import './App.css';
import CitySearch from './components/citysearch/citysearch';

function App() {
  return (
    <div className="container">
      <CitySearch />
    </div>
  );
}

export default App;

// importing our CitySearch component via <CitySearch /> in the App component