import { Request, Response } from "express";
import { getFormResponsesService, submitFormResponseService } from "../services/formResponse.service"

const submitFormResponse = async (req: Request, res: Response): Promise<void> => {
    const { username, formId, responses } = req.body as {
        username: string
        formId: number;
        responses: object;
    };

    try {
        const formResponse = await submitFormResponseService(formId, username, responses);

        res.status(201).json({
            message: "Form response submitted successfully",
            formResponse,
        });
    } catch (error: unknown) {
        console.error(error);

        // Type guard to check if error is an Error object
        const errorMessage = error instanceof Error ? error.message : String(error);

        res.status(500).json({
            message: "Error submitting form response",
            error: errorMessage,
        });
    }
};



const getFormResponses = async (req: Request, res: Response): Promise<void> => {
    const { formId } = req.params;

    try {
        const responses = await getFormResponsesService(Number(formId));

        if (responses && responses.length > 0) {
            res.status(200).json(responses);
        } else {
            res.status(404).json({ message: "No responses found for this form." });
        }
    } catch (error) {
        console.error("Error fetching form responses:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};



export { submitFormResponse, getFormResponses };