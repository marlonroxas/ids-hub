import { ApiResponse } from '../types';
export declare class ApiService {
    private baseUrl;
    private timeout;
    constructor(baseUrl?: string, timeout?: number);
    get<T>(endpoint: string): Promise<ApiResponse<T>>;
    post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>>;
    put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>>;
    delete<T>(endpoint: string): Promise<ApiResponse<T>>;
    private getHeaders;
    private fetchWithTimeout;
    private handleResponse;
    private handleError;
}
export declare const apiService: ApiService;
