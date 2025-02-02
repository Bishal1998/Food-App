import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import uploadImageOnCloudinary from "../utils/imageUpload";
import Order from "../models/order.model";

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

const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.find({ user: req.id });
    if (!restaurant) {
      res.status(404).json({ success: false, message: "Restaurant not found" });
      return;
    }
    res.status(200).json({ success: true, restaurant });
  } catch (error) {
    console.log("Get Restaurant Error : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (!restaurant) {
      res.status(404).json({ success: false, message: "Restaurant not found" });
      return;
    }

    restaurant.restaurantName = restaurantName;
    (restaurant.city = city), (restaurant.country = country);
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines);

    if (file) {
      const imageURL = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      restaurant.imageUrl = imageURL;
    }

    await restaurant.save();
    res
      .status(200)
      .json({ success: true, message: "Restaurant Updated", restaurant });
  } catch (error) {
    console.log("Update Restaurant Error : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (!restaurant) {
      res.status(404).json({ success: false, message: "Restaurant not found" });
      return;
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("Get Restaurant Orders Error : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }

    order.status = status;
    await order.save();
    res.status(200).json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log("Update Order Status Error : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchRestaurant = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log("Search Restaurant Error : ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createRestaurant,
  getRestaurant,
  getRestaurantOrders,
  updateOrderStatus,
  searchRestaurant,
};
