"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { professor } from "@/data/portfolio";

export function Footer() {
  const { name, title, profiles, navLinks } = professor;
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    setMounted(true);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <footer style={{ 
      borderTop: "1px solid var(--border)", 
      background: "var(--surface)", 
      paddingBlock: "70px 40px",
      marginTop: "auto"
    }}>
      <div className="page-wrap">
        {/* Footer Top Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "48px",
          marginBottom: "50px"
        }}>
          {/* Column 1: Info */}
          <div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 500, color: "var(--charcoal)", marginBottom: "12px" }}>
              {name}
            </h3>
            <p style={{ fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--orange)", fontWeight: 600 }}>
              {title}
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--charcoal)", marginBottom: "20px" }}>
              Contact
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "2px" }}>
                  Email
                </span>
                <a href="mailto:alokalokmm@gmail.com" style={{ 
                  fontSize: "0.95rem", 
                  color: "var(--warm-gray)", 
                  textDecoration: "none",
                  transition: "color 0.2s"
                }} className="footer-link">
                  alokalokmm@gmail.com
                </a>
              </li>
              <li>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--orange)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "2px" }}>
                  Phone
                </span>
                <a href="tel:+918299173187" style={{ 
                  fontSize: "0.95rem", 
                  color: "var(--warm-gray)", 
                  textDecoration: "none",
                  transition: "color 0.2s"
                }} className="footer-link">
                  +91 82991 73187
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Research Profiles */}
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--charcoal)", marginBottom: "20px" }}>
              Research Profiles
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
              <a href={profiles.googleScholar} target="_blank" rel="noopener noreferrer" style={{ 
                fontSize: "0.95rem", 
                color: "var(--warm-gray)", 
                textDecoration: "none",
                transition: "color 0.2s"
              }} className="footer-link">
                Scholar ↗
              </a>
              <a href={profiles.orcid} target="_blank" rel="noopener noreferrer" style={{ 
                fontSize: "0.95rem", 
                color: "var(--warm-gray)", 
                textDecoration: "none",
                transition: "color 0.2s"
              }} className="footer-link">
                ORCID ↗
              </a>
              <a href={profiles.scopus} target="_blank" rel="noopener noreferrer" style={{ 
                fontSize: "0.95rem", 
                color: "var(--warm-gray)", 
                textDecoration: "none",
                transition: "color 0.2s"
              }} className="footer-link">
                Scopus ↗
              </a>
            </div>

            {/* Rectangular Theme Toggle with sliding animation */}
            <div style={{ 
              display: "inline-flex", 
              background: "var(--border)", 
              padding: "3px", 
              borderRadius: "5px", 
              position: "relative",
              border: "1px solid var(--border)",
              userSelect: "none"
            }}>
              {/* Sliding Background Capsule */}
              <div style={{
                position: "absolute",
                top: "3px",
                bottom: "3px",
                left: "3px",
                width: "70px",
                background: "var(--charcoal)",
                borderRadius: "3px",
                transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: mounted && theme === "dark" ? "translateX(70px)" : "translateX(0px)",
                pointerEvents: "none",
                zIndex: 1
              }} />
              
              <button 
                onClick={() => handleThemeChange("light")}
                style={{ 
                  width: "70px",
                  height: "28px",
                  padding: 0,
                  borderRadius: "3px", 
                  border: "none",
                  fontFamily: "var(--font-body)", 
                  fontSize: "0.72rem", 
                  fontWeight: 600, 
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em",
                  cursor: "pointer", 
                  position: "relative",
                  zIndex: 2,
                  transition: "color 0.25s ease",
                  background: "transparent",
                  color: mounted && theme === "light" ? "var(--surface)" : "var(--warm-gray)",
                }}
              >
                Light
              </button>
              <button 
                onClick={() => handleThemeChange("dark")}
                style={{ 
                  width: "70px",
                  height: "28px",
                  padding: 0,
                  borderRadius: "3px", 
                  border: "none",
                  fontFamily: "var(--font-body)", 
                  fontSize: "0.72rem", 
                  fontWeight: 600, 
                  textTransform: "uppercase", 
                  letterSpacing: "0.05em",
                  cursor: "pointer", 
                  position: "relative",
                  zIndex: 2,
                  transition: "color 0.25s ease",
                  background: "transparent",
                  color: mounted && theme === "dark" ? "var(--surface)" : "var(--warm-gray)",
                }}
              >
                Dark
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div style={{ 
          borderTop: "1px solid var(--border)", 
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          opacity: 0.8
        }}>
          <p style={{ fontSize: "0.88rem", color: "var(--warm-gray)" }}>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Affiliated with Lovely Professional University, Punjab, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
