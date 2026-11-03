import React from 'react';
import { 
  Trophy, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';
import { useAchievements } from '../../hooks/usePortfolioData';

export default function Achievements() {
  const { data: achievements } = useAchievements();

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-[#0C0B11]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Milestones & Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Achievements & <span className="text-gradient-purple">Presentations</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Chronicle of verified hackathons, state science conferences, and live project exhibitions.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Central vertical glowing line */}
          <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500/50 via-indigo-500/30 to-purple-500/10" />

          <div className="space-y-12">
            {achievements.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-center gap-8 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Central Dot */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#121118] border-2 border-purple-500 shadow-lg shadow-purple-600/40 items-center justify-center z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  </div>

                  {/* Date badge on opposite side for desktop */}
                  <div className={`sm:w-1/2 flex ${isEven ? 'sm:justify-start' : 'sm:justify-end'}`}>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-purple-300">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Achievement Card */}
                  <div className="w-full sm:w-1/2">
                    <div className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300 space-y-4">
                      
                      {/* Header tags */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                          {item.badge}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          {item.organization}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>

                      {/* Association */}
                      <div className="text-xs text-indigo-300 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{item.association}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                        {item.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-400">
                            <span className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
