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
      <header>
        <div className="page-wrap">
          <nav className="navbar" id="home" aria-label="Main navigation">
            {/* Brand */}
            <div>
              <div className="navbar__brand-name">{name}</div>
              <div className="navbar__brand-sub">{title}</div>
            </div>

            {/* Links */}
            <ul className="navbar__links" role="list">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`navbar__link${i === 0 ? " active" : ""}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <main style={{ flex: 1 }}>
        <div className="page-wrap">
          <section className="hero" aria-label="Hero section">

            {/* Left – text + CTA */}
            <div className="hero__left">
              <p className="hero__tag">{welcomeTag}</p>

              <h1 className="hero__heading">{heroHeading}</h1>

              <div className="hero__divider" />

              <p className="hero__description">{description}</p>

              <div className="hero__actions">
                <a id="btn-view-research" href={buttons.viewResearch.href} className="btn btn-primary">
                  {buttons.viewResearch.label}
                  <IconArrowRight />
                </a>

                <a id="btn-download-cv" href={buttons.downloadCV.href} className="btn btn-secondary" download>
                  <IconDownload />
                  {buttons.downloadCV.label}
                </a>

                <a id="btn-contact" href={buttons.contactMe.href} className="btn btn-secondary">
                  <IconMail />
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
                const Icon = statIconMap[stat.icon];
                return (
                  <div key={stat.icon} className="stat-item">
                    {Icon && (
                      <span className="stat-icon" aria-hidden="true">
                        <Icon size={32} />
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
      </main>

    </div>
  );
}
