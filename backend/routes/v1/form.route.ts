import express from "express";

import { createForm, deleteForm, getFormsByUser, updateForm } from "../../controllers/form.controller";

//import checkUserAuth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", createForm);
router.patch("/update/:id", updateForm);
router.get("/:username", getFormsByUser);
router.delete("/:username/:formId", deleteForm);


export default router;
