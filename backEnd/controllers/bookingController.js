import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
    try {
        const { propertyId, checkIn, checkOut, guests, totalPrice } = req.body;

        if (!propertyId || !checkIn || !checkOut) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // Check if property exists
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Create booking
        const booking = await Booking.create({
            property: propertyId,
            user: req.user.id,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            guests: guests || 1,
            totalPrice: totalPrice || property.price,
            status: "confirmed"
        });

        await booking.populate("property", "title location images price");

        return res.status(201).json({
            message: "Booking created successfully",
            booking
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// GET ALL USER BOOKINGS
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate("property", "title location images price")
            .sort({ createdAt: -1 });

        return res.json({ bookings });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// GET SINGLE BOOKING
export const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("property", "title location images price amenities")
            .populate("user", "name email");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Check if user owns this booking
        if (booking.user._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        return res.json({ booking });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// UPDATE BOOKING
export const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("property", "title location images price");

        return res.json({ message: "Booking updated", booking: updated });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

// DELETE/CANCEL BOOKING
export const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await booking.deleteOne();

        return res.json({ message: "Booking cancelled successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};
