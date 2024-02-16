"use client";

import { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  reviewText: string;
}

const ReviewCard: React.FC = () => {
  const generateRandomName = (): string => {
    const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Williams"];
    return names[Math.floor(Math.random() * names.length)];
  };

  const generateRandomDate = (): string => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 30) + 1;
    const randomHour = Math.floor(Math.random() * 12) + 1;
    const randomMinute = Math.floor(Math.random() * 60);
    const period = Math.random() < 0.5 ? "am" : "pm";

    return `${randomMonth} ${randomDay}, ${new Date().getFullYear()} at ${randomHour}:${String(
      randomMinute
    ).padStart(2, "0")}${period}`;
  };

  const generateRandomRating = (): number => {
    return Math.random() * (5 - 1) + 1;
  };

  const generateRandomReviewText = (): string => {
    // Placeholder Lorem Ipsum text
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  };

  const reviews: Review[] = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: generateRandomName(),
    date: generateRandomDate(),
    rating: generateRandomRating(),
    reviewText: generateRandomReviewText(),
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderStarRating = (rating: number) => {
    const starArray = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      starArray.push(<FaStar key={i} size={16} color="#FFD700" />);
    }

    if (hasHalfStar) {
      starArray.push(<FaStarHalfAlt key="half" size={16} color="#FFD700" />);
    }

    return starArray;
  };

  return (
    <div>
      {currentReviews.map((review) => (
        <div
          key={review.id}
          className="border bg-white rounded-lg shadow-md border border-gray-200 mt-5 relative pl-6 pr-6"
        >
          <div className="flex items-center mb-2 p-2 mt-5">
            {/* Empty Avatar */}
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-2"></div>

            {/* Random Name and Date */}
            <div>
              <h1 className="font-semibold">{review.name}</h1>
              <p className="text-gray-600">{review.date}</p>
            </div>
            <div className="flex items-center ml-auto">
              {/* Star Rating */}
              <div className="flex items-center mb-2 p-2">
                <div className="flex items-center">
                  {renderStarRating(review.rating)}
                </div>
              </div>
            </div>
          </div>

          {/* Review Text (Lorem Ipsum) */}
          <div className="mb-5 p-2">
            <p className="text-gray-700">{review.reviewText}</p>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(reviews.length / reviewsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`bg-yellow-500 text-black p-1 mx-1 mb-3 w-8 ${
                currentPage === index + 1 ? "font-bold" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
