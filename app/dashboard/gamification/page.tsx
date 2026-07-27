import { getUserGamificationOverview } from "@/features/gamification/actions/gamification";
import { StudentGamificationDashboard } from "@/features/gamification/components/StudentGamificationDashboard";


export default async function StudentGamificationPage() {
  const userId = "3da0e5b9-ff82-4850-b194-9b3c6034536b"; // Recupera dalla sessione autenticata
  const res = await getUserGamificationOverview(userId);

  if (!res.success || !res.data) {
    return <div className="p-4 text-red-500">Errore nel caricamento della gamification.</div>;
  }

  return <StudentGamificationDashboard overview={res.data} />;
}