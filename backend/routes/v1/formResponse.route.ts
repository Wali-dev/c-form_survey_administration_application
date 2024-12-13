import express from "express";
import {
    getFormResponses,
    submitFormResponse,
    exportFormResponsesToCsv
} from "../../controllers/formResponse.controller";

//import checkUserAuth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", submitFormResponse);
router.get("/:formId", getFormResponses);
router.get("/:formId/export-csv", exportFormResponsesToCsv); // route for CSV export

export default router;