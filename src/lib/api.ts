// Centralized API configuration for Víncula AI

// Get API base URL from environment variable
const API_BASE = import.meta.env.VITE_API_URL;

// Check if we have a valid API URL configured
export const isApiConfigured = (): boolean => {
  return !!API_BASE && API_BASE.length > 0;
};

// Get the API base URL
export const getApiUrl = (): string => {
  if (!API_BASE) {
    console.warn('VITE_API_URL is not configured');
    return '';
  }
  return API_BASE;
};

// API error types
export type ApiError = {
  type: 'offline' | 'timeout' | 'not_configured' | 'server_error' | 'auth_error';
  message: string;
  status?: number;
};

// Standard API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: ApiError;
}

// Fetch with timeout
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 15000
): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

// Main API request function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Check if API is configured
  if (!isApiConfigured()) {
    return {
      success: false,
      error: {
        type: 'not_configured',
        message: 'API not configured. Please set VITE_API_URL environment variable.',
      },
    };
  }

  const url = `${getApiUrl()}${endpoint}`;

  try {
    const response = await fetchWithTimeout(
      url,
      {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      },
      15000
    );

    const data = await response.json();

    if (!response.ok) {
      // Handle specific error codes
      if (response.status === 401) {
        return {
          success: false,
          error: {
            type: 'auth_error',
            message: data.message || 'Authentication required',
            status: 401,
          },
        };
      }
      
      return {
        success: false,
        message: data.message,
        error: {
          type: 'server_error',
          message: data.message || 'Server error occurred',
          status: response.status,
        },
      };
    }

    return data;
  } catch (error) {
    // Handle network errors
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: {
            type: 'timeout',
            message: 'Request timed out. Please try again.',
          },
        };
      }
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        return {
          success: false,
          error: {
            type: 'offline',
            message: 'Unable to connect to server. Please check your connection.',
          },
        };
      }
    }

    return {
      success: false,
      error: {
        type: 'offline',
        message: 'Connection error. Server may be offline.',
      },
    };
  }
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
  
  post: <T>(endpoint: string, body?: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  put: <T>(endpoint: string, body?: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  delete: <T>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),
};

// Demo mode check - true when API is not configured or offline
export const isDemoMode = (): boolean => {
  return !isApiConfigured();
};
