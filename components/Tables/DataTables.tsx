"use client";

import React, { useState } from "react";

interface Header {
  title: string;
  key: string;
  icon?: JSX.Element; // Optional icon
}

interface DataRow {
  [key: string]: any; // Dynamic keys with any value
}

interface DataTableProps {
  headers: Header[];
  data: DataRow[];
  itemsPerPage?: number;
}

const DataTable: React.FC<DataTableProps> = ({
  headers,
  data,
  itemsPerPage = 10
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Pagination */}
      <div className="mt-4 flex justify-end">
        {/* Previous button */}
        <button
          onClick={handlePrevPage}
          className={`mx-1 px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-700 cursor-not-allowed"
              : "bg-gray-200 text-gray-700"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {/* Page buttons */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        {/* Next button */}
        <button
          onClick={handleNextPage}
          className={`mx-1 px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-700 cursor-not-allowed"
              : "bg-gray-200 text-gray-700"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        {/* Table header */}
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  {header.title}
                  {header.icon && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      {header.icon}
                    </svg>
                  )}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentItems.length !== 0 ? (
            currentItems.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-4 border-b border-blue-gray-50 text-sm"
                  >
                    {row[header.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="p-4 border-b antialiased border-blue-gray-50 text-sm text-center leading-none"
                colSpan={headers.length}
              >
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
