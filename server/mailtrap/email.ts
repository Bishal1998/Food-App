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
