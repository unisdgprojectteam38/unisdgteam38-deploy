"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Lock, ChevronRight } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState(null);
  const [sdgs, setSdgs] = useState([]);
  const [userSdgProgress, setUserSdgProgress] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchSdgs = async () => {
      if (user) {
        const { data: sdgs, error } = await supabase.from("sdgs").select("*");
        if (error) {
          console.error("Error fetching SDGs:", error);
        } else {
          setSdgs(sdgs);
        }
      }
    };

    const fetchUserSdgProgress = async () => {
      if (user) {
        const { data: progress, error } = await supabase
          .from("usersdgprogress")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching user SDG progress:", error);
        } else {
          setUserSdgProgress(progress);
        }
      }
    };

    fetchSdgs();
    fetchUserSdgProgress();
  }, [user]);

  const getSdgProgress = (sdgId) => {
    const progress = userSdgProgress.find((p) => p.sdg_id === sdgId);
    return progress ? progress.progress : 0;
  };

  const getNextAvailableSdg = () => {
    return sdgs.find((sdg) => getSdgProgress(sdg.sdg_id) < 100) || sdgs[0];
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[16px] leading-[26px] bg-[#F6F7FB]">
      {/* Header */}
      <header className="sticky top-0 z-[901] h-16 bg-white">
        <div
          className="h-full px-6 flex items-center justify-between"
          style={{ color: "rgb(40, 46, 62)" }}
        >
          <div className="flex items-center">
            <span className="text-lg font-semibold">
              Sustainable Development Goals
            </span>
          </div>
          <div className="flex items-center">
            <button className="px-3 py-1 bg-gray-100 rounded-md text-sm mr-2">
              Options
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <div className="w-full max-w-2xl mx-auto">
          {/* Featured SDG */}

          {/* SDG List */}
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">SDGs</h2>
            <ul className="space-y-4">
              {sdgs.map((sdg, index) => {
                const progress = getSdgProgress(sdg.sdg_id);
                const isLocked =
                  index > 0 && getSdgProgress(sdgs[index - 1].sdg_id) < 100;

                return (
                  <li
                    key={sdg.sdg_id}
                    className={`bg-[#F0F3F9] rounded-xl p-4 ${
                      isLocked ? "opacity-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[#4B8BF4] font-semibold">
                        SDG {sdg.sdg_display_id} • SEE DETAILS
                      </span>
                      <span className="text-gray-500">{progress} / 100</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{sdg.title}</h3>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => router.push(`/sdg/${sdg.sdg_id}`)}
                        className="bg-[#4B8BF4] text-white py-2 px-4 rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
                        disabled={isLocked}
                      >
                        {progress > 0 ? "Continue" : "Start"}
                      </button>
                      {isLocked ? (
                        <Lock className="text-gray-400 w-6 h-6" />
                      ) : (
                        <ChevronRight className="text-gray-400 w-6 h-6" />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
