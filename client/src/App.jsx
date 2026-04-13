import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Analyze from "./pages/Analyze.jsx";
import Candidates from "./pages/Candidates.jsx";
import Settings from "./pages/Settings.jsx";

function getStoredEmail() {
  return localStorage.getItem("userEmail") || "";
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout userEmail={getStoredEmail()} />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="analyze" element={<Analyze />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
