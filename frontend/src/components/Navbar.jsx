import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true" />
          Issues
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <div className={`navbar-links ${open ? "is-open" : ""}`}>
          {user ? (
            <>
              <NavLink to="/" end onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/issues" end onClick={() => setOpen(false)}>
                Issues
              </NavLink>
              <NavLink to="/issues/new" onClick={() => setOpen(false)}>
                New issue
              </NavLink>
              <div className="navbar-user">
                <span className="avatar" aria-hidden="true">
                  {initials}
                </span>
                <span className="navbar-user-name">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Log in
              </NavLink>
              <Link to="/register" className="btn btn-sm" onClick={() => setOpen(false)}>
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
