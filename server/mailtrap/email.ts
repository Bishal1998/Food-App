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
  const htmlContent = "";

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
  const htmlContent = "";
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
