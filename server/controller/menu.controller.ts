import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import Menu from "../models/menu.model";

const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;

    const file = req.file;
    if (!file) {
      res.status(400).json({ success: false, message: "Image is required" });
      return;
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu = await Menu
  } catch (error) {
    console.log("Add Menu Error : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addMenu };
