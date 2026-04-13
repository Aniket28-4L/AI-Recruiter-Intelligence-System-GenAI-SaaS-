import { Link } from "react-router-dom";
import { getAnalysisHistory, getDashboardStats } from "../lib/analysisHistory.js";

function formatTime(iso) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return "—";
  }
}

export default function Dashboard() {
  const { total, avgMatch, highRisk } = getDashboardStats();
  const recent = getAnalysisHistory().slice(0, 6);

  const statCards = [
    {
      title: "Total analyses",
      value: total,
      hint: "Completed in this browser",
      accent: "from-indigo-500/10 to-violet-500/5",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Avg. match score",
      value: avgMatch != null ? `${avgMatch}%` : "—",
      hint: avgMatch != null ? "Across saved runs" : "Run Analyze to populate",
      accent: "from-emerald-500/10 to-teal-500/5",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "High-risk flags",
      value: highRisk,
      hint: "Suspicion score ≥ 60%",
      accent: "from-amber-500/10 to-orange-500/5",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 9v4M12 17h.01M10.3 3.3L1.8 18a1 1 0 00.9 1.5h18.6a1 1 0 00.9-1.5L13.7 3.3a1 1 0 00-1.8 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="animate-fade-in-up space-y-10" style={{ opacity: 0 }}>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-ink dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted dark:text-slate-400">
            Signals from your local analysis history—use them to spot velocity,
            quality of fit, and risk concentration at a glance.
          </p>
        </div>
        <Link
          to="/analyze"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-lg"
        >
          New analysis
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {statCards.map((card, i) => (
          <div
            key={card.title}
            className="group relative animate-fade-in-up overflow-hidden rounded-card border border-slate-100/90 bg-white/90 p-5 shadow-card backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900/80 dark:hover:shadow-lg dark:hover:shadow-black/30"
            style={{ animationDelay: `${120 + i * 70}ms`, opacity: 0 }}
          >
            <div
              className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${card.accent} opacity-80 blur-2xl`}
            />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-slate-500">
                  {card.title}
                </p>
                <p className="mt-3 text-3xl font-semibold tabular-nums text-ink dark:text-white">
                  {card.value}
                </p>
                <p className="mt-2 text-xs text-muted dark:text-slate-500">{card.hint}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-indigo-600 ring-1 ring-slate-100 transition group-hover:scale-105 group-hover:ring-indigo-200 dark:bg-slate-800 dark:text-indigo-400 dark:ring-slate-700">
                {card.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-card border border-slate-100/90 bg-white/80 p-6 shadow-card backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-ink dark:text-white">Recent activity</h2>
          <span className="text-xs text-muted dark:text-slate-500">Stored locally</span>
        </div>
        {recent.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-200 py-12 text-center dark:border-slate-700">
            <p className="text-sm text-muted dark:text-slate-400">
              No analyses yet. Run your first resume evaluation to populate this feed.
            </p>
            <Link
              to="/analyze"
              className="mt-4 inline-block text-sm font-semibold text-accent hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Go to Analyze →
            </Link>
          </div>
        ) : (
          <ul className="mt-5 divide-y divide-slate-100 dark:divide-slate-800">
            {recent.map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40 px-2 -mx-2 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-ink dark:text-white">
                    {row.candidateName}
                  </p>
                  <p className="text-xs text-muted dark:text-slate-500">{formatTime(row.at)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Match{" "}
                    {Number.isFinite(row.matchScore) ? `${Math.round(row.matchScore)}%` : "—"}
                  </span>
                  <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    Risk{" "}
                    {Number.isFinite(row.suspicion) ? `${Math.round(row.suspicion)}%` : "—"}
                  </span>
                  <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300">
                    {row.decision}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
