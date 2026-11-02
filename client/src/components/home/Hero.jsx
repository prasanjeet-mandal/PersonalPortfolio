import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Download, 
  Mail, 
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { personalInfo } from '../../utils/portfolioData';
import { scrollToSection } from '../../utils/helpers';

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const roles = personalInfo.titles;

  useEffect(() => {
    const handleType = () => {
      const fullText = roles[currentRoleIndex];

      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(80);

        if (displayedText === fullText) {
          setIsDeleting(true);
          setTypingSpeed(2200); // Pause at full word
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(40);

        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(300);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, typingSpeed, roles]);

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background ambient radial gradients matching Figma dark purple/black theme */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-900/25 via-violet-800/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Official Figma-Theme Master Hero Portrait with Neon Orbit & Card */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] flex items-center justify-center group">
              
              {/* Ambient Glow Backlight */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-600/30 via-violet-500/20 to-transparent blur-3xl animate-pulse-slow pointer-events-none" />

              {/* Master Hero Visual (Exact Theme & Real Photo) */}
              <div className="relative z-10 w-full overflow-hidden rounded-3xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img
                  src="/images/avatar.png?v=3"
                  alt="Prasanjeet Kumar Mandal"
                  className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] filter contrast-[1.02]"
                  onError={(e) => {
                    // Graceful fallback to navy suit avatar
                    e.currentTarget.src = '/images/hero_avatar.png';
                  }}
                />
              </div>

            </div>
          </div>

          {/* Right Column: Hero Typography, Typing Effect & CTAs */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-center lg:text-left">
            
            {/* Hello, I'm subtitle from Figma */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{personalInfo.rolePrefix}</span>
            </div>

            {/* Main Name Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              <span className="block text-gradient">
                {personalInfo.name}
              </span>
            </h1>

            {/* Dynamic Typing Role */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xl sm:text-2xl font-semibold text-slate-200 min-h-[36px]">
              <span className="text-purple-400 font-mono">&gt;</span>
              <span className="text-gradient-purple font-mono">
                {displayedText}
              </span>
              <span className="inline-block w-2.5 h-6 bg-purple-400 animate-pulse ml-0.5" />
            </div>

            {/* Professional Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              "Hi, I'm <strong className="text-white font-medium">Prasanjeet Kumar Mandal</strong> — an aspiring software developer and AI/ML enthusiast passionate about building intelligent, scalable and meaningful technology solutions."
            </p>

            {/* Academic pill context */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                BTech CSE (2025–2028) • Quantum Univ
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Diploma CSE (2021–2024) • JUT Ranchi
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Ex-Intern Cognifyz Technologies
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-lg shadow-purple-600/30 active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-200 bg-white/[0.05] border border-white/15 hover:bg-white/[0.1] hover:border-purple-400/50 transition-all duration-300 active:scale-95 shadow-md"
              >
                <Mail className="w-4 h-4 text-purple-300" />
                <span>Contact Me</span>
              </button>

              <a
                href="/resume/Prasanjeet_Kumar_Mandal_Resume.pdf"
                download="Prasanjeet_Kumar_Mandal_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.03] border border-white/10 hover:border-indigo-400/40 hover:bg-white/[0.06] transition-all duration-300"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Links Row */}
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-center lg:justify-start gap-4">
              <span className="text-xs uppercase font-medium tracking-wider text-slate-400">
                Connect:
              </span>
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 hover:text-white hover:border-purple-500/40 transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 hover:text-white hover:border-purple-500/40 transition-all"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300 hover:text-white hover:border-purple-500/40 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
