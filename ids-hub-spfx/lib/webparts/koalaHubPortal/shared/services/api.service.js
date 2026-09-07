// API service for making HTTP requests
export class ApiService {
    constructor(baseUrl = 'https://api.example.com', timeout = 30000) {
        this.baseUrl = baseUrl;
        this.timeout = timeout;
    }
    async get(endpoint) {
        try {
            const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: this.getHeaders(),
            });
            return this.handleResponse(response);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async post(endpoint, data) {
        try {
            const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(data),
            });
            return this.handleResponse(response);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async put(endpoint, data) {
        try {
            const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(data),
            });
            return this.handleResponse(response);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async delete(endpoint) {
        try {
            const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
                method: 'DELETE',
                headers: this.getHeaders(),
            });
            return this.handleResponse(response);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }
    async fetchWithTimeout(url, options) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            return response;
        }
        catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    async handleResponse(response) {
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${data.message || 'Request failed'}`);
        }
        return {
            success: true,
            data,
            timestamp: new Date(),
        };
    }
    handleError(error) {
        console.error('API Error:', error);
        let code = 'SERVER_ERROR';
        let message = 'An error occurred';
        if (error instanceof Error) {
            message = error.message;
            if (message.includes('Unauthorized')) {
                code = 'UNAUTHORIZED';
            }
            else if (message.includes('Forbidden')) {
                code = 'FORBIDDEN';
            }
            else if (message.includes('Not Found')) {
                code = 'NOT_FOUND';
            }
            else if (message.includes('AbortError')) {
                code = 'NETWORK_ERROR';
                message = 'Request timed out';
            }
        }
        return {
            success: false,
            error: { code, message },
            timestamp: new Date(),
        };
    }
}
export const apiService = new ApiService();
