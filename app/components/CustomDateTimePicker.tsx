// React
import React, { useState } from "react";

// MUI Date Picker
import DatePicker from "react-datepicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

// Icons
import { FaCalendar } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

// Calendar Custom Theme
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

interface DateTimePickerProps {
  label: React.ReactNode; // Change the type to ReactNode
  selectedDate: Date;
  handleDateChange: (date: Date) => void;
  showTimeSelect?: boolean;
  timeOnly?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  selectedDate,
  handleDateChange,
  showTimeSelect = false,
  timeOnly = false,
}) => {
  const dateFormat = timeOnly ? "h:mm aa" : "MM/dd/yyyy h:mm aa";
  const [isDateOpen, setIsDateOpen] = useState(false);

  const handleDateClick = () => {
    setIsDateOpen(!isDateOpen);
  };

  return (
    <div className="flex flex-col items-start pl-4">
      {" "}
      {/* Updated to align labels to the left */}
      <label className="mb-2">{label}</label>
      <div className="relative flex items-center">
        <FaCalendar />
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect}
          showTimeSelectOnly={timeOnly}
          timeIntervals={15}
          timeCaption="Time"
          timeFormat="h:mm aa"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
          open={isDateOpen}
          onClickOutside={() => setIsDateOpen(false)}
        />
        <button
          onClick={handleDateClick}
          className="absolute right-0 h-full p-2"
        >
          <span>&#x25BC;</span>
        </button>
      </div>
    </div>
  );
};

interface CustomDateTimePickerProps {
  startDate: Date;
  endDate: Date;
  handleStartDateChange: (date: Date) => void;
  handleStartTimeChange: (date: Date) => void;
  handleEndDateChange: (date: Date) => void;
  handleEndTimeChange: (date: Date) => void;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleStartTimeChange,
  handleEndDateChange,
  handleEndTimeChange,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div
          className="box-with-shadow w-full bg-white shadow-md mt-2"
          style={{ height: "220px;" }}
        >
          <div className="flex justify-between p-4">
            <div className="w-1/2">
              <DateTimePicker
                label={<strong>Start Trip</strong>}
                selectedDate={startDate}
                handleDateChange={handleStartDateChange}
                showTimeSelect
              />
            </div>
            <div className="w-1/2">
              <DateTimePicker
                label={<strong>End Trip</strong>}
                selectedDate={endDate}
                handleDateChange={handleEndDateChange}
                showTimeSelect
              />
            </div>
          </div>

          <div className="flex-col items-start pl-8 pr-14 pt-3 mb-8">
            <label className="mb-2 font-bold">Pickup & return Location</label>
            <div className="relative flex items-center">
              <FaMapMarkerAlt className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Type your location"
                className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CustomDateTimePicker;
