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



import React, { useState } from "react";
import {
  TextField,
  ThemeProvider,
  Modal,
  Button,
  Backdrop
} from "@mui/material";
import { ICar } from "../types/types";
import { theme } from "./themes/themes";
import MapComponent from "../components/MapComponent"; // Import the MapComponent

type Props = {
  handleChange: (e: any) => void;
  personalInfo: ICar;
};
type Location = {
  lat: number | null;
  lng: number | null;
};

const PersonalInfoForm = ({ handleChange, personalInfo }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    lat: null,
    lng: null,
  });

  const handleLocationSelect = (location: Location) => {
    // Update the state with the selected location
    console.log("Selected Location:", location);
    setSelectedLocation(location);

    // Update the form data with the selected location
    handleChange({
      target: {
        name: 'lat',
        value: location.lat,
      },
    });

    handleChange({
      target: {
        name: 'lon',
        value: location.lng,
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
   
    // Log coordinates when selectedLocation changes
    React.useEffect(() => {
      console.log("Coordinates: selectedLocation =", selectedLocation.lat, selectedLocation.lng);
    }, [selectedLocation]);

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
                <MapComponent onLocationSelect={handleLocationSelect} />
              </div>
            </div>
          </Modal>
        </div>
        {/* Display or use selectedLocation in your form */}
      {/* <p>Selected Location: {`Lat: ${selectedLocation.lat}, Lng: ${selectedLocation.lng}`}</p> */}
      </ThemeProvider>
      
    </>
  );
};

export default PersonalInfoForm;
