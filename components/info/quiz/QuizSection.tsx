import React, { useState } from "react";
import { X, Settings, Heart } from "lucide-react";

interface QuizQuestion {
  type: "single" | "multiple";
  question: string;
  correctAnswers: string[];
  options: string[];
}

interface QuizSectionProps {
  questions: QuizQuestion[];
}

export const QuizSection: React.FC<QuizSectionProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleAnswerSelect = (answer: string) => {
    if (questions[currentQuestion].type === "single") {
      setSelectedAnswers([answer]);
      setIsAnswered(true);
    } else {
      setSelectedAnswers((prev) => {
        if (prev.includes(answer)) {
          const newSelection = prev.filter((ans) => ans !== answer);
          setIsAnswered(newSelection.length > 0);
          return newSelection;
        } else {
          const newSelection = [...prev, answer];
          setIsAnswered(newSelection.length > 0);
          return newSelection;
        }
      });
    }
    setFeedbackMessage("");
  };

  const handleNext = () => {
    const correct =
      questions[currentQuestion].correctAnswers.sort().join(",") ===
      selectedAnswers.sort().join(",");

    if (correct) {
      setFeedbackMessage("Correct!");
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswers([]);
          setProgress(((currentQuestion + 1) / questions.length) * 100);
          setIsAnswered(false);
          setFeedbackMessage("");
        } else {
          setShowCongrats(true);
        }
      }, 1000);
    } else {
      setFeedbackMessage("Incorrect. Please try again.");
    }
  };

  return (
    <section className="quiz-section bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl text-black font-bold mb-6">Test Your Knowledge</h2>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="bg-gray-200 h-3 rounded-full">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg text-black font-semibold mb-2">Question {currentQuestion + 1}:</h3>
        <p className="text-base text-black">{questions[currentQuestion].question}</p>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`py-2 px-4 rounded-full text-center text-black transition-colors ${
              selectedAnswers.includes(option)
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-blue-100"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Feedback message */}
      {feedbackMessage && (
        <div className="mb-4 text-center">
          <p className={`text-lg font-semibold ${feedbackMessage === "Correct!" ? "text-green-500" : "text-red-500"}`}>
            {feedbackMessage}
          </p>
        </div>
      )}

      {/* Next button */}
      <div className="text-right">
        <button
          onClick={handleNext}
          className={`px-6 py-2 rounded-full text-lg font-medium transition-colors ${
            isAnswered
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!isAnswered}
        >
          {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>

      {/* Congratulations modal */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-lg mb-4">
              You've completed the quiz on water sustainability!
            </p>
            <button
              onClick={() => setShowCongrats(false)}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};