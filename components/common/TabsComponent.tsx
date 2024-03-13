"use client";

import { useState } from "react";

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabComponentProps {
  tabs: Tab[];
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex items-center justify-end gap-5">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`
              ${
                activeTab === index
                  ? "bg-yellow-300 text-black"
                  : "bg-black text-white"
              }
              font-bold	
              rounded-md py-2 px-4 
            `}
            // className={`${
            //   activeTab === index ? "border-b-2 border-blue-500" : ""
            // } bg-white inline-flex items-center py-2 px-4 border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-10">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabComponent;
