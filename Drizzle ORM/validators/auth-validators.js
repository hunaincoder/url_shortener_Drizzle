import z from "zod";

export const loginUserSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "please enter a valid email address" })
    .max(100, { message: "email must be no more than 100 characters" }),
  password: z
    .string()
    .min(6, { message: "password should not be less than 6 chracters" })
    .max(100, { message: "password must be no more than 100 characters" }),
});

export const registerUserSchema = loginUserSchema.extend({
  name: z
    .string()
    .trim()
    .min(3, { message: "name must be atleast 3 characters long" })
    .max(100, { message: "name must be no more than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "please enter a valid email address" })
    .max(100, { message: "email must be no more than 100 characters" }),
  password: z
    .string()
    .min(6, { message: "password should not be less than 6 chracters" })
    .max(100, { message: "password must be no more than 100 characters" }),
});

export const verifyEmailSchema = z.object({
  token: z.string().trim().length(8),
  email: z.string().trim().email(),
});
