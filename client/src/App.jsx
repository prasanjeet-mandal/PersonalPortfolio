import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Achievements from './components/achievements/Achievements';
import Education from './components/about/Education';
import ResumeSection from './components/common/ResumeSection';
import Contact from './components/contact/Contact';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0A0F] text-[#F1F5F9] selection:bg-purple-600 selection:text-white relative">
      {/* Sticky frosted Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* A. Hero Section with Figma frosted orbit avatar */}
        <Hero />

        {/* B. About Me */}
        <About />

        {/* C. Technical Skills */}
        <Skills />

        {/* D. Projects */}
        <Projects />

        {/* E. Achievements & Experiences (Timeline) */}
        <Achievements />

        {/* F. Education */}
        <Education />

        {/* G. Resume */}
        <ResumeSection />

        {/* H. Contact */}
        <Contact />
      </main>

      {/* I. Footer */}
      <Footer />
    </div>
  );
}
