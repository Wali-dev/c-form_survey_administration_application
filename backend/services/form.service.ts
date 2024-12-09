import { Form, FormField } from "../models/form.models"; // Assuming you have Form and FormField models
import sequelize from "../configs/sequalize"; // Ensure that you have sequelize set up correctly

const createFormService = async (
    title: string,
    description: string,
    userId: number,
    formFields: Array<any>
): Promise<any> => {
    const transaction = await sequelize.transaction(); // Start a transaction to ensure atomicity

    try {
        // Step 1: Create the form
        const form = await Form.create(
            { title, description, userId },
            { transaction } // Use the transaction for the form creation
        );

        // Step 2: Create form fields
        if (formFields && formFields.length > 0) {
            const formFieldPromises = formFields.map(field =>
                FormField.create({
                    formId: form.id, // Associate formId with the created form
                    fieldType: field.fieldType,
                    label: field.label,
                    placeholder: field.placeholder || '',
                    isRequired: field.isRequired || false,
                    defaultValue: field.defaultValue || '',
                    options: field.options || null, // If provided, otherwise null
                    order: field.order || 0,
                }, { transaction }) // Use the same transaction
            );

            // Wait for all form field creations to complete
            await Promise.all(formFieldPromises);
        }

        // Step 3: Commit transaction
        await transaction.commit();

        return form; // Return the created form
    } catch (error) {
        // If anything fails, rollback the transaction
        await transaction.rollback();
        console.error("Error creating form and fields:", error);
        throw new Error("Error creating form and fields");
    }
};

export { createFormService };
