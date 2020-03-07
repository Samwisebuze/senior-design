// Only import this file once, at entrypoint
// See https://github.com/motdotla/dotenv/tree/master/examples/typescript

import { config, DotenvParseOutput } from 'dotenv';
const result = config();

// Only override process.env if .env file is present and valid
if (!result.error) {
    if (result.parsed !== undefined) {
        const parsed: DotenvParseOutput = result.parsed;
        Object.keys(parsed).forEach((key: string) => {
            const value = parsed[key];
            if (value) {
                process.env[key] = value;
            }
        });
    }
}