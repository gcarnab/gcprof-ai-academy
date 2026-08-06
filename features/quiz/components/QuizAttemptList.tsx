import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { AttemptWithUser } from "../hooks/useQuizAttemptsFilter";

interface QuizAttemptListProps {
  activeTab: "pending" | "graded";
  filteredAttemptsCount: number;
  paginatedAttempts: AttemptWithUser[];
  selectedAttemptId: string | null;
  onSelectAttempt: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function QuizAttemptList({
  activeTab,
  filteredAttemptsCount,
  paginatedAttempts,
  selectedAttemptId,
  onSelectAttempt,
  currentPage,
  totalPages,
  onPageChange,
}: QuizAttemptListProps) {
  return (
    <div className="space-y-4">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block px-1">
        {activeTab === "pending"
          ? "Sottomissioni pendenti"
          : "Storico valutazioni"}
      </span>

      {filteredAttemptsCount === 0 && (
        <Card className="p-6 text-center border-dashed">
          <p className="text-sm text-muted-foreground">
            {activeTab === "pending"
              ? "Nessun tentativo in attesa di correzione."
              : "Nessun compito ancora corretto."}
          </p>
        </Card>
      )}

      <div className="space-y-3 min-h-[320px]">
        {paginatedAttempts.map((attempt) => {
          const studentName =
            `${attempt.profile?.firstName || ""} ${attempt.profile?.lastName || ""}`.trim() ||
            attempt.studentEmail;

          return (
            <Card
              key={attempt.id}
              className={`cursor-pointer transition-all border hover:border-primary/50 ${
                selectedAttemptId === attempt.id
                  ? "ring-2 ring-primary border-primary"
                  : "bg-card"
              }`}
              onClick={() => onSelectAttempt(attempt.id)}
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm font-medium min-w-0">
                    <User className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="truncate" title={studentName}>
                      {studentName}
                    </span>
                  </div>
                  <BadgeParziale
                    autoScore={attempt.autoScore}
                    status={attempt.status}
                    finalScore={attempt.finalScore ?? 0}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-xs text-muted-foreground space-y-1">
                <div className="flex items-center justify-between">
                  <span className="truncate">{attempt.studentEmail}</span>
                  <Badge
                    variant={
                      attempt.profile?.userType === "SCHOOL_STUDENT"
                        ? "default"
                        : "secondary"
                    }
                    className="text-[10px] px-1.5 py-0 h-4 shrink-0"
                  >
                    {attempt.profile?.userType === "SCHOOL_STUDENT"
                      ? "Scuola"
                      : "Esterno"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] border-t border-border/50">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {attempt.completedAt
                      ? new Date(attempt.completedAt).toLocaleDateString(
                          "it-IT",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "N/D"}
                  </div>
                  {attempt.profile?.section && (
                    <span className="font-semibold text-foreground">
                      Sez. {attempt.profile.section}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-xs text-muted-foreground">
            Pagina {currentPage} di {totalPages}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function BadgeParziale({
  autoScore,
  status,
  finalScore,
}: {
  autoScore: number;
  status: string;
  finalScore: number;
}) {
  if (status.toLowerCase() === "graded") {
    return (
      <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:text-green-400 border border-green-500/20 shrink-0">
        {finalScore.toFixed(2)} / 10
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:text-yellow-400 border border-yellow-500/20 shrink-0">
      Parziale: {autoScore.toFixed(2)} pt
    </span>
  );
}