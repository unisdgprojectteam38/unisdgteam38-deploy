import React, { useState, useEffect } from "react";
import { FlashcardGameSection } from "@/types/sections";

const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const FlashcardGameComponent: React.FC<{ section: FlashcardGameSection }> = ({
  section,
}) => {
  const {
    title,
    data: { cardPairs },
    onComplete,
  } = section;
  const [cards, setCards] = useState(
    cardPairs.map((card, index) => ({
      ...card,
      id: index,
      isFlipped: false,
    }))
  );
  const [allFlipped, setAllFlipped] = useState(false);

  useEffect(() => {
    setAllFlipped(cards.every((card) => card.isFlipped));
  }, [cards]);

  const handleCardClick = (id: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  return (
    <section className="flashcard-game bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-10 text-center text-blue-800">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`relative w-full h-64 cursor-pointer transition-all duration-300 transform ${
              card.isFlipped ? "rotate-y-180" : ""
            } rounded-xl flex items-center justify-center bg-white hover:scale-105 hover:shadow-xl`}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Front Side */}
            <div
              className={`absolute w-full h-full flex items-center justify-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white backface-hidden ${
                card.isFlipped ? "opacity-0" : "opacity-100"
              } transition-opacity duration-700`}
            >
              <p className="text-lg font-medium leading-tight">
                {card.concept}
              </p>
            </div>
            {/* Back Side */}
            <div
              className={`absolute w-full h-full flex flex-col items-center justify-between p-6 bg-white text-blue-900 border-2 border-blue-200 rounded-xl backface-hidden ${
                card.isFlipped ? "opacity-100" : "opacity-0"
              } transition-opacity duration-700 transform rotate-y-180`}
            >
              <p className="text-base leading-relaxed flex-grow flex items-center">
                {card.details}
              </p>
              <div className="absolute top-2 right-2">
                <TickIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        {allFlipped ? (
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-lg text-xl font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Continue
          </button>
        ) : (
          <p className="text-lg font-medium text-blue-700">
            Flip all cards to continue
          </p>
        )}
      </div>
    </section>
  );
};

export default FlashcardGameComponent;
