"use client";

import { formatWeekDate } from "@/utils/utils";
import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

import { FaArrowsLeftRight } from "react-icons/fa6";
import { TbArrowRightCircle } from "react-icons/tb";
import StatusChip from "./StatusChip";

interface CardPaginationProps {
  itemsPerPage: number;
  data: any;
}

const CardPagination: React.FC<CardPaginationProps> = ({
  itemsPerPage,
  data
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Logic to calculate the current items to display
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: any = data.slice(indexOfFirstItem, indexOfLastItem);

  console.log(currentItems);
  // Function to change page
  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col">
      {/* Display current items */}
      <div className="grid grid-cols-3 gap-4">
        {currentItems.map((item: any) => (
          <div
            key={item.id}
            className="bg-white rounded shadow-md border border-gray-200"
          >
            <img
              src="/assets/images/testImages/toyotaVios.jpg"
              alt="Car Image"
              className="w-full h-40 object-cover rounded-t"
            />
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-800">
                  {item.car.brand} {item.car.model}
                </h2>
                <StatusChip type={item.status}>{item.status}</StatusChip>
              </div>

              <hr className="my-5" />

              <h1 className="text-lg font-bold mb-3">
                Pickup Start And End Date
              </h1>
              <div className="flex items-center justify-evenly mb-10">
                <div className="flex items-center">
                  <p className="">{formatWeekDate(item.startDate)}</p>
                </div>
                <div className="flex items-center">
                  <TbArrowRightCircle className="mx-5" size="26" />
                </div>
                <div className="flex items-center">
                  <p className="">{formatWeekDate(item.endDate)}</p>
                </div>
              </div>

              <div className="mb-10">
                <h1 className="text-lg font-bold mb-3">Pickup Location</h1>
                <p>
                  J. P. Laurel Avenue (just fronting the Gaisano Mall), Bajada,
                  Davao City, Davao Del Sur
                </p>
              </div>

              <div className="flex items-center gap-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Message Host
                </button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CardPagination */}
      <ul className="flex mt-4">
        {Array.from(
          { length: Math.ceil(data.length / itemsPerPage) },
          (_, i) => (
            <li key={i}>
              <button
                className={`${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "text-blue-500"
                } font-semibold px-4 py-2 mx-1 rounded hover:bg-blue-600 focus:outline-none`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default CardPagination;
