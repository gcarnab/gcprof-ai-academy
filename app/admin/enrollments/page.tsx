"use client";

import { useTransition, useState } from "react";
import { approveEnrollmentAction } from "@/features/admin/actions/approveEnrollmentAction";
import { Button } from "@/components/ui/button";

interface PendingEnrollmentProps {
  profileId: string;
  courseId: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
}

export default function PendingEnrollmentCard({
  profileId,
  courseId,
  studentName,
  studentEmail,
  courseTitle
}: PendingEnrollmentProps) {
  const [isPending, startTransition] = useTransition();
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = () => {
    startTransition(async () => {
      const result = await approveEnrollmentAction(profileId, courseId);
      
      if (result.success) {
        console.log(result.message);
        setIsApproved(true); // Nasconde o disabilita l'elemento nella UI
      } else {
        console.error(result.error || "Impossibile completare l'operazione.");
      }
    });
  };

  if (isApproved) return null; // Scompare dall'elenco una volta approvato

  return (
    <div className="p-4 border rounded-lg bg-background shadow-sm flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-foreground">{studentName}</h4>
        <p className="text-xs text-muted-foreground">{studentEmail}</p>
        <div className="mt-2 text-xs">
          <span className="text-muted-foreground">Corso richiesto: </span>
          <span className="font-medium text-blue-600 dark:text-violet-400">{courseTitle}</span>
        </div>
      </div>
      
      <Button
        onClick={handleApprove}
        disabled={isPending}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
      >
        {isPending ? "Approvazione..." : "Approva Utente"}
      </Button>
    </div>
  );
}