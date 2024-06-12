import { Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: { type: 'string', required: true, trim: true },
});
