'use client';
import React, { useEffect, useState } from 'react';
import { ButtonFillRoundedSearch, ButtonFillRounded } from "./Buttons";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HiLocationMarker } from 'react-icons/hi';
import { useRouter } from "next/navigation";


const theme = createTheme({
	typography: {
		fontSize: 16,
		fontFamily: 'Messina Sans',
	},
	palette: {
		text: {
			secondary: '#c2c2c2',
		},
	},
});

export interface SearchHeroProps {
  carAvailability: {
    startDate: Date;
    endDate: Date;
  };
  city: string;
  onFindRide: (formData: FormData) => void;
};

export interface FormData {
  location: string;
  startDate: Date | null;
  startTime: string;
  endDate: Date | null;
  endTime: string;
}

const SearchHero: React.FC<SearchHeroProps> = ({
  carAvailability,
  city,
  onFindRide,
}) => {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    startDate: carAvailability?.startDate || null,
    startTime: '',
    endDate: carAvailability?.endDate || null,
    endTime: '',
  });
  // const router = useRouter();

  useEffect(() => {
    setFormData({
      location: city,
      startDate: carAvailability?.startDate || null,
      startTime: '',
      endDate: carAvailability?.endDate || null,
      endTime: '',
    });
  }, [carAvailability, city]);

  const handleFindRide = () => {
    // Use the captured values from formData as needed
    console.log("Location:", formData.location);
    console.log("Start Date:", formData.startDate);
    console.log("Start Time:", formData.startTime);
    console.log("End Date:", formData.endDate);
    console.log("End Time:", formData.endTime);

    // Pass the form data to the parent component or any other callback
    onFindRide(formData);
  };
// const SearchHero = () => {

	return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="flex justify-center">
          <div className="bg-white shadow-searchbox w-fit rounded-full content-center items-center p-2 pl-4 justify-evenly self-center xl:flex hidden ">
            {/* Location */}
            <div className="flex flex-row justify-start items-center">
              <FormControl variant="outlined" sx={{ ml: 2 }}>
                <InputLabel htmlFor="location">Location</InputLabel>
                <OutlinedInput
                  label="Location"
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <HiLocationMarker />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <span className=" w-[1px] h-14 bg-dark300 mx-2 rounded-full"></span>
            {/* Start Trip */}
            <div className="flex flex-col justify-start items-start">
              <div className="flex gap-2">
                <DateTimePicker
                  label="Start Trip"
                  slotProps={{ textField: { variant: "outlined" } }}
                  value={formData.startDate}
                  onChange={(date) =>
                    setFormData({ ...formData, startDate: date })
                  }
                />
              </div>
            </div>
            <span className=" w-[1px] h-14 bg-dark300 mx-2 rounded-full"></span>
            {/* End Trip */}
            <div className="flex flex-col justify-start items-start">
              <DateTimePicker
                label="End Trip"
                slotProps={{ textField: { variant: "outlined" } }}
                value={formData.endDate}
                  onChange={(date) =>
                    setFormData({ ...formData, endDate: date })
                  }
              />
            </div>
            <div className="flex self-end ml-4">
              <ButtonFillRoundedSearch text="Find a ride" onClick={handleFindRide} />
            </div>
          </div>
          <div className="flex-col xl:hidden w-full min-w-fit max-w-sm h-fit bg-white mx-6 md:p-10 p-6 rounded-lg shadow-searchbox ">
            {/* Location */}
            <div className="flex flex-col w-full items-start gap-3">
              <label
                htmlFor="input-location"
                className="text-black font-bold text-sm"
              >
                Location
              </label>
              <div className="flex w-full">
                <img className="h-6" src="../src/assets/logo/pin-loc.png"></img>
                <div className="flex border-b-2 border-white hover:border-dark200 transition-colors w-full">
                  <input
                    id="input-location"
                    type="search"
                    placeholder="Drop Location"
                    className="text-black bg-transparent focus:outline-none w-full md:text-lg text-base px-2"
                  />
                </div>
              </div>
            </div>
            <span className="flex w-full h-[2px] bg-dark400 rounded-full my-6"></span>
            {/* Start Trip */}
            <div className="flex flex-col justify-start items-start w-full gap-3">
              <label
                htmlFor="input-start-trip"
                className="text-black font-bold text-sm"
              >
                Start Trip
              </label>
              <div className="flex md:flex-row w-full md:gap-16 gap-2 flex-col">
                <input
                  id="input-start-trip"
                  type="date"
                  className="text-black bg-transparent focus:outline-none w-full md:text-lg text-base"
                />
                <input
                  id="input-start-trip-time"
                  type="time"
                  className="text-black bg-transparent focus:outline-none lg:w-5/6 w-full md:text-lg text-base"
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                />
              </div>
            </div>
            <span className="flex w-full h-[2px] bg-dark400 rounded-full my-6"></span>
            {/* End Trip */}
            <div className="flex flex-col justify-start items-start w-full gap-3">
              <label
                htmlFor="input-start-trip"
                className="text-black font-bold text-sm"
              >
                End Trip
              </label>
              <div className="flex flex-col md:flex-row md:gap-16 gap-4 w-full">
                <input
                  id="input-end-trip"
                  type="date"
                  className="text-black bg-transparent focus:outline-none w-full md:text-lg text-base"
                />
                <input
                  id="input-end-trip-time"
                  type="time"
                  className="text-black bg-transparent focus:outline-none lg:w-5/6 w-full md:text-lg text-base"
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-center w-full md:mt-10 mt-6">
              <ButtonFillRoundedSearch text="Find a ride" onClick={handleFindRide} />
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default SearchHero;
