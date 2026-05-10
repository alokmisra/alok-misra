import { professor } from "@/data/portfolio";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IconPublications, IconArrowRight } from "@/components/Icons";

import { PublicationsList } from "@/components/PublicationsList";

export default function PublicationsPage() {
  const { name, publications, profiles } = professor;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="page-wrap">
          {/* Hero Section */}
          <section style={{ paddingBlock: "60px 40px" }}>
            <p className="hero__tag">Research Outputs</p>
            <h1 className="hero__heading" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Scholarly Works & <br /> Publications
            </h1>
            <div className="hero__divider" />
            
            <div className="profile-links-container" style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
              <a href={profiles.googleScholar} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Google Scholar
              </a>
              <a href={profiles.scopus} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Scopus
              </a>
              <a href={profiles.orcid} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                ORCID
              </a>
            </div>
          </section>

          {/* Publications List Component */}
          <section style={{ paddingBottom: "100px" }}>
            <PublicationsList publications={publications} />


            {/* View More CTA */}
            <div style={{ marginTop: "60px", textAlign: "center", padding: "40px", border: "2px dashed var(--border)", borderRadius: "4px" }}>
              <h3 className="navbar__brand-name" style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Looking for more?</h3>
              <p className="hero__description" style={{ marginInline: "auto" }}>
                I have over 60+ indexed publications across international journals and conferences. 
                You can find the complete list on my research profiles.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
                <a href={profiles.orcid} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  View on ORCID
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
