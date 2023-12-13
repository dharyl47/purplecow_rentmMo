// import React, { useState } from "react";
// import {
//   TextField,
//   ThemeProvider,
//   Modal,
//   Button,
//   Backdrop
// } from "@mui/material";
// import { ICar } from "../types/types";
// import { theme } from "./themes/themes";
// import MapComponent from "../components/MapComponent"; // Import the MapComponent

// type Props = {
//   handleChange: (e: any) => void;
//   personalInfo: ICar;
// };

// const PersonalInfoForm = ({ handleChange, personalInfo }: Props) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//     const handleCloseButtonClick = () => {
//       setModalOpen(false);
//     };
// 	  const handleMouseEnter = () => {
//       setIsHovered(true);
//     };

//     const handleMouseLeave = () => {
//       setIsHovered(false);
//     };
//  const buttonBackgroundColor = isHovered
//    ? theme.palette.secondary.main // Hover background color
//    : theme.palette.primary.main;
//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <div>
//           <div className=" flex lg:flex-row items-center lg:gap-8 flex-col gap-0 lg:mt-5 mt-0">
//             <div className=" flex flex-col lg:mt-0 mt-5 w-full">
//               <label className="mb-3 text-sm leading-none text-dark900">
//                 Mobile Number
//               </label>
//               <TextField
//                 variant="outlined"
//                 size="small"
//                 onChange={handleChange}
//                 name="mobileNumber"
//                 id="mobileNumber"
//                 value={personalInfo.mobileNumber}
//                 type="number"
//                 placeholder="09XXXXXXXXX"
//                 required
//               />
//             </div>
//             <div className="flex flex-col lg:mt-0 mt-5 w-full">
//               <label className="mb-3 text-sm leading-none text-dark900">
//                 Email Address
//               </label>
//               <TextField
//                 variant="outlined"
//                 size="small"
//                 onChange={handleChange}
//                 name="email"
//                 id="email"
//                 value={personalInfo.email}
//                 type="email"
//                 placeholder="rentmo@gmail.com"
//                 required
//               />
//             </div>
//           </div>
//           <div className="lg:mt-5 mt-0 flex lg:flex-row items-center lg:gap-8 flex-col gap-0">
//             <div className="flex flex-col lg:mt-0 mt-5 w-full">
//               <label className="mb-3 text-sm leading-none text-dark900">
//                 Street Address
//               </label>
//               <p
//                 className="mb-3 text-sm leading-none text-dark900"
//                 style={{ color: "blue", cursor: "pointer" }}
//                 onClick={handleModalOpen}
//               >
//                 Pin on Location
//               </p>
//               <TextField
//                 variant="outlined"
//                 size="small"
//                 onChange={handleChange}
//                 name="street"
//                 id="street"
//                 value={personalInfo.street}
//                 type="text"
//                 placeholder="Unit#/Street/Barangay"
//                 required
//               />
//             </div>
//             <div className="flex flex-col lg:mt-0 mt-5 w-full">
//               <label className="mb-3 text-sm leading-none text-dark900">
//                 City
//               </label>
//               <TextField
//                 variant="outlined"
//                 size="small"
//                 onChange={handleChange}
//                 name="city"
//                 id="city"
//                 value={personalInfo.city}
//                 type="text"
//                 placeholder="Enter City"
//                 required
//               />
//             </div>
//           </div>
//           <div className="lg:mt-5 mt-0 flex lg:flex-row items-center lg:gap-8 flex-col gap-0">
//             <div className="flex flex-col w-full lg:mt-0 mt-5">
//               <label className="mb-3 text-sm leading-none text-dark900">
//                 Province
//               </label>
//               <TextField
//                 variant="outlined"
//                 size="small"
//                 onChange={handleChange}
//                 name="state"
//                 id="state"
//                 value={personalInfo.state}
//                 type="text"
//                 placeholder="Enter Province"
//                 required
//               />
//             </div>
//             <div className="flex flex-col w-full lg:mt-0 mt-5">
//               <label className="mb-3 text-sm leading-none text-dark900">
//                 Country
//               </label>
//               <TextField
//                 variant="outlined"
//                 size="small"
//                 onChange={handleChange}
//                 name="country"
//                 id="country"
//                 value={personalInfo.country}
//                 type="text"
//                 placeholder="Enter Country"
//                 required
//               />
//             </div>
//             <div className="flex flex-col lg:w-1/2 w-full lg:my-0 mt-5 mb-10">
//               <label className="mb-3 text-sm leading-none text-dark900">
//                 Zip Code
//               </label>
//               <TextField
//                 variant="outlined"
//                 size="small"
//                 onChange={handleChange}
//                 name="zipCode"
//                 id="zipCode"
//                 value={personalInfo.zipCode}
//                 type="number"
//                 placeholder="Zip Code"
//                 required
//               />
//             </div>
//           </div>
//           <Modal
//             open={modalOpen}
//             onClose={handleModalClose}
//             aria-labelledby="map-modal"
//             aria-describedby="map-modal-description"
//             closeAfterTransition
//             BackdropComponent={Backdrop}
//             BackdropProps={{
//               timeout: 500,
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: "100%", // Set width to occupy the entire modal
//                 height: "100%", // Set height to occupy the entire modal
//               }}
//             >
//               <div
//                 style={{
//                   position: "relative",
//                   width: "80%", // Adjust the width of the map container
//                   height: "80%", // Adjust the height of the map container
//                   backgroundColor: "white",
//                   padding: "20px",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <Button
//                   onClick={handleCloseButtonClick}
//                   onMouseEnter={handleMouseEnter}
//                   onMouseLeave={handleMouseLeave}
//                   style={{
//                     position: "absolute",
//                     top: "10px",
//                     right: "10px",
//                     zIndex: 9999,
//                     borderRadius: "50%", // Rounded corners
//                     width: "40px", // Larger width
//                     height: "40px", // Larger height
//                     minWidth: "unset", // Remove minimum width
//                     backgroundColor: buttonBackgroundColor, // Set background color dynamically
//                     transition: "background-color 0.3s ease", // Smooth transition
//                   }}
//                   variant="contained"
//                 >
//                   X
//                 </Button>
//                 <MapComponent />
//               </div>
//             </div>
//           </Modal>
//         </div>
//       </ThemeProvider>
//     </>
//   );
// };

// export default PersonalInfoForm;

import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  ThemeProvider,
  Modal,
  Button,
  Backdrop,
} from "@mui/material";
import { ICar } from "../types/types";
import { theme } from "./themes/themes";
import MapComponent from "../components/MapComponent"; // Import the MapComponent
import AddressSearch from "../components/AddressSearch";

type Props = {
  handleChange: (e: any) => void;
  handleChangeUpdate: (
    x: string | undefined,
    y: string | undefined,
    c: string | undefined,
    s: string | undefined,
    ct: string | undefined
  ) => void;
  personalInfo: ICar;
};

// Added by Leo
const apiKey = process.env.APP_GMAP_API_KEY as string;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
interface Address {
  city: string;
  state: string;
  zip: string;
  lat: string;
  lon: string;
  country: string;
  plain(): string;
}
// Added by Leo end here

const PersonalInfoForm = ({
  handleChange,
  handleChangeUpdate,
  personalInfo,
}: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [googleMaps, setGoogleMaps] = useState<any>(null);

  const handleChangeLat = (name: any, value: any) => {
    handleChange({
      target: {
        name: name,
        value: value,
      },
    });
  };
  const handleChangeLon = (name: any, value: any) => {
    handleChange({
      target: {
        name: name,
        value: value,
      },
    });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleCloseButtonClick = () => {
    setModalOpen(false);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const buttonBackgroundColor = isHovered
    ? theme.palette.secondary.main // Hover background color
    : theme.palette.primary.main;

  //Code added by Leo
  const searchInput = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<Address>({
    city: "",
    state: "",
    zip: "",
    country: "",
    lat: "",
    lon: "",
    plain: () => "",
  });

  const initMapScript = () => {
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };
  const [city, setCity] = useState<string | undefined>();
  const [zip, setZip] = useState<string | undefined>();
  const [country, setCountry] = useState<string | undefined>();
  const [latX, setLatX] = useState<number | undefined>();
  const [lonY, setLonY] = useState<number | undefined>();
  const [state, setState] = useState<string | undefined>();

  const onChangeAddress = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();

    console.log("dataview", autocomplete.getPlace());
    const addressComponents = place.address_components;
    const formattedAddress = place.formatted_address;
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    setLatX(latitude);
    setLonY(longitude);

    let zipCode = "";
    // Extracting the zip code from address components
    for (const component of addressComponents) {
      if (component.types.includes("postal_code")) {
        zipCode = component.long_name;
        break;
      }
    }

    let isAutoFill = true; // Assuming this change is due to auto-fill
    setAddress(extractAddress(place));
    // Trigger changes only if the event is not due to auto-fill
  };


useEffect(() => {
  // Use the new handleUpdateState function to update the state immediately
  handleChangeUpdate(latX+"", lonY+"", city, state, country);
}, [latX, lonY, city, country, state, personalInfo]);













  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current
    );
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () =>
      onChangeAddress(autocomplete)
    );
  };

  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  }, []);

  // Load Google Map API JS
  function loadAsyncScript(src: string): Promise<HTMLScriptElement> {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      Object.assign(script, {
        type: "text/javascript",
        async: true,
        src,
      });
      script.addEventListener("load", () => resolve(script));
      document.head.appendChild(script);
    });
  }

  const extractAddress = (place: any): Address => {
    const address: Address = {
      city: "",
      state: "",
      zip: "",
      lat: "",
      lon: "",
      country: "",
      plain() {
        const city = this.city ? this.city + ", " : "";
        const zip = this.zip ? this.zip + ", " : "";
        const state = this.state ? this.state + ", " : "";
        const lat = this.lat ? "Lat: " + this.lat + ", " : "";
        const lon = this.lon ? "Lon: " + this.lon + ", " : "";
        const country = this.country ? this.country + ", " : "";
        return city + zip + state + lat + lon + country;
      },
    };

    if (!Array.isArray(place?.address_components)) {
      return address;
    }

    place.address_components.forEach(
      (component: { types: string[]; long_name: string }) => {
        const types = component.types;
        const value = component.long_name;

        if (types.includes("locality")) {
          address.city = value;
          setCity(value);
        }

        if (types.includes("administrative_area_level_2")) {
          address.state = value;
          setState(value);
        }

        if (types.includes("postal_code")) {
          address.zip = value;
        }

        if (types.includes("country")) {
          address.country = value;
          setCountry(value);
        }
      }
    );

    // Get latitude and longitude
    if (place.geometry && place.geometry.location) {
      address.lat = place.geometry.location.lat().toString();
      address.lon = place.geometry.location.lng().toString();
    }

    return address;
  };
  //Code added by Leo end here

  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
          <div className=" flex lg:flex-row items-center lg:gap-8 flex-col gap-0 lg:mt-5 mt-0">
            <div className=" flex flex-col lg:mt-0 mt-5 w-full">
              <label className="mb-3 text-sm leading-none text-dark900">
                Mobile Number
              </label>
              <TextField
                variant="outlined"
                size="small"
                onChange={handleChange}
                name="mobileNumber"
                id="mobileNumber"
                value={personalInfo.mobileNumber}
                type="number"
                placeholder="09XXXXXXXXX"
                required
              />
            </div>
            <div className="flex flex-col lg:mt-0 mt-5 w-full">
              <label className="mb-3 text-sm leading-none text-dark900">
                Email Address
              </label>
              <TextField
                variant="outlined"
                size="small"
                onChange={handleChange}
                name="email"
                id="email"
                value={personalInfo.email}
                type="email"
                placeholder="rentmo@gmail.com"
                required
              />
            </div>
          </div>
          <div className="lg:mt-5 mt-0 flex lg:flex-row items-center lg:gap-8 flex-col gap-0">
            <div className="flex flex-col lg:mt-0 mt-5 w-full">
              <label className="mb-3 text-sm leading-none text-dark900">
                Street Address
              </label>
              <p
                className="mb-3 text-sm leading-none text-dark900"
                style={{ color: "blue", cursor: "pointer" }}
                onClick={handleModalOpen}
              >
                Pin on Location
              </p>
              <TextField
                variant="outlined"
                size="small"
                onChange={handleChange}
                name="street"
                id="street"
                value={personalInfo.street}
                type="text"
                placeholder="Unit#/Street/Barangay"
                required
              />
            </div>
            <p>
              <TextField
                variant="outlined"
                size="small"
                onChange={handleChange}
                name="lat"
                id="lat"
                value={personalInfo.lat}
                type="number"
                placeholder="Latitude"
                required
              />
              <TextField
                variant="outlined"
                size="small"
                onChange={handleChange}
                name="lon"
                id="lon"
                value={personalInfo.lon}
                type="number"
                placeholder="Longitude"
                required
              />
            </p>
            <div className="flex flex-col lg:mt-0 mt-5 w-full">
              <label className="mb-3 text-sm leading-none text-dark900">
                City
              </label>
              <TextField
                variant="outlined"
                size="small"
                onChange={handleChange}
                name="city"
                id="city"
                value={personalInfo.city}
                type="text"
                placeholder="Enter City"
                required
              />
            </div>
          </div>
          <div className="lg:mt-5 mt-0 flex lg:flex-row items-center lg:gap-8 flex-col gap-0">
            <div className="flex flex-col w-full lg:mt-0 mt-5">
              <label className="mb-3 text-sm leading-none text-dark900">
                Province
              </label>
              <TextField
                variant="outlined"
                size="small"
                onChange={handleChange}
                name="state"
                id="state"
                value={personalInfo.state}
                type="text"
                placeholder="Enter Province"
                required
              />
            </div>
            <div className="flex flex-col w-full lg:mt-0 mt-5">
              <label className="mb-3 text-sm leading-none text-dark900">
                Country
              </label>
              <TextField
                variant="outlined"
                size="small"
                onChange={handleChange}
                name="country"
                id="country"
                value={personalInfo.country}
                type="text"
                placeholder="Enter Country"
                required
              />
            </div>
            <div className="flex flex-col lg:w-1/2 w-full lg:my-0 mt-5 mb-10">
              <label className="mb-3 text-sm leading-none text-dark900">
                Zip Code
              </label>
              <TextField
                variant="outlined"
                size="small"
                onChange={handleChange}
                name="zipCode"
                id="zipCode"
                value={personalInfo.zipCode}
                type="number"
                placeholder="Zip Code"
                required
              />
            </div>
          </div>
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="map-modal"
            aria-describedby="map-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%", // Set width to occupy the entire modal
                height: "100%", // Set height to occupy the entire modal
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "80%", // Adjust the width of the map container
                  height: "80%", // Adjust the height of the map container
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <Button
                  onClick={handleCloseButtonClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 9999,
                    borderRadius: "50%", // Rounded corners
                    width: "40px", // Larger width
                    height: "40px", // Larger height
                    minWidth: "unset", // Remove minimum width
                    backgroundColor: buttonBackgroundColor, // Set background color dynamically
                    transition: "background-color 0.3s ease", // Smooth transition
                  }}
                  variant="contained"
                >
                  X
                </Button>
                <MapComponent
                  handleChangeLat={handleChangeLat}
                  handleChangeLon={handleChangeLon}
                />
              </div>
            </div>
          </Modal>
        </div>
        {/* Display or use selectedLocation in your form */}
        {/* <p>Selected Location: {`Lat: ${selectedLocation.lat}, Lng: ${selectedLocation.lng}`}</p> */}
      </ThemeProvider>

      {/* Added for AddressSearch */}
      {/* <div>
      <h1>Address Search Page</h1>
      <AddressSearch/>
    </div> */}
      <div className="App">
        <div>
          <div className="search">
            <span>{/* <Search /> */} Street Address</span>
            <input
              ref={searchInput}
              type="text"
              placeholder="Search Street Address"
            />
            {/* <button onClick={findMyLocation}>
            <GpsFixed />
          </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;
