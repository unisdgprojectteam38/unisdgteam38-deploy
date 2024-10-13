import React, { useState, useEffect } from "react";
import { WaterContainer } from "@/components/ui/watercontainer/WaterContainer";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  Section,
  QuizSection,
  TextSection,
  ResourceManagerGameSection,
} from "@/types/sections";
import ResourceManagerGame from "./sections/resourceManagerGame/ResourceManagerGame";
import CelebrationAnimation from "@/public/celebrate.json";
import QuizSectionComponent from "./sections/quiz/Quiz";
import TextSectionComponent from "./sections/text/Text";
import ResourceManagerGameComponent from "./sections/resourceManagerGame/ResourceManagerGame";
import FlashcardSectionComponent from "./sections/flashcards/Flashcards";
import { motion, AnimatePresence } from "framer-motion";

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

const ResourceManagerGameSection: React.FC<{
  section: ResourceManagerGameSection;
}> = ({ section }) => {
  return <ResourceManagerGame />;
};

// Section Component Map
const SECTION_COMPONENTS: Record<
  Section["type"],
  React.FC<{ section: Section }>
> = {
  quiz: QuizSectionComponent,
  text: TextSectionComponent,
  resourceManagerGame: ResourceManagerGameComponent,
  flashcards: FlashcardSectionComponent,
};

// ModulePlayer Component
const ModulePlayer: React.FC<ModulePlayerProps> = ({
  sections,
  module,
  onComplete,
  moduleTitle,
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentSection = sections[currentSectionIndex];
  const SectionComponent = SECTION_COMPONENTS[currentSection.type];

  useEffect(() => {
    setProgress(((currentSectionIndex + 1) / sections.length) * 100);
  }, [currentSectionIndex, sections.length]);

  const handleSectionComplete = () => {
    setCompletedCount((prev) => prev + 1);
    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);
      setIsTransitioning(true);

      setTimeout(() => {
        if (currentSectionIndex < sections.length - 1) {
          setCurrentSectionIndex(currentSectionIndex + 1);
        } else {
          onComplete();
        }
        setIsTransitioning(false);
      }, 0);
    }, 2000);
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
        <main className="flex-grow bg-[#F6F7FB]">
          <div className="max-w-[960px] mx-auto px-8 pt-12 pb-4 flex gap-12">
            {/* Water Container on the left */}
            <div className="flex-shrink-0">
              <WaterContainer
                completed={completedCount}
                total={sections.length}
              />
            </div>

            {/* Main Player Content */}
            <div className="flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSectionIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Render Section Component */}
                  <SectionComponent
                    section={{
                      ...currentSection,
                      onComplete: handleSectionComplete,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ModulePlayer;
