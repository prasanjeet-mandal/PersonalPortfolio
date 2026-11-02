# Personal Portfolio Website — Prasanjeet Kumar Mandal

> **Aspiring Software Developer | AI/ML Enthusiast | Full-Stack Developer**  
> BTech in Computer Science and Engineering (Semester 4) at Quantum University, Roorkee, Uttarakhand.

---

## 🎨 Design Philosophy & Figma Faithfulness

This portfolio is built following the design reference from the provided Figma template:
- **Visual Identity**: Modern obsidian dark mode (`#0B0A0F`, `#121118`) accented with deep purple/violet glows (`#8B5CF6`, `#6366F1`) and crisp typography (`Plus Jakarta Sans`).
- **Dynamic Header Greeting**: Adapts dynamically according to the visitor's local time (`Good Morning, Visitor`, `Good Afternoon, Visitor`, `Good Evening, Visitor`).
- **Hero Orbit Lens**: Glassmorphic frosted backdrop sphere with orbital floating badges representing AI/ML (Brain), UI/UX (Palette), Collaboration (Message), and Full-Stack Engineering (Code), paired with an interactive 3D-styled avatar.
- **Typewriter Role Animator**: Smooth typing animation showcasing key identities.
- **Micro-Interactions**: Glassmorphism cards with fine 1px translucent borders, hover elevations, and responsive navigation.

---

## 📂 Project Architecture

```
d:/MandalPortfolio/
├── client/
│   ├── public/
│   │   ├── images/
│   │   │   ├── avatar.png
│   │   │   └── projects/
│   │   │       ├── agrosphere-cover.svg
│   │   │       ├── agrolink-cover.svg
│   │   │       ├── cert-cover.svg
│   │   │       ├── research-cover.svg
│   │   │       ├── vpn-cover.svg
│   │   │       ├── inventory-cover.svg
│   │   │       ├── scraper-cover.svg
│   │   │       ├── cloud-cover.svg
│   │   │       └── iot-cover.svg
│   │   └── resume/
│   │       └── Prasanjeet_Kumar_Mandal_Resume.pdf
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── ResumeSection.jsx
│   │   │   │   └── SocialIcons.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── home/
│   │   │   │   └── Hero.jsx
│   │   │   ├── about/
│   │   │   │   ├── About.jsx
│   │   │   │   └── Education.jsx
│   │   │   ├── skills/
│   │   │   │   └── Skills.jsx
│   │   │   ├── projects/
│   │   │   │   ├── Projects.jsx
│   │   │   │   ├── ProjectCard.jsx
│   │   │   │   └── ProjectDetailModal.jsx
│   │   │   ├── achievements/
│   │   │   │   └── Achievements.jsx
│   │   │   └── contact/
│   │   │       └── Contact.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   ├── helpers.js
│   │   │   └── portfolioData.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Phase 1 Implementation Summary

All Phase 1 requirements have been completed and verified:

1. **Hero Section**:
   - Dynamic time-of-day greeting in the top header.
   - Glassmorphism orbit circle with floating AI/Design/Code badges.
   - 3D-styled avatar portrait.
   - Live typewriter effect for roles.
   - CTAs: "Explore Projects", "Contact Me", and "Download Resume".
   - Verified social links: GitHub, LinkedIn, and Email.

2. **About Me**:
   - Educational overview (Semester 4 BTech Computer Science and Engineering, Quantum University).
   - Problem-solving approach and technical interests.
   - Four highlight cards and university summary card.

3. **Technical Skills**:
   - Realistic proficiency levels across 6 categories (Frontend, Backend, Programming, Database, AI/ML, Tools).
   - Live category filtering and interactive search.
   - Visual progress indicators.

4. **Projects Showcase**:
   - **AgroSphere**: AI-powered smart agriculture platform (Buildathon 2026).
   - **AgroLink**: Direct farm marketplace (Presented at UCOST 21st Conference).
   - **Fake Certificate Detection System**: OCR and NLP document verification.
   - Verified exploratory/research projects (AI-SecureDocVerify, VPN Anomaly Detection, Inventory Management, etc.).
   - Interactive "View Details" modal with deep-dive architectural specifications.
   - Filterable by tags and searchable by keyword.

5. **Achievements & Experience Timeline**:
   - Timeline layout for UCOST 21st Conference, Buildathon 2026, and Smart India Hackathon 2026.
   - Dates, badges, organizers, and verified factual highlights.

6. **Education**:
   - Dedicated Quantum University BTech AIML section with coursework breakdown.

7. **Resume**:
   - Downloadable PDF (`Prasanjeet_Kumar_Mandal_Resume.pdf`).
   - In-app preview toggle.

8. **Contact Form**:
   - Full validation for Name, Email, Subject, and Message.
   - Reactive status alert feedback.
   - Direct mail and verified profile links.

9. **Footer**:
   - Tagline, quick links, social profiles, and smooth back-to-top button.

---

## 💻 Development & Execution Commands

### Prerequisites
- Node.js (v18+ or v24+)
- npm (v9+)

### Running Frontend Locally (Windows / VS Code)
```bash
# From root directory:
npm run dev

# Or directly from client/:
cd client
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```bash
npm run build
```
The production bundle will be generated in `client/dist/`.

---

## ⏭️ Next Step: Phase 2 (Backend Development)
As instructed:
> **IMPORTANT: Do not start backend development until the frontend has been implemented and reviewed. Do not skip phases.**

Once you review and approve this Phase 1 frontend implementation, we will proceed to:
- **Phase 2**: Node.js & Express REST API with JWT authentication, file uploads, and Nodemailer.
- **Phase 3**: MySQL normalized database schema & Prisma migrations.
- **Phase 4**: Full frontend-backend API integration.
- **Phase 5**: Secure Admin Dashboard.
