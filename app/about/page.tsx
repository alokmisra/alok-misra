import { professor } from "@/data/portfolio";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IconDownload } from "@/components/Icons";

export default function AboutPage() {
  const { name, about, buttons } = professor;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="page-wrap">
          <section className="about-hero" style={{ paddingBlock: "60px 40px" }}>
            <p className="hero__tag">Academic Profile</p>
            <h1 className="hero__heading">
              Pioneering Research in <br />
              Algorithms & Sensor Networks
            </h1>
            <div className="hero__divider" />
          </section>

          <section className="about-content" style={{ paddingBottom: "80px" }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
              gap: "80px",
              alignItems: "start"
            }}>
              {/* Bio Columns */}
              <div className="about-bio">
                {about.bio.map((paragraph, idx) => (
                  <p 
                    key={idx} 
                    className="hero__description" 
                    style={{ 
                      maxWidth: "100%", 
                      fontSize: "1.05rem", 
                      marginBottom: "2rem",
                      textAlign: "justify"
                    }}
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="hero__actions" style={{ marginTop: "3rem" }}>
                  <a href={buttons.downloadCV.href} className="btn btn-primary" download>
                    {buttons.downloadCV.label}
                  </a>
                </div>
              </div>

              {/* Sidebar Info */}
              <aside className="about-sidebar">
                <div style={{ 
                  background: "white", 
                  padding: "48px", 
                  borderRadius: "4px",
                  border: "1px solid var(--border)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.04)"
                }}>
                  <h2 className="navbar__brand-name" style={{ fontSize: "1.6rem", marginBottom: "24px" }}>
                    Core Research Areas
                  </h2>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {[
                      "Wireless Sensor Networks (WSN)",
                      "Algorithm Design & Optimization",
                      "Machine Learning in Healthcare",
                      "DevOps & Scalable Systems",
                      "Image Processing & Pattern Recognition",
                      "IoT in Agriculture"
                    ].map((area) => (
                      <li key={area} style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "14px", 
                        paddingBlock: "12px",
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                        color: "var(--text-body)",
                        fontSize: "0.95rem"
                      }}>
                        <span style={{ 
                          width: "8px", 
                          height: "8px", 
                          background: "var(--gold)", 
                          borderRadius: "50%",
                          flexShrink: 0
                        }} />
                        {area}
                      </li>
                    ))}
                  </ul>

                  <div style={{ marginTop: "40px" }}>
                    <h3 style={{ 
                      fontSize: "0.85rem", 
                      textTransform: "uppercase", 
                      letterSpacing: "0.1em", 
                      color: "var(--text-muted)",
                      marginBottom: "16px"
                    }}>
                      Current Affiliation
                    </h3>
                    <p style={{ fontWeight: 500, color: "var(--navy)", lineHeight: 1.4 }}>
                      Professor, School of Computer Science & Engineering <br />
                      Lovely Professional University, Phagwara, India
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
