import express from "express";
import {
  createProperty,
  getAllProperties,
  getProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getAllProperties);
router.get("/:id", getProperty);
router.post("/", authenticateToken, createProperty);
router.put("/:id", authenticateToken, updateProperty);
router.delete("/:id", authenticateToken, deleteProperty);

export default router;
