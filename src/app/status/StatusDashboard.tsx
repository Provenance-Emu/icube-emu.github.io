'use client';

import { useEffect, useState } from 'react';

interface StatusData {
  last_updated: string | null;
  run_url: string;
  html_check: { passed: boolean | null; error_count: number };
  lighthouse: {
    performance: number | null;
    accessibility: number | null;
    best_practices: number | null;
    seo: number | null;
    report_url: string;
  };
  observatory: { grade: string | null; score: number | null };
  ssl: { grade: string | null };
}

function ScoreBar({ score }: { score: number | null }) {
  if (score === null) return <span className="text-gray-500 text-sm">–</span>;
  const color = score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-gray-700 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm font-mono w-8 text-right text-white">{score}</span>
    </div>
  );
}

function GradeBadge({ grade }: { grade: string | null }) {
  if (!grade) return <span className="text-gray-500">–</span>;
  const color =
    grade === 'A+' || grade === 'A' ? 'bg-green-600' :
    grade === 'B' ? 'bg-yellow-600' :
    grade === 'C' ? 'bg-orange-600' :
    grade === 'N/A' ? 'bg-gray-600' : 'bg-red-600';
  return (
    <span className={`${color} text-white text-sm font-bold px-2 py-0.5 rounded`}>{grade}</span>
  );
}

function StatusDot({ ok }: { ok: boolean | null }) {
  if (ok === null) return <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-500" />;
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${ok ? 'bg-green-500' : 'bg-red-500'}`} />;
}

export default function StatusDashboard() {
  const [data, setData] = useState<StatusData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/status.json')
      .then(r => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const lh = data?.lighthouse;
  const lastRun = data?.last_updated
    ? new Date(data.last_updated).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : null;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Site Status</h1>
          {lastRun ? (
            <p className="mt-1 text-sm text-gray-400">
              Last audit:{' '}
              <a href={data?.run_url || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                {lastRun}
              </a>
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-500">Audit data not yet available — runs on push and weekly.</p>
          )}
        </div>

        {error && <p className="text-red-400 text-sm">Could not load status data.</p>}

        {/* Lighthouse */}
        <section className="bg-gray-900 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Lighthouse</h2>
            {lh?.report_url && (
              <a href={lh.report_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">
                Full report →
              </a>
            )}
          </div>
          <div className="space-y-3">
            {([
              ['Performance',    lh?.performance    ?? null],
              ['Accessibility',  lh?.accessibility  ?? null],
              ['Best Practices', lh?.best_practices ?? null],
              ['SEO',            lh?.seo            ?? null],
            ] as [string, number | null][]).map(([label, score]) => (
              <div key={label} className="grid grid-cols-[120px_1fr] items-center gap-4">
                <span className="text-sm text-gray-400">{label}</span>
                <ScoreBar score={score} />
              </div>
            ))}
          </div>
        </section>

        {/* HTML & Links */}
        <section className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">HTML &amp; Links</h2>
          <div className="flex items-center gap-3">
            <StatusDot ok={data?.html_check.passed ?? null} />
            <span className="text-sm text-gray-300">
              {data?.html_check.passed === null
                ? 'No data yet'
                : data?.html_check.passed
                ? 'All checks passed'
                : `${data?.html_check.error_count} error${data?.html_check.error_count !== 1 ? 's' : ''} found`}
            </span>
          </div>
        </section>

        {/* Security */}
        <section className="bg-gray-900 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">Security</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Mozilla Observatory</span>
              <div className="flex items-center gap-2">
                <GradeBadge grade={data?.observatory.grade ?? null} />
                {data?.observatory.score != null && (
                  <span className="text-xs text-gray-500">{data.observatory.score}/100</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">SSL Labs</span>
              <GradeBadge grade={data?.ssl.grade ?? null} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
