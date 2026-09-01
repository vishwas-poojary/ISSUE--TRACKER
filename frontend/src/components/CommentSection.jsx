import { useEffect, useState } from "react";
import api from "../api/axios";

const initials = (name = "?") =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const CommentSection = ({ issueId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const { data } = await api.get(`/issues/${issueId}/comments`);
      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const { data } = await api.post(`/issues/${issueId}/comments`, { text });
      setComments((prev) => [...prev, data]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="panel comment-section">
      <div className="panel-head">
        <h3>Discussion</h3>
        <span className="count-pill">{comments.length}</span>
      </div>
      {loading ? (
        <p className="muted">Loading comments…</p>
      ) : comments.length === 0 ? (
        <div className="empty-inline">
          <p>No comments yet. Start the thread for this issue.</p>
        </div>
      ) : (
        <ul className="comment-list">
          {comments.map((c) => (
            <li key={c._id} className="comment-item">
              <span className="avatar sm" aria-hidden="true">
                {initials(c.user?.name)}
              </span>
              <div>
                <div className="comment-meta">
                  <strong>{c.user?.name}</strong>
                  <span className="comment-date">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
                <p>{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Write a comment…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-sm">
          Post
        </button>
      </form>
    </section>
  );
};

export default CommentSection;
