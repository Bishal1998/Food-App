import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import { Multer } from "multer";
import uploadImageOnCloudinary from "../utils/imageUpload";

const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, price, deliveryTime, cuisines } =
      req.body;

    const file = req.file;

    const restaurant = await Restaurant.findOne({ user: req.id });

    if (restaurant) {
      res.status(400).json({
        success: false,
        message: "Restaurant already exists for this user.",
      });
    }

    if (!file) {
      res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);

    await Restaurant.create({
      user: req.id,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    res
      .status(201)
      .json({ success: true, message: "Restaurant created successfully." });
  } catch (error) {
    console.log("Create Restaurant Error : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createRestaurant };
