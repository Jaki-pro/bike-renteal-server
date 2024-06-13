import { Router } from 'express';
import { BikeControllers } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidations } from './bike.validation';
import auth from '../../middlewares/auth';
const router = Router();
router.post(
  '/',
  auth('admin'),
  validateRequest(BikeValidations.addBikeValidationSchema),
  BikeControllers.addBike,
);
router.get('/', BikeControllers.getAllBikes);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike,
);
router.delete('/:id', auth('admin'), BikeControllers.deleteBike);
export const BikeRoutes = router;
