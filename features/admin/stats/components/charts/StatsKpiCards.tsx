type Props = {
  totalUsers: number;
  totalCourses?: number;
  totalModules?: number;
  totalLessons?: number;
  totalXp?: number;
  totalHoursActive?: number;
  averageLevel?: number;
};

export default function StatsKpiCards({
  totalUsers,
  totalCourses,
  totalModules,
  totalLessons,
  totalXp = 0,
  totalHoursActive = 0,
  averageLevel = 1,
}: Props) {
  const cards = [
    {
      title: "Utenti",
      value: totalUsers,
      icon: "👥",
    },
    {
      title: "Corsi",
      value: totalCourses ?? "--",
      icon: "📚",
    },
    {
      title: "Moduli",
      value: totalModules ?? "--",
      icon: "📖",
    },
    {
      title: "Lezioni",
      value: totalLessons ?? "--",
      icon: "🎬",
    },
    {
      title: "XP Totali",
      value: totalXp.toLocaleString("it-IT"),
      icon: "⚡",
    },
    {
      title: "Tempo Cumulato",
      value: `${totalHoursActive}h`,
      icon: "⏱️",
    },
    {
      title: "Livello Medio",
      value: averageLevel,
      icon: "🏆",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-background p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-2xl">{card.icon}</span>
            <span className="text-2xl font-bold text-blue-600">
              {card.value}
            </span>
          </div>

          <p className="mt-2 text-xs font-medium text-muted-foreground">
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
}