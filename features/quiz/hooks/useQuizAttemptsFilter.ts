import { useState, useMemo, useEffect } from "react";
import { QuizAttempt } from "@/features/quiz/domain/QuizAttempt";
import { StudentProfile } from "../types/quizReview";

export interface AttemptWithUser extends QuizAttempt {
  studentEmail: string;
  profile: StudentProfile;
}

interface UseQuizAttemptsFilterOptions {
  attemptsList: AttemptWithUser[];
  pageSize?: number;
}

export function useQuizAttemptsFilter({
  attemptsList,
  pageSize = 8,
}: UseQuizAttemptsFilterOptions) {
  const [activeTab, setActiveTab] = useState<"pending" | "graded">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState<string>("ALL");
  const [sectionFilter, setSectionFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Estrazione sezioni uniche presenti per il filtro
  const availableSections = useMemo(() => {
    const sections = new Set<string>();
    attemptsList.forEach((a) => {
      if (a.profile?.section) sections.add(a.profile.section);
    });
    return Array.from(sections);
  }, [attemptsList]);

  // Conteggi totali per i tab
  const pendingAttemptsCount = useMemo(
    () => attemptsList.filter((a) => a.status.toLowerCase() === "submitted").length,
    [attemptsList]
  );

  const gradedAttemptsCount = useMemo(
    () => attemptsList.filter((a) => a.status.toLowerCase() === "graded").length,
    [attemptsList]
  );

  // Filtraggio dinamico tentativi
  const filteredAttempts = useMemo(() => {
    return attemptsList.filter((attempt) => {
      const statusLower = attempt.status.toLowerCase();
      const matchesTab =
        activeTab === "pending"
          ? statusLower === "submitted"
          : statusLower === "graded";

      if (!matchesTab) return false;

      if (userTypeFilter !== "ALL" && attempt.profile?.userType !== userTypeFilter) {
        return false;
      }

      if (sectionFilter !== "ALL" && attempt.profile?.section !== sectionFilter) {
        return false;
      }

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const fullName = `${attempt.profile?.firstName || ""} ${attempt.profile?.lastName || ""}`.toLowerCase();
        const email = (attempt.studentEmail || attempt.profile?.email || "").toLowerCase();
        const studyPath = (attempt.profile?.studyPath || "").toLowerCase();

        if (
          !fullName.includes(query) &&
          !email.includes(query) &&
          !studyPath.includes(query)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [attemptsList, activeTab, userTypeFilter, sectionFilter, searchQuery]);

  // Calcolo Paginazione
  const totalPages = Math.ceil(filteredAttempts.length / pageSize) || 1;

  const paginatedAttempts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAttempts.slice(start, start + pageSize);
  }, [filteredAttempts, currentPage, pageSize]);

  // Reset pagina al cambio tab
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    userTypeFilter,
    setUserTypeFilter,
    sectionFilter,
    setSectionFilter,
    currentPage,
    setCurrentPage,
    availableSections,
    pendingAttemptsCount,
    gradedAttemptsCount,
    filteredAttempts,
    paginatedAttempts,
    totalPages,
  };
}