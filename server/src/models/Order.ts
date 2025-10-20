import mongoose, { Schema, Document, Model } from 'mongoose';

export interface OrderDocument extends Document {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<OrderDocument>(
  {
    userId: { type: String, required: true, index: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' },
  },
  { timestamps: true }
);

export const Order: Model<OrderDocument> = mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);



















