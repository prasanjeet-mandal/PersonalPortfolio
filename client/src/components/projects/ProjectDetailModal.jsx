import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  Cpu,
  Monitor,
  Smartphone,
  RefreshCw,
  Star,
  GitFork,
  Layers,
  Code2
} from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';
import { useGitHubRepo } from '../../hooks/useGitHubRepo';

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState(project.defaultTab === 'preview' && project.links?.live ? 'preview' : 'overview');
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'mobile'
  const [iframeKey, setIframeKey] = useState(1);

  const { stats } = useGitHubRepo(project.links?.github);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-5xl bg-[#100E17] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-purple-950/40 via-[#161322] to-slate-900 border-b border-white/10 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30">
                {project.category}
              </span>
              {project.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {project.badge}
                </span>
              )}
              {stats && (
                <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-xs text-slate-300 font-mono">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>{stats.stars}</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <GitFork className="w-3 h-3" />
                    <span>{stats.forks}</span>
                  </span>
                  {stats.updatedAt && (
                    <span className="text-slate-500 hidden sm:inline">Updated {stats.updatedAt}</span>
                  )}
                </div>
              )}
            </div>
            
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        <div className="flex items-center gap-3 px-6 pt-3 pb-2 border-b border-white/[0.08] bg-[#0D0B13]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-[0_2px_12px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overview & Architecture</span>
          </button>

          {project.links?.live ? (
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-purple-600 text-white shadow-[0_2px_12px_rgba(168,85,247,0.3)]'
                  : 'text-purple-300 hover:text-white hover:bg-purple-600/10'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Interactive Live Preview</span>
            </button>
          ) : (
            <div className="text-[11px] text-slate-500 italic pl-2">
              (Live cloud hosting link pending deployment)
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          
          {/* TAB 1: OVERVIEW & ARCHITECTURE */}
          {activeTab === 'overview' && (
            <div className="space-y-8 divide-y divide-white/[0.08]">
              
              {/* Cover Graphic & Overview */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <img
                    src={project.images?.cover || project.image || '/images/projects/agrosphere-cover.svg'}
                    alt={project.title}
                    className="w-full h-48 object-cover bg-slate-900"
                  />
                </div>
                <div className="md:col-span-7 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Project Summary & Purpose
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.summary || project.description}
                  </p>
                  {project.statusNote && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{project.statusNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Features Section */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="pt-6 space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Key Features & Architectural Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.keyFeatures.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                        <span className="text-xs text-slate-300 leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Breakdown */}
              <div className="pt-6 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(project.technologies || project.techStack || []).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-purple-600/15 border border-purple-500/30 text-purple-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.architecture && (
                  <p className="text-xs text-slate-400 pt-2 italic">
                    <strong>Architecture:</strong> {project.architecture}
                  </p>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              
              {/* Browser Mockup Toolbar */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>

                {/* Simulated Address Bar */}
                <div className="flex-1 max-w-lg mx-auto flex items-center justify-center px-4 py-1.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-400 font-mono truncate">
                  <span className="text-emerald-400 mr-1.5">🔒</span>
                  <span className="truncate">{project.links?.live}</span>
                </div>

                {/* Controls: Viewport Switcher & Reload */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setViewport('desktop')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewport === 'desktop' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Desktop View"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewport('mobile')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewport === 'mobile' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Mobile View"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIframeKey(k => k + 1)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
                    title="Reload Preview"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Iframe Viewport Container */}
              <div className="flex justify-center bg-black/60 rounded-2xl border border-white/10 overflow-hidden min-h-[460px]">
                <div 
                  className={`transition-all duration-300 w-full ${
                    viewport === 'mobile' ? 'max-w-[390px] border-x border-white/10 shadow-2xl' : 'max-w-full'
                  }`}
                >
                  <iframe
                    key={iframeKey}
                    src={project.links?.live}
                    title={`${project.title} Live Preview`}
                    className="w-full h-[480px] bg-slate-950 border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 bg-[#0B0A0F] border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Engineered by <strong className="text-white">Prasanjeet Kumar Mandal</strong>
          </div>

          <div className="flex items-center gap-3">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-purple-500/40 transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}

            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
