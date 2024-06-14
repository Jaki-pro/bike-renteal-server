import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.model';
import { TUser } from './user.interface';

// Get Single User
const getSingleUserFromDB = async (userData: JwtPayload) => {
  const result = await User.findOne({
    email: userData?.userEmail,
    role: userData?.role,
  });
  return result;
};

// Update Single User
const updateUserIntoDB = async (
  userData: JwtPayload,
  payload: Partial<TUser>,
) => {
  const result = await User.findOneAndUpdate(
    { email: userData?.userEmail },
    payload,
    { new: true, runValidators: true },
  ).select('-createdAt -updatedAt -__v');
  return result;
};
export const UserServices = {
  getSingleUserFromDB,
  updateUserIntoDB,
};
