import { Link } from "react-router-dom";

export default function Candidates() {
  return (
    <div className="animate-fade-in-up space-y-8" style={{ opacity: 0 }}>
      <header>
        <h1 className="text-xl font-semibold tracking-tight text-ink dark:text-white">
          Candidates
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted dark:text-slate-400">
          A dedicated pipeline view for saved candidates is on the roadmap. For now,
          use Analyze for deep intelligence and the dashboard for recent outcomes.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-card border border-slate-100/90 bg-white/90 p-6 shadow-card backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M12 3v18M3 12h18" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="mt-4 text-sm font-semibold text-ink dark:text-white">
            Run an analysis
          </h2>
          <p className="mt-2 text-sm text-muted dark:text-slate-400">
            Paste a resume and job description to generate scores, risk, and interview prompts.
          </p>
          <Link
            to="/analyze"
            className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Open Analyze →
          </Link>
        </div>
        <div className="rounded-card border border-slate-100/90 bg-white/90 p-6 shadow-card backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-lift dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="mt-4 text-sm font-semibold text-ink dark:text-white">
            Review recent outcomes
          </h2>
          <p className="mt-2 text-sm text-muted dark:text-slate-400">
            Your latest analyses appear on the dashboard with match and risk snapshots.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            View dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
