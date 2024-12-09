import { Request, Response } from "express";
import { createFormService, deleteFormService, getFormsByUsernameService, updateFormService } from "../services/form.service";  // Make sure to import the service function

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

const updateForm = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, description, formFields } = req.body as {
        title: string;
        description: string;
        formFields: Array<any>;
    };

    try {
        const updatedForm = await updateFormService(Number(id), title, description, formFields);

        if (updatedForm) {
            res.status(200).send(updatedForm);
        } else {
            res.status(404).send("Form not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
};

const getFormsByUser = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;
    try {
        const forms = await getFormsByUsernameService(username);

        if (forms) {
            res.status(200).send(forms);
        } else {
            res.status(404).send({ message: "No forms found for the specified user" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching forms for the user" });
    }
};

const deleteForm = async (req: Request, res: Response): Promise<void> => {
    const { username, formId } = req.params;

    try {
        const result = await deleteFormService(username, Number(formId));

        if (result) {
            res.status(200).send({ message: "Form deleted successfully" });
        } else {
            res.status(404).send({ message: "Form not found or user not authorized" });
        }
    } catch (error) {
        console.error("Error deleting form:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};


export { createForm, updateForm, getFormsByUser, deleteForm };
