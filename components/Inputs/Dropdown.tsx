import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
  colorClass: string; // Add colorClass property to Option interface
}

interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  onClick: () => void;
  defaultSelected?: Option;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  onClick,
  defaultSelected
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    defaultSelected || null
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: Option) => {
    const res: any = onSelect(option);

    if (res !== false) {
      setSelectedOption(option);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    setSelectedOption(defaultSelected || null);
  }, [defaultSelected]);

  return (
    <div className="relative">
      <button
        className={`${
          selectedOption?.colorClass
            ? `${selectedOption?.colorClass} text-white`
            : "bg-gray-300 text-gray-700 "
        }  font-semibold py-2 px-4 rounded  inline-flex items-center`}
        onClick={() => {
          onClick(); // Call the onClick function
          setIsOpen(!isOpen); // Toggle isOpen state
        }}
      >
        {selectedOption ? (
          <span>{selectedOption.label}</span>
        ) : (
          <span>Select an option</span>
        )}
        <svg
          className={`w-4 h-4 ml-2 ${isOpen ? "transform rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-10">
          {options.map(option => (
            <li
              key={option.value}
              className="cursor-pointer py-2 px-4 hover:bg-gray-200"
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
