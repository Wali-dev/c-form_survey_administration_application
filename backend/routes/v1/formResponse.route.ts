import express from "express";
import { submitFormResponse } from "../../controllers/formResponse.controller";



//import checkUserAuth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", submitFormResponse);



export default router;
