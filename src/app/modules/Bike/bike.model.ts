import { Schema, model } from 'mongoose';
import { TBike } from './bike.interface';

const bikeSchema = new Schema<TBike>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  pricePerHour: { type: Number, required: true, trim: true, min: 0.0001 },
  isAvailable: { type: Boolean, required: true, default: true, trim: true },
  cc: { type: Number, required: true, trim: true },
  year: { type: Number, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
});
export const Bike = model<TBike>('Bike', bikeSchema);
