"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Exam } from "@/data/exams";

// Hàm trộn ngẫu nhiên mảng
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

interface QuizProps {
  examData: Exam;
}

export default function Quiz({ examData }: QuizProps) {
  const [isClient, setIsClient] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  // State mới để theo dõi số lần làm bài, dùng để kích hoạt random lại
  const [quizAttempt, setQuizAttempt] = useState(0);

  // Tránh lỗi hydration của Next.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Tạo câu hỏi và các đáp án nhiễu ngẫu nhiên mỗi lần quizAttempt thay đổi
  const quizQuestions = useMemo(() => {
    if (!examData.questions) return [];
    
    const allCorrectAnswers = examData.questions.map(q => q.correct);
    
    return shuffleArray(examData.questions).map((question) => {
      // Lấy 3 đáp án sai ngẫu nhiên
      const wrongAnswers = allCorrectAnswers
        .filter(ans => ans !== question.correct)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
        
      const options = shuffleArray([question.correct, ...wrongAnswers]);
      
      return {
        ...question,
        options
      };
    });
  }, [examData.questions, quizAttempt]); // Cập nhật lại bộ câu hỏi khi quizAttempt tăng lên

  // Tự động chuyển câu hỏi sau 1 giây
  useEffect(() => {
    if (selectedAnswer !== null) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 1000);

      // Dọn dẹp bộ đếm thời gian để tránh lỗi memory leak
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswer]);

  if (!isClient) return null;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isAnswered = selectedAnswer !== null;

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    if (option === currentQuestion.correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setQuizAttempt(prev => prev + 1); // Tăng số lần làm bài để kích hoạt useMemo xáo trộn lại câu hỏi
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <Link href="/" className="text-green-600 hover:text-green-800 font-medium flex items-center">
            &larr; Quay lại danh sách bài tập
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {examData.title}
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            {examData.description}
          </p>
        </div>

        {!showResults ? (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Thanh tiến trình */}
            <div className="bg-gray-200 w-full h-2">
              <div 
                className="bg-green-500 h-2 transition-all duration-300" 
                style={{ width: `${((currentQuestionIndex) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-500">
                <span>Câu {currentQuestionIndex + 1} / {quizQuestions.length}</span>
                <span>Điểm: {score}</span>
              </div>

              <div className="text-center mb-10">
                <h2 className="text-sm uppercase tracking-wider text-green-600 font-semibold mb-2">Chọn từ đồng nghĩa với</h2>
                <div className="text-4xl font-bold text-gray-900 mb-3">{currentQuestion.word}</div>
                {/* Chỉ hiển thị nghĩa sau khi đã chọn đáp án */}
                <div className={`text-lg italic transition-all duration-300 ${isAnswered ? 'text-gray-600 opacity-100' : 'opacity-0 select-none'}`}>
                  ({currentQuestion.meaning})
                </div>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((option: string, index: number) => {
                  let buttonClass = "w-full text-left px-6 py-4 rounded-xl border-2 text-lg font-medium transition-all duration-200 ";
                  
                  if (!isAnswered) {
                    buttonClass += "border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-700 bg-white";
                  } else {
                    if (option === currentQuestion.correct) {
                      buttonClass += "border-green-500 bg-green-100 text-green-800"; // Đáp án đúng
                    } else if (option === selectedAnswer) {
                      buttonClass += "border-red-500 bg-red-100 text-red-800"; // Đáp án sai mà user chọn
                    } else {
                      buttonClass += "border-gray-200 bg-gray-50 text-gray-400 opacity-50"; // Các đáp án khác
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(option)}
                      disabled={isAnswered}
                      className={buttonClass}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-colors"
                  >
                    {currentQuestionIndex + 1 === quizQuestions.length ? "Xem Kết Quả" : "Câu Tiếp Theo"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hoàn thành bài kiểm tra!</h2>
            
            <div className="my-8">
              <div className="text-[6rem] leading-none font-extrabold text-green-600">
                {score}<span className="text-4xl text-gray-400 font-medium">/{quizQuestions.length}</span>
              </div>
              <p className="mt-4 text-xl text-gray-600">
                {score === quizQuestions.length ? "Tuyệt vời! Bạn đã trả lời đúng tất cả." 
                : score >= (quizQuestions.length * 0.8) ? "Rất giỏi! Kiến thức của bạn rất vững."
                : score >= (quizQuestions.length * 0.5) ? "Làm tốt lắm! Hãy tiếp tục ôn tập thêm nhé."
                : "Cố gắng lên! Hãy làm lại bài kiểm tra để ghi nhớ tốt hơn."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md text-lg transition-colors w-full sm:w-auto"
              >
                Làm lại bài kiểm tra
              </button>
              <Link
                href="/"
                className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl shadow-md text-lg transition-colors w-full sm:w-auto inline-block"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
