async function fetchJSONData(baseUrl, endpoint, method = "GET", headers = {}, body, queryParams) {
    try {
        // Construct query string if queryParams are provided
        const queryString = queryParams
            ? "?" + new URLSearchParams(queryParams).toString()
            : "";
        const url = `${baseUrl}/${endpoint}${queryString}`;
        const options = {
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
        return (await response.json());
    }
    catch (error) {
        throw error;
    }
}
export { fetchJSONData };
