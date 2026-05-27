export const general = {
  name: "Dr. Alok Misra",
  title: "Professor of Computer Science",

  /** The tag line shown above the hero heading */
  welcomeTag: "Welcome to My Academic Portfolio",

  /** Large hero heading */
  heroHeading: "Exploring Intelligent\nSystems for a\nBetter Tomorrow",

  /** One-liner shown below the heading */
  description:
    "Professor of Computer Science specializing in Algorithms, Sensor Networks, Machine Learning, and DevOps.",

  /** Inspirational quote shown on the right side */
  quote:
    "Good research\naddresses\nimportant problems,\nsimply and\nelegantly.",

  /** Path relative to /public  */
  profileImage: "/professor.png",

  /** Navigation links including the new Guidance page */
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Publications", href: "/publications" },
    { label: "Experience", href: "/experience" },
    { label: "Guidance", href: "/guidance" },
    { label: "Blog", href: "/blog" },
    { label: "Evaluation", href: "/evaluation" },
    { label: "Contact", href: "/contact" },
  ],

  /** CTA buttons */
  buttons: {
    viewResearch: { label: "View Research", href: "/publications" },
    downloadCV: { label: "Download CV", href: "/cv.pdf" },
    contactMe: { label: "Contact Me", href: "/contact" },
  },

  /** Stats shown in the metrics bar */
  stats: [
    {
      icon: "publications",
      value: "60+",
      label: "Publications",
      sublabel: "(Indexed)",
    },
    {
      icon: "citations",
      value: "550+",
      label: "Citations",
      sublabel: "(Google Scholar)",
    },
    {
      icon: "h-index",
      value: "13",
      label: "h-index",
      sublabel: "(Google Scholar)",
    },
    {
      icon: "experience",
      value: "21+",
      label: "Years of Teaching",
      sublabel: "Experience",
    },
  ],

  /** Research Profiles */
  profiles: {
    googleScholar: "https://scholar.google.com/citations?user=ryC2364AAAAJ",
    scopus: "https://www.scopus.com/authid/detail.uri?authorId=39861843300",
    orcid: "https://orcid.org/0000-0002-5279-8726",
  },

  /** About me text */
  about: {
    preview:
      "With over two decades of experience in teaching and research, I focus on developing intelligent systems that solve real-world problems. My work spans algorithms, sensor networks, machine learning, and DevOps, with a commitment to mentoring the next generation of researchers.",
    bio: [
      "Dr. Alok Misra is a distinguished computer scientist and a Professor at Lovely Professional University, Punjab, India. Significant contributions to algorithms and sensor networks have marked his career. I began as an assistant professor at SRMGPC, Lucknow, affiliated with Dr. APJ Abdul Kalam Technical University. Notably, he served as an Assistant Professor at IET, Lucknow, and as an Associate Professor at Chitkara University for nearly two decades.",
      "Dr. Misra's most substantial impact lies in his extensive research work, reflected in numerous well-received publications in prestigious journals and conferences. Beyond research, he has held influential academic and administrative positions, shaping the educational landscape. Presently, at Lovely Professional University, he continues to inspire the next generation of computer scientists while pushing the boundaries of knowledge.",
      "Dr. Alok Misra's journey is a testament to his unwavering dedication to computer science, characterized by pioneering research, leadership, and a profound impact on academia."
    ]
  },

  /** Research interests */
  researchInterests: [
    "Wireless Sensor Networks (WSN)",
    "Algorithm Design & Optimization",
    "Machine Learning in Healthcare",
    "DevOps & Scalable Systems",
    "Image Processing & Pattern Recognition",
    "IoT in Agriculture"
  ],
} as const;
