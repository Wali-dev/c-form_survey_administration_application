import { createUser as createUserService, userLogins } from "../services/user.service";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body as { username: string; email: string; password: string };

    try {
        const user = await createUserService(username, email, password);
        if (user) {
            res.send(user);
        } else {
            res.status(500).send("Error creating user");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
const Login = async (req: Request, res: Response): Promise<void> => {
    const { credential, password } = req.body as { credential: string; password: string };

    try {
        const user = await userLogins(credential, password);
        if (user) {
            res.send(user);
        } else {
            res.status(500).send("Error Loggin in");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export { createUser, Login };
