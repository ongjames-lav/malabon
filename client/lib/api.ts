// Get API URL - use localhost for same device, allow override for network access
const getApiUrl = () => {
    // If running in browser and not on localhost, use the server's IP/hostname
    if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1')) {
        // For network access, replace localhost with the server's hostname/IP
        return `http://${window.location.hostname}:5000/api`;
    }
    // For localhost, use the environment variable or default
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

export const API_URL = typeof window !== 'undefined' ? getApiUrl() : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api');

export const ENDPOINTS = {
    businesses: `${API_URL}/businesses`,
    foods: `${API_URL}/foods`,
    culture: `${API_URL}/culture`,
};

// API Helper Functions
export async function fetchFoods(params?: { category?: string; search?: string; signature?: boolean; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.signature) queryParams.append('signature', 'true');
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `${ENDPOINTS.foods}${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch foods');
    return response.json();
}

export async function fetchBusinesses(params?: { category?: string; search?: string; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `${ENDPOINTS.businesses}${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch businesses');
    return response.json();
}

export async function fetchCulturalStories(params?: { type?: string; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.append('type', params.type);
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `${ENDPOINTS.culture}${queryParams.toString() ? `?${queryParams}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch cultural stories');
    return response.json();
}
