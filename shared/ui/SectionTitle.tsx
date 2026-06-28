/**
 * ============================================================================
 * FILE: SectionTitle.tsx
 * FEATURE: Shared UI
 * ----------------------------------------------------------------------------
 * SCOPO
 * Visualizza il titolo e il sottotitolo di una sezione mantenendo
 * uniformità grafica in tutta la piattaforma.
 *
 * RESPONSABILITÀ
 * - Mostrare il titolo principale
 * - Mostrare il sottotitolo (opzionale)
 * - Uniformare la UI
 * ============================================================================
 */

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold text-gray-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}