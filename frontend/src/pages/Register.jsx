import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-shell">
      <aside className="auth-panel">
        <Link to="/login" className="navbar-brand light">
          <span className="brand-mark" aria-hidden="true" />
          Issues
        </Link>
        <h1>Start a board your team will actually use.</h1>
        <p>
          Register in seconds. Create issues, assign owners, and keep status
          visible — no setup maze.
        </p>
      </aside>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <p className="eyebrow">Get started</p>
          <h2>Create your account</h2>
          {error && <p className="error-text">{error}</p>}
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            placeholder="Alex Rivera"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@team.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <button type="submit" className="btn btn-block" disabled={busy}>
            {busy ? "Creating account…" : "Create account"}
          </button>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
