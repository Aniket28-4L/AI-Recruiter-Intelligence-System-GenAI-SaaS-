import { useState } from "react";

function asArray(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value == null) return [];
  return [value].filter(Boolean);
}

function matchScoreStyles(score) {
  const n = Number(score);
  if (Number.isNaN(n)) {
    return {
      text: "text-slate-500 dark:text-slate-400",
      bar: "bg-slate-300 dark:bg-slate-600",
      label: "Unknown",
      chip: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    };
  }
  if (n >= 70) {
    return {
      text: "text-emerald-600 dark:text-emerald-400",
      bar: "bg-gradient-to-r from-emerald-500 to-teal-500",
      label: "Strong fit",
      chip: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
    };
  }
  if (n >= 40) {
    return {
      text: "text-amber-600 dark:text-amber-400",
      bar: "bg-gradient-to-r from-amber-400 to-orange-500",
      label: "Moderate fit",
      chip: "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    };
  }
  return {
    text: "text-red-600 dark:text-red-400",
    bar: "bg-gradient-to-r from-red-500 to-rose-500",
    label: "Weak fit",
    chip: "bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300",
  };
}

function suspicionStyles(score) {
  const n = Number(score);
  if (Number.isNaN(n)) {
    return {
      text: "text-slate-500",
      bar: "bg-slate-200 dark:bg-slate-700",
      chip: "bg-slate-100 dark:bg-slate-800",
    };
  }
  if (n >= 60) {
    return {
      text: "text-red-600 dark:text-red-400",
      bar: "bg-gradient-to-r from-red-500 to-orange-500",
      chip: "bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300",
    };
  }
  if (n >= 30) {
    return {
      text: "text-amber-600 dark:text-amber-400",
      bar: "bg-gradient-to-r from-amber-400 to-amber-600",
      chip: "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
    };
  }
  return {
    text: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    chip: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
  };
}

function decisionBadge(decision) {
  const d = String(decision || "").toLowerCase();
  if (d.includes("hire") && !d.includes("maybe")) {
    return {
      label: decision || "Hire",
      className:
        "bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-1 ring-emerald-500/30",
    };
  }
  if (d.includes("maybe")) {
    return {
      label: decision || "Maybe",
      className:
        "bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-1 ring-amber-400/30",
    };
  }
  if (d.includes("reject")) {
    return {
      label: decision || "Reject",
      className:
        "bg-red-600 text-white shadow-md shadow-red-600/25 ring-1 ring-red-500/30",
    };
  }
  return {
    label: decision || "—",
    className:
      "bg-slate-700 text-white dark:bg-slate-600 ring-1 ring-slate-500/20",
  };
}

function List({ items, empty }) {
  const list = asArray(items);
  if (!list.length) {
    return <p className="mt-2 text-sm text-muted dark:text-slate-500">{empty}</p>;
  }
  return (
    <ul className="mt-2 space-y-2 border-l-2 border-indigo-100 pl-4 dark:border-indigo-500/20">
      {list.map((item, i) => (
        <li key={i} className="text-sm leading-relaxed text-ink dark:text-slate-200">
          {typeof item === "string" ? item : JSON.stringify(item)}
        </li>
      ))}
    </ul>
  );
}

function CardFrame({ icon, iconBg, title, subtitle, children, delay = 0, borderClass = "" }) {
  return (
    <section
      className={`animate-fade-in-up rounded-card border bg-white/90 p-5 shadow-card backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift dark:bg-slate-900/80 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-black/20 ${borderClass}`}
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      <div className="flex gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-ink dark:text-white">{title}</h2>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-muted dark:text-slate-400">{subtitle}</p>
          ) : null}
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function ResultCards({ analysis }) {
  const [interviewOpen, setInterviewOpen] = useState(false);

  if (!analysis) return null;

  const { parsed, evaluation, fake, decision, interview } = analysis;
  const name =
    parsed?.name && String(parsed.name).trim()
      ? String(parsed.name).trim()
      : "Candidate";
  const skills = asArray(parsed?.skills);
  const matchScore = evaluation?.match_score;
  const match = matchScoreStyles(matchScore);
  const suspicion = fake?.suspicion_score;
  const sus = suspicionStyles(suspicion);
  const badge = decisionBadge(decision?.decision);
  const technical = asArray(interview?.technical_questions);
  const behavioral = asArray(interview?.behavioral_questions);

  return (
    <div className="space-y-4 pb-8">
      <CardFrame
        delay={0}
        borderClass="border-slate-100 dark:border-slate-800"
        title="Candidate summary"
        subtitle="Structured extraction from resume"
        iconBg="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300"
        icon={
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        <p className="text-base font-semibold text-ink dark:text-white">{name}</p>
        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-slate-500">
            Skills
          </p>
          {skills.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-ink ring-1 ring-slate-100 transition hover:ring-indigo-200 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700 dark:hover:ring-indigo-500/30"
                >
                  {String(s)}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted dark:text-slate-500">No skills extracted</p>
          )}
        </div>
      </CardFrame>

      <CardFrame
        delay={80}
        borderClass="border-indigo-100/80 dark:border-indigo-500/20"
        title="Match score"
        subtitle="Role alignment"
        iconBg="bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"
        icon={
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-end gap-2">
            <span className={`text-4xl font-semibold tabular-nums ${match.text}`}>
              {Number.isFinite(Number(matchScore))
                ? `${Math.round(Number(matchScore))}%`
                : "—"}
            </span>
            <span
              className={`mb-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${match.chip}`}
            >
              {match.label}
            </span>
          </div>
        </div>
        <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${match.bar}`}
            style={{
              width: `${Math.min(100, Math.max(0, Number(matchScore) || 0))}%`,
            }}
          />
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
            <p className="text-xs font-semibold text-muted dark:text-slate-400">Matched</p>
            <List items={evaluation?.matched_skills} empty="None listed" />
          </div>
          <div className="rounded-xl bg-slate-50/80 p-4 dark:bg-slate-800/50">
            <p className="text-xs font-semibold text-muted dark:text-slate-400">Gaps</p>
            <List items={evaluation?.missing_skills} empty="None listed" />
          </div>
        </div>
      </CardFrame>

      <CardFrame
        delay={160}
        borderClass="border-amber-100/80 dark:border-amber-500/15"
        title="Risk analysis"
        subtitle="Consistency & exaggeration"
        iconBg="bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300"
        icon={
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M12 9v4M12 17h.01M10.3 3.3L1.8 18a1 1 0 00.9 1.5h18.6a1 1 0 00.9-1.5L13.7 3.3a1 1 0 00-1.8 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-end gap-2">
            <span className={`text-3xl font-semibold tabular-nums ${sus.text}`}>
              {Number.isFinite(Number(suspicion))
                ? `${Math.round(Number(suspicion))}%`
                : "—"}
            </span>
            <span className={`mb-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ${sus.chip}`}>
              Suspicion
            </span>
          </div>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${sus.bar}`}
            style={{
              width: `${Math.min(100, Math.max(0, Number(suspicion) || 0))}%`,
            }}
          />
        </div>
        <div className="mt-5">
          <p className="text-xs font-semibold text-muted dark:text-slate-400">Flags</p>
          <List items={fake?.flags} empty="No flags reported" />
        </div>
        {asArray(fake?.explanations).length ? (
          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            <p className="text-xs font-semibold text-muted dark:text-slate-400">Notes</p>
            <List items={fake?.explanations} empty="" />
          </div>
        ) : null}
      </CardFrame>

      <CardFrame
        delay={240}
        borderClass="border-slate-200 dark:border-slate-700"
        title="Final decision"
        subtitle="Recommended action"
        iconBg="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
        icon={
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M9 12l2 2 4-4M7 12h10a5 5 0 005-5V5a2 2 0 00-2-2H4a2 2 0 00-2 2v2a5 5 0 005 5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center rounded-lg px-4 py-1.5 text-sm font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
          {Number.isFinite(Number(decision?.final_score)) ? (
            <span className="text-xs font-medium text-muted dark:text-slate-400">
              Composite {Math.round(Number(decision.final_score))}%
            </span>
          ) : null}
        </div>
        <div className="mt-5">
          <p className="text-xs font-semibold text-muted dark:text-slate-400">Reasoning</p>
          <List items={decision?.reasoning} empty="No reasoning provided" />
        </div>
        {asArray(decision?.risk_factors).length ? (
          <div className="mt-4">
            <p className="text-xs font-semibold text-muted dark:text-slate-400">Risk factors</p>
            <List items={decision?.risk_factors} empty="" />
          </div>
        ) : null}
      </CardFrame>

      <CardFrame
        delay={320}
        borderClass="border-indigo-100 dark:border-indigo-500/20"
        title="Interview questions"
        subtitle="Technical & behavioral"
        iconBg="bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-500/15 dark:text-fuchsia-300"
        icon={
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M8 10h8M8 14h5M6 4h12a2 2 0 012 2v12l-4-3H6a2 2 0 01-2-2V6a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      >
        <button
          type="button"
          onClick={() => setInterviewOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/90 px-3 py-3 text-left text-sm font-medium text-ink transition hover:border-indigo-200 hover:bg-white dark:border-slate-700 dark:bg-slate-800/80 dark:text-white dark:hover:border-indigo-500/40"
          aria-expanded={interviewOpen}
        >
          <span>
            {interviewOpen ? "Hide questions" : "Expand questions"}
            <span className="ml-2 font-normal text-muted dark:text-slate-400">
              {technical.length + behavioral.length} total
            </span>
          </span>
          <svg
            className={`h-4 w-4 text-muted transition-transform duration-200 dark:text-slate-500 ${
              interviewOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            interviewOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-6 border-t border-slate-100 pt-5 dark:border-slate-800">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-slate-500">
                  Technical
                </p>
                <List items={technical} empty="No technical questions" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-slate-500">
                  Behavioral
                </p>
                <List items={behavioral} empty="No behavioral questions" />
              </div>
            </div>
          </div>
        </div>
      </CardFrame>
    </div>
  );
}
