import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import apiRouter from "./routes/v1/index";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(cors());

// GLOBAL ERROR HANDLER
app.use(errorHandler);

// API routes
app.use("/api", apiRouter);


// Home route
app.get("/", (req: Request, res: Response) => {
    res.send("Groove street, home!");
});

// Handle non-existent routes
app.use((req: Request, res: Response) => {
    res.status(404).send("There is no such route");
});

export default app;
