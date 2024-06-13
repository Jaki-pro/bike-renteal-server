import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const addBike = catchAsync(async (req, res) => {
  const result = await BikeServices.addBikeIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const result = await BikeServices.updateBikeIntoDB(req.body, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike updated successfully',
    data: result,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const result = await BikeServices.deleteBikeFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike deleted successfully',
    data: result,
  });
});
export const BikeControllers = {
  addBike,
  getAllBikes,
  updateBike,
  deleteBike,
};
