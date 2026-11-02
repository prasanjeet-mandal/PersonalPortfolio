import React, { useState } from 'react';
import { Sparkles, Layers, Search, Filter } from 'lucide-react';
import { projectsData } from '../../utils/portfolioData';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filters = ['All', 'AI / ML', 'Full-Stack', 'Research', 'Tools'];

  const filteredProjects = projectsData.filter((project) => {
    // Filter by category
    if (selectedFilter !== 'All' && project.filterCategory !== selectedFilter) {
      return false;
    }
    // Filter by search term
    if (searchTerm) {
      const matchTitle = project.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDesc = project.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTech = project.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchTitle || matchDesc || matchTech;
    }
    return true;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0A090E]">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase & Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient-purple">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Real-world agricultural technology platforms, AI document verification systems, and engineered software solutions.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`text-xs font-medium px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, tech (e.g. Spring Boot)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

        </div>

        {/* Flagship Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="space-y-6 mb-16">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              <h3 className="text-lg font-bold text-white tracking-wide">
                Flagship Implementations
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setActiveModalProject}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects / Research Concepts */}
        {otherProjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              <h3 className="text-lg font-bold text-white tracking-wide">
                Exploratory & Research Projects
              </h3>
              <span className="text-xs text-slate-500">
                (Verified academic research & prototypes)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setActiveModalProject}
                />
              ))}
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-500 text-sm">
            No projects found matching the filter or search criteria.
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
