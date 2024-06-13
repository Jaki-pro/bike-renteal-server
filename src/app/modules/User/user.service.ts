import { JwtPayload } from 'jsonwebtoken';
import QueryBuiler from '../../builder/QueryBuilder';
import { TUser } from './user.interface';
import { User } from './user.model';

// Create User
const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return await User.findOne({ email: payload?.email });
};

// Get Single User
const getSingleUserFromDB = async (userData: JwtPayload) => {
  const result = await User.findOne({
    email: userData?.userEmail,
    role: userData?.role,
  });
  return result;
};
export const UserServices = {
  createUserIntoDB,
  getSingleUserFromDB,
};
