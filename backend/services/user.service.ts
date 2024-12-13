import User from "../models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Op } from "sequelize";

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


export const userLogins = async (
    credential: string,
    password: string
): Promise<{ status: string; message: string; token?: string; username?: string } | string> => {
    try {
        if (credential && password) {
            const user = await User.findOne({
                where: {
                    [Op.or]: [{ userName: credential }, { email: credential }],
                },
            });

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    const token = jwt.sign({ username: user.username }, JWT_KEY, {
                        expiresIn: "1d",
                    });

                    return {
                        status: "Success",
                        message: "Login is Successful",
                        username: user.username,
                        token,
                    };
                } else {
                    return {
                        status: "Failed",
                        message: "Email or password does not match",
                    };
                }
            } else {
                return "User doesn't exist";
            }
        } else {
            return "Username and password are required";
        }
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error("An error occurred during login");
    }
};
