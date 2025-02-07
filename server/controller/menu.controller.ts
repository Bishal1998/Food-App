import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import Menu from "../models/menu.model";
import Restaurant from "../models/restaurant.model";
import mongoose, { Mongoose } from "mongoose";

const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;

    const file = req.file;
    if (!file) {
      res.status(400).json({ success: false, message: "Image is required" });
      return;
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
      await restaurant.save();
    }

    res
      .status(201)
      .json({ success: true, message: "Menu added successfully.", menu });
  } catch (error) {
    console.log("Add Menu Error : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addMenu };
