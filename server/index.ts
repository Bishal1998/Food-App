import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/connectToDB";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server started at port: ${PORT}`);
});
