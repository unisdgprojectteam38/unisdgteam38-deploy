import React, { useState, useEffect, useRef } from "react";
import { WaterContainer } from "@/components/ui/watercontainer/WaterContainer";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  Section,
  QuizSection,
  TextSection,
  ResourceManagerGameSection,
  FlashcardGameSection,
} from "@/types/sections";
import CelebrationAnimation from "@/public/celebrate.json";
import QuizSectionComponent from "./sections/quiz/Quiz";
import TextSectionComponent from "./sections/text/Text";
import ResourceManagerGameComponent from "./sections/resourceManagerGame/ResourceManagerGame";
import FlashcardSectionComponent from "./sections/flashcards/Flashcards";
import { motion } from "framer-motion";

interface ModulePlayerProps {
  modules: {
    module_id: string;
    title: string;
    subtitle: string;
  };
  sections: Section[];
  onComplete: () => void;
  moduleTitle: string;
}

const SECTION_COMPONENTS: Record<Section["type"], React.FC<{ section: Section }>> = {
  quiz: QuizSectionComponent as React.FC<{ section: Section }>,
  text: TextSectionComponent as React.FC<{ section: Section }>,
  resourceManagerGame: ResourceManagerGameComponent as React.FC<{ section: Section }>,
  flashcards: FlashcardSectionComponent as React.FC<{ section: Section }>,
};

const ModulePlayer: React.FC<ModulePlayerProps> = ({
  modules,
  sections,
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
        <header className="sticky top-0 z-[901] h-16 bg-white">
          {/* ... header content ... */}
        </header>
        <main className="flex-grow bg-[#F6F7FB] flex">
          <div className="flex-shrink-0 p-8">
            <WaterContainer completed={progress} total={100} />
          </div>
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