import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client.js";
import { appendAnalysisRecord } from "../lib/analysisHistory.js";
import AiProcessingPanel from "../components/AiProcessingPanel.jsx";
import ResultCards from "../components/ResultCards.jsx";

function SparkIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4l1.4-1.4M17 7l1.4-1.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export default function Analyze() {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);

  async function handleAnalyze(e) {
    e.preventDefault();
    setError("");
    setAnalysis(null);
    setLoading(true);
    const token = (localStorage.getItem("token") || "").trim();
    console.log("[analyze] starting request with token:", token);
    try {
      const { data } = await api.post("/analyze", {
        resumeText: resumeText.trim(),
        jobDescription: jobDescription.trim(),
      });
      console.log("[analyze] API response:", data);
      if (!data.success) {
        setError("Analysis did not complete. Please try again.");
        return;
      }
      setAnalysis(data);

      const name =
        data.parsed?.name && String(data.parsed.name).trim()
          ? String(data.parsed.name).trim()
          : "Candidate";
      appendAnalysisRecord({
        candidateName: name,
        matchScore: data.evaluation?.match_score,
        suspicion: data.fake?.suspicion_score,
        decision: data.decision?.decision,
      });
    } catch (err) {
      console.error("[analyze] API error:", err);
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 800);
        return;
      }
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  const canSubmit =
    resumeText.trim().length > 0 && jobDescription.trim().length > 0 && !loading;

  const inputClass =
    "mt-1.5 w-full resize-y rounded-xl border border-slate-200/90 bg-white/80 px-3 py-2.5 text-sm text-ink shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-400/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-400/25";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="mb-5 shrink-0 lg:mb-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/25">
            <SparkIcon className="h-4 w-4" />
          </span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-ink dark:text-white sm:text-xl">
              Analyze resume
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted dark:text-slate-400">
              Run the intelligence pipeline: structured parse, fit scoring, risk
              signals, decision synthesis, and interview prompts—side by side with
              your inputs.
            </p>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Left: sticky input */}
        <div className="w-full shrink-0 lg:w-[min(100%,440px)] lg:max-w-[440px]">
          <div className="lg:sticky lg:top-0 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2 scrollbar-premium">
            <div className="glass-panel rounded-card p-6 shadow-lift transition-shadow duration-200 hover:shadow-lift dark:shadow-none">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-ink dark:text-white">
                    Input
                  </h2>
                  <p className="mt-0.5 text-xs text-muted dark:text-slate-400">
                    Stays visible while you review results
                  </p>
                </div>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  Live
                </span>
              </div>

              <form onSubmit={handleAnalyze} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="resume"
                    className="text-xs font-medium text-muted dark:text-slate-400"
                  >
                    Resume
                  </label>
                  <textarea
                    id="resume"
                    rows={9}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste candidate resume text…"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="job"
                    className="text-xs font-medium text-muted dark:text-slate-400"
                  >
                    Job description
                  </label>
                  <textarea
                    id="job"
                    rows={9}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste role requirements and responsibilities…"
                    className={inputClass}
                  />
                </div>

                {error ? (
                  <p
                    className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-sm text-danger dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Running analysis…
                    </>
                  ) : (
                    <>
                      <SparkIcon className="h-4 w-4 opacity-90" />
                      Run AI analysis
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right: scrollable results */}
        <div className="min-h-0 flex-1 lg:overflow-y-auto lg:pr-1 scrollbar-premium">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-ink dark:text-white">
              Intelligence output
            </h2>
            {analysis ? (
              <span className="text-xs font-medium text-muted dark:text-slate-500">
                Scroll to review each signal
              </span>
            ) : null}
          </div>

          {loading ? (
            <AiProcessingPanel active />
          ) : analysis ? (
            <ResultCards analysis={analysis} />
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-card border border-dashed border-slate-200/90 bg-white/50 p-10 text-center shadow-inner dark:border-slate-700 dark:bg-slate-900/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
                <SparkIcon className="h-6 w-6 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="mt-4 max-w-xs text-sm text-muted dark:text-slate-400">
                Results stream into this panel after analysis. Your input column
                stays fixed for quick edits and re-runs.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
