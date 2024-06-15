import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import bodyParser from 'body-parser';
const app: Application = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
//application routes
app.use('/api', router);
app.get('/', async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Server is running on Port 5000' });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
