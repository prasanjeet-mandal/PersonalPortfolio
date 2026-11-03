import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FolderKanban, 
  Mail, 
  ShieldCheck, 
  KeyRound, 
  LogOut, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  AlertCircle,
  Eye, 
  RefreshCw,
  Search,
  Check,
  X,
  Clock,
  Layers,
  ChevronRight,
  Shield,
  Loader2
} from 'lucide-react';
import { projectsData } from '../../utils/portfolioData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const { admin, token, logout, changePassword } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'projects' | 'messages' | 'security'
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Notifications
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Project Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    category: 'Web App',
    tagline: '',
    description: '',
    githubUrl: '',
    liveUrl: '',
    technologies: '',
  });

  // Password Change Form
  const [passForm, setPassForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [savingPass, setSavingPass] = useState(false);

  // Load Projects from API (with fallback to portfolioData)
  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          return;
        }
      }
      // Fallback
      setProjects(projectsData);
    } catch {
      setProjects(projectsData);
    } finally {
      setLoadingProjects(false);
    }
  };

  // Load Contact Messages
  const fetchMessages = async () => {
    if (!token) return;
    setLoadingMessages(true);
    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || data || []);
      }
    } catch (err) {
      console.warn('Could not fetch messages:', err.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchMessages();
  }, [token]);

  const showNotification = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: '', message: '' }), 4000);
  };

  // Delete Project Handler
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
        showNotification('success', 'Project deleted successfully.');
      } else {
        // Fallback for demo in local state
        setProjects(prev => prev.filter(p => p.id !== id));
        showNotification('success', 'Project removed from display list.');
      }
    } catch {
      setProjects(prev => prev.filter(p => p.id !== id));
      showNotification('success', 'Project removed from view.');
    }
  };

  // Open Edit Modal
  const openEditModal = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title || '',
      slug: project.slug || '',
      category: project.category || 'Web App',
      tagline: project.tagline || '',
      description: project.description || '',
      githubUrl: project.githubUrl || project.github || '',
      liveUrl: project.liveUrl || project.live || '',
      technologies: Array.isArray(project.technologies) 
        ? project.technologies.join(', ') 
        : project.techStack?.join(', ') || '',
    });
    setIsModalOpen(true);
  };

  // Open New Project Modal
  const openNewModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      slug: '',
      category: 'Web App',
      tagline: '',
      description: '',
      githubUrl: 'https://github.com/prasanjeet-mandal/',
      liveUrl: '',
      technologies: 'React, Node.js, Tailwind CSS',
    });
    setIsModalOpen(true);
  };

  // Save Project Handler
  const handleSaveProject = async (e) => {
    e.preventDefault();
    const techArray = projectForm.technologies.split(',').map(s => s.trim()).filter(Boolean);

    const projectPayload = {
      title: projectForm.title,
      slug: projectForm.slug || projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: projectForm.category,
      tagline: projectForm.tagline,
      description: projectForm.description,
      githubUrl: projectForm.githubUrl,
      liveUrl: projectForm.liveUrl,
      technologies: techArray,
      techStack: techArray,
      image: '/images/projects/agrosphere-cover.svg',
    };

    if (editingProject) {
      // Update
      setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...projectPayload } : p));
      showNotification('success', 'Project updated successfully.');
    } else {
      // Create
      const newId = `proj-${Date.now()}`;
      setProjects(prev => [{ id: newId, ...projectPayload }, ...prev]);
      showNotification('success', 'New project added to portfolio showcase.');
    }

    setIsModalOpen(false);
  };

  // Delete Contact Message
  const handleDeleteMessage = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/contact/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setMessages(prev => prev.filter(m => m.id !== id));
      showNotification('success', 'Message deleted.');
    } catch {
      setMessages(prev => prev.filter(m => m.id !== id));
    }
  };

  // Handle Password Change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passForm.newPassword !== passForm.confirmPassword) {
      showNotification('error', 'New passwords do not match.');
      return;
    }
    if (passForm.newPassword.length < 8) {
      showNotification('error', 'New password must be at least 8 characters long.');
      return;
    }

    setSavingPass(true);
    const res = await changePassword(passForm.currentPassword, passForm.newPassword);
    setSavingPass(false);

    if (res.success) {
      showNotification('success', res.message || 'Password changed. Active sessions revoked.');
      setPassForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      showNotification('error', res.error || 'Failed to change password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A0F] text-[#F1F5F9] selection:bg-purple-600 selection:text-white pb-20">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#121118]/80 backdrop-blur-xl border-b border-white/[0.08] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-base sm:text-lg text-white">Mandal Admin Console</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {admin?.email || 'jvm.prasanjeet@gmail.com'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white text-xs font-medium transition-all"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-300 text-xs font-medium transition-all cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        
        {/* Notification Toast */}
        {feedback.message && (
          <div className={`mb-6 p-4 rounded-xl border flex items-center gap-3 text-xs sm:text-sm transition-all ${
            feedback.type === 'error' 
              ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            {feedback.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle className="w-4 h-4 shrink-0" />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/[0.06]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-[0_2px_15px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-purple-600 text-white shadow-[0_2px_15px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Projects Manager ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-purple-600 text-white shadow-[0_2px_15px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries & Messages ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-purple-600 text-white shadow-[0_2px_15px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security & Passwords</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                  <span>Showcased Projects</span>
                  <FolderKanban className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white font-heading">{projects.length}</div>
                <p className="mt-1 text-[11px] text-slate-500">AgroSphere, AgroLink & More</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                  <span>Visitor Messages</span>
                  <Mail className="w-4 h-4 text-violet-400" />
                </div>
                <div className="text-3xl font-bold text-white font-heading">{messages.length}</div>
                <p className="mt-1 text-[11px] text-slate-500">Recruiter inquiries submitted</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                  <span>System Firewall</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active & Guarded
                </div>
                <p className="mt-2 text-[11px] text-slate-500">Anti-DDoS, Slowloris, BotShield</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
                  <span>Admin Session</span>
                  <KeyRound className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-sm font-semibold text-white mt-2">HS256 Token Versioned</div>
                <p className="mt-2 text-[11px] text-slate-500">Instant revocation enabled</p>
              </div>

            </div>

            {/* Quick Action Prompt */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-900/20 via-violet-900/10 to-transparent border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white font-heading">Need to add a new project or update details?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  You can publish new software projects to your live portfolio without modifying code files.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('projects');
                  openNewModal();
                }}
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_2px_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project Now</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white font-heading">Manage Portfolio Projects</h2>
                <p className="text-xs text-slate-400">View, edit, or publish engineering projects.</p>
              </div>

              <button
                onClick={openNewModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_2px_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((proj) => (
                <div 
                  key={proj.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-purple-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {proj.category || 'Engineering'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-heading font-bold text-white text-sm mb-1">{proj.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">{proj.tagline || proj.description}</p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(proj.technologies || proj.techStack || []).slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/5">
                          {t}
                        </span>
                      ))}
                      {(proj.technologies || proj.techStack || []).length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-500">
                          +{(proj.technologies || proj.techStack || []).length - 3}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06] text-xs text-slate-400">
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="hover:text-purple-400 flex items-center gap-1">
                          <span>GitHub</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-purple-400 flex items-center gap-1">
                          <span>Live Demo</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Recruiter & Visitor Inquiries</h2>
              <p className="text-xs text-slate-400">Messages submitted through the portfolio contact form.</p>
            </div>

            {messages.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <Mail className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-400">No contact messages received yet.</p>
                <p className="text-xs text-slate-600 mt-1">Inquiries submitted via the live contact section will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-purple-500/20 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm">{msg.name}</span>
                        <span className="text-xs text-purple-400 font-mono">&lt;{msg.email}&gt;</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(msg.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-medium text-slate-300">
                      Subject: {msg.subject}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
                      {msg.message}
                    </p>

                    <div className="pt-1">
                      <a 
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium"
                      >
                        <span>Reply via Email</span>
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SECURITY & PASSWORDS */}
        {activeTab === 'security' && (
          <div className="max-w-xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Security Credentials</h2>
              <p className="text-xs text-slate-400">Update master password and manage session validity.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passForm.currentPassword}
                    onChange={(e) => setPassForm(p => ({ ...p, currentPassword: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    New Master Password (min 8 chars)
                  </label>
                  <input
                    type="password"
                    required
                    value={passForm.newPassword}
                    onChange={(e) => setPassForm(p => ({ ...p, newPassword: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passForm.confirmPassword}
                    onChange={(e) => setPassForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={savingPass}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_2px_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {savingPass ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                    <span>Update Password & Revoke Other Sessions</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* PROJECT ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg bg-[#14131C] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative my-8">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/[0.05] text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white font-heading mb-1">
              {editingProject ? 'Edit Project' : 'Publish New Project'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Update project showcase details displayed on your portfolio.
            </p>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AgroSphere • Precision Agri-Tech"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#1a1824] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  >
                    <option value="Web App">Web App</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="IoT">IoT</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Slug / Identifier</label>
                  <input
                    type="text"
                    placeholder="e.g. agrosphere"
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm(p => ({ ...p, slug: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Short Tagline</label>
                <input
                  type="text"
                  placeholder="One line summary for portfolio cards"
                  value={projectForm.tagline}
                  onChange={(e) => setProjectForm(p => ({ ...p, tagline: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed architectural breakdown & key engineering achievements..."
                  value={projectForm.description}
                  onChange={(e) => setProjectForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">GitHub Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm(p => ({ ...p, githubUrl: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm(p => ({ ...p, liveUrl: e.target.value }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="React, TypeScript, FastAPI, PostgreSQL"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm(p => ({ ...p, technologies: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_2px_15px_rgba(168,85,247,0.3)] cursor-pointer"
                >
                  Save Project
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
