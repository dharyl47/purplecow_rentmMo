'use client';

// React
import React, { useState, useEffect, useRef, useCallback } from "react";
import MapGL, { Marker, Popup } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";

// Next
import Image from "next/image";

// Style
import "mapbox-gl/dist/mapbox-gl.css";

// Context
import { useServiceCarContext } from "../context/ServiceCarContext";

// import { RouteModule } from "next/dist/server/future/route-modules/route-module";

const MapComponent = ({ carList, cardSelected, onCardClick }) => {
  const { data } = useServiceCarContext();
  const mapRef = useRef(null);

  const onSelectCar = useCallback((param) => {
    if (param?.longitude && param?.latitude) {
      mapRef.current?.flyTo({ center: [param.longitude, param.latitude], duration: 2000 });
    }
  }, []);

  const [selectedCar, setSelectedCar] = useState(null);

  const handleMarkerClick = (car) => {
    onCardClick(car);
    setSelectedCar(car);
  };

  useEffect(() => {
    setSelectedCar(cardSelected);
    onSelectCar({ longitude: cardSelected?.lon, latitude: cardSelected?.lat });
  }, [cardSelected]);

  useEffect(() => {
    onSelectCar({ longitude: data[0]?.lon, latitude:  data[0]?.lat });
  }, [data]);

  return (
    <MapGL
      ref={mapRef}
      initialViewState={{
        longitude: 125.601695,
        latitude: 7.069139,
        zoom: 11
      }}
      width="100%"
      height="100%"
      transitionDuration="100"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA"
    >
      {carList.map((car) => (
        <Marker
          style={{cursor: "pointer"}}
          key={car.id}
          latitude={car.lat}
          longitude={car.lon}
          onClick={e => {
            e.originalEvent.stopPropagation();
            handleMarkerClick(car);
          }}
        >
          {/* You can customize the Marker content here if needed */}
        </Marker>
      ))}

      {/* Popup box */}
      {selectedCar && (
        <div
          style={{
            height: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Popup
            anchor="top"
            latitude={selectedCar.lat}
            longitude={selectedCar.lon}
            onClose={() => setSelectedCar(null)}
          >
            <div>
              <Image
                src="/assets/images/testImages/toyotaVios.jpg"
                alt="Car Image"
                width={150}
                height={150}
              />
              <div className="flex flex-col justify-center text-center">
                <h3
                  className="text-s font-bold mb-2"
                  style={{ fontWeight: 1100 }}
                >
                  {selectedCar.brand}
                </h3>
                <div className="flex items-center -mt-3 justify-center text-center">
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-s font-semibold">{4.5}</span>
                  <span className="text-gray-600 ml-1">({99} reviews)</span>
                </div>
                <p
                  className="text-gray-900 text-s font-bold mt-3 mb-1"
                  style={{ fontWeight: 800 }}
                >
                  Php {selectedCar.price}/day
                </p>
              </div>
            </div>
          </Popup>
        </div>
      )}
    </MapGL>
  );
};

export default MapComponent;
