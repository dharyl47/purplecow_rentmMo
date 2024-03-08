// React
import React from "react";

// Icons
import { FaStar } from "react-icons/fa6";

// Custom Components
import ReviewCard from "../ReviewCard";

const CarCustomerReviewCard = () => {
  const criteriaData = [
    { name: "Cleanliness", rating: 4.7 },
    { name: "Maintenance", rating: 4.7 },
    { name: "Communication", rating: 4.7 },
    { name: "Convenience", rating: 4.7 },
    { name: "Accuracy", rating: 4.7 },
  ];

  return (
    <div className="w-full  bg-white rounded-lg shadow-md border border-gray-200 py-10 lg:px-10 md:px-10 px-7">
      <div className="w-full items-center justify-between flex flex-row  mb-10">
        <h1 className="text-2xl font-bold underline underline-offset-2">
          Customer Reviews
        </h1>

        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">
            <FaStar size={30} /> {/* Adjust the size prop for the star icon */}
          </span>
          <span className="text-s font-semibold ml-1">{4.5}</span>
          <span className="text-gray-600 ml-1">({99} reviews)</span>
        </div>
      </div>

      {criteriaData.map((criteria, index) => (
        <div key={index} className="flex justify-between items-center p-1 mb-2">
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

      <hr className="my-7" />

      <ReviewCard />
    </div>
  );
};

export default CarCustomerReviewCard;
