import { 
  personalInfo, 
  skillsData, 
  projectsData, 
  achievementsData, 
  educationData 
} from '../utils/portfolioData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Generic API fetcher with automatic fallback to local mock data
 */
async function fetchWithFallback(endpoint, fallbackData) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    // Graceful fallback to verified portfolioData when backend is in development or offline
    console.info(`Using verified local portfolio data for [${endpoint}]`);
    return fallbackData;
  }
}

export const portfolioApi = {
  getProfile: () => fetchWithFallback('/profile', personalInfo),
  getSkills: () => fetchWithFallback('/skills', skillsData),
  getProjects: () => fetchWithFallback('/projects', projectsData),
  getProjectById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`);
      if (!response.ok) throw new Error();
      return await response.json();
    } catch {
      return projectsData.find(p => p.id === id) || null;
    }
  },
  getAchievements: () => fetchWithFallback('/achievements', achievementsData),
  getEducation: () => fetchWithFallback('/education', educationData),
  sendContactMessage: async (payload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Submission failed');
      return await response.json();
    } catch (err) {
      // In Phase 1 frontend, resolve gracefully so UI flow can be verified
      console.warn('Backend contact API unavailable in Phase 1 frontend preview:', err.message);
      return { success: true, message: 'Message recorded successfully (mock mode).' };
    }
  }
};
