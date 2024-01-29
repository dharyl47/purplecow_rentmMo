import React, { useState, useEffect } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Checkbox, FormControlLabel, FormGroup, TextField, TextareaAutosize } from '@mui/material';
import ImageUploader from '../components/ImageUploader';
import { ICar } from '../types/types';

type Props = {
	handleChange: (e: any) => void;
  handleChangeUpdates: (
     b: string | undefined,
     m: string | undefined,
     lp: string | undefined,
     cr: string | undefined,
     dc: string | undefined
  ) => void;
	listingInfo: ICar;
};

const ListingInfoForm = ({ handleChange,  listingInfo }: Props) => {
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
    const isChecked = event.target.checked;
    setChecked(isChecked);
    
    if (listingInfo && listingInfo.carAvailability) {
      if (!isChecked) {
        handleEndDateChange(null);
      } else {
        handleEndDateChange(listingInfo.carAvailability.endDate);
      }
  
      handleStartDateChange(listingInfo.carAvailability.startDate);
    }
  
    localStorage.setItem(`isAlwaysChecked_${listingInfo._id}`, JSON.stringify(isChecked));
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
    const carDetailsToUpdate = ['brand', 'model', 'licensePlateNumber', 'carRegistrationNumber', 'description'];
  
    // Update only the necessary car details
    carDetailsToUpdate.forEach((detail) => handleChangeUpdates(detail, listingInfo[detail]));
  
    // Note: Uncomment and modify the above lines based on your actual requirements
  }, [listingInfo, handleChange]);

  const [addFeatsChecked, setAddFeatsChecked] = useState(false);
  const handleAddFeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddFeatsChecked(event.target.checked);
  };
  
  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const { name, checked } = event.target;
  
    // Update the listingInfo state if needed
    handleChange({
      target: {
        name: name,
        value: isChecked,
      },
    });
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
          <div className="flex flex-col w-full mt-3 gap-2">
            <label className="mb-2 text-sm leading-none text-dark900">
              Descriptions
            </label>
            <TextareaAutosize
              minRows={2}
              maxRows={5}
              onChange={handleChange}
              value={listingInfo.description}
              name="description"
              id="description"
              placeholder="Enter Your Car Details"
              className="border border-gray-300 p-2 rounded-md"
              required
            />
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
                          // onChange={()=>handleCheckboxChange(checked)}
                          name="isAlways"
                          id="isAlways"
                          value={checked}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={checked ? "Always Available" : "Always Available"}
                      labelPlacement="end"
                    />
                  </FormGroup>
                </div>
              </LocalizationProvider>
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:mt-0 mt-40 items-center md:gap-8 gap-5 add-features">
            <div className="flex flex-col w-full">
            <FormGroup className="w-1/2">
                <FormControlLabel className="flex-row-reverse justify-end add-features-label"
                  control={
                    <Checkbox
                      checked={addFeatsChecked}
                      onChange={handleAddFeatsChange}
                      name="additionalFeatures"
                      id="additionalFeatures"
                    />
                  }
                  label="Features"
                />
              </FormGroup>
              <div className="flex">
                {addFeatsChecked && (
                  <div className="features-boxes w-1/2">
                    <FormGroup className="features-checkboxes">
                      <FormControlLabel className=""
                        control={
                          <Checkbox                          
                            checked={!!listingInfo.automaticTransmission}
                            onChange={handleCheckChange}
                            name="automaticTransmission"
                            id="automaticTransmission"
                          />
                        }
                        label="Automatic Transmission"
                      />
                      <FormControlLabel className=""
                        control={
                          <Checkbox
                            checked={!!listingInfo.allWheelDrive}
                            onChange={handleCheckChange}
                            name="allWheelDrive"
                            id="allWheelDrive"
                          />
                        }
                        label="All-Wheel Drive"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!listingInfo.androidAuto}
                            onChange={handleCheckChange}
                            name="androidAuto"
                            id="androidAuto"
                          />
                        }
                        label="Android Auto"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!listingInfo.appleCarPlay}
                            onChange={handleCheckChange}
                            name="appleCarPlay"
                            id="appleCarPlay"
                          />
                        }
                        label="Apple Car Play"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!listingInfo.auxInput}
                            onChange={handleCheckChange}
                            name="auxInput"
                            id="auxInput"
                          />
                        }
                        label="Auxiliary Input"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!listingInfo.backUpCamera}
                            onChange={handleCheckChange}
                            name="backUpCamera"
                            id="backUpCamera"
                          />
                        }
                        label="Backup Camera"
                      />
                    </FormGroup>  
                  </div>             
                )}
                {addFeatsChecked && (
                  <div className="features-boxes w-2/5">
                    <FormGroup className="features-checkboxes" >
                      <FormControlLabel 
                        control={
                          <Checkbox
                            checked={!!listingInfo.bikeRack}
                            onChange={handleCheckChange}
                            name="bikeRack"
                            id="bikeRack"
                          />
                        }
                        label="Bike Rack"
                      />
                      <FormControlLabel 
                        control={
                          <Checkbox
                            checked={!!listingInfo.converTible}
                            onChange={handleCheckChange}
                            name="converTible"
                            id="converTible"
                          />
                        }
                        label="Convertible"
                      />
                      <FormControlLabel 
                        control={
                          <Checkbox
                            checked={!!listingInfo.gps}
                            onChange={handleCheckChange}
                            name="gps"
                            id="gps"
                          />
                        }
                        label="GPS"
                      />
                      <FormControlLabel 
                        control={
                          <Checkbox
                            checked={!!listingInfo.petFriendly}
                            onChange={handleCheckChange}
                            name="petFriendly"
                            id="petFriendly"
                          />
                        }
                        label="Pet Friendly"
                      />
                      <FormControlLabel 
                        control={
                          <Checkbox
                            checked={!!listingInfo.tollPass}
                            onChange={handleCheckChange}
                            name="tollPass"
                            id="tollPass"
                          />
                        }
                        label="Toll Pass"
                      />
                      <FormControlLabel 
                        control={
                          <Checkbox
                            checked={!!listingInfo.usbCharger}
                            onChange={handleCheckChange}
                            name="usbCharger"
                            id="usbCharger"
                          />
                        }
                        label="USB Charger"
                      />
                    </FormGroup>
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