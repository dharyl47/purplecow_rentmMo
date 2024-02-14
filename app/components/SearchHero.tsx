"use client";
import React, { useEffect, useState } from "react";
import { ButtonFillRoundedSearch, ButtonFillRounded } from "./Buttons";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Button,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";

import {
  SearchFormData,
  useServiceCarContext,
} from "../context/ServiceCarContext";

const theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: "Messina Sans",
  },
  palette: {
    text: {
      secondary: "#c2c2c2",
    },
  },
});

export interface SearchHeroProps {
  onFindRide: (searchFormData: SearchFormData) => void;
}

// export interface FormData {
//   location: string;
//   startDate: Date | null;
//   startTime: string;
//   endDate: Date | null;
//   endTime: string;
// }

const SearchHero: React.FC<SearchHeroProps> = ({ onFindRide }) => {
  // const router = useRouter();

  const { searchFormData, setSearchFormData, searchLoading, setSearchLoading } =
    useServiceCarContext();

  // const [formData, setFormData] = useState<FormData>({
  //   location: "",
  //   startDate: null,
  //   startTime: "",
  //   endDate: null,
  //   endTime: "",
  // });

  // useEffect(() => {
  //   // setFormData({
  //   //   location: city,
  //   //   startDate: carAvailability?.startDate || null,
  //   //   startTime: "",
  //   //   endDate: carAvailability?.endDate || null,
  //   //   endTime: "",
  //   // });
  //   // }, [carAvailability, city]);
  // }, []);

  const handleFindRide = async () => {
    // Pass the form data to the parent component or any other callback
    await setSearchLoading(true);
    onFindRide(searchFormData);
  };
  // const SearchHero = () => {

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="flex justify-center hero-searchbox">
          <div className="bg-white shadow-searchbox w-fit rounded-full content-center items-center p-2 pl-4 justify-evenly self-center xl:flex hidden ">
            {/* Location */}
            <div className="flex flex-row justify-start items-center">
              <FormControl variant="outlined" sx={{ ml: 2 }}>
                <InputLabel htmlFor="location">Location</InputLabel>
                <OutlinedInput
                  label="Location"
                  id="location"
                  type="text"
                  value={searchFormData.location}
                  onChange={(e) =>
                    setSearchFormData({
                      ...searchFormData,
                      location: e.target.value,
                    })
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
                  value={searchFormData.startDate}
                  onChange={(date) =>
                    setSearchFormData({ ...searchFormData, startDate: date })
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
                value={searchFormData.endDate}
                onChange={(date) =>
                  setSearchFormData({ ...searchFormData, endDate: date })
                }
              />
            </div>
            <div className="flex self-end ml-4">
              {/* <ButtonFillRoundedSearch
                text="Find a ride"
                onClick={handleFindRide}
              /> */}
              <button
                className="text-black rounded-full w-44 h-16 bg-yellow-300 font-bold text-xl shadow-md hover:shadow-buttonbox transition"
                onClick={handleFindRide}
                disabled={searchLoading}
              >
                {searchLoading ? (
                  <CircularProgress style={{ color: "#fff" }} size={24} />
                ) : (
                  "Find a ride"
                )}
              </button>
            </div>
          </div>

          {/* Mobile View */}

          <div className="h-full w-full flex-col xl:hidden mx-5  bg-white p-3 rounded-lg">
            {/* Location */}
            <div className="mb-5">
              <FormControl variant="outlined" className="w-full">
                <InputLabel htmlFor="location">Location</InputLabel>
                <OutlinedInput
                  label="Location"
                  id="location"
                  type="text"
                  value={searchFormData.location}
                  onChange={(e) =>
                    setSearchFormData({
                      ...searchFormData,
                      location: e.target.value,
                    })
                  }
                />
              </FormControl>
            </div>

            <div className="flex flex-row gap-2">
              {/* Start Trip */}
              <div className="mb-5 w-1/2">
                <DateTimePicker
                  className="w-full"
                  label="Start Trip"
                  slotProps={{ textField: { variant: "outlined" } }}
                  value={searchFormData.startDate}
                  onChange={(date) =>
                    setSearchFormData({ ...searchFormData, startDate: date })
                  }
                />
              </div>
              {/* End Trip */}
              <div className="mb-5 w-1/2">
                <DateTimePicker
                  label="End Trip"
                  className="w-full"
                  slotProps={{ textField: { variant: "outlined" } }}
                  value={searchFormData.endDate}
                  onChange={(date) =>
                    setSearchFormData({ ...searchFormData, endDate: date })
                  }
                />
              </div>
            </div>

            <div className="text-right">
              <button
                className="p-2 font-bold text-black rounded-md bg-yellow-300 transition"
                onClick={handleFindRide}
                disabled={searchLoading}
              >
                {searchLoading ? (
                  <CircularProgress style={{ color: "#fff" }} size={24} />
                ) : (
                  "Find a ride"
                )}
              </button>
            </div>
          </div>

          {/* <div className="flex-col xl:hidden w-full min-w-fit max-w-sm h-fit bg-white mx-6 md:p-10 p-6 rounded-lg shadow-searchbox ">
            <div className="flex flex-col w-full items-start gap-3 search-loc">
              <label
                htmlFor="input-location"
                className="text-black font-bold text-sm"
              >
                Location
              </label>
              <div className="flex w-full">
                <img className="h-6" src="../assets/logo/pin-loc.png"></img>
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
            <span className="flex w-full h-[2px] bg-dark400 rounded-full my-6 shadow-searchbox-span"></span>
            <div className="flex flex-col justify-start items-start w-full gap-3 search-startrp">
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
                    setSearchFormData({
                      ...searchFormData,
                      startTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <span className="flex w-full h-[2px] bg-dark400 rounded-full my-6 shadow-searchbox-span"></span>
            <div className="flex flex-col justify-start items-start w-full gap-3 search-endtrp">
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
                    setSearchFormData({
                      ...searchFormData,
                      endTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex justify-center w-full md:mt-10 mt-6">
              <ButtonFillRoundedSearch text="Find a ride" />
            </div>
          </div> */}
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default SearchHero;
