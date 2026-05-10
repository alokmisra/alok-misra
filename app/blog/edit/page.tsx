"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function BlogEditPage() {
  const [markdown, setMarkdown] = useState(`# New Blog Post\n\nWrite your excerpt here...\n\n---\n\nWrite your full content here...`);
  const [title, setTitle] = useState("New Blog Post");
  const [tags, setTags] = useState("AI, Research");
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }));

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8f9fa" }}>
      <Navbar />

      <main style={{ flex: 1, paddingBlock: "40px" }}>
        <div className="page-wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            <h1 className="navbar__brand-name" style={{ fontSize: "2rem" }}>Blog Composer</h1>
            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  const content = `---
title: "${title}"
date: "${date}"
tags: [${tags.split(',').map(t => `"${t.trim()}"`).join(', ')}]
readTime: "5 min read"
---

${markdown}`;
                  navigator.clipboard.writeText(content);
                  alert("Markdown with Frontmatter copied to clipboard!");
                }}
              >
                Copy Markdown
              </button>
            </div>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "32px",
            height: "calc(100vh - 300px)",
            minHeight: "600px"
          }}>
            {/* Editor Side */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold)" }}>POST TITLE</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ padding: "12px", borderRadius: "4px", border: "1.5px solid var(--border)", fontSize: "1rem" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold)" }}>TAGS (COMMA SEPARATED)</label>
                <input 
                  type="text" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  style={{ padding: "12px", borderRadius: "4px", border: "1.5px solid var(--border)", fontSize: "1rem" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold)" }}>CONTENT (MARKDOWN)</label>
                <textarea 
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  style={{ 
                    flex: 1, 
                    padding: "20px", 
                    borderRadius: "4px", 
                    border: "1.5px solid var(--border)", 
                    fontSize: "1rem",
                    fontFamily: "monospace",
                    resize: "none",
                    lineHeight: 1.6
                  }}
                />
              </div>
            </div>

            {/* Preview Side */}
            <div style={{ 
              background: "white", 
              borderRadius: "4px", 
              border: "1px solid var(--border)", 
              padding: "40px",
              overflowY: "auto",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
            }}>
               <p className="hero__tag" style={{ marginBottom: "8px" }}>Preview</p>
               <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.2rem", color: "var(--navy)", marginBottom: "16px" }}>{title}</h2>
               <div style={{ display: "flex", gap: "12px", fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "32px" }}>
                 <span>{date}</span>
                 <span>•</span>
                 <div style={{ display: "flex", gap: "8px" }}>
                   {tags.split(',').map(t => (
                     <span key={t} style={{ color: "var(--gold)", fontWeight: 600 }}>#{t.trim().toLowerCase()}</span>
                   ))}
                 </div>
               </div>
               <div style={{ lineHeight: 1.8, color: "var(--text-body)", fontSize: "1.1rem", whiteSpace: "pre-wrap" }}>
                 {markdown}
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
