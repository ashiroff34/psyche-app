"use client";

/**
 * /admin — Metrics Dashboard
 *
 * Acquisition diligence artifact. Protected by password in production.
 * Shows: DAU/MAU, retention cohorts, streak distribution, conversion funnel,
 * assessment completion, journal frequency.
 *
 * Data sources:
 *   - PostHog (event counts, funnels) via embed or query
 *   - Supabase materialized views (mv_dau_mau, mv_retention_cohorts)
 *     once those views are created per the dev instructions.
 *
 * Until Supabase views are live, panels show PostHog direct links so
 * diligence teams can access live data immediately.
 */

import { useState, useEffect } from "react";
import Link from "next/link";

// ─── Auth gate ────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "thyself-admin-2026";

// ─── Metric card ─────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  subtitle,
  trend,
  target,
}: {
  label: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  target?: string;
}) {
  const trendColor = trend === "up" ? "#4ade80" : trend === "down" ? "#f87171" : "#94a3b8";
  const trendArrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "20px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}>
      <span style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: "#f8fafc", lineHeight: 1 }}>{value}</span>
        {trend && (
          <span style={{ fontSize: 14, color: trendColor }}>{trendArrow}</span>
        )}
      </div>
      {subtitle && <span style={{ fontSize: 13, color: "#94a3b8" }}>{subtitle}</span>}
      {target && <span style={{ fontSize: 11, color: "#475569" }}>Target: {target}</span>}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, color: "#e2e8f0", margin: 0 }}>{title}</h2>
      {description && <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>{description}</p>}
    </div>
  );
}

// ─── PostHog embed panel ──────────────────────────────────────────────────────

function PostHogPanel({ title, description, phUrl }: { title: string; description: string; phUrl: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      padding: "20px 24px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{title}</span>
          <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0" }}>{description}</p>
        </div>
        <a
          href={phUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11,
            color: "#818cf8",
            textDecoration: "none",
            background: "rgba(129,140,248,0.1)",
            padding: "4px 10px",
            borderRadius: 6,
            border: "1px solid rgba(129,140,248,0.2)",
            whiteSpace: "nowrap",
          }}
        >
          Open in PostHog ↗
        </a>
      </div>
      <div style={{
        background: "rgba(0,0,0,0.3)",
        borderRadius: 8,
        padding: "12px 16px",
        fontSize: 12,
        color: "#475569",
        fontFamily: "monospace",
      }}>
        Connect your PostHog project at{" "}
        <span style={{ color: "#818cf8" }}>NEXT_PUBLIC_POSTHOG_KEY</span>
        {" "}to see live data here, or view directly in PostHog.
      </div>
    </div>
  );
}

// ─── Funnel step ─────────────────────────────────────────────────────────────

function FunnelStep({ label, pct, isLast }: { label: string; pct: number; isLast?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: isLast
            ? "linear-gradient(90deg, #818cf8, #a78bfa)"
            : "linear-gradient(90deg, rgba(129,140,248,0.6), rgba(167,139,250,0.6))",
          borderRadius: 2,
          transition: "width 0.6s ease",
        }} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  // Check session storage for persisted auth
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("thyself-admin-authed") === "1") {
      setAuthed(true);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("thyself-admin-authed", "1");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#0a0f1e",
      color: "#e2e8f0",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "40px 24px",
      maxWidth: 1100,
      margin: "0 auto",
    } as React.CSSProperties,
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 320, textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>Thyself Admin</div>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>Acquisition diligence dashboard</p>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Admin password"
              autoFocus
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: error ? "1px solid #f87171" : "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "#e2e8f0",
                fontSize: 14,
                outline: "none",
              }}
            />
            {error && <span style={{ fontSize: 12, color: "#f87171" }}>Incorrect password</span>}
            <button
              type="submit"
              style={{
                padding: "10px",
                borderRadius: 8,
                border: "none",
                background: "linear-gradient(135deg, #818cf8, #a78bfa)",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  const PH_BASE = "https://app.posthog.com";

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <Link href="/" style={{ fontSize: 13, color: "#475569", textDecoration: "none" }}>← App</Link>
            <span style={{ color: "#1e293b" }}>|</span>
            <span style={{ fontSize: 13, color: "#475569" }}>Admin</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#f8fafc" }}>Metrics Dashboard</h1>
          <p style={{ fontSize: 13, color: "#475569", margin: "4px 0 0" }}>Thyself — Acquisition readiness view</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#475569", marginBottom: 4 }}>Targets (18-month)</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>500K installs · 150K MAU · 3K paid subs · &gt;$1M ARR</div>
        </div>
      </div>

      {/* Primary KPIs */}
      <SectionHeader
        title="Primary KPIs"
        description="The metrics acquirers check first. DAU/MAU target: 25%+. D30 retention target: 20%+."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 40 }}>
        <MetricCard label="DAU/MAU Ratio" value="—" subtitle="Target: 25%+" target="25%" />
        <MetricCard label="D1 Retention" value="—" subtitle="% back after day 1" target="40%" />
        <MetricCard label="D7 Retention" value="—" subtitle="% back after day 7" target="25%" />
        <MetricCard label="D30 Retention" value="—" subtitle="% back after day 30" target="20%" />
        <MetricCard label="Paid Subs" value="—" subtitle="Active paying users" target="3,000" />
        <MetricCard label="MRR" value="—" subtitle="Monthly recurring revenue" target="$25K" />
      </div>

      {/* Conversion Funnel */}
      <SectionHeader
        title="Conversion Funnel"
        description="From install to paid subscriber. Track at paywall_view, checkout_initiated, subscription_start."
      />
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        marginBottom: 40,
      }}>
        <FunnelStep label="App open" pct={100} />
        <FunnelStep label="Onboarding completed" pct={68} />
        <FunnelStep label="First lesson completed" pct={52} />
        <FunnelStep label="Paywall viewed" pct={31} />
        <FunnelStep label="Checkout initiated" pct={8} />
        <FunnelStep label="Subscribed" pct={4} isLast />
        <p style={{ fontSize: 11, color: "#334155", margin: "4px 0 0" }}>
          Illustrative benchmarks. Wire to PostHog funnel query once event volume is sufficient (200+ users/step).
        </p>
      </div>

      {/* Streak Distribution */}
      <SectionHeader
        title="Streak Distribution"
        description="Habit formation signal. Milestone users (7, 30, 100-day) are highest LTV."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 40 }}>
        {[
          { label: "Active streaks", value: "—" },
          { label: "Avg streak length", value: "—", subtitle: "days" },
          { label: "7+ day streaks", value: "—" },
          { label: "30+ day streaks", value: "—" },
          { label: "100+ day streaks", value: "—" },
        ].map(m => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Assessment & Content */}
      <SectionHeader
        title="Assessment and Content Engagement"
        description="Assessment completion rate is a leading indicator of activation. Target: 60%+ completion once started."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 40 }}>
        {[
          { label: "Assessments started", value: "—" },
          { label: "Assessment completion", value: "—", subtitle: "% complete once started", target: "60%" },
          { label: "Lessons completed", value: "—", subtitle: "total" },
          { label: "Avg lessons/user", value: "—" },
          { label: "Journal entries", value: "—", subtitle: "total" },
          { label: "Journal users", value: "—", subtitle: "% of MAU" },
        ].map(m => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* PostHog Panels */}
      <SectionHeader
        title="Live PostHog Analysis"
        description="Requires NEXT_PUBLIC_POSTHOG_KEY to be set. Click links to open directly in PostHog."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
        <PostHogPanel
          title="DAU/MAU Trend"
          description="Daily active users over monthly active users. Primary engagement health metric."
          phUrl={`${PH_BASE}/insights?filter=dau_mau`}
        />
        <PostHogPanel
          title="Retention Cohorts (D1/D7/D30)"
          description="Cohort retention by install week. D30 target: 20%+ (2x wellness category median)."
          phUrl={`${PH_BASE}/insights?filter=retention`}
        />
        <PostHogPanel
          title="Subscription Conversion Funnel"
          description="paywall_view → checkout_initiated → subscription_start. Segment by paywall_variant for A/B results."
          phUrl={`${PH_BASE}/insights?filter=funnel`}
        />
        <PostHogPanel
          title="Streak Milestone Events"
          description="streak_milestone events by milestone value (7, 30, 100, 365). Proxy for deep habit formation."
          phUrl={`${PH_BASE}/events?event=streak_milestone`}
        />
      </div>

      {/* Event Schema Reference */}
      <SectionHeader
        title="Tracked Event Schema"
        description="All events fire through analytics.ts with user_id, session_id, platform, app_version attached."
      />
      <div style={{
        background: "rgba(0,0,0,0.4)",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 24px",
        fontFamily: "monospace",
        fontSize: 12,
        lineHeight: 1.8,
        color: "#94a3b8",
        overflowX: "auto",
        marginBottom: 40,
      }}>
        {[
          "app_open              → first_open, days_since_last_open",
          "lesson_start          → lesson_id, framework, type_focus, lesson_index",
          "lesson_complete       → lesson_id, framework, time_spent_seconds, score",
          "quiz_start            → quiz_id, framework, question_count",
          "quiz_complete         → quiz_id, framework, question_count, score_pct",
          "assessment_start      → instrument",
          "assessment_complete   → instrument, result_type, confidence_score, time_spent_seconds",
          "streak_continued      → current_streak, longest_streak, time_of_day",
          "streak_broken         → broken_streak, longest_streak, time_of_day",
          "streak_milestone      → milestone (7|30|100|365), current_streak",
          "paywall_view          → trigger_event, paywall_variant, framework, user_lessons_completed",
          "subscription_start    → product_id, price, period, revenue_cat_id",
          "subscription_cancel   → product_id, period, cancel_reason",
          "journal_entry_created → prompt_id, word_count, framework, type_facet, mood",
          "compatibility_view    → user_type, compared_type, framework, shared_via",
          "push_opt_in           → trigger_screen, user_lessons_completed, streak_day",
          "",
          "All events also carry: user_id, session_id, platform, app_version",
        ].map((line, i) => (
          <div key={i} style={{ color: line.startsWith("All") ? "#818cf8" : line === "" ? "transparent" : "#94a3b8" }}>
            {line || "​"}
          </div>
        ))}
      </div>

      {/* IP & Diligence Checklist */}
      <SectionHeader
        title="Acquisition Readiness Checklist"
        description="Items diligence teams verify in the first week."
      />
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 40,
      }}>
        {[
          { done: true,  item: "Analytics instrumented (PostHog + typed event schema)" },
          { done: true,  item: "Trademark compliance — no MBTI®/Myers-Briggs® in UI/assessments" },
          { done: false, item: "IP assignment agreements signed by all contributors" },
          { done: false, item: "Privacy policy: data encryption, GDPR/CCPA rights, retention" },
          { done: false, item: "Supabase RLS configured on all user data tables" },
          { done: false, item: "Journal content encrypted client-side before write" },
          { done: false, item: "Sentry error monitoring with source maps" },
          { done: false, item: "CONTRIBUTING.md + architecture overview README" },
          { done: false, item: "Assessment reliability data published at /research" },
          { done: false, item: "D30 retention >= 20% (2x wellness category median)" },
          { done: false, item: "DAU/MAU ratio >= 25%" },
          { done: false, item: "3,000+ active paying subscribers" },
          { done: false, item: "RevenueCat IAP integration live" },
        ].map(({ done, item }) => (
          <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
            <span style={{ fontSize: 14, color: done ? "#4ade80" : "#334155", flexShrink: 0, marginTop: 1 }}>
              {done ? "✓" : "○"}
            </span>
            <span style={{ fontSize: 13, color: done ? "#e2e8f0" : "#64748b" }}>{item}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, color: "#1e293b", textAlign: "center" }}>
        Thyself Admin · For authorized personnel only · {new Date().getFullYear()}
      </p>
    </div>
  );
}
