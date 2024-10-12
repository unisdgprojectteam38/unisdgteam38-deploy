import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const targetIcons = {
  "6.1": "💧",
  "6.2": "🚽",
  "6.3": "🧪",
  "6.4": "🚰",
  "6.5": "🌊",
  "6.6": "🏞️",
  "6.7": "🤝",
  "6.8": "👥",
};

const SDG6Carousel = ({ targets }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [readProgress, setReadProgress] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const readingTime = 5000; // 10 seconds per slide, adjust as needed

  const resetTimer = useCallback(() => {
    setReadProgress(0);
    setCanProceed(false);
  }, []);

  useEffect(() => {
    let timer;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / readingTime) * 100, 100);
      setReadProgress(newProgress);

      if (newProgress < 100) {
        timer = requestAnimationFrame(updateProgress);
      } else {
        setCanProceed(true);
      }
    };

    timer = requestAnimationFrame(updateProgress);

    return () => {
      if (timer) {
        cancelAnimationFrame(timer);
      }
    };
  }, [currentIndex, readingTime]);

  const nextSlide = () => {
    if (canProceed && currentIndex < targets.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      resetTimer();
    }
  };

  const slideVariants = {
    enter: { x: "100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-100 to-blue-300 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-4/5 h-3/4 bg-white rounded-lg shadow-xl p-8 flex flex-col"
          >
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold mb-4"
            >
              Target {targets[currentIndex].id}:{" "}
              {targetIcons[targets[currentIndex].id]}
            </motion.div>
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl mb-6"
            >
              {targets[currentIndex].title}
            </motion.div>
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex-grow text-lg overflow-y-auto mb-6"
            >
              {targets[currentIndex].description}
            </motion.div>
            <motion.button
              onClick={nextSlide}
              disabled={!canProceed}
              whileHover={canProceed ? { scale: 1.05 } : {}}
              whileTap={canProceed ? { scale: 0.95 } : {}}
              className={`self-end px-4 py-2 rounded-full flex items-center ${
                canProceed
                  ? "bg-blue-500 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next <ArrowRight className="ml-2" size={16} />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-4/5">
        <div className="bg-gray-200 rounded-full h-2.5">
          <motion.div
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${readProgress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {targets.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const SDG6TargetsCarousel = () => {
  const targetsData = [
    {
      id: "6.1",
      title: "Safe and Affordable Drinking Water",
      description:
        "By 2030, achieve universal and equitable access to safe and affordable drinking water for all.",
    },
    {
      id: "6.2",
      title: "End Open Defecation and Provide Access to Sanitation and Hygiene",
      description:
        "By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations.",
    },
    {
      id: "6.3",
      title: "Improve Water Quality, Wastewater Treatment and Safe Reuse",
      description:
        "By 2030, improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals and materials, halving the proportion of untreated wastewater and substantially increasing recycling and safe reuse globally.",
    },
    {
      id: "6.4",
      title: "Increase Water-Use Efficiency and Ensure Freshwater Supplies",
      description:
        "By 2030, substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity and substantially reduce the number of people suffering from water scarcity.",
    },
    {
      id: "6.5",
      title: "Implement Integrated Water Resources Management",
      description:
        "By 2030, implement integrated water resources management at all levels, including through transboundary cooperation as appropriate.",
    },
    {
      id: "6.6",
      title: "Protect and Restore Water-Related Ecosystems",
      description:
        "By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers and lakes.",
    },
    {
      id: "6.7",
      title: "Expand Water and Sanitation Support to Developing Countries",
      description:
        "By 2030, expand international cooperation and capacity-building support to developing countries in water- and sanitation-related activities and programmes, including water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies.",
    },
    {
      id: "6.8",
      title: "Support Local Engagement in Water and Sanitation Management",
      description:
        "Support and strengthen the participation of local communities in improving water and sanitation management.",
    },
  ];

  return <SDG6Carousel targets={targetsData} />;
};

export default SDG6TargetsCarousel;
