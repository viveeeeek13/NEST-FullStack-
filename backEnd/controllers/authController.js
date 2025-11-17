import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, "MYSECRETKEY", {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); 

    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
