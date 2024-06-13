import httpStatus from 'http-status';
import QueryBuiler from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';
import mongoose from 'mongoose';

// add new Bike into database
const addBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};

// Get all Bikes from database
const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuiler(Bike.find(), query);
  const result = await bikeQuery.modelQuery;
  return result;
};

// Update a Bike into database
const updateBikeIntoDB = async (payload: Partial<TBike>, id: string) => {
  const result = await Bike.updateOne({ _id: id }, payload, {
    runValidators: true,
  });
  if (result.matchedCount === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  return await Bike.findById(id);
};

// Delete a Bike from database
const deleteBikeFromDB = async (id: string) => {
  // We have to delete a bike and in the meantime we have to set availability of
  // isAvailable to false in the response end. So we will will apply
  //Transaction & Rollback to handle multiple write operations

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateBike = await Bike.findByIdAndUpdate(
      id,
      { isAvailable: false },
      { runValidators: true, session },
    );
    if (!updateBike) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Bike');
    }
    const result = await Bike.findByIdAndDelete(id, { session });
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Bike');
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Bike');
  }
};

export const BikeServices = {
  addBikeIntoDB,
  getAllBikesFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
