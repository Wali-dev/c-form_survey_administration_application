import express from "express";
import {

    createUser,
    Login,

} from "../../controllers/user.controller";

//import checkUserAuth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", Login);


export default router;
