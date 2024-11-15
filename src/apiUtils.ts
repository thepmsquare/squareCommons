import type { APIOutput } from "./types/API.js";
async function fetchJSONData(
  baseUrl: string,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  headers: Record<string, string> = {},
  body?: Record<string, unknown>,
  queryParams?: Record<string, string>
): Promise<APIOutput> {
  try {
    // Construct query string if queryParams are provided
    const queryString = queryParams
      ? "?" + new URLSearchParams(queryParams).toString()
      : "";
    const url = `${baseUrl}/${endpoint}${queryString}`;

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);
    const result = (await response.json()) as APIOutput;
    console.debug(url + " : " + result);
    if (!response.ok) {
      console.error(url + " : " + result.log);
      const errorText = result.message;
      throw new Error(errorText ?? "Error code: UM001");
    }

    return result;
  } catch (error) {
    throw error;
  }
}
export { fetchJSONData };
