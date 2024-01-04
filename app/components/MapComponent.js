"use client";

import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { RouteModule } from 'next/dist/server/future/route-modules/route-module';


const MapComponent = ({ handleChangeUpdate, handleChangeLat, handleChangeLon }) => {
  
  const defaultLocation = { lat: 7.1907, lng: 125.4553 };
  // Local state for viewport
  const [viewPort, setViewport] = useState({
    latitude: defaultLocation.lat,
    longitude: defaultLocation.lng,
    zoom: 12,
  });

    const [cityState, setCityState] = useState();
    const [zipCodeState, setZipState] = useState();
    const [countryState, setCountryState] = useState();
    const [countyState, setCountyState] = useState();
    const [streetAddress, setStreetAddress] = useState();
    const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = async (event) => {
    if (event.lngLat) {
      const { lng, lat } = event.lngLat;

     try {
      // Fetch city and country information using Mapbox Geocoding API
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA`
      );

      if (response.ok) {
        const data = await response.json();
        const place = data.features[0];
        const city = place.context.find((item) => item.id.startsWith('place'))?.text;
        const country = place.context.find((item) => item.id.startsWith('country'))?.text;
        const zipCode = place.context.find((item) => item.id.startsWith('postcode'))?.text;
        const county = place.context.find((item) => item.id.startsWith('region'))?.text;
        const streetAdd = place.text;
        setStreetAddress(streetAdd)

          console.log('LOCATION DETAILS');
          console.log('Street:', streetAdd);
          console.log('Lat:', lat);
          console.log('Lon:', lng);
          console.log('City:', city);
          console.log('Country:', country);
          console.log('County:', county);
          console.log('Zip Code:', zipCode);

          setSelectedLocation({ lat, lng });
          setViewport({
            // ...viewPort,
            latitude: lat,
            longitude: lng,
          });
          // Update your form fields (assuming you have functions like handleChangeCity and handleChangeCountry)

          setCityState(city);
          setCountryState(country);
          setZipState(zipCode);
          setCountyState(county);
          
          handleChangeLat('lat', lat);
          handleChangeLon('lon', lng);

        // Update street information
      } else {
        console.error('Failed to fetch data from Mapbox Geocoding API');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } else {
    console.error('Invalid event object or lngLat format:', event);

    } 
    
  };
    // Log coordinates when selectedLocation changes
    useEffect(() => {   
      if (selectedLocation) {
        handleChangeLat('lat', selectedLocation.lat);
        handleChangeLon('lon', selectedLocation.lng);
        handleChangeUpdate(
            selectedLocation.lat?.toString(), selectedLocation.lng?.toString(), 
            cityState, countyState, countryState, streetAddress, streetAddress, zipCodeState);
      }
    }, [selectedLocation]);



  return (
    <ReactMapGL
      // {...viewPort}
      mapboxAccessToken="pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      width='100%'
      height='100%'
      onViewportChange={(viewPort) => setViewport(viewPort)}
      onClick={handleMapClick}
      transitionDuration='100'
    >
      {selectedLocation ? (
        <>
        <Marker
          latitude={selectedLocation.lat}
          longitude={selectedLocation.lng}
        >
        </Marker>
        </>
      ) : null}
    </ReactMapGL>
  );
};


export default MapComponent;