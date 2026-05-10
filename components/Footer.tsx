import { professor } from "@/data/portfolio";

export function Footer() {
  const { name } = professor;
  
  return (
    <footer style={{ borderTop: "1px solid var(--border)", paddingBlock: "40px" }}>
      <div className="page-wrap">
        <div style={{ textAlign: "center", opacity: 0.7 }}>
          <p style={{ fontSize: "0.9rem" }}>
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
