import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RentalValidations } from './rental.validationts';
import auth from '../../middlewares/auth';
import { RentalControllers } from './rental.controller';

const router = Router();
router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(RentalValidations.createRentalValidationSchema),
  RentalControllers.createRental,
);
router.put('/:id/return', auth('admin'), RentalControllers.returnBike);
router.get('/', auth('user'), RentalControllers.getMyRentals);
export const RentalRoutes = router;
