import { Form, FormField } from "../models/form.models";
import { ResponseData } from "../models/formResponse.models";  // Make sure you have the response model

const submitFormResponseService = async (
    formId: number,
    username: string,
    responses: object
): Promise<boolean> => {
    try {
        // Find the form and its form fields
        const form = await Form.findOne({
            where: { id: formId },
            include: [
                {
                    model: FormField,
                    as: "formFields",  // Correctly use the alias here
                    required: true,
                },
            ],
        });

        if (!form) {
            throw new Error("Form not found");
        }

        // Save the responses
        const response = await ResponseData.create({
            formId: form.id,
            username,
            responses,
        });

        // Return true if the response was successfully saved
        return response ? true : false;
    } catch (error) {
        console.error("Error submitting form response:", error);
        throw new Error("Error submitting form response");
    }
};

export { submitFormResponseService };