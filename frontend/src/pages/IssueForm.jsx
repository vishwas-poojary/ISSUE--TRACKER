import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";

const IssueForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
    assignedTo: "",
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get("/users");
      setUsers(data);
    };
    fetchUsers();

    if (isEdit) {
      const fetchIssue = async () => {
        const { data } = await api.get(`/issues/${id}`);
        setForm({
          title: data.title,
          description: data.description,
          priority: data.priority,
          status: data.status,
          assignedTo: data.assignedTo?._id || "",
        });
      };
      fetchIssue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isEdit) {
        await api.put(`/issues/${id}`, form);
      } else {
        await api.post("/issues", form);
      }
      navigate("/issues");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-container narrow">
      <Link to="/issues" className="back-link">
        ← All issues
      </Link>
      <header className="page-hero compact">
        <div>
          <p className="eyebrow">{isEdit ? "Update" : "Create"}</p>
          <h1>{isEdit ? "Edit issue" : "New issue"}</h1>
          <p className="lede">
            Keep the title sharp. Description should tell someone what “done” looks like.
          </p>
        </div>
      </header>

      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit} className="issue-form panel">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="e.g. Login fails on Safari"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="6"
          placeholder="Steps, expected result, actual result…"
          value={form.description}
          onChange={handleChange}
          required
        />

        <div className="form-row">
          <div>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {isEdit && (
            <div>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="assignedTo">Assign to</label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
            >
              <option value="">Unassigned</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn" disabled={busy}>
            {busy ? "Saving…" : isEdit ? "Save changes" : "Create issue"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
