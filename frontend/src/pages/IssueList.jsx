import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import IssueCard from "../components/IssueCard";

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const params = {};
      if (status) params.status = status;
      if (search) params.search = search;
      const { data } = await api.get("/issues", { params });
      setIssues(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchIssues();
  };

  return (
    <div className="page-container">
      <header className="page-hero">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>Issues</h1>
          <p className="lede">Search, filter by status, and open any card for details.</p>
        </div>
        <Link to="/issues/new" className="btn">
          New issue
        </Link>
      </header>

      <div className="filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-ghost btn-sm">
            Search
          </button>
        </form>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <p className="muted">Loading issues…</p>
      ) : issues.length === 0 ? (
        <div className="empty-state">
          <h3>Nothing here yet</h3>
          <p>No issues match this view. Create one or clear your filters.</p>
          <Link to="/issues/new" className="btn">
            Create issue
          </Link>
        </div>
      ) : (
        <div className="issue-grid">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IssueList;
