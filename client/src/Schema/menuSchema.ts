import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  desc: z.string().nonempty({ message: "Description is required" }),
  price: z.number().min(0, { message: "Price can not be negative" }),
  img: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size != 0, { message: "Image is required" }),
});

export type MenuFormSchema = z.infer<typeof menuSchema>;
