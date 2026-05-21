import Image from "next/image";
import { professor } from "@/data/portfolio";
import {
  IconPublications,
  IconCitations,
  IconStudents,
  IconExperience,
  IconArrowRight,
  IconDownload,
  IconMail,
  IconQuote,
} from "@/components/Icons";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const statIconMap: Record<string, React.FC<{ size?: number }>> = {
  publications: IconPublications,
  citations:    IconCitations,
  students:     IconStudents,
  experience:   IconExperience,
};

export default function HomePage() {
  const { name, title, welcomeTag, heroHeading, description, quote, profileImage, navLinks, buttons, stats } =
    professor;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── Navbar ────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <main style={{ flex: 1 }}>
        <div className="page-wrap">
          <section className="hero" aria-label="Hero section">

            {/* Left – text + CTA */}
            <div className="hero__left">
              <p className="hero__tag">{welcomeTag}</p>

              <h1 className="hero__heading" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>{heroHeading}</h1>

              <div className="hero__divider" />

              <p className="hero__description">{description}</p>

              <div className="hero__actions">
                <a id="btn-view-research" href={buttons.viewResearch.href} className="btn btn-primary">
                  {buttons.viewResearch.label}
                </a>

                <a id="btn-download-cv" href={buttons.downloadCV.href} className="btn btn-secondary" download>
                  {buttons.downloadCV.label}
                </a>

                <a id="btn-contact" href={buttons.contactMe.href} className="btn btn-secondary">
                  {buttons.contactMe.label}
                </a>
              </div>
            </div>

            {/* Centre – Profile photo */}
            <div className="hero__photo-wrap">
              <Image
                src={profileImage}
                alt={`Portrait of ${name}`}
                width={400}
                height={533}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
            </div>

            {/* Right – Inspirational quote */}
            <aside className="hero__quote" aria-label="Quote">
              <IconQuote className="hero__quote-mark-svg" />
              <blockquote className="hero__quote-text">{quote}</blockquote>
              <div className="hero__quote-line" />
            </aside>

          </section>
        </div>

        {/* ── Stats Card ──────────────────────────────────────────── */}
        <div className="page-wrap">
          <section className="stats-section" aria-label="Academic statistics">
            <div className="stats-card">
              {stats.map((stat) => {
                return (
                  <div key={stat.icon} className="stat-item">
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">
                      {stat.label}
                      {stat.sublabel && (
                        <span className="stat-sublabel">{stat.sublabel}</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
