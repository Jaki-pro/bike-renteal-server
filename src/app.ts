import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();
app.use(express.json());
app.use(cors());
//application routes
// app.use('/api/v1/', router);
app.get('/', async (req: Request, res: Response) => {
  const a = 10;
  res.json({ a: a });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
