"use client";

import { useRouter } from "next/navigation";
import CreateCourseForm from "./CreateCourseForm";
import CreateClassForm from "./CreateClassForm";
import AssignCourseClassForm from "./AssignCourseClassForm";
import ManageCategoriesForm from "./ManageCategoriesForm";
import CourseContentEditor from "./CourseContentEditor";
import { ActiveAssociationsList } from "./ActiveAssociationsList";

interface Props {
  stats: any;
}

export default function CoursesTab({ stats }: Props) {
  const router = useRouter();

  // 🔄 Forza il refresh dei Server Components per aggiornare i dati in tempo reale
  const refreshAllData = () => {
    router.refresh();
  };

  // 📊 Mappatura immediata e sicura eseguita al volo durante il rendering
  // Si aspetta un array 'course_classes' dentro stats.raw (es. popolato dal server)
  const activeAssociations = (stats?.raw?.course_classes || []).map(
    (rel: any) => {
      const course = (stats?.raw?.courses || []).find(
        (c: any) => c.id === rel.course_id,
      );
      const cls = (stats?.raw?.classes || []).find(
        (c: any) => c.id === rel.class_id,
      );

      return {
        course_id: rel.course_id,
        course_title: course?.title || "Corso non trovato",
        class_id: rel.class_id,
        class_name: cls?.name || "Classe non trovata",
      };
    },
  );

  return (
    <div className="space-y-8">
      {/* SEZIONE 1: Gestione Corsi ed Editor dei Contenuti */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border bg-background shadow p-6">
          <CreateCourseForm classes={stats.raw.classes} />
        </div>

        <div className="overflow-hidden rounded-xl border bg-background shadow p-6">
          <CourseContentEditor courses={stats.raw.courses} />
        </div>
      </div>

      {/* SEZIONE 2: Form di Configurazione e Anagrafiche (Griglia Bilanciata 1+1+1) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Colonna 1: Creazione Nuova Classe */}
        <div className="overflow-hidden rounded-xl border bg-background shadow p-6">
          <CreateClassForm />
        </div>

        {/* Colonna 2: Assegnazione Corso a Classe */}
        <div className="overflow-hidden rounded-xl border bg-background shadow p-6">
          <AssignCourseClassForm
            courses={stats.raw.courses}
            classes={stats.raw.classes}
          />
        </div>

        {/* Colonna 3: Gestione Categorie (Spostata qui per riempire il layout) */}
        <div className="overflow-hidden rounded-xl border bg-background shadow p-6">
          <ManageCategoriesForm />
        </div>
      </div>

      {/* SEZIONE 3: Gestione Associazioni (A tutta larghezza per evitare tagli di testo) */}
      <div className="overflow-hidden rounded-xl border bg-background shadow p-6 w-full">
        <h2 className="text-xl font-bold text-foreground mb-1">
          Gestione Associazioni
        </h2>
        <p className="text-xs text-muted-foreground mb-4">
          Visualizza ed elimina i collegamenti attivi tra classi e corsi.
        </p>

        <ActiveAssociationsList
          associations={activeAssociations}
          onRefresh={refreshAllData}
          allClasses={(stats?.raw?.classes || []).map((c: any) => c.name)}
          allCourses={(stats?.raw?.courses || []).map((c: any) => c.title)}
        />
      </div>
    </div>
  );
}
