// import configuration from dotenv package installed whe running npm install dotenv
import {config} from 'dotenv';

// path pointing to multiple dotenv files in diff environments, extracts all env vars to be exported (ie. port on)
// if node env DNE, default to development: allows switching between production and development envs w/o overriding the other
config({path: `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {
    PORT, NODE_ENV, 
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_ENV, ARCJET_KEY,
    QSTASH_TOKEN, QSTASH_URL,
    SERVER_URL,
    EMAIL_PASSWORD,
} = process.env;

 