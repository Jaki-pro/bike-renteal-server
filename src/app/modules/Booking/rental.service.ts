import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Booking } from './rental.model';
import { TRental } from './rental.interface';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../User/user.model';
import { Bike } from '../Bike/bike.model';
import mongoose from 'mongoose';

// add new Bike into database
const createRentalIntoDB = async (
  payload: Partial<TRental>,
  userData: JwtPayload,
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateBikeAvailability = await Bike.findOneAndUpdate(
      { _id: payload?.bikeId, isAvailable: true },
      {
        isAvailable: false,
      },
      {
        runValidators: true,
        session,
      },
    );
    if (!updateBikeAvailability) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Rental');
    }
    const newRental: Partial<TRental> = payload;
    const user = await User.findOne({ email: userData?.userEmail });
    //   console.log(user);
    newRental.userId = user?._id;
    const result = await Booking.create([newRental], { session });
    if (!result.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Rental');
    }
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Rental');
  }
};

// Return Bike
const returnBike = async (id: string) => {
  // Apply Transaction & Rollback
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Check if Rental exists
    const rental = await Booking.findById(id);
    if (!rental) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to return Bike');
    }

    // Find Bike and Update Bike Availability
    const updateBike = await Bike.findByIdAndUpdate(
      rental?.bikeId,
      {
        isAvailable: true,
      },
      {
        runValidators: true,
        session,
      },
    );
    if (!updateBike) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to return Bike');
    }

    const totalCost =
      ((new Date().getTime() - (rental?.startTime).getTime()) / 3600000) *
      updateBike?.pricePerHour; // COST CALCULATION OF RENTAL

    // Finde Rental and update isReturned and returnTime and totalCost
    const updateRental = await Booking.findByIdAndUpdate(
      id,
      {
        returnTime: new Date(),
        isReturned: true,
        totalCost: totalCost.toFixed(2),
      },
      {
        runValidators: true,
        session,
      },
    );
    if (!updateRental) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to return Bike');
    }

    await session.commitTransaction();
    await session.endSession();
    return await Booking.findById(id);
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to return Bike');
  }
};

// // Get my Rentals from Database
const getMyRentalsFromDB = async (userData: JwtPayload) => {
  const user = await User.findOne({ email: userData?.userEmail });

  const result = await Booking.find({ userId: user?._id });
  return result;
};

export const RentalServices = {
  createRentalIntoDB,
  returnBike,
  getMyRentalsFromDB,
};
