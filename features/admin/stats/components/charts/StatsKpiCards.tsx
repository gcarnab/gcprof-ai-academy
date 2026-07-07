type Props = {
  totalUsers: number;
  totalCourses?: number;
  totalModules?: number;
  totalLessons?: number;
};

export default function StatsKpiCards({
  totalUsers,
  totalCourses,
  totalModules,
  totalLessons,
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
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-background p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-3xl">{card.icon}</span>
            <span className="text-3xl font-bold text-blue-600">
              {card.value}
            </span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">{card.title}</p>
        </div>
      ))}
    </div>
  );
}