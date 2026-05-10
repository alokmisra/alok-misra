// ─────────────────────────────────────────────────────────────────────────────
//  portfolio.ts  –  Single source-of-truth for Dr. Alok Misra's portfolio
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
    "Professor of Computer Science specializing in Algorithms, Sensor Networks, Machine Learning, and DevOps.",

  /** Inspirational quote shown on the right side */
  quote:
    "Good research\naddresses\nimportant problems,\nsimply and\nelegantly.",

  /** Path relative to /public  */
  profileImage: "/professor.png",

  /** Navigation links */
  navLinks: [
    { label: "Home",         href: "/" },
    { label: "About",        href: "/about" },
    { label: "Publications", href: "/publications" },
    { label: "Experience",   href: "/experience" },
    { label: "Blog",         href: "/blog" },
    { label: "Contact",      href: "/contact" },
  ],

  /** CTA buttons */
  buttons: {
    viewResearch:  { label: "View Research",  href: "/publications" },
    downloadCV:    { label: "Download CV",    href: "/cv.pdf" },
    contactMe:     { label: "Contact Me",     href: "/contact" },
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
    bio: [
      "Dr. Alok Misra is a distinguished computer scientist and a Professor at Lovely Professional University, Punjab, India. Significant contributions to algorithms and sensor networks have marked his career. I began as an assistant professor at SRMGPC, Lucknow, affiliated with Dr. APJ Abdul Kalam Technical University. Notably, he served as an Assistant Professor at IET, Lucknow, and as an Associate Professor at Chitkara University for nearly two decades.",
      "Dr. Misra's most substantial impact lies in his extensive research work, reflected in numerous well-received publications in prestigious journals and conferences. Beyond research, he has held influential academic and administrative positions, shaping the educational landscape. Presently, at Lovely Professional University, he continues to inspire the next generation of computer scientists while pushing the boundaries of knowledge.",
      "Dr. Alok Misra's journey is a testament to his unwavering dedication to computer science, characterized by pioneering research, leadership, and a profound impact on academia."
    ]
  },

  /** Experience (Employment and Education) */
  experience: [
    {
      title: "Professor, DevOps (School of Computer Science and Engineering)",
      institution: "Lovely Professional University",
      period: "JAN 2023 – PRESENT",
      description: "Jalandhar–Delhi G.T. Road, Phagwara, Punjab (India) 144411",
      type: "employment",
      url: "https://lpu.in",
      identifiers: { ROR: "https://ror.org/00et6q107", WIKIDATA: "Q5756621" }
    },
    {
      title: "Assistant Professor (Computer Science and Engineering)",
      institution: "Institute of Engineering & Technology",
      period: "FEB 2021 – APR 2022",
      description: "Lucknow, Uttar Pradesh, IN",
      url: "https://www.ietlucknow.ac.in",
      type: "employment",
      identifiers: { WIKIDATA: "Q6040291" }
    },
    {
      title: "Assistant Professor (Computer Science and Engineering)",
      institution: "Shri Ramswaroop Memorial College of Engineering and Management",
      period: "MAR 2003 – FEB 2021",
      description: "Lucknow, Uttar Pradesh, IN",
      type: "employment",
      url: "http://www.srmcem.ac.in",
      identifiers: { RINGGOLD: "125860", ISNI: "000000040419018X" }
    },
    {
      title: "Ph.D (Computer Science and Engineering)",
      institution: "AKTU, Lucknow, Uttar Pradesh, IN",
      period: "GRADUATED 2020",
      description: "",
      type: "education",
      url: "https://aktu.ac.in",
      identifiers: { ISNI: "0000000107339339" }
    },
    {
      title: "M. Tech",
      institution: "Indian Institute of Technology Guwahati, Assam, IN",
      period: "JUL 2007 – JUL 2009",
      description: "",
      type: "education",
      url: "http://www.iitg.ac.in",
      identifiers: { RINGGOLD: "28678", ISNI: "0000000118878311" }
    }
  ],

  /** Publications (Selected & Recent) */
  publications: [
    {
      title: "Residual ShuffleNet with Optimization: A Novel Approach for Brain Tumor Detection in MRI Images",
      journal: "International Journal of Biomathematics",
      year: "2025",
      doi: "10.1142/S1793524525500354",
      type: "Journal article",
      contributors: "Neelima Gullipalli; Alok Misra; Sasibhushana Rao Pappu; Mallikharjuna Rao Karreddula; Balajee Maram"
    },
    {
      title: "Optimization-Enabled Shepard Convolutional Quantum Neural Network for Brain Tumor Detection Using MRI Image",
      journal: "International Journal of Pattern Recognition and Artificial Intelligence",
      year: "2025",
      doi: "10.1142/S0218001424570131",
      type: "Journal article",
      contributors: "Swaminathan Balasubramanian; Veerraju Gampala; Alok Misra; Telu Venkata Madhusudhana Rao"
    },
    {
      title: "Skill‐Honey Badger Optimisation Algorithm‐Enabled Deep Convolutional Neural Network for Multiclass Leaf Disease Detection in Tomato Plant",
      journal: "Journal of Phytopathology",
      year: "2024",
      doi: "10.1111/jph.70001",
      type: "Journal article",
      contributors: "Naresh Kumar Trivedi; Sachin Jain; Alok Misra; Raj Gaurang Tiwari; Shikha Maheshwari; Vinay Gautam"
    },
    {
      title: "RF-ShCNN: A combination of two deep models for tumor detection in brain using MRI",
      journal: "Biomedical Signal Processing and Control",
      year: "2024",
      doi: "10.1016/j.bspc.2023.105656",
      type: "Journal article",
      contributors: "Balasubramanian, S.; Mandala, J.; Rao, T.V.M.; Misra, A."
    },
    {
      title: "Transfer Learning for Classification of Horticultural Maladies: Leveraging Pre-trained Models for Disease Detection in Crop Plants",
      journal: "2024 2nd World Conference on Communication and Computing, WCONF 2024",
      year: "2024",
      doi: "10.1109/WCONF61366.2024.10692234",
      type: "Conference paper",
      contributors: "Tiwari, R.G.; Misra, A.; Dutt, K.; Singh, R.; Kaur, A."
    },
    {
      title: "Alzheimer's Disease Detection and Classification: An Ensemble Machine Learning Paradigm",
      journal: "ICADEIS 2023 - International Conference on Advancement in Data Science, E-Learning and Information Systems",
      year: "2023",
      doi: "10.1109/ICADEIS58666.2023.10270820",
      type: "Conference paper",
      contributors: "Trivedi, N.K.; Tiwari, R.G.; Gautam, V.; Jain, A.K.; Witarsyah, D.; Misra, A."
    },
    {
      title: "Bat Algorithm: A Review on Theory, Modifications and Applications",
      journal: "2023 3rd International Conference on Intelligent Cybernetics Technology and Applications, ICICyTA 2023",
      year: "2023",
      doi: "10.1109/ICICyTA60173.2023.10428705",
      type: "Conference paper",
      contributors: "Singh, H.; Witarsyah, D.; Misra, A.; Tiwari, R.G."
    },
    {
      title: "Classification of Swarm Collective Motion Using Machine Learning",
      journal: "Smart Innovation, Systems and Technologies",
      year: "2023",
      doi: "10.1007/978-981-19-5403-0_14",
      type: "Conference paper",
      contributors: "Tiwari, R.G.; Yadav, S.K.; Misra, A.; Sharma, A."
    },
    {
      title: "Convolutions of String Data Structures: A Case Study of Finding Number of Palindrome Substrings in a String",
      journal: "ICADEIS 2023 - International Conference on Advancement in Data Science, E-Learning and Information Systems",
      year: "2023",
      doi: "10.1109/ICADEIS58666.2023.10271062",
      type: "Conference paper",
      contributors: "Kumar, K.; Jain, A.K.; Tiwari, R.G.; Jain, N.; Witarsyah, D.; Misra, A."
    },
    {
      title: "Detection of Breast Cancer Based on Fuzzy Logic",
      journal: "ICADEIS 2023 - International Conference on Advancement in Data Science, E-Learning and Information Systems",
      year: "2023",
      doi: "10.1109/ICADEIS58666.2023.10270874",
      type: "Conference paper",
      contributors: "Neelima, G.; Kanchanamala, P.; Misra, A.; Nugraha, R.A."
    },
    {
      title: "Dry Fruit Classification Using Deep Convolutional Neural Network Trained with Transfer Learning",
      journal: "ICADEIS 2023 - International Conference on Advancement in Data Science, E-Learning and Information Systems",
      year: "2023",
      doi: "10.1109/ICADEIS58666.2023.10270982",
      type: "Conference paper",
      contributors: "Gautam, V.; Tiwari, R.G.; Misra, A.; Witarsyah, D.; Trivedi, N.K.; Jain, A.K."
    },
    {
      title: "Performance Evaluation of Optimizers in the Classification of Marble Surface Quality Using CNN",
      journal: "Lecture Notes in Networks and Systems",
      year: "2023",
      doi: "10.1007/978-981-19-3148-2_15",
      type: "Conference paper",
      contributors: "Tiwari, R.G.; Yadav, D.S.; Misra, A."
    },
    {
      title: "A Comprehensive Review of Techniques for Enhancing Lifetime of Wireless Sensor Network",
      journal: "Smart and Power Grid Systems - Design Challenges and Paradigms",
      year: "2022",
      doi: "",
      type: "Book chapter",
      contributors: "Tiwari, R.G.; Misra, A.; Agarwal, A.K.; Khullar, V."
    },
    {
      title: "An Optimization Based Anonymous Messaging System for Data Security in Delay Tolerant Network",
      journal: "IEEE International Conference on Data Science and Information System, ICDSIS 2022",
      year: "2022",
      doi: "10.1109/ICDSIS55133.2022.9915944",
      type: "Conference paper",
      contributors: "Gantayat, P.K.; Tiwari, R.G.; Misra, A."
    },
    {
      title: "Application of Machine Learning for Diagnosis of Liver Cancer",
      journal: "Proceedings - International Conference Advancement in Data Science, E-Learning and Information Systems, ICADEIS 2022",
      year: "2022",
      doi: "10.1109/ICADEIS56544.2022.10037379",
      type: "Conference paper",
      contributors: "Trivedi, N.K.; Tiwari, R.G.; Anand, A.; Gautam, V.; Witarsyah, D.; Misra, A."
    },
    {
      title: "Applications of Internet of Things(IoT) in Agriculture: The Need and Implementation",
      journal: "Proceedings - International Conference Advancement in Data Science, E-Learning and Information Systems, ICADEIS 2022",
      year: "2022",
      doi: "10.1109/ICADEIS56544.2022.10037505",
      type: "Conference paper",
      contributors: "Anand, A.; Trivedi, N.K.; Gautam, V.; Tiwari, R.G.; Witarsyah, D.; Misra, A."
    },
    {
      title: "Comparative Classification Performance Evaluation of Various Deep Learning Techniques for Sentiment Analysis",
      journal: "2022 8th International Conference on Signal Processing and Communication, ICSC 2022",
      year: "2022",
      doi: "10.1109/ICSC56524.2022.10009471",
      type: "Conference paper",
      contributors: "Tiwari, R.G.; Misra, A.; Ujjwal, N."
    },
    {
      title: "Education 4.0: Classification of Student Adaptability Level in E-Education",
      journal: "2022 10th International Conference on Reliability, Infocom Technologies and Optimization (Trends and Future Directions), ICRITO 2022",
      year: "2022",
      doi: "10.1109/ICRITO56286.2022.9964851",
      type: "Conference paper",
      contributors: "Tiwari, R.G.; Misra, A.; Kukreja, V.; Jain, A.K.; Ujjwal, N."
    },
    {
      title: "Image Embedding and Classification using Pre-Trained Deep Learning Architectures",
      journal: "2022 8th International Conference on Signal Processing and Communication, ICSC 2022",
      year: "2022",
      doi: "10.1109/ICSC56524.2022.10009560",
      type: "Conference paper",
      contributors: "Tiwari, R.G.; Misra, A.; Ujjwal, N."
    },
    {
      title: "Investigating Efficacy of Transfer Learning for Fruit Classification",
      journal: "Lecture Notes on Data Engineering and Communications Technologies",
      year: "2022",
      doi: "10.1007/978-981-19-2347-0_33",
      type: "Book chapter",
      contributors: "Khullar, V.; Gaurang Tiwari, R.; Kumar Agarwal, A.; Misra, A."
    },
    {
      title: "Issues, Challenges, and Possibilities in IoT and Cloud Computing",
      journal: "Lecture Notes in Networks and Systems",
      year: "2022",
      doi: "10.1007/978-981-19-3089-8_31",
      type: "Conference paper",
      contributors: "Mishra, V.K.; Tripathi, R.; Tiwari, R.G.; Misra, A.; Yadav, S.K."
    },
    {
      title: "Machine Learning Based Evaluations of Stress, Depression, and Anxiety",
      journal: "Proceedings - International Conference Advancement in Data Science, E-Learning and Information Systems, ICADEIS 2022",
      year: "2022",
      doi: "10.1109/ICADEIS56544.2022.10037336",
      type: "Conference paper",
      contributors: "Trivedi, N.K.; Tiwari, R.G.; Witarsyah, D.; Gautam, V.; Misra, A.; Nugraha, R.A."
    },
    {
      title: "Communication Jamming in Body Sensor Network: A Review",
      journal: "Proceedings of the 2021 10th International Conference on System Modeling and Advancement in Research Trends, SMART 2021",
      year: "2021",
      doi: "10.1109/SMART52563.2021.9676294",
      type: "Conference paper",
      contributors: "Tiwari, R.G.; Misra, A.; Agarwal, A.K.; Khullar, V."
    },
    {
      title: "Identifying Microscopic Augmented Images using Pre-Trained Deep Convolutional Neural Networks",
      journal: "Proceedings of International Conference on Technological Advancements and Innovations, ICTAI 2021",
      year: "2021",
      doi: "10.1109/ICTAI53825.2021.9673472",
      type: "Conference paper",
      contributors: "Tiwari, R.G.; Misra, A.; Khullar, V.; Agarwal, A.K.; Gupta, S.; Srivastava, A.P."
    },
    {
      title: "Evading gratuitous energy consumption due to activation of superfluous nodes in WSN",
      journal: "Lecture Notes in Networks and Systems",
      year: "2020",
      doi: "10.1007/978-981-15-0146-3_127",
      type: "Book chapter",
      contributors: "Misra, A.; Yadav, D.S."
    },
    {
      title: "Effective data lookup scheme for cluster based data sharing in MANET",
      journal: "Proceedings of the International Conference on I-SMAC (IoT in Social, Mobile, Analytics and Cloud), I-SMAC 2018",
      year: "2018",
      doi: "10.1109/I-SMAC.2018.8653763",
      type: "Conference paper",
      contributors: "Misra, A.; Yadav, D.S."
    },
    {
      title: "An improved approach of decoupling in mobile cloud computing",
      journal: "Lecture Notes in Computer Science",
      year: "2014",
      doi: "10.1007/978-3-319-04483-5_9",
      type: "Conference paper",
      contributors: "De, S.; Misra, A.; De, S."
    },
    {
      title: "A highly scalable solution of an np-complete problem using CUDA",
      journal: "Proceedings - 6th International Symposium on Parallel Computing in Electrical Engineering, PARELEC 2011",
      year: "2011",
      doi: "10.1109/PARELEC.2011.12",
      type: "Conference paper",
      contributors: "Islam, S.; Tandon, R.; Singh, S.; Misra, A."
    },
    {
      title: "A modified parallel approach to Single Source Shortest Path Problem for massively dense graphs using CUDA",
      journal: "2011 2nd International Conference on Computer and Communication Technology, ICCCT-2011",
      year: "2011",
      doi: "10.1109/ICCCT.2011.6075214",
      type: "Conference paper",
      contributors: "Kumar, S.; Misra, A.; Tomar, R.S."
    }
  ],

  blog: [
    {
      title: "The Role of AI in Modern Sensor Networks",
      excerpt: "Exploring how machine learning algorithms are optimizing data transmission and energy efficiency in distributed sensor systems.",
      date: "May 10, 2026",
      readTime: "5 min read",
      tags: ["AI", "Sensor Networks", "Optimization"],
      link: "#",
      pinned: true
    },
    {
      title: "Google Gemini Updates: Flash 1.5 and Project Astra",
      excerpt: "A deep dive into the latest multimodal capabilities and what they mean for the future of intelligent agentic systems.",
      date: "May 14, 2024",
      readTime: "7 min read",
      tags: ["AI", "Innovation"],
      link: "#",
      pinned: true
    },
    {
      title: "Optimizing Distributed Algorithms for Scale",
      excerpt: "This post explores the mathematical foundations of scaling distributed systems without sacrificing latency.",
      date: "December 04, 2024",
      readTime: "4 min read",
      tags: ["Algorithms", "Scale"],
      link: "#"
    },
    {
      title: "Formatting: A Guide to Scientific Writing",
      excerpt: "Best practices for writing clear and concise academic papers for top-tier journals.",
      date: "April 20, 2024",
      readTime: "3 min read",
      tags: ["Writing", "Academic"],
      link: "#"
    }
  ]
} as const;
