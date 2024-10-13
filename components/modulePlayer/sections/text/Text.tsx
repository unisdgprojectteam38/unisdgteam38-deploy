import React from "react";
import { TextSectionProps } from "@/types/sections"; // Import the Section type

const TextSectionComponent: React.FC<TextSectionProps> = ({ section }) => {
  const { data, onComplete } = section;

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between min-h-[468px]"
      style={{ boxShadow: "rgba(40, 46, 62, 0.12) 0px 4px 16px 0px" }}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-semibold text-[#586380]">
            {section.order_id + ". " + section.title}
          </span>
          <div className="flex items-center">
            <button className="p-1 bg-gray-200 rounded-full mr-2">
              <svg
                className="w-4 h-4 text-[#586380]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828"
                />
              </svg>
            </button>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
              Let's try again
            </span>
          </div>
        </div>
        <p
          className="text-[20px] leading-[32.5px] mb-8 text-[#282e3e]"
          style={{ WebkitFontSmoothing: "antialiased" }}
        >
          {data.content}
        </p>
      </div>

      <button
        onClick={onComplete}
        className="w-full py-3 rounded-md text-lg font-semibold bg-blue-500 text-white hover:bg-blue-600"
      >
        Continue
      </button>
    </div>
  );
};

export default TextSectionComponent;
