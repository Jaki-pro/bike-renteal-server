import express from 'express';

const router = express.Router(); 

const moduleRoutes = [
  {
    path: "/users",
    router: null,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
