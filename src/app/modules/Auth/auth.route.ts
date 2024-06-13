import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { UserValidations } from '../User/user.validation';
import { UserControllers } from '../User/user.controller';

const router = Router();
router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidation),
  UserControllers.createUser,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);
export const AuthRoutes = router;
