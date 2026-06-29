import React from "react";
import Link from "next/link";
import { exams } from "@/data/exams";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Danh Sách Bài Tập
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Chọn một bài kiểm tra để bắt đầu ôn tập
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => (
            <Link 
              key={exam.id} 
              href={exam.customRoute || `/exam/${exam.id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100 group"
            >
              <div className="p-6 flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {exam.totalQuestions || exam.questions?.length || 0} câu
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {exam.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {exam.description}
                </p>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <span className="text-green-600 text-sm font-medium flex items-center">
                  Bắt đầu làm bài
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}