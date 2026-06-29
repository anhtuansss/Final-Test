import React from "react";
import { notFound } from "next/navigation";
import { getExamById } from "@/data/exams";
import Quiz from "@/components/Quiz";

interface ExamPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ExamPage({ params }: ExamPageProps) {
  const resolvedParams = await params;
  const exam = getExamById(resolvedParams.id);

  if (!exam) {
    notFound();
  }

  return <Quiz examData={exam} />;
}
