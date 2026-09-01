import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import CommentSection from "../components/CommentSection";

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

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIssue = async () => {
    try {
      const { data } = await api.get(`/issues/${id}`);
      setIssue(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this issue? Comments will be removed too.")) return;
    await api.delete(`/issues/${id}`);
    navigate("/issues");
  };

  const handleStatusChange = async (e) => {
    const { data } = await api.put(`/issues/${id}`, { status: e.target.value });
    setIssue(data);
  };

  if (loading) {
    return (
      <div className="page-container">
        <p className="center-text muted">Loading issue…</p>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h3>Issue not found</h3>
          <Link to="/issues" className="btn">
            Back to issues
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/issues" className="back-link">
        ← All issues
      </Link>

      <div className="detail-layout">
        <div>
          <div className="issue-detail-header">
            <div>
              <span className={`badge ${statusClass[issue.status]}`}>{issue.status}</span>
              <h1>{issue.title}</h1>
            </div>
            <div className="issue-detail-actions">
              <Link to={`/issues/${id}/edit`} className="btn btn-ghost btn-sm">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-sm btn-danger">
                Delete
              </button>
            </div>
          </div>
          <div className="panel">
            <h3 className="panel-title">Description</h3>
            <p className="issue-detail-desc">{issue.description}</p>
          </div>
          <CommentSection issueId={id} />
        </div>

        <aside className="panel issue-detail-meta">
          <h3 className="panel-title">Details</h3>
          <label htmlFor="status">Status</label>
          <select id="status" value={issue.status} onChange={handleStatusChange}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <div className="meta-row">
            <span>Priority</span>
            <span className={`prio-chip ${priorityClass[issue.priority]}`}>
              {issue.priority}
            </span>
          </div>
          <div className="meta-row">
            <span>Assignee</span>
            <strong>{issue.assignedTo?.name || "Unassigned"}</strong>
          </div>
          <div className="meta-row">
            <span>Reporter</span>
            <strong>{issue.createdBy?.name}</strong>
          </div>
          <div className="meta-row">
            <span>Created</span>
            <strong>{new Date(issue.createdAt).toLocaleString()}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default IssueDetail;
