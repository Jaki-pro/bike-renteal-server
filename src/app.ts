import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import { UserRoutes } from './app/modules/User/user.route';
import router from './app/routes';

const app: Application = express();
app.use(express.json());
app.use(cors());
//application routes
app.use('/api', router);
app.get('/', async (req: Request, res: Response) => {
  const a = 10;
  res.json({ a: a });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
