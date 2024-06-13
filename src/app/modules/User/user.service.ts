import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.model';

// Get Single User
const getSingleUserFromDB = async (userData: JwtPayload) => {
  const result = await User.findOne({
    email: userData?.userEmail,
    role: userData?.role,
  });
  return result;
};
export const UserServices = {
  getSingleUserFromDB,
};
