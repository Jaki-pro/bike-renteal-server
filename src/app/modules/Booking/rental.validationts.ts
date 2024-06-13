import { z } from 'zod';

const createRentalValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'userId is required' }).optional(),
    bikeId: z.string({ required_error: 'bikeId is required' }),
    startTime: z.string().datetime(),
    returnTime: z.string().datetime().optional(),
    totalCost: z.number().optional(),
    isReturned: z.boolean().optional(),
  }),
});
export const RentalValidations = {
  createRentalValidationSchema,
};
