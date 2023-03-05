import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const schema = z.object({
  PORT: z.string(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
});

const environment = schema.parse(process.env);

export default environment;
