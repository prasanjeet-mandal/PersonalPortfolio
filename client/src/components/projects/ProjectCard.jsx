import React from 'react';
import { ExternalLink, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';

export default function ProjectCard({ project, onSelect }) {
  return (
    <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300 group">
      
      {/* Top Cover Visual */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={project.images.cover}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay category badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-black/60 text-purple-300 border border-purple-500/30 backdrop-blur-md">
            {project.category}
          </span>
          {project.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              {project.badge}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {project.tagline}
          </p>
          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Technologies Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.04] border border-white/10 text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-0.5 rounded-md text-[11px] text-purple-400 bg-purple-500/10">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect(project)}
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>

          <div className="flex items-center gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:border-purple-500/40 transition-all"
                title="GitHub Repo"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}

            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-600 transition-all"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
