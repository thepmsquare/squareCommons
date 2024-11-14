import apiUtils from "./dist/index.js";

console.log(await apiUtils.fetchJSONData("http://localhost:10010", "", "GET"));
