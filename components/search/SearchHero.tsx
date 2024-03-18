import React from "react";

// MUI Datepicker
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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

// MUI Inputs
import {
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  CircularProgress
} from "@mui/material";

// Icons
import { HiLocationMarker } from "react-icons/hi";

// useContext
import { useServiceCarContext } from "../../contexts/ServiceCarContext";

// Types
import { SearchFormData } from "@/types/searchCar";

export interface SearchHeroProps {
  onFindRide: (searchFormData: SearchFormData) => void;
}

const SearchHero: React.FC<SearchHeroProps> = ({ onFindRide }) => {
  const { searchFormData, setSearchFormData, searchLoading, setSearchLoading } =
    useServiceCarContext();

  const handleFindRide = async () => {
    await setSearchLoading(true);
    onFindRide(searchFormData);
  };

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
                  onChange={e =>
                    setSearchFormData({
                      ...searchFormData,
                      location: e.target.value
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
                  onChange={date =>
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
                onChange={date =>
                  setSearchFormData({ ...searchFormData, endDate: date })
                }
              />
            </div>
            <div className="flex self-end ml-4">
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
                  onChange={e =>
                    setSearchFormData({
                      ...searchFormData,
                      location: e.target.value
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
                  onChange={date =>
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
                  onChange={date =>
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
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default SearchHero;
