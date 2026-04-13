import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const email = localStorage.getItem("userEmail") || "—";

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login", { replace: true });
  }

  const sectionTitle =
    "text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-slate-500";

  return (
    <div className="mx-auto max-w-2xl animate-fade-in-up space-y-8" style={{ opacity: 0 }}>
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-ink dark:text-white">
          Settings
        </h1>
        <p className="mt-2 text-sm text-muted dark:text-slate-400">
          Workspace preferences, appearance, and usage. Changes apply immediately on this device.
        </p>
      </div>

      <section className="rounded-card border border-slate-100/90 bg-white/90 p-6 shadow-card backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <p className={sectionTitle}>Profile</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-md shadow-indigo-500/30">
            {email !== "—" ? email.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-ink dark:text-white">Signed in as</p>
            <p className="truncate text-sm text-muted dark:text-slate-400">{email}</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted dark:text-slate-500">
          Profile sync with an identity provider is not configured in this build.
        </p>
      </section>

      <section className="rounded-card border border-slate-100/90 bg-white/90 p-6 shadow-card backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <p className={sectionTitle}>Appearance</p>
        <p className="mt-1 text-sm text-muted dark:text-slate-400">Theme</p>
        <div className="mt-4 inline-flex rounded-xl border border-slate-200 bg-slate-50/80 p-1 dark:border-slate-700 dark:bg-slate-800/80">
          {[
            { id: "light", label: "Light" },
            { id: "dark", label: "Dark" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTheme(opt.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                theme === opt.id
                  ? "bg-white text-ink shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-muted hover:text-ink dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-card border border-slate-100/90 bg-white/90 p-6 shadow-card backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <p className={sectionTitle}>API usage</p>
        <p className="mt-1 text-sm text-muted dark:text-slate-400">
          Model calls are metered on the server. This client shows a placeholder quota bar.
        </p>
        <div className="mt-5">
          <div className="flex justify-between text-xs font-medium text-muted dark:text-slate-500">
            <span>Included tier</span>
            <span>Demo · not billing-linked</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full w-[38%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
            />
          </div>
          <p className="mt-2 text-xs text-muted dark:text-slate-500">
            Connect billing in a future release to track spend and rate limits.
          </p>
        </div>
      </section>

      <section className="rounded-card border border-red-100/90 bg-red-50/40 p-6 dark:border-red-900/40 dark:bg-red-950/20">
        <p className={sectionTitle}>Session</p>
        <p className="mt-2 text-sm text-muted dark:text-slate-400">
          Sign out on this device. You will need to authenticate again to access analyses.
        </p>
        <button
          type="button"
          onClick={logout}
          className="mt-4 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/60"
        >
          Log out
        </button>
      </section>
    </div>
  );
}
