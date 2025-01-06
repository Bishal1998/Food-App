import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";

const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, contact } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = "test";

    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() * 24 * 60 * 60,
    });

    //jwtToken
    // await sendVerificationEmail(email, verificationToken)

    const newUser = await User.findOne({ email }).select("-password");

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("Signup Error : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "No User found" });
    }

    const checkedPassword = await bcryptjs.compare(password, user.password);

    if (!checkedPassword) {
      return res
        .status(500)
        .json({ success: false, message: "Email or password didn't match" });
    }

    //generateToken(response, user)

    user.lastLogin = new Date();

    await user.save();

    const newUser = await User.findOne({ email }).select("-password");

    return res.status(200).json({
      success: true,
      message: `${user.fullName} logged in successfully`,
      user: newUser,
    });
  } catch (error) {
    console.log("Login error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { signup, login };
