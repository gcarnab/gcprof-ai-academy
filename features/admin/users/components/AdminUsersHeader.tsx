interface AdminUsersHeaderProps {
  totalUsers: number;
}

export default function AdminUsersHeader({
  totalUsers,
}: AdminUsersHeaderProps) {
  return (
    <div className="border-b bg-background px-6 py-5">
      <h2 className="text-xl font-semibold text-foreground">
        Gestione Utenti
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Gestisci gli account degli studenti, assegna le classi e controlla lo
        stato degli utenti.
      </p>

      <div className="mt-3 text-sm text-muted-foreground">
        Totale utenti registrati:{" "}
        <span className="font-semibold">{totalUsers}</span>
      </div>
    </div>
  );
}