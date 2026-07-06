"use client";

import MailDashboard from "./MailDashboard";

interface Props {
  availableClasses: string[];
}

export default function MailTab({ availableClasses }: Props) {
  return <MailDashboard availableClasses={availableClasses} />;
}