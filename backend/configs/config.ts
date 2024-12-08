import dotenv from "dotenv";

dotenv.config();

interface Config {
    port: number;
    database_name: string;
    database_username: string;
    database_password: string;
    database_host: string;
}

const config: Config = {
    port: parseInt(process.env.PORT || "8800", 10),
    database_name: process.env.DB_NAME || "",
    database_username: process.env.DB_USERNAME || "",
    database_password: process.env.DB_PASSWORD || "",
    database_host: process.env.DB_HOST || ""
};

export default config;
