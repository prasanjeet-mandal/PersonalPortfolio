import { useState, useEffect } from 'react';
import { portfolioApi } from '../services/api';
import { 
  projectsData, 
  skillsData, 
  educationData, 
  achievementsData, 
  personalInfo 
} from '../utils/portfolioData';

/**
 * Generic Portfolio Data Hook with Zero-Flicker Local Fallback
 * 
 * - Instantly initializes with statically compiled local data (0ms delay, no layout shift).
 * - Queries the backend REST API in the background.
 * - If live backend data exists (e.g. edited via Admin Dashboard), it updates seamlessly.
 * - If backend is offline or sleeping, it continues serving verified fallback data silently.
 */
export function usePortfolioData(fetcher, fallbackData) {
  const [data, setData] = useState(fallbackData);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        const result = await fetcher();
        if (isMounted && result) {
          if (Array.isArray(result) && result.length > 0) {
            setData(result);
            setIsLive(true);
          } else if (typeof result === 'object' && Object.keys(result).length > 0) {
            setData(result);
            setIsLive(true);
          }
        }
      } catch (err) {
        // Keep fallback data silently
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLive, loading };
}

// 1. Projects Hook
export function useProjects() {
  return usePortfolioData(portfolioApi.getProjects, projectsData);
}

// 2. Skills Hook
export function useSkills() {
  return usePortfolioData(portfolioApi.getSkills, skillsData);
}

// 3. Education Hook
export function useEducation() {
  return usePortfolioData(portfolioApi.getEducation, educationData);
}

// 4. Achievements Hook
export function useAchievements() {
  return usePortfolioData(portfolioApi.getAchievements, achievementsData);
}

// 5. Profile Hook
export function useProfile() {
  return usePortfolioData(portfolioApi.getProfile, personalInfo);
}
