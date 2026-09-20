"use client";

import { useState } from "react";
import { AssignQuizModal } from "./AssignQuizModal";
import { Button } from "@/components/ui/button";

interface AssignQuizButtonProps {
  quizId: string;
  quizTitle: string;
  courses: Array<{
    id: string;
    title: string;
  }>;
}

export default function AssignQuizButton({
  quizId,
  quizTitle,
  courses,
}: AssignQuizButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        Assegna
      </Button>

      {isOpen && (
        <AssignQuizModal
          isOpen={isOpen}
          quizId={quizId}
          quizTitle={quizTitle}
          courses={courses}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

