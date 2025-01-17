import { Request, Response } from "express";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import generateVerificationCode from "../utils/generateVerification";
import generateToken from "../utils/generateToken";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVertificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";

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

    const verificationToken = generateVerificationCode();

    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() * 24 * 60 * 60,
    });

    generateToken(res, user);
    await sendVertificationEmail(email, verificationToken);

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

    generateToken(res, user);

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

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // send welcome email
    await sendWelcomeEmail(user.email, user.fullName);

    return res
      .status(200)
      .json({ success: true, message: "User verified successfully", user });
  } catch (error) {
    console.log("VerifyEmail error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exists" });
    }

    const resetToken = crypto.randomBytes(40).toString("hex");

    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

    await user.save();

    //send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Forgot Password error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    // send success reset email

    await sendResetSuccessEmail(user.email);

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log("Reset Password error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const checkAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ sucess: true, user });
  } catch (error) {
    console.log("Reset Password error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.id;

    const { fullName, email, address, city, country, profilePicture } =
      req.body;

    // upload image on cloudinary

    let cloudResponse: any;

    try {
      cloudResponse = await cloudinary.uploader.upload(profilePicture);

      const updatedData = {
        fullName,
        email,
        address,
        city,
        country,
        profilePicture,
      };

      const user = await User.findById(userId, updatedData, {
        new: true,
      }).select("-password");

      return res
        .status(200)
        .json({ success: true, message: "Profile updated successfully", user });
    } catch (error) {
      console.log("Cloudinary error: ", error);
    }
  } catch (error) {
    console.log("Update Profile error: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export {
  signup,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
  updateProfile,
  checkAuth,
};
