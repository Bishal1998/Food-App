import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/connectToDB";
import userRoute from "../server/routes/user.route";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// default middleware
app.use(bodyParser.json({ limit: "10" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

//api
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server started at port: ${PORT}`);
});
