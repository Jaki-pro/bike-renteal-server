import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';
const router = express.Router();
router.get('/me', auth('admin', 'user'), UserControllers.getSingleUser);

export const UserRoutes = router;
