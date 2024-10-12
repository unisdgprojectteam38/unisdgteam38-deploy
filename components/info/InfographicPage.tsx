"use client";
import React from "react";
import { HeaderSection } from "@/components/info/header/HeaderSection";
import { TargetsSection } from "@/components/info/target/TargetsSection";
import { QuizSection } from "@/components/info/quiz/QuizSection";
import ImageMatchingGame from "@/components/info/game/image-match/ImageMatchingGame";
import { Target } from "@/types/infographics";
import WaterResourceManagementGame from "@/components/info/game/challenges/Challenges";
import ScaleTheServices from "@/components/info/game/scale-the-services/ScaleTheServices";
import SDG6Carousel from "@/components/info/slides/Slides";
import SDG6StoryComponent from "@/components/info/story/Story";

const gameData = {
  slides: [
    {
      headline:
        "Meet Lina, a girl who dreams of a world with clean water for everyone.",
      supportingText:
        "In her village, water is as precious as gold. Every morning, Lina and her mother walk miles to fetch water from a small, shrinking pond.",
      backgroundImage:
        "https://assetsio.gnwcdn.com/minecraft-village.png?width=880&quality=80&format=jpg&dpr=2&auto=webp",
      lottieAnimation:
        "https://lottie.host/embed/81eb9c04-7aa7-41f6-9096-6eee62939447/S43W3A0jTQ.json",
    },
    {
      headline: "The Long Walk",
      supportingText:
        "For Lina, this journey takes hours each day. She dreams of going to school, but without water nearby, her education takes a backseat.",
      backgroundImage: "/images/dusty-path.jpg",
      lottieAnimation: "/animations/girl-walking-with-clay-pot.lottie",
    },
    // {
    //   headline: "Every Drop Counts",
    //   supportingText:
    //     "Sometimes, accidents happen. Today, the pot Lina carried slipped from her hands, spilling the precious water on the ground. She must go back and start over.",
    //   backgroundImage: "/images/cracked-ground.jpg",
    //   lottieAnimation: "/animations/breaking-clay-pot.lottie",
    // },
    // {
    //   headline: "Water Brings Life",
    //   supportingText:
    //     "Water isn't just for drinking. Without it, gardens wither, animals thirst, and the village's health suffers. One clean well could change everything.",
    //   backgroundImage: "/images/dry-soil.jpg",
    //   lottieAnimation: "/animations/growing-flower.lottie",
    // },
    // {
    //   headline: "A Ray of Hope",
    //   supportingText:
    //     "One day, an organization arrives, promising to build a clean well in Lina's village. She and her neighbors volunteer to help, feeling hope for the first time in years.",
    //   backgroundImage: "/images/lightening-landscape.jpg",
    //   lottieAnimation: "/animations/hand-pouring-water.lottie",
    // },
    // {
    //   headline: "A Miracle for the Village",
    //   supportingText:
    //     "For Lina, the new well means more than just water. It means time to go to school, better health, and a future for her village.",
    //   backgroundImage: "/images/village-well.jpg",
    //   lottieAnimation: "/animations/well-filling-with-water.lottie",
    // },
    // {
    //   headline: "A New Beginning",
    //   supportingText:
    //     "With the clean well nearby, Lina finally starts school. Her journey inspires her to dream of helping other villages gain access to clean water.",
    //   backgroundImage: "/images/school-building.jpg",
    //   lottieAnimation: "/animations/lina-with-book.lottie",
    // },
    // {
    //   headline: "One Drop Can Change Everything",
    //   supportingText:
    //     "Lina's village is only one of many. The efforts to bring clean water to one community can ripple out, changing lives and futures around the world.",
    //   backgroundImage: "/images/rippling-water.jpg",
    //   lottieAnimation: "/animations/expanding-water-ripples.lottie",
    // },
    // {
    //   headline: "Be Part of the Change",
    //   supportingText:
    //     "You can make a difference, whether by supporting a clean water initiative, spreading awareness, or conserving water at home.",
    //   backgroundImage: "/images/empowerment-background.jpg",
    //   lottieAnimation: "/animations/hand-passing-droplet.lottie",
    // },
    // {
    //   headline: "Imagine a Future with Clean Water for All",
    //   supportingText:
    //     "With global commitment, everyone can have access to clean water, health, and opportunity. Together, we can turn this vision into reality.",
    //   backgroundImage: "/images/bright-sustainable-world.jpg",
    //   lottieAnimation: "/animations/globe-with-water-droplets.lottie",
    // },
  ],
};
interface QuizQuestion {
  type: "single" | "multiple";
  question: string;
  correctAnswers: string[];
  options: string[];
}

interface InfographicPageProps {
  headerData: {
    newsTitle: string;
    newsContent: string;
    mainTitle: string;
    mainSubtitle: string;
    backgroundColor?: string;
    newsBannerColor?: string;
    illustrationComponent?: React.ReactNode;
  };
  targetsData: {
    title: string;
    subtitle: string;
    targets: Target[];
    iconSrc?: string;
  };
  quizData?: {
    title: string;
    questions: QuizQuestion[];
  };
  gameData?: {
    title: string;
    cardPairs: { id: number; imageUrl: string }[];
  };
  ScrollComponent?: React.ComponentType<{ targetSectionId: string }>;
}

export const InfographicPage: React.FC<InfographicPageProps> = ({
  headerData,
  targetsData,
  quizData,
  gameData,
  ScrollComponent,
}) => {
  return (
    <div className="infographic-page relative">
      <div id="header-section">
        <HeaderSection {...headerData} />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">SDG 6 Story App</h1>
        <SDG6StoryComponent
          game={{
            slides: [
              {
                headline:
                  "Meet Lina, a girl who dreams of a world with clean water for everyone.",
                supportingText:
                  "In her village, water is as precious as gold. Every morning, Lina and her mother walk miles to fetch water from a small, shrinking pond.",
                backgroundImage:
                  "https://assetsio.gnwcdn.com/minecraft-village.png?width=880&quality=80&format=jpg&dpr=2&auto=webp",
                lottieAnimation:
                  "https://lottie.host/a5e96f7b-116f-4a0e-8758-6008b24d8e2c/pGpgJPrl5b.json",
                alignment: "left",
              },
              {
                headline: "The Long Walk",
                supportingText:
                  "For Lina, this journey takes hours each day. She dreams of going to school, but without water nearby, her education takes a backseat.",
                backgroundImage:
                  "https://www.lifewire.com/thmb/OZU721mZP56vjTDoCPT1VGPn5R8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/minecraft-e1cc2d22fbd64c9d921310ed9b82a0fe.jpg",
                lottieAnimation:
                  "https://lottie.host/81eb9c04-7aa7-41f6-9096-6eee62939447/S43W3A0jTQ.json",
                alignment: "right",
              },
            ],
          }}
        />
      </div>
      {/* <SDG6StoryComponent game={gameData} />; */}
      <div className="my-8">
        <SDG6Carousel
          targets={[
            {
              title: "Target 6.1: Safe and Affordable Drinking Water",
              description:
                "By 2030, achieve universal and equitable access to safe and affordable drinking water for all.",
              keywords: [
                "safe drinking water",
                "affordable",
                "universal access",
              ],
              action: { link: "https://example.com/target-6-1-action" },
            },
            // ... other targets
          ]}
          icons={["🚰", "🚽", "💧", "🌊", "🌿", "🏞️", "🤝", "👥"]}
          progressData={[70, 60, 50, 40, 30, 20, 10, 5]}
        />
      </div>
      <TargetsSection {...targetsData} />
      {quizData && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">{quizData.title}</h2>
          <QuizSection questions={quizData.questions} />
        </div>
      )}
      {gameData && (
        <div className="my-8">
          <ImageMatchingGame
            title={gameData.title}
            cardPairs={gameData.cardPairs}
          />
        </div>
      )}
      <div className="my-8">
        <WaterResourceManagementGame
          title={gameData.title}
          cardPairs={gameData.cardPairs}
        />
      </div>
      <div className="my-8">
        <ScaleTheServices
          title={gameData.title}
          cardPairs={gameData.cardPairs}
        />
      </div>
      {ScrollComponent && <ScrollComponent targetSectionId="header-section" />}
    </div>
  );
};

export default InfographicPage;
