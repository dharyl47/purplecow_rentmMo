"use client";
import React, { useEffect, useRef } from "react";
import { ButtonFillRoundedSearch, ButtonFillRounded } from "../common/Buttons";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { BsX } from "react-icons/bs";

type SearchHeroMobProps = {
  isvisible: boolean;
  onClose: () => void;
};

const theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: "Messina Sans"
  },
  palette: {
    text: {
      secondary: "#c2c2c2"
    }
  }
});

const SearchHeroModal: React.FC<SearchHeroMobProps> = ({
  isvisible,
  onClose
}) => {
  if (!isvisible) return null;

  return (
    <div className="searchMob fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10">
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="flex justify-center hero-searchbox-mod">
            <div className="bg-white shadow-searchbox-mod w-fit rounded-full content-center items-center p-2 pl-4 justify-evenly self-center xl:flex hidden ">
              {/* Location */}
              <div className="flex flex-row justify-start items-center search-loc-mod">
                <FormControl variant="outlined" sx={{ ml: 2 }}>
                  <InputLabel htmlFor="location">Location</InputLabel>
                  <OutlinedInput
                    label="Location"
                    id="location"
                    type="text"
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
              <div className="flex flex-col justify-start items-start search-startrp-mod">
                <div className="flex gap-2">
                  <DateTimePicker
                    label="Start Trip"
                    slotProps={{ textField: { variant: "outlined" } }}
                  />
                </div>
              </div>
              <span className=" w-[1px] h-14 bg-dark300 mx-2 rounded-full"></span>
              {/* End Trip */}
              <div className="flex flex-col justify-start items-start search-endtrp-mod">
                <DateTimePicker
                  label="End Trip"
                  slotProps={{ textField: { variant: "outlined" } }}
                />
              </div>
              <div className="flex self-end ml-4 search-butn">
                <ButtonFillRoundedSearch text="Find a ride" />
              </div>
            </div>
            <div className="flex-col xl:hidden w-full min-w-fit max-w-sm h-fit bg-white mx-6 md:p-10 p-6 rounded-lg shadow-searchbox-mod ">
              {/* Location */}
              <div className="flex flex-col w-full items-start gap-3">
                <label
                  htmlFor="input-location"
                  className="text-black font-bold text-sm"
                >
                  Location
                </label>
                <div className="flex w-full">
                  <img
                    className="h-6"
                    src="@/public/assets/logo/pin-loc.png"
                  ></img>
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
                  />
                </div>
              </div>
              <div className="flex justify-center w-full md:mt-10 mt-6">
                <ButtonFillRoundedSearch text="Find a ride" />
              </div>
            </div>
            <button
              className="text-white text-xl search-modal-close font-extrabold flex"
              onClick={() => onClose()}
            >
              <BsX className="text-3xl stroke-1" />
            </button>
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default SearchHeroModal;
