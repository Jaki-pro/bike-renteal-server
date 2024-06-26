import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { TUser } from '../User/user.interface';

// Create User
const createUserIntoDB = async (payload: TUser) => {
  await User.create(payload);
  return await User.findOne({ email: payload?.email });
};

const loginUser = async (payload: TLoginUser) => {
  // checking if the user exists
  const user = await User.isUserExistsByEmail(payload?.email);

  if (!user) {
    // custom static method
    throw new AppError(httpStatus.NOT_FOUND, 'No User Found');
  }

  // checking if the user password is correct
  if (
    !(await User.isPasswordMatched(payload?.password, user?.password as string))
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password is incorrect');
  }
  // Create Token and send to the client
  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  //console.log(accessToken);

  const result = await User.findOne({ email: payload?.email });
  return {
    accessToken,
    result,
  };
};
export const AuthServices = {
  loginUser,
  createUserIntoDB,
};
