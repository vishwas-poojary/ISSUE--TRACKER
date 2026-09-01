import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import IssueList from "./pages/IssueList";
import IssueForm from "./pages/IssueForm";
import IssueDetail from "./pages/IssueDetail";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className={isAuthPage ? "app auth-mode" : "app"}>
      {!isAuthPage && <Navbar />}
      <main className={user && !isAuthPage ? "app-main" : ""}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/issues"
            element={
              <PrivateRoute>
                <IssueList />
              </PrivateRoute>
            }
          />
          <Route
            path="/issues/new"
            element={
              <PrivateRoute>
                <IssueForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/issues/:id/edit"
            element={
              <PrivateRoute>
                <IssueForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/issues/:id"
            element={
              <PrivateRoute>
                <IssueDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
