import {z} from "zod";

export const userSignUpSchema = z.object({
    fullName: z.string().min(1, "Fullname is required."),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be 8 characters."),
    contact: z.string().min(10, "Contact must be of 10 digits.")
})

export type userSignUpState = z.infer<typeof userSignUpSchema>;


export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be 8 characters."),
})

export type userLoginState = z.infer<typeof userLoginSchema>;