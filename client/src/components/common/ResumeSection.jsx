import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  X,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { personalInfo } from '../../utils/portfolioData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function ResumeSection() {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadCount, setDownloadCount] = useState(18);

  const resumeUrl = "/resume/Prasanjeet_Kumar_Mandal_Resume.pdf";

  // Fetch download count from backend API on mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/resume/stats`)
      .then(res => res.json())
      .then(data => {
        if (data.downloads) setDownloadCount(data.downloads);
      })
      .catch(() => {});
  }, []);

  // Handle Download and track metric
  const handleDownload = () => {
    setDownloadCount(prev => prev + 1);
    fetch(`${API_BASE_URL}/resume/track-download`, { method: 'POST' }).catch(() => {});
  };

  // Copy resume link to clipboard
  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${resumeUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 15, 75));
  const handleResetZoom = () => setZoomLevel(100);

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
            Download or preview the verified ATS-compliant resume outlining technical engineering skills, flagship systems, and academic milestones.
          </p>
        </div>

        {/* Resume Preview & Actions Container */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-white/[0.08] relative overflow-hidden space-y-8">
          
          {/* Top Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-violet-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    Prasanjeet_Kumar_Mandal_Resume.pdf
                  </h3>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    ATS Ready
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                  <span>Updated with BTech CSE & Cognifyz Internship</span>
                  <span className="hidden sm:inline text-purple-400 font-mono flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {downloadCount} downloads
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white transition-all cursor-pointer"
                title="Copy Direct Link to Resume"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={() => setIsViewerOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-purple-500/40 transition-all cursor-pointer"
              >
                <Eye className="w-4 h-4 text-purple-400" />
                <span>Interactive Viewer</span>
              </button>

              <a
                href={resumeUrl}
                download="Prasanjeet_Kumar_Mandal_Resume.pdf"
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 transition-all active:scale-95 cursor-pointer"
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

          </div>

          {/* Quick Notice */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Single-page recruiter standard format with active hyperlinks</span>
            </span>
            <span className="text-purple-400 font-mono">PDF Document • 1 Page</span>
          </div>

        </div>

      </div>

      {/* FULL-SCREEN INTERACTIVE PDF VIEWER MODAL */}
      {isViewerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-md overflow-hidden">
          
          <div 
            className={`relative bg-[#100E17] border border-white/15 rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ${
              isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-5xl h-[92vh]'
            }`}
          >
            {/* Modal Toolbar */}
            <div className="p-4 sm:px-6 bg-[#161322] border-b border-white/10 flex items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-300 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    Prasanjeet Kumar Mandal — Resume
                  </h3>
                  <span className="text-[11px] text-slate-400">Interactive In-Browser Viewer</span>
                </div>
              </div>

              {/* Viewport Zoom & Action Controls */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300">
                  <button 
                    onClick={handleZoomOut} 
                    className="p-1 hover:text-white cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={handleResetZoom}
                    className="px-1.5 font-mono text-[11px] hover:text-purple-300 cursor-pointer"
                    title="Reset Zoom"
                  >
                    {zoomLevel}%
                  </button>
                  <button 
                    onClick={handleZoomIn} 
                    className="p-1 hover:text-white cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-slate-300 hover:text-white transition-all cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <a
                  href={resumeUrl}
                  download="Prasanjeet_Kumar_Mandal_Resume.pdf"
                  onClick={handleDownload}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                <button
                  onClick={() => setIsViewerOpen(false)}
                  className="p-2 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Document Iframe Canvas */}
            <div className="flex-1 bg-slate-950 overflow-auto p-4 flex justify-center">
              <div 
                className="w-full h-full max-w-4xl rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              >
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0`}
                  title="Prasanjeet Kumar Mandal Resume"
                  className="w-full h-full min-h-[550px] bg-white border-0"
                />
              </div>
            </div>

            {/* Modal Bottom Status Bar */}
            <div className="p-3 bg-[#0E0C15] border-t border-white/10 flex items-center justify-between text-xs text-slate-400 px-6">
              <span>Format: High-Definition Vector PDF</span>
              <div className="flex items-center gap-4">
                <a 
                  href={resumeUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-purple-300 flex items-center gap-1"
                >
                  <span>Open raw PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
