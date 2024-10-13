"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import ModulePlayer from "@/components/modulePlayer/ModulePlayer";

interface PlayModuleProps {
  params: {
    module_id: string;
  };
}

interface User {
  id: string;
}

interface Module {
  module_id: string;
  title: string;
  subtitle?: string;
  sdg_id: number;
}

interface Section {
  section_id: string;
  order_id: number;
  title: string;
  section_type: "text" | "quiz" | "resourceManagerGame";
  data: Record<string, any>;
}

const PlayModule: React.FC<PlayModuleProps> = ({ params: { module_id } }) => {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [module, setModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);

  // Fetch user data
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

  // Fetch module and section data
  useEffect(() => {
    const fetchModuleAndSections = async () => {
      if (user) {
        try {
          const { data: moduleData, error: moduleError } = await supabase
            .from("module")
            .select("module_id, title, subtitle, sdg_id")
            .eq("module_id", module_id)
            .single();

          if (moduleError) throw moduleError;
          setModule(moduleData);

          const { data: sectionsData, error: sectionsError } = await supabase
            .from("section")
            .select("section_id, order_id, title, section_type, data")
            .eq("module_id", module_id)
            .order("order_id", { ascending: true });

          if (sectionsError) throw sectionsError;

          // Map sections to match the required structure
          setSections(
            sectionsData.map((section: any) => ({
              id: section.section_id,
              title: section.title,
              order_id: section.order_id,
              type: section.section_type,
              data: section.data,
              onComplete: () =>
                console.log(
                  `Completed Section ${section.order_id}: ${section.title}`
                ),
            }))
          );
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchModuleAndSections();
  }, [user, module_id, supabase]);

  const handleMarkAsComplete = async () => {
    if (user && module) {
      try {
        const { error } = await supabase.from("usermoduleprogress").upsert({
          user_id: user.id,
          module_id: module.module_id,
          progress: "done",
          last_updated: new Date(),
        });

        if (error) throw error;
        console.log("Progress updated successfully");
        setShowCompletionOverlay(true);
        setTimeout(() => {
          setShowCompletionOverlay(false);
          router.push(`/sdg/${module.sdg_id}`);
        }, 3000);
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    }
  };

  // Render loading state until data is available
  if (isLoading || !module || sections.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      {showCompletionOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Module Complete!</h2>
            <p className="text-lg">
              Congratulations on completing this module.
            </p>
          </div>
        </div>
      )}
      <ModulePlayer
        module={{
          module_id: module.module_id,
          title: module.title,
          subtitle: module.subtitle ?? "",
        }}
        sections={sections}
        onComplete={handleMarkAsComplete}
      />
    </div>
  );
};

export default PlayModule;
