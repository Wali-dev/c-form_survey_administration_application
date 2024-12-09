import express from "express";

import { createForm } from "../../controllers/form.controller";

//import checkUserAuth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", createForm);
//router.patch("/update", Login);


export default router;
