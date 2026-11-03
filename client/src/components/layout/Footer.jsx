import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Heart, Sparkles, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { personalInfo } from '../../utils/portfolioData';
import { scrollToSection } from '../../utils/helpers';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#08070B] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Prasanjeet Kumar Mandal
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Sparkles className="w-2.5 h-2.5" />
                AI & Full-Stack
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              BTech student in Artificial Intelligence & Machine Learning at Quantum University. Passionate about building intelligent, scalable and meaningful technology solutions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/10 transition-all"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/10 transition-all"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/10 transition-all"
                aria-label="Email Prasanjeet"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {['Home', 'About', 'Skills', 'Projects', 'Achievements', 'Education', 'Resume', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Projects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              Flagship Work
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  AgroSphere (AI Smart Agriculture)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  AgroLink (Direct Farm Mandi)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Fake Certificate Detection (OCR/NLP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('achievements')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Buildathon & UCOST 21st Exhibitions
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar with Copyright, Admin portal access, and Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Prasanjeet Kumar Mandal. Designed & engineered with precision.</span>
            <Link
              to="/admin"
              className="text-slate-600 hover:text-purple-400 p-1 rounded transition-colors inline-flex items-center"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
            </Link>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
