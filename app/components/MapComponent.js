"use client";
// import React, { useState } from "react";
// import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';

// const MapComponent = () => {
//   const [viewport, setViewport] = useState({
//     width: "100%",
//     height: "400px",
//     latitude: 7.1907,
//     longitude: 125.4553,
//     zoom: 12,
//   });

//   const [selectedLocation, setSelectedLocation] = useState({
//     lng: 125.4553,
//     lat: 7.1907,
//   });

//   const handleMapClick = (event) => {
//     if (event.lngLat) {
//       const { lng, lat } = event.lngLat;
//       // Update selectedLocation to match the clicked coordinates
//       setSelectedLocation({ lat, lng });
//     } else {
//       console.error("Invalid event object or lngLat format:", event);
//     }
//   };

//   return (
    
//       <ReactMapGL
//         {...viewport}
//         mapboxAccessToken="pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA"
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         onViewportChange={(viewport) => setViewport(viewport)}
//         onClick={handleMapClick}
//       >
//         <Marker
//           latitude={selectedLocation.lat} // Use selectedLocation's lat
//           longitude={selectedLocation.lng} // Use selectedLocation's lng
//         >
//           {/* Your marker UI or component */}
//         </Marker>
//       </ReactMapGL>
    
//   );
// };

// export default MapComponent;


// import React, { useState, useEffect } from 'react';
// import ReactMapGL, { Marker } from "react-map-gl";
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { RouteModule } from 'next/dist/server/future/route-modules/route-module';

// const MapComponent = ({ handleChangeLat, handleChangeLon }) => {
//   const defaultLocation = { lat: 7.1907, lng: 125.4553 };
//   // Local state for viewport
//   const [viewPort, setViewport] = useState({
//     latitude: defaultLocation.lat,
//     longitude: defaultLocation.lng,
//     zoom: 12,
//   });

//   const [selectedLocation, setSelectedLocation] = useState({
//     lat: 0,
//     lng: 0,
//   });

//   const handleMapClick = (event) => {
//     console.log("Map Clicked", event);
//     if (event.lngLat) {
//       const { lng, lat } = event.lngLat;
//       console.log("Clicked Coordinates: lat =", lat, "lng =", lng);
      
//       setSelectedLocation({ lat, lng });
//       setViewport({
//         ...viewPort,
//         latitude: lat,
//         longitude: lng,
//       });
//      handleChangeLon('lon', lng);
//     } else {
//       console.error("Invalid event object or lngLat format:", event);
//     }
//   };
//     // Log coordinates when selectedLocation changes
//     useEffect(() => {   
//        handleChangeLat('lat', selectedLocation.lat);
//     }, [selectedLocation]);

//   return (
//     <ReactMapGL
//       {...viewPort}
//       mapboxAccessToken="pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA"
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//       width='100%'
//       height='100%'
//       onViewportChange={(viewPort) => setViewport(viewPort)}
//       onClick={handleMapClick}
//       transitionDuration='100'
//     >
//       {selectedLocation ?(
//         <>
//       <Marker
//         latitude={selectedLocation?.lat} // Use selectedLocation's lat, default to 0 if null
//         longitude={selectedLocation?.lng} // Use selectedLocation's lng, default to 0 if null
//         offsetLeft={-3.5 * viewPort.zoom}
//         offsetTop={-7 * viewPort.zoom}
//       >
//       {/* <Room>
//         style={{
//           fontSize: 7 * viewPort.zoom,
//           color: "tomato",
//           cursor: "pointer",
//         }}
//       </Room> */}
//       </Marker>
//       </>
//       ) :null}
//     </ReactMapGL>
//   );
// };


// export default MapComponent;

import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { RouteModule } from 'next/dist/server/future/route-modules/route-module';


const MapComponent = ({ handleChangeLat, handleChangeLon, handleChangeCity, handleChangeCountry, handleChangeZipCode, handleChangeCounty, }) => {
  const defaultLocation = { lat: 7.1907, lng: 125.4553 };
  // Local state for viewport
  const [viewPort, setViewport] = useState({
    latitude: defaultLocation.lat,
    longitude: defaultLocation.lng,
    zoom: 12,
  });
  
  const [selectedLocation, setSelectedLocation] = useState(null);
  // const [selectedLocation, setSelectedLocation] = useState({
  //   lat: 0,
  //   lng: 0,
  // });

  const handleMapClick = async (event) => {
    // console.log("Map Clicked", event);
    if (event.lngLat) {
      const { lng, lat } = event.lngLat;
      // console.log("Clicked Coordinates: lat =", lat, "lng =", lng);
      
      // setSelectedLocation({ lat, lng });
      
    //  handleChangeLon('lon', lng);

     try {
      // Fetch city and country information using Mapbox Geocoding API
      const response = await fetch(
        // "https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA"
        // "https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2xwMmQ2ZGRiMHd1ZTJrbzVmOWtqczV3eSJ9.MC9rvcpLcK3IekyFDcvDig"
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA`
      );

      if (response.ok) {
        const data = await response.json();

        // Extract city and country from API response
        // const place = data.features[0];
        // const city = place.context.find((item) => item.id.startsWith('place'))?.text;
        // const country = place.context.find((item) => item.id.startsWith('country'))?.text;
        const place = data.features[0];
        const city = place.context.find((item) => item.id.startsWith('place'))?.text;
        const country = place.context.find((item) => item.id.startsWith('country'))?.text;
        const zipCode = place.context.find((item) => item.id.startsWith('postcode'))?.text;
        const county = place.context.find((item) => item.id.startsWith('region'))?.text;
        // Log the extracted city and country for debugging
          console.log('LOCATION DETAILS');
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
        // Update city and country in the form fields
        // if (city, country) {
          // Update your form fields (assuming you have functions like handleChangeCity and handleChangeCountry)
          handleChangeLat('lat', lat);
          handleChangeLon('lon', lng);
          handleChangeCity('city', city);
          handleChangeCountry('country', country);
          handleChangeZipCode('zipCode', zipCode);
          handleChangeCounty('county', county);
        // }
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
      }
    }, [selectedLocation]);
    
    

  return (
    <ReactMapGL
      // {...viewPort}
      mapboxAccessToken="pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2w5NTluMDh2MXQ3YTNucW16cG9tbGU3dyJ9.z96hyUi9vkmIJDdBB6WjxA"
      // mapboxAccessToken="pk.eyJ1IjoiZGhhcnlsOTciLCJhIjoiY2xwMmQ2ZGRiMHd1ZTJrbzVmOWtqczV3eSJ9.MC9rvcpLcK3IekyFDcvDig"
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
          // offsetLeft={-3.5 * viewPort.zoom}
          // offsetTop={-7 * viewPort.zoom}
        >
          {/* Marker content here */}
          {/* <div style={{ color: 'red', fontSize: '20px' }}>X</div> */}
        </Marker>
        </>
      ) : null}
    </ReactMapGL>
  );
};


export default MapComponent;