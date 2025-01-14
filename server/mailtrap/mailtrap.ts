import { MailtrapClient } from "mailtrap/dist";

export const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN!,
});

export const sender = {
  email: "foodapp@demomailtrap.com",
  name: "Food App",
};
