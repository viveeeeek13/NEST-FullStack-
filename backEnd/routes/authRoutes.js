import express from "express";
import { login, register, getUsers } from "../controllers/authController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", authenticateToken, getUsers);

export default router;