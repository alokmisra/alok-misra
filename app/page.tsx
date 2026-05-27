import Image from "next/image";
import { professor } from "@/data/portfolio";
import {
  IconPublications,
  IconDownload,
  IconMail,
  IconQuoteDouble,
  IconGraduationCap,
  IconUser,
  IconBeaker,
} from "@/components/Icons";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const statIconMap: Record<string, React.FC<{ size?: number }>> = {
  publications: IconPublications,
  citations: IconQuoteDouble,
  "h-index": IconGraduationCap,
  experience: IconUser,
};

export default function HomePage() {
  const { name, title, welcomeTag, heroHeading, description, quote, profileImage, navLinks, buttons, stats, about, researchInterests } =
    professor;

  const currentAffiliation = professor.experience.find(
    (exp) => exp.type === "employment" && exp.period.toUpperCase().includes("PRESENT")
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── Navbar ────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Main ──────────────────────────────────────────────────── */}
      <main style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {/* Subtle Background dot pattern - denser and masked to fade */}
        <svg className="bg-decor bg-decor--dots" width="380" height="380" fill="none" viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bg-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.75" fill="#c8965dff" />
            </pattern>
          </defs>
          <rect width="380" height="380" fill="url(#bg-dots)" />
        </svg>

        {/* Subtle background branching wavy lines */}
        <svg className="bg-decor bg-decor--waves" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1000,800 C900,680 750,600 680,480 C610,360 550,220 500,100" stroke="#EAE4DA" strokeWidth="1.5" opacity="0.6" />
          <path d="M1000,750 C880,640 780,580 650,450 C520,320 450,200 420,50" stroke="#EAE4DA" strokeWidth="1" opacity="0.4" />
          <path d="M1030,830 C930,700 720,620 630,500 C540,380 480,240 440,120" stroke="#FCE7D6" strokeWidth="1.5" opacity="0.7" />
          <path d="M980,820 C850,690 790,630 710,510 C630,390 570,250 530,130" stroke="#FCE7D6" strokeWidth="1.2" opacity="0.5" />
          <path d="M680,480 C720,380 780,300 850,250" stroke="#EAE4DA" strokeWidth="1" opacity="0.5" />
          <path d="M630,500 C670,410 740,340 820,300" stroke="#FCE7D6" strokeWidth="1" opacity="0.5" />
          <path d="M650,450 C600,380 500,320 400,280" stroke="#EAE4DA" strokeWidth="1" opacity="0.4" />
        </svg>

        <div className="page-wrap" style={{ position: "relative", zIndex: 1 }}>
          <section className="hero" aria-label="Hero section">

            {/* Left – text + CTA */}
            <div className="hero__left">
              <p className="hero__tag">{welcomeTag}</p>
              <div className="hero__tag-line" />

              <h1 className="hero__heading" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                {heroHeading.replace(/\n/g, " ")}
                <span className="dot">.</span>
              </h1>

              <div className="hero__divider" />

              <p className="hero__description">{description}</p>

              <div className="hero__actions">
                <a id="btn-view-research" href={buttons.viewResearch.href} className="btn btn-primary">
                  <IconPublications size={18} />
                  {buttons.viewResearch.label}
                </a>

                <a id="btn-download-cv" href={buttons.downloadCV.href} className="btn btn-secondary" download>
                  <IconDownload size={16} />
                  {buttons.downloadCV.label}
                </a>

                <a id="btn-contact" href={buttons.contactMe.href} className="btn btn-secondary">
                  <IconMail size={16} />
                  {buttons.contactMe.label}
                </a>
              </div>
            </div>

            {/* Right – Profile photo overlap group */}
            <div className="hero__right-group">
              <div className="hero__photo-backdrop" />
              <div className="hero__photo-wrap">
                <Image
                  src={profileImage}
                  alt={`Portrait of ${name}`}
                  width={400}
                  height={500}
                  priority
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
              <aside className="hero__quote-card" aria-label="Quote">
                <IconQuoteDouble className="quote-icon" size={24} />
                <p>{quote.replace(/\n/g, " ")}</p>
                <div className="quote-line" />
                <div className="dots-grid" />
              </aside>
            </div>

          </section>
        </div>

        {/* ── Stats Card ──────────────────────────────────────────── */}
        <div className="page-wrap" style={{ position: "relative", zIndex: 1 }}>
          <section className="stats-section" aria-label="Academic statistics">
            <div className="stats-card">
              {stats.map((stat) => {
                const IconComponent = statIconMap[stat.icon];
                return (
                  <div key={stat.icon} className="stat-item">
                    {IconComponent && (
                      <span className="stat-icon">
                        <IconComponent size={28} />
                      </span>
                    )}
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

        {/* ── About Section (Redesigned & Integrated) ────────────────── */}
        <section className="about-section" aria-label="About summary">
          <div className="page-wrap">

            {/* Header row: Tag and Affiliation */}
            <div className="about-section__header">
              <div className="about-section__tag-group">
                <div className="about-section__tag-line" />
                <span className="about-section__tag">About Me</span>
              </div>

              {currentAffiliation && (
                <div className="about-section__affiliation">
                  <span className="about-section__affiliation-label">Current Affiliation</span>
                  <span className="about-section__affiliation-text">
                    <strong>{currentAffiliation.title.split(" (")[0]}</strong> at {currentAffiliation.institution}
                  </span>
                </div>
              )}
            </div>

            {/* Main Content Area Grid */}
            <div className="about-section__grid">

              {/* Left Side: Heading & Biography */}
              <div className="about-section__left">
                <h2 className="about-section__heading">
                  Passionate about Research.<br />Committed to Excellence<span className="dot">.</span>
                </h2>
                <div className="about-section__bio">
                  {about.bio.map((paragraph, idx) => (
                    <p key={idx}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Right Side: Research Interests Card */}
              <div className="about-section__right">
                <div className="interests-card">
                  <div className="interests-card__header">
                    <div className="interests-card__icon-wrapper">
                      <IconBeaker size={20} />
                    </div>
                    <h3 className="interests-card__title">Research Interests</h3>
                  </div>
                  <ul className="interests-card__list">
                    {researchInterests.map((interest) => (
                      <li key={interest} className="interests-card__item">
                        <div className="interests-card__bullet" />
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
