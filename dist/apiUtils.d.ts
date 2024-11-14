import type { APIOutput } from "./types/API.js";
declare function fetchJSONData(baseUrl: string, endpoint: string, method?: "GET" | "POST" | "PUT" | "DELETE", headers?: Record<string, string>, body?: Record<string, unknown>, queryParams?: Record<string, string>): Promise<APIOutput>;
export { fetchJSONData };
