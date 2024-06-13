import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

const getSingleUser = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await UserServices.getSingleUserFromDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});
export const UserControllers = {
  getSingleUser,
};
