'use client';
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { RouteModule } from "next/dist/server/future/route-modules/route-module";
import Image from "next/image";
const MapComponent = ({ carList, cardSelected }) => {
  const defaultLocation = { lat: 7.069139, lng: 125.601695 };
  const [defaultLat, setDefaultLat] = useState(7.069139);
  const [defaultLon, setDefaultLon] = useState(125.601695);

  // Local state for viewport
  const [viewPort, setViewport] = useState({
    latitude: defaultLat,
    longitude: defaultLon,
    zoom: 11,
  });

  const [selectedCar, setSelectedCar] = useState(null);

  const handleMarkerClick = (car) => {
    console.log("click", car);
    setDefaultLat(car.lat);
    setDefaultLon(car.lon);
    setSelectedCar(car);
  };

  useEffect(() => {
    setSelectedCar(cardSelected);
  }, [cardSelected]);

  return (
    <ReactMapGL
      {...viewPort}
      mapboxAccessToken="pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      width="100%"
      height="100%"
      onViewportChange={(viewPort) => setViewport(viewPort)}
      transitionDuration="100"
    >
      {carList.map((car) => (
        <Marker
          key={car.id}
          latitude={car.lat}
          longitude={car.lon}
          onClick={() => handleMarkerClick(car)}
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
    </ReactMapGL>
  );
};

export default MapComponent;
