import { fetchJSONData } from "./dist/index.js";

console.log(await fetchJSONData("http://localhost:10010", "", "GET"));
