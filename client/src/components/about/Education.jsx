import React from 'react';
import { GraduationCap, Sparkles, BookOpen, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { useEducation } from '../../hooks/usePortfolioData';

export default function Education() {
  const { data: educationList } = useEducation();
  const coursework = [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (Java)",
    "Database Management Systems (PostgreSQL/MySQL)",
    "Operating Systems",
    "Computer Networks",
    "Web Technologies (HTML, CSS, JS)",
    "Software Engineering & SDLC",
    "Cloud Computing Fundamentals (AWS EC2, S3)"
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[#0A090E]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-indigo-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & <span className="text-gradient-purple">Academic Journey</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A progressive academic journey from foundational diploma engineering to advanced BTech in Computer Science and Engineering.
          </p>
        </div>

        {/* Education Timeline Grid */}
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Degrees Timeline */}
            <div className="lg:col-span-7 space-y-6">
              {educationList.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden space-y-4 hover:border-purple-500/40 transition-all group"
                >
                  <div className={`absolute top-0 left-0 h-full w-1 ${
                    idx === 0 ? 'bg-gradient-to-b from-purple-500 to-indigo-500' : 'bg-gradient-to-b from-cyan-500 to-blue-500'
                  }`} />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      {edu.status}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      {edu.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {edu.degree}
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-indigo-300 font-medium mt-1">
                      <span className="text-white font-semibold">{edu.institution}</span>
                      <span>•</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {edu.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    {edu.highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>

            {/* Right: Relevant Coursework */}
            <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Relevant Coursework
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Core curriculum covered throughout Diploma and B.Tech in CSE:
                </p>
              </div>

              <div className="space-y-2.5">
                {coursework.map((course, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] text-xs text-slate-200 border border-white/[0.05] hover:border-purple-500/30 hover:bg-white/[0.05] transition-all"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                    <span className="font-medium">{course}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 leading-relaxed">
                Bridged practical diploma engineering at JUT with rigorous B.Tech computer science coursework at Quantum University.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
