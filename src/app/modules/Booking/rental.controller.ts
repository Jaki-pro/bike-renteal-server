import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentalServices } from './rental.service';

const createRental = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await RentalServices.createRentalIntoDB(req.body, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
});
const returnBike = catchAsync(async (req, res) => {
  //   const user = req.user;
  const result = await RentalServices.returnBike(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: result,
  });
});

const getMyRentals = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await RentalServices.getMyRentalsFromDB(user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});
export const RentalControllers = {
  createRental,
  returnBike,
  getMyRentals,
};
