const KEY = "ai_recruiter_analysis_history";
const MAX = 50;

function safeParse(raw) {
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function getAnalysisHistory() {
  return safeParse(localStorage.getItem(KEY));
}

export function appendAnalysisRecord(payload) {
  const list = getAnalysisHistory();
  const record = {
    id: crypto.randomUUID(),
    at: new Date().toISOString(),
    candidateName: payload.candidateName || "Candidate",
    matchScore: Number(payload.matchScore),
    suspicion: Number(payload.suspicion),
    decision: String(payload.decision || "—"),
  };
  const next = [record, ...list].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(next));
  return record;
}

export function getDashboardStats() {
  const list = getAnalysisHistory();
  const total = list.length;
  const scores = list
    .map((r) => r.matchScore)
    .filter((n) => Number.isFinite(n));
  const avgMatch =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : null;
  const highRisk = list.filter(
    (r) => Number.isFinite(r.suspicion) && r.suspicion >= 60
  ).length;
  return { total, avgMatch, highRisk };
}
