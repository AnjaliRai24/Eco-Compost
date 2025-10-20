import mongoose, { Schema, Document, Model } from 'mongoose';

export interface PickupDocument extends Document {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  preferredDate: string;
  preferredTime: string;
  wasteType: string;
  estimatedWeight?: number;
  notes?: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const PickupSchema = new Schema<PickupDocument>(
  {
    userId: { type: String, required: true, index: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    wasteType: { type: String, required: true },
    estimatedWeight: { type: Number },
    notes: { type: String },
    status: { type: String, required: true, default: 'pending' },
  },
  { timestamps: true }
);

export const Pickup: Model<PickupDocument> = mongoose.models.Pickup || mongoose.model<PickupDocument>('Pickup', PickupSchema);




