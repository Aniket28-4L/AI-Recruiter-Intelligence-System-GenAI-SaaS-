import { Link } from "react-router-dom";
import LogoMark from "./LogoMark.jsx";

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  alternateHref,
  alternateLabel,
  alternatePrompt,
}) {
  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row">
      <div
        className="relative flex flex-1 flex-col justify-between overflow-hidden px-8 py-12 lg:max-w-[46%] lg:px-14 lg:py-16"
        style={{
          background:
            "linear-gradient(145deg, #0b1220 0%, #111827 42%, #1e1b4b 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl"
          aria-hidden
        />
        <div className="relative z-10">
          <Link
            to="/login"
            className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
          >
            <LogoMark
              variant="onDark"
              className="h-10 w-10 shrink-0 rounded-lg shadow-lg shadow-indigo-500/20"
            />
            <div className="text-left">
              <p className="text-sm font-semibold tracking-tight text-white">
                AI Recruiter
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-indigo-200/80">
                Hiring intelligence
              </p>
            </div>
          </Link>
          <h1 className="mt-14 max-w-md text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
            AI hiring intelligence platform
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Parse resumes, score fit, surface risk, and get interview-ready
            outputs—built for teams who need clarity, not noise.
          </p>
        </div>
        <p className="relative z-10 mt-12 text-xs text-slate-500 lg:mt-0">
          Secure workspace · Model-assisted analysis · Human decision always
        </p>
      </div>

      <div className="relative flex flex-1 items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 px-4 py-12 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.35) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />
        <div className="relative w-full max-w-md animate-fade-in-up rounded-card border border-slate-200/80 bg-white/90 p-8 shadow-lift backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/90 dark:shadow-none">
          <h2 className="text-lg font-semibold text-ink dark:text-white">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-muted dark:text-slate-400">
              {subtitle}
            </p>
          ) : null}
          <div className="mt-8">{children}</div>
          {footer ? (
            <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
              {footer}
            </div>
          ) : null}
          {alternatePrompt ? (
            <p className="mt-6 text-center text-sm text-muted dark:text-slate-400">
              {alternatePrompt}{" "}
              <Link
                to={alternateHref}
                className="font-medium text-accent transition hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {alternateLabel}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
