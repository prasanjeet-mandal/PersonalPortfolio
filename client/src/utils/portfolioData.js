export const personalInfo = {
  name: "Prasanjeet Kumar Mandal",
  greeting: "Good Morning, Visitor", // dynamically computed by time of day helper
  rolePrefix: "Hello, I'm",
  titles: [
    "Aspiring Software Developer",
    "AI / ML Enthusiast",
    "Full-Stack Developer",
    "Problem Solver & Tech Innovator"
  ],
  tagline: "Java Developer & Full-Stack Engineer — Turning ideas into robust, scalable applications.",
  shortBio: "BTech in Computer Science & Engineering (2025-2028) at Quantum University and Diploma in CSE (2021-2024) from JUT. Passionate about Java, REST APIs, Cloud (AWS), OCR/NLP, and scalable systems.",
  about: {
    story: "I am a dedicated software developer pursuing my Bachelor of Technology in Computer Science and Engineering at Quantum University (July 2025 – July 2028), having previously graduated with a Diploma in Computer Science and Engineering from Jharkhand University of Technology (JUT), Ranchi (July 2021 – July 2024). This progressive academic foundation bridged practical diploma-level engineering with advanced theoretical computer science.",
    approach: "I focus on clean, well-engineered code, robust OOP design principles, and responsive, accessible architectures. My hands-on experience ranges from full-stack Java/JSP applications and cloud services to AI-assisted document verification platforms leveraging OCR (Tesseract) and NLP.",
    aspirations: "Seeking a Software Development Engineer (SDE) internship to leverage experience in building scalable web applications using Core & Advanced Java, JSP, Spring Boot, React, REST APIs, AWS, and modern DevOps tools."
  },
  university: {
    name: "Quantum University",
    location: "Roorkee, Uttarakhand, India",
    degree: "Bachelor of Technology – Computer Science and Engineering",
    duration: "July 2025 – July 2028",
    diploma: {
      institution: "Jharkhand University of Technology (JUT)",
      location: "Ranchi, Jharkhand",
      degree: "Diploma – Computer Science and Engineering",
      duration: "July 2021 – July 2024"
    }
  },
  contact: {
    email: "jvm.prasanjeet@gmail.com",
    github: "https://github.com/prasanjeet-mandal",
    linkedin: "https://www.linkedin.com/in/prasanjeetmandal09",
    location: "Uttarakhand, India",
    availability: "Available for internships & collaborations"
  }
};

export const skillsData = [
  {
    category: "Frontend",
    description: "Responsive, accessible, and high-performance user interfaces",
    skills: [
      { name: "React.js", level: "Proficient", rating: 88, icon: "Code2" },
      { name: "JavaScript (ES6+)", level: "Proficient", rating: 90, icon: "FileCode" },
      { name: "Tailwind CSS", level: "Proficient", rating: 92, icon: "Palette" },
      { name: "HTML5", level: "Advanced", rating: 95, icon: "Layout" },
      { name: "CSS3", level: "Advanced", rating: 90, icon: "Paintbrush" }
    ]
  },
  {
    category: "Backend",
    description: "Scalable server architectures and resilient RESTful APIs",
    skills: [
      { name: "Java", level: "Proficient", rating: 85, icon: "Coffee" },
      { name: "Spring Boot", level: "Intermediate", rating: 78, icon: "Cpu" },
      { name: "Node.js", level: "Proficient", rating: 82, icon: "Server" },
      { name: "Express.js", level: "Proficient", rating: 84, icon: "Network" },
      { name: "REST APIs", level: "Proficient", rating: 88, icon: "Share2" }
    ]
  },
  {
    category: "Programming",
    description: "Core algorithms, data structures, and multi-paradigm languages",
    skills: [
      { name: "Python", level: "Advanced", rating: 92, icon: "Terminal" },
      { name: "Java", level: "Proficient", rating: 85, icon: "Coffee" },
      { name: "JavaScript", level: "Proficient", rating: 90, icon: "FileCode" }
    ]
  },
  {
    category: "Database",
    description: "Relational data modeling, querying, and schema design",
    skills: [
      { name: "MySQL", level: "Proficient", rating: 85, icon: "Database" },
      { name: "PostgreSQL", level: "Intermediate", rating: 78, icon: "DatabaseZap" }
    ]
  },
  {
    category: "AI / ML",
    description: "Machine learning modeling, NLP, and intelligent computer vision",
    skills: [
      { name: "Machine Learning", level: "Intermediate", rating: 82, icon: "Brain" },
      { name: "Scikit-learn", level: "Intermediate", rating: 80, icon: "Binary" },
      { name: "Python AI Applications", level: "Intermediate", rating: 84, icon: "Sparkles" },
      { name: "Tesseract OCR", level: "Intermediate", rating: 78, icon: "ScanLine" },
      { name: "NLP", level: "Intermediate", rating: 75, icon: "MessageSquareCode" }
    ]
  },
  {
    category: "Tools & Technologies",
    description: "Developer tooling, containerization, and modern workflows",
    skills: [
      { name: "Git & GitHub", level: "Proficient", rating: 88, icon: "GitBranch" },
      { name: "Docker", level: "Intermediate", rating: 72, icon: "Container" },
      { name: "VS Code", level: "Advanced", rating: 95, icon: "Laptop" },
      { name: "Postman", level: "Proficient", rating: 85, icon: "Send" },
      { name: "Maven", level: "Intermediate", rating: 74, icon: "Box" },
      { name: "Linux", level: "Intermediate", rating: 76, icon: "TerminalSquare" },
      { name: "Google Maps API", level: "Intermediate", rating: 80, icon: "MapPin" }
    ]
  }
];

export const projectsData = [
  {
    id: "agrosphere",
    title: "AgroSphere",
    category: "AI-Powered Smart Agriculture Platform",
    filterCategory: "AI / ML",
    tagline: "Integrated agricultural ecosystem bridging smart AI recommendations with direct market trade.",
    summary: "A comprehensive agricultural technology platform engineered to solve critical farming pain points through AI-based advisory, crop disease diagnosis, direct marketplace commerce, and logistics optimization.",
    featured: true,
    badge: "Featured Buildathon 2026",
    technologies: ["React", "JavaScript", "Spring Boot", "Java", "Python", "FastAPI", "MySQL", "Scikit-learn", "OR-Tools"],
    keyFeatures: [
      "AI-driven crop suitability recommendations based on seasonal climate & soil data",
      "Computer vision crop disease detection with immediate mitigation remedies",
      "Fertilizer recommendations with optimal nutrient balance calculation",
      "Direct Farmer Mandi & Commerce allowing farmers to sell directly to buyers",
      "Farmer-to-consumer transparent marketplace eliminating unfair brokerage fees",
      "Agricultural financial suite for tracking production expenses, yields, and profits",
      "AI-based agricultural demand forecasting to guide harvest planning",
      "Smart logistics and multi-stop route optimization using Google OR-Tools",
      "Agricultural waste-to-resource transformation and recycling exchange"
    ],
    architecture: "Microservices design combining a responsive React SPA, Spring Boot business backend, Python FastAPI inference engine, and MySQL transactional storage.",
    links: {
      github: "https://github.com/prasanjeet-mandal/AgroSphere",
      live: "https://agro-sphere-three.vercel.app/"
    },
    images: {
      cover: "/images/projects/agrosphere-cover.svg"
    }
  },
  {
    id: "agrolink",
    title: "AgroLink",
    category: "Agricultural Marketplace & Digital Commerce",
    filterCategory: "Full-Stack",
    tagline: "Empowering farmers with transparent market access and direct consumer connectivity.",
    summary: "A dedicated digital marketplace connecting local agricultural producers directly with consumers, retailers, and certified input suppliers to foster fair prices.",
    featured: true,
    badge: "Presented at UCOST 21st",
    technologies: ["React", "JavaScript", "Node.js", "Express.js", "MySQL", "Tailwind CSS"],
    keyFeatures: [
      "Direct farmer-to-consumer digital commerce eliminating multiple intermediaries",
      "Dynamic catalog of fresh farm produce with transparent real-time mandi prices",
      "Farmer & Farmer Producer Organization (FPO) profiles and bulk dispatch matching",
      "Direct calling and order placement from agricultural input dealers for seeds and fertilizers",
      "Multilingual, mobile-first design tailored for easy access across rural regions"
    ],
    architecture: "Responsive React frontend with Express REST API, transactional MySQL database, and streamlined communication gateways.",
    links: {
      github: "https://github.com/prasanjeet-mandal/AgroLink",
      live: "https://agrolink.demo.local"
    },
    images: {
      cover: "/images/projects/agrolink-cover.svg"
    }
  },
  {
    id: "fake-certificate-detection",
    title: "Fake Certificate Detection System",
    category: "AI / Document Verification",
    filterCategory: "AI / ML",
    tagline: "End-to-end OCR and NLP pipeline to verify academic and credential authenticity.",
    summary: "An automated security system that inspects digital and scanned certificates to uncover counterfeits, altered serial numbers, and fraudulent issuer claims.",
    featured: true,
    badge: "Core AI Project",
    technologies: ["Java", "Tesseract OCR", "NLP", "JavaScript", "PostgreSQL"],
    keyFeatures: [
      "Secure digital certificate and document upload pipeline with format validation",
      "Tesseract OCR image pre-processing, noise filtering, and high-precision text extraction",
      "NLP entity recognition to extract and validate institution names, dates, and student identifiers",
      "Automated verification against institutional registry records and format patterns",
      "Visual anomaly highlighting indicating suspect areas with confidence scores",
      "High-throughput REST API backend built in Java for enterprise verification portals"
    ],
    architecture: "Java backend service integrated with native Tesseract OCR bindings, NLP extraction routines, and PostgreSQL relational audit log.",
    links: {
      github: "https://github.com/prasanjeet-mandal/Fake-Certificate-Detection",
      live: "https://cert-verify.demo.local"
    },
    images: {
      cover: "/images/projects/cert-cover.svg"
    }
  },
  {
    id: "ai-securedocverify",
    title: "AI-SecureDocVerify",
    category: "Document Security & Integrity Research",
    filterCategory: "Research",
    tagline: "Exploring cryptographic integrity proofs and layout embeddings for document verification.",
    summary: "An experimental exploration studying how visual layout embeddings and cryptographic hash chains can strengthen automated document verification pipelines.",
    featured: false,
    badge: "Research & Development",
    technologies: ["Python", "OpenCV", "PyTorch", "FastAPI"],
    keyFeatures: [
      "Pixel-level tamper localization using perceptual hashing and Siamese networks",
      "Structural layout analysis for tampered signature or seal detection",
      "Research benchmark comparing classical computer vision against deep learning embeddings"
    ],
    statusNote: "Research concept currently undergoing validation and algorithmic benchmarking.",
    links: {
      github: "https://github.com/prasanjeet-mandal/AI-SecureDocVerify",
      live: null
    },
    images: {
      cover: "/images/projects/research-cover.svg"
    }
  },
  {
    id: "vpn-anomaly-detection",
    title: "AI-Powered VPN Anomaly Detection",
    category: "Network Traffic Security & ML",
    filterCategory: "AI / ML",
    tagline: "Machine learning classifier for detecting abnormal behaviors in encrypted VPN flows.",
    summary: "Investigation into flow-based statistical feature extraction from encrypted network sessions to detect anomalies and unauthorized tunneling activities.",
    featured: false,
    badge: "Network Security ML",
    technologies: ["Python", "Scikit-learn", "Pandas", "Wireshark / PCAP"],
    keyFeatures: [
      "Extraction of packet inter-arrival times, payload byte distributions, and flow durations",
      "Evaluation of Random Forest and Isolation Forest models for anomaly classification",
      "Non-intrusive metadata analysis preserving payload privacy"
    ],
    statusNote: "Experimental research project utilizing public network benchmark datasets.",
    links: {
      github: "https://github.com/prasanjeet-mandal/VPN-Anomaly-Detection",
      live: null
    },
    images: {
      cover: "/images/projects/vpn-cover.svg"
    }
  },
  {
    id: "inventory-management",
    title: "Inventory Management System",
    category: "Full-Stack Management Application",
    filterCategory: "Full-Stack",
    tagline: "Scalable business inventory, stock tracking, and supplier coordination system.",
    summary: "A robust inventory management system facilitating real-time stock monitoring, supplier orders, reorder point alerts, and sales records.",
    featured: false,
    badge: "Application Engineering",
    technologies: ["Java", "Spring Boot", "MySQL", "React", "REST API"],
    keyFeatures: [
      "Dynamic stock tracking with automated low-stock warnings",
      "Supplier order tracking and delivery status management",
      "Role-based access control for managers and warehouse staff"
    ],
    statusNote: "Prototype implementation ready for production deployment testing.",
    links: {
      github: "https://github.com/prasanjeet-mandal/Inventory-Management-System",
      live: null
    },
    images: {
      cover: "/images/projects/inventory-cover.svg"
    }
  },
  {
    id: "web-scraping-engine",
    title: "Interactive Web Scraping Program",
    category: "Data Extraction & Automation",
    filterCategory: "Tools",
    tagline: "Automated multi-threaded data harvesting tool with dynamic selector support.",
    summary: "A modular Python tool designed for resilient web data collection, rate-limiting management, and automated export to CSV/JSON formats.",
    featured: false,
    badge: "Automation Utility",
    technologies: ["Python", "BeautifulSoup4", "Selenium", "Requests"],
    keyFeatures: [
      "Configurable CSS/XPath selector parsing",
      "Anti-detection rotation, proxy handling, and polite crawling delays",
      "Clean data transformation pipeline with schema validation"
    ],
    statusNote: "Utility script library actively used for data gathering in ML projects.",
    links: {
      github: "https://github.com/prasanjeet-mandal/Web-Scraper-Tool",
      live: null
    },
    images: {
      cover: "/images/projects/scraper-cover.svg"
    }
  },
  {
    id: "serverless-research",
    title: "Serverless Architecture Research",
    category: "Cloud Systems Exploration",
    filterCategory: "Research",
    tagline: "Comparative latency and cost study of serverless functions versus containerized microservices.",
    summary: "Academic and architectural analysis evaluating cold-start latencies, memory footprint, and scaling economics across cloud serverless environments.",
    featured: false,
    badge: "Cloud Architecture Study",
    technologies: ["Cloud Computing", "AWS Lambda", "Node.js", "Docker"],
    keyFeatures: [
      "Cold-start latency benchmarking under varying memory allocations",
      "Architectural trade-off matrix between event-driven FaaS and dedicated containers"
    ],
    statusNote: "Academic research documentation and literature evaluation.",
    links: {
      github: "https://github.com/prasanjeet-mandal/Serverless-Research",
      live: null
    },
    images: {
      cover: "/images/projects/cloud-cover.svg"
    }
  },
  {
    id: "iot-data-research",
    title: "IoT Data Management Research",
    category: "Sensor Data Pipeline Study",
    filterCategory: "Research",
    tagline: "Investigation into high-velocity telemetry ingestion and lightweight edge aggregation.",
    summary: "Research into optimizing time-series sensor ingestion pipelines, message brokering, and edge preprocessing for agricultural IoT sensors.",
    featured: false,
    badge: "IoT & Data Systems",
    technologies: ["MQTT", "Python", "Time-Series DB", "IoT Protocols"],
    keyFeatures: [
      "Evaluation of MQTT vs HTTP overhead in low-bandwidth agricultural deployments",
      "Data downsampling algorithms for long-term soil moisture and weather telemetry"
    ],
    statusNote: "Ongoing research aligned with AgroSphere's future hardware sensor expansion.",
    links: {
      github: "https://github.com/prasanjeet-mandal/IoT-Data-Management",
      live: null
    },
    images: {
      cover: "/images/projects/iot-cover.svg"
    }
  }
];

export const achievementsData = [
  {
    id: "cognifyz-internship",
    title: "Software Development Intern",
    organization: "Cognifyz Technologies",
    association: "Nagpur, Maharashtra (Remote)",
    date: "September 2025",
    badge: "Industry Internship",
    type: "Work Experience",
    description: "Contributed to real-world Java application development tasks within a professional software development team, following structured SDLC practices, code reviews, and Git collaboration.",
    highlights: [
      "Applied Core Java skills to design, build, and unit-test functional software components, ensuring code reliability and maintainability.",
      "Participated in peer code reviews and collaborative debugging sessions, improving code quality and strengthening team communication skills.",
      "Gained exposure to version control workflows using Git, including branching strategies and pull request conventions used in industry settings."
    ]
  },
  {
    id: "ucost-2026",
    title: "UCOST 21st Conference Exhibition",
    organization: "Uttarakhand State Science & Technology Congress (UCOST)",
    association: "Supported by Quantum University",
    date: "2026",
    badge: "Conference Presentation",
    type: "Conference",
    description: "Participated in the prestigious 21st Uttarakhand State Science and Technology Congress (UCOST). Exhibited and presented the AgroLink project to visiting scientists, faculty, and industry practitioners. Demonstrated how decentralized digital market access eliminates middlemen and boosts agricultural income.",
    highlights: [
      "Presented AgroLink live at the scientific exhibition hall",
      "Received constructive feedback from state agricultural scientists and technology delegates",
      "Honored the support and mentorship provided by Quantum University faculty"
    ]
  },
  {
    id: "buildathon-2026",
    title: "Buildathon 2026 — AgroSphere",
    organization: "Prahar Community × ASAI",
    association: "Quantum University",
    date: "28 October 2026",
    badge: "Hackathon / Buildathon",
    type: "Hackathon",
    description: "Participated in the high-energy Buildathon organized collaboratively by Prahar Community and ASAI at Quantum University on 28 October 2026. Built and demonstrated AgroSphere, emphasizing practical engineering, rapid AI model deployment, and collaborative teamwork.",
    highlights: [
      "Demonstrated AI crop diagnosis and route-optimized logistics live within the buildathon timeframe",
      "Collaborated intensively across frontend, Spring Boot backend, and AI inference microservices",
      "Praised for addressing real, tangible agricultural challenges with solid implementation"
    ]
  },
  {
    id: "sih-2026",
    title: "Smart India Hackathon 2026 Participation",
    organization: "Ministry of Education / SIH Innovation Cell",
    association: "Quantum University Innovation Team",
    date: "2026",
    badge: "National Hackathon",
    type: "Hackathon",
    description: "Participated in Smart India Hackathon (SIH) 2026, targeting the national challenge of agricultural market intermediaries: 'Multiple intermediaries reduce farmers' earnings and increase consumer prices.' Developed a transparent, verified commerce prototype to connect farmers directly with consumers.",
    highlights: [
      "Engineered comprehensive marketplace flow with price discovery algorithms",
      "Focused strictly on verified technological workflows and genuine problem solving",
      "Gained deep experience in large-scale system requirements and team coordination"
    ]
  }
];

export const educationData = [
  {
    id: "btech-quantum",
    degree: "Bachelor of Technology – Computer Science and Engineering",
    institution: "Quantum University",
    location: "Roorkee, Uttarakhand",
    duration: "July 2025 – July 2028",
    status: "Currently Pursuing (Lateral Entry)",
    description: "Advanced engineering degree focused on computer science fundamentals, algorithm optimization, cloud infrastructure, and modern system architectures.",
    highlights: [
      "Pursuing advanced coursework in Data Structures and Algorithms, Operating Systems, Database Management Systems, and Cloud Computing.",
      "Actively participating in technical clubs and coding competitions to strengthen problem-solving and collaborative development skills."
    ]
  },
  {
    id: "diploma-jut",
    degree: "Diploma – Computer Science and Engineering",
    institution: "Jharkhand University of Technology (JUT)",
    location: "Ranchi, Jharkhand",
    duration: "July 2021 – July 2024",
    status: "Graduated",
    description: "Solid foundational technical education providing comprehensive exposure to core programming, database normalization, and web technologies.",
    highlights: [
      "Completed core modules in Java Programming, Web Technologies, Relational Databases, Networking, and Software Engineering principles.",
      "Developed multiple academic projects applying full-stack development techniques, forming the foundation for professional project work."
    ]
  }
];
