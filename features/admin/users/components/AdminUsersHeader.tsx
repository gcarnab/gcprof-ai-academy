interface AdminUsersHeaderProps {
  totalUsers: number;
}

export default function AdminUsersHeader({
  totalUsers,
}: AdminUsersHeaderProps) {
  return (
    <div className="border-b bg-white px-6 py-5">
      <h2 className="text-xl font-semibold text-gray-900">
        Gestione Utenti
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Gestisci gli account degli studenti, assegna le classi e controlla lo
        stato degli utenti.
      </p>

      <div className="mt-3 text-sm text-gray-600">
        Totale utenti registrati:{" "}
        <span className="font-semibold">{totalUsers}</span>
      </div>
    </div>
  );
}