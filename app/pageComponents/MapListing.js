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
import { useServiceCarContext } from "../../contexts/ServiceCarContext";
import { FaCity, FaPesoSign, FaStar } from "react-icons/fa6";

// import { RouteModule } from "next/dist/server/future/route-modules/route-module";

const MapComponent = ({ carList, cardSelected, onCardClick }) => {
  const { data } = useServiceCarContext();
  const mapRef = useRef(null);

  const onSelectCar = useCallback((param) => {
    if (param?.longitude && param?.latitude) {
      mapRef.current?.flyTo({ center: [param.longitude, param.latitude], duration: 2000, zoom: 11 });
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
          <Popup
            anchor="top"
            latitude={selectedCar.lat}
            longitude={selectedCar.lon}
            onClose={() => setSelectedCar(null)}
            className="custom-popup-map"
          >
              <Image
                src="/assets/images/testImages/toyotaVios.jpg"
                alt="Car Image"
                width={1920}
                height={150}
              />
              <div className="flex flex-col px-3 py-3">
                <h1
                  className="text-xl font-bold mb-2"
                >
                  {selectedCar.brand} {selectedCar.model}
                </h1>

                <div className="flex flex-row items-center mt-2">
                  <FaStar size={15}  />
                  <p className="text-md ml-2">4.5 (99 reviews)</p>
                </div>

                <div className="flex flex-row items-center mt-2 mr-5">
                  <FaPesoSign size={15} />
                  <p className="text-md ml-2">{selectedCar.price} per day</p>
                </div>

                <div className="flex flex-row items-center mt-2">
                  <FaCity size={15} />
                  <p className="text-md ml-2">{selectedCar.city}</p>
                </div>

                <div className="flex flex-row justify-end mt-2 w-full">
                  <p className="text-md ml-2 underline font-bold cursor-pointer">View Car Details</p>
                </div>
              </div>
          </Popup>
      )}
    </MapGL>
  );
};

export default MapComponent;
