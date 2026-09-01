import { Link } from "react-router-dom";

const statusClass = {
  Open: "badge-open",
  "In Progress": "badge-progress",
  Closed: "badge-closed",
};

const priorityClass = {
  Low: "prio-low",
  Medium: "prio-medium",
  High: "prio-high",
};

const IssueCard = ({ issue }) => {
  const preview =
    issue.description.length > 110
      ? `${issue.description.slice(0, 110).trim()}…`
      : issue.description;

  return (
    <Link to={`/issues/${issue._id}`} className="issue-card">
      <div className="issue-card-header">
        <h3>{issue.title}</h3>
        <span className={`badge ${statusClass[issue.status]}`}>{issue.status}</span>
      </div>
      <p className="issue-card-desc">{preview}</p>
      <div className="issue-card-footer">
        <span className={`prio-chip ${priorityClass[issue.priority]}`}>
          {issue.priority}
        </span>
        <span>{issue.assignedTo?.name || "Unassigned"}</span>
        <span className="muted">{issue.createdBy?.name}</span>
      </div>
    </Link>
  );
};

export default IssueCard;
