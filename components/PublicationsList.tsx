"use client";

import { useState } from "react";
import { IconPublications, IconArrowRight } from "@/components/Icons";

interface Publication {
  title: string;
  journal: string;
  year: string;
  doi: string;
  type?: string;
  contributors?: string;
}

export function PublicationsList({ publications }: { publications: readonly any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const itemsPerPage = 5;

  const sortOptions = ["Newest", "Oldest", "Title (A-Z)"];

  // Deriving unique categories for the filter
  const categories = ["All", ...Array.from(new Set(publications.map(p => p.type).filter(Boolean)))];

  const filteredPublications = [...publications]
    .filter(pub => activeFilter === "All" || pub.type === activeFilter)
    .sort((a, b) => {
      if (sortBy === "Newest") {
        const yearA = parseInt(a.year.split("-")[0]);
        const yearB = parseInt(b.year.split("-")[0]);
        return yearB - yearA;
      } else if (sortBy === "Oldest") {
        const yearA = parseInt(a.year.split("-")[0]);
        const yearB = parseInt(b.year.split("-")[0]);
        return yearA - yearB;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
  
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPublications.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Filter & Sort Section */}
      <div className="pub-filters-container" style={{ 
        marginBottom: "40px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "20px" 
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "4px", // Minimal rounding
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: "1.5px solid",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  background: activeFilter === cat ? "var(--navy)" : "transparent",
                  borderColor: activeFilter === cat ? "var(--navy)" : "var(--border)",
                  color: activeFilter === cat ? "white" : "var(--text-body)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ position: "relative", zIndex: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-muted)" }}>
                Sort By:
              </span>
              <div style={{ position: "relative" }}>
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "4px",
                    border: "1.5px solid var(--border)",
                    background: "white",
                    color: "var(--navy)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    minWidth: "160px",
                    justifyContent: "space-between"
                  }}
                >
                  {sortBy}
                  <span style={{ fontSize: "0.6rem", transition: "transform 0.2s", transform: isSortOpen ? "rotate(180deg)" : "" }}>▼</span>
                </button>
                
                {isSortOpen && (
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "4px",
                    background: "white",
                    border: "1.5px solid var(--border)",
                    borderRadius: "4px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    minWidth: "100%",
                    overflow: "hidden"
                  }}>
                    {sortOptions.map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortOpen(false);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "12px 20px",
                          textAlign: "left",
                          border: "none",
                          background: sortBy === option ? "var(--stats-bg)" : "white",
                          color: "var(--navy)",
                          fontSize: "0.9rem",
                          fontWeight: sortBy === option ? 600 : 400,
                          cursor: "pointer",
                          transition: "background 0.2s"
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontStyle: "italic" }}>
          Showing {filteredPublications.length} results for "{activeFilter}" sorted by {sortBy}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {currentItems.length > 0 ? (
          currentItems.map((pub, idx) => (
            <div 
              key={startIndex + idx} 
              style={{ 
                background: "white", 
                padding: "36px", 
                borderRadius: "4px", 
                border: "1px solid var(--border)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                transition: "transform 0.2s, box-shadow 0.2s",
                position: "relative",
                overflow: "hidden"
              }}
              className="pub-card"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
                <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <span style={{ 
                      display: "inline-block", 
                      padding: "4px 10px", 
                      background: "var(--navy)", 
                      color: "white", 
                      fontSize: "0.7rem", 
                      fontWeight: 700, 
                      borderRadius: "2px"
                    }}>
                      {pub.year}
                    </span>
                    {pub.type && (
                      <span style={{ 
                        fontSize: "0.7rem", 
                        fontWeight: 700, 
                        color: "var(--gold)", 
                        textTransform: "uppercase",
                        letterSpacing: "0.1em"
                      }}>
                        {pub.type}
                      </span>
                    )}
                  </div>
                  
                  <h3 style={{ 
                    fontFamily: "var(--font-heading)", 
                    fontSize: "1.4rem", 
                    color: "var(--navy)", 
                    lineHeight: 1.3,
                    marginBottom: "14px"
                  }}>
                    {pub.title}
                  </h3>

                  {pub.contributors && (
                     <p style={{ color: "var(--text-body)", fontSize: "0.9rem", marginBottom: "10px", fontWeight: 500, lineHeight: 1.5 }}>
                       {pub.contributors}
                     </p>
                  )}
                  
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontStyle: "italic", marginBottom: "4px" }}>
                    {pub.journal}
                  </p>

                  {pub.doi && (
                    <a 
                      href={`https://doi.org/${pub.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        gap: "6px", 
                        marginTop: "20px", 
                        color: "var(--gold)", 
                        textDecoration: "none", 
                        fontSize: "0.85rem", 
                        fontWeight: 600, 
                        textTransform: "uppercase", 
                        letterSpacing: "0.05em"
                      }}
                    >
                      View Publication
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "60px", textAlign: "center", color: "var(--text-muted)" }}>
            No publications found for this category.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pub-pagination-container" style={{ 
          marginTop: "60px", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          gap: "40px" // Increased gap
        }}>
          <button 
            className="pub-pagination-btn"
            onClick={() => goToPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            style={{ 
              background: "none",
              border: "none",
              padding: 0,
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--navy)",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              opacity: currentPage === 1 ? 0.3 : 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "opacity 0.2s"
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>←</span> Previous
          </button>
          
          <div className="pub-pagination-pages" style={{ display: "flex", gap: "24px" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  color: currentPage === page ? "var(--navy)" : "var(--text-muted)",
                  fontSize: "1rem",
                  fontWeight: currentPage === page ? 800 : 500,
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s"
                }}
              >
                {page}
                {currentPage === page && (
                  <div style={{ 
                    position: "absolute", 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    height: "2px", 
                    background: "var(--gold)" 
                  }} />
                )}
              </button>
            ))}
          </div>

          <button 
            onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ 
              background: "none",
              border: "none",
              padding: 0,
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--navy)",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              opacity: currentPage === totalPages ? 0.3 : 1,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "opacity 0.2s"
            }}
          >
            Next <span style={{ fontSize: "1.2rem" }}>→</span>
          </button>
        </div>
      )}
    </div>
  );
}
