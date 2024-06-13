import express, { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
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
];
moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
