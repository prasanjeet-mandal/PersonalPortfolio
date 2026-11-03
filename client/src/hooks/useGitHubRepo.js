import { useState, useEffect } from 'react';

/**
 * Custom Hook: Fetch Real-Time GitHub Repository Stats
 * Caches in sessionStorage to preserve GitHub's public API rate limits.
 */
export function useGitHubRepo(githubUrl) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!githubUrl || !githubUrl.includes('github.com')) {
      return;
    }

    try {
      const url = new URL(githubUrl);
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length < 2) return;

      const owner = parts[0];
      const repo = parts[1];
      const cacheKey = `gh_cache_${owner}_${repo}`;

      // Check session cache first
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          // 1 hour cache TTL
          if (Date.now() - parsed.timestamp < 3600000) {
            setStats(parsed.data);
            return;
          }
        } catch (e) {}
      }

      setLoading(true);
      fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      })
        .then((res) => {
          if (!res.ok) throw new Error('Repo not found or rate-limited');
          return res.json();
        })
        .then((data) => {
          const repoData = {
            stars: data.stargazers_count ?? 0,
            forks: data.forks_count ?? 0,
            language: data.language || 'Java',
            updatedAt: data.updated_at ? new Date(data.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : null,
          };
          sessionStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: repoData }));
          setStats(repoData);
        })
        .catch(() => {
          // Fallback gracefully without breaking UI
          setStats(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch {
      // Invalid URL format
    }
  }, [githubUrl]);

  return { stats, loading };
}
