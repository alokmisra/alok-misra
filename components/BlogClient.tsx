"use client";

import { useState } from "react";
import { IconPin } from "@/components/Icons";
import Link from "next/link";

export default function BlogClient({ allPosts }: { allPosts: any[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Get unique tags for filters
  const uniqueTags = Array.from(new Set(allPosts.flatMap(post => post.tags || []))).sort();
  const allTags = ["All", ...uniqueTags];

  // Separate Pinned for the top section
  const pinnedPosts = allPosts.filter(post => post.pinned);
  
  // Filtered list (all posts matching filter, including pinned)
  const filteredPosts = allPosts
    .filter(post => (activeFilter === "All" || (post.tags && post.tags.includes(activeFilter))));

  return (
    <>
      {/* Pinned Section - Only on 'All' view */}
      {activeFilter === "All" && pinnedPosts.length > 0 && (
        <section style={{ marginBottom: "60px" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
            gap: "30px" 
          }}>
            {pinnedPosts.map((post, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: "white", 
                  padding: "32px", 
                  borderRadius: "4px",
                  border: "1px solid var(--border)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ position: "absolute", right: "24px", top: "24px", opacity: 0.6, color: "var(--navy)" }}>
                  <IconPin size={20} style={{ transform: "rotate(225deg)" }} />
                </div>
                <div>
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "1.5rem", 
                    color: "var(--navy)", 
                    marginBottom: "12px",
                    lineHeight: 1.3,
                    paddingRight: "30px"
                  }}>
                    <Link href={`/blog/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      {post.title}
                    </Link>
                  </h2>
                  <p style={{ 
                    fontSize: "1rem", 
                    color: "var(--text-body)", 
                    lineHeight: 1.6, 
                    marginBottom: "24px",
                    opacity: 0.8
                  }}>
                    {post.excerpt}
                  </p>
                </div>
                
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "16px", 
                  fontSize: "0.85rem", 
                  color: "var(--text-muted)"
                }}>
                  <span>{post.readTime}</span>
                  <span style={{ opacity: 0.3 }}>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <section style={{ marginBottom: "20px", borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
        <div className="blog-tags-container" style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--navy)", marginRight: "10px" }}>FILTER BY:</span>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              style={{
                padding: "8px 20px",
                borderRadius: "4px",
                border: "1.5px solid var(--border)",
                background: activeFilter === tag ? "var(--navy)" : "white",
                color: activeFilter === tag ? "white" : "var(--navy)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Full Blog List */}
      <section style={{ paddingBottom: "100px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {filteredPosts.length === 0 ? (
             <p style={{ padding: "40px", textAlign: "center", color: "var(--text-muted)" }}>No posts found for this category.</p>
          ) : (
            filteredPosts.map((post, idx) => (
              <div 
                key={idx} 
                className="blog-list-item"
                style={{ 
                  paddingBlock: "40px", 
                  borderBottom: idx === filteredPosts.length - 1 ? "none" : "1.5px solid var(--border)",
                  display: "flex",
                  gap: "40px",
                  alignItems: "start",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ flex: 1, maxWidth: "800px" }}>
                  <h2 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "1.75rem", 
                    color: "var(--navy)", 
                    marginBottom: "12px",
                    lineHeight: 1.3
                  }}>
                    <Link href={`/blog/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      {post.title}
                    </Link>
                  </h2>
                  <p style={{ 
                    fontSize: "1.05rem", 
                    color: "var(--text-body)", 
                    lineHeight: 1.6, 
                    marginBottom: "20px",
                    opacity: 0.9
                  }}>
                    {post.excerpt}
                  </p>
                  
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "16px", 
                    fontSize: "0.85rem", 
                    color: "var(--text-muted)",
                    flexWrap: "wrap"
                  }}>
                    <span>{post.readTime}</span>
                    <span style={{ opacity: 0.3 }}>•</span>
                    <span>{post.date}</span>
                    
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span style={{ opacity: 0.3 }}>•</span>
                        <div style={{ display: "flex", gap: "10px" }}>
                          {post.tags.map((tag: string) => (
                            <span key={tag} style={{ color: "var(--gold)", fontWeight: 600 }}>#{tag.toLowerCase()}</span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
