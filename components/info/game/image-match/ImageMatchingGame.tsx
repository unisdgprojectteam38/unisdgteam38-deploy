import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CardData {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface ImageMatchingGameProps {
  title: string;
  cardPairs: { id: number; imageUrl: string }[];
}

export const ImageMatchingGame: React.FC<ImageMatchingGameProps> = ({ title, cardPairs }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);

  useEffect(() => {
    const shuffledCards = [...cardPairs, ...cardPairs]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
  }, [cardPairs]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;
    
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCardId, secondCardId] = newFlippedCards;
      
      if (cards[firstCardId].imageUrl === cards[secondCardId].imageUrl) {
        // Match found
        setMatchedPairs(matchedPairs + 1);
        newCards[firstCardId].isMatched = true;
        newCards[secondCardId].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          newCards[firstCardId].isFlipped = false;
          newCards[secondCardId].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const shuffledCards = cards
      .sort(() => Math.random() - 0.5)
      .map(card => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
  };

  return (
    <section className="image-matching-game bg-blue-50 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div className="flex justify-between mb-4">
        <p>Moves: {moves}</p>
        <p>Matches: {matchedPairs} / {cardPairs.length}</p>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {cards.map(card => (
          <div
            key={card.id}
            className={`aspect-square cursor-pointer transition-all duration-300 ${
              card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="relative w-full h-full">
              <div className={`absolute w-full h-full ${card.isMatched ? 'bg-green-300' : 'bg-blue-300'} flex items-center justify-center rounded-lg ${card.isFlipped || card.isMatched ? 'hidden' : ''}`}>
                ?
              </div>
              <div className={`absolute w-full h-full rounded-lg overflow-hidden ${card.isFlipped || card.isMatched ? '' : 'hidden'}`}>
                <Image
                  src={card.imageUrl}
                  alt="Card"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {matchedPairs === cardPairs.length && (
        <div className="text-center">
          <p className="text-xl font-bold mb-4">Congratulations! You've matched all pairs!</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </section>
  );
};