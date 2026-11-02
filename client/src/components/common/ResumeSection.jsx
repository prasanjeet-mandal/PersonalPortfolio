import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2
} from 'lucide-react';
import { personalInfo } from '../../utils/portfolioData';

export default function ResumeSection() {
  const [showFullPreview, setShowFullPreview] = useState(false);
  const resumeUrl = "/resume/Prasanjeet_Kumar_Mandal_Resume.pdf";

  return (
    <section id="resume" className="py-24 relative overflow-hidden bg-[#0C0B11]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Resume & <span className="text-gradient-purple">Credentials</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Download or preview the complete resume outlining technical skills, flagship projects, and academic background.
          </p>
        </div>

        {/* Resume Preview & Actions Container */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] relative overflow-hidden space-y-8">
          
          {/* Top Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Prasanjeet_Kumar_Mandal_Resume.pdf
                </h3>
                <span className="text-xs text-slate-400">
                  Updated with BTech CSE (Quantum Univ) & Diploma CSE (JUT)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFullPreview(!showFullPreview)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-purple-500/40 transition-all"
              >
                <Eye className="w-4 h-4 text-purple-400" />
                <span>{showFullPreview ? 'Hide Embed' : 'Preview Document'}</span>
              </button>

              <a
                href={resumeUrl}
                download="Prasanjeet_Kumar_Mandal_Resume.pdf"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {/* Document Preview Snapshot Card */}
          <div className="bg-[#0B0A0F]/80 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Header info */}
            <div className="border-b border-white/10 pb-4 space-y-1 text-center sm:text-left">
              <h4 className="text-xl font-bold text-white tracking-wide">
                {personalInfo.name}
              </h4>
              <p className="text-xs text-purple-300 font-medium">
                Aspiring Software Developer | AI/ML Enthusiast | Full-Stack Developer
              </p>
              <p className="text-[11px] text-slate-400">
                Quantum University, Roorkee, Uttarakhand • {personalInfo.contact.email}
              </p>
            </div>

            {/* Quick sections grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              
              {/* Education */}
              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Education
                </span>
                <div>
                  <p className="font-semibold text-white">BTech – CSE</p>
                  <p className="text-slate-400">Quantum University (2025–2028)</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Diploma – CSE</p>
                  <p className="text-slate-400">JUT Ranchi (2021–2024)</p>
                </div>
              </div>

              {/* Core Stacks */}
              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Technical Stacks
                </span>
                <p className="text-slate-300">Java, Python, JavaScript</p>
                <p className="text-slate-400">React, Spring Boot, Node.js</p>
                <p className="text-slate-500">MySQL, PostgreSQL, Tesseract OCR</p>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <span className="font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Flagship Projects
                </span>
                <p className="text-slate-300">• AgroSphere (Buildathon 2026)</p>
                <p className="text-slate-400">• AgroLink (UCOST 21st Conf)</p>
                <p className="text-slate-500">• Fake Certificate Detection</p>
              </div>

            </div>

            {/* Embedded Iframe viewer when toggled */}
            {showFullPreview && (
              <div className="pt-4 border-t border-white/10">
                <div className="w-full h-96 rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                  <iframe
                    src={resumeUrl}
                    title="Prasanjeet Kumar Mandal Resume Preview"
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Quick Notice */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <span>Configurable through Admin Dashboard</span>
            <span className="text-purple-400 font-mono">PDF Format • 1 Page</span>
          </div>

        </div>

      </div>
    </section>
  );
}
