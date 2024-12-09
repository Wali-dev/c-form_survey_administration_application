import sequelize from "../configs/sequalize";
import { DataTypes, Model } from "sequelize";

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;

}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "User",
    }
);

// const syncDatabase = async () => {
//     try {
//         await sequelize.sync({ alter: true });
//         console.log('Database synced successfully.');
//     } catch (error) {
//         console.error('Error syncing database:', error);
//     }
// };

// syncDatabase();


export default User;
