import React, { useState } from 'react';
import { 
  Sparkles, 
  Code2, 
  Server, 
  Terminal, 
  Database, 
  Brain, 
  Wrench,
  CheckCircle2,
  Search
} from 'lucide-react';
import { useSkills } from '../../hooks/usePortfolioData';

export default function Skills() {
  const { data: skillsList } = useSkills();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categoryIcons = {
    "Frontend": Code2,
    "Backend": Server,
    "Programming": Terminal,
    "Database": Database,
    "AI / ML": Brain,
    "Tools & Technologies": Wrench,
  };

  const categories = ['All', ...skillsList.map(c => c.category)];

  const filteredCategories = skillsList.filter(cat => {
    if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
      return false;
    }
    return true;
  }).map(cat => {
    if (!searchTerm) return cat;
    const filteredSkills = cat.skills.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.level.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...cat, skills: filteredSkills };
  }).filter(cat => cat.skills.length > 0);

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 'Advanced':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Proficient':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'Intermediate':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0C0B11]">
      {/* Background glow */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient-purple">Competencies</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Realistic, categorized breakdown of technical proficiencies across modern development and AI pipelines.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-xl transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. React, Java, OCR)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((catGroup, idx) => {
            const Icon = categoryIcons[catGroup.category] || Code2;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 flex flex-col justify-between space-y-6 border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300"
              >
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">
                          {catGroup.category}
                        </h3>
                        <span className="text-[11px] text-slate-500">
                          {catGroup.skills.length} skills listed
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {catGroup.description}
                  </p>
                </div>

                {/* Skills List */}
                <div className="space-y-3.5 pt-2 border-t border-white/[0.06]">
                  {catGroup.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5 group">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-200 group-hover:text-purple-300 transition-colors">
                          {skill.name}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getLevelBadgeColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>

                      {/* Realistic Proficiency Progress Bar */}
                      <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${skill.rating}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
