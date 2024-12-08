import type { APIOutput } from "./types/API.js";
function convertSnakeToKebab(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => `-${letter.toLowerCase()}`);
}
async function fetchJSONData(
  baseUrl: string,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  headers: Record<string, string> = {},
  body?: Record<string, unknown>,
  queryParams?: Record<string, string>
): Promise<APIOutput> {
  try {
    const normalizedHeaders = Object.fromEntries(
      Object.entries(headers).map(([key, value]) => [
        convertSnakeToKebab(key),
        value,
      ])
    );
    // Construct query string if queryParams are provided
    const queryString = queryParams
      ? "?" + new URLSearchParams(queryParams).toString()
      : "";
    const url = `${baseUrl}/${endpoint}${queryString}`;

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...normalizedHeaders,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);
    const result = (await response.json()) as APIOutput;
    if (!response.ok) {
      console.error(url + " : " + JSON.stringify(result.log));
      const errorText = result.message;
      throw new Error(errorText ?? "Error code: UM001");
    }

    return result;
  } catch (error) {
    throw error;
  }
}
export { fetchJSONData };
