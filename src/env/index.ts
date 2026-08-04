import 'dotenv/config';


import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().default(3333),
    DBNAME: z.string(),
    DBUSER: z.string(),
    DBPASSWORD: z.string(),
    DBHOST: z.string(),
    DBPORT: z.coerce.number(),
    DBDIALECT: z.string(),
    AUTH_SERVICE_URL: z.string(),
    JWT_SECRET: z.string(),
    APP_URL: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if(_env.success == false) {
    console.log("Invalid environment variable", _env.error.format);

    throw new Error("Invalid environment variables.")
}

export const env = _env.data;

