import express, { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BikeRoutes } from '../modules/Bike/bike.route';
const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    router: AuthRoutes,
  },
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/bikes',
    router: BikeRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
