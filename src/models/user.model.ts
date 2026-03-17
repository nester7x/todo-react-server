import mongoose, { Schema } from 'mongoose';

export interface IUser {
  username: string;
  email: string;
  password: string;
  image?: string;
  age?: number;
  city?: string;
  country?: string;
  description?: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    image: {
      type: String
    },
    age: {
      type: Number
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
