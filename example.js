import { fetchJSONData } from "./dist/index.js";
try {
  let output = await fetchJSONData("http://localhost:10010", "", "GET");
  console.log(output);
} catch (e) {
  console.error("USER WILL SEE THIS ERROR MESSAGE: ", e.message);
}
