"use client";

import { useState } from "react";
import AssignQuizModal from "./AssignQuizModal";
import { Button } from "@/components/ui/button";

interface AssignQuizButtonProps {
  quizId: string;
  quizTitle: string;
  courses: Array<{ id: string; title: string }>;
}

export default function AssignQuizButton({
  quizId,
  quizTitle,
  courses,
}: AssignQuizButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    {/*
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
      >
        ➕ Assegna a Corso
      </button>
       */}

      <Button size="sm" onClick={() => setIsOpen(true)}>
        Assegna
      </Button>

      {isOpen && (
        <AssignQuizModal
          quizId={quizId}
          quizTitle={quizTitle}
          courses={courses}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
