import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlContent";
import { client, sender } from "./mailtrap";

export const sendVertificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipient = [{ email }];

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      html: htmlContent.replace("{verificationToken}", verificationToken),
      subject: "Verify your email",
      category: "Email Verification",
    });
  } catch (error) {
    console.log("Vertification Email error: ", error);
    throw new Error("Failed to send email verification");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);

  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome to FoodApp",
      category: "Welcome Email",
      html: htmlContent,
      template_variables: {
        company_info_name: "FoodApp",
        name: name,
      },
    });
  } catch (error) {
    console.log("Welcome Email error: ", error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipient = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetUrl);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your Password",
      category: "Password Reset",
      html: htmlContent,
    });
  } catch (error) {
    console.log("Password reset Email error: ", error);
    throw new Error("Failed to send password reset mail");
  }
};

export const sendResetSuccessEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipient = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfully",
      category: "Password Reset",
      html: htmlContent,
    });
  } catch (error) {
    console.log("Password reset success Email error: ", error);
    throw new Error("Failed to send password reset success mail");
  }
};
