import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';
const router = express.Router();
router.get('/me', auth('admin', 'user'), UserControllers.getSingleUser);
router.put(
  '/me',
  auth('admin', 'user'),
  validateRequest(UserValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
