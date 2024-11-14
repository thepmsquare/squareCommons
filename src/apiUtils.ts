async function fetchJSONData<T>(
  baseUrl: string,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  headers: Record<string, string> = {},
  body?: Record<string, unknown>,
  queryParams?: Record<string, string>
): Promise<T | string> {
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

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    return `Fetch error: ${(error as Error).message}`;
  }
}
export { fetchJSONData };