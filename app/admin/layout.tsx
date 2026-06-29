"use client";

import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-100 font-sans antialiased">
        {children}
      </div>
    </ProtectedRoute>
  );
}