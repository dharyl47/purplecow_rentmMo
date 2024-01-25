import React, { useState, useEffect } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import ImageUploader from '../components/ImageUploader';
import { ICar } from '../types/types';

type Props = {
	handleChange: (e: any) => void;
  handleChangeUpdates: (
     b: string | undefined,
     m: string | undefined,
     lp: string | undefined,
     cr: string | undefined
  ) => void;
	listingInfo: ICar;
};

const ListingInfoForm = ({ handleChange,  listingInfo }: Props) => {
	// const [checked, setChecked] = useState(false);
  // const [checked, setChecked] = useState(listingInfo.carAvailability.checked || false);
  // const [checked, setChecked] = useState(
  //   localStorage.getItem('isAlwaysChecked') === 'true'
  // );
  const [checked, setChecked] = useState(() => {
    const storedValue = localStorage.getItem(`isAlwaysChecked_${listingInfo._id}`);
    return storedValue ? JSON.parse(storedValue) : false;

  });
  

	//handle date change
	const handleStartDateChange = (date: Date | null) => {
		handleChange({
			target: {
				name: 'startDate',
				value: date,
			},
		});
	};
	const handleEndDateChange = (date: Date | null) => {
		handleChange({
			target: {
				name: 'endDate',
				value: date,
			},
		});
	};

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    // localStorage.setItem('isAlwaysChecked', String(event.target.checked));
    localStorage.setItem(`isAlwaysChecked_${listingInfo._id}`, JSON.stringify(event.target.checked));

    // Rest of the logic remains the same
    if (!event.target.checked) {
      handleEndDateChange(null);
      handleStartDateChange(listingInfo.carAvailability.startDate);
    } else {
      handleEndDateChange(listingInfo.carAvailability.endDate);
      handleStartDateChange(listingInfo.carAvailability.startDate);
    }
  };
  
  // handleChangeUpdate add by John Rey
  const handleChangeUpdates = (name: string, value: any) => {
    // Call the parent handleChange function to update the state
    handleChange({
      target: {
        name,
        value,
      },
    });
  };
    // useEffect add by John Rey
  useEffect(() => {
    // List of car details to update
    const carDetailsToUpdate = ['brand', 'model', 'licensePlateNumber', 'carRegistrationNumber'];
  
    // Update only the necessary car details
    carDetailsToUpdate.forEach((detail) => handleChangeUpdates(detail, listingInfo[detail]));
  
    // Note: Uncomment and modify the above lines based on your actual requirements
  }, [listingInfo, handleChange]);

  const [addFeatsChecked, setAddFeatsChecked] = useState(false);
  const handleAddFeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddFeatsChecked(event.target.checked);
  };
  
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //const isChecked = event.target.checked;
    const { name, checked } = event.target;
  
    handleChange({
      target: {
        name,
        value: checked,
      },
    });
  
    // Clear all feature checkboxes if additionalFeatures is unchecked
    if (name === "additionalFeatures" && !checked) {
      const features = [
        "automaticTransmission",
        "allWheelDrive",
        "androidAuto",
        "appleCarPlay",
        "auxInput",
        "backUpCamera",
        "bikeRack",
        "converTible",
        "gps",
        "petFriendly",
        "tollPass",
        "usbCharger",
      ];
  
      features.forEach((feature) => {
        handleChange({
          target: {
            name: feature,
            value: false,
          },
        });
      });
    }
  };

	return (
    <>
      
    <div className="flex md:flex-row flex-col md:mt-0 mt-5 items-center md:gap-8 gap-5">
            <div className="flex flex-col w-full">
              <label className="mb-3 text-sm leading-none text-dark900">
                Car Brand
              </label>
              <TextField
                size="small"
                onChange={handleChange}
                value={listingInfo.brand}
                name="brand"
                id="brand"
                type="text"
                placeholder="Enter car brand"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-3 text-sm leading-none text-dark900">
                Car Model
              </label>
              <TextField
                size="small"
                onChange={handleChange}
                value={listingInfo.model}
                name="model"
                id="model"
                type="text"
                placeholder="Enter car model"
                required
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col mt-3 items-center md:gap-8 gap-5">
            <div className="flex flex-col w-full">
              <label className="mb-2 text-sm leading-none text-dark900">
                License Plate Number
              </label>
              <TextField
                size="small"
                onChange={handleChange}
                value={listingInfo.licensePlateNumber}
                name="licensePlateNumber"
                id="licensePlateNumber"
                type="text"
                placeholder="Enter license"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="mb-2 text-sm leading-none text-dark900">
                Vehicle Identification Number
              </label>
              <TextField
                size="small"
                onChange={handleChange}
                value={listingInfo.carRegistrationNumber}
                name="carRegistrationNumber"
                id="carRegistrationNumber"
                type="text"
                placeholder="Enter VIN"
                required
              />
            </div>
          </div>
          <p className="mt-3 text-sm leading-none text-dark900">Car Availability</p>
          <div className="mt-4 flex items-center gap-8">
            <div className="flex flex-col w-full">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="flex flex-row w-full md:gap-8 gap-2">
                  <DatePicker
                    disabled={checked}
                    onChange={(date) => handleStartDateChange(date ? new Date(date) : null)}

                    value={
                      listingInfo.carAvailability.startDate
                        ? new Date(listingInfo.carAvailability.startDate)
                        : null
                    }
                    label="Start Date"
                    className=" w-full"
                    slotProps={{ textField: { size: "small" } }}
                    defaultValue={new Date()}
                  />

                  <DatePicker
                    disabled={checked}
                    onChange={(date) => handleEndDateChange(date ? new Date(date) : null)}

                    value={
                      listingInfo.carAvailability.endDate
                        ? new Date(listingInfo.carAvailability.endDate)
                        : null
                    }
                    label="End Date"
                    className="w-full"
                    slotProps={{ textField: { size: "small" } }}
                    defaultValue={new Date()}
                  />

                  <FormGroup className="w-1/2">
                    <FormControlLabel
                      value="Always"
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={handleCheckboxChange}
                          name="isAlways"
                          id="isAlways"
                          value={checked}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={checked ? "Checked" : "Unchecked"}
                      labelPlacement="end"
                    />
                  </FormGroup>
                </div>
              </LocalizationProvider>
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:mt-0 mt-40 items-center md:gap-8 gap-5 add-features">
            <div className="flex flex-col w-full">
              <label htmlFor="additionalFeatures max-w-max">
                Features&nbsp;
                <input
                  type="checkbox"
                  id="additionalFeatures"
                  name="additionalFeatures"
                  checked={addFeatsChecked}
                  onChange={handleAddFeatsChange}
                />
              </label>
              <div className="flex">
                {addFeatsChecked && (
                  <div className="features-boxes w-2/5">
                    <div>
                      <label htmlFor="automaticTransmission">
                        <input
                          type="checkbox"
                          id="automaticTransmission"
                          name="automaticTransmission"
                          checked={!!listingInfo.automaticTransmission}
                          onChange={handleCheckChange}
                        />
                        &nbsp;Automatic Transmission
                      </label>
                    </div>
                  <div>
                    <label htmlFor="allWheelDrive">
                      <input
                        type="checkbox"
                        id="allWheelDrive"
                        name="allWheelDrive"
                        checked={!!listingInfo.allWheelDrive}
                        onChange={handleCheckChange}
                      />
                      &nbsp;All-Wheel Drive
                    </label>
                  </div>
                  <div>
                    <label htmlFor="androidAuto">
                      <input
                        type="checkbox"
                        id="androidAuto"
                        name="androidAuto"
                        checked={!!listingInfo.androidAuto}
                        onChange={handleCheckChange}
                      />
                      &nbsp;Android Auto
                    </label>
                  </div>
                  <div>
                    <label htmlFor="appleCarPlay">
                      <input
                        type="checkbox"
                        id="appleCarPlay"
                        name="appleCarPlay"
                        checked={!!listingInfo.appleCarPlay}
                        onChange={handleCheckChange}
                      />
                      &nbsp;Apple Car Play
                    </label>
                  </div>
                  <div>
                    <label htmlFor="auxInput">
                      <input
                        type="checkbox"
                        id="auxInput"
                        name="auxInput"
                        checked={!!listingInfo.auxInput}
                        onChange={handleCheckChange}
                      />
                      &nbsp;Auxiliary Input
                    </label>
                  </div>
                  <div>
                    <label htmlFor="backUpCamera">
                      <input
                        type="checkbox"
                        id="backUpCamera"
                        name="backUpCamera"
                        checked={!!listingInfo.backUpCamera}
                        onChange={handleCheckChange}
                      />
                      &nbsp;Backup Camera
                    </label>
                  </div>
                  </div>             
                )}
                {addFeatsChecked && (
                  <div className="features-boxes w-2/5">
                    <div>
                      <label htmlFor="bikeRack">
                        <input
                          type="checkbox"
                          id="bikeRack"
                          name="bikeRack"
                          checked={!!listingInfo.bikeRack}
                          onChange={handleCheckChange}
                        />
                        &nbsp;Bike Rack
                      </label>
                    </div>
                  <div>
                    <label htmlFor="converTible">
                      <input
                        type="checkbox"
                        id="converTible"
                        name="converTible"
                        checked={!!listingInfo.converTible}
                        onChange={handleCheckChange}
                      />
                      &nbsp;Convertible
                    </label>
                  </div>
                  <div>
                    <label htmlFor="gps">
                      <input
                        type="checkbox"
                        id="gps"
                        name="gps"
                        checked={!!listingInfo.gps}
                        onChange={handleCheckChange}
                      />
                      &nbsp;GPS
                    </label>
                  </div>
                  <div>
                    <label htmlFor="petFriendly">
                      <input
                        type="checkbox"
                        id="petFriendly"
                        name="petFriendly"
                        checked={!!listingInfo.petFriendly}
                        onChange={handleCheckChange}
                      />
                      &nbsp;Pet Friendly
                    </label>
                  </div>
                  <div>
                    <label htmlFor="tollPass">
                      <input
                        type="checkbox"
                        id="tollPass"
                        name="tollPass"
                        checked={!!listingInfo.tollPass}
                        onChange={handleCheckChange}
                      />
                      &nbsp;Toll Pass
                    </label>
                  </div>
                  <div>
                    <label htmlFor="usbCharger">
                      <input
                        type="checkbox"
                        id="usbCharger"
                        name="usbCharger"
                        checked={!!listingInfo.usbCharger}
                        onChange={handleCheckChange}
                      />
                      &nbsp;USB Charger
                    </label>
                  </div>
                  </div>             
                )}
              </div>
            </div>
          </div>

          <p className="mt-2 mb-4 text-sm font-semibold leading-none text-dark900">
            Upload photo of your vehicle
          </p>
          <ImageUploader handleChange={handleChange} imageFile={listingInfo} />
        </>
      );
    };

export default ListingInfoForm;