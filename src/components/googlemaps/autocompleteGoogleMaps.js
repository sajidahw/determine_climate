// code adapted from Google Cloud Console for Places API and Maps JavaScript API

import React, { useState, useRef } from 'react';
import { useLoadScript, Autocomplete, GoogleMap, Marker } from '@react-google-maps/api';
// import { libraries } from "../../api";
 // eslint-disable-next-line
import { libraries, GOOGLEMAPS_API_KEY, googlemaps_api_url } from "../../api";


// experimenting with this page, double check API documentation for this part and correct implementation...
 // eslint-disable-next-line
{/* <script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLEMAPS_API_KEY}&libraries=places"></script>  */}

// const libraries = ['places']; // from here or api.js page?
// w: 100vw, h: 50vh; w 400px, h 400px
const mapContainerStyle = {
  width: '80vw',
  height: '50vh',
};

// Default center of the map (e.g., New York) lat: 40.712776, lng: -74.005974,
// SF Latitude and longitude coordinates are: 37.773972, -122.431297.
const defaultCenter = {
  lat: 37.773972,
  lng: -122.431297,
};

const AutocompleteGoogleMaps = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries,
  });

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(defaultCenter);
  const autocompleteRef = useRef(null); // autocomplete instance reference


  // handleSelect function updates both address and location state based off of city or zipcode
  const handleSelect = () => {
    const place = autocompleteRef.current.getPlace();
    setAddress(place.formatted_address);
    setLocation({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  };

  // orig input style width: 300, height: 40

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handleSelect}
      >
        <input
          type="text"
          placeholder="Enter a city's name or a zipcode..."
          style={{ width: 300, height: 40 }} 
        /> 
      </Autocomplete>
      
      {address && <div><strong>Selected Address:</strong> {address}</div>}
      
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={location}
      >
        <Marker position={location} />
      </GoogleMap>
    </div>
  );
};

export default AutocompleteGoogleMaps;
