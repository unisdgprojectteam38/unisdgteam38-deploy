// Update code to include progression tracking

import React, { useState, useEffect, useRef } from "react";
import { WaterContainer } from "@/components/ui/watercontainer/WaterContainer";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  Section,
  QuizSection,
  TextSection,
  ResourceManagerGameSection,
  FlashcardGameSection,
  HeaderSection as HeaderSectionType,
} from "@/types/sections";
import CelebrationAnimation from "@/public/celebrate.json";
import QuizSectionComponent from "./sections/quiz/Quiz";
import TextSectionComponent from "./sections/text/Text";
import ResourceManagerGameComponent from "./sections/resourceManagerGame/ResourceManagerGame";
import FlashcardSectionComponent from "./sections/flashcards/Flashcards";

import { HeaderSection } from "@/components/info/header/HeaderSection";
import { EventsSection } from "@/components/info/events/EventsSection";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
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

interface User {
  id: string;
  [key: string]: any;
}

const SECTION_COMPONENTS: Record<Section["type"], React.FC<{ section: Section }>> = {
  quiz: QuizSectionComponent as React.FC<{ section: Section }> ,
  text: TextSectionComponent as React.FC<{ section: Section }> ,
  resourceManagerGame: ResourceManagerGameComponent as React.FC<{ section: Section }> ,
  flashcards: FlashcardSectionComponent as React.FC<{ section: Section }> ,
  header: HeaderSection as React.FC<{ section: Section }> ,
  events: EventsSection as React.FC<{ section: Section }> ,
};

const ModulePlayer: React.FC<ModulePlayerProps> = ({
  modules,
  sections,
  onComplete,
  moduleTitle,
}) => {
  const [progress, setProgress] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userSectionProgress, setUserSectionProgress] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

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
    const fetchSectionProgress = async () => {
      if (user) {
        try {
          const { data: progressData, error } = await supabase
            .from("usersectionprogress")
            .select("*")
            .eq("user_id", user.id)
            .eq("module_id", modules.module_id);
          if (error) {
            console.error("Error fetching section progress:", error);
          } else {
            setUserSectionProgress(progressData);
          }
        } catch (error) {
          console.error("Unexpected error fetching section progress:", error);
        }
      }
    };
    fetchSectionProgress();
  }, [user, supabase, modules, showAnimation]);

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

  const getSectionStatus = (sectionId: string): 'todo' | 'done' => {
    const progress = userSectionProgress.find((p) => p.section_id === sectionId);
    return progress ? progress.status : 'todo';
  };


  const handleSectionComplete = async (index: number, sectionId: string) => {
    if (!user) return;
    try {
      const { error } = await supabase.from("usersectionprogress").upsert({
        user_id: user.id,
        section_id: sectionId,
        module_id: modules.module_id,
        status: "done",
        last_updated: new Date().toISOString(),
      });
      if (error) throw error;
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
      // Remove the check for the last section
      onComplete();
    } catch (error) {
      console.error("Error updating progress:", error);
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
          fontFamily: 'hurme_no2-webfont, -apple-system, "system-ui", sans-serif',
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
              const status = getSectionStatus(section.id);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h2 className="text-2xl font-bold mb-4">
                    Section {index + 1}: {section.title}
                  </h2>
                  <SectionComponent
                    section={{
                      ...section,
                      onComplete: () => handleSectionComplete(index, section.id),
                    }}
                  />
                  {status === 'done' && (
                    <div className="flex items-center justify-end mt-2">
                      <span className="text-green-500">✓ Completed</span>
                    </div>
                  )}
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