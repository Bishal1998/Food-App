import { MailtrapClient } from "mailtrap/dist";

const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN!,
});

const sender = {
  email: "foodapp@demomailtrap.com",
  name: "Food App",
};

export { client, sender };
