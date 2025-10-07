import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/location-from-pincode/:pincode", async (req, res) => {
  const { pincode } = req.params;

  try {
    const countryCode = "in";
    const response = await axios.get(`http://api.zippopotam.us/${countryCode}/${pincode}`);

    if (
      response.data &&
      response.data.places &&
      response.data.places.length > 0
    ) {
      const place = response.data.places[0];
      return res.json({
        city: place["place name"],
        country: response.data.country,
      });
    } else {
      return res.status(404).json({ message: "Location not found" });
    }
  } catch (err) {
    console.error("Zippopotam API error:", err.message);
    return res.status(500).json({
      message: "Failed to fetch location data",
      city: "Unknown",
      country: "Unknown",
    });
  }
});

export default router;
