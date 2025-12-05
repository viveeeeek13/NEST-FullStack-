import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        checkIn: {
            type: mongoose.Schema.Types.Date,
            required: true,
        },
        checkOut: {
            type: mongoose.Schema.Types.Date,
            required: true,
        },
        guests: {
            type: Number,
            required: true,
            default: 1,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "confirmed",
        },
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
