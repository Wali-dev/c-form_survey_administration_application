import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequalize";
import User from "./user.models";

// Form Model
class Form extends Model {


    public id!: number;
    public title!: string;
    public description!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

}

Form.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "Form",
        tableName: "forms",
        timestamps: true,
    }
);

User.hasMany(Form, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Form.belongsTo(User, {
    foreignKey: "userId",
});

// FormField Model
class FormField extends Model {
    public id!: number;
    public formId!: number;
    public fieldType!: string;
    public label!: string;
    public placeholder!: string;
    public isRequired!: boolean;
    public defaultValue!: string;
    public options!: string | null;
    public order!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

FormField.init(
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
                model: Form,
                key: "id",
            },
        },
        fieldType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['text', 'number', 'email', 'date', 'checkbox', 'dropdown', 'radio']],
            },
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        placeholder: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isRequired: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        defaultValue: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        options: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: "FormField",
        tableName: "form_fields",
        timestamps: true,
    }
);


Form.hasMany(FormField, {
    foreignKey: "formId",
    onDelete: "CASCADE",
    as: "formFields",
});

FormField.belongsTo(Form, {
    foreignKey: "formId",
    as: "form",
});

// const syncDatabase = async () => {
//     try {
//         // Synchronize all models that are defined
//         await sequelize.sync({ alter: true }); 
//         console.log('Database synced successfully.');
//     } catch (error) {
//         console.error('Error syncing database:', error);
//     }
// };


// syncDatabase();

export { Form, FormField };
