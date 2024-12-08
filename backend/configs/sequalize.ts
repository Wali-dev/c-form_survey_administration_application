import configs from "./config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    configs.database_name,
    configs.database_username,
    configs.database_password,
    {
        host: configs.database_host,
        dialect: "mysql",
        logging: false,
    }
);

const connectDb = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully");
    } catch (error) {
        console.error("Unable to connect to the database", error);
    }
};

connectDb();

export default sequelize;
