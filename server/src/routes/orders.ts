import { Router } from 'express';
import { z } from 'zod';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { Order } from '../models/Order';

export const router = Router();

const createOrderSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(10),
  city: z.string().min(2),
  pincode: z.string().min(4),
  productName: z.string().min(1),
  quantity: z.number().positive(),
  price: z.number().positive(),
  totalAmount: z.number().positive(),
});

router.post('/', requireAuth, async (req: AuthRequest, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error?.issues?.[0]?.message || 'Invalid input' });
  const data = parsed.data;
  const order = await Order.create({
    userId: req.user!.id,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    pincode: data.pincode,
    productName: data.productName,
    quantity: data.quantity,
    price: data.price,
    totalAmount: data.totalAmount,
    status: 'pending',
  });
  return res.json({ order });
});

router.get('/', requireAuth, async (req: AuthRequest, res) => {
  const list = await Order.find({ userId: req.user!.id }).sort({ createdAt: -1 });
  return res.json({ orders: list });
});


