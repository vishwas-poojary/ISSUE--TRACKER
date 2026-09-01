const cards = [
  { key: "totalIssues", label: "Total", hint: "All tracked work", tone: "ink" },
  { key: "openCount", label: "Open", hint: "Waiting to start", tone: "green" },
  { key: "inProgressCount", label: "In progress", hint: "Currently active", tone: "amber" },
  { key: "closedCount", label: "Closed", hint: "Resolved", tone: "slate" },
  { key: "assignedToMe", label: "Assigned to me", hint: "Your queue", tone: "violet" },
  { key: "createdByMe", label: "Created by me", hint: "You reported", tone: "teal" },
];

const DashboardCards = ({ stats }) => {
  return (
    <div className="dashboard-grid">
      {cards.map((card) => (
        <article key={card.key} className={`stat-card tone-${card.tone}`}>
          <p className="stat-label">{card.label}</p>
          <p className="stat-value">{stats[card.key] ?? 0}</p>
          <p className="stat-hint">{card.hint}</p>
        </article>
      ))}
    </div>
  );
};

export default DashboardCards;
