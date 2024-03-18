import React, { useState } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";

interface TripBookingFormProps {
  bookingData: any[];
  onLocationChange: (location: string) => void;
  onStartTripDateChange: (date: Date) => void;
  onEndTripDateChange: (date: Date) => void;
}

const TripBookingForm: React.FC<TripBookingFormProps> = ({
  bookingData,
  onLocationChange,
  onStartTripDateChange,
  onEndTripDateChange
}) => {
  const [location, setLocation] = useState<string>("");
  const [startTripDate, setStartTripDate] = useState<any>(null);
  const [endTripDate, setEndTripDate] = useState<any>(null);

  const handleStartTripDateChange = (date: Date | null) => {
    if (date && (!endTripDate || date <= endTripDate)) {
      setStartTripDate(date);
      onStartTripDateChange(date);
    } else {
      alert("Please select a valid start date that is not after the end date.");
      setStartTripDate(null);
    }
  };

  const handleEndTripDateChange = (date: Date | null) => {
    if (date && (!startTripDate || date >= startTripDate)) {
      setEndTripDate(date);
      onEndTripDateChange(date);
    } else {
      alert(
        "Please select a valid end date that is not before the start date."
      );
      setEndTripDate(null);
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocation(value);
    onLocationChange(value);
  };

  const shouldDisableDate = (date: Date) => {
    const isDisabled = bookingData.some(booking => {
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);

      const startTime = startDate.getTime();
      const endTime = endDate.getTime();
      const targetTime = date.getTime();

      return (
        booking.status === "confirmed" &&
        targetTime >= startTime - 24 * 60 * 60 * 1000 &&
        targetTime <= endTime
      );
    });

    return isDisabled;
  };

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-col mb-6">
            <label className="mb-2 font-semibold" htmlFor="outlined-basic">
              Pickup & Return Location
            </label>

            <TextField
              id="outlined-basic"
              label="Pickup & Return Location"
              variant="outlined"
              value={location}
              onChange={handleLocationChange}
              size="small"
            />
          </div>

          <div className="flex flex-col mb-6">
            <label className="mb-2 font-semibold" htmlFor="startTrip">
              Start Trip
            </label>

            <DateTimePicker
              label="Start Trip"
              slotProps={{ textField: { size: "small" } }}
              className="w-full"
              value={startTripDate}
              onChange={handleStartTripDateChange}
              disablePast
              shouldDisableDate={shouldDisableDate}
              closeOnSelect={true}
              disableHighlightToday
            />
          </div>

          <div className="flex flex-col mb-6">
            <label className="mb-2 font-semibold" htmlFor="endTrip">
              End Trip
            </label>

            <DateTimePicker
              label="End Trip"
              slotProps={{ textField: { size: "small" } }}
              className="w-full"
              value={endTripDate}
              onChange={handleEndTripDateChange}
              disablePast
              shouldDisableDate={shouldDisableDate}
              closeOnSelect={true}
              disableHighlightToday
            />
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default TripBookingForm;
