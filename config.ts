import dotnv from 'dotenv';
dotnv.config();

export const URL_MONGODB: string = process.env.URL_MONGODB as string;
export const JSON_WEB_TOKEN_KEY: string = process.env.JSON_WEB_TOKEN_KEY as string;
export const PORT: number = Number(process.env.PORT);