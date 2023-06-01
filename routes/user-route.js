import express from "express";                      // import express
import { getAllUser, signup, login } from "../controllers/user-controller.js";  // import user controller

const router = express.Router();    // create router

router.get("/", getAllUser);    // get all users
router.post("/signup", signup);     // signup user
router.post("/login", login);       // login user
export default router;          // export router