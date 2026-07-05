import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";


export default function Page() {
  return (
    <Suspense fallback={<div>Caricamento link di reset...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}