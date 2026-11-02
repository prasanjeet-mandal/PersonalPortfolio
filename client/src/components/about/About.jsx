import React from 'react';
import { 
  GraduationCap, 
  Lightbulb, 
  Compass, 
  Target, 
  Code2, 
  Cpu, 
  Cloud, 
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { personalInfo } from '../../utils/portfolioData';

export default function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: "Academic Background",
      subtitle: "BTech CSE & Diploma",
      desc: "B.Tech CSE at Quantum University (July 2025 – July 2028) & Diploma in CSE from JUT Ranchi (July 2021 – July 2024)."
    },
    {
      icon: Layers,
      title: "Full-Stack Development",
      subtitle: "Spring Boot, Node, React",
      desc: "Engineering end-to-end applications with secure architectures, REST APIs, and reactive interfaces."
    },
    {
      icon: Lightbulb,
      title: "Real-World Impact",
      subtitle: "Smart Agriculture & Security",
      desc: "Creating practical systems like AgroSphere and AgroLink to eliminate agricultural middlemen and solve grassroots challenges."
    },
    {
      icon: Award,
      title: "Practical Builder",
      subtitle: "Buildathon & Conference",
      desc: "Presented AgroSphere at Buildathon 2026 and showcased AgroLink at the UCOST 21st Conference exhibition."
    }
  ];

  const interests = [
    "Artificial Intelligence",
    "Machine Learning",
    "Software Development",
    "Web Technologies",
    "Cloud Computing",
    "Problem Solving",
    "Emerging Technologies"
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0A090E]">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover My Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient-purple">Prasanjeet Kumar Mandal</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A blend of curiosity, algorithmic discipline, and practical software engineering.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative & Approach */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Story Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500" />
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-purple-400" />
                <span>My Story & Background</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {personalInfo.about.story}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Currently pursuing <strong className="text-white">BTech in Computer Science and Engineering at Quantum University (July 2025 – July 2028)</strong> after completing my <strong className="text-white">Diploma in Computer Science and Engineering from Jharkhand University of Technology (July 2021 – July 2024)</strong>, I focus on building scalable full-stack applications with clean architecture and robust RESTful APIs.
              </p>
            </div>

            {/* Approach Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 w-24 bg-gradient-to-r from-emerald-500 to-cyan-500" />
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                <span>Problem-Solving Approach & Philosophy</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {personalInfo.about.approach}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-xs font-semibold text-purple-300 block mb-1">Human-Centered</span>
                  <span className="text-xs text-slate-400">Software designed for farmers, everyday users, and transparent workflows.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-xs font-semibold text-indigo-300 block mb-1">Verified & Reliable</span>
                  <span className="text-xs text-slate-400">Strict adherence to verified facts, clean data models, and scalable architectures.</span>
                </div>
              </div>
            </div>

            {/* Technical Interests Badges */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Interests & Technical Pursuits
              </h4>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-purple-600/10 transition-all"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Key Metric Highlights Cards */}
          <div className="lg:col-span-5 space-y-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel glass-panel-hover p-5 rounded-2xl flex items-start gap-4 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <span className="text-[11px] font-mono font-medium text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">
                        {item.subtitle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* University & College Card summary */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 to-indigo-950/20 border border-purple-500/20 backdrop-blur-md space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-300">
                    B.Tech Institution
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    July 2025 – July 2028
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  Quantum University
                </h4>
                <p className="text-xs text-slate-300">
                  Bachelor of Technology – Computer Science and Engineering
                </p>
                <p className="text-[11px] text-slate-400">
                  📍 Roorkee, Uttarakhand
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
                    Diploma Institution
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    July 2021 – July 2024
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  Jharkhand University of Technology (JUT)
                </h4>
                <p className="text-xs text-slate-300">
                  Diploma – Computer Science and Engineering
                </p>
                <p className="text-[11px] text-slate-400">
                  📍 Ranchi, Jharkhand
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
