'use client';

import { useState } from 'react';
import NewsCard from './NewsCard'; // Assuming you have a NewsCard component

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

interface NewsCarouselProps {
  articles: Article[];
}

const NewsCarousel = ({ articles }: NewsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalArticles = 10;

  // Ensure exactly 10 articles
  const displayedArticles = articles.slice(0, totalArticles);

  // Calculate the current articles to display based on currentIndex
  const currentArticles = displayedArticles.slice(currentIndex, currentIndex + itemsPerPage);

  // Handle Next Page - Loop to the beginning if at the end
  const nextPage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % totalArticles);
  };

  // Handle Previous Page - Loop to the end if at the beginning
  const prevPage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? totalArticles - itemsPerPage : prevIndex - itemsPerPage
    );
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Left Arrow Button */}
      <button
        onClick={prevPage}
        className="absolute left-0 z-10 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full"
      >
        ◀
      </button>

      {/* News Cards */}
      <div className="flex justify-center gap-6 overflow-hidden w-full max-w-5xl">
        {currentArticles.map((article, index) => (
          <NewsCard
            key={index}
            img={article.urlToImage || '/default-image.jpg'} // Fallback image if none provided
            title={article.title}
            description={article.description}
            href={article.url}
          />
        ))}
      </div>

      {/* Right Arrow Button */}
      <button
        onClick={nextPage}
        className="absolute right-0 z-10 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full"
      >
        ▶
      </button>
    </div>
  );
};

export default NewsCarousel;
