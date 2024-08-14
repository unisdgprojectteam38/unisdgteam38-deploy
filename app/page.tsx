"use client";
import React, { useState } from "react";
import { Bell, User, Menu, Check, Lock, PlayCircle } from "lucide-react";

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const modules = [
    {
      title: "Introduction to Zero Hunger",
      subhead: "Understanding the issue",
      status: "completed",
      locked: false,
    },
    {
      title: "Global Impact",
      subhead: "Case studies and statistics",
      status: "in-progress",
      locked: false,
    },
    {
      title: "Solutions",
      subhead: "Innovative approaches to ending hunger",
      status: "not-started",
      locked: false,
    },
    {
      title: "Role of Technology",
      subhead: "Leveraging tech for food security",
      status: "not-started",
      locked: true,
    },
    {
      title: "Local Action",
      subhead: "How communities are fighting hunger",
      status: "not-started",
      locked: true,
    },
    {
      title: "Quiz: Zero Hunger",
      subhead: "Test your knowledge",
      status: "not-started",
      locked: true,
    },
  ];

  const getStatusIcon = (status: any) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <PlayCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

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
                  index === 0
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
            Keep up to date with the latest news on Sustainable Development
            Goals. Check out the latest articles, events, and updates related to
            the SDGs!
          </p>
        </div>

        {/* SDG Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">My Progress</h1>
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
            {["Introduction", "Clean Water"].map((text, index) => (
              <div
                key={index}
                className={`text-sm px-2 ${
                  index === 2 ? "text-blue-500 font-medium" : "text-gray-400"
                }`}
              >
                {text}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-full w-1/2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
        {/* Current Module */}
        {/* Current Module */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Current Module: Goal 2 - Zero Hunger
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  module.locked ? "opacity-75" : ""
                }`}
              >
                <div className="p-4 flex items-start">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      module.status === "completed"
                        ? "bg-green-100 text-green-500"
                        : module.status === "in-progress"
                        ? "bg-blue-100 text-blue-500"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {module.title.charAt(0)}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{module.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {module.subhead}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    {getStatusIcon(module.status)}
                  </div>
                </div>
                <div className="px-4 pb-3 flex justify-end">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          module.status === "completed"
                            ? "bg-green-500"
                            : module.status === "in-progress" && i === 0
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    ))}
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
