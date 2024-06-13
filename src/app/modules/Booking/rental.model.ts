import { Schema, model } from 'mongoose';
import { TRental } from './rental.interface';

const rentalSchema = new Schema<TRental>({
  userId: { type: Schema.Types.ObjectId, required: true },
  bikeId: { type: Schema.Types.ObjectId, required: true },
  startTime: { type: Date, required: true, default: new Date() },
  returnTime: { type: Date, default: null },
  totalCost: { type: Number, required: true, default: 0 },
  isReturned: { type: Boolean, required: true, default: false },
});
export const Booking = model<TRental>('Booking', rentalSchema);
