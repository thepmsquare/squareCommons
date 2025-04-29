import {
  APIOutput,
  APIOutputZ,
  AvailableMethods,
  RequestCredentialsOptions,
} from "./types/API.js";

const convertSnakeToKebab = (input: string): string => {
  return input.replace(/_([a-z])/g, (_, letter) => `-${letter.toLowerCase()}`);
};

const fetchJSONData = async (
  baseUrl: string,
  endpoint: string,
  method: AvailableMethods = "GET",
  headers: Record<string, string> = {},
  body?: Record<string, unknown>,
  queryParams?: Record<string, string>,
  credentials: RequestCredentialsOptions = "same-origin"
): Promise<APIOutput> => {
  let response: Response | null = null;
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
      credentials,
    };

    response = await fetch(url, options);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      console.error(`[${new Date().toISOString()}] API Error at ${url}:`, {
        type: null,
        message: await response.text(),
        details: "response is not JSON.",
        responseStatus: response.status,
      });
      throw new Error("Error code: UM001");
    }
    if (!response.ok) {
      let message: string | null = "";
      try {
        const result = APIOutputZ.parse(await response.json());
        console.error(`[${new Date().toISOString()}] API Error at ${url}:`, {
          type: null,
          message: result.log,
          details: null,
          responseStatus: response.status,
        });
        message = result.message;
      } catch (error: any) {
        console.error(`[${new Date().toISOString()}] API Error at ${url}:`, {
          type: error?.constructor?.name || typeof error,
          message: error?.message || String(error),
          details: error,
          responseStatus: response.status,
        });
        throw new Error("Error code: UM001");
      }
      throw new Error(message ?? "Error code: UM001");
    }

    try {
      const result = APIOutputZ.parse(await response.json());
      return result;
    } catch (error: any) {
      console.error(`[${new Date().toISOString()}] API Error at ${url}:`, {
        type: error?.constructor?.name || typeof error,
        message: error?.message || String(error),
        details: error,
        responseStatus: response.status,
      });
      throw new Error("Error code: UM001");
    }
  } catch (error) {
    throw error;
  }
};

const fetchFileData = async (
  baseUrl: string,
  endpoint: string,
  method: AvailableMethods = "GET",
  headers: Record<string, string> = {},
  body?: FormData,
  queryParams?: Record<string, string>,
  credentials: RequestCredentialsOptions = "same-origin"
): Promise<Blob> => {
  let response: Response | null = null;
  try {
    const normalizedHeaders = Object.fromEntries(
      Object.entries(headers).map(([key, value]) => [
        convertSnakeToKebab(key),
        value,
      ])
    );

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
      credentials,
    };

    response = await fetch(url, options);
    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      if (!contentType.includes("application/json")) {
        console.error(`[${new Date().toISOString()}] API Error at ${url}:`, {
          type: null,
          message: await response.text(),
          details: "response is not JSON.",
          responseStatus: response.status,
        });
        throw new Error("Error code: UM001");
      }
      let message: string | null = "";
      try {
        const result = APIOutputZ.parse(await response.json());
        console.error(`[${new Date().toISOString()}] API Error at ${url}:`, {
          type: null,
          message: result.log,
          details: null,
          responseStatus: response.status,
        });
        message = result.message;
      } catch (error: any) {
        console.error(`[${new Date().toISOString()}] API Error at ${url}:`, {
          type: error?.constructor?.name || typeof error,
          message: error?.message || String(error),
          details: error,
          responseStatus: response.status,
        });
        throw new Error("Error code: UM001");
      }
      throw new Error(message ?? "Error code: UM001");
    }

    try {
      const result = await response.blob();
      return result;
    } catch (error: any) {
      console.error(
        `[${new Date().toISOString()}] File Fetch Error at ${url}:`,
        {
          type: error?.constructor?.name || typeof error,
          message: error?.message || String(error),
          details: error,
          responseStatus: response.status,
        }
      );
      throw new Error("Error code: UM001");
    }
  } catch (error) {
    throw error;
  }
};

export { fetchJSONData, fetchFileData };
