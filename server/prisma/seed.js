import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Portfolio Database Seeding for Prasanjeet Kumar Mandal...');

  // 1. Seed Admin
  const adminEmail = process.env.ADMIN_EMAIL || 'jvm.prasanjeet@gmail.com';
  const rawPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
  const passwordHash = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
      name: 'Prasanjeet Kumar Mandal',
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Clear previous dynamic content for fresh seed
  await prisma.projectTechnology.deleteMany();
  await prisma.projectFeature.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.education.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.socialLink.deleteMany();

  // 3. Seed Projects
  const projectsData = [
    {
      slug: 'agrosphere',
      title: 'AgroSphere',
      category: 'AI-Powered Smart Agriculture Platform',
      filterCategory: 'AI / ML',
      tagline: 'Integrated agricultural technology platform addressing real-world farming challenges with AI and smart route logistics.',
      summary: 'A comprehensive agricultural technology platform engineered to solve critical farming pain points through AI-based advisory, crop disease diagnosis, direct marketplace commerce, and logistics optimization.',
      featured: true,
      badge: 'Featured Buildathon 2026',
      architecture: 'Microservices design combining a responsive React SPA, Spring Boot business backend, Python FastAPI inference engine, and MySQL transactional storage.',
      githubUrl: 'https://github.com/prasanjeet-mandal/AgroSphere',
      liveUrl: 'https://agrosphere.demo.local',
      coverImage: '/images/projects/agrosphere-cover.svg',
      orderIndex: 1,
      technologies: ['React', 'JavaScript', 'Spring Boot', 'Java', 'Python', 'FastAPI', 'MySQL', 'Scikit-learn', 'OR-Tools'],
      features: [
        'AI-based crop recommendations',
        'Crop disease detection with computer vision',
        'Fertilizer recommendations',
        'Direct Farmer Mandi and Commerce',
        'Farmer-to-consumer connectivity',
        'Agricultural expense and profit tracking',
        'AI-based demand forecasting',
        'Smart logistics and route optimization',
        'Agricultural waste-to-resource solutions',
      ],
    },
    {
      slug: 'agrolink',
      title: 'AgroLink',
      category: 'Agricultural Marketplace & Digital Commerce',
      filterCategory: 'Full-Stack',
      tagline: 'A digital platform focused on connecting farmers with consumers and agricultural suppliers.',
      summary: 'A dedicated digital marketplace connecting local agricultural producers directly with consumers, retailers, and certified input suppliers to foster fair prices.',
      featured: true,
      badge: 'Presented at UCOST 21st',
      architecture: 'Responsive React frontend with Express REST API, transactional MySQL database, and streamlined communication gateways.',
      githubUrl: 'https://github.com/prasanjeet-mandal/AgroLink',
      liveUrl: 'https://agrolink.demo.local',
      coverImage: '/images/projects/agrolink-cover.svg',
      orderIndex: 2,
      technologies: ['React', 'JavaScript', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS'],
      features: [
        'Direct farmer-to-consumer commerce',
        'Product listings and inventory management',
        'Agricultural market access',
        'Farmer and FPO connectivity',
        'Direct calling and ordering from agricultural input dealers for seeds and fertilizers',
      ],
    },
    {
      slug: 'fake-certificate-detection',
      title: 'Fake Certificate Detection System',
      category: 'AI / Document Verification',
      filterCategory: 'AI / ML',
      tagline: 'An end-to-end certificate verification system that detects potentially fake certificates using OCR and NLP techniques.',
      summary: 'An automated security system that inspects digital and scanned certificates to uncover counterfeits, altered serial numbers, and fraudulent issuer claims.',
      featured: true,
      badge: 'Core AI System',
      architecture: 'Java backend service integrated with native Tesseract OCR bindings, NLP extraction routines, and PostgreSQL relational audit log.',
      githubUrl: 'https://github.com/prasanjeet-mandal/Fake-Certificate-Detection',
      liveUrl: 'https://cert-verify.demo.local',
      coverImage: '/images/projects/cert-cover.svg',
      orderIndex: 3,
      technologies: ['Java', 'Tesseract OCR', 'NLP', 'JavaScript', 'PostgreSQL'],
      features: [
        'Certificate uploading pipeline',
        'Tesseract OCR text extraction and analysis',
        'Verification of institution names, dates and serial numbers',
        'Anomaly highlighting with confidence scoring',
        'Backend REST API',
      ],
    },
    {
      slug: 'tours-travel-management',
      title: 'Tours and Travel Management System',
      category: 'Full-Stack Web Application',
      filterCategory: 'Full-Stack',
      tagline: 'Full-stack travel booking, itinerary management, and customer portal.',
      summary: 'A full-stack travel management platform with modules for tour package listings, customer bookings, itinerary management, and admin controls using JSP and Core Java.',
      featured: false,
      badge: 'Production Prototype',
      architecture: 'MVC architecture built with Core Java, JSP, JDBC, and MySQL relational schema.',
      githubUrl: 'https://github.com/prasanjeet-mandal/Tours-And-Travel-System',
      liveUrl: null,
      coverImage: '/images/projects/inventory-cover.svg',
      orderIndex: 4,
      technologies: ['Java', 'JSP', 'JDBC', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
      features: [
        'Tour package catalog and dynamic pricing',
        'Secure customer booking and reservation flow',
        'Admin dashboard for itinerary and client management',
        'Relational data models and CRUD operations via JDBC',
      ],
    },
  ];

  for (const p of projectsData) {
    const { technologies, features, ...projectDetails } = p;
    await prisma.project.create({
      data: {
        ...projectDetails,
        technologies: {
          create: technologies.map(name => ({ name })),
        },
        features: {
          create: features.map(feature => ({ feature })),
        },
      },
    });
  }
  console.log(`✅ Seeded ${projectsData.length} projects with technologies and features.`);

  // 4. Seed Skills
  const skills = [
    // Frontend
    { category: 'Frontend', name: 'React.js', level: 'Proficient', rating: 88, icon: 'Code2', orderIndex: 1 },
    { category: 'Frontend', name: 'JavaScript (ES6+)', level: 'Proficient', rating: 90, icon: 'FileCode', orderIndex: 2 },
    { category: 'Frontend', name: 'Tailwind CSS', level: 'Proficient', rating: 92, icon: 'Palette', orderIndex: 3 },
    { category: 'Frontend', name: 'HTML5', level: 'Advanced', rating: 95, icon: 'Layout', orderIndex: 4 },
    { category: 'Frontend', name: 'CSS3', level: 'Advanced', rating: 90, icon: 'Paintbrush', orderIndex: 5 },

    // Backend
    { category: 'Backend', name: 'Java (Core & Advanced)', level: 'Proficient', rating: 88, icon: 'Coffee', orderIndex: 1 },
    { category: 'Backend', name: 'Spring Boot', level: 'Intermediate', rating: 78, icon: 'Cpu', orderIndex: 2 },
    { category: 'Backend', name: 'Node.js', level: 'Proficient', rating: 82, icon: 'Server', orderIndex: 3 },
    { category: 'Backend', name: 'Express.js', level: 'Proficient', rating: 84, icon: 'Network', orderIndex: 4 },
    { category: 'Backend', name: 'JSP & JDBC', level: 'Proficient', rating: 85, icon: 'Layers', orderIndex: 5 },
    { category: 'Backend', name: 'REST APIs', level: 'Proficient', rating: 90, icon: 'Share2', orderIndex: 6 },

    // Database
    { category: 'Database', name: 'MySQL', level: 'Proficient', rating: 86, icon: 'Database', orderIndex: 1 },
    { category: 'Database', name: 'PostgreSQL', level: 'Intermediate', rating: 80, icon: 'DatabaseZap', orderIndex: 2 },

    // AI / ML
    { category: 'AI / ML', name: 'Machine Learning', level: 'Intermediate', rating: 82, icon: 'Brain', orderIndex: 1 },
    { category: 'AI / ML', name: 'Scikit-learn', level: 'Intermediate', rating: 80, icon: 'Binary', orderIndex: 2 },
    { category: 'AI / ML', name: 'Tesseract OCR', level: 'Intermediate', rating: 80, icon: 'ScanLine', orderIndex: 3 },
    { category: 'AI / ML', name: 'NLP', level: 'Intermediate', rating: 76, icon: 'MessageSquareCode', orderIndex: 4 },

    // Cloud & DevOps
    { category: 'Tools & Technologies', name: 'AWS (EC2, S3)', level: 'Intermediate', rating: 75, icon: 'Cloud', orderIndex: 1 },
    { category: 'Tools & Technologies', name: 'Git & GitHub', level: 'Proficient', rating: 90, icon: 'GitBranch', orderIndex: 2 },
    { category: 'Tools & Technologies', name: 'Docker', level: 'Intermediate', rating: 72, icon: 'Container', orderIndex: 3 },
    { category: 'Tools & Technologies', name: 'Maven', level: 'Intermediate', rating: 76, icon: 'Box', orderIndex: 4 },
    { category: 'Tools & Technologies', name: 'Linux CLI', level: 'Intermediate', rating: 80, icon: 'TerminalSquare', orderIndex: 5 },
  ];

  for (const s of skills) {
    await prisma.skill.create({ data: s });
  }
  console.log(`✅ Seeded ${skills.length} categorized skills.`);

  // 5. Seed Education
  const educationList = [
    {
      degree: 'Bachelor of Technology – Computer Science and Engineering',
      institution: 'Quantum University',
      location: 'Roorkee, Uttarakhand',
      duration: 'July 2025 – July 2028',
      status: 'Currently Pursuing (Lateral Entry)',
      description: 'Advanced engineering degree focused on computer science fundamentals, algorithm optimization, cloud infrastructure, and modern system architectures.',
      highlights: JSON.stringify([
        'Pursuing advanced coursework in Data Structures and Algorithms, Operating Systems, Database Management Systems, and Cloud Computing.',
        'Actively participating in technical clubs and coding competitions to strengthen problem-solving and collaborative development skills.',
      ]),
      orderIndex: 1,
    },
    {
      degree: 'Diploma – Computer Science and Engineering',
      institution: 'Jharkhand University of Technology (JUT)',
      location: 'Ranchi, Jharkhand',
      duration: 'July 2021 – July 2024',
      status: 'Graduated',
      description: 'Solid foundational technical education providing comprehensive exposure to core programming, database normalization, and web technologies.',
      highlights: JSON.stringify([
        'Completed core modules in Java Programming, Web Technologies, Relational Databases, Networking, and Software Engineering principles.',
        'Developed multiple academic projects applying full-stack development techniques, forming the foundation for professional project work.',
      ]),
      orderIndex: 2,
    },
  ];

  for (const e of educationList) {
    await prisma.education.create({ data: e });
  }
  console.log(`✅ Seeded education records.`);

  // 6. Seed Achievements & Experiences
  await prisma.experience.create({
    data: {
      title: 'Software Development Intern',
      company: 'Cognifyz Technologies',
      location: 'Nagpur, Maharashtra (Remote)',
      duration: 'September 2025',
      type: 'Internship',
      description: 'Contributed to real-world Java application development tasks within a professional software development team, following structured SDLC practices.',
      highlights: JSON.stringify([
        'Applied Core Java skills to design, build, and unit-test functional software components.',
        'Participated in peer code reviews and collaborative debugging sessions.',
        'Gained exposure to version control workflows using Git, branching, and pull requests.',
      ]),
      orderIndex: 1,
    },
  });

  const achievements = [
    {
      title: 'Buildathon 2026 — AgroSphere',
      organization: 'Prahar Community × ASAI',
      association: 'Quantum University',
      date: '28 October 2026',
      badge: 'Hackathon / Buildathon',
      type: 'Hackathon',
      description: 'Participated in the Buildathon organized by Prahar Community × ASAI at Quantum University on 28 October 2026. Built and demonstrated AgroSphere.',
      orderIndex: 1,
    },
    {
      title: 'UCOST 21st Conference Exhibition',
      organization: 'Uttarakhand State Science & Technology Congress (UCOST)',
      association: 'Supported by Quantum University',
      date: '2026',
      badge: 'Conference Presentation',
      type: 'Conference',
      description: 'Participated in the 21st Uttarakhand State Science and Technology Congress (UCOST) and presented the AgroLink project exhibition.',
      orderIndex: 2,
    },
    {
      title: 'Smart India Hackathon 2026 Participation',
      organization: 'Ministry of Education / SIH Innovation Cell',
      association: 'Quantum University Innovation Team',
      date: '2026',
      badge: 'National Hackathon',
      type: 'Hackathon',
      description: 'Tackled the problem statement: Multiple intermediaries reduce farmers earnings and increase consumer prices.',
      orderIndex: 3,
    },
  ];

  for (const a of achievements) {
    await prisma.achievement.create({ data: a });
  }
  console.log(`✅ Seeded achievements & internship experiences.`);

  // 7. Seed Social Links
  await prisma.socialLink.createMany({
    data: [
      { platform: 'GitHub', url: 'https://github.com/prasanjeet-mandal', icon: 'Github' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/prasanjeetmandal09', icon: 'Linkedin' },
      { platform: 'Email', url: 'mailto:jvm.prasanjeet@gmail.com', icon: 'Mail' },
    ],
  });
  console.log(`✅ Seeded verified social links.`);

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
