import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client.js";
import AuthShell from "../components/AuthShell.jsx";

const field =
  "mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2.5 text-sm text-ink shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:border-slate-700 dark:bg-slate-950/50 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-400/20";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/login", { email, password });
      console.log("[login] API response:", data);
      if (!data?.token) {
        setError("Invalid response from server.");
        return;
      }
      const token = String(data.token).trim();
      localStorage.setItem("token", token);
      console.log("[login] stored token:", token);
      localStorage.setItem("userEmail", email.trim());
      navigate("/", { replace: true });
    } catch (err) {
      console.error("[login] API error:", err);
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Unable to sign in. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Access your hiring intelligence workspace."
      alternatePrompt="No account?"
      alternateLabel="Create one"
      alternateHref="/register"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="login-email" className="text-xs font-medium text-muted dark:text-slate-400">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="text-xs font-medium text-muted dark:text-slate-400">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
          />
        </div>

        {error ? (
          <p
            className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-danger dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-ink py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg disabled:translate-y-0 disabled:opacity-60 dark:bg-indigo-600 dark:hover:bg-indigo-500"
        >
          {loading ? "Signing in…" : "Continue"}
        </button>
      </form>
    </AuthShell>
  );
}
