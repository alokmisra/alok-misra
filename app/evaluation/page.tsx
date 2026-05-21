"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar";
import { EvaluationFooter } from "../../components/EvaluationFooter";
import { useRouter } from "next/navigation";
import { fetchGroupPublic } from "../../lib/api";

const GROUPS_CONFIG = [
  {
    token: "51674b6e-4e21-406c-84bf-210f6027b841",
    totalSubmissions: 31,
    completedSubmissions: 30,
    avgScore: 74,
  },
  {
    token: "7a733883-2b79-46bb-852a-e40952a65167",
    totalSubmissions: 19,
    completedSubmissions: 19,
    avgScore: 63,
  },
];

interface GroupCardProps {
  name: string;
  token: string;
  expiresAt: number;
  totalSubmissions: number;
  completedSubmissions: number;
  avgScore: number;
  router: any;
}

function GroupCard({
  name,
  token,
  expiresAt,
  totalSubmissions,
  completedSubmissions,
  avgScore,
  router,
}: GroupCardProps) {
  const expired = expiresAt > 0 && expiresAt < Math.floor(Date.now() / 1000);

  const handleClick = () => {
    router.push(`/evaluation/${name}/submit`);
  };

  const formatDate = (ts: number) => {
    if (!ts || ts === 0) return "No deadline set";
    return new Date(ts * 1000).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: "white",
        padding: "24px 30px",
        borderRadius: "4px",
        border: "1.5px solid var(--border)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.03)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Top row: Name & Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <h3 style={{
          fontSize: "1.25rem",
          fontFamily: "var(--font-heading)",
          color: "var(--navy)",
          margin: 0,
          fontWeight: 600,
        }}>
          {name}
        </h3>
        <span style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: "100px",
          background: expired ? "#fee2e2" : "#dcfce7",
          color: expired ? "#991b1b" : "#166534",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          {expired ? "Ended" : "Active"}
        </span>
      </div>

      {/* Stats container */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1.2fr",
        gap: "12px",
        background: "var(--stats-bg)",
        padding: "16px",
        borderRadius: "4px",
        border: "1px solid var(--stats-border)",
      }}>
        <div>
          <span style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Submissions</span>
          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--navy)" }}>{totalSubmissions}</span>
        </div>
        <div>
          <span style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Completed</span>
          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--navy)" }}>{completedSubmissions}</span>
        </div>
        <div>
          <span style={{ display: "block", fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.03em" }}>Avg Score</span>
          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--gold)" }}>{avgScore}/100</span>
        </div>
      </div>

      {/* Bottom details: Expiry date & Arrow */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gold)" }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <span>Deadline: <strong>{formatDate(expiresAt)}</strong></span>
        </div>
        <span style={{
          color: "var(--navy)",
          display: "inline-flex",
          alignItems: "center",
          fontWeight: 600,
        }}>
          Select <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px" }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </span>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{
      background: "white",
      padding: "24px 30px",
      borderRadius: "4px",
      border: "1.5px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      opacity: 0.6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ height: "20px", width: "40%", background: "var(--border)", borderRadius: "4px" }} className="animate-pulse" />
        <div style={{ height: "20px", width: "20%", background: "var(--border)", borderRadius: "100px" }} className="animate-pulse" />
      </div>
      <div style={{ height: "60px", background: "var(--stats-bg)", borderRadius: "4px" }} className="animate-pulse" />
      <div style={{ height: "16px", width: "60%", background: "var(--border)", borderRadius: "4px" }} className="animate-pulse" />
    </div>
  );
}

export default function EvaluationLandingPage() {
  const router = useRouter();
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchGroups = async () => {
      try {
        const fetched = await Promise.all(
          GROUPS_CONFIG.map(async (cfg) => {
            try {
              const info = await fetchGroupPublic(cfg.token);
              return {
                ...cfg,
                name: info.name,
                expiresAt: info.expires_at,
                mentorName: info.mentor_name,
              };
            } catch (err) {
              console.error(`Failed to fetch info for token ${cfg.token}:`, err);
              // Fallback
              return {
                ...cfg,
                name: cfg.token === "51674b6e-4e21-406c-84bf-210f6027b841" ? "DB_CSE332" : "FT_CSE332",
                expiresAt: cfg.token === "51674b6e-4e21-406c-84bf-210f6027b841" ? 1779730570 : 1779730597,
                mentorName: "Dr. Alok Misra",
              };
            }
          })
        );
        if (active) {
          setGroups(fetched);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading group list:", err);
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchGroups();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, paddingBottom: "80px" }}>
        <div className="page-wrap">
          {/* Header Section */}
          <section style={{ paddingBlock: "40px 10px" }} aria-label="Portal Header">
            <p className="hero__tag">Evaluation Portal</p>
            <h1 className="hero__heading">Project & Patent Submission</h1>
            <div className="hero__divider" />
          </section>

          {/* Group Selection Sub-Header */}
          <div style={{ marginBottom: "32px" }}>
            <h2 className="navbar__brand-name" style={{ fontSize: "1.4rem", marginBottom: "8px" }}>
              Select Your Group
            </h2>
            <p style={{
              fontSize: "0.95rem",
              color: "var(--text-body)",
              lineHeight: "1.5"
            }}>
              Click your assigned evaluation group below to access your submission portal.
            </p>
          </div>

          {/* 2-Column Responsive Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
            gap: "30px",
            alignItems: "start",
            maxWidth: "1000px",
            marginInline: "auto"
          }}>
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              groups.map((group) => (
                <GroupCard
                  key={group.token}
                  name={group.name}
                  token={group.token}
                  expiresAt={group.expiresAt}
                  totalSubmissions={group.totalSubmissions}
                  completedSubmissions={group.completedSubmissions}
                  avgScore={group.avgScore}
                  router={router}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <EvaluationFooter />
    </div>
  );
}

