import React, { useState, useEffect } from "react";
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import ImageUploader from "../components/ImageUploader";
import { ICar } from "../types/types";

type Props = {
  handleChange: (e: any) => void;
  1: (
    b: string | undefined,
    m: string | undefined,
    lp: string | undefined,
    cr: string | undefined,
    dc: string | undefined
  ) => void;
  listingInfo: ICar;
};

const ListingInfoForm = ({ handleChange, listingInfo }: Props) => {
  const [checked, setChecked] = useState(false);

  //handle date change
  const handleStartDateChange = (date: Date | null) => {
    handleChange({
      target: {
        name: "startDate",
        value: date,
      },
    });
  };
  const handleEndDateChange = (date: Date | null) => {
    handleChange({
      target: {
        name: "endDate",
        value: date,
      },
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    if (!event.target.checked) {
      handleEndDateChange(null);
      handleStartDateChange(listingInfo.carAvailability.startDate);
    } else {
      handleEndDateChange(listingInfo.carAvailability.endDate);
      handleStartDateChange(listingInfo.carAvailability.startDate);
    }

    handleChange(event);
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

  const [addFeatsChecked, setAddFeatsChecked] = useState(false);
  const handleAddFeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddFeatsChecked(event.target.checked);
  };

  const handleCheckFeature = () => {
    if (listingInfo.features) {
      const featuresCheckBox = Object.values(listingInfo.features).some(
        (value) => !!value
      );

      setAddFeatsChecked(featuresCheckBox);
    }
  };

  // useEffect add by John Rey
  useEffect(() => {
    // List of car details to update
    const carDetailsToUpdate = [
      "brand",
      "model",
      "licensePlateNumber",
      "carRegistrationNumber",
    ];

    // Update only the necessary car details
    carDetailsToUpdate.forEach((detail) =>
      handleChangeUpdates(detail, listingInfo[detail])
    );

    // Note: Uncomment and modify the above lines based on your actual requirements

    // Show features if car has checked features
    handleCheckFeature();
    setChecked(listingInfo.carAvailability.checked);
  }, []);

  return (
    <>
      <div className="flex md:flex-row flex-col md:mt-0 mt-5 items-center md:gap-8 gap-5">
        <div className="flex flex-col w-full">
          <label className="mb-3 text-sm leading-none text-dark900">
            Car Brand
          </label>
          <TextField
            variant="outlined"
            size="small"
            onChange={handleChange}
            value={listingInfo.brand}
            name="brand"
            id="brand"
            type="textbox"
            placeholder="Enter car brand"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-3 text-sm leading-none text-dark900">
            Car Model
          </label>
          <TextField
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
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
                onChange={(date) =>
                  handleStartDateChange(date ? new Date(date) : null)
                }
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
                onChange={(date) =>
                  handleEndDateChange(date ? new Date(date) : null)
                }
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
                  label="Always Available"
                  labelPlacement="end"
                />
              </FormGroup>
            </div>
          </LocalizationProvider>
        </div>
      </div>

      <div className="flex mt-2 flex-col w-full">
        <label className="mb-2 text-sm leading-none text-dark900">
          Car Description
        </label>
        <TextareaAutosize
          style={{
            padding: "8.5px 14px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: "transparent",
          }}
          minRows={3}
          placeholder="Enter Car Description"
          onChange={handleChange}
          value={listingInfo.description}
          name="description"
          id="description"
        />
      </div>

      <div className="flex md:flex-row flex-col md:mt-0 mt-40 items-center md:gap-8 gap-5 add-features">
        <div className="flex flex-col w-full">
          <FormGroup className="w-1/2">
            <FormControlLabel
              className="flex-row-reverse justify-end add-features-label"
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
                  <FormControlLabel
                    className=""
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.automaticTransmission}
                        onChange={handleChange}
                        name="automaticTransmission"
                        id="automaticTransmission"
                      />
                    }
                    label="Automatic Transmission"
                  />
                  <FormControlLabel
                    className=""
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.allWheelDrive}
                        onChange={handleChange}
                        name="allWheelDrive"
                        id="allWheelDrive"
                      />
                    }
                    label="All-Wheel Drive"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.androidAuto}
                        onChange={handleChange}
                        name="androidAuto"
                        id="androidAuto"
                      />
                    }
                    label="Android Auto"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.appleCarPlay}
                        onChange={handleChange}
                        name="appleCarPlay"
                        id="appleCarPlay"
                      />
                    }
                    label="Apple Car Play"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.auxInput}
                        onChange={handleChange}
                        name="auxInput"
                        id="auxInput"
                      />
                    }
                    label="Auxiliary Input"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.backUpCamera}
                        onChange={handleChange}
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
                <FormGroup className="features-checkboxes">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.bikeRack}
                        onChange={handleChange}
                        name="bikeRack"
                        id="bikeRack"
                      />
                    }
                    label="Bike Rack"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.converTible}
                        onChange={handleChange}
                        name="converTible"
                        id="converTible"
                      />
                    }
                    label="Convertible"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.gps}
                        onChange={handleChange}
                        name="gps"
                        id="gps"
                      />
                    }
                    label="GPS"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.petFriendly}
                        onChange={handleChange}
                        name="petFriendly"
                        id="petFriendly"
                        data-input-type="feature"
                      />
                    }
                    label="Pet Friendly"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.tollPass}
                        onChange={handleChange}
                        name="tollPass"
                        id="tollPass"
                      />
                    }
                    label="Toll Pass"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!listingInfo.features.usbCharger}
                        onChange={handleChange}
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
