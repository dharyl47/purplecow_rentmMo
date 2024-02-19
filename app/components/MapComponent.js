"use client";

import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { RouteModule } from 'next/dist/server/future/route-modules/route-module';


const MapComponent = ({ personalInfo, handleChangeUpdate, handleChangeLat, handleChangeLon }) => {
    const [cityState, setCityState] = useState();
    const [zipCodeState, setZipState] = useState();
    const [countryState, setCountryState] = useState();
    const [countyState, setCountyState] = useState();
    const [streetAddress, setStreetAddress] = useState();
    const [selectedLocation, setSelectedLocation] = useState({lat: personalInfo.lat, lng: personalInfo.lon});

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


        console.log({ lat, lng })
          // Update your form fields (assuming you have functions like handleChangeCity and handleChangeCountry)
          setStreetAddress(streetAdd)
          setSelectedLocation({ lat, lng });
          setCityState(city);
          setCountryState(country);
          setZipState(zipCode);
          setCountyState(county);
          
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
      initialViewState={{
        longitude: personalInfo.lon ? personalInfo.lon : 121.7740,
        latitude: personalInfo.lat ? personalInfo.lat : 12.8797,
        zoom: 5
      }}
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