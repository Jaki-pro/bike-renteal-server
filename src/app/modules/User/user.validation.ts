import { z } from 'zod';
// Define the Zod schema
const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters long' }),
    phone: z.string(),
    address: z.string({ required_error: 'Address is required' }),
    role: z.enum(['admin', 'user'], { required_error: 'Role is required' }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }).optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' })
      .optional(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .optional(),
    phone: z.string().optional(),
    address: z.string({ required_error: 'Address is required' }).optional(),
    role: z.enum(['admin', 'user']).optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
