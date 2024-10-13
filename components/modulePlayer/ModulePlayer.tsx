import React, { useState, useEffect, useRef } from "react";
import { WaterContainer } from "@/components/ui/watercontainer/WaterContainer";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  Section,
  QuizSection,
  TextSection,
  ResourceManagerGameSection,
} from "@/types/sections";
import CelebrationAnimation from "@/public/celebrate.json";
import QuizSectionComponent from "./sections/quiz/Quiz";
import TextSectionComponent from "./sections/text/Text";
import ResourceManagerGameComponent from "./sections/resourceManagerGame/ResourceManagerGame";
import FlashcardSectionComponent from "./sections/flashcards/Flashcards";
import { motion } from "framer-motion";

interface ModulePlayerProps {
  sections: Section[];
  modules: Module;
  onComplete: () => void;
  moduleTitle: string;
}

interface Module {
  module_id: string;
  title: string;
  subtitle?: string;
}

const SECTION_COMPONENTS: Record<
  Section["type"],
  React.FC<{ section: Section }>
> = {
  quiz: QuizSectionComponent,
  text: TextSectionComponent,
  resourceManagerGame: ResourceManagerGameComponent,
  flashcards: FlashcardSectionComponent,
};

const ModulePlayer: React.FC<ModulePlayerProps> = ({
  sections,
  module,
  onComplete,
  moduleTitle,
}) => {
  const [progress, setProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const newProgress = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setProgress(newProgress);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleSectionComplete = (index: number) => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);

    if (index === sections.length - 1) {
      onComplete();
    }
  };

  return (
    <>
      {showAnimation && (
        <div className="fixed top-0 left-0 right-0 flex justify-center z-[902]">
          <Player
            autoplay
            src={CelebrationAnimation}
            style={{ height: "500px", width: "500px" }}
          />
        </div>
      )}
      <div
        className="min-h-screen flex flex-col font-sans text-[16px] leading-[26px]"
        style={{
          fontFamily:
            'hurme_no2-webfont, -apple-system, "system-ui", sans-serif',
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
                {"Module " + module.module_id}
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
              {module.title}
            </h1>
            <div className="flex items-center">
              <button className="px-3 py-1 bg-gray-100 rounded-md text-sm mr-2">
                Options
              </button>
              <button className="p-1 bg-gray-100 rounded-md">
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
        <main className="flex-grow bg-[#F6F7FB] flex">
          {/* Water Container on the left */}
          <div className="flex-shrink-0 p-8">
            <WaterContainer completed={progress} total={100} />
          </div>

          {/* Main Player Content */}
          <div
            ref={containerRef}
            className="flex-grow overflow-y-auto p-8"
            style={{ height: "calc(100vh - 64px)" }}
          >
            {sections.map((section, index) => {
              const SectionComponent = SECTION_COMPONENTS[section.type];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold mb-4">
                    Section {index + 1}: {section.title}
                  </h2>
                  <SectionComponent
                    section={{
                      ...section,
                      onComplete: () => handleSectionComplete(index),
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
};

export default ModulePlayer;
