import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequalize";

export class ResponseData extends Model {
    public id!: number;
    public formId!: number;
    public username!: string;
    public responses!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

ResponseData.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        formId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Forms",
                key: "id",
            },
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "Users",
                key: "username",
            },
        },
        responses: {
            type: DataTypes.TEXT, // Changed from JSONB to TEXT
            allowNull: false,
            get() {
                return JSON.parse(this.getDataValue('responses'));
            },
            set(value) {
                this.setDataValue('responses', JSON.stringify(value));
            }
        },
    },
    {
        sequelize,
        modelName: "ResponseData",
        tableName: "form_responses",
        timestamps: true,
    }
);

export const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};