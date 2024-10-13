"use client";
import React, { useState, useEffect } from "react";
import Wave from "react-wavify";
import Image from "next/image";
import Waterfall from "@/public/waterfall.svg";

// Main FillTheTank Component
export const WaterContainer = ({ completed, total }) => {
  const baselinePercentage = 25; // Set baseline to 25%
  const calculatedPercentage = (completed / total) * 75; // Calculate relative to 75% max fill above baseline
  const percentage = baselinePercentage + calculatedPercentage; // Final percentage including baseline

  const [textColor, setTextColor] = useState("text-gray-700"); // Default color for text

  useEffect(() => {
    // Change text color when the wave level reaches it
    if (percentage >= 50) {
      setTextColor("text-white transition-colors duration-500");
    } else {
      setTextColor("text-gray-700 transition-colors duration-500");
    }
  }, [percentage]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-56 h-64 bg-gray-200 rounded-2xl shadow-lg overflow-visible flex flex-col items-center justify-end">
        {/* Waterfall SVG positioned outside and above the box */}
        <div
          className="absolute -top-10 w-40 h-40 z-10"
          style={{ overflow: "visible" }}
        >
          <Image src={Waterfall} alt="Waterfall Icon" layout="responsive" />
        </div>

        {/* Wave Background with preserved rounded corners */}
        <div className="absolute bottom-0 w-full h-full rounded-b-2xl overflow-hidden flex items-end z-0">
          <Wave
            fill="url(#gradient)"
            paused={false}
            options={{
              height: 20,
              amplitude: 15,
              speed: 0.15,
              points: 3,
            }}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: `${percentage}%`,
              transition: "height 1s ease", // Smooth wave fill animation
            }}
          />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "rgb(44, 186, 223)", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#466ED4", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Label and Counter */}
        <div className="relative z-20 mb-4 text-center">
          <p className={`${textColor} font-semibold text-lg`}>Fill the tank</p>
          <div className="mt-2 bg-white text-[#466ED4] font-bold text-xl py-2 px-4 rounded-full shadow-md transition-colors duration-500">
            {completed}/{total}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper Component to manage completed state
const FillTheTankWrapper = () => {
  const total = 5;
  const [completed, setCompleted] = useState(0); // Start with 0/5

  const incrementCompleted = () => {
    setCompleted((prev) => (prev < total ? prev + 1 : total));
  };

  return (
    <>
      <FillTheTank completed={completed} total={total} />
      <button
        onClick={incrementCompleted}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Add Water
      </button>
    </>
  );
};

export default FillTheTankWrapper;
