import Property from "../models/Property.js";

// CREATE PROPERTY
export const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, guests, amenities, images, city, image } =
      req.body;

    if (!req.user || req.user.role !== "host") {
      return res.status(403).json({ message: "Not authorized to create property" });
    }

    const mappedLocation = location || city;
    const mappedImages = Array.isArray(images) ? images : (image ? [image] : []);

    if (!title || !description || !price || !mappedLocation) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const property = await Property.create({
      title,
      description,
      price,
      location: mappedLocation,
      guests,
      amenities,
      images: mappedImages,
      host: req.user.id,
    });

    return res.status(201).json({ message: "Property created", property });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("host", "name email");
    return res.json({ properties });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "host",
      "name email"
    );

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    return res.json({ property });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });
    if (property.host.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "Not authorized to update this listing" });

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json({ message: "Updated successfully", updated });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    if (property.host.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "Not authorized to delete this listing" });

    await property.deleteOne();

    return res.json({ message: "Property deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
