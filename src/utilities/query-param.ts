import { z, ZodSchema } from "zod";

/**
 * Creates a zod schema that accepts either a single value or an array of values
 * @param {ZodSchema} t zod schema
 * @returns zod schema that accepts either a single value or an array of values
 */
const queryArrayParam = (t: ZodSchema) => {
  return z.array(t).or(t.transform((v) => [v]));
};

export default queryArrayParam;
