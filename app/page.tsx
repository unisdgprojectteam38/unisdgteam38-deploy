"use client";
import React, { useState, useEffect } from "react";
import { Bell, User, Menu, Check, PlayCircle, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import NewsCarousel from "@/components/NewsCarousel";

interface Article {
  img: string;
  title: string;
  description: string;
  href: string;
  url: string;
  urlToImage: string;
}

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchSDGNews = async () => {
      try {
        const response = await fetch('api/news');
        const data = await response.json();
        setArticles(data.articles.slice(0, 10)); // Only take the first 10 articles
      } catch (error) {
      }
    };

    fetchSDGNews();
  }, []);

  const router = useRouter();
  const modules = [
    {
      title: "1. No Poverty",
      subhead: "Understanding the issue",
      status: "not-started",
      locked: true,
    },
    {
      title: "2. Zero Hunger",
      subhead: "Case studies and statistics",
      status: "not-started",
      locked: true,
    },
    {
      title: "3. Good Health and Well-Being",
      subhead: "Innovative approaches to ending hunger",
      status: "not-started",
      locked: true,
    },
    {
      title: "4. Quality Education",
      subhead: "Leveraging tech for food security",
      status: "not-started",
      locked: true,
    },
    {
      title: "5. Gender Equality",
      subhead: "How communities are fighting hunger",
      status: "not-started",
      locked: true,
    },
    {
      title: "6. Clean Water & Sanitation",
      subhead: "Test your knowledge",
      status: "in-progress",
      locked: false,
    },
    {
    title: "7. Affordable And Clean Enery",
    subhead: "Understanding the issue",
    status: "not-started",
    locked: true,
    },
    {
    title: "8. Decent Work And Economic Growth",
    subhead: "Case studies and statistics",
    status: "not-started",
    locked: true,
    },
    {
    title: "9. Industry, Innovation And Infrastructure",
    subhead: "Innovative approaches to ending hunger",
    status: "not-started",
    locked: true,
    },
    {
    title: "10. Reduced Inequalities",
    subhead: "Leveraging tech for food security",
    status: "not-started",
    locked: true,
    },
    {
    title: "11. Sustainable Cities And Communities",
    subhead: "How communities are fighting hunger",
    status: "not-started",
    locked: true,
    },
    {
    title: "12. Responsible Consumption and Production",
    subhead: "Test your knowledge",
    status: "not-started",
    locked: true,
    },
    {
    title: "13. Climation Action",
    subhead: "Case studies and statistics",
    status: "not-started",
    locked: true,
    },
    {
    title: "14. Life Below Water",
    subhead: "Innovative approaches to ending hunger",
    status: "not-started",
    locked: true,
    },
    {
    title: "15. Life on Land",
    subhead: "Leveraging tech for food security",
    status: "not-started",
    locked: true,
    },
    {
    title: "16. Peace, Justice And Strong Institutions",
    subhead: "How communities are fighting hunger",
    status: "not-started",
    locked: true,
    },
    {
    title: "17. Partnerships for the Goals",
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
        style={{ margin: "0", padding: "0" }} // Ensuring no margin or padding
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
      <main className="flex-1 overflow-y-auto p-8 md:ml-0">

        {/* Hero Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4 font-[Poppins]">Sustainable Development Goals</h1>
          <div className="bg-indigo-900 p-4 rounded-lg flex flex-row gap-16">
            {/* <img
              src="./island.svg"
              alt="SDG Isometric Illustration"
              className="w-full object-contain rounded"
              style={{ minHeight: "200px", maxHeight: "300px" }}
            /> */}
           <div><img
              src="./SDGs.png"
              alt="SDG Grid"
              className="w-full object-contain rounded"
              style={{ minHeight: "200px", maxHeight: "300px" }}
            />
            </div>
            {/* Goal # */}
            <div className=" flex flex-col justify-center">
              <h2 className="h-fit text-[150px] text-white font-[Poppins]">6</h2>
            </div>
            {/* Goal Text */}
            <div className="flex flex-col gap-4 text-white justify-center py-8">
              <h2 className="text-xxl font-[Poppins] font-medium">Clean Water And Sanitation</h2>
              <p className="font-[Poppins] max-w-[500px]">"Clean Water and Sanitation," aims to ensure the availability and sustainable management of water and sanitation for all. 1  This goal recognizes that access to clean water and sanitation is 2  a fundamental human right essential for health, development, and equality.</p>
              <div className="flex flex-row justify-end">
                <div className="flex flex-row w-fit items-center bg-[#CCE0FF] rounded-full px-4 py-2
                hover:bg-[#85B8FF]">
                  <p className="text-black text-s font-[Poppins] self-center">Learn more</p>
                  <img
                  src="./icon_chevron-right.svg"
                  alt="right facing chevron icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Progress */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex justify-between items-center mb-2 min-w-max">
            {["Newbie", "Master"].map((text, index) => (
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

        {/* SDG Modules */}
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-4 font-[Poppins]">
            Goals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-[Poppins] ">
            {modules.map((module, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer hover:bg-[#85B8FF] hover:text-white ${
                  module.locked ? "opacity-75 cursor-not-allowed" : ""
                }`}
                onClick={() => !module.locked && router.push("/quiz")} // Only allow navigation if not locked
              >
                <div className="p-4 flex items-start">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-4  ${
                      module.status === "completed"
                        ? "bg-green-100 text-green-500"
                        : module.status === "in-progress"
                        ? "bg-blue-100 text-blue-500"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {module.title.charAt(0)}
                  </div>
                  <div className="flex-grow ">
                    <h3 className="font-semibold text-base">{module.title}</h3>
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
                {module.locked && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

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
          <NewsCarousel articles={articles}/>
      </main>
    </div>
  );
}
