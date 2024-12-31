import { z } from "zod";

const APIOutputZ = z.object({
  data: z.any(),
  message: z.string().nullable(),
  log: z.any(),
});

type APIOutput = z.infer<typeof APIOutputZ>;

export { APIOutput, APIOutputZ };
