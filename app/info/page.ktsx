import React from 'react';
import { InfographicPage } from '@/components/info/InfographicPage';
import { HeaderData, TargetsData, EventsData } from '@/types/infographics';
import Image from 'next/image';
import island from '@/public/island.svg';
import WaterDropScroll from '@/components/info/sdg6/WaterDropScroll';


const headerData: HeaderData = {
  newsTitle: "Daily News",
  newsContent: "The FAO Rome Water Dialogue 2024 will focus on water scarcity in agriculture, a key concern as climate change and growing populations put additional pressure on water resources",
  mainTitle: "06 CLEAN WATER & SANITATION",
  mainSubtitle: "Ensure availability and sustainable management of water and sanitation for all.",
  backgroundColor: "bg-[#0a97d9]",
  newsBannerColor: "bg-[#fea362]",
  illustrationComponent: <Image src={island} alt="Island" width={500} height={500} />,  // Specify width and height
  definitionTitle: "What is 06 Clean Water & Sanitation?",
  definitionPara: "Clean Water and Sanitation, aims to ensure the availability and sustainable management of water and sanitation for all. 1  This goal recognizes that access to clean water and sanitation is 2  a fundamental human right essential for health, development, and equality."
};

const targetsData: TargetsData = {
  title: "Our Key Targets",
  subtitle: "Explore our main objectives for clean water and sanitation.",
  targets: [
    {
      number: "6.1",
      title: "SAFE AND AFFORDABLE DRINKING WATER",
      description: "By 2030, achieve universal and equitable access to safe and affordable drinking water for all."
    },
    {
      number: "6.2",
      title: "END OPEN DEFECATION AND PROVIDE ACCESS TO SANITATION AND HYGIENE",
      description: "By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation."
    },
    {
      number: "6.3",
      title: "IMPROVE WATER QUALITY, WASTEWATER TREATMENT AND SAFE REUSE",
      description: "By 2030, improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals and materials, halving the proportion of untreated wastewater and substantially increasing recycling and safe reuse globally"
    },
    {
      number: "6.4",
      title: "INCREASE WATER-USE EFFICIENCY AND ENSURE FRESHWATER SUPPLIES",
      description: "By 2030, substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity and substantially reduce the number of people suffering from water scarcity."
    },
    {
      number: "6.5",
      title: "IMPLEMENT INTEGRATED WATER RESOURCES MANAGEMENT",
      description: "By 2030, implement integrated water resources management at all levels"
    },
    {
      number: "6.6",
      title: "IMPLEMENT INTEGRATED WATER RESOURCES MANAGEMENT",
      description: "By 2030, implement integrated water resources management at all levels"
    },
    {
      number: "6.7",
      title: "IMPLEMENT INTEGRATED WATER RESOURCES MANAGEMENT",
      description: "By 2030, implement integrated water resources management at all levels"
    },
    {
      number: "6.8",
      title: "IMPLEMENT INTEGRATED WATER RESOURCES MANAGEMENT",
      description: "By 2030, implement integrated water resources management at all levels"
    },
    {
      number: "6.9",
      title: "IMPLEMENT INTEGRATED WATER RESOURCES MANAGEMENT",
      description: "By 2030, implement integrated water resources management at all levels"
    },
    {
      number: "7.0",
      title: "IMPLEMENT INTEGRATED WATER RESOURCES MANAGEMENT",
      description: "By 2030, implement integrated water resources management at all levels"
    },
  ],
  iconSrc: "/path-to-your-icon.png",
};

const eventsData: EventsData = {
  title: "Upcoming Events",
  description: "These events happen annually",
  events: [
    {
      imgSrc : "/seventeenxmelbourne2024-graphic.png",
      title : "SEVENTEENx Melbourne",
      date: "20 November 2024",
      href : "https://events.humanitix.com/seventeenx-melbourne-2024?utm_medium=paid&utm_source=ig&utm_id=120210902296870575&utm_content=120210902297030575&utm_term=120210902296990575&utm_campaign=120210902296870575&fbclid=PAZXh0bgNhZW0BMAABpqJq2jsqXg9WMf6ShxMKckRldAGZzXndlEQWf3652pvMMjXKtlnkv6-TYA_aem_MVrVNgUUpVtFd2C4GUt34Q"
    },
    {
      // Event Card Data
      imgSrc : "/worldwaterday-graphic.png",
      title : "World Water Day",
      date : "22 March 2025",
      href : "https://www.un.org/en/observances/water-day"
    },
    {
      imgSrc : "/worldoceanday-graphic.png",
      title : "World Ocean Day",
      date: "8 June 2025",
      href : "https://worldoceanday.org/"
    }
  ]
};

const quizData = {
  title: "Test Your Knowledge on Water Sustainability",
  questions: [
    {
      type: "single" as const,
      question: "Ensuring access to clean water requires effective ______ strategies.",
      correctAnswers: ["conservation"],
      options: ["conservation", "pollution", "scarcity", "recycling"],
    },
    {
      type: "single" as const,
      question: "One approach is ______ harvesting, which collects and stores rainwater for various uses.",
      correctAnswers: ["rainwater"],
      options: ["rainwater", "groundwater", "wastewater", "treatment"],
    },
    {
      type: "multiple" as const,
      question: "Select all that apply: Managing water resources efficiently can address growing water scarcity concerns.",
      correctAnswers: ["efficiently", "scarcity"],
      options: ["efficiently", "scarcity", "wastewater", "recycling"],
    },
    // ... add more questions as needed
  ],
};


const gameData = {
  title: "Match Water Sustainability Concepts",
  cardPairs: [
    { id: 1, imageUrl: "/images/water-conservation.jpg" },
    { id: 2, imageUrl: "/images/rainwater-harvesting.jpg" },
    { id: 3, imageUrl: "/images/water-treatment.jpg" },
    { id: 4, imageUrl: "/images/sustainable-agriculture.jpg" },
    // Add more pairs as needed
  ],
};

export default function InfographicExample() {
  return (
    <InfographicPage
      headerData={headerData}
      targetsData={targetsData}
      eventsData={eventsData}
      quizData={quizData}
      gameData={gameData}
      ScrollComponent={WaterDropScroll}
    />
  )
}