import React, { useState, useEffect } from 'react';
import { Command, X, ArrowUp, Sparkles, Keyboard } from 'lucide-react';
import { scrollToSection } from '../../utils/helpers';

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when user is typing in form inputs or textareas
      const targetTag = e.target.tagName.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea' || e.target.isContentEditable) {
        return;
      }

      const key = e.key.toLowerCase();

      // Toggle shortcuts modal with '?' (Shift + /)
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // Close modal on Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      // Navigation shortcuts
      switch (key) {
        case 'p':
          scrollToSection('projects');
          break;
        case 's':
          scrollToSection('skills');
          break;
        case 'a':
          scrollToSection('about');
          break;
        case 'e':
          scrollToSection('education');
          break;
        case 'r':
          scrollToSection('resume');
          break;
        case 'c':
          scrollToSection('contact');
          break;
        case 't':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Floating Bottom-Left Shortcut Trigger Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121118]/80 border border-white/10 hover:border-purple-500/40 text-slate-400 hover:text-white text-xs font-mono shadow-lg backdrop-blur-md transition-all group cursor-pointer"
        title="Keyboard Navigation Shortcuts"
        aria-label="View Keyboard Shortcuts"
      >
        <Keyboard className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
        <span className="text-[11px]">Press <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/10 text-white font-semibold">?</kbd></span>
      </button>

      {/* Shortcuts Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          
          <div className="relative w-full max-w-md bg-[#13111C] border border-white/15 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-300 flex items-center justify-center">
                  <Command className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Keyboard Navigation</h3>
                  <p className="text-[11px] text-slate-400">Power shortcuts for rapid browsing</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/[0.05] text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close shortcuts dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Shortcuts List */}
            <div className="space-y-2 text-xs">
              
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-slate-300">Jump to Featured Projects</span>
                <kbd className="px-2 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono font-bold">P</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-slate-300">Jump to Technical Skills</span>
                <kbd className="px-2 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono font-bold">S</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-slate-300">Jump to Academic Education</span>
                <kbd className="px-2 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono font-bold">E</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-slate-300">Jump to Resume & Credentials</span>
                <kbd className="px-2 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono font-bold">R</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-slate-300">Jump to Contact Form</span>
                <kbd className="px-2 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono font-bold">C</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-slate-300">Scroll Back to Top</span>
                <kbd className="px-2 py-1 rounded-md bg-white/[0.08] border border-white/10 text-slate-300 font-mono font-bold">T</kbd>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-slate-300">Toggle Shortcuts Menu</span>
                <kbd className="px-2 py-1 rounded-md bg-white/[0.08] border border-white/10 text-slate-300 font-mono font-bold">?</kbd>
              </div>

            </div>

            {/* Footer tip */}
            <div className="pt-2 text-center text-[11px] text-slate-500">
              Press <kbd className="text-purple-400 font-mono">Esc</kbd> anytime to close this dialog.
            </div>

          </div>

        </div>
      )}
    </>
  );
}
