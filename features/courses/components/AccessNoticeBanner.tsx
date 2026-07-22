"use client";

import LoginDialog from "@/features/auth/components/LoginDialog";
import { CourseCTA } from "./CourseCTA";

interface AccessNoticeBannerProps {
  user: any;
  isPendingUser: boolean;
  hasAccess: boolean;
  courseId: string;
  price: number;
  isEnrolling: boolean;
  enrollError: string | null;
  onFreeEnroll: () => void;
}

export function AccessNoticeBanner({
  user,
  isPendingUser,
  hasAccess,
  courseId,
  price,
  isEnrolling,
  enrollError,
  onFreeEnroll,
}: AccessNoticeBannerProps) {
  if (!user) {
    return (
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50/50 p-6 text-center shadow-sm space-y-4 mb-6">
        <span className="text-4xl">🔒</span>
        <h3 className="text-xl font-bold text-yellow-800">Autenticazione Richiesta</h3>
        <p className="text-sm text-yellow-700 max-w-md mx-auto">
          Accedi con il tuo account o registrati per completare l'iscrizione ed accedere ai moduli didattici.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3">
          <LoginDialog />
          <CourseCTA courseId={courseId} price={price} isEnrolling={isEnrolling} onFreeEnroll={onFreeEnroll} />
        </div>
      </div>
    );
  }

  if (isPendingUser) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 text-center shadow-sm mb-6">
        <span className="text-4xl">⏳</span>
        <h3 className="text-xl font-bold text-amber-800 mt-2">Account in fase di verifica</h3>
        <p className="text-sm text-amber-700 mt-2 max-w-md mx-auto">
          Il tuo account è attualmente in attesa di attivazione da parte dello staff.
        </p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="rounded-2xl border border-blue-200 bg-blue-50/60 dark:bg-blue-950/20 dark:border-blue-900/40 p-6 text-center shadow-sm mb-6 space-y-3">
        <div className="flex items-center justify-center gap-2 text-blue-800 dark:text-blue-300 font-bold text-lg">
          <span>👀</span> Visualizzazione Anteprima
        </div>
        <p className="text-sm text-blue-700 dark:text-blue-300 max-w-md mx-auto">
          Stai consultando l'anteprima del corso. Iscriviti per sbloccare l'accesso completo a tutti i moduli e le verifiche.
        </p>
        {enrollError && (
          <p className="text-sm font-semibold text-red-600 bg-red-50 p-2 rounded-lg">{enrollError}</p>
        )}
        <div className="pt-2 max-w-xs mx-auto">
          <CourseCTA courseId={courseId} price={price} isEnrolling={isEnrolling} onFreeEnroll={onFreeEnroll} />
        </div>
      </div>
    );
  }

  return null;
}