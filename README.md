# Personal Portfolio Website & Full-Stack Management System
### Prasanjeet Kumar Mandal

> **Aspiring Software Developer | AI/ML Enthusiast | Full-Stack Developer**  
> BTech in Computer Science and Engineering (2025–2028), Quantum University, Roorkee  
> Diploma in Computer Science and Engineering (2021–2024), Jharkhand University of Technology (JUT), Ranchi

---

## 🏗️ Complete Full-Stack Architecture

```
d:/MandalPortfolio/
├── client/                                    # Frontend (React 19 + Vite + Tailwind CSS v4)
│   ├── public/
│   │   ├── images/
│   │   │   ├── avatar.png                     # Master 3-piece tailored suit hero visual
│   │   │   └── projects/                      # High-res SVG vector covers (9 projects)
│   │   └── resume/
│   │       └── Prasanjeet_Kumar_Mandal_Resume.pdf
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                        # ResumeSection.jsx, SocialIcons.jsx
│   │   │   ├── layout/                        # Navbar.jsx, Footer.jsx
│   │   │   ├── home/                          # Hero.jsx (Orbit lens & tailored portrait)
│   │   │   ├── about/                         # About.jsx, Education.jsx
│   │   │   ├── skills/                        # Skills.jsx (Categorized competencies)
│   │   │   ├── projects/                      # Projects.jsx, ProjectCard.jsx, Modal.jsx
│   │   │   ├── achievements/                  # Achievements.jsx (Timeline)
│   │   │   └── contact/                       # Contact.jsx (Validated form)
│   │   ├── services/
│   │   │   └── api.js                         # Centralized REST API client
│   │   ├── utils/
│   │   │   ├── helpers.js                     # Greeting & smooth-scrolling utils
│   │   │   └── portfolioData.js               # Verified profile data
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                                    # Backend (Node.js + Express + Prisma ORM)
│   ├── prisma/
│   │   ├── schema.prisma                      # 10 Normalized MySQL tables
│   │   └── seed.js                            # Complete initial portfolio seed script
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js                    # Prisma client connection manager
│   │   ├── controllers/                       # REST endpoint business logic
│   │   │   ├── authController.js              # Admin JWT login & session
│   │   │   ├── projectController.js           # CRUD for projects & technologies
│   │   │   ├── skillController.js             # Categorized skills manager
│   │   │   ├── educationController.js         # BTech & Diploma history
│   │   │   ├── achievementController.js       # Hackathons & conferences
│   │   │   ├── experienceController.js        # Cognifyz Technologies internship
│   │   │   ├── resumeController.js            # PDF upload & download handler
│   │   │   └── contactController.js           # Submissions, email notifications & DB storage
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js              # JWT Bearer verification
│   │   │   ├── errorHandler.js                # Centralized exception handler
│   │   │   ├── rateLimiter.js                 # Anti-spam & brute-force defense
│   │   │   └── uploadMiddleware.js            # Multer storage for images & PDF
│   │   ├── routes/                            # Modular Express router endpoints
│   │   │   ├── authRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   ├── skillRoutes.js
│   │   │   ├── educationRoutes.js
│   │   │   ├── achievementRoutes.js
│   │   │   ├── experienceRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   ├── resumeRoutes.js
│   │   │   └── apiRoutes.js                   # Unified /api hub
│   │   ├── services/
│   │   │   └── emailService.js                # Nodemailer notification delivery
│   │   ├── utils/
│   │   │   └── jwtHelper.js                   # Token generation & verification
│   │   ├── validators/
│   │   │   └── schemas.js                     # Zod input validation schemas
│   │   ├── app.js                             # Express application config (CORS, Helmet)
│   │   └── server.js                          # Server startup listener
│   ├── uploads/
│   │   ├── projects/                          # Uploaded project images
│   │   └── resume/                            # Uploaded PDF resumes
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── package.json                               # Root workspace scripts
└── README.md
```

---

## 🗄️ Database Design (MySQL 8.0 & Prisma)

The database schema (`server/prisma/schema.prisma`) implements **10 normalized tables**:

1. **`admins`**: Secure credential storage with bcrypt hashing and JWT session management.
2. **`projects`**: Dynamic showcase entries with slugs, category filtering, taglines, and status badges.
3. **`project_technologies`**: Normalized `1-to-N` relation linking projects to individual tech tags.
4. **`project_features`**: Normalized `1-to-N` relation storing structured feature lists for deep-dive modals.
5. **`skills`**: Categorized competencies across *Frontend*, *Backend*, *Programming*, *Database*, *AI / ML*, and *Tools*.
6. **`education`**: Progressive academic history covering Quantum University and Jharkhand University of Technology (JUT).
7. **`achievements`**: Verified records of Buildathon 2026, UCOST 21st Conference, and Smart India Hackathon.
8. **`experiences`**: Professional internships (Cognifyz Technologies).
9. **`social_links`**: Configurable profile connections (GitHub, LinkedIn, Email).
10. **`contact_messages`**: Visitor inquiries with read status and anti-spam rate limiting.
11. **`resumes`**: Active and historical uploaded CV documents with automatic file handling.

---

## 🚀 Execution Commands (Windows & VS Code)

### 1. Running the Frontend
```powershell
# From root directory:
npm run dev

# Or from client directory:
cd client
npm run dev
```
> Access at: **http://localhost:5173**

### 2. Running the Backend REST API
```powershell
# From root directory:
npm run dev:server

# Or from server directory:
cd server
npm run dev
```
> Access at: **http://localhost:5000** (Health check: `http://localhost:5000/api/health`)

### 3. Database Operations (Prisma & MySQL)
```powershell
# Push schema to local MySQL:
npm run db:push

# Run seed script (inserts Prasanjeet's verified projects, education, skills, and admin account):
npm run db:seed

# Open interactive Prisma Database Studio GUI:
npm run db:studio
```

---

## 🔑 Default Admin Account (Seeded)
- **Email**: `jvm.prasanjeet@gmail.com`
- **Default Password**: `Admin@12345` *(Configurable in `server/.env`)*
