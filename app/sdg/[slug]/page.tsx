"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { CheckCircle, ChevronRight, Lock } from "lucide-react";

const RaindropSVG = () => (
  <svg className="Hero6-symbol" viewBox="0 0 512 512" fill="white">
    <path d="M414.21,226.014L256,0L97.791,226.014c-65.493,93.56-29.274,224.629,75.837,269.286C198.933,506.053,226.772,512,256,512s57.067-5.947,82.373-16.699C443.484,450.643,479.701,319.574,414.21,226.014z" />
  </svg>
);

export default function SdgDetail({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState(null);
  const [sdg, setSdg] = useState(null);
  const [modules, setModules] = useState([]);
  const [userModuleProgress, setUserModuleProgress] = useState([]);
  const [featuredModule, setFeaturedModule] = useState(null);

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
  }, [supabase, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { data: sdg } = await supabase
          .from("sdgs")
          .select("*")
          .eq("sdg_id", slug)
          .single();
        setSdg(sdg);

        const { data: modulesData } = await supabase
          .from("module")
          .select("*")
          .eq("sdg_id", slug)
          .order("module_id", { ascending: true });
        setModules(modulesData);
        setFeaturedModule(modulesData[0]);

        const { data: progress } = await supabase
          .from("usermoduleprogress")
          .select("*")
          .eq("user_id", user.id);
        setUserModuleProgress(progress);
      }
    };

    fetchData();
  }, [user, supabase, slug]);

  const getModuleStatus = (moduleId, index) => {
    const progress = userModuleProgress.find((p) => p.module_id === moduleId);
    if (progress) {
      return progress.progress;
    }

    // If it's the first module, always return 'todo'
    if (index === 0) {
      return "todo";
    }

    // Check if the previous module is completed
    const prevModuleCompleted =
      index > 0 &&
      userModuleProgress.some(
        (p) =>
          p.module_id === modules[index - 1].module_id && p.progress === "done"
      );

    // If the previous module is completed, this module should be 'todo', otherwise 'locked'
    return prevModuleCompleted ? "todo" : "locked";
  };

  const handleContinue = () => {
    const nextModule = modules.find(
      (module, index) =>
        getModuleStatus(module.module_id, index) === "todo" ||
        getModuleStatus(module.module_id, index) === "doing"
    );
    if (nextModule) {
      router.push(`/play/${nextModule.module_id}`);
    } else {
      router.push(`/play/${modules[0].module_id}`);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans text-[16px] leading-[26px]"
      style={{
        fontFamily: 'hurme_no2-webfont, -apple-system, "system-ui", sans-serif',
        backgroundColor: "#F6F7FB",
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-[901] h-16 bg-white">
        <div
          className="h-full px-6 flex items-center justify-between"
          style={{ color: "rgb(40, 46, 62)" }}
        >
          <div className="flex items-center">
            <span className="text-lg font-semibold">
              {"SDG " + sdg?.sdg_display_id || "SDG"}
            </span>
            <svg
              className="w-4 h-4 ml-1 text-[#939bb4]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <h1 className="text-[16px] font-semibold cursor-pointer absolute left-1/2 transform -translate-x-1/2">
            {sdg?.title || "Clean Water and Sanitation"}
          </h1>
          <div className="flex items-center">
            <button className="px-3 py-1 bg-gray-100 rounded-md text-sm mr-2">
              Options
            </button>
            <button
              className="p-1 bg-gray-100 rounded-md"
              onClick={() => router.push("/home")}
            >
              <svg
                className="w-5 h-5 text-[#586380]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-[#F6F7FB] p-4">
        <div className="w-full max-w-2xl mx-auto">
          {featuredModule && (
            <div className="bg-[rgb(44,186,223)] rounded-3xl p-8 mb-8 relative overflow-hidden">
              {/* Raindrops */}
              <div
                className="Hero6-drop-1"
                style={{ left: "10%", animationDelay: "0s" }}
              >
                <RaindropSVG />
              </div>
              <div
                className="Hero6-drop-1"
                style={{ left: "30%", animationDelay: "0.5s" }}
              >
                <RaindropSVG />
              </div>
              <div
                className="Hero6-drop-3"
                style={{ left: "50%", animationDelay: "1s" }}
              >
                <RaindropSVG />
              </div>
              <div
                className="Hero6-drop-2"
                style={{ left: "70%", animationDelay: "1.5s" }}
              >
                <RaindropSVG />
              </div>
              <div
                className="Hero6-drop-3"
                style={{ left: "90%", animationDelay: "2s" }}
              >
                <RaindropSVG />
              </div>

              <div className="relative z-10">
                <h2 className="text-center text-sm mb-2 text-white">
                  Featured
                </h2>
                <h3 className="text-center text-2xl font-bold mb-2 text-white">
                  {featuredModule.title}
                </h3>
                <p className="text-center text-sm mb-6 text-white">
                  {featuredModule.subtitle}
                </p>
                <button
                  onClick={handleContinue}
                  className="w-full bg-white text-[rgb(44,186,223)] py-3 px-4 rounded-full font-semibold hover:bg-opacity-90 transition duration-300"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Modules
            </h2>
            <ul className="space-y-4">
              {modules.map((module, index) => {
                const status = getModuleStatus(module.module_id, index);

                return (
                  <li
                    key={module.module_id}
                    className={`flex items-center p-2 rounded-lg transition duration-300 ${
                      status !== "locked"
                        ? "cursor-pointer hover:bg-gray-50"
                        : "opacity-50"
                    }`}
                    onClick={() =>
                      status !== "locked" &&
                      router.push(`/play/${module.module_id}`)
                    }
                  >
                    <div
                      className={`w-12 h-12 rounded-lg mr-4 flex-shrink-0 flex items-center justify-center ${
                        status === "done" ? "bg-green-500" : "bg-orange-200"
                      }`}
                    >
                      {status === "done" ? (
                        <CheckCircle className="text-white w-6 h-6" />
                      ) : (
                        <span className={`text-xl font-bold text-orange-500`}>
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-sm text-gray-500">{module.subtitle}</p>
                    </div>
                    {status === "locked" ? (
                      <Lock className="text-gray-400 w-6 h-6" />
                    ) : (
                      status !== "done" && (
                        <ChevronRight className="text-gray-400 w-6 h-6" />
                      )
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </main>

      <style jsx>{`
        .Hero6-drop-1,
        .Hero6-drop-2,
        .Hero6-drop-3 {
          position: absolute;
          width: 15px;
          height: 75px;
          opacity: 0.6;
          animation: animation-1dftcq5 3.2s linear infinite;
          pointer-events: none;
          user-select: none;
        }
        .Hero6-drop-2 {
          width: 25px;
          height: 100px;
        }
        .Hero6-drop-3 {
          width: 30px;
          height: 150px;
        }
        @keyframes animation-1dftcq5 {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(calc(100% + 150px));
          }
        }
      `}</style>
    </div>
  );
}