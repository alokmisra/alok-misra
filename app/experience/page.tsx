import { professor } from "@/data/portfolio";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IconExperience, IconStudents } from "@/components/Icons";

export default function ExperiencePage() {
  const { name, experience } = professor;

  const employment = experience.filter(item => item.type === "employment");
  const education = experience.filter(item => item.type === "education");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="page-wrap">
          {/* Hero Section */}
          <section style={{ paddingBlock: "60px 40px" }}>
            <p className="hero__tag">Professional Journey</p>
            <h1 className="hero__heading">
              Experience & Education
            </h1>
            <div className="hero__divider" />
          </section>

          {/* Academic & Professional Experience */}
          <section style={{ marginBottom: "80px" }}>
            <h2 className="navbar__brand-name" style={{ fontSize: "2rem", marginBottom: "40px" }}>
              Professional Experience
            </h2>

            <div className="experience-timeline" style={{ position: "relative", paddingLeft: "30px", borderLeft: "2px solid var(--border)" }}>
              {employment.map((job: any, idx) => (
                <div key={idx} className="experience-item" style={{ marginBottom: "60px", position: "relative" }}>
                  {/* Dot on timeline */}
                  <div className="experience-dot" style={{ 
                    position: "absolute", 
                    left: "-37px", 
                    top: "6px", 
                    width: "12px", 
                    height: "12px", 
                    background: "var(--navy)", 
                    borderRadius: "50%",
                    border: "3px solid var(--bg)"
                  }} />
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {job.period}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", color: "var(--navy)", lineHeight: 1.3 }}>
                      {job.title}
                    </h3>
                    <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-body)" }}>
                      {job.institution}
                    </p>
                    
                    {job.description && (
                      <p style={{ marginTop: "8px", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                        {job.description}
                      </p>
                    )}

                    {/* Rich Details */}
                    {(job.url || job.identifiers) && (
                      <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
                        {job.url && (
                          <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ 
                            fontSize: "0.8rem", 
                            color: "var(--navy)", 
                            textDecoration: "none", 
                            fontWeight: 600,
                            padding: "6px 12px",
                            border: "1px solid var(--border)",
                            borderRadius: "4px",
                            background: "white"
                          }}>
                            Institution Website
                          </a>
                        )}
                        {job.identifiers && Object.entries(job.identifiers).map(([key, val]: any) => {
                          let link = val;
                          if (key === "WIKIDATA" && !val.startsWith("http")) link = `https://www.wikidata.org/wiki/${val}`;
                          if (key === "ROR" && !val.startsWith("http")) link = `https://ror.org/${val}`;
                          if (key === "ISNI" && !val.startsWith("http")) link = `https://isni.org/isni/${val}`;
                          
                          const isLink = link.startsWith("http");

                          return (
                            <div key={key} style={{ 
                              fontSize: "0.8rem", 
                              color: "var(--text-muted)", 
                              padding: "6px 12px",
                              border: "1px solid var(--border)",
                              borderRadius: "4px",
                              background: "rgba(0,0,0,0.02)",
                              display: "flex",
                              gap: "6px"
                            }}>
                              <span style={{ fontWeight: 700, color: "var(--navy)" }}>{key}:</span>
                              {isLink ? (
                                <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>
                                  {val}
                                </a>
                              ) : (
                                <span>{val}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section style={{ paddingBottom: "100px" }}>
            <h2 className="navbar__brand-name" style={{ fontSize: "2rem", marginBottom: "40px" }}>
              Education & Qualifications
            </h2>

            <div className="education-grid" style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
              gap: "30px" 
            }}>
              {education.map((edu: any, idx) => (
                <div key={idx} style={{ 
                  background: "white", 
                  padding: "40px", 
                  borderRadius: "4px",
                  border: "1px solid var(--border)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
                    {edu.period}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", color: "var(--navy)", marginBlock: "12px 8px" }}>
                    {edu.title}
                  </h3>
                  <p style={{ fontSize: "1rem", color: "var(--text-body)", fontWeight: 600, marginBottom: "20px" }}>
                    {edu.institution}
                  </p>

                  <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {edu.url && (
                      <a href={edu.url} target="_blank" rel="noopener noreferrer" style={{ 
                        fontSize: "0.75rem", 
                        color: "var(--navy)", 
                        textDecoration: "none", 
                        fontWeight: 700,
                        textTransform: "uppercase",
                        marginRight: "10px"
                      }}>
                        Website →
                      </a>
                    )}
                    {edu.identifiers && Object.entries(edu.identifiers).map(([key, val]: any) => {
                      let link = val;
                      if (key === "WIKIDATA" && !val.startsWith("http")) link = `https://www.wikidata.org/wiki/${val}`;
                      if (key === "ROR" && !val.startsWith("http")) link = `https://ror.org/${val}`;
                      if (key === "ISNI" && !val.startsWith("http")) link = `https://isni.org/isni/${val}`;
                      
                      const isLink = link.startsWith("http");

                      return (
                        <div key={key} style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          <span style={{ fontWeight: 700 }}>{key}:</span>{" "}
                          {isLink ? (
                            <a href={link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", textDecoration: "none" }}>
                              {val}
                            </a>
                          ) : (
                            <span>{val}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
