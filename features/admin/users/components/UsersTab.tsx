"use client";

import AdminUsersTable from "./AdminUsersTable";


interface Props {
  users: any[];
  availableClasses: string[];
}

export default function UsersTab({
  users,
  availableClasses,
}: Props) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow">

      <AdminUsersTable
        initialUsers={users}
        availableClasses={availableClasses}
      />

    </div>
  );
}