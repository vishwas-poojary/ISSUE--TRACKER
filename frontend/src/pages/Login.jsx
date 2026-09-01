import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
        <h1>Track work without the noise.</h1>
        <p>
          A focused issue tracker for small teams — assign, ship, and close loops
          in one calm workspace.
        </p>
        <ul className="auth-points">
          <li>Status that stays honest</li>
          <li>Assignment without the ceremony</li>
          <li>Comments where the work lives</li>
        </ul>
      </aside>
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in to Issues</h2>
          {error && <p className="error-text">{error}</p>}
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
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-block" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
          <p className="auth-switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
