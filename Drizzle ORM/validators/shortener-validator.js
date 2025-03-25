import z from "zod";

export const shortenerSchema = z.object({
  url: z
    .string({ required_error: "URL is required" })
    .trim()
    .url({ message: "please enter a valid URL" })
    .max(1024, { message: "URL is too long" }),

  shortCode: z
    .string({ required_error: "Short code is required" })
    .trim()
    .min(3, { message: "shortcode must be atleast 3 char long" })
    .max(50, { message: "shortcode must be max 50 char long" }),
});
