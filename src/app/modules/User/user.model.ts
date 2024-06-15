import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import validator from 'validator';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      select: 0,
    },
    phone: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
    },
    address: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: "Role must be either 'admin' or 'user'",
      },
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Document middleware
// pre save middleware/hook: will work on create save
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');
  // Hashing password and save into DB

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
// pre findOneAndUpdate middleware/hook: will work on update
userSchema.pre('findOneAndUpdate', async function (next) {
  // console.log(this, 'pre hook: we will save data');
  // Hashing password and save into DB
  const update = this.getUpdate();
  if (update && 'password' in update) {
    update.password = await bcrypt.hash(
      update.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// Create static method for checking user exist
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  const existingUser = await User.findOne({ email }).select('+password');
  return existingUser;
};

//create static method for checking password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  const isPasswordMatched = await bcrypt.compare(
    plainTextPassword,
    hashedPassword,
  );
  return isPasswordMatched;
};
export const User = model<TUser, UserModel>('User', userSchema);
