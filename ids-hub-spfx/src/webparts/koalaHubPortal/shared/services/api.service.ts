// API service for making HTTP requests

import { ApiResponse, PaginatedResponse } from '../types';

export class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = 'https://api.example.com', timeout: number = 30000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      return this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
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

  private handleError<T>(error: unknown): ApiResponse<T> {
    console.error('API Error:', error);

    let code = 'SERVER_ERROR';
    let message = 'An error occurred';

    if (error instanceof Error) {
      message = error.message;
      if (message.includes('Unauthorized')) {
        code = 'UNAUTHORIZED';
      } else if (message.includes('Forbidden')) {
        code = 'FORBIDDEN';
      } else if (message.includes('Not Found')) {
        code = 'NOT_FOUND';
      } else if (message.includes('AbortError')) {
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
