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
    <div className="space-y-12">
      
      {/* SEZIONE 1: Gestione Corsi ed Editor dei Contenuti */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Gestione Didattica
          </h2>
          <p className="text-sm text-muted-foreground">
            Crea la struttura dei nuovi corsi o modifica i moduli, le lezioni e i materiali di quelli esistenti.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <CreateCourseForm classes={stats.raw.classes} />
          </div>

          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <CourseContentEditor courses={stats.raw.courses} />
          </div>
        </div>
      </section>

      {/* SEPARATORE VISIVO */}
      <hr className="border-border" />

      {/* SEZIONE 2: Form di Configurazione e Anagrafiche */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Organizzazione e Struttura
          </h2>
          <p className="text-sm text-muted-foreground">
            Configura le categorie, gestisci i gruppi classe e distribuisci i corsi assegnandoli agli studenti.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <CreateClassForm />
          </div>

          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <AssignCourseClassForm
              courses={stats.raw.courses}
              classes={stats.raw.classes}
            />
          </div>

          <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <ManageCategoriesForm />
          </div>
        </div>
      </section>

      {/* SEPARATORE VISIVO */}
      <hr className="border-border" />

      {/* SEZIONE 3: Gestione Associazioni */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Panoramica Assegnazioni
          </h2>
          <p className="text-sm text-muted-foreground">
            Visualizza ed elimina rapidamente i collegamenti attivi tra le classi e i percorsi formativi.
          </p>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 w-full">
          <ActiveAssociationsList
            associations={activeAssociations}
            onRefresh={refreshAllData}
            allClasses={(stats?.raw?.classes || []).map((c: any) => c.name)}
            allCourses={(stats?.raw?.courses || []).map((c: any) => c.title)}
          />
        </div>
      </section>

    </div>
  );
}