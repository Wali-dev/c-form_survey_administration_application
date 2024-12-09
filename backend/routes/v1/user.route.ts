import express from "express";
import {

    createUser,

} from "../../controllers/user.controller";

//import checkUserAuth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", createUser);


export default router;
