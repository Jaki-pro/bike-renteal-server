import { z } from 'zod';
import { User } from './user.model';
import validator from 'validator';
// Define the Zod schema
const createUserValidation = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    phone: z.string(),
    address: z.string({ required_error: 'Address is required' }),
    role: z.enum(['admin', 'user']),
  }),
});

export const UserValidations = {
  createUserValidation,
};
