function convertSnakeToKebab(str) {
    return str.replace(/_([a-z])/g, (_, letter) => `-${letter.toLowerCase()}`);
}
async function fetchJSONData(baseUrl, endpoint, method = "GET", headers = {}, body, queryParams) {
    try {
        const normalizedHeaders = Object.fromEntries(Object.entries(headers).map(([key, value]) => [
            convertSnakeToKebab(key),
            value,
        ]));
        // Construct query string if queryParams are provided
        const queryString = queryParams
            ? "?" + new URLSearchParams(queryParams).toString()
            : "";
        const url = `${baseUrl}/${endpoint}${queryString}`;
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                ...normalizedHeaders,
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
