// mongoPassword=heCixEBTy4PNd3YT
// username=bishalpaudel1998

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Mongo Connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
