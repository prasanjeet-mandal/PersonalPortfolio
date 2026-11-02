import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  PhoneCall
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { personalInfo } from '../../utils/portfolioData';
import { portfolioApi } from '../../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await portfolioApi.sendContactMessage(formData);
      if (res && res.success !== false) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 6000);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#0A090E]">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact <span className="text-gradient-purple">Prasanjeet</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Have a project in mind, an internship opportunity, or want to discuss agricultural AI solutions? Send a message directly.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] space-y-6">
              <h3 className="text-lg font-bold text-white">
                Contact Information
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                I am actively seeking software engineering internships, AI/ML research collaborations, and impactful project development.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block uppercase font-medium">Email Me</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">
                      {personalInfo.contact.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block uppercase font-medium">Location</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">
                      {personalInfo.university.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/15 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block uppercase font-medium">Availability</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">
                      {personalInfo.contact.availability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Profiles */}
              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Connect on Professional Networks
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={personalInfo.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative">
              
              <h3 className="text-lg font-bold text-white mb-6">
                Send a Direct Message
              </h3>

              {/* Status Alert */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-200 text-xs sm:text-sm animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>Thank you! Your message has been received. I will reply as soon as possible.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center gap-3 text-red-200 text-xs sm:text-sm animate-fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                  <span>Something went wrong while sending your message. Please email me directly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Your Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className={`w-full bg-white/[0.04] border ${
                        errors.name ? 'border-red-500/60' : 'border-white/10 focus:border-purple-500/50'
                      } rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-400">{errors.name}</span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Email Address <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full bg-white/[0.04] border ${
                        errors.email ? 'border-red-500/60' : 'border-white/10 focus:border-purple-500/50'
                      } rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400">{errors.email}</span>
                    )}
                  </div>

                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Subject <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Internship Opportunity"
                    className={`w-full bg-white/[0.04] border ${
                      errors.subject ? 'border-red-500/60' : 'border-white/10 focus:border-purple-500/50'
                    } rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors`}
                  />
                  {errors.subject && (
                    <span className="text-[11px] text-red-400">{errors.subject}</span>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Your Message <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, question, or message..."
                    className={`w-full bg-white/[0.04] border ${
                      errors.message ? 'border-red-500/60' : 'border-white/10 focus:border-purple-500/50'
                    } rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-red-400">{errors.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-lg shadow-purple-600/30 active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
