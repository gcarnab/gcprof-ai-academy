/**
 * ============================================================================
 * COMPONENTE: CoursesHeader
 * ----------------------------------------------------------------------------
 * Header della pagina Catalogo Corsi.
 *
 * RUOLO:
 * Questo componente ha una responsabilità esclusivamente UI:
 *
 * - mostra il titolo del catalogo
 * - mostra una descrizione introduttiva
 *
 * NON gestisce:
 * - dati
 * - logica di filtraggio
 * - stato applicativo
 *
 * Questo è coerente con la filosofia:
 * "Separation of Concerns"
 * ============================================================================
 */

export default function CoursesHeader() {
  return (
    <section className="mb-10 text-center">
      
      {/* ============================================================
          TITOLO PRINCIPALE
      ============================================================ */}
      
      <h1 className="text-3xl font-bold text-foreground md:text-4xl">
        Catalogo Corsi
      </h1>

      {/* ============================================================
          DESCRIZIONE
      ============================================================ */}

      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        Esplora tutti i corsi disponibili e inizia il tuo percorso di
        apprendimento. Scegli una tecnologia e sviluppa le tue competenze
        passo dopo passo.
      </p>

    </section>
  );
}