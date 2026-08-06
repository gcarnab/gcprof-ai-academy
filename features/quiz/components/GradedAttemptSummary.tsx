import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Edit } from "lucide-react";
import { AttemptWithUser } from "../hooks/useQuizAttemptsFilter";

interface GradedAttemptSummaryProps {
  selectedAttempt: AttemptWithUser;
  onEdit: () => void;
}

export function GradedAttemptSummary({
  selectedAttempt,
  onEdit,
}: GradedAttemptSummaryProps) {
  const studentFullName =
    `${selectedAttempt.profile?.firstName || ""} ${selectedAttempt.profile?.lastName || ""}`.trim() ||
    selectedAttempt.studentEmail;

  const autoScore = selectedAttempt.autoScore;
  const finalScore = selectedAttempt.finalScore ?? 0;
  const openAnswerScore = Math.max(0, finalScore - autoScore);

  return (
    <Card className="border-border bg-card relative">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="gap-2"
        >
          <Edit className="h-4 w-4" />
          Modifica
        </Button>
      </div>

      <CardHeader>
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <Award className="h-6 w-6" />
          <CardTitle className="text-xl font-bold">
            Valutazione Emessa
          </CardTitle>
        </div>
        <CardDescription>
          Riepilogo dei punteggi consolidati per l'utente{" "}
          <span className="font-semibold text-foreground">
            {studentFullName}
          </span>{" "}
          ({selectedAttempt.studentEmail})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-muted p-3 rounded-lg text-center">
            <span className="text-xs text-muted-foreground block font-medium">
              Test Chiuse
            </span>
            <span className="text-lg font-bold">
              {autoScore.toFixed(2)} / 4.00
            </span>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <span className="text-xs text-muted-foreground block font-medium">
              Voto Aperta
            </span>
            <span className="text-lg font-bold">
              {openAnswerScore.toFixed(2)} / 6.00
            </span>
          </div>
          <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg text-center text-primary">
            <span className="text-xs opacity-80 block font-bold uppercase tracking-wider">
              Voto Finale
            </span>
            <span className="text-xl font-black">
              {finalScore.toFixed(2)} / 10.00
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}