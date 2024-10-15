"use client";
import React, { useState, useEffect } from "react";
import { Bell, User, Menu, Check, PlayCircle, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import NewsCard from "@/components/NewsCard";
import SDGGrid from "@/components/SDGGrid";
import { createClient } from "@/utils/supabase/client";

interface SDG {
  sdg_id: number;
  sdg_display_id: string;
  title: string;
  description: string;
}

interface UserSdgProgress {
  sdg_id: number;
  progress: 'todo' | 'doing' | 'done';
}

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [sdgs, setSdgs] = useState<SDG[]>([]);
  const [userSdgProgress, setUserSdgProgress] = useState<UserSdgProgress[]>([]);
  const router = useRouter();
  const supabase = createClient();

  const sdgGoals = [
    { number: 1, title: 'No Poverty', description: 'End poverty in all its forms everywhere.' },
    { number: 2, title: 'Zero Hunger', description: 'End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.' },
    { number: 3, title: 'Good Health and Well-being', description: 'Ensure healthy lives and promote well-being for all at all ages.' },
    { number: 4, title: 'Quality Education', description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.' },
    { number: 5, title: 'Gender Equality', description: 'Achieve gender equality and empower all women and girls.' },
    { number: 6, title: 'Clean Water And Sanitation', description: 'Ensure availability and sustainable management of water and sanitation for all.' },
    { number: 7, title: 'Affordable and Clean Energy', description: 'Ensure access to affordable, reliable, sustainable, and modern energy for all.' },
    { number: 8, title: 'Decent Work and Economic Growth', description: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment, and decent work for all.' },
    { number: 9, title: 'Industry, Innovation, and Infrastructure', description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation.' },
    { number: 10, title: 'Reduced Inequalities', description: 'Reduce inequality within and among countries.' },
    { number: 11, title: 'Sustainable Cities and Communities', description: 'Make cities and human settlements inclusive, safe, resilient, and sustainable.' },
    { number: 12, title: 'Responsible Consumption and Production', description: 'Ensure sustainable consumption and production patterns.' },
    { number: 13, title: 'Climate Action', description: 'Take urgent action to combat climate change and its impacts.' },
    { number: 14, title: 'Life Below Water', description: 'Conserve and sustainably use the oceans, seas, and marine resources for sustainable development.' },
    { number: 15, title: 'Life on Land', description: 'Protect, restore and promote sustainable use of terrestrial ecosystems, manage forests sustainably, combat desertification, and halt biodiversity loss.' },
    { number: 16, title: 'Peace, Justice, and Strong Institutions', description: 'Promote peaceful and inclusive societies, provide access to justice for all, and build effective, accountable institutions.' },
    { number: 17, title: 'Partnerships for the Goals', description: 'Strengthen the means of implementation and revitalize the global partnership for sustainable development.' }
  ];

  const [selectedGoal, setSelectedGoal] = useState({
    number: 6,
    title: 'Clean Water And Sanitation',
    description: 'Ensure availability and sustainable management of water and sanitation for all.',
  });

  const handleSelectGoal = (goal: { number: number }) => {
    const newGoal = sdgGoals[goal.number - 1];
    setSelectedGoal({
      number: goal.number,
      title: newGoal.title,
      description: newGoal.description,
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        fetchSdgs();
        fetchUserSdgProgress(user.id);
      } else {
        router.push("/login");
      }
    };
    fetchUserData();
  }, []);

  const fetchSdgs = async () => {
    try {
      const response = await fetch('/api/sdgs');
      if (!response.ok) {
        throw new Error('Failed to fetch SDGs');
      }
      const data = await response.json();
      setSdgs(data);
    } catch (error) {
      console.error("Error fetching SDGs:", error);
    }
  };

  const fetchUserSdgProgress = async (userId: string) => {
    const { data, error } = await supabase
      .from("usersdgprogress")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching user SDG progress:", error);
    } else {
      setUserSdgProgress(data);
    }
  };

  const getSdgProgress = (sdgId: number): 'todo' | 'doing' | 'done' => {
    const progress = userSdgProgress.find((p) => p.sdg_id === sdgId);
    return progress ? progress.progress : 'todo';
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
        style={{ margin: "0", padding: "0" }}
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
          <div className="bg-indigo-900 p-4 rounded-lg flex flex-row gap-8">
            <div className="w-[600px]">
              <SDGGrid onSelectGoal={handleSelectGoal} />
            </div>
            {/* Goal # */}
            <div className="flex flex-col justify-center">
              <h2 className="h-fit text-[150px] text-white font-[Poppins]">{selectedGoal.number}</h2>
            </div>
            {/* Goal Text */}
            <div className="flex flex-col gap-4 text-white justify-center py-8">
              <h2 className="text-xxl font-[Poppins] font-medium">{selectedGoal.title}</h2>
              <p className="font-[Poppins] max-w-[500px]">{selectedGoal.description}</p>
              <div className="flex flex-row justify-end">
                <div className="flex flex-row w-fit items-center bg-[#CCE0FF] rounded-full px-4 py-2 hover:bg-[#85B8FF]">
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
          <h2 className="text-2xl font-bold mb-4 font-[Poppins]">Goals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-[Poppins]">
            {sdgs.map((sdg) => {
              const progress = getSdgProgress(sdg.sdg_id);
              return (
                <div
                  key={sdg.sdg_id}
                  className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer hover:bg-[#85B8FF] hover:text-white ${
                    progress === 'todo' ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  onClick={() => progress !== 'todo' && router.push(`/sdg/${sdg.sdg_id}`)}
                >
                  <div className="p-4 flex items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      progress === 'done' ? "bg-green-100 text-green-500" :
                      progress === 'doing' ? "bg-blue-100 text-blue-500" :
                      "bg-gray-200 text-gray-500"
                    }`}>
                      {sdg.sdg_display_id}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-base">{sdg.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{sdg.description}</p>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      {progress === 'done' && <Check className="h-5 w-5 text-green-500" />}
                      {progress === 'doing' && <PlayCircle className="h-5 w-5 text-blue-500" />}
                    </div>
                  </div>
                  {progress === 'todo' && (
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center">
                      <Lock className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
              );
            })}
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
        
        {/* News card container */}
        <div className="flex flex-row justify-center items-start h-[360px] px-6 py-4 gap-8">
          <NewsCard 
            img="/EVAC-header-desktop.jpg"
            title="End Child Violence"
            description="1 in 2 children are victims of violence. The power to end it is in our hands."
            href="https://www.globalgoals.org/endchildviolence/"
          />
          <NewsCard 
            img="/news-article-2.jpg"
            title="Makes Global Sense"
            description="If you had to choose between coffee and bread, which would it be?"
            href="https://www.globalgoals.org/makestotalsense/"
          />
          <NewsCard 
            img="/news-article-3.jpg"
            title="Global Goals"
            description="What are the global goals?"
            href="https://www.globalgoals.org/news/what-are-the-global-goals/"
          />
        </div>
      </main>
    </div>
  );
}