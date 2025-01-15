import { z } from "zod";

const APIOutputZ = z.strictObject({
  data: z.any(),
  message: z.string().nullable(),
  log: z.any(),
});

type APIOutput = z.infer<typeof APIOutputZ>;

const RequestCredentialsOptionsZ = z.enum(["include", "same-origin", "omit"]);

type RequestCredentialsOptions = z.infer<typeof RequestCredentialsOptionsZ>;

const AvailableMethodsZ = z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]);
type AvailableMethods = z.infer<typeof AvailableMethodsZ>;

export {
  APIOutput,
  APIOutputZ,
  RequestCredentialsOptionsZ,
  RequestCredentialsOptions,
  AvailableMethods,
  AvailableMethodsZ,
};
