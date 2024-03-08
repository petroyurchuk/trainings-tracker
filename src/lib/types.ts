import { z } from "zod";

const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

export const registerSchema = z.object({
  email: z.string().refine((value) => emailRegex.test(value), {
    message: "Type correct email address",
  }),
  name: z.string().min(3, "Your name is too short"),
  password: z.string().min(8, "Password must contains at least 8 characters"),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = registerSchema.merge(
  z.object({ name: z.string().optional() })
);
export type TLoginSchema = z.infer<typeof loginSchema>;
