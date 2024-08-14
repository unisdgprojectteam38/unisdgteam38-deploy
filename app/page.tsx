import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";

import { Bell, User, ChevronRight } from "lucide-react";
// import Island from "./island.svg";
export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
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
      <main className="flex-1 overflow-y-auto p-6">
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
              src="/island.svg"
              alt="SDG Isometric Illustration"
              className="w-full h-64 object-contain rounded"
              src={"./island.svg"}
              alt="SDG Isometric Illustration"
              style={{ minHeight: "250px", maxHeight: "300px" }}
            />
          </div>
        </div>

        {/* Module Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {["Module", "Module", "Module", "Module", "Module"].map(
              (text, index) => (
                <div
                  key={index}
                  className={`text-sm ${
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
          <div className="grid grid-cols-3 gap-4">
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
