"use client";
import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const MapComponent = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "400px",
    latitude: 7.1907,
    longitude: 125.4553,
    zoom: 12,
  });

  const [selectedLocation, setSelectedLocation] = useState({
    lng: 125.4553,
    lat: 7.1907,
  });

  const handleMapClick = (event) => {
    if (event.lngLat) {
      const { lng, lat } = event.lngLat;
      // Update selectedLocation to match the clicked coordinates
      setSelectedLocation({ lat, lng });
    } else {
      console.error("Invalid event object or lngLat format:", event);
    }
  };

  return (
    
      <ReactMapGL
        {...viewport}
        mapboxAccessToken="pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => setViewport(viewport)}
        onClick={handleMapClick}
      >
        <Marker
          latitude={selectedLocation.lat} // Use selectedLocation's lat
          longitude={selectedLocation.lng} // Use selectedLocation's lng
        >
          {/* Your marker UI or component */}
        </Marker>
      </ReactMapGL>
    
  );
};

export default MapComponent;

