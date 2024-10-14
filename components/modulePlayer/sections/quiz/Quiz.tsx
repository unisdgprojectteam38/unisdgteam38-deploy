import React, { useState, useEffect } from "react";
import { QuizSection } from "@/types/sections";

interface EditableQuizSectionComponentProps {
  section: QuizSection;
  onUpdate: (updatedSection: QuizSection) => void;
  isEditing: boolean;
}

const EditableQuizSectionComponent: React.FC<EditableQuizSectionComponentProps> = ({
  section,
  onUpdate,
  isEditing,
}) => {
  const [localSection, setLocalSection] = useState(section);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [section]);

  const handleAnswerSelect = (answer: string) => {
    if (!isEditing) {
      setSelectedAnswer(answer);
      setIsCorrect(null);
    }
  };

  const handleComplete = () => {
    if (selectedAnswer === localSection.data.correctAnswer) {
      setIsCorrect(true);
      section.onComplete();
    } else {
      setIsCorrect(false);
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalSection({
      ...localSection,
      data: { ...localSection.data, question: e.target.value },
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...localSection.data.options];
    newOptions[index] = value;
    setLocalSection({
      ...localSection,
      data: { ...localSection.data, options: newOptions },
    });
  };

  const handleCorrectAnswerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalSection({
      ...localSection,
      data: { ...localSection.data, correctAnswer: e.target.value },
    });
  };

  const handleSave = () => {
    onUpdate(localSection);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <textarea
          value={localSection.data.question}
          onChange={handleQuestionChange}
          className="w-full mb-4 p-2 border rounded"
          placeholder="Enter question"
        />
        {localSection.data.options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            placeholder={`Option ${index + 1}`}
          />
        ))}
        <select
          value={localSection.data.correctAnswer}
          onChange={handleCorrectAnswerChange}
          className="w-full mb-4 p-2 border rounded"
        >
          {localSection.data.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save Changes
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between min-h-[468px] ${
        isCorrect === false ? "animate-shake" : ""
      }`}
      style={{ boxShadow: "rgba(40, 46, 62, 0.12) 0px 4px 16px 0px" }}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-semibold text-[#586380]">
            {section.order_id + ". " + section.title}
          </span>
          <div className="flex items-center">
            <button className="p-1 bg-gray-200 rounded-full mr-2">
              <svg
                className="w-4 h-4 text-[#586380]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828"
                />
              </svg>
            </button>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
              Let's try again
            </span>
          </div>
        </div>
        <p className="text-[20px] leading-[32.5px] mb-8 text-[#282e3e]">
          {localSection.data.question}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {localSection.data.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option)}
            className={`text-left p-4 border-2 rounded-lg flex items-center text-[#2e3856] cursor-pointer transition-colors ${
              selectedAnswer === option
                ? isCorrect === null
                  ? "bg-blue-100"
                  : option === localSection.data.correctAnswer
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
                : "border-[#edeff4] hover:bg-gray-50"
            }`}
          >
            <span className="mr-4 text-sm font-semibold text-[#939bb4]">
              {index + 1}
            </span>
            {option}
          </button>
        ))}
      </div>
      {selectedAnswer && (
        <button
          onClick={handleComplete}
          disabled={isCorrect !== null}
          className="w-full mt-6 py-3 rounded-md text-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all disabled:opacity-50"
        >
          {isCorrect === false ? "Try Again" : "Submit Answer"}
        </button>
      )}
    </div>
  );
};

export default EditableQuizSectionComponent;