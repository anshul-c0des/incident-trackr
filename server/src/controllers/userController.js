import User from "../models/User.js";
import bcrypt from "bcryptjs";
import axios from "axios";

async function getCityCountryFromPincode(pincode) {   // fetch pincode
  try {
    const countryCode = "in";
    const response = await axios.get(
      `http://api.zippopotam.us/${countryCode}/${pincode}`
    );

    if (
      response.data &&
      response.data.places &&
      response.data.places.length > 0
    ) {
      const place = response.data.places[0];
      return {
        city: place["place name"],
        country: response.data.country,
      };
    } else {
      return { city: "Unknown", country: "Unknown" };
    }
  } catch (error) {
    console.error("Error fetching city/country from pincode:", error.message);
    return { city: "Unknown", country: "Unknown" };
  }
}

export const registerUser = async (req, res) => {   // creates a new user (register)
  try {
    const { name, email, phone, address, pincode, password } = req.body;

    if (!name || !email || !phone || !address || !pincode || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const { city, country } = await getCityCountryFromPincode(pincode);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      address,
      pincode,
      city,
      country,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
