"use client";

import React, { useState } from "react";

export function EvaluationFooter() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links = [
    { label: "PatentIQ", href: "https://patentiq.dialabs.tech" },
    { label: "GitHub", href: "https://github.com/dialabs" }
  ];

  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "50px 0 40px 0",
      color: "var(--text-muted)",
      fontFamily: "var(--font-body), sans-serif",
    }}>
      <div className="page-wrap" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "40px",
      }}>
        {/* Left Section: Logo & Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="https://www.dialabs.tech/icon0.svg"
              alt="DiaLabs Logo"
              style={{ width: "26px", height: "26px" }}
            />
            <span style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--navy)",
              letterSpacing: "0.03em",
            }}>
              <a href="https://dialabs.tech" target="_blank" rel="noopener noreferrer">DiaLabs</a>
            </span>
          </div>
          <p style={{
            fontSize: "0.88rem",
            color: "var(--text-muted)",
            margin: 0,
            lineHeight: "1.5",
          }}>
            Powered by PatentIQ | DiaLabs
          </p>
        </div>

        {/* Right Section: Links & Credits */}
        <div style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px", textAlign: "right" }}>
            {/* Top row: Links */}
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: hoveredLink === link.label ? "var(--gold)" : "var(--navy)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {link.label}
                  <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>↗</span>
                </a>
              ))}
            </div>

            {/* Middle row: Credits */}
            <p style={{ fontSize: "0.85rem", margin: 0, color: "var(--text-muted)" }}>
              Handcrafted by{" "}
              <a
                href="https://codexdhruv.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-author-link"
              >
                <span style={{ color: "var(--gold)" }}>D</span>hruv
              </a>
              ,{" "}
              <a
                href="https://iteshxt.me"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-author-link"
              >
                <span style={{ color: "var(--gold)" }}>I</span>tesh
              </a>{" "}
              &{" "}
              <a
                href="https://aditanupam.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-author-link"
              >
                <span style={{ color: "var(--gold)" }}>A</span>ditya
              </a>
            </p>

            {/* Bottom row: Copyright */}
            <p style={{ fontSize: "0.75rem", margin: 0, color: "var(--text-muted)", letterSpacing: "0.05em", textTransform: "uppercase", opacity: 0.8 }}>
              © {new Date().getFullYear()} DIALABS. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
