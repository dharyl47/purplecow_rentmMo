import React, { ReactNode } from "react";

interface StatusChipProps {
  onClick?: () => void;
  children: ReactNode;
  type: String;
}

const StatusChip: React.FC<StatusChipProps> = ({ children, onClick, type }) => {
  const getBackgroundColorClass = () => {
    switch (type) {
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-400";
      case "confirmed":
        return "bg-green-500 hover:bg-green-400";
      case "cancelled":
        return "bg-red-500 hover:bg-red-400";
      case "completed":
        return "bg-blue-500 hover:bg-blue-400";
      default:
        return "bg-gray-500 hover:bg-gray-400";
    }
  };

  return (
    <button
      className={`capitalize text-white font-bold py-2 px-4 rounded ${getBackgroundColorClass()}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default StatusChip;
