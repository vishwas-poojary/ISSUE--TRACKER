import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import DashboardCards from "../components/DashboardCards";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/dashboard");
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <p className="center-text muted">Loading dashboard…</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="page-container">
        <p className="center-text">Couldn’t load dashboard. Try again.</p>
      </div>
    );
  }

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="page-container">
      <header className="page-hero">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Good to see you, {firstName}</h1>
          <p className="lede">
            Here’s how the board looks right now. Jump into open work or file
            something new.
          </p>
        </div>
        <div className="hero-actions">
          <Link to="/issues" className="btn btn-ghost">
            View issues
          </Link>
          <Link to="/issues/new" className="btn">
            New issue
          </Link>
        </div>
      </header>
      <DashboardCards stats={stats} />
    </div>
  );
};

export default Dashboard;
