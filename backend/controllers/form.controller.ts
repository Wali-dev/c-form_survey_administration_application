import { Request, Response } from "express";
import { createFormService } from "../services/form.service";  // Make sure to import the service function

const createForm = async (req: Request, res: Response): Promise<void> => {
    const { title, description, userId, formFields } = req.body as {
        title: string;
        description: string;
        userId: number;
        formFields: Array<any>;
    };

    try {
        const form = await createFormService(title, description, userId, formFields);

        if (form) {
            res.status(201).send(form);
        } else {
            res.status(500).send("Error creating form");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
};

export { createForm };
