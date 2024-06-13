import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { User } from '../modules/User/user.model';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // validation
    const tokenArray = req.headers.authorization?.split(' ');
    const token = tokenArray?.[tokenArray?.length - 1];
    console.log(token);
    // checking if the token is missing
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { userEmail, role, iat } = decoded;
    // checking if the user exists
    const user = await User.isUserExistsByEmail(userEmail);
    if (!user) {
      // custom static method
      throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
    }
    // check if match the payload role with collection role
    if (requiredRoles && !requiredRoles.includes(decoded.role)) {
      // checking if the given token is valid
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    req.user = decoded;
    next();
  });
};
export default auth;
