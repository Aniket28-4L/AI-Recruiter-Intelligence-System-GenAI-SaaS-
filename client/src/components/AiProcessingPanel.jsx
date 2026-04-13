import { useEffect, useState } from "react";

const STEPS = [
  { id: "parse", label: "Parsing resume…" },
  { id: "skills", label: "Evaluating skills…" },
  { id: "risk", label: "Detecting risks…" },
  { id: "decision", label: "Generating decision…" },
];

export default function AiProcessingPanel({ active }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!active) {
      setPhase(0);
      return;
    }
    setPhase(0);
    const t = setInterval(() => {
      setPhase((p) => (p < STEPS.length - 1 ? p + 1 : p));
    }, 2200);
    return () => clearInterval(t);
  }, [active]);

  if (!active) return null;

  return (
    <div className="shimmer-bg relative overflow-hidden rounded-card border border-indigo-100/80 bg-gradient-to-b from-indigo-50/90 via-white to-white p-6 shadow-glow dark:border-indigo-500/20 dark:from-indigo-950/40 dark:via-slate-900 dark:to-slate-900">
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-500/30">
            <span className="absolute inset-0 animate-pulse-soft rounded-xl bg-white/10" />
            <svg
              className="relative h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path
                d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="3.5" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-ink dark:text-white">
              AI is analyzing
            </p>
            <p className="text-xs text-muted dark:text-slate-400">
              Multi-stage pipeline running on your inputs
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {STEPS.map((step, i) => {
            const done = i < phase;
            const current = i === phase;
            return (
              <li
                key={step.id}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-all duration-300 ${
                  current
                    ? "border-indigo-200 bg-white/90 shadow-sm dark:border-indigo-500/40 dark:bg-slate-800/80"
                    : done
                      ? "border-emerald-100/80 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-950/20"
                      : "border-slate-100/80 bg-slate-50/40 opacity-60 dark:border-slate-800 dark:bg-slate-800/30"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                    done
                      ? "bg-emerald-500 text-white"
                      : current
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-200"
                        : "bg-slate-200/80 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                  }`}
                >
                  {done ? (
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : current ? (
                    <span className="h-2 w-2 animate-step-dot rounded-full bg-current" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
                  )}
                </span>
                <span
                  className={
                    current
                      ? "font-medium text-ink dark:text-white"
                      : "text-muted dark:text-slate-400"
                  }
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-700 ease-out"
            style={{
              width: `${((phase + 1) / STEPS.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
