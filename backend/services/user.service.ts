import User from "../models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_KEY = process.env.JWT_KEY as string;

export const createUser = async (
    username: string,
    email: string,
    password: string
): Promise<object | string> => {
    try {
        if (email && username && password) {
            const user = await User.findOne({ where: { email } });
            if (user) {
                return { status: "Failed", message: "Email already exists" };
            } else {
                const salt = await bcrypt.genSalt(7);
                const hashedPassword = await bcrypt.hash(password, salt);
                const authDetails = {
                    username,
                    email,
                    password: hashedPassword,
                };
                const token = jwt.sign({ username }, JWT_KEY, { expiresIn: "30m" });
                const auth = await User.create({
                    ...authDetails,
                });
                return {
                    status: "Success",
                    message: "Email and password created successfully",
                    auth,
                    token,
                };
            }
        } else {
            return "username, email, and password are all required";
        }
    } catch (error) {
        console.log(error);
        return "Failed to create user";

    }
};
