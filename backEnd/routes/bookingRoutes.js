import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    createBooking,
    getUserBookings,
    getBooking,
    updateBooking,
    deleteBooking
} from "../controllers/bookingController.js";

const router = express.Router();

// All booking routes require authentication
router.post("/", protect, createBooking);
router.get("/", protect, getUserBookings);
router.get("/:id", protect, getBooking);
router.put("/:id", protect, updateBooking);
router.delete("/:id", protect, deleteBooking);

export default router;
