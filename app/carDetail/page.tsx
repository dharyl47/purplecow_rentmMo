"use client";
import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendar } from "react-icons/fa";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import Gallery from "../components/Gallery";
import ReviewCard from "../components/ReviewCard ";

import {
  FaCreditCard,
  FaMoneyBillAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcJcb,
  FaCcAmex,
  FaShare,
  FaHeart,
  FaStar,
  FaUser,
} from "react-icons/fa";
import GcashLogo from "../assets/images/gcash.png"; // Import the Gcash logo image

interface CarAvailability {
  startDate: string;
  endDate: string;
}

interface CarDetails {
  _id: string;
  brand: string;
  carAvailability: CarAvailability;
  carRegistrationNumber: string;
  city: string;
  country: string;
  email: string;
  licensePlateNumber: string;
  mobileNumber: string;
  model: string;
  price: string;
  state: string;
  street: string;
  vehiclePhotos: string[];
  zipCode: string;
  lat: string;
  lon: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CarDetailPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const carParam = searchParams.get("car");
  let carDetails: CarDetails | null = null;

  if (carParam) {
    try {
      // Parse the string into an object
      carDetails = JSON.parse(carParam);
    } catch (error) {
      console.error("Error parsing car details:", error);
    }
  }

    const criteriaData = [
      { name: "Cleanliness", rating: 4.7 },
      { name: "Maintenance", rating: 4.7 },
      { name: "Communication", rating: 4.7 },
      { name: "Convenience", rating: 4.7 },
      { name: "Accuracy", rating: 4.7 },
    ];

  const [startTripDate, setStartTripDate] = React.useState(new Date());
  const [endTripDate, setEndTripDate] = React.useState(new Date());

  // Declare handler functions
  const handleStartTripDateChange = (date: Date) => {
    setStartTripDate(date);
  };

  const handleEndTripDateChange = (date: Date) => {
    setEndTripDate(date);
  };

  return (
    <div style={{ backgroundColor: "#F6F6F6" }}>
      <div className="relative w-full h-96 overflow-hidden">
        {/* Use next/image component for responsive images */}
        <Image
          src={"/assets/images/testImages/testCover.jpg"}
          alt={"car"}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-6 max-w-screen-xl mx-auto">
        {carDetails ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-4">
                  {carDetails.brand} {carDetails.model}
                </h1>
              </div>
              <div className="flex items-center space-x-10 ml-auto">
                {" "}
                {/* Added ml-auto for right alignment */}
                <span className="flex items-center space-x-1">
                  <FaShare size={20} />
                  <span className="ml-1">Share</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FaHeart size={20} />
                  <span className="ml-1">Save</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-1">
                  <FaStar size={24} />{" "}
                  {/* Adjust the size prop for the star icon */}
                </span>
                <span className="text-s font-semibold ml-2">{4.5}</span>
                <span className="text-gray-600 ml-1">({99} reviews)</span>
              </div>
              <div className="flex items-center space-x-10 ml-auto">
                {" "}
                {/* Added ml-auto for right alignment */}
                <span className="flex items-center space-x-1">
                  <span className="ml-1">
                    {" "}
                    <p className="text-gray-600 text-s font-semibold mb-2">
                      Php {carDetails.price}/day
                    </p>
                  </span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid mt-12 grid-row-2 gap-1">
                <div
                  className="box-with-shadow w-full bg-white shadow-md mt-2 relative pl-6"
                  style={{ height: "120px" }}
                >
                  <p className="text-xs text-gray-500 top-0 left-0 mt-5 ml-2">
                    <strong>Owned by</strong>
                  </p>
                  <div className="flex items-center mt-3 ml-2">
                    <div className="rounded-full overflow-hidden h-12 w-12 bg-gray-300">
                      <FaUser className="text-white h-full w-full" />
                    </div>
                    <div className="ml-2">
                      <p className="font-bold">John Smith</p>
                      <p className="text-xs text-gray-500">Joined Dec 2017</p>
                    </div>
                  </div>
                </div>

                {/* The first set of date-time picker */}
                <div className="box-with-shadow w-full bg-white shadow-md mt-2 relative pl-6 pr-6">
                  <p className="text-xs text-gray-500 top-0 left-0 mt-5 ml-2">
                    <strong> Description</strong>
                  </p>
                  <div className="flex items-center mt-3 ml-2 mb-10">
                    <div className="ml-2">
                      <p className="text-xs text-gray-500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex mt-2">
                  {/* First Column */}
                  <div className="box-with-shadow w-1/2 bg-white shadow-md pr-6 p-4">
                    <p className="text-xs text-gray-500 mt-5 ml-2 mb-4">
                      <strong>Features</strong>
                    </p>
                    <ul className="ml-2 mb-10">
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> Automatic
                        Transmission
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> All-wheel
                        drive
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> Android Auto
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> Apple CarPlay
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> AUX input
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> Backup camera
                      </li>
                    </ul>
                  </div>

                  {/* Second Column */}
                  <div className="box-with-shadow w-1/2 bg-white shadow-md pl-6 p-4">
                    <p className="text-xs text-gray-500 mt-5 ml-2 mb-4">
                      <strong>&nbsp;</strong>
                    </p>
                    <ul className="ml-2 mb-10">
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> Bike rack
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> Convertible
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> GPS
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> Pet Friendly
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> Toll pass
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 checkmark">✔</span> USB charger
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="box-with-shadow w-full bg-white shadow-md mt-2 relative">
                  <Gallery />
                </div>
                <div className="w-1/2  pl-6 p-4"></div>
                <div className="w-1/2  pl-6 p-4"></div>
                <div className="w-1/2  pl-6 p-4"></div>
                <div className="w-1/2  pl-6 p-4"></div>
                <div className="w-1/2  pl-6 p-4"></div>
                <div className="w-1/2  pl-6 p-4"></div>
                <div className="w-1/2  pl-6 p-4"></div>
                <div className="w-1/2  pl-6 p-4"></div>
                <div className="w-1/2  pl-6 p-4"></div>
              </div>

              <div className="grid mt-12 grid-row-2 gap-3">
                <CustomDateTimePicker
                  startDate={startTripDate}
                  endDate={endTripDate}
                  handleStartDateChange={handleStartTripDateChange}
                  handleStartTimeChange={handleStartTripDateChange} // Use the same handler for time
                  handleEndDateChange={handleEndTripDateChange}
                  handleEndTimeChange={handleEndTripDateChange} // Use the same handler for time
                />
                <div className="grid grid-cols-2 gap-4 box-with-shadow w-full bg-white shadow-md relative pl-6 pr-6">
                  <div className="flex items-center ml-2 mt-7">
                    <div className="ml-2">
                      <p className="font">₱ 3,000 x 2 days</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-auto mt-7">
                    <div className="ml-2">
                      <p className="font-bold">₱ 6,000</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-2">
                    <div className="ml-2">
                      <p className="font">Delivery Fee</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-2 ml-auto">
                    <div className="ml-2">
                      <p className="font-bold">₱ 200</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-2">
                    <div className="ml-2">
                      <p className="font">Platform Fee</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-2 ml-auto">
                    <div className="ml-2">
                      <p className="font-bold">₱ 50</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-2">
                    <div className="ml-2">
                      <p className="font-bold">Total</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-2 ml-auto">
                    <div className="ml-2">
                      <p className="font-bold">₱ 6,250</p>
                    </div>
                  </div>
                  <hr className="col-span-2 my-4 border-t" />
                  <div className="flex items-center ml-2">
                    <div className="ml-2">
                      <p className="font">
                        <strong>Payment Method</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center ml-2 ml-auto">
                    <div className="ml-2">
                      <p className="font-bold"></p>
                    </div>
                  </div>
                  <div className="flex items-center ml-2">
                    <input
                      type="radio"
                      id="gcash"
                      name="paymentMethod"
                      value="gcash"
                    />
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

                  {/* Payment Method: Credit/Debit Card */}
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
                  </div>
                  <hr className="col-span-2 my-4 border-t" />
                  <div className="flex justify-center col-span-2">
                    <button
                      className="w-full bg-yellow-500 text-black rounded-full py-3 px-6 font-bold hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-700"
                      onClick={() => {
                        // Handle the click event, e.g., initiate credit card payment
                      }}
                    >
                      Book This Ride
                    </button>
                  </div>
                  <div className="flex items-center justify-center col-span-2 mb-5">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      name="termsCheckbox"
                    />
                    <label
                      htmlFor="termsCheckbox"
                      className="ml-2 text-gray-600"
                    >
                      By submitting this form, I agree to the Terms of Use
                    </label>
                  </div>
                </div>
                <div className="box-with-shadow w-full bg-white shadow-md mt-2 relative pl-6 pr-6">
                  <div className="flex items-center mb-2 p-2 mt-5">
                    <span className="text-yellow-500 mr-1">
                      <FaStar size={16} />{" "}
                      {/* Adjust the size prop for the star icon */}
                    </span>
                    <span className="text-s font-semibold ml-2">{4.5}</span>
                    <span className="text-gray-600 ml-1">({99} reviews)</span>
                  </div>
                  {criteriaData.map((criteria, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-1"
                    >
                      <div>
                        <span>{criteria.name}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <span className="text-s font-semibold ml-2">
                            {criteria.rating}
                          </span>
                        </div>
                        <div className="ml-4">
                          {/* Progress Bar for Rating */}
                          <div className="bg-gray-300 h-3 w-24 rounded">
                            <div
                              className="bg-yellow-500 h-full rounded"
                              style={{
                                width: `${(criteria.rating / 5) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr className="col-span-2 my-4 border-t" />
                  <ReviewCard />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default CarDetailPage;
