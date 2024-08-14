"use client";
import React, { useState } from "react";
import { Bell, User, ChevronRight, Menu } from "lucide-react";

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100 md:flex-row">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 fixed md:static inset-y-0 left-0 z-10 w-64 bg-white shadow-md overflow-y-auto md:block`}
      >
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-6 w-6" />
            <span className="font-semibold">Profile</span>
          </div>
          <nav>
            {[
              "Dashboard",
              "SDG",
              "Achievements",
              "Ask for Help",
              "Resources",
              "Videos",
              "Profile settings",
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className={`block py-2 px-4 rounded ${
                  index === 1
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 md:ml-0">
        {/* Daily News */}
        <div className="bg-gray-700 text-white p-4 mb-6 rounded-lg">
          <h2 className="font-bold mb-2 flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Daily News
          </h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur. Nulla venenatis adipiscing
            lorem feugiat viverra. Nulla eu gravida et massa neque turpis
            aliquet nisl natoque. Mauris justo nec dui vitae faucibus pretium
            amet nunc. Turpis amet augue commodo arcu at dictum sed malesuada.
          </p>
        </div>

        {/* SDG Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">SDG</h1>
          <div className="bg-indigo-900 p-4 rounded-lg">
            <img
              src="./island.svg"
              alt="SDG Isometric Illustration"
              className="w-full object-contain rounded"
              style={{ minHeight: "200px", maxHeight: "300px" }}
            />
          </div>
        </div>

        {/* Module Progress */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex justify-between items-center mb-2 min-w-max">
            {["Module", "Module", "Module", "Module", "Module"].map(
              (text, index) => (
                <div
                  key={index}
                  className={`text-sm px-2 ${
                    index === 2 ? "text-blue-500 font-medium" : "text-gray-400"
                  }`}
                >
                  {text}
                </div>
              )
            )}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-full w-1/2 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Current Module */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Current Module</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:bg-gray-100 cursor-pointer"
              >
                <div className="p-4 bg-blue-50 flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-bold mr-3">
                    A
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">Header</h3>
                    <p className="text-sm text-gray-500">Subhead</p>
                  </div>
                </div>
                <div className="p-2 bg-gray-100 flex justify-end">
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
