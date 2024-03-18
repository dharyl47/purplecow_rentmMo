// React
import { useRouter } from "next/navigation";
import React, { useMemo, useState, useEffect } from "react";

// Third Party Components
import { ICar } from "@/types/types";
import { calculateDateDifference } from "@/utils/utils";
import axios from "axios";
import TripBookingForm from "../forms/TripBookingForm";

const CarBookingCard: React.FC<ICar> = ({ price, carId }: any) => {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [startTripDate, setStartTripDate] = useState<Date>(new Date());
  const [endTripDate, setEndTripDate] = useState<Date>(new Date());

  const [termsOfUse, setTermsOfUse] = useState(false);

  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/bookings");

        if (!response.data) {
          throw new Error("Failed to fetch data");
        }

        setBookingData(response.data.bookings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const computedValue = useMemo(() => {
    const daysDifference = calculateDateDifference(startTripDate, endTripDate);
    return daysDifference;
  }, [startTripDate, endTripDate]);

  const handleCheckoutRide = () => {
    if (
      location &&
      startTripDate &&
      endTripDate &&
      termsOfUse &&
      endTripDate >= startTripDate // Check if end date is greater than or equal to start date
    ) {
      const data = {
        location,
        startTripDate,
        endTripDate,
        carId,
        totalPrice: price * computedValue + 250
      };
      const bookingDetails = encodeURIComponent(JSON.stringify(data));

      router.push(`/checkout?bookingDetails=${bookingDetails}`);
    } else {
      alert(
        "Please fill in all required fields and ensure end date is not greater than start date."
      );
    }
  };

  const handleCheckboxChange = (event: any) => {
    setTermsOfUse(event.target.checked);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const handleStartTripDateChange = (date: Date) => {
    setStartTripDate(date);
  };

  const handleEndTripDateChange = (date: Date) => {
    setEndTripDate(date);
  };

  return (
    <div className="grid-item w-full  bg-white rounded-lg shadow-md border border-gray-200 py-10 lg:px-10 md:px-10 px-7">
      {/* <h1 className="text-2xl font-bold mb-6 underline underline-offset-2">
        Book Information
      </h1> */}
      <div>
        <TripBookingForm
          bookingData={bookingData}
          onLocationChange={handleLocationChange}
          onStartTripDateChange={handleStartTripDateChange}
          onEndTripDateChange={handleEndTripDateChange}
        />
      </div>

      <hr className="my-7" />

      <h1 className="text-2xl font-bold mb-6 underline underline-offset-2">
        Payment
      </h1>

      <div className="grid grid-cols-2 gap-4 box-with-shadow w-full">
        <div className="flex items-center">
          <div className="ml-2">
            <p className="font">
              ₱ {price} x {computedValue} day
            </p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <div className="ml-2">
            <p className="font-bold">₱ {price * computedValue}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="ml-2">
            <p className="font">Delivery Fee</p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <div className="ml-2">
            <p className="font-bold">₱ 200</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="ml-2">
            <p className="font">Platform Fee</p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <div className="ml-2">
            <p className="font-bold">₱ 50</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="ml-2">
            <p className="font-bold">Total</p>
          </div>
        </div>
        <div className="flex items-center ml-auto">
          <div className="ml-2">
            <p className="font-bold">₱ {price * computedValue + 250}</p>
          </div>
        </div>
      </div>

      <hr className="my-7" />

      {/* <h1 className="text-2xl font-bold mb-6 underline underline-offset-2">
        Payment Method
      </h1> */}

      <div className="grid grid-cols-2 gap-4 box-with-shadow w-full">
        {/* <div className="flex items-center ml-2">
          <input type="radio" id="gcash" name="paymentMethod" value="gcash" />
          <label htmlFor="gcash" className="ml-2">
            Gcash
          </label>
        </div>
        <div className="flex items-center ml-auto">
          <Image
            src={GcashLogo}
            alt="Gcash Logo"
            width={100}
            height={100}
            className="ml-2"
          />
        </div>

        <div className="flex items-center ml-2">
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="creditCard"
          />
          <label htmlFor="creditCard" className="ml-2">
            Credit/Debit Card Payments
          </label>
        </div>
        <div className="flex items-center ml-auto">
          <FaCcVisa className="ml-2" />
          <FaCcMastercard className="ml-2" />
          <FaCcJcb className="ml-2" />
          <FaCcAmex className="ml-2" />
        </div> */}

        {/* <hr className="col-span-2 my-4 border-t" /> */}

        <div className="flex justify-center col-span-2">
          <button
            className="w-full bg-yellow-300 text-black rounded-lg py-3 px-6 font-bold hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300"
            onClick={handleCheckoutRide}
          >
            Book This Ride
          </button>
        </div>
        <div className="flex items-center justify-center col-span-2 mb-5">
          <input
            type="checkbox"
            id="termsCheckbox"
            name="termsCheckbox"
            checked={termsOfUse}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="termsCheckbox" className="ml-2 text-gray-600">
            By submitting this form, I agree to the Terms of Use
          </label>
        </div>
      </div>
    </div>
  );
};

export default CarBookingCard;
