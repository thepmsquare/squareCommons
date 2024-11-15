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
        const result = (await response.json());
        if (!response.ok) {
            console.error(url + " : " + JSON.stringify(result.log));
            const errorText = result.message;
            throw new Error(errorText ?? "Error code: UM001");
        }
        return result;
    }
    catch (error) {
        throw error;
    }
}
export { fetchJSONData };
