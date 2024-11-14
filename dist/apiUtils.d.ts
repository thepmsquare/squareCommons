declare function fetchJSONData<T>(baseUrl: string, endpoint: string, method?: "GET" | "POST" | "PUT" | "DELETE", headers?: Record<string, string>, body?: Record<string, unknown>, queryParams?: Record<string, string>): Promise<T | string>;
export { fetchJSONData };
