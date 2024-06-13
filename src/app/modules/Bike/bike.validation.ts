import { z } from 'zod';

const addBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }),
    description: z.string({ required_error: 'description is required' }),
    pricePerHour: z
      .number({ required_error: 'pricePerHour is required' })
      .positive(),
    cc: z.number({ required_error: 'cc is required' }),
    year: z.number({ required_error: 'year is required' }),
    model: z.string({ required_error: 'model is required' }),
    brand: z.string({ required_error: 'brand is required' }),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required' }).optional(),
    description: z
      .string({ required_error: 'description is required' })
      .optional(),
    pricePerHour: z
      .number({ required_error: 'pricePerHour is required' })
      .positive()
      .optional(),
    cc: z.number({ required_error: 'cc is required' }).optional(),
    year: z.number({ required_error: 'year is required' }).optional(),
    model: z.string({ required_error: 'model is required' }).optional(),
    brand: z.string({ required_error: 'brand is required' }).optional(),
  }),
});
export const BikeValidations = {
  addBikeValidationSchema,
  updateBikeValidationSchema,
};
