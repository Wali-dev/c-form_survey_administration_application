import { Form, FormField } from "../models/form.models";
import { ResponseData } from "../models/formResponse.models";
import { Parser } from 'json2csv';

const submitFormResponseService = async (
    formId: number,
    username: string,
    responses: object
): Promise<boolean> => {
    try {

        const form = await Form.findOne({
            where: { id: formId },
            include: [
                {
                    model: FormField,
                    as: "formFields",
                    required: true,
                },
            ],
        });

        if (!form) {
            throw new Error("Form not found");
        }


        const response = await ResponseData.create({
            formId: form.id,
            username,
            responses,
        });


        return response ? true : false;
    } catch (error) {
        console.error("Error submitting form response:", error);
        throw new Error("Error submitting form response");
    }
};

const getFormResponsesService = async (formId: number): Promise<ResponseData[]> => {
    try {
        const responses = await ResponseData.findAll({
            where: { formId },
        });

        return responses;
    } catch (error) {
        console.error("Error fetching responses from the database:", error);
        throw new Error("Error fetching responses.");
    }
};

const exportFormResponsesToCsvService = async (formId: number): Promise<string> => {
    try {

        const responses = await ResponseData.findAll({
            where: { formId },
        });


        if (!responses || responses.length === 0) {
            throw new Error("No responses found for this form");
        }

        // Prepare data for CSV export
        // Convert the responses to a format suitable for CSV
        const csvData = responses.map(response => {
            // Safely parse responses if it's a string or an object
            const parsedResponses = typeof response.responses === 'string'
                ? JSON.parse(response.responses)
                : response.responses;


            return {
                id: response.id,
                formId: response.formId,
                username: response.username,
                ...Object.keys(parsedResponses || {}).reduce((acc, key) => {

                    acc[key] = typeof parsedResponses[key] === 'object'
                        ? JSON.stringify(parsedResponses[key])
                        : parsedResponses[key];
                    return acc;
                }, {} as Record<string, any>)
            };
        });

        // Use json2csv to convert to CSV
        const parser = new Parser({ fields: Object.keys(csvData[0]) });
        const csv = parser.parse(csvData);

        return csv;
    } catch (error) {
        console.error("Error exporting responses to CSV:", error);
        throw new Error("Error exporting responses to CSV");
    }
};

export {
    submitFormResponseService,
    getFormResponsesService,
    exportFormResponsesToCsvService
};