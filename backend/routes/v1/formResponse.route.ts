import express from "express";
import { getFormResponses, submitFormResponse } from "../../controllers/formResponse.controller";



//import checkUserAuth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", submitFormResponse);
router.get("/:formId", getFormResponses);



export default router;
