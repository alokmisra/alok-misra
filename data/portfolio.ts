// ─────────────────────────────────────────────────────────────────────────────
//  portfolio.ts  –  Single source-of-truth for Dr. Arvind Sharma's portfolio
//  Edit anything here; the page will pick up the changes automatically.
// ─────────────────────────────────────────────────────────────────────────────

export const professor = {
  name: "Dr. Alok Misra",
  title: "Professor of Computer Science",

  /** The tag line shown above the hero heading */
  welcomeTag: "Welcome to My Academic Portfolio",

  /** Large hero heading (use \n for line breaks if needed) */
  heroHeading: "Exploring Intelligent\nSystems for a\nBetter Tomorrow",

  /** One-liner shown below the heading */
  description:
    "Professor of Computer Science specializing in Artificial Intelligence, Machine Learning, DevOps, and Human-Centered Systems.",

  /** Inspirational quote shown on the right side */
  quote:
    "Good research\naddresses\nimportant problems,\nsimply and\nelegantly.",

  /** Path relative to /public  */
  profileImage: "/professor.png",

  /** Navigation links */
  navLinks: [
    { label: "Home",         href: "#home" },
    { label: "About",        href: "#about" },
    { label: "Research",     href: "#research" },
    { label: "Publications", href: "#publications" },
    { label: "Teaching",     href: "#teaching" },
    { label: "Students",     href: "#students" },
    { label: "Awards",       href: "#awards" },
    { label: "Blog",         href: "#blog" },
    { label: "Contact",      href: "#contact" },
  ],

  /** CTA buttons */
  buttons: {
    viewResearch:  { label: "View Research",  href: "#research" },
    downloadCV:    { label: "Download CV",    href: "/cv.pdf" },
    contactMe:     { label: "Contact Me",     href: "#contact" },
  },

  /** Stats shown in the metrics bar */
  stats: [
    {
      icon: "publications",
      value: "120+",
      label: "Publications",
      sublabel: "",
    },
    {
      icon: "citations",
      value: "6,200+",
      label: "Citations",
      sublabel: "(Google Scholar)",
    },
    {
      icon: "students",
      value: "25+",
      label: "PhD & Masters Students",
      sublabel: "Mentored",
    },
    {
      icon: "experience",
      value: "18+",
      label: "Years of Teaching",
      sublabel: "Experience",
    },
  ],
} as const;
