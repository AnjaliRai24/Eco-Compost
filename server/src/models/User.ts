import mongoose, { Schema, Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  passwordHash: string;
  fullName: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    fullName: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);




