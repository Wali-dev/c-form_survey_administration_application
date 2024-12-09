import { DataTypes, Model } from "sequelize";
import sequelize from "../configs/sequalize";
import User from "./user.models"; // Make sure the sequelize instance is correctly imported

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
                model: User, // Refers to the User model
                key: "id",  // Foreign key
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
    foreignKey: "userId", // The field in the Form model that links to User
    onDelete: "CASCADE",   // If a User is deleted, all associated forms will be deleted
});

Form.belongsTo(User, {
    foreignKey: "userId",   // The field in the Form model that links to User
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
    public options!: string | null; // For options like in Dropdown Select or Radio Buttons
    public order!: number; // To manage the reordering of fields
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
                model: Form, // Correctly references the Form model
                key: "id",   // Foreign key
            },
        },
        fieldType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['text', 'number', 'email', 'date', 'checkbox', 'dropdown', 'radio']], // Allowed field types
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
            type: DataTypes.JSON, // Store options as JSON for dropdown/radio choices
            allowNull: true,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, // To handle the field order
        },
    },
    {
        sequelize,
        modelName: "FormField",
        tableName: "form_fields",
        timestamps: true,
    }
);

// Define the relationship between Form and FormField (One-to-Many)
Form.hasMany(FormField, {
    foreignKey: "formId",  // The field in FormField model that links to Form
    onDelete: "CASCADE",    // If a Form is deleted, all associated form fields will be deleted
});

FormField.belongsTo(Form, {
    foreignKey: "formId",   // The field in FormField model that links to Form
});


// const syncDatabase = async () => {
//     try {
//         // Synchronize all models that are defined
//         await sequelize.sync({ alter: true }); // This will automatically alter the database to match the models
//         console.log('Database synced successfully.');
//     } catch (error) {
//         console.error('Error syncing database:', error);
//     }
// };

// // Call the sync function to sync models with the database
// syncDatabase();

export { Form, FormField };
