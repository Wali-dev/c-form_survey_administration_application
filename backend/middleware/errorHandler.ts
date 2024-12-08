import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    status?: string;
    statusCode?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
    const errorMessage = {
        status: err.status || "error",
        message: err.message || "Internal Server Error",
    };
    res.status(err.statusCode || 500).json(errorMessage);
};

export default errorHandler;
