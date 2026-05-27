"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  fetchGroupPublic,
  prepareUpload,
  uploadFile,
  confirmUpload,
  type GroupPublicInfo,
} from "../../../../lib/api";

// ── Icons (Inline SVGs to keep dependencies clean and simple) ────────────────
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const CheckCircleIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const AlertCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

const FileTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
);

const SpinnerIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} style={{ animation: "spin 1s linear infinite" }}><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
);

// ── Types & Constants ────────────────────────────────────────────────────────
async function computeFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface SubmitFormClientProps {
  groupName: string;
}

const GROUP_TOKENS: Record<string, string> = {
  "DB_CSE332": "51674b6e-4e21-406c-84bf-210f6027b841",
  "FT_CSE332": "7a733883-2b79-46bb-852a-e40952a65167"
};

export default function SubmitFormClient({ groupName }: SubmitFormClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const decodedGroupName = decodeURIComponent(groupName);
  const token = searchParams.get("token") || GROUP_TOKENS[decodedGroupName] || "";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);

  // Form inputs
  const [submitterName, setSubmitterName] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [inventionTitle, setInventionTitle] = useState("");
  const [email, setEmail] = useState("");
  const [teammates, setTeammates] = useState<string[]>([""]);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Group status
  const [groupInfo, setGroupInfo] = useState<GroupPublicInfo | null>(null);
  const [loadingGroup, setLoadingGroup] = useState(true);



  const fileRef = useRef<HTMLInputElement>(null);

  // Load public group details
  useEffect(() => {
    if (!token) return;
    const loadGroup = async () => {
      try {
        const info = await fetchGroupPublic(token);
        setGroupInfo(info);
      } catch (err: any) {
        console.warn("Failed to load group info, using defaults:", err);
        setGroupInfo({
          id: "default",
          name: groupName ? decodeURIComponent(groupName).replace(/-/g, " ") : "Group Submission",
          expires_at: 0,
          mentor_name: "Dr. Alok Misra",
        });
      } finally {
        setLoadingGroup(false);
      }
    };
    loadGroup();
  }, [token, groupName]);



  // Teammate add/remove helpers
  const addTeammate = () => setTeammates((t) => [...t, ""]);
  const removeTeammate = (i: number) =>
    setTeammates((t) => t.filter((_, idx) => idx !== i));
  const updateTeammate = (i: number, val: string) =>
    setTeammates((t) => t.map((x, idx) => (idx === i ? val : x)));

  // File drag-and-drop helpers
  const processFile = (f: File) => {
    if (f.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit.");
      return;
    }
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf") {
      alert("Only PDF files are allowed.");
      return;
    }
    setFile(f);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (isSubmitting || isSubmitted) return;
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  };

  // Submit Handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (
        !file ||
        !submitterName.trim() ||
        !email.trim() ||
        !uniqueId.trim() ||
        !inventionTitle.trim() ||
        !token ||
        isSubmitting ||
        isSubmitted
      ) {
        return;
      }

      setIsSubmitting(true);
      setError(null);

      try {
        const fileHash = await computeFileHash(file);
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "pdf";
        const idempotencyKey = crypto.randomUUID();
        const confirmedTeammates = teammates.filter((t) => t.trim());

        // Step 1: Request presigned upload details
        const prep = await prepareUpload({
          access_token: token,
          submitter_name: submitterName.trim(),
          unique_id: uniqueId.trim(),
          submitter_email: email.trim(),
          invention_title: inventionTitle.trim(),
          phone: "N/A",
          team_member_names: confirmedTeammates,
          group_name: groupInfo?.name || "Submitted Group",
          file_name: file.name,
          file_type: ext,
          file_size_bytes: file.size,
          file_hash: fileHash,
          idempotency_key: idempotencyKey,
        });

        // Step 2: Upload file directly
        await uploadFile(prep.upload_url, file, prep.content_type);

        // Step 3: Confirm upload
        await confirmUpload({
          submission_id: prep.submission_id,
          access_token: token,
        });

        setIsSubmitted(true);
      } catch (err: any) {
        if (
          err?.message?.includes("resubmission limit") ||
          err?.message?.includes("LIMIT_REACHED")
        ) {
          setShowLimitModal(true);
        } else {
          setError(err?.message ?? "Submission failed. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [file, submitterName, uniqueId, email, inventionTitle, token, teammates, groupInfo, isSubmitting, isSubmitted]
  );

  const formatDate = (ts: number | undefined) => {
    if (!ts || ts === 0) return "No deadline set";
    return new Date(ts * 1000).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Missing token UI
  if (!token) {
    return (
      <div className="page-wrap flex items-center justify-center" style={{ minHeight: "50vh" }}>
        <div style={{
          textAlign: "center",
          background: "var(--surface)",
          padding: "40px",
          borderRadius: "4px",
          border: "1px solid var(--border)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          maxWidth: "500px"
        }}>
          <div style={{ color: "#dc2626", marginBottom: "16px" }}>
            <AlertCircleIcon />
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--navy)", fontSize: "1.5rem", marginBottom: "12px" }}>
            Missing Submission Token
          </h1>
          <p style={{ fontSize: "0.95rem", color: "var(--text-body)", lineHeight: "1.6", marginBottom: "24px" }}>
            This submit page requires a valid security token. Please double check your submission link or visit the main Evaluation portal.
          </p>
          <button
            onClick={() => router.push("/evaluation")}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Go to Evaluation Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      {isSubmitted ? (
        <div style={{ maxWidth: "600px", margin: "24px auto", animation: "fadeIn 0.4s ease" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", borderRadius: "50%", background: "#dcfce7", color: "#10b981", marginBottom: "16px" }}>
              <CheckCircleIcon size={28} />
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--navy)", marginBottom: "12px", fontWeight: 700 }}>
              Submitted Successfully!
            </h1>
            <p style={{ fontSize: "0.95rem", color: "var(--text-body)", lineHeight: "1.5", maxWidth: "480px", margin: "0 auto" }}>
              Your patent has been received and is now getting evaluated. Your mentor will review the results soon.
            </p>
          </div>

          <div className="summary-card" style={{ background: "var(--surface)", borderRadius: "6px", border: "1px solid var(--border)", boxShadow: "0 6px 30px rgba(0,0,0,0.03)", overflow: "hidden", marginBottom: "24px" }}>
            <div className="summary-grid-row">
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Title</div>
              <div className="summary-grid-val" style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--navy)" }}>{inventionTitle}</div>
            </div>
            <div className="summary-grid-row">
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Registration Number</div>
              <div className="summary-grid-val" style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--navy)" }}>{submitterName} <span style={{ color: "var(--text-muted)", marginInline: "6px" }}>•</span> {uniqueId}</div>
            </div>
            <div className="summary-grid-row">
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</div>
              <div className="summary-grid-val" style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--navy)" }}>{email}</div>
            </div>
            <div className="summary-grid-row">
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Group</div>
              <div className="summary-grid-val" style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--navy)" }}>{groupInfo?.name || "Submitted Group"}</div>
            </div>
            <div className="summary-grid-row" style={{ borderBottom: "none" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Document</div>
              <div className="summary-grid-val" style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--navy)" }}>{file?.name}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setFile(null);
              setInventionTitle("");
              setUniqueId("");
            }}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", paddingBlock: "14px", fontSize: "0.95rem", fontWeight: 700 }}
          >
            Submit Another Document
          </button>
        </div>
      ) : (
        <div className="submit-form-grid">

          {/* Left: Input fields */}
          <div>
            {/* Header info */}
            <div style={{ marginBottom: "36px" }}>
              {loadingGroup ? (
                <div style={{ height: "40px", width: "70%", background: "var(--border)", opacity: 0.3, borderRadius: "4px", marginBottom: "12px" }} className="animate-pulse" />
              ) : (
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2.2rem", color: "var(--navy)", marginBottom: "8px" }}>
                  {groupInfo?.name || "Group Submission"}
                </h1>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--gold)" }}><CalendarIcon /></span>
                  <span>
                    Deadline: <strong>{loadingGroup ? "..." : formatDate(groupInfo?.expires_at)}</strong>
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--gold)" }}><UserIcon /></span>
                  <span>
                    Mentor: <strong>{groupInfo?.mentor_name || "Dr. Alok Misra"}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Fields */}
            <div className="contact-form-card" style={{
              background: "var(--surface)",
              padding: "32px",
              borderRadius: "4px",
              border: "1px solid var(--border)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.04)"
            }}>
              <h2 className="navbar__brand-name" style={{ fontSize: "1.3rem", marginBottom: "28px" }}>
                Submission Details
              </h2>

              <form id="submission-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Invention Title */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="inventionTitle" style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Patent Title *
                  </label>
                  <input
                    type="text"
                    id="inventionTitle"
                    value={inventionTitle}
                    onChange={(e) => setInventionTitle(e.target.value)}
                    placeholder="Enter the title of your draft or project"
                    required
                    disabled={isSubmitting || isSubmitted}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "4px",
                      border: "1.5px solid var(--border)",
                      background: "var(--surface)",
                      color: "var(--charcoal)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>

                {/* Submitter Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="submitterName" style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Submitter Full Name *
                  </label>
                  <input
                    type="text"
                    id="submitterName"
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    placeholder="First and last name"
                    required
                    disabled={isSubmitting || isSubmitted}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "4px",
                      border: "1.5px solid var(--border)",
                      background: "var(--surface)",
                      color: "var(--charcoal)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>

                {/* Registration Number */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="uniqueId" style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    id="uniqueId"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    placeholder="Registration Number"
                    required
                    disabled={isSubmitting || isSubmitted}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "4px",
                      border: "1.5px solid var(--border)",
                      background: "var(--surface)",
                      color: "var(--charcoal)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="email" style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    disabled={isSubmitting || isSubmitted}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "4px",
                      border: "1.5px solid var(--border)",
                      background: "var(--surface)",
                      color: "var(--charcoal)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem"
                    }}
                  />
                </div>

                {/* Team Members */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    Team Members (optional)
                  </label>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {teammates.map((tm, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "8px" }}>
                        <input
                          type="text"
                          value={tm}
                          onChange={(e) => updateTeammate(idx, e.target.value)}
                          placeholder={`Team member ${idx + 1} name`}
                          disabled={isSubmitting || isSubmitted}
                          style={{
                            flex: 1,
                            padding: "10px 14px",
                            borderRadius: "4px",
                            border: "1.5px solid var(--border)",
                            background: "var(--surface)",
                            color: "var(--charcoal)",
                            fontFamily: "var(--font-body)",
                            fontSize: "0.9rem"
                          }}
                        />
                        {teammates.length > 1 && !(isSubmitting || isSubmitted) && (
                          <button
                            type="button"
                            onClick={() => removeTeammate(idx)}
                            style={{
                              padding: "0 14px",
                              borderRadius: "4px",
                              border: "1.5px solid #ef4444",
                              background: "transparent",
                              color: "#ef4444",
                              cursor: "pointer"
                            }}
                          >
                            <XIcon />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {!(isSubmitting || isSubmitted) && (
                    <button
                      type="button"
                      onClick={addTeammate}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        alignSelf: "flex-start",
                        background: "none",
                        border: "none",
                        color: "var(--gold)",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        marginTop: "4px"
                      }}
                    >
                      <PlusIcon /> Add team member
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right: File drop widget + Submission CTA */}
          <div style={{ position: "sticky", top: "40px" }}>
            <h2 className="navbar__brand-name" style={{ fontSize: "1.3rem", marginBottom: "28px", opacity: 0 }}>
              File Upload
            </h2>

            <div className="contact-form-card" style={{
              background: "var(--surface)",
              padding: "32px",
              borderRadius: "4px",
              border: "1px solid var(--border)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.04)"
            }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "16px" }}>
                Upload Draft (PDF)
              </label>

              {/* Drag Area */}
              <div
                onClick={() => {
                  if (isSubmitting || isSubmitted) return;
                  fileRef.current?.click();
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  border: "2px dashed var(--border)",
                  borderRadius: "4px",
                  padding: "40px 20px",
                  textAlign: "center",
                  cursor: (isSubmitting || isSubmitted) ? "not-allowed" : "pointer",
                  background: file
                    ? "rgba(184, 150, 62, 0.05)"
                    : isDragging
                      ? "rgba(27, 45, 91, 0.03)"
                      : "transparent",
                  borderColor: file
                    ? "var(--gold)"
                    : isDragging
                      ? "var(--navy)"
                      : "var(--border)",
                  transition: "all 0.2s"
                }}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  disabled={isSubmitting || isSubmitted}
                  style={{ display: "none" }}
                />

                {file ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", justifyContent: "center" }}>
                    <div style={{ color: "var(--gold)", margin: "0 auto" }}>
                      <FileTextIcon />
                    </div>
                    <div style={{ paddingInline: "10px", maxWidth: "100%" }}>
                      <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--navy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {file.name}
                      </p>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    {!(isSubmitting || isSubmitted) && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="btn btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "0.8rem", alignSelf: "center" }}
                      >
                        Remove File
                      </button>
                    )}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <div style={{ color: "var(--border)" }}>
                      <UploadIcon />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--navy)" }}>
                        Drag & drop your PDF here
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        PDF format up to 2MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Checklist card */}
              <div style={{
                background: "var(--stats-bg)",
                padding: "20px",
                borderRadius: "4px",
                marginBlock: "24px",
                fontSize: "0.85rem",
                color: "var(--text-body)",
                border: "1px solid var(--stats-border)"
              }}>
                <h4 style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "8px", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.03em" }}>
                  Submission Checklist
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <li style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ color: "#10b981", display: "inline-flex" }}><CheckIcon /></span>
                    All team members added
                  </li>
                  <li style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ color: "#10b981", display: "inline-flex" }}><CheckIcon /></span>
                    File format is strictly PDF
                  </li>
                  <li style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ color: "#10b981", display: "inline-flex" }}><CheckIcon /></span>
                    File size is under 2MB limit
                  </li>
                </ul>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  color: "#dc2626",
                  fontSize: "0.85rem",
                  background: "#fee2e2",
                  border: "1px solid #fecaca",
                  padding: "12px",
                  borderRadius: "4px",
                  marginBottom: "16px"
                }}>
                  {error}
                </div>
              )}

              {/* Action State: Submitting / Submit */}
              <button
                form="submission-form"
                type="submit"
                disabled={
                  isSubmitting ||
                  !file ||
                  !submitterName.trim() ||
                  !email.trim() ||
                  !uniqueId.trim() ||
                  !inventionTitle.trim()
                }
                className="btn btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  paddingBlock: "16px",
                  fontWeight: 700,
                  opacity:
                    isSubmitting ||
                      !file ||
                      !submitterName.trim() ||
                      !email.trim() ||
                      !uniqueId.trim() ||
                      !inventionTitle.trim()
                      ? 0.5
                      : 1,
                  cursor:
                    isSubmitting ||
                      !file ||
                      !submitterName.trim() ||
                      !email.trim() ||
                      !uniqueId.trim() ||
                      !inventionTitle.trim()
                      ? "not-allowed"
                      : "pointer"
                }}
              >
                {isSubmitting ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
                    <SpinnerIcon className="animate-spin" /> Submitting...
                  </span>
                ) : (
                  "Submit for Evaluation"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── LIMIT EXCEEDED MODAL ───────────────────────────────────────────── */}
      {showLimitModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          {/* Backdrop */}
          <div
            onClick={() => setShowLimitModal(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(4px)"
            }}
          />

          {/* Modal Container */}
          <div style={{
            position: "relative",
            background: "var(--surface)",
            border: "1px solid #fee2e2",
            borderRadius: "4px",
            maxWidth: "400px",
            width: "100%",
            padding: "32px",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)"
          }}>
            <div style={{ color: "#dc2626", marginBottom: "16px", display: "inline-flex" }}>
              <AlertCircleIcon />
            </div>

            <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--navy)", fontSize: "1.3rem", marginBottom: "8px" }}>
              Submission Limit Reached
            </h3>

            <p style={{ fontSize: "0.9rem", color: "var(--text-body)", lineHeight: "1.6", marginBottom: "24px" }}>
              You have already reached the maximum resubmission limit of 3 for this group. Please contact Dr. Alok Misra if you need to submit another update.
            </p>

            <button
              onClick={() => setShowLimitModal(false)}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Close Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
