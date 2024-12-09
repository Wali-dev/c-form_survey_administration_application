import { Form, FormField } from "../models/form.models";
import sequelize from "../configs/sequalize";
import User from "../models/user.models";

const createFormService = async (
    title: string,
    description: string,
    userId: number,
    formFields: Array<any>
): Promise<any> => {
    const transaction = await sequelize.transaction();

    try {
        // Step 1: Create the form
        const form = await Form.create(
            { title, description, userId },
            { transaction }
        );

        // Step 2: Create form fields
        if (formFields && formFields.length > 0) {
            const formFieldPromises = formFields.map(field =>
                FormField.create({
                    formId: form.id,
                    fieldType: field.fieldType,
                    label: field.label,
                    placeholder: field.placeholder || '',
                    isRequired: field.isRequired || false,
                    defaultValue: field.defaultValue || '',
                    options: field.options || null,
                    order: field.order || 0,
                }, { transaction }) // Use the same transaction
            );

            // Wait for all form field creations to complete
            await Promise.all(formFieldPromises);
        }

        // Step 3: Commit transaction
        await transaction.commit();

        return form;
    } catch (error) {
        // If anything fails, rollback the transaction
        await transaction.rollback();
        console.error("Error creating form and fields:", error);
        throw new Error("Error creating form and fields");
    }
};

const updateFormService = async (
    formId: number,
    title: string,
    description: string,
    formFields: Array<any>
): Promise<any> => {
    const transaction = await sequelize.transaction();

    try {
        // Step 1: Find the form
        const form = await Form.findByPk(formId);

        if (!form) {
            throw new Error("Form not found");
        }

        // Step 2: Update form metadata
        form.title = title;
        form.description = description;
        await form.save({ transaction });

        // Step 3: Delete existing form fields associated with this form
        await FormField.destroy({ where: { formId }, transaction });

        // Step 4: Create updated form fields
        if (formFields && formFields.length > 0) {
            const formFieldPromises = formFields.map(field =>
                FormField.create({
                    formId: form.id,
                    fieldType: field.fieldType,
                    label: field.label,
                    placeholder: field.placeholder || '',
                    isRequired: field.isRequired || false,
                    defaultValue: field.defaultValue || '',
                    options: field.options || null,
                    order: field.order || 0,
                }, { transaction })
            );

            await Promise.all(formFieldPromises);
        }

        // Step 5: Commit transaction
        await transaction.commit();

        return { form, formFields };
    } catch (error) {

        await transaction.rollback();
        console.error("Error updating form and fields:", error);
        throw new Error("Error updating form and fields");
    }
};


const getFormsByUsernameService = async (username: string): Promise<any> => {
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new Error("User not found");
        }

        const forms = await Form.findAll({
            where: { userId: user.id },
            include: [
                {
                    model: FormField,
                    as: "formFields",
                },
            ],
        });

        return forms;
    } catch (error) {
        console.error("Error fetching forms and fields:", error);
        throw new Error("Error fetching forms and fields");
    }
};

const deleteFormService = async (username: string, formId: number): Promise<boolean> => {
    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });

        if (!user) {
            throw new Error("User not found");
        }


        const form = await Form.findOne({
            where: {
                id: formId,
                userId: user.id,
            },
        });

        if (!form) {
            throw new Error("Form not found or user not authorized");
        }


        const transaction = await form.sequelize.transaction();

        try {

            await FormField.destroy({
                where: { formId },
                transaction,
            });

            // Delete the form
            await form.destroy({ transaction });

            // Commit the transaction
            await transaction.commit();
            return true;
        } catch (error) {

            await transaction.rollback();
            throw new Error("Error deleting form and fields");
        }
    } catch (error) {
        console.error("Error deleting form:", error);
        throw new Error("Error deleting form");
    }
};



export { createFormService, updateFormService, getFormsByUsernameService, deleteFormService };
