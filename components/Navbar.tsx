"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { professor } from "@/data/portfolio";

export function Navbar() {
  const pathname = usePathname();
  const { name, title, navLinks } = professor;

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
          <ul className="navbar__links" role="list">
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
