"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { professor } from "@/data/portfolio";

// Persistent state across page transitions/mounts
let globalLineStyle: React.CSSProperties = {
  left: 0,
  width: 0,
  opacity: 0,
};
let isFirstLoad = true;

export function Navbar() {
  const pathname = usePathname();
  const { name, title, navLinks } = professor;
  const navRef = useRef<HTMLUListElement>(null);
  
  const [lineStyle, setLineStyle] = useState<React.CSSProperties>(globalLineStyle);

  useEffect(() => {
    const updateLine = () => {
      if (!navRef.current) return;
      const activeEl = navRef.current.querySelector(".navbar__link.active") as HTMLElement;
      if (activeEl) {
        const newStyle = {
          left: activeEl.offsetLeft + (activeEl.offsetWidth - 28) / 2, // center the 28px indicator
          width: 28,
          opacity: 1,
        };
        setLineStyle(newStyle);
        globalLineStyle = newStyle;
      } else {
        setLineStyle({ opacity: 0 });
      }
    };

    updateLine();
    isFirstLoad = false;

    window.addEventListener("resize", updateLine);
    return () => {
      window.removeEventListener("resize", updateLine);
    };
  }, [pathname]);

  return (
    <header>
      <div className="page-wrap">
        <nav className="navbar" aria-label="Main navigation">
          {/* Brand */}
          <Link href="/" className="navbar__brand-link">
            <div>
              <div className="navbar__brand-name">{name}</div>
              <div className="navbar__brand-sub">{title}</div>
            </div>
          </Link>

          {/* Links */}
          <ul ref={navRef} className="navbar__links" role="list">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`navbar__link${isActive ? " active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            {/* Sliding Active Indicator Line */}
            <div className={`navbar__active-line${isFirstLoad ? " no-transition" : ""}`} style={lineStyle} />
          </ul>
        </nav>
      </div>
    </header>
  );
}
