/**
 * API Configuration
 * Centralized API URL management
 */

export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && (window as any).__API_URL__) ||
  'http://localhost:8002';

// Export for use in fetch calls
export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};

